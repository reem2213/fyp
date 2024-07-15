// import React from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   Image,
//   TouchableOpacity,
// } from "react-native";
// import Passed from "../../../../assets/QuizPassed.png";
// import Failed from "../../../../assets/Failed.png";

// const ScoreScreen = ({ route, navigation }) => {
//   const { score, totalQuestions, questions } = route.params;

//   let points;
//   if (score === 6) {
//     points = 100;
//   } else if (score === 5) {
//     points = 75;
//   } else if (score === 4) {
//     points = 50;
//   } else if (score === 3) {
//     points = 25;
//   } else {
//     points = 0;
//   }

//   return (
//     <View style={styles.container}>
//       <Text style={styles.scoreText}>
//         Your Score: {score} / {totalQuestions}
//       </Text>
//       {score < 3 ? (
//         <>
//           <Image source={Failed} style={{ width: 150, height: 150 }} />
//           <Text style={styles.messageText}>Oops, you have failed</Text>
//         </>
//       ) : (
//         <>
//           <Image source={Passed} style={{ width: 150, height: 150 }} />
//           <Text style={styles.messageText}>Congrats! You've earned {points} points</Text>
//         </>
//       )}
//       <TouchableOpacity
//         onPress={() => navigation.navigate("Gamification", { points })}
//         style={styles.bttn}
//       >
//         <Text style={{color:"#FF6B00", fontSize:15,fontWeight:"bold"}}>Go to Home</Text>
//       </TouchableOpacity>
//       <TouchableOpacity
//         onPress={() => navigation.navigate("Review", { questions })}
//         style={styles.bttn2}
//       >
//         <Text style={{color:"#FF6B00", fontSize:15,fontWeight:"bold"}}>Review Answers</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     padding: 20,
//     backgroundColor: "#FF6B00",
//   },
//   scoreText: {
//     fontSize: 35,
//     marginBottom: 20,
//     color: "white",
//     fontWeight: "bold",
//   },
//   messageText: {
//     fontSize: 25,
//     fontWeight:"bold",
//     marginBottom: 20,
//     color: "white",
//   },
//   bttn:{
//     backgroundColor:"white",
//     padding:10,
//     borderRadius:10,
//     right:110,
//     top:100

//   },
//   bttn2:{
//     backgroundColor:"white",
//     padding:10,
//     borderRadius:10,
//     left:100,
//     top:60

//   }
// });

// export default ScoreScreen;


import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import axios from 'axios';
import Passed from "../../../../assets/QuizPassed.png";
import Failed from "../../../../assets/Failed.png";

const ScoreScreen = ({ route, navigation }) => {
  const { score, totalQuestions, questions } = route.params;

  // Calculate points based on the score
  let points;
  if (score === 6) {
    points = 100;
  } else if (score === 5) {
    points = 75;
  } else if (score === 4) {
    points = 50;
  } else if (score === 3) {
    points = 25;
  } else {
    points = 0;
  }

  // Function to save score and points
  const saveScoreToDB = async () => {
    try {
      await axios.post('http://10.0.0.21:3001/save-score', { score, points });
    } catch (error) {
      console.error(error);
    }
  };

  // Save score when component mounts
  React.useEffect(() => {
    saveScoreToDB();
  }, []);

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
          <Text style={styles.messageText}>Congrats! You've earned {points} points</Text>
        </>
      )}
      <TouchableOpacity
        onPress={() => navigation.navigate("Gamification", { points })}
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

