import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { predictWorkoutProgram } from './api'; // The API call function
import axios from 'axios';

const predictWorkoutProgram = async (features) => {
  try {
    const response = await axios.post('https://your-api-url.com/predict', {
      features: features
    });

    return response.data.prediction;
  } catch (error) {
    console.error('Error making prediction:', error);
    throw error;
  }
};

const WorkoutPredictor = () => {
  const [features, setFeatures] = useState({
    gender: '',
    age: '',
    weight: '',
    height: '',
    goal: '',
    physicalLevel: '',
    placeOfExercise: '',
    medicalCondition: ''
  });
  const [prediction, setPrediction] = useState(null);

  const handlePredict = async () => {
    try {
      const result = await predictWorkoutProgram(Object.values(features));
      setPrediction(result);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View>
      {/* Input Fields */}
      <TextInput placeholder="Gender" onChangeText={(value) => setFeatures({ ...features, gender: value })} />
      <TextInput placeholder="Age" onChangeText={(value) => setFeatures({ ...features, age: value })} />
      <TextInput placeholder="Weight" onChangeText={(value) => setFeatures({ ...features, weight: value })} />
      <TextInput placeholder="Height" onChangeText={(value) => setFeatures({ ...features, height: value })} />
      <TextInput placeholder="Goal" onChangeText={(value) => setFeatures({ ...features, goal: value })} />
      <TextInput placeholder="Physical Level" onChangeText={(value) => setFeatures({ ...features, physicalLevel: value })} />
      <TextInput placeholder="Place of Exercise" onChangeText={(value) => setFeatures({ ...features, placeOfExercise: value })} />
      <TextInput placeholder="Medical Condition" onChangeText={(value) => setFeatures({ ...features, medicalCondition: value })} />
      
      <Button title="Predict Workout Program" onPress={handlePredict} />
      
      {/* Display Prediction */}
      {prediction && <Text>Your Workout Program: {prediction}</Text>}
    </View>
  );
};

export default WorkoutPredictor;
