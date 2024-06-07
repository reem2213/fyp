// import React, { useState } from "react";
// import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

// const ChooseCategory = () => {
//   const [currentQuestion, setCurrentQuestion] = useState(0);
//   const [score, setScore] = useState();
//   const [showScore, setShowScore] = useState(false);

//   const quizData = [
//     {
//       question: "what is ur name ",
//       options: ["bree", "yara", "reem"],
//       answer: "reem",
//     },
//     {
//       question: "how old are u ",
//       options: ["15", "16", "20"],
//       answer: "20",
//     },
//   ];
//   const handleItem = (selectedAnswer) => {
//     const answer = quizData[currentQuestion]?.answer;
//     if (answer === selectedAnswer) {
//       setScore((prevScore) => prevScore + 1);
//     }
//     const nextQuestion = currentQuestion + 1;
//     if(nextQuestion<quizData.length){
//         setCurrentQuestion(nextQuestion)
//     }
//     else{
//         setShowScore(true)
//     }
//   };
//   const handleRestart=()=>{
//     setCurrentQuestion(0);
//     setScore(0);
//     setShowScore(false)
//   }
//   return (
//     <View style={styles.container}>
//         {showScore ?<View>
//             <Text>{score}</Text>
//             <TouchableOpacity onPress={handleRestart}>
//                 <Text>Reset</Text>
//             </TouchableOpacity>
//         </View>:
//       <View style={styles.questionContainer}>
//       <Text style={styles.questionText}>

//         {quizData[currentQuestion]?.question}
//       </Text>
//       {quizData[currentQuestion]?.options.map((item) => {
//         return (
//           <TouchableOpacity
//             onPress={() => handleItem(item)}
//             style={styles.optionContainer}
//           >
//             <Text style={styles.optionStyle}>{item}</Text>
//           </TouchableOpacity>
//         );
//       })}
//       </View>
//       }
//     </View>
//   );
// };
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//     backgroundColor: "white",
//   },
//   questionContainer: {
//     padding: 10,
//     margin: 10,
//     borderRadius: 5,
//     backgroundColor: "white",
//   },
//   optionStyle: {
//     color: "green",
//     padding: 5,
//     alignSelf: "center",
//     fontSize: 18,
//   },
//   optionContainer: {
//     borderColor: "black",
//     borderWidth: 2,
//     marginTop: 15,
//   },
//   questionText: {
//     fontSize: 24,
//   },
// });
// export default ChooseCategory;
















// FROM DATABASE MONGODB

// import React, { useEffect, useState } from 'react';
// import { View, Text, Button, StyleSheet } from 'react-native';
// import axios from 'axios';

// const App = () => {
//     const [questions, setQuestions] = useState([]);

//     useEffect(() => {
//         axios.get('http://10.0.0.21:3001/questions')
//             .then(response => {
//                 setQuestions(response.data);
//             })
//             .catch(error => {
//                 console.error(error);
//             });
//     }, []);


//     return (
//         <View style={styles.container}>
//             {questions.map((question, index) => (
//                 <View key={index} style={styles.questionContainer}>
//                     <Text>{question.question}</Text>
//                     <Button title={question.option1} onPress={() => handleOptionPress(question, question.option1)} />
//                     <Button title={question.option2} onPress={() => handleOptionPress(question, question.option2)} />
//                     <Button title={question.option3} onPress={() => handleOptionPress(question, question.option3)} />
//                 </View>
//             ))}
//         </View>
//     );
// };

// const handleOptionPress = (question, selectedOption) => {
//     if (selectedOption === question.correctOption) {
//         alert('Correct!');
//     } else {
//         alert('Wrong!');
//     }
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     questionContainer: {
//         marginBottom: 20,
//     },
// });

// export default App;




// import 'react-native-gesture-handler';
// import React, { useEffect, useState } from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
// import axios from 'axios';

// const Stack = createStackNavigator();

// const HomeScreen = ({ navigation }) => {
//     const [questions, setQuestions] = useState([]);

//     useEffect(() => {
//         axios.get('http://10.0.0.21:3001/questions')
//             .then(response => {
//                 setQuestions(response.data);
//             })
//             .catch(error => {
//                 console.error('Axios Error:', error);
//             });
//     }, []);

//     return (
//         <View style={styles.container}>
//             {questions.length > 0 ? (
//                 <Button
//                     title="Start Quiz"
//                     onPress={() => navigation.navigate('StartQuiz', { questions })}
//                 />
//             ) : (
//                 <Text>Loading questions...</Text>
//             )}
//         </View>
//     );
// };

// const QuizScreen = ({ route }) => {
//     const { questions } = route.params;
//     const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//     const [selectedOption, setSelectedOption] = useState(null);
//     const [answerStatus, setAnswerStatus] = useState(null);

//     const handleOptionPress = (question, option) => {
//         setSelectedOption(option);
//         if (option === question.correctOption) {
//             setAnswerStatus('correct');
//         } else {
//             setAnswerStatus('incorrect');
//         }
//     };

//     const handleNextPress = () => {
//         setCurrentQuestionIndex(currentQuestionIndex + 1);
//         setSelectedOption(null);
//         setAnswerStatus(null);
//     };

//     const handlePreviousPress = () => {
//         setCurrentQuestionIndex(currentQuestionIndex - 1);
//         setSelectedOption(null);
//         setAnswerStatus(null);
//     };

//     const currentQuestion = questions[currentQuestionIndex];

//     return (
//         <View style={styles.container}>
//             <Text style={styles.question}>{currentQuestion.question}</Text>
//             <TouchableOpacity
//                 style={[
//                     styles.optionButton,
//                     selectedOption === currentQuestion.option1 && (answerStatus === 'correct' ? styles.correct : styles.incorrect)
//                 ]}
//                 onPress={() => handleOptionPress(currentQuestion, currentQuestion.option1)}
//             >
//                 <Text>{currentQuestion.option1}</Text>
//             </TouchableOpacity>
//             <TouchableOpacity
//                 style={[
//                     styles.optionButton,
//                     selectedOption === currentQuestion.option2 && (answerStatus === 'correct' ? styles.correct : styles.incorrect)
//                 ]}
//                 onPress={() => handleOptionPress(currentQuestion, currentQuestion.option2)}
//             >
//                 <Text>{currentQuestion.option2}</Text>
//             </TouchableOpacity>
//             <TouchableOpacity
//                 style={[
//                     styles.optionButton,
//                     selectedOption === currentQuestion.option3 && (answerStatus === 'correct' ? styles.correct : styles.incorrect)
//                 ]}
//                 onPress={() => handleOptionPress(currentQuestion, currentQuestion.option3)}
//             >
//                 <Text>{currentQuestion.option3}</Text>
//             </TouchableOpacity>

//             <View style={styles.navigationButtons}>
//                 <Button
//                     title="Previous"
//                     onPress={handlePreviousPress}
//                     disabled={currentQuestionIndex === 0}
//                 />
//                 <Button
//                     title="Next"
//                     onPress={handleNextPress}
//                     disabled={currentQuestionIndex === questions.length - 1}
//                 />
//             </View>
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
//     correct: {
//         borderColor: 'green',
//     },
//     incorrect: {
//         borderColor: 'red',
//     },
//     navigationButtons: {
//         flexDirection: 'row',
//         marginTop: 20,
//     },
// });

// export default HomeScreen;



import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

const CategoryScreen = ({ navigation }) => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        axios.get('http://10.0.0.21:3001/categories')
            .then(response => {
                setCategories(response.data);
            })
            .catch(error => {
                console.error('Axios Error:', error);
                Alert.alert('Error', 'Failed to load categories');
            });
    }, []);


    return (
        <View style={styles.container}>
            <Text style={styles.title}>Choose a Category</Text>
            {categories.length > 0 ? (
                categories.map((category, index) => (
                    <Button
                        key={index}
                        title={category}
                        onPress={() => navigation.navigate('StartQuiz', { category })}
                    />
                ))
            ) : (
                <Text>Loading categories...</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
    },
});

export default CategoryScreen;
