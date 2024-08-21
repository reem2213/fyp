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
import { DarkModeContext } from "../components/DarkModeContext"; // Import the context

import { GestureHandlerRootView } from "react-native-gesture-handler";
import { WebView } from "react-native-webview";
import Noti from "../assets/notification.png";
import ScreenTime from "../assets/screenTime.png";
import GoalSection from "../assets/goalSection.png";
import MusicSection from "../assets/music.png";
import FeedbackSection from "../assets/feedback.png";
import GameSection from "../assets/game.png";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeLight from "../assets/homeLight.png";
import HomeDark from "../assets/homeDark.png";
import PhysicalLight from "../assets/physicalSectionLight.png";
import PhysicalDark from "../assets/physicalSectionDark.png";
import PsycoLight from "../assets/psychologicLight.png";
import PsycoDark from "../assets/psychologicDark.png";
import UserLight from "../assets/userLight.png";
import UserDark from "../assets/userDark.png";
import CommDark from "../assets/communityDark.png";
import CommLight from "../assets/communityLight.png";
import Community from "./CommunitiesJoined";
import Settings from "./Settings";
import PhysicalSection from "./PhysicalSection/PhysicalSection";
import PsychologicalSection from "./PsychologicalSection/PsychologicalSection";
import MyProfile from "./MyProfile";
import Plus from "../assets/plus.png";

import Psycho from "../assets/psychologicLight.png";
import Physical from "../assets/physicalSectionLight.png";
import SettingsIcon from "../assets/settings.png";
import HomeIcon from "../assets/homeLight.png";
import CommunityLight from "../assets/communityLight.png";
import CommunityDark from "../assets/communityDark.png";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { LineChart, BarChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
const screenWidth = Dimensions.get("window").width;
const SccreenTime = ({ screenTimeData }) => {
  const chartData = {
    labels: ["Goal", "Music", "Game", "Feedback"],
    datasets: [
      {
        data: [
          screenTimeData.goal || 0,
          screenTimeData.music || 0,
          screenTimeData.game || 0,
          screenTimeData.feedback || 0,
        ],
      },
    ],
  };

  return (
    <BarChart
      data={chartData}
      width={screenWidth - 16}
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
  const { username } = route.params;
  const [bio, setBio] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const { isDarkMode } = useContext(DarkModeContext); // Use the context
  const [imageData, setImageData] = useState(null);

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

  const checkPhysicalAttributes = () => {
    fetch(`http://10.0.0.21:3001/formData/${username}`)
      .then((response) => response.json())
      .then((data) => {
        if (data && data.age && data.gender && data.height && data.weight) {
          navigation.navigate("PhysicalHome", { username, bio, imageData });
        } else {
          navigation.navigate("PhysicalSection", { username });
        }
      })
      .catch((error) => {
        console.error("Error fetching physical attributes:", error);
        navigation.navigate("PhysicalSection", { username });
      });
  };

  const screen2 = () => {
    navigation.navigate("Workout");
  };
  const [screenTimeData, setScreenTimeData] = useState({
    goal: 0,
    music: 0,
    game: 0,
    feedback: 0,
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

  // const toNotifications = () => {
  //   navigation.navigate("Notifications", { username });
  // };
  const toNotifications = async () => {
    // Mark all notifications as read
    try {
      const storedNotifications = await AsyncStorage.getItem('Notifications');
      let notifications = storedNotifications ? JSON.parse(storedNotifications) : [];
  
      notifications = notifications.map(notif => ({ ...notif, read: true }));
      await AsyncStorage.setItem('Notifications', JSON.stringify(notifications));
      setUnreadCount(0); // Reset the unread count
  
      navigation.navigate("Notifications", { username });
    } catch (error) {
      console.error("Error updating notifications:", error);
    }
  };
  

  const toPosts = () => {
    navigation.navigate("Post", { username });
  };
  const GoToGoalSection = () => {
    navigation.navigate("goal", { username });
    startTracking("goal");
  };

  const GoToMusicSection = () => {
    navigation.navigate("MusicTester2", { username });
    startTracking("music");
  };

  const GoToFeedbackSection = () => {
    navigation.navigate("Feedback", { username });
    startTracking("feedback");
  };
  const GoToGamificationSection = () => {
    navigation.navigate("Gamification", { username });
    startTracking("game");
  };

  const goToProfile = () => {
    navigation.navigate("MyProfile", { username, bio, imageData });
  };

  const ToHome = () => {
    navigation.navigate("Home", { username, bio, imageData });
  };
  const ToCommunity = () => {
    navigation.navigate("Community", { username, bio, imageData });
  };
  const ToPsychologicalSection = () => {
    navigation.navigate("PsychologicalSection", { username, bio, imageData });
  };
  // const ToPhysicalSection = () => {
  //   navigation.navigate("PhysicalHome", { username, bio, imageData });
  // };
  const ToPhysicalSection = () => {
    checkPhysicalAttributes();
  };

  const ToSettings = () => {
    navigation.navigate("Settings", { username, bio, imageData });
  };





  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const storedNotifications = await AsyncStorage.getItem('Notifications');
        let notifications = storedNotifications ? JSON.parse(storedNotifications) : [];

        // Assuming unread notifications are those that are not marked as read
        const unreadNotifications = notifications.filter(notif => !notif.read);
        setUnreadCount(unreadNotifications.length);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchNotifications();
  }, []);
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
            <Image style={styles.notiImage} source={Noti} />
            <Text style={{ color: 'white',backgroundColor:"#032b79", width:20,padding:7,height:23, fontWeight: 'bold', top: 65, left:325,borderRadius:100,fontSize:7}}>{unreadCount}</Text>

          </Pressable>
          

          <Pressable onPress={toPosts}>
            <Image style={styles.notiImage2} source={Plus} />
          </Pressable>

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
                  html: `<img src="data:image/jpeg;base64,${imageData}" style="width:250px; height:250px;margin-top:150px;border-radius:150px" />`,
                }}
              />
            </TouchableOpacity>

            <Text
              style={[
                styles.welcome,
                { color: isDarkMode ? "white" : "black" },
              ]}
            >
              {username}
            </Text>
          </View>

          <View style={styles.content}>
            <Text style={styles.howAreYou}>How are you feeling today?</Text>

            <View style={[styles.moodContainer, styles.calm]}>
              <View style={styles.rect} />
              <Text style={styles.moodText}>Calm</Text>
              <Image
                style={styles.icon}
                source={require("../assets/calm.png")}
              />
            </View>
            <View style={[styles.focusLayout]}>
              <View style={[styles.rect1, styles.rect1Bg]} />
              <Text style={[styles.happy1, styles.manicTypo]}>Happy</Text>
              <Image
                style={[styles.happyIcon, styles.iconPosition1]}
                contentFit="cover"
                source={require("../assets/happy.png")}
              />
            </View>
            <View style={[styles.focusLayout2]}>
              <View style={[styles.rect12, styles.rect1Bg2]} />
              <Text style={[styles.manicTypo2]}>Sad</Text>
              <Image
                style={[styles.happyIcon2, styles.iconPosition12]}
                contentFit="cover"
                source={require("../assets/sad.png")}
              />
            </View>
            <View style={[styles.focusLayout3]}>
              <View style={[styles.rect3, styles.rect1Bg3]} />
              <Text style={[styles.manicTypo3]}>Angry</Text>
              <Image
                style={[styles.happyIcon3, styles.iconPosition3]}
                contentFit="cover"
                source={require("../assets/angry.png")}
              />
            </View>

            <SccreenTime screenTimeData={screenTimeData} />

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
            padding: 10,
            left: 0,
            paddingTop: -10,
          },
          { backgroundColor: isDarkMode ? "black" : "#fff" },
        ]}
      >
        <TouchableOpacity onPress={ToHome}>
          <Image source={HomeIcon} style={{ margin: 10 }} />
        </TouchableOpacity>

        <TouchableOpacity onPress={ToCommunity}>
          <Image
            source={CommunityLight}
            style={{ margin: 10, width: 50, height: 50 }}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={ToPsychologicalSection}>
          <Image
            source={Psycho}
            style={{ margin: 10, width: 50, height: 50 }}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={ToPhysicalSection}>
          <Image source={Physical} style={{ margin: 10 }} />
        </TouchableOpacity>

        <TouchableOpacity onPress={ToSettings}>
          <Image source={SettingsIcon} style={{ margin: 10 }} />
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
    top: 75,
    width: 30,
    height: 30,
    left: 330,
  },

  notiImage2: {
    position: "absolute",
    top: 50,
    width: 30,
    height: 30,
    left: 290,
  },
  welcome: {
    position: "absolute",
    fontWeight: "bold",
    top: 160,
    left: 80,
    color: "#1B436F",
    fontSize: 30,
    width: "40%",
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
    color: "#6D6D6D",
    marginTop: -50,
    marginLeft: 20,
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
    width: 200,
    height: 200,
    top: 100,
    left: 10,
  },
});
