import React, { useState,useContext } from 'react';
import { View, TextInput, Button, Text, ScrollView, Image, StyleSheet } from 'react-native';
import { getGPTResponse } from '../openai';
import { DarkModeContext } from "../components/DarkModeContext"; // Import the context

const PhysicalChatScreen = () => {
  const [conversation, setConversation] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [status, setStatus] = useState('');
  const { isDarkMode } = useContext(DarkModeContext); // Use the context

  const handleSend = async () => {
    const newConversation = [...conversation, { role: 'user', content: userInput }];
    setConversation(newConversation);

    try {
      const response = await getGPTResponse(newConversation);
      setConversation([...newConversation, { role: 'assistant', content: response }]);
      setUserInput('');
      
      if (response.toLowerCase().includes('exercise')) {
        const workoutProgram = extractWorkoutProgram(newConversation);
        saveWorkoutProgramToJson(workoutProgram);
        setStatus('Workout program has been generated and saved successfully.');
      }
    } catch (error) {
      setStatus('generate workout program.');
    }
  };

  return (
    <View style={[styles.container,        { backgroundColor: isDarkMode ? "black" : "#fff" },
]}>
      <ScrollView style={styles.chatArea}>
        {conversation.map((message, index) => (
          <View key={index} style={styles.messageRow}>
            <Image 
              source={{ uri: message.role === 'user' 
                ? 'https://i.pinimg.com/736x/02/41/dc/0241dc4c544ec54fee0c378b40ca6bc6.jpg'
                : 'https://upload.wikimedia.org/wikipedia/commons/a/a4/GPT-4.png'
              }} 
              style={styles.avatar} 
            />
            <Text style={styles.message}>{message.content}</Text>
          </View>
        ))}
      </ScrollView>
      <TextInput
        style={[styles.input,{ color: isDarkMode ? "white" : "blackdm" }]}
        value={userInput}
        onChangeText={setUserInput}
        placeholder="Type your message..."
      />
      <Button title="Send" onPress={handleSend} />
      {status && <Text style={styles.status}>{status}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  chatArea: {
    flex: 1,
    marginBottom: 10,
  },
  messageRow: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    marginRight: 10,
    marginTop:40

  },
  message: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginTop:40
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  status: {
    color: 'green',
    marginTop: 10,
  },
});

export default PhysicalChatScreen;
