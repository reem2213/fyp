import React ,{useContext}from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { DarkModeContext } from "../../../../components/DarkModeContext"; // Import the context

const ReviewScreen = ({ route, navigation }) => {
  const { questions,username,userId } = route.params;
  const { isDarkMode } = useContext(DarkModeContext); // Use the context

  return (
    <>
      <View style={[styles.bigContainer,{ backgroundColor: isDarkMode ? "black" : "#FF6B00" }]}>
        <Text
          style={[{
            color: "white",
            fontSize: 45,
            fontWeight: "bold",
            marginTop: 100,
            textAlign: "center",
          },]}
        >
          View Answers
        </Text>
        <GestureHandlerRootView style={styles.scrollViewContainer}>
          <ScrollView contentContainerStyle={[styles.container,{ backgroundColor: isDarkMode ? "#1F1F1F" : "white" }]}>
            {questions.map((question, index) => (
              <View key={index} style={styles.questionContainer}>
                <Text style={[styles.questionText,{ color: isDarkMode ? "white" : "gray" }]}>
                  {index + 1}. {question.question}
                </Text>
                <Text
                  style={[
                    styles.answerText,
                    question.correctOption === question.option1
                      ? styles.correct
                      : styles.incorrect,
                  ]}
                >
                  A. {question.option1}
                </Text>
                <Text
                  style={[
                    styles.answerText,
                    question.correctOption === question.option2
                      ? styles.correct
                      : styles.incorrect,
                  ]}
                >
                  B. {question.option2}
                </Text>
                <Text
                  style={[
                    styles.answerText,
                    question.correctOption === question.option3
                      ? styles.correct
                      : styles.incorrect,
                  ]}
                >
                  C. {question.option3}
                </Text>
              </View>
            ))}
          </ScrollView>
        </GestureHandlerRootView>

        <TouchableOpacity
          onPress={() => navigation.navigate("QuizCategory",{username,userId})}
          style={[styles.bttn,{ backgroundColor: isDarkMode ? "#FF6B00" : "white" }]}
        >
          <Text style={[{fontSize: 15, fontWeight: "bold" },{ color: isDarkMode ? "white" : "#FF6B00" }]}>
            Go to Home
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  bigContainer: {
    backgroundColor: "#FF6B00",
    height: "100%",
  },
  container: {
    padding: 50,
    alignItems: "center",
    
    width: "90%",
    // top:20,
    // left:70,
    borderRadius: 20,
  },
  scrollViewContainer: {
    top: 20,
    left: 20,
    height: "60%",
    width:"100%",
    borderRadius: 30,
  },
  questionContainer: {
    marginBottom: 20,
  },
  questionText: {
    fontSize: 18,
    marginBottom: 10,
  },
  answerText: {
    fontSize: 16,
  },
  correct: {
    color: "green",
  },
  incorrect: {
    color: "red",
  },
  bttn: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    right: 150,
    top: 750,
    position: "absolute",
  },
});

export default ReviewScreen;
