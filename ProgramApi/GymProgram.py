import os
from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import pandas as pd

app = Flask(__name__)
CORS(app, resources={r"/predict": {"origins": "http://localhost:19006"}})

# Define columns
categorical_columns = ['Gender', 'Goal', 'Physical Level', 'Place of Exercise', 'Medical Condition']
numeric_columns = ['Age', 'Weight', 'Height']

# Load the fitted pipeline
model_path = 'c:/Users/reemd/Desktop/FinalYearProject/pipelinee.pkl'
if not os.path.exists(model_path):
    print(f"Error: Pipeline file not found at {model_path}")
else:
    with open(model_path, 'rb') as model_file:
        pipeline = pickle.load(model_file)

@app.route('/')
def home():
    return "Welcome to the Home Page"

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.json
        print(f'Received data: {data}')
        
        # Create a DataFrame with the input features
        df = pd.DataFrame([data['features']], columns=categorical_columns + numeric_columns)
        print(f'Initial DataFrame:\n{df}')
        
        # Convert only numeric columns to float
        df[numeric_columns] = df[numeric_columns].astype(float)
        # Ensure categorical columns are strings
        df[categorical_columns] = df[categorical_columns].astype(str)
        
        # Verify the DataFrame contains all expected columns
        missing_columns = set(categorical_columns + numeric_columns) - set(df.columns)
        if missing_columns:
            return jsonify({"error": f"columns are missing: {missing_columns}"}), 400

        print(f'DataFrame for prediction:\n{df}')

        # Use the pipeline to preprocess and predict
        prediction = pipeline.predict(df)
        print(f'Prediction result: {prediction}')

        return jsonify({'prediction': int(prediction[0])})
    except Exception as e:
        print(f"Error in predict route: {str(e)}")
        return jsonify({"error": str(e)}), 500

# if __name__ == '__main__':
#     app.run(debug=True)
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)



