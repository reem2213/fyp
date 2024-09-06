import React,{useState,useContext,useEffect} from 'react';
import { View, Text, StyleSheet, SafeAreaView,Dimensions,TouchableOpacity } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { Ionicons } from '@expo/vector-icons';
import predictWorkoutProgram from "../api"; // The API call function
import { DarkModeContext } from "../../../components/DarkModeContext"; // Import the context
import axios from 'axios';
const { width, height } = Dimensions.get('window');

export default function ProgressScreen({navigation,route}) {
  const { username,height,weight ,userId} = route.params;
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
            physicalLevel: data.physicalLevel || "",
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
      userId,
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
      <View style={styles.circleLeft} />
        <View style={styles.circleLeft1} />
        <View style={styles.circleLeft2} />

        <View style={styles.circleRight} />

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
  circleLeft: {
    position: 'absolute',
    bottom: -width * 0.2,
    left: -width * 0.2,
    width: width * 0.4,
    height: width * 0.4,
    borderRadius: width * 0.2,
    backgroundColor: '#4A90E2',
  },
  circleLeft1: {
    position: 'absolute',
    left: -70,
    top:-60,
    width: width * 0.4,
    height: width * 0.4,
    borderRadius: width * 0.2,
    backgroundColor: '#4A90E2',
  },
  circleLeft2: {
    position: 'absolute',
    left: 330,
    top:-60,
    width: width * 0.4,
    height: width * 0.4,
    borderRadius: width * 0.2,
    backgroundColor: '#4A90E2',
  },
  circleRight: {
    position: 'absolute',
    bottom: -width * 0.2,
    right: -width * 0.2,
    width: width * 0.4,
    height: width * 0.4,
    borderRadius: width * 0.2,
    backgroundColor: '#4A90E2',
  },
});