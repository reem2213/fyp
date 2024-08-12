import axios from 'axios';

const predictWorkoutProgram = async (features) => {
    try {
        const response = await axios.post('http://127.0.0.1:5000/predict', {
            features: features,
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.data.prediction;
    } catch (error) {
        console.error('Error making prediction:', error);
        throw error;
    }
};





export default predictWorkoutProgram;
