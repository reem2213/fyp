import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
Dimensions,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { DarkModeContext } from "../../../components/DarkModeContext"; // Import the context
const { width,height } = Dimensions.get('window');

export default function FinalScreen({ route, navigation }) {
  const {
    age,
    gender,
    height,
    weight,
    goal,
    physicalLevel,
    medicalCondition,
    place,
  } = route.params;
  const { username,userId } = route.params;
  const [bio, setBio] = useState("");
  const [imageData, setImageData] = useState(null);
  const { isDarkMode } = useContext(DarkModeContext); // Use the context


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
  const handleSubmit = async () => {
    try {
      const response = await fetch(
        `http://10.0.0.21:3001/formData/${username}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            age,
            gender,
            height,
            weight,
            goal,
            physicalLevel,
            medicalCondition,
            place,
          }),
        }
      );

      if (response.ok) {
        const result = await response.json();
        Alert.alert("Success", "Your data has been submitted");
        navigation.navigate("ResultScreen", {
          age,
          gender,
          username,
          bio,
          imageData,
          height,
          weight,
          physicalLevel,
          medicalCondition,
          place,
          
          userId
        });
      } else {
        throw new Error("Something went wrong");
      }
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <SafeAreaView style={[styles.container,{ backgroundColor: isDarkMode ? "black" : "#fff" }]}>
      <View style={styles.circleLeft} />
        <View style={styles.circleLeft1} />
        <View style={styles.circleLeft2} />

        <View style={styles.circleRight} />

      <View style={styles.content}>
        <Text style={[styles.headerText,{color: isDarkMode ? "white" : "black"}]}>Your Information</Text>

        <View style={styles.infoContainer}>
          <Text style={[styles.infoTitle,{color: isDarkMode ? "white" : "black"}]}>Gender:</Text>
          <Text style={[styles.infoText,{color: isDarkMode ? "white" : "black"}]}>{gender}</Text>
        </View>

        <View style={styles.infoContainer}>
          <Text style={[styles.infoTitle,{color: isDarkMode ? "white" : "black"}]}>Height:</Text>
          <Text style={[styles.infoText,{color: isDarkMode ? "white" : "black"}]}>{height} cm</Text>
        </View>

        <View style={styles.infoContainer}>
          <Text style={[styles.infoTitle,{color: isDarkMode ? "white" : "black"}]}>Goal:</Text>
          <Text style={[styles.infoText,{color: isDarkMode ? "white" : "black"}]}>{goal}</Text>
        </View>

        <View style={styles.infoContainer}>
          <Text style={[styles.infoTitle,{color: isDarkMode ? "white" : "black"}]}>Medical Condition:</Text>
          <Text style={[styles.infoText,{color: isDarkMode ? "white" : "black"}]}>{medicalCondition || "None"}</Text>
        </View>

        <View style={styles.infoContainer}>
          <Text style={[styles.infoTitle,{color: isDarkMode ? "white" : "black"}]}>Favorite Place to Exercise:</Text>
          <Text style={[styles.infoText,{color: isDarkMode ? "white" : "black"}]}>{place}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={[styles.infoTitle,{color: isDarkMode ? "white" : "black"}]}>Favorite Place to Exercise:</Text>
          <Text style={[styles.infoText,{color: isDarkMode ? "white" : "black"}]}>{physicalLevel}</Text>
        </View>

        <View style={styles.navigationButtons}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={20} color="white" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.nextButton} onPress={handleSubmit}>
            <Text style={styles.nextButtonText}>Finish</Text>
            <Ionicons name="arrow-forward" size={20} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  content: {
    alignItems: "center",
    justifyContent: "center",
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#087CEA",
    marginBottom: 20,
    textAlign: "center",
  },
  infoContainer: {
    marginBottom: 20,
    alignItems: "center",
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  infoText: {
    fontSize: 16,
    color: "#555",
  },
  navigationButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    marginTop: 20,
  },
  backButton: {
    flexDirection: "row",
    backgroundColor: "#000000",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    alignItems: "center",
  },
  nextButton: {
    flexDirection: "row",
    backgroundColor: "#083EA7",
    paddingHorizontal: 40,
    paddingVertical: 10,
    borderRadius: 20,
    alignItems: "center",
  },
  nextButtonText: {
    color: "#fff",
    fontSize: 16,
    marginLeft: 5,
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
