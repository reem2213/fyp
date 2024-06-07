import React from 'react';
import { View, Text, StyleSheet, ScrollView,Button } from 'react-native';

const ReviewScreen = ({ route,navigation }) => {
    const { questions } = route.params;

    return (
        <>
        <ScrollView contentContainerStyle={styles.container}>
            {questions.map((question, index) => (
                <View key={index} style={styles.questionContainer}>
                    <Text style={styles.questionText}>{index + 1}. {question.question}</Text>
                    <Text style={[
                        styles.answerText,
                        question.correctOption === question.option1 ? styles.correct : styles.incorrect
                    ]}>A. {question.option1}</Text>
                    <Text style={[
                        styles.answerText,
                        question.correctOption === question.option2 ? styles.correct : styles.incorrect
                    ]}>B. {question.option2}</Text>
                    <Text style={[
                        styles.answerText,
                        question.correctOption === question.option3 ? styles.correct : styles.incorrect
                    ]}>C. {question.option3}</Text>
                </View>
            ))}
        </ScrollView>

<Button
title="Go to Home"
onPress={() => navigation.navigate('QuizCategory')}
/>
        </>
        
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        alignItems: 'center',
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
        color: 'green',
    },
    incorrect: {
        color: 'red',
    },
});

export default ReviewScreen;
