

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



import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert,Button } from 'react-native';

const QuestionScreen = ({ route, navigation }) => {
    const { questions, questionIndex, score } = route.params;
    const [selectedOption, setSelectedOption] = useState(null);
    const currentQuestion = questions[questionIndex];

    useEffect(() => {
        if (!currentQuestion) {
            Alert.alert('Error', 'Question not found');
            navigation.goBack();
        }
    }, [currentQuestion, navigation]);

    const handleOptionPress = (option) => {
        let newScore = score;
        if (option === currentQuestion.correctOption) {
            newScore++;
        }

        if (questionIndex + 1 < questions.length) {
            navigation.navigate('Question', { questions, questionIndex: questionIndex + 1, score: newScore });
        } else {
            navigation.navigate('Score', { score: newScore, totalQuestions: questions.length, questions });
        }
    };

    const handlePreviousPress = () => {
        navigation.navigate('Question', { questions, questionIndex: questionIndex - 1, score });
        setSelectedOption(null);
    };

    return (
        <View style={styles.container}>
            {currentQuestion ? (
                <>
                    <Text style={styles.question}>{currentQuestion.question}</Text>
                    <TouchableOpacity
                        style={[
                            styles.optionButton,
                            selectedOption === currentQuestion.option1 && styles.selected
                        ]}
                        onPress={() => handleOptionPress(currentQuestion.option1)}
                    >
                        <Text>{currentQuestion.option1}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[
                            styles.optionButton,
                            selectedOption === currentQuestion.option2 && styles.selected
                        ]}
                        onPress={() => handleOptionPress(currentQuestion.option2)}
                    >
                        <Text>{currentQuestion.option2}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[
                            styles.optionButton,
                            selectedOption === currentQuestion.option3 && styles.selected
                        ]}
                        onPress={() => handleOptionPress(currentQuestion.option3)}
                    >
                        <Text>{currentQuestion.option3}</Text>
                    </TouchableOpacity>

                    <View style={styles.navigationButtons}>
                        <Button
                            title="Previous"
                            onPress={handlePreviousPress}
                            disabled={questionIndex === 0}
                        />
                    </View>
                </>
            ) : (
                <Text>Loading question...</Text>
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
    question: {
        fontSize: 24,
        marginBottom: 20,
        textAlign: 'center',
    },
    optionButton: {
        padding: 10,
        margin: 5,
        borderWidth: 1,
        borderRadius: 5,
        width: '100%',
        alignItems: 'center',
    },
    selected: {
        backgroundColor: '#ddd',
    },
    navigationButtons: {
        flexDirection: 'row',
        marginTop: 20,
    },
});

export default QuestionScreen;
