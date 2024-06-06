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
import ArrowBack from "../../assets/arrowBack.png";

import GoalSection from "../../assets/communitySection.png";
import MusicSection from "../../assets/mentorsSection.png";
import FeedbackSection from "../../assets/eduSection.png";
import GameSection from "../../assets/ChatBotSection.png";

import PsychoImage from "../../assets/psychoSection.png";

const Home = ({ navigation }) => {
  // const { username} = route.params;
  // useEffect(() => {
  //   if (route.params && route.params.username) {
  //     setUsername(route.params.username);
  //   }
  // }, [route.params]);
 

  const GoBack = () => {
    navigation.navigate("Home");
  };
  const GoToEducationSection = () => {
    navigation.navigate("EduSection");
  };

  const GoToCommunitiesSection = () => {
    navigation.navigate("Communities");
  };
  const GoToMentorsSection = () => {
    navigation.navigate("Mentors");
  };

  const GoToChatBotSection = () => {
    navigation.navigate("ChatBot");
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Pressable onPress={GoBack}>
          <Image style={styles.notiImage} source={ArrowBack} />
        </Pressable>
        <Image
        style={[styles.ellipseIcon]}
        contentFit="cover"
        source={require("../../assets/blueEllipse.png")}
      />
      <Image
        style={[styles.ellipseIcon2]}
        contentFit="cover"
        source={require("../../assets/blueEllipse.png")}
      />
        <Text
          style={styles.welcome}
        >{`Welcome to the Psychological Empowerment Zone!`}</Text>
        <Image source={PsychoImage} style={styles.image} />

        <View style={styles.content}>
          <TouchableOpacity onPress={GoToCommunitiesSection}>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Communities</Text>
              <Text style={styles.sectionSubtitle}>
                Where Ideas Flourish, Friendships Blossom, and Support Flows
                Freely
              </Text>
              <Image source={GoalSection} style={styles.sectionImage} />
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={GoToMentorsSection}>
            <View style={styles.section2}>
              <Text style={styles.sectionTitle2}>Mentors</Text>
              <Text style={styles.sectionSubtitle}>
                Connect with Mentors for Enlightening Conversations and
                Productive Meetings
              </Text>
              <Image source={MusicSection} style={styles.sectionImage} />
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={GoToEducationSection}>
            <View style={styles.section3}>
              <Text style={styles.sectionTitle}>Education Section</Text>
              <Text style={styles.sectionSubtitle}>
                Embark on the Path of Lifelong Learning: Exploring Boundless
                Horizons in Education
              </Text>
              <Image source={FeedbackSection} style={styles.sectionImage} />
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={GoToChatBotSection}>

          <View style={styles.section4}>
            <Text style={styles.sectionTitle}>Emotional Assistant</Text>
            <Text style={styles.sectionSubtitle}>
              Your Personal Emotional Assistant for Navigating Life's Ups and
              Downs with Understanding and Empathy
            </Text>
            <Image
             source={GameSection} style={styles.sectionImage} />
          </View>
          </TouchableOpacity>
        </View>
        
        
      </ScrollView>
    </GestureHandlerRootView>
  );
};

export default Home;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  ellipseIcon: {
    left: 320,
    width: 150,
    height: 150,
    top:-15
  },
  ellipseIcon2: {
    top: 50,
    left: -90,
    width: 150,
    height: 150,
  },
  notiImage: {
    position: "absolute",
    top: 60,
    left: 20,
    width: 30,
    height: 30,
  },
  welcome: {
    position: "absolute",
    fontWeight: "bold",
    top: 120,
    left: 30,
    color: "#1B436F",
    fontSize: 25,
    width: "90%",
  },
  content: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    marginTop: 0,
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
  
  
 
  

  image: {
    width: 250,
    height: 250,
    marginTop: -100,
    marginLeft: 70,
  },
  section: {
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
    backgroundColor: "#FFA500",
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
    backgroundColor: "#5200FF",
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
    fontSize: 20,
    marginBottom: 5,
    marginLeft: -65,
    top: 15,
    width: "70%",
  },
  sectionTitle2: {
    color: "white",
    fontWeight: "bold",
    fontSize: 25,
    marginBottom: 5,
    marginLeft: -215,
    top: 15,
  },
  sectionSubtitle: {
    color: "white",
    fontWeight: "400",
    fontSize: 12,
    marginLeft: -100,
    width: "60%",
    top:7
  },
  sectionImage: {
    width: "35%",
    height: 120,
    marginTop: -70,
    marginLeft: 200,
  },
  
});
