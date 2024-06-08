// import React, { useState, useEffect } from 'react';
// import { View, Text, StyleSheet, TouchableOpacity, Alert,Button } from 'react-native';

// const QuestionScreen = ({ route, navigation }) => {
//     const { questions, questionIndex, score } = route.params;
//     const [selectedOption, setSelectedOption] = useState(null);
//     const currentQuestion = questions[questionIndex];

//     useEffect(() => {
//         if (!currentQuestion) {
//             Alert.alert('Error', 'Question not found');
//             navigation.goBack();
//         }
//     }, [currentQuestion, navigation]);

//     const handleOptionPress = (option) => {
//         let newScore = score;
//         if (option === currentQuestion.correctOption) {
//             newScore++;
//         }

//         if (questionIndex + 1 < questions.length) {
//             navigation.navigate('Question', { questions, questionIndex: questionIndex + 1, score: newScore });
//         } else {
//             navigation.navigate('Score', { score: newScore, totalQuestions: questions.length });
//         }
//     };

//     const handlePreviousPress = () => {
//         navigation.navigate('Question', { questions, questionIndex: questionIndex - 1, score });
//         setSelectedOption(null);
//     };

//     return (
//         <View style={styles.container}>
//             {currentQuestion ? (
//                 <>
//                     <Text style={styles.question}>{currentQuestion.question}</Text>
//                     <TouchableOpacity
//                         style={[
//                             styles.optionButton,
//                             selectedOption === currentQuestion.option1 && styles.selected
//                         ]}
//                         onPress={() => handleOptionPress(currentQuestion.option1)}
//                     >
//                         <Text>{currentQuestion.option1}</Text>
//                     </TouchableOpacity>
//                     <TouchableOpacity
//                         style={[
//                             styles.optionButton,
//                             selectedOption === currentQuestion.option2 && styles.selected
//                         ]}
//                         onPress={() => handleOptionPress(currentQuestion.option2)}
//                     >
//                         <Text>{currentQuestion.option2}</Text>
//                     </TouchableOpacity>
//                     <TouchableOpacity
//                         style={[
//                             styles.optionButton,
//                             selectedOption === currentQuestion.option3 && styles.selected
//                         ]}
//                         onPress={() => handleOptionPress(currentQuestion.option3)}
//                     >
//                         <Text>{currentQuestion.option3}</Text>
//                     </TouchableOpacity>

//                     <View style={styles.navigationButtons}>
//                         <Button
//                             title="Previous"
//                             onPress={handlePreviousPress}
//                             disabled={questionIndex === 0}
//                         />
//                     </View>
//                 </>
//             ) : (
//                 <Text>Loading question...</Text>
//             )}
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         padding: 20,
//     },
//     question: {
//         fontSize: 24,
//         marginBottom: 20,
//         textAlign: 'center',
//     },
//     optionButton: {
//         padding: 10,
//         margin: 5,
//         borderWidth: 1,
//         borderRadius: 5,
//         width: '100%',
//         alignItems: 'center',
//     },
//     selected: {
//         backgroundColor: '#ddd',
//     },
//     navigationButtons: {
//         flexDirection: 'row',
//         marginTop: 20,
//     },
// });

// export default QuestionScreen;

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Button,
} from "react-native";

const QuestionScreen = ({ route, navigation }) => {
  const { questions, questionIndex, score } = route.params;
  const [selectedOption, setSelectedOption] = useState(null);
  const currentQuestion = questions[questionIndex];

  useEffect(() => {
    if (!currentQuestion) {
      Alert.alert("Error", "Question not found");
      navigation.goBack();
    }
  }, [currentQuestion, navigation]);

  const handleOptionPress = (option) => {
    let newScore = score;
    if (option === currentQuestion.correctOption) {
      newScore++;
    }

    if (questionIndex + 1 < questions.length) {
      navigation.navigate("Question", {
        questions,
        questionIndex: questionIndex + 1,
        score: newScore,
      });
    } else {
      navigation.navigate("Score", {
        score: newScore,
        totalQuestions: questions.length,
        questions,
      });
    }
  };

  const handlePreviousPress = () => {
    navigation.navigate("Question", {
      questions,
      questionIndex: questionIndex - 1,
      score,
    });
    setSelectedOption(null);
  };

  return (
    <View style={styles.container}>
      <View style={styles.ellipse}></View>
      <View style={styles.ellipse2}></View>
      <View style={styles.ellipse3}></View>
      <View style={styles.ellipse4}></View>
      <View style={styles.card}>
        {currentQuestion ? (
          <>
            <Text style={styles.question}>{currentQuestion.question}</Text>

            <View style={styles.answers}>

            <TouchableOpacity
              style={[
                styles.optionButton,
                selectedOption === currentQuestion.option1 && styles.selected,
              ]}
              onPress={() => handleOptionPress(currentQuestion.option1)}
            >
              {/* <Text style={{color:"white"}}>{currentQuestion.option1}</Text> */}
            </TouchableOpacity>
            <Text
              style={{
                color: "grey",
                fontWeight:"bold",
                // top: 95,
                 left:20,

                fontSize: 17,
              }}
            >
              {currentQuestion.option1}
            </Text>
</View>

            <View style={styles.answers}>

            <TouchableOpacity
              style={[
                styles.optionButton,
                selectedOption === currentQuestion.option2 && styles.selected,
              ]}
              onPress={() => handleOptionPress(currentQuestion.option2)}
            >
              {/* <Text>{currentQuestion.option2}</Text> */}
            </TouchableOpacity>
            <Text
              style={{
                color: "grey",
                // position: "absolute",
                fontWeight:"bold",
                left:20,

                // top: 140,
                // left:90,

                fontSize: 17,
              }}
            >
              {currentQuestion.option2}
            </Text>
            </View>



            <View style={styles.answers}>
            <TouchableOpacity
              style={[
                styles.optionButton,
                selectedOption === currentQuestion.option3 && styles.selected,
              ]}
              onPress={() => handleOptionPress(currentQuestion.option3)}
            >
              {/* <Text>{currentQuestion.option3}</Text> */}
              
            </TouchableOpacity>
            <Text
              style={{
                color: "grey",
                // position: "absolute",
                fontWeight:"bold",
                width:"100%",
                left:20,

                // top: 190,
                // left:90,
                fontSize: 17,
              }}
            >
              {currentQuestion.option3}
            </Text>
                </View>
            

            {/* <View style={styles.navigationButtons}>
              <Button
                title="Previous"
                onPress={handlePreviousPress}
                disabled={questionIndex === 0}
              />
            </View> */}
          </>
        ) : (
          <Text>Loading question...</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#FFD3B3",
  },
  answers:{
flexDirection:"row"
  },
  ellipse: {
    width: 150,
    height: 150,
    backgroundColor: "#FF6B00",
    position: "absolute",
    top: -20,
    left: 300,
    borderRadius: 100,
  },
  ellipse2: {
    width: 150,
    height: 150,
    backgroundColor: "#FF6B00",
    position: "absolute",
    top: 180,
    left: -90,
    borderRadius: 100,
  },
  ellipse3: {
    width: 150,
    height: 150,
    backgroundColor: "#FF6B00",
    position: "absolute",
    top: 650,
    left: -80,
    borderRadius: 100,
  },
  ellipse4: {
    width: 150,
    height: 150,
    backgroundColor: "#FF6B00",
    position: "absolute",
    top: 650,
    left: 320,
    borderRadius: 100,
  },
  question: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FF6B00",
    marginBottom: 20,
    textAlign: "center",
  },
  optionButton: {
    padding: 10,
    margin: 5,
    borderRadius: 100,
    width: 30,
    height: 30,
    marginBottom: 10,
    alignItems: "center",
    backgroundColor: "white",
    left: 20,
    borderWidth:5,
    borderColor:"#FF6B00"
  },
  selected: {
    backgroundColor: "#ddd",
  },
  navigationButtons: {
    flexDirection: "row",
    marginTop: 20,
  },
  card:{
    backgroundColor:"white",
    width:"82%",
    padding:20,
    top:20,
    left:10,
    borderRadius:20
  }
});

export default QuestionScreen;
