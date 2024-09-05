import React, { useState, useEffect, useContext, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Animated,
} from "react-native";
import { DarkModeContext } from "../components/DarkModeContext"; // Import the context

import { GestureHandlerRootView } from "react-native-gesture-handler";
import { WebView } from "react-native-webview";
import Noti from "../assets/notification.png";
import GoalSection from "../assets/goalSection.png";
import MusicSection from "../assets/music.png";
import FeedbackSection from "../assets/feedback.png";
import GameSection from "../assets/game.png";
import Plus from "../assets/plus.png";
import CommunityDark from "../assets/communityDark.png";
import HomeDark from "../assets/homeDark.png";
import SettingsDark from "../assets/settings.png";
import PsychoDark from "../assets/psychologicDark.png";
import PhysicalDark from "../assets/physicalSectionDark.png";
import Psycho from "../assets/psychologicLight.png";
import Physical from "../assets/physicalSectionLight.png";
import SettingsIcon from "../assets/LightSettings.png";
import HomeIcon from "../assets/homeLight.png";
import CommunityLight from "../assets/communityLight.png";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AwesomeAlert from "react-native-awesome-alerts";
import axios from "axios";
import { BarChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
import NotiDark from "../assets/notiDark.png";
import NotiWhite from "../assets/notiWhite.png";
import WhitePost from '../assets/whitePost.png';
const screenWidth = Dimensions.get("window").width;
const SccreenTime = ({ screenTimeData }) => {
  const chartData = {
    labels: ["Goal", "Music", "Game", "Post"],
    datasets: [
      {
        data: [
          screenTimeData.goal || 0,
          screenTimeData.music || 0,
          screenTimeData.game || 0,
          screenTimeData.post || 0,
        ],
      },
    ],
  };

  return (
    <BarChart
      data={chartData}
      width={screenWidth - 20}
      height={220}
      yAxisLabel=""
      yAxisSuffix=""
      yLabelsOffset={8}
      fromZero={true}
      chartConfig={{
        backgroundColor: "white",
        backgroundGradientFrom: "blue",
        backgroundGradientTo: "gray",
        decimalPlaces: 0,
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        style: {
          borderRadius: 16,
        },
        propsForBackgroundLines: {
          strokeDasharray: "", // Solid background lines
          strokeWidth: 1,
          stroke: "rgba(255, 255, 255, 0.2)",
        },
        formatYLabel: (yValue) => {
          const value = Number(yValue);
          if (!isNaN(value)) {
            return value > 60
              ? `${(value / 60).toFixed(1)}min` // Convert to minutes if > 60 seconds
              : `${value}s`; // Otherwise, show in seconds
          }
          return "0s"; // Fallback for invalid values
        },
      }}
      verticalLabelRotation={0}
      style={{
        marginVertical: 8,
        borderRadius: 16,
        marginTop: 50,
        marginLeft: -10,
      }}
      yAxisInterval={1} // Set y-axis interval
      showBarTops={true}
      yAxisMinValue={0} // Force min y-axis value
      yAxisMaxValue={90} // Force max y-axis value
    />
  );
};

const Home = ({ navigation, route }) => {
  const { username, userId } = route.params;
  const [bio, setBio] = useState("");
  const [focusedButton, setFocusedButton] = useState(null);
  const { isDarkMode } = useContext(DarkModeContext); // Use the context
  const [imageData, setImageData] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [alertTitle, setAlertTitle] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [confirmButtonColor, setConfirmButtonColor] = useState("#DD6B55");
  const [overlayColor, setOverlayColor] = useState("rgba(0, 0, 0, 0.7)");
  const [isFocused, setIsFocused] = useState(false);

  console.log("UserId in Home:", userId);
  const showMotivationalAlert = (mood) => {
    let message = "";
    let title = "";
    let buttonColor = "#DD6B55"; // Default color
    let bgColor = "rgba(0, 0, 0, 0.7)"; // Default color

    switch (mood) {
      case "Calm":
        title = "Stay Calm🌈";
        message =
          "Keep the calmness within you. It brings peace and clarity!😄";
        buttonColor = "#7F81E3";
        bgColor = "#7F81E3"; // Blue with opacity

        break;
      case "Happy":
        title = "Spread Happiness🤩";
        message = "Happiness is contagious✨. Spread it everywhere you go!";
        buttonColor = "#EB1F88";
        bgColor = "#EB1F88"; // Pink with opacity

        break;
      case "Sad":
        title = "It's Okay to be Sad";
        message = "It's okay to feel sad. Better days are coming😊!";
        buttonColor = "#44F255";
        bgColor = "#44F255"; // Green with opacity

        break;
      case "Angry":
        title = "Control Your Anger✋";
        message =
          "Take a deep breath. Anger is a passing storm, calm is your true nature.";
        buttonColor = "#FFAE64";
        bgColor = "#FFAE64"; // Red with opacity

        break;
      default:
        message = "Stay positive!";
    }

    setAlertMessage(message);
    setAlertTitle(title);
    setConfirmButtonColor(buttonColor);
    setOverlayColor(bgColor);
    setShowAlert(true);
  };

  const closeAlert = () => {
    // Stop the animation and hide the emojis
    setShowAlert(false);
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const response = await axios.get(`http://10.0.0.21:3001/user/${userId}`);
      setBio(response.data.bio);
      setImageData(response.data.image);
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  const checkPhysicalAttributes = () => {
    fetch(`http://10.0.0.21:3001/formData/${username}`)
      .then((response) => response.json())
      .then((data) => {
        if (data && data.age && data.gender && data.height && data.weight) {
          navigation.navigate("PhysicalHome", {
            username,
            bio,
            imageData,
            userId,
          });
        } else {
          navigation.navigate("PhysicalSection", { username, userId });
        }
      })
      .catch((error) => {
        console.error("Error fetching physical attributes:", error);
        navigation.navigate("PhysicalSection", { username });
      });
  };

  const [screenTimeData, setScreenTimeData] = useState({
    goal: 0,
    music: 0,
    game: 0,
    post: 0,
  });
  const [startTime, setStartTime] = useState(null);
  const [currentSection, setCurrentSection] = useState(null);

  useEffect(() => {
    const updateTime = () => {
      if (startTime && currentSection) {
        const elapsedTime = Math.floor((Date.now() - startTime) / 1000); // Convert to seconds
        console.log(
          `Updating time for ${currentSection}: ${elapsedTime} seconds`
        );
        setScreenTimeData((prevData) => ({
          ...prevData,
          [currentSection]: prevData[currentSection] + elapsedTime,
        }));
        setStartTime(Date.now());
      }
    };

    const timer = setInterval(updateTime, 1000); // Update every second

    return () => clearInterval(timer);
  }, [startTime, currentSection]);

  const startTracking = (section) => {
    if (currentSection) {
      updateTime();
    }
    console.log(`Starting tracking for ${section}`);
    setCurrentSection(section);
    setStartTime(Date.now());
  };

  const stopTracking = () => {
    updateTime();
    console.log(`Stopping tracking for ${currentSection}`);
    setCurrentSection(null);
    setStartTime(null);
  };

  const updateTime = () => {
    if (startTime && currentSection) {
      const elapsedTime = Math.floor((Date.now() - startTime) / 1000); // Convert to seconds
      const elapsedMinutes = Math.floor(elapsedTime / 60); // Convert to minutes
      const remainingSeconds = elapsedTime % 60; // Remaining seconds

      console.log(
        `Updating time for ${currentSection}: ${elapsedMinutes}m ${remainingSeconds}s`
      );

      setScreenTimeData((prevData) => ({
        ...prevData,
        [currentSection]:
          prevData[currentSection] + elapsedMinutes + remainingSeconds / 60, // Add minutes and fraction of minutes
      }));
      setStartTime(Date.now());
    }
  };

  useEffect(() => {
    const unsubscribeFocus = navigation.addListener("focus", () => {
      setIsFocused(true);
      stopTracking(); // Stop tracking when Home gains focus
    });

    const unsubscribeBlur = navigation.addListener("blur", () => {
      setIsFocused(false);
    });

    return () => {
      unsubscribeFocus();
      unsubscribeBlur();
    };
  }, [navigation]);

  const toNotifications = async () => {
    try {
      const storedNotifications = await AsyncStorage.getItem("Notifications");
      let notifications = storedNotifications
        ? JSON.parse(storedNotifications)
        : [];

      notifications = notifications.map((notif) => ({ ...notif, read: true }));
      await AsyncStorage.setItem(
        "Notifications",
        JSON.stringify(notifications)
      );
      setUnreadCount(0); // Reset the unread count

      navigation.navigate("Notifications", { username, userId });
    } catch (error) {
      console.error("Error updating notifications:", error);
    }
  };

  const toPosts = () => {
    navigation.navigate("Post", { username, userId });
    startTracking("post");
  };
  const GoToGoalSection = () => {
    navigation.navigate("goal", { username, userId });
    startTracking("goal");
  };

  const GoToMusicSection = () => {
    navigation.navigate("MusicTester2", { username, userId });
    startTracking("music");
  };

  const GoToFeedbackSection = () => {
    navigation.navigate("Feedback", { username, userId });
  };
  const GoToGamificationSection = () => {
    navigation.navigate("Gamification", { username, userId });
    startTracking("game");
  };

  const goToProfile = () => {
    navigation.navigate("MyProfile", { username, bio, imageData, userId });
  };

  const ToHome = (button) => {
    setFocusedButton(button);
    navigation.navigate("Home", { username, bio, imageData, userId });
  };
  const ToCommunity = (button) => {
    setFocusedButton(button);
    navigation.navigate("Community", { username, bio, imageData, userId });
  };
  const ToPsychologicalSection = (button) => {
    setFocusedButton(button);
    navigation.navigate("PsychologicalSection", {
      username,
      bio,
      imageData,
      userId,
    });
  };

  const ToPhysicalSection = (button) => {
    setFocusedButton(button);
    checkPhysicalAttributes();
  };

  const ToSettings = (button) => {
    setFocusedButton(button);
    navigation.navigate("Settings", { username, bio, imageData, userId });
  };

  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const storedNotifications = await AsyncStorage.getItem("Notifications");
        let notifications = storedNotifications
          ? JSON.parse(storedNotifications)
          : [];
        const unreadNotifications = notifications.filter(
          (notif) => !notif.read
        );
        setUnreadCount(unreadNotifications.length);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchNotifications();
  }, []);
  const { width, height } = Dimensions.get("window");

  return (
    <>
      <GestureHandlerRootView
        style={[
          styles.container,

          { backgroundColor: isDarkMode ? "black" : "#fff" },
        ]}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <Pressable onPress={toNotifications}>
            {isDarkMode ? (
              <Image style={styles.notiImage} source={NotiWhite} />
            ) : (
              <Image style={styles.notiImage} source={NotiDark} />
            )}
            {unreadCount > 0 && (
              <Text
                style={{
                  color: "white",
                  backgroundColor: "#032b79",
                  width: 24,
                  padding: 6,
                  height: 24,
                  top: 55,
                  left: 350,
                  borderRadius: 100,
                  fontSize: 8,
                  textAlign: "center",
                  position: "absolute",
                }}
              >
                {unreadCount}
              </Text>
            )}
          </Pressable>

          <Pressable onPress={toPosts}>
          {isDarkMode ? (
              <Image style={styles.notiImage2} source={WhitePost} />
            ) : (
              <Image style={styles.notiImage2} source={Plus} />
            )}
          </Pressable>

          <View
            style={[
              { width: "70%", top: -100 },
              { backgroundColor: isDarkMode ? "black" : "#fff" },
            ]}
          >
            <TouchableOpacity onPress={goToProfile}>
              {/* <WebView
                style={[
                  styles.imagee,
                  { backgroundColor: isDarkMode ? "black" : "#fff" },
                ]}
                originWhitelist={["*"]}
                source={{
                  html: `<img src="data:image/jpeg;base64,${imageData}" style="width:250px; height:250px;margin-top:150px;border-radius:150px" />`,
                }}
              /> */}
              {imageData ? (
                <Image
                  style={styles.imagee}
                  source={{ uri: `data:image/jpeg;base64,${imageData} ` }}
                />
              ) : (
                <Text>no imageeeeeeeeeee</Text>
              )}
            </TouchableOpacity>

            <Text
              style={[
                styles.welcome,
                { color: isDarkMode ? "white" : "#032B79" },
              ]}
            >
              {username}
            </Text>
            {/* <Text>{userId}</Text> */}
          </View>

          <View style={styles.content}>
            <Text style={[styles.howAreYou, {color: isDarkMode ? "white" : "#6D6D6D" }]}>How are you feeling today?</Text>
            <TouchableOpacity
              style={[styles.moodContainer, styles.calm]}
              onPress={() => showMotivationalAlert("Calm")}
            >
              <View style={styles.rect} />
              <Text style={[styles.moodText, {color: isDarkMode ? "white" : "#6D6D6D" }]}>Calm</Text>
              <Image
                style={styles.icon}
                source={require("../assets/calm.png")}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.focusLayout}
              onPress={() => showMotivationalAlert("Happy")}
            >
              <View style={[styles.rect1, styles.rect1Bg]} />
              <Text style={[styles.happy1, styles.manicTypo, {color: isDarkMode ? "white" : "#6D6D6D" }]}>Happy</Text>
              <Image
                style={[styles.happyIcon, styles.iconPosition1]}
                source={require("../assets/happy.png")}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.focusLayout2}
              onPress={() => showMotivationalAlert("Sad")}
            >
              <View style={[styles.rect12, styles.rect1Bg2]} />
              <Text style={[styles.manicTypo2, {color: isDarkMode ? "white" : "#6D6D6D" }]}>Sad</Text>
              <Image
                style={[styles.happyIcon2, styles.iconPosition12]}
                source={require("../assets/sad.png")}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.focusLayout3}
              onPress={() => showMotivationalAlert("Angry")}
            >
              <View style={[styles.rect3, styles.rect1Bg3]} />
              <Text style={[styles.manicTypo3, {color: isDarkMode ? "white" : "#6D6D6D" }]}>Angry</Text>
              <Image
                style={[styles.happyIcon3, styles.iconPosition3]}
                source={require("../assets/angry.png")}
              />
            </TouchableOpacity>

            {showAlert && (
              <View style={[styles.overlay]}>
                <AwesomeAlert
                  show={showAlert}
                  showProgress={false}
                  title={alertTitle}
                  message={alertMessage}
                  closeOnTouchOutside={true}
                  closeOnHardwareBackPress={false}
                  showConfirmButton={true}
                  confirmText="Okay"
                  confirmButtonColor={confirmButtonColor}
                  onConfirmPressed={closeAlert}
                  overlayStyle={{ backgroundColor: overlayColor, opacity: 0.5 }} // Custom overlay color
                />
              </View>
            )}
            <SccreenTime screenTimeData={screenTimeData} />
            <Text
              style={[{
                marginBottom: 20,
                marginTop: 20,
                fontSize: 30,
                fontWeight: "bold",
              }, {color: isDarkMode ? "white" : "#032B79" }]}
            >
              Our Sections
            </Text>

            <TouchableOpacity onPress={GoToGoalSection}>
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Goal Crusher</Text>
                <Text style={styles.sectionSubtitle}>
                  Stay Focused, Achieve More!
                </Text>
                <Image source={GoalSection} style={styles.sectionImage} />
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={GoToMusicSection}>
              <View style={styles.section2}>
                <Text style={styles.sectionTitle2}>Music Mood Booster</Text>
                <Text style={styles.sectionSubtitle}>
                  Let the music lift your spirits and energize your soul!
                </Text>
                <Image source={MusicSection} style={styles.sectionImage} />
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={GoToFeedbackSection}>
              <View style={styles.section3}>
                <Text style={styles.sectionTitle}>Feedback Loop</Text>
                <Text style={styles.sectionSubtitle}>
                  Fueling Growth and Success!
                </Text>
                <Image source={FeedbackSection} style={styles.sectionImage} />
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={GoToGamificationSection}>
              <View style={styles.section4}>
                <Text style={styles.sectionTitle}>Gamification</Text>
                <Text style={styles.sectionSubtitle}>
                  Complete tasks, earn badges, level up!
                </Text>
                <Image source={GameSection} style={styles.sectionImage} />
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </GestureHandlerRootView>
      <View
        style={[
          {
            flexDirection: "row",
            height: 70,
            padding: 7,
            paddingTop: -5,
            justifyContent: "space-around",
          },
          { backgroundColor: isDarkMode ? "black" : "#fff" },
        ]}
      >
        <TouchableOpacity onPress={() => ToHome("home")}>
          <Image
            source={focusedButton === "home" ? HomeDark : HomeDark}
            style={{ margin: 10, width: 40, height: 40, top: 0, left: 5 }}
          />
          <Text
            style={[{
              fontSize: 8,
              position: "absolute",
              top: 52,
              left: 25,
            },{ color: isDarkMode ? "white" : "#032B79" },]}
          >
            Home
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => ToCommunity("community")}>
          <Image
            source={
              focusedButton === "community" ? CommunityLight : CommunityLight
            }
            style={{ margin: 10, width: 40, height: 40, top: 0, left: 5 }}
          />
          <Text
            style={[{
              fontSize: 8,
              position: "absolute",
              top: 52,
              left: 15,
            },{ color: isDarkMode ? "white" : "#032B79" }]}
          >
            Community
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => ToPsychologicalSection("psychoSection")}
        >
          <Image
            source={focusedButton === "psychoSection" ? Psycho : Psycho}
            style={{ margin: 10, width: 40, height: 40, top: 0, left: 5 }}
          />
          <Text
            style={[{
              fontSize: 8,
              position: "absolute",
              top: 52,
              left: 15,
            },{ color: isDarkMode ? "white" : "#032B79" }]}
          >
            PsychoSection
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => ToPhysicalSection("physicalSection")}>
          <Image
            source={focusedButton === "physicalSection" ? Physical : Physical}
            style={{ margin: 10, width: 35, height: 35, top: 0, left: 5 }}
          />
          <Text
            style={[{
              fontSize: 8,
              position: "absolute",
              top: 52,
              left: 15,
              color: "#032B79",
            },{ color: isDarkMode ? "white" : "#032B79" }]}
          >
            Physical
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => ToSettings("settings")}>
          <Image
            source={focusedButton === "settings" ? SettingsIcon : SettingsIcon}
            style={{ margin: 10, width: 40, height: 40, top: 0, left: 5 }}
          />
          <Text
            style={[{
              fontSize: 8,
              position: "absolute",
              top: 52,
              left: 20,
              color: "#032B79",
            },{ color: isDarkMode ? "white" : "#032B79" }]}
          >
            Settings
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default Home;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  notiImage: {
    position: "absolute",
    top: 60,
    width: 40,
    height: 40,
    left: 350,
  },

  notiImage2: {
    position: "absolute",
    top: 60,
    width: 40,
    height: 40,
    left: 300,
  },
  welcome: {
    position: "absolute",
    fontWeight: "bold",
    top: 170,
    left: 90,
    color: "#1B436F",
    fontSize: 20,
    width: "70%",
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
  happy1: {
    width: 38,
  },
  howAreYou: {
    marginBottom: 20,
    fontSize: 15,
    fontWeight: "500",
    marginTop: -50,
    marginLeft: 25,
    position: "absolute",
  },
  moodContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    marginTop: 0,
  },
  rect: {
    width: 59,
    height: 62,
    borderRadius: 16,
    backgroundColor: "#7f81e3",
    marginTop: 50,
    position: "absolute",
  },
  moodText: {
    marginLeft: 10,
    fontSize: 12,
    color: "#828282",
    top: 50,
    left: 5,
  },
  icon: {
    width: 30,
    height: 30,
    marginLeft: -22,
  },
  focusLayout: {
    width: 59,
    height: 84,
    top: 5,
    left: 100,
    position: "absolute",
  },
  rect1: {
    height: 62,
    borderRadius: 16,
    width: 59,
    left: 0,
    top: 0,
  },
  happyIcon: {
    left: 13,
    width: 33,
    height: 33,
    top: 10,
  },
  iconPosition1: {
    top: 15,
    position: "absolute",
    overflow: "hidden",
  },
  homeInnerBg: {
    backgroundColor: "#ffae64",
    position: "absolute",
  },
  focusLayout2: {
    width: 59,
    height: 84,
    top: 55,
    left: 100,
    position: "absolute",
  },
  rect12: {
    height: 62,
    borderRadius: 16,
    width: 59,
    left: 80,
    top: -50,
    backgroundColor: "#44F255",
  },
  happyIcon2: {
    left: 103,
    width: 33,
    height: 33,
    top: -10,
  },
  iconPosition12: {
    top: -35,
    left: 92,
    position: "absolute",
    overflow: "hidden",
  },

  focusLayout3: {
    width: 59,
    height: 84,
    top: 55,
    left: 180,
    position: "absolute",
  },
  rect3: {
    height: 62,
    borderRadius: 16,
    width: 59,
    left: 80,
    top: -50,
    backgroundColor: "#44F255",
  },
  happyIcon3: {
    left: 103,
    width: 33,
    height: 33,
    top: -10,
  },
  iconPosition3: {
    top: -35,
    left: 92,
    position: "absolute",
    overflow: "hidden",
  },

  section: {
    marginBottom: 20,
    width: "100%",
    height: 150,
    borderRadius: 30,
    backgroundColor: "#44F255",
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
    backgroundColor: "#22CFE7",
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
    backgroundColor: "#FFAE64",
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
    backgroundColor: "#EB1F88",
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
    top: 5,
    width: "50%",
  },
  sectionTitle2: {
    color: "white",
    fontWeight: "bold",
    fontSize: 25,
    marginBottom: 5,
    marginLeft: -85,
    top: 10,
  },
  sectionSubtitle: {
    color: "white",
    fontWeight: "400",
    fontSize: 12,
    marginLeft: -100,
    width: "60%",
  },
  sectionImage: {
    width: "40%",
    height: 100,
    marginTop: -20,
    marginLeft: 170,
  },
  rectChildLayout2: {
    height: 62,
    borderRadius: 16,
    width: 59,
    left: 0,
    top: 0,
  },
  calm1Typo: {
    height: 20,
    color: "#828282",
    fontSize: 12,
    top: 72,
    textAlign: "center",
    // fontFamily: "Epilogue-Medium",
    fontWeight: "500",
    position: "absolute",
  },
  calm2Typo: {
    height: 20,
    color: "#828282",
    fontSize: 12,
    top: 52,
    textAlign: "center",
    // fontFamily: "Epilogue-Medium",
    fontWeight: "500",
    position: "absolute",
  },
  rect1Bg: {
    backgroundColor: "#eb1f88",
    position: "absolute",
  },
  rect1Bg2: {
    backgroundColor: "#44F255",
    position: "absolute",
  },
  rect1Bg3: {
    backgroundColor: "#FFAE64",
    position: "absolute",
  },
  manicTypo: {
    left: 11,
    height: 25,
    textAlign: "center",
    color: "#828282",
    fontSize: 12,
    top: 72,
    fontWeight: "500",
    position: "absolute",
  },
  manicTypo2: {
    left: 100,
    height: 25,
    textAlign: "center",
    color: "#828282",
    fontSize: 12,
    top: 22,
    fontWeight: "500",
    position: "absolute",
  },
  manicTypo3: {
    left: 93,
    height: 25,
    textAlign: "center",
    color: "#828282",
    fontSize: 12,
    top: 22,
    fontWeight: "500",
    position: "absolute",
  },
  imagee: {
    width: 60,
    height: 60,
    top: 150,
    left: 20,
    borderColor: "#032B79",
    borderWidth: 2,
    borderRadius: 120,
    marginBottom: 130,
  },
});
