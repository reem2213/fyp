import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { DarkModeContext } from "../../components/DarkModeContext"; // Import the context

import { GestureHandlerRootView } from "react-native-gesture-handler";
import { WebView } from "react-native-webview";

import GoalSection from "../../assets/Plan.png";
import MusicSection from "../../assets/mentorsSection.png";
import FeedbackSection from "../../assets/communitySection.png";
import GameSection from "../../assets/Plan.png";

const Home = ({ navigation, route }) => {
  const { username } = route.params;
  const [bio, setBio] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const { isDarkMode } = useContext(DarkModeContext); // Use the context
  const [imageData, setImageData] = useState(null);
  const [timeGoal, setTimeGoal] = useState(30);
  const [calorieGoal, setCalorieGoal] = useState(120);
  const [weightGoal, setWeightGoal] = useState(weight);
  const [bmiResult, setBmiResult] = useState("");
  const[weight,setWeight]=useState();
  const[height,setHeight]=useState();
  const [prediction, setPrediction] = useState(null);  // New state for prediction


  
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
          // Handle data - set it to state variables
          setHeight(data.height);
          setWeight(data.weight);
          // Set other physical attributes if needed
        }
      })
      .catch((error) => {
        console.error("Error fetching physical attributes:", error);
      });
  }, [username]);



  useEffect(() => {
    fetch(`http://10.0.0.21:3001/getPrediction/${username}`)
      .then((response) => response.json())
      .then((data) => {
        if (data && data.prediction) {
          setPrediction(data.prediction);
        }
      })
      .catch((error) => {
        console.error("Error fetching prediction:", error);
      });
  }, [username]);
  const GoToGoalSection = () => {
    navigation.navigate("Plan",{prediction});
  };

  const GoToMusicSection = () => {
    navigation.navigate("PhysicalMentor",{username});
  };

  const GoToFeedbackSection = () => {
    navigation.navigate("PhysicalCommunity",{username});
  };
  const GoToGamificationSection = () => {
    navigation.navigate("Shop");
  };

  const goToProfile = () => {
    navigation.navigate("MyProfile", { username, bio, imageData });
  };
  const GoToBodyPlanAssistant = () => {
    navigation.navigate("Screen2", { username, bio, imageData });
  };
  

  const calculateBMI = (weight, height) => {
    return (weight / (height / 100) ** 2).toFixed(1);
  };

  const bmi = calculateBMI(weight, height);

  useEffect(() => {
    if (bmi < 18.5) {
      setBmiResult("Underweight");
      setTimeGoal(30);
      setCalorieGoal(150);
      setWeightGoal(weight + 5);


    } else if (bmi >= 18.5 && bmi < 25) {
      setBmiResult("Normal");
      setTimeGoal(30);
      setCalorieGoal(200);
      setWeightGoal(weight);

    } else if (bmi >= 25 && bmi < 30) {
      setBmiResult("Overweight");
      setTimeGoal(45);
      setCalorieGoal(250);
      setWeightGoal(weight - 5);

    } else {
      setBmiResult("Obese");
      setTimeGoal(60);
      setCalorieGoal(300);
      setWeightGoal(weight - 10);
    }
  }, [bmi]);

  return (
    <>
      <GestureHandlerRootView
        style={[
          styles.container,
          { backgroundColor: isDarkMode ? "black" : "#fff" },
        ]}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <View
            style={[
              { width: "70%", top: -100 },
              { backgroundColor: isDarkMode ? "black" : "#fff" },
            ]}
          >
            <TouchableOpacity onPress={goToProfile}>
              <WebView
                style={[
                  styles.imagee,
                  { backgroundColor: isDarkMode ? "black" : "#fff" },
                ]}
                originWhitelist={["*"]}
                source={{
                  html: `<img src="data:image/jpeg;base64,${imageData}" style="width:250px; height:250px;margin-top:150px;" />`,
                }}
              />
            </TouchableOpacity>

            <Text style={styles.welcome}>Hello {username}</Text>
                  <Text>Your Prediction: {prediction}</Text>

          </View>

          <View style={styles.content}>
            <Text style={styles.howAreYou}>Have You Exercise today?</Text>

            <View style={styles.goalsContainer}>
              <Text style={styles.goalsTitle}>
                Don't forget your daily goals!
              </Text>
              <View style={styles.goalItem}>
                <Text style={styles.goalText}>Time:</Text>
                <Text style={styles.goalValue}>{timeGoal} min</Text>
              </View>
              <View style={styles.goalItem}>
                <Text style={styles.goalText}>Calories:</Text>
                <Text style={styles.goalValue}>{calorieGoal} Cal</Text>
              </View>
              <View style={styles.goalItem}>
                <Text style={styles.goalText}>Weight:</Text>
                <Text style={styles.goalValue}>{weightGoal} kg</Text>
              </View>
            </View>

            <View style={styles.container}>
              <Text style={styles.headerText}>BMI Result</Text>
              <Text style={styles.bmiValue}>
                {bmi} ({bmiResult})
              </Text>
              <View style={styles.bmiBar}>
                <View style={[styles.bmiSegment, styles.bmiUnderweight]} />
                <View style={[styles.bmiSegment, styles.bmiNormal]} />
                <View style={[styles.bmiSegment, styles.bmiOverweight]} />
                <View style={[styles.bmiSegment, styles.bmiObese]} />
                <View
                  style={[
                    styles.bmiIndicator,
                    { left: `${(bmi - 10) * 2.5}%` },
                  ]}
                />
              </View>
              <Text style={styles.disclaimer}>
                You can't judge if you're "obese" just by BMI value. People can
                have more fat than muscle with normal BMI and still classify as
                obese.
              </Text>
              <Text style={styles.bmiValue}>Our Sections</Text>

              {imageData && (
                <Image
                  source={{ uri: imageData }}
                  style={styles.profileImage}
                />
              )}
            </View>

            <TouchableOpacity onPress={GoToGoalSection}>
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>My Plan</Text>
                <Text style={styles.sectionSubtitle}>
                  Stay Focused, Achieve More!
                </Text>
                <Image source={GoalSection} style={styles.sectionImage} />
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={GoToMusicSection}>
              <View style={styles.section2}>
                <Text style={styles.sectionTitle2}>Mentors</Text>
                <Text style={styles.sectionSubtitle}>
                  Connect with Mentors for Enlightening Conversations and
                  Productive Meetings
                </Text>
                <Image source={MusicSection} style={styles.sectionImage} />
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={GoToFeedbackSection}>
              <View style={styles.section3}>
                <Text style={styles.sectionTitle}>Communities</Text>
                <Text style={styles.sectionSubtitle}>
                  Where Ideas Flourish, Friendships Blossom, and Support Flows
                  Freely
                </Text>
                <Image source={FeedbackSection} style={styles.sectionImage} />
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={GoToGamificationSection}>
              <View style={styles.section4}>
                <Text style={styles.sectionTitle}>Shop</Text>
                <Text style={styles.sectionSubtitle}>
                  Complete tasks, earn badges, level up!
                </Text>
                <Image source={GameSection} style={styles.sectionImage} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={GoToBodyPlanAssistant}>
              <View style={styles.section5}>
                <Text style={styles.sectionTitle}>Body Program Assistant </Text>
                <Text style={styles.sectionSubtitle}>
                focus on personalized plans based on the user's body metrics
                </Text>
                <Image source={GameSection} style={styles.sectionImage} />
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </GestureHandlerRootView>
    </>
  );
};

export default Home;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  welcome: {
    position: "absolute",
    fontWeight: "bold",
    top: 180,
    left: 90,
    color: "#1B436F",
    fontSize: 20,
    width: "50%",
  },
  content: {
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  bio: {
    color: "red",
    marginTop: 50,
    marginLeft: 50,
  },

  howAreYou: {
    marginBottom: 20,
    fontSize: 15,
    fontWeight: "500",
    color: "#6D6D6D",
    marginTop: -50,
    marginLeft: 20,
    position: "absolute",
  },

  image: {
    width: 400,
    height: 300,
    marginTop: 80,
    marginLeft: -30,
  },
  section: {
    marginBottom: 20,
    width: "100%",
    height: 150,
    borderRadius: 30,
    backgroundColor: "#F6475C",
    shadowOffset: {
      width: 0,
      height: 40,
    },
    shadowColor: "rgba(0, 0, 0, 1.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  section2: {
    marginBottom: 20,
    width: "100%",
    height: 150,
    borderRadius: 30,
    backgroundColor: "#032B79",
    shadowOffset: {
      width: 0,
      height: 40,
    },
    shadowColor: "rgba(0, 0, 0, 1.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  section3: {
    marginBottom: 20,
    width: "100%",
    height: 150,
    borderRadius: 30,
    backgroundColor: "#D8DB57",
    shadowOffset: {
      width: 0,
      height: 40,
    },
    shadowColor: "rgba(0, 0, 0, 1.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  section4: {
    marginBottom: 20,
    width: "100%",
    height: 150,
    borderRadius: 30,
    backgroundColor: "#719AEA",
    shadowOffset: {
      width: 0,
      height: 40,
    },
    shadowColor: "rgba(0, 0, 0, 1.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  section5: {
    marginBottom: 20,
    width: "100%",
    height: 150,
    borderRadius: 30,
    backgroundColor: "purple",
    shadowOffset: {
      width: 0,
      height: 40,
    },
    shadowColor: "rgba(0, 0, 0, 1.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  sectionTitle: {
    color: "white",
    fontWeight: "bold",
    fontSize: 25,
    marginBottom: 5,
    marginLeft: -150,
    top: 7,
    width: "50%",
  },
  sectionTitle2: {
    color: "white",
    fontWeight: "bold",
    fontSize: 25,
    marginBottom: 5,
    marginLeft: -230,
    top: 15,
  },
  sectionSubtitle: {
    color: "white",
    fontWeight: "400",
    fontSize: 12,
    marginLeft: -110,
    top: 7,
    width: "60%",
  },
  sectionImage: {
    width: "40%",
    height: 100,
    marginTop: -20,
    marginLeft: 170,
  },

  imagee: {
    width: 200,
    height: 200,
    top: 100,
    left: 10,
  },

  bmiValue: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },
  bmiBar: {
    flexDirection: "row",
    height: 10,
    width: "100%",
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 10,
  },
  bmiSegment: {
    flex: 1,
  },
  bmiUnderweight: {
    backgroundColor: "blue",
  },
  bmiNormal: {
    backgroundColor: "green",
  },
  bmiOverweight: {
    backgroundColor: "yellow",
  },
  bmiObese: {
    backgroundColor: "red",
  },
  bmiIndicator: {
    position: "absolute",
    top: 0,
    width: 8,
    height: 90,
    borderRadius: 100,
    height: "100%",
    backgroundColor: "black",
  },
  disclaimer: {
    fontSize: 12,
    color: "gray",
    textAlign: "center",
    marginVertical: 10,
  },

  goalsContainer: {
    marginTop: -10,
    marginBottom: 20,
    padding: 15,
    borderRadius: 10,
    backgroundColor: "#719AEA",
  },
  goalsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    marginBottom: 10,
  },
  goalItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  goalText: {
    fontSize: 16,
    color: "white",
  },
  goalValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
});



