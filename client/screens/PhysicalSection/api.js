import axios from 'axios';

const predictWorkoutProgram = async (features) => {
    try {
        console.log("Sending features:", features);
        const response = await axios.post('http://10.0.0.21:5000/predict', {
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
