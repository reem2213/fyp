import React,{useState,useContext,useEffect} from 'react';
import { View, Text, StyleSheet, SafeAreaView,TouchableOpacity } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { Ionicons } from '@expo/vector-icons';
import predictWorkoutProgram from "../api"; // The API call function
import { DarkModeContext } from "../../../components/DarkModeContext"; // Import the context
import axios from 'axios';
export default function ProgressScreen({navigation,route}) {
  const { username,height,weight } = route.params;
  const [bio, setBio] = useState("");
  const [imageData, setImageData] = useState(null);
  const { isDarkMode } = useContext(DarkModeContext); // Use the context

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

  useEffect(() => {
    fetch(`http://10.0.0.21:3001/userr/${username}`)
      .then((response) => response.json())
      .then((data) => {
        setBio(data.bio);
        setImageData(data.image);

        console.log("donee");
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, [username]);
  useEffect(() => {
    fetch(`http://10.0.0.21:3001/formData/${username}`)
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          setFeatures({
            gender: data.gender || "",
            goal: data.goal || "",
            physicalLevel: data.physicalLevel || "True Beast",
            placeOfExercise: data.place || "",
            medicalCondition: data.medicalCondition || "",
            age: data.age || "",
            weight: data.weight || "",
            height: data.height || "",
          });
        }
      })
      .catch((error) => {
        console.error("Error fetching physical attributes:", error);
      });
  }, [username]);


const handlePredict = async () => {
  const responses = await axios.get("http://10.0.0.21:3001/get-userid", {
    params: { username },
  });
  const userId = responses.data.userId;
  try {
    const processedFeatures = Object.entries(features).map(([key, value]) => {
      if (value === "" || value === null || value === undefined) {
        return key === "age" || key === "weight" || key === "height"
          ? 0
          : "Unknown";
      }
      return value;
    });

    console.log("Sending features:", processedFeatures);
    const result = await predictWorkoutProgram(processedFeatures);
    setPrediction(result);
    console.log("The result:", result);

    // Save the prediction to AsyncStorage
    await fetch('http://10.0.0.21:3001/savePrediction', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId, prediction: result }), // Pass userId here
    });
    // Now navigate to PhysicalHome with the prediction result
    navigation.navigate("PhysicalHome", {
      username,
      bio,
      imageData,
      height,
      weight,
      prediction: result, // Pass the prediction result
    });
    
  } catch (error) {
    console.error(error);
  }
};


 
  return (
    <SafeAreaView style={[styles.container,{ backgroundColor: isDarkMode ? "black" : "#fff" }]}>
      <View style={styles.circleTopLeft}></View>
      <View style={styles.circleTopRight}></View>
      <View style={styles.circleBottomLeft}></View>
      <View style={styles.circleBottomRight}></View>

      <View style={styles.content}>
        <AnimatedCircularProgress
          size={150}
          width={15}
          fill={100}
          tintColor="#083EA7"
          backgroundColor="#e0e0e0"
          rotation={1}
          lineCap="round"
        >
          {fill => (
            <Text style={styles.progressText}>
              {`${Math.round(fill)}%`}
            </Text>
          )}
        </AnimatedCircularProgress>

        <Text style={[styles.statusText,{color: isDarkMode ? "white" : "black"}]}>Almost there ...</Text>

        <Text style={styles.quoteText}>
          "Success is not the key to happiness. Happiness is the key to success. If you love what you are doing, you will be successful."
        </Text>
        <TouchableOpacity
            style={styles.nextButton}
            onPress={handlePredict}
          >
            <Text style={[styles.nextButtonText,{color: isDarkMode ? "white" : "black"}]}>Finish</Text>
            {prediction && <Text>Your Workout Program: {prediction}</Text>}

            <Ionicons name="arrow-forward" size={20} color="white" />
          </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#083EA7',
  },
  statusText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 20,
    textAlign: 'center',
  },
  quoteText: {
    fontSize: 16,
    color: '#888',
    marginTop: 20,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  authorText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 10,
    textAlign: 'center',
  },
  circleTopLeft: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#719AEA',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  circleTopRight: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#719AEA',
    position: 'absolute',
    top: 0,
    right: 0,
  },
  circleBottomLeft: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#719AEA',
    position: 'absolute',
    bottom: 0,
    left: 0,
  },
  circleBottomRight: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#719AEA',
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
});