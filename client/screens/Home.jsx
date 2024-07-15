import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Noti from "../assets/notification.png";
import ScreenTime from "../assets/screenTime.png";
import GoalSection from "../assets/goalSection.png";
import MusicSection from "../assets/music.png";
import FeedbackSection from "../assets/feedback.png";
import GameSection from "../assets/game.png";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Goal from "./Goal";
import ProfileCustomization from "./ProfileCustomization";
import SplashScreen from "./Splash";
import Notifications from "./Notifications";
import { Ionicons, AntDesign } from "@expo/vector-icons";
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
import Community from "./Community";
import Settings from "./Settings";
import PhysicalSection from "./PhysicalSection/PhysicalSection";
import PsychologicalSection from "./PsychologicalSection/PsychologicalSection";
import MyProfile from "./MyProfile";
import Plus from "../assets/plus.png";
const Home = ({ navigation }) => {
  const screen2 = () => {
    navigation.navigate("Screen2");
  };

  const toNotifications = () => {
    navigation.navigate("Notifications");
  };

  const toPosts = () => {
    navigation.navigate("Post");
  };
  const GoToFeedbackSection = () => {
    navigation.navigate("Feedback");
  };

  const GoToGoalSection = () => {
    navigation.navigate("goal");
  };
  const GoToMusicSection = () => {
    navigation.navigate("MusicTester2");
  };

  const GoToGamificationSection = () => {
    navigation.navigate("Gamification");
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Pressable onPress={toNotifications}>
          <Image style={styles.notiImage} source={Noti} />
        </Pressable>

        <Pressable onPress={toPosts}>
          <Image style={styles.notiImage2} source={Plus} />
        </Pressable>

        <Text style={styles.welcome}>{`Good Afternoon, Reem!`}</Text>

        <View style={styles.content}>
          <Text style={styles.howAreYou}>How are you feeling today?</Text>

          <View style={[styles.moodContainer, styles.calm]}>
            <View style={styles.rect} />
            <Text style={styles.moodText}>Calm</Text>
            <Image style={styles.icon} source={require("../assets/calm.png")} />
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

          <Image source={ScreenTime} style={styles.image} />
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
  );
};
const Tab = createBottomTabNavigator();

function MyTabs() {
  const [isFocused, setIsFocused] = useState(false);

  const CustomTabBarIcon = ({ focused, iconLight, iconDark }) => (
    <Image
      source={focused ? iconDark : iconLight}
      style={{ width: 35, height: 35 }}
    />
  );
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarShowLabel: false,
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <CustomTabBarIcon
              focused={focused}
              iconLight={HomeLight}
              iconDark={HomeDark}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Community"
        component={Community}
        options={{
          tabBarShowLabel: false,
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <CustomTabBarIcon
              focused={focused}
              iconLight={CommLight}
              iconDark={CommDark}
            />
          ),
        }}
      />
      <Tab.Screen
        name="PhysicalSection"
        component={PhysicalSection}
        options={{
          tabBarShowLabel: false,
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <CustomTabBarIcon
              focused={focused}
              iconLight={PhysicalLight}
              iconDark={PhysicalDark}
            />
          ),
        }}
      />
      <Tab.Screen
        name="PsychologicalSection"
        component={PsychologicalSection}
        options={{
          tabBarShowLabel: false,
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <CustomTabBarIcon
              focused={focused}
              iconLight={PsycoLight}
              iconDark={PsycoDark}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          tabBarShowLabel: false,
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <CustomTabBarIcon
              focused={focused}
              iconLight={UserLight}
              iconDark={UserDark}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default MyTabs;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  notiImage: {
    position: "absolute",
    top: 70,
    width: 30,
    height: 30,
    left: 330,
  },

  notiImage2: {
    position: "absolute",
    top: 70,
    width: 30,
    height: 30,
    left: 290,
  },
  welcome: {
    position: "absolute",
    fontWeight: "bold",
    top: 70,
    left: 20,
    color: "#1B436F",
    fontSize: 30,
    width: "70%",
  },
  content: {
    paddingVertical: 20,
    paddingHorizontal: 20,
  },

  happy1: {
    width: 38,
  },
  howAreYou: {
    marginBottom: 20,
    fontSize: 15,
    fontWeight: "500",
    color: "#6D6D6D",
    marginTop: 165,
    marginLeft: 20,
    position: "absolute",
  },
  moodContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    marginTop: 200,
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
    top: 204,
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
    top: 254,
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
    top: 254,
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
});
