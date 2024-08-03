import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const ReviewScreen = ({ route, navigation }) => {
  const { questions,username } = route.params;

  return (
    <>
      <View style={styles.bigContainer}>
        <Text
          style={{
            color: "white",
            fontSize: 45,
            fontWeight: "bold",
            marginTop: 100,
            textAlign: "center",
          }}
        >
          View Answers
        </Text>
        <GestureHandlerRootView style={styles.scrollViewContainer}>
          <ScrollView contentContainerStyle={styles.container}>
            {questions.map((question, index) => (
              <View key={index} style={styles.questionContainer}>
                <Text style={styles.questionText}>
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
          onPress={() => navigation.navigate("QuizCategory",{username})}
          style={styles.bttn}
        >
          <Text style={{ color: "#FF6B00", fontSize: 15, fontWeight: "bold" }}>
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
    backgroundColor: "white",
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
    color: "gray",
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
    top: 700,
    position: "absolute",
  },
});

export default ReviewScreen;
