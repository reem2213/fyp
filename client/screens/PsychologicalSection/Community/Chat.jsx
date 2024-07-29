import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import axios from 'axios';

export default function ChatScreen({ route, navigation }) {
  const { groupId ,username} = route.params;
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await axios.get(`http://10.0.0.21:3001/groups/${groupId}`);
      setMessages(response.data.messages);
    } catch (error) {
      console.error(error);
    }
  };

  // const sendMessage = async () => {
  //   try {
  //     const response = await axios.post(`http://10.0.0.21:3001/groups/${groupId}/messages`, {
  //       sender: 'user_id', // replace with actual user ID
  //       text,
  //     });
  //     setMessages(response.data.messages);
  //     setText('');
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  const sendMessage = async () => {
    try {
      const response = await axios.post(`http://10.0.0.21:3001/groups/${groupId}/messages`, {
        sender: username,
        text,
      });
      setMessages(response.data.messages);
      setText('')
      console.log('to dbb')
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Chat</Text>
      </View>
       <FlatList
      data={messages}
      keyExtractor={(item) => item._id}
      renderItem={({ item }) => (
        <View style={[
          styles.messageCard,
          item.sender === username ? styles.sentMessage : styles.receivedMessage
        ]}>
          <Text style={styles.senderName}>{item.sender}</Text>
          <Text style={styles.messageText}>{item.text}</Text>
        </View>
      )}
      contentContainerStyle={styles.messagesContainer}
    />
      <View style={styles.inputContainer}>
        <TextInput
          value={text}
          onChangeText={setText}
          placeholder="Type a message"
          placeholderTextColor="#888" // Light gray for placeholder text in dark mode
          style={styles.textInput}
        />
        <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212', // Dark mode background color
  },
  sentMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#4A90E2',
  },
  receivedMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#1E1E1E',
  },
  senderName: {
    fontSize: 12,
    color: '#888',
    marginBottom: 5,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#1E1E1E', // Darker background for the header
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
  },
  backButton: {
    marginRight: 10,
  },
  backButtonText: {
    color: '#4A90E2', // Light blue color for the back button text
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF', // White color for header title
  },
  messagesContainer: {
    padding: 20,
  },
  messageCard: {
    padding: 15,
    backgroundColor: '#1E1E1E', // Darker background for the message card
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
  },
  messageText: {
    fontSize: 16,
    color: '#FFFFFF', // White color for the message text
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#333', // Darker border top color
    backgroundColor: '#1E1E1E', // Darker background for the input container
  },
  textInput: {
    flex: 1,
    padding: 10,
    backgroundColor: '#2C2C2C', // Darker background for the text input
    borderRadius: 20,
    marginRight: 10,
    borderColor: '#333', // Darker border color for the text input
    borderWidth: 1,
    color: '#FFFFFF', // White color for the text input
  },
  sendButton: {
    backgroundColor: '#4A90E2', // Light blue color for the send button
    borderRadius: 20,
    padding: 10,
  },
  sendButtonText: {
    color: '#FFFFFF', // White color for the send button text
    fontSize: 16,
  },
});
