import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

const QuizScreen = ({ route, navigation }) => {
    const { category } = route.params;
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        axios.get(`http://10.0.0.21:3001/questions/${category}`)
            .then(response => {
                setQuestions(response.data);
            })
            .catch(error => {
                console.error('Axios Error:', error);
                Alert.alert('Error', 'Failed to load questions');
            });
    }, [category]);

    const startQuiz = () => {
        if (questions.length > 0) {
            navigation.navigate('Question', { questions, questionIndex: 0, score: 0 });
        }
    };

    return (
        <View style={styles.container}>
            {questions.length > 0 ? (
                <Button
                    title="Start Quiz"
                    onPress={startQuiz}
                />
            ) : (
                <Text>Loading questions...</Text>
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
});

export default QuizScreen;
