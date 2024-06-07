// import React from "react";
// import { View, Text, Button, StyleSheet, TouchableOpacity } from "react-native";

// const ScoreScreen = ({ route, navigation }) => {
//   const { score, totalQuestions } = route.params;

//   return (
//     <View style={styles.container}>
//       <Text style={styles.scoreText}>
//         Your Score: {score} / {totalQuestions}
//       </Text>
//       <TouchableOpacity onPress={() => navigation.navigate("QuizCategory")}>
//         <Text>go to home</Text>
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
//   },
//   scoreText: {
//     fontSize: 24,
//     marginBottom: 20,
//   },
// });

// export default ScoreScreen;


import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const ScoreScreen = ({ route, navigation }) => {
    const { score, totalQuestions, questions } = route.params;

    return (
        <View style={styles.container}>
            <Text style={styles.scoreText}>Your Score: {score} / {totalQuestions}</Text>
            <Button
                title="Go to Home"
                onPress={() => navigation.navigate('QuizCategory')}
            />
            <Button
                title="Review Answers"
                onPress={() => navigation.navigate('Review', { questions })}
            />
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
    scoreText: {
        fontSize: 24,
        marginBottom: 20,
    },
});

export default ScoreScreen;

