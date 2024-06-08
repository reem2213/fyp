import React from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import Passed from "../../../../assets/QuizPassed.png";
import Failed from "../../../../assets/Failed.png";
const ScoreScreen = ({ route, navigation }) => {
  const { score, totalQuestions, questions } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.scoreText}>
        Your Score: {score} / {totalQuestions}
      </Text>
      {score < 3 ? (
        <>
          <Image source={Failed} style={{ width: 150, height: 150 }} />
          <Text style={styles.messageText}>Oops, you have failed</Text>
        </>
      ) : (
        <>
          <Image source={Passed} style={{ width: 150, height: 150 }} />

          <Text style={styles.messageText}>Congrats!</Text>
        </>
      )}
      <TouchableOpacity
        onPress={() => navigation.navigate("QuizCategory")}
        style={styles.bttn}
      >
        <Text style={{color:"#FF6B00", fontSize:15,fontWeight:"bold"}}>Go to Home</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("Review", { questions })}
        style={styles.bttn2}
      >
        <Text style={{color:"#FF6B00", fontSize:15,fontWeight:"bold"}}>Review Answers</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#FF6B00",
  },
  scoreText: {
    fontSize: 35,
    marginBottom: 20,
    color: "white",
    fontWeight: "bold",
  },
  messageText: {
    fontSize: 25,
    fontWeight:"bold",
    marginBottom: 20,
    color: "white",
  },
  bttn:{
    backgroundColor:"white",
    padding:10,
    borderRadius:10,
    right:110,
    top:100

  },
  bttn2:{
    backgroundColor:"white",
    padding:10,
    borderRadius:10,
    left:100,
    top:60

  }
});

export default ScoreScreen;

// import React from 'react';
// import { View, Text, Button, StyleSheet } from 'react-native';

// const ScoreScreen = ({ route, navigation }) => {
//     const { score, totalQuestions, questions } = route.params;

//     return (
//         <View style={styles.container}>
//             <Text style={styles.scoreText}>Your Score: {score} / {totalQuestions}</Text>
//             <Button
//                 title="Go to Home"
//                 onPress={() => navigation.navigate('QuizCategory')}
//             />
//             <Button
//                 title="Review Answers"
//                 onPress={() => navigation.navigate('Review', { questions })}
//             />
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         padding: 20,
//         backgroundColor: "#FF6B00",

//     },
//     scoreText: {
//         fontSize: 24,
//         marginBottom: 20,
//         color:"white",
//         fontWeight:"bold"
//     },
// });

// export default ScoreScreen;
