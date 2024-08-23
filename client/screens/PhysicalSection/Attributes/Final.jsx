import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { DarkModeContext } from "../../../components/DarkModeContext"; // Import the context

export default function FinalScreen({ route, navigation }) {
  const {
    age,
    gender,
    height,
    weight,
    goal,
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
      <View style={styles.circleTopLeft}></View>
      <View style={styles.circleTopRight}></View>
      <View style={styles.circleBottomLeft}></View>
      <View style={styles.circleBottomRight}></View>

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
  circleTopLeft: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#719AEA",
    position: "absolute",
    top: 0,
    left: 0,
  },
  circleTopRight: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#719AEA",
    position: "absolute",
    top: 0,
    right: 0,
  },
  circleBottomLeft: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#719AEA",
    position: "absolute",
    bottom: 0,
    left: 0,
  },
  circleBottomRight: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#719AEA",
    position: "absolute",
    bottom: 0,
    right: 0,
  },
});
