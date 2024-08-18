import React, { useState } from "react";
import { View, TextInput, Button, Text } from "react-native";
import predictWorkoutProgram from "./api"; // The API call function

const WorkoutPredictor = () => {
  const [features, setFeatures] = useState({
    gender: "",
    goal: "",
    physicalLevel: "",
    placeOfExercise: "",
    medicalCondition: "",
    age: "",
    weight: "",
    height: "",
  });
  const [prediction, setPrediction] = useState(null);

  const handlePredict = async () => {
    try {
      const processedFeatures = Object.entries(features).map(([key, value]) => {
        if (value === '' || value === null || value === undefined) {
          return key === 'age' || key === 'weight' || key === 'height' ? 0 : 'Unknown';
        }
        return value;
      });
      console.log("Sending features:", processedFeatures);
      const result = await predictWorkoutProgram(processedFeatures);
      setPrediction(result);
      console.log("the result",result);

    } catch (error) {
      console.error(error);
    }
  };


  return (
    <View style={{padding:20,marginTop:50}}>

      <TextInput
        placeholder="Gender"
        onChangeText={(value) => setFeatures({ ...features, gender: value })}
      />
     
      <TextInput
        placeholder="Goal"
        onChangeText={(value) => setFeatures({ ...features, goal: value })}
      />
      <TextInput
        placeholder="Physical Level"
        onChangeText={(value) =>
          setFeatures({ ...features, physicalLevel: value })
        }
      />
      <TextInput
        placeholder="Medical Condition"
        onChangeText={(value) =>
          setFeatures({ ...features, medicalCondition: value })
        }
      />
      <TextInput
        placeholder="Place of Exercise"
        onChangeText={(value) =>
          setFeatures({ ...features, placeOfExercise: value })
        }
      />
       <TextInput
        placeholder="Age"
        keyboardType="numeric"
        onChangeText={(value) => setFeatures({ ...features, age: value })}
      />
      <TextInput
        placeholder="Height"
        keyboardType="numeric"
        onChangeText={(value) => setFeatures({ ...features, height: value })}
      />
      <TextInput
        placeholder="Weight"
        keyboardType="numeric"
        onChangeText={(value) => setFeatures({ ...features, weight: value })}
      />

      <Button title="Predict Workout Program" onPress={handlePredict} />

      {prediction && <Text>Your Workout Program: {prediction}</Text>}
    </View>
  );
};

export default WorkoutPredictor;
