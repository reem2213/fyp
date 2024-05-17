import {
  Text,
  View,
  StyleSheet,
  Pressable,
  Modal,
  TextInput,
  Button,
  ScrollView,
  Image,
  
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import FeedbackImage from "../assets/feedbackBg.png";
import Back from "../assets/back.png";
import User from "../assets/user.png";
import Star from "../assets/star.png";
const Feedback = ({ navigation }) => {
  const [newType, setNewType] = useState("");
  const [newContent, setNewContent] = useState("");
  const [newRate, setNewRate] = useState("");

  const [isModalVisible, setIsModalVisible] = useState(false);

  const [feedbacks, setFeedbacks] = useState([]);

  const handleAddGoal = () => {
    setIsModalVisible(true);
  };
  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const response = await axios.get("http://10.0.0.21:3001/feedback");
        setFeedbacks(response.data);
      } catch (error) {
        console.error("Error fetching feedbacks:", error);
      }
    };

    fetchGoals();
  }, []);

  const handleSaveGoal = async () => {
    if (newType.trim() !== "") {
      try {
        const response = await axios.post("http://10.0.0.21:3001/feedback", {
          type: newType,
          content: newContent,
          rating: newRate,
        });
        console.log("Feedback saved:", response.data);
        setIsModalVisible(false);
        setNewType("");
      } catch (error) {
        console.error("Error saving feedback:", error);
      }
    }
  };
  const backToHome = () => {
    navigation.navigate("Home");
  };
  return (
    <>
      <View
        style={{
          backgroundColor: "#FFAE64",
          height: "50%",
          borderRadius: 70,
          marginTop: -50,
        }}
      >
        <TouchableOpacity onPress={backToHome}>
          <Image
            source={Back}
            style={{
              position: "absolute",
              marginTop: 110,
              marginLeft: 30,
              width: 30,
              height: 30,
            }}
          />
        </TouchableOpacity>
        <Text
          style={{
            color: "white",
            fontSize: 35,
            fontWeight: "bold",
            position: "absolute",
            marginTop: 150,
            marginLeft: 80,
          }}
        >
          Feedback Hub
        </Text>
        <Image
          source={FeedbackImage}
          style={{ width: 250, height: 180, marginTop: 200, marginLeft: 70 }}
        />
      </View>

      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setIsModalVisible(false)}
            >
              <Text style={styles.closeText}>x</Text>
            </TouchableOpacity>

            <TextInput
              style={styles.input}
              placeholder="Enter your type"
              value={newType}
              onChangeText={(text) => setNewType(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Enter your content"
              value={newContent}
              onChangeText={(text) => setNewContent(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Enter your rate"
              value={newRate}
              onChangeText={(text) => setNewRate(text)}
            />

            <Button
              title="Add feedback"
              style={{ backgroundColor: "#FFAE64" }}
              onPress={handleSaveGoal}
            />
          </View>
        </View>
      </Modal>

      <GestureHandlerRootView style={{ height: "40%" }}>
        <ScrollView style={styles.goalsContainer} showsVerticalScrollIndicator>
          {feedbacks.map((goalItem, index) => (
            <View key={index} style={styles.goalItemContainer}>
              <Image
                source={User}
                style={{ width: 50, height: 50, marginLeft: 10 }}
              />
              <Text style={styles.feedbackType}>{goalItem.type}</Text>
              <Text style={styles.feedbackContent}>{goalItem.content}</Text>
              <Image
                source={Star}
                style={{ width: 15, height: 15, marginTop: -50, left: 5 }}
              />
              <Text style={styles.feedbackRating}>{goalItem.rating}</Text>
            </View>
          ))}
        </ScrollView>
      </GestureHandlerRootView>
      <Pressable style={styles.add} onPress={handleAddGoal}>
        <Text style={styles.addGoal}>Write Review</Text>
      </Pressable>
    </>
  );
};
const styles = StyleSheet.create({
  arrow: {
    marginTop: 70,
    marginLeft: 40,
    width: 30,
    height: 30,
  },
  closeText: {
    color: "gray",
    fontSize: 25,
    marginLeft: 250,
    marginTop: -20,
    width:"100%"
  },

  
  blueEllispe: {
    width: 100,
    height: 100,
    marginLeft: 350,
    marginTop: -90,
  },
  blueEllispe2: {
    width: 100,
    height: 100,
    marginLeft: 300,
    marginTop: -70,
    opacity: 0.5,
  },
  AchieveYourDream: {
    marginLeft: 55,
    marginTop: 10,
    fontSize: 30,
    color: "#1B436F",
    fontWeight: "bold",
  },
  goalImage: {
    width: 250,
    height: 180,
    marginLeft: 70,
    marginTop: -35,
  },
  GoalTracking: {
    marginLeft: 50,
    marginTop: 20,
    fontSize: 20,
    color: "#719AEA",
    fontWeight: "bold",
  },
  add: {
    width: 250,
    height: 50,
    marginTop: 670,
    marginLeft: 70,
    backgroundColor: "#FFAE64",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
  },
  addGoal: {
    color: "white",
    fontSize: 18,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: 300,
  },
  input: {
    height: 40,
    borderColor: "#ddd",
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  selectedDate: {
    marginTop: 10,
    fontSize: 16,
    color: "#333",
  },
  goalsContainer: {
    marginTop: 20,
    paddingHorizontal: 20,

    width: "95%",
    marginLeft: 10,
  },
  goalItemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
    backgroundColor: "white",
    color: "white",
    borderRadius: 15,
    height: 80,
  },
  feedbackType: {
    fontSize: 15,
    color: "black",
    paddingLeft: 70,
    top: 5,
    position: "absolute",
  },
  feedbackContent: {
    fontSize: 10,
    color: "gray",
    width: "60%",
    marginTop: 20,
    marginLeft: 10,
  },
  feedbackRating: {
    fontSize: 12,
    color: "black",
    width: "60%",
    marginTop: -50,
    marginLeft: 10,
  },
});
export default Feedback;
