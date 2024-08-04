
import React, { useState, useEffect, useContext } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import Back from "../../../assets/arrowBack.png";
import Ellipse from "../../../assets/blueEllipse.png";
import axios from "axios";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Mentor1 from "../../../assets/mentor1.png";
import Mentor2 from "../../../assets/mentor2.png";
import Mentor3 from "../../../assets/mentor3.png";
import Mentor4 from "../../../assets/mentor4.png";
import Star from "../../../assets/star_filled.png";
import { DarkModeContext } from "../../../components/DarkModeContext"; // Adjust the path as per your project structure

const PhysicalMentors = ({ navigation,route }) => {
  const {username}=route.params;
  const { isDarkMode } = useContext(DarkModeContext);

  const imageMap = {
    "Mira D.": Mentor2,
    "Fares J.": Mentor1,
    "James S.": Mentor3,
    "Mira D. Alt": Mentor4,
  };

  const [mentors, setMentors] = useState([]);

  useEffect(() => {
    const fetchMentors = async () => {
      try {
        const response = await axios.get("http://10.0.0.21:3001/mentors");
        setMentors(response.data);
      } catch (error) {
        console.error("Error fetching mentors:", error);
      }
    };

    fetchMentors();
  }, []);

  const backToPsychoSection = () => {
    navigation.navigate("PsychologicalSection",{username});
  };

  return (
    <View style={{ flex: 1, backgroundColor: isDarkMode ? "#1A1A1A" : "#fff" }}>
      <TouchableOpacity onPress={backToPsychoSection}>
        <Image
          style={{ width: 50, height: 50, marginLeft: 20, marginTop: 50 }}
          source={Back}
        />
      </TouchableOpacity>

      <Image
        style={{ width: 140, height: 140, marginLeft: 300, marginTop: -120 }}
        source={Ellipse}
      />
      <Text
        style={{
          fontSize: 35,
          marginLeft: 20,
          fontWeight: "bold",
          color: isDarkMode ? "#fff" : "#032B79",
          marginBottom: 20,
        }}
      >
        Mentors
      </Text>
      <GestureHandlerRootView style={styles.scrollViewContainer}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {mentors.map((b, index) => (
            <View key={index} style={[styles.container, { backgroundColor: isDarkMode ? "#3A3A3A" : "#719AEA" }]}>
              <Text
                style={{
                  color: isDarkMode ? "#fff" : "white",
                  backgroundColor: isDarkMode ? "#032B79" : "#032B79",
                  width: "20%",
                  paddingLeft: 9,
                  padding: 5,
                  borderRadius: 20,
                  marginLeft: 100,
                }}
              >
                {b.rating}
              </Text>
              <Image
                style={{
                  width: 15,
                  height: 15,
                  position: "absolute",
                  marginLeft: 172,
                  marginTop: 47,
                }}
                source={Star}
              />
              <Text
                style={{
                  color: isDarkMode ? "#425D7B" : "#425D7B",
                  backgroundColor: isDarkMode ? "#fff" : "white",
                  fontWeight: "bold",
                  padding: 5,
                  width: "40%",
                  fontSize: 12,
                  borderRadius: 10,
                  textAlign: "center",
                  marginLeft: -20,
                  marginTop: -28,
                  marginBottom: 10,
                }}
              >
                {b.type}
              </Text>

              <Text
                style={{
                  color: isDarkMode ? "#fff" : "white",
                  fontSize: 18,
                  fontWeight: "bold",
                  marginLeft: -20,
                  marginBottom: 5,
                }}
              >
                {b.name}
              </Text>
              <Text style={{ color: isDarkMode ? "#fff" : "white", marginLeft: -20 }}>
                {b.description}
              </Text>
              <TouchableOpacity
                key={b.id}
                style={[styles.buttonApp, { backgroundColor: isDarkMode ? "#032B79" : "#032B79" }]}
                onPress={() =>
                  navigation.navigate("PhysicalMentorAvailability", {
                    name: b.name,
                    image: imageMap[b.name],
                    description: b.description,
                    rating: b.rating,
                    type: b.type,
                    availableTimes: b.availableTimes,
                    username
                  })
                }
              >
                <Text style={{ color: "white", textAlign: "center", fontSize: 13 }}>
                  Book an Appointment
                </Text>
              </TouchableOpacity>

              <Image source={imageMap[b.name]} style={styles.bookImage} />
            </View>
          ))}
        </ScrollView>
      </GestureHandlerRootView>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    height: "80%",
  },
  container: {
    marginBottom: 50,
    padding: 40,
    width: "90%",
    left: 20,
    borderRadius: 30,
    height: 200,
  },
  bookImage: {
    width: 190,
    height: 205,
    borderRadius: 20,
    left: 120,
    top: -160,
  },
  buttonApp: {
    width: "60%",
    padding: 5,
    marginLeft: -20,
    top: 10,
    textAlign: "center",
    borderRadius: 20,
  },
});

export default PhysicalMentors;
