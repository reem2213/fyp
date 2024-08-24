import React, { useState, useEffect, useRef } from 'react';
import { View, FlatList, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import axios from 'axios';

export default function ChatScreen({ route, navigation }) {
  const { groupId, userId,username } = route.params;
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const [typingStatus, setTypingStatus] = useState('');
  const typingTimeoutRef = useRef(null);
  const flatListRef = useRef(null);

  useEffect(() => {
    fetchMessages();
    const intervalId = setInterval(fetchMessages, 2000);
    return () => clearInterval(intervalId);
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await axios.get(`http://10.0.0.21:3001/groups/${groupId}/messages`);
      setMessages(response.data);
      if (flatListRef.current) {
        flatListRef.current.scrollToEnd({ animated: true });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const sendMessage = async () => {
    console.log('Sending message as user:', userId);  // Add this line to debug
    try {
      await axios.post(`http://10.0.0.21:3001/groups/${groupId}/messages`, {
        sender: userId,
        text,
      });
      setText('');
      fetchMessages();
      stopTyping();
    } catch (error) {
      console.error(error);
    }
  };
  const startTyping = () => {
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    axios.post(`http://10.0.0.21:3001/groups/${groupId}/typing`, { userId, username });

    typingTimeoutRef.current = setTimeout(() => {
      stopTyping();
    }, 3000);
  };

  const stopTyping = () => {
    axios.post(`http://10.0.0.21:3001/groups/${groupId}/stopTyping`, { userId });
  };

  useEffect(() => {
    const typingInterval = setInterval(checkTypingStatus, 1000);
    return () => clearInterval(typingInterval);
  }, []);

  const checkTypingStatus = async () => {
    try {
      const response = await axios.get(`http://10.0.0.21:3001/groups/${groupId}/typingStatus?userId=${userId}`);
      setTypingStatus(response.data.typingStatus);
    } catch (error) {
      console.error(error);
    }
  };

  // const startTyping = () => {
  //   if (typingTimeoutRef.current) {
  //     clearTimeout(typingTimeoutRef.current);
  //   }
  //   axios.post(`http://10.0.0.21:3001/groups/${groupId}/typing`, { userId });

  //   typingTimeoutRef.current = setTimeout(() => {
  //     stopTyping();
  //   }, 3000);
  // };

  // const stopTyping = () => {
  //   axios.post(`http://10.0.0.21:3001/groups/${groupId}/stopTyping`, { userId });
  // };

  // useEffect(() => {
  //   const typingInterval = setInterval(checkTypingStatus, 1000);
  //   return () => clearInterval(typingInterval);
  // }, []);

  // const checkTypingStatus = async () => {
  //   try {
  //     const response = await axios.get(`http://10.0.0.21:3001/groups/${groupId}/typingStatus`);
  //     setTypingStatus(response.data.typingStatus);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate("Community",{username,userId})} style={styles.backButton}>
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Chat</Text>
      </View>
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={[
            styles.messageCard,
            item.sender === userId ? styles.sentMessage : styles.receivedMessage
          ]}>
            <Text style={styles.senderName}>{item.sender === userId ? "You" : item.sender}</Text>
            <Text style={styles.messageText}>{item.text}</Text>
          </View>
        )}
        contentContainerStyle={styles.messagesContainer}
        onContentSizeChange={() => flatListRef.current.scrollToEnd({ animated: true })}
      />
     {typingStatus && (
        <Text style={styles.typingStatus}>{typingStatus}</Text>
      )}

      <View style={styles.inputContainer}>
        <TextInput
          value={text}
          onChangeText={(text) => {
            setText(text);
            startTyping();
          }}
          placeholder="Type a message"
          placeholderTextColor="#888"
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
    backgroundColor: '#121212',
    top:20
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
    backgroundColor: '#1E1E1E',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
  },
  backButton: {
    marginRight: 10,
  },
  backButtonText: {
    color: '#4A90E2',
    marginTop:20
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  messagesContainer: {
    padding: 20,
  },
  messageCard: {
    padding: 15,
    backgroundColor: '#1E1E1E',
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
  },
  messageText: {
    fontSize: 16,
    color: '#FFFFFF',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#333',
    backgroundColor: '#1E1E1E',
  },
  textInput: {
    flex: 1,
    padding: 10,
    backgroundColor: '#2C2C2C',
    borderRadius: 20,
    marginRight: 10,
    borderColor: '#333',
    borderWidth: 1,
    color: '#FFFFFF',
  },
  sendButton: {
    backgroundColor: '#4A90E2',
    borderRadius: 20,
    padding: 10,
  },
  sendButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  typingStatus: {
    padding: 10,
    fontStyle: 'italic',
    color: '#888',
    textAlign: 'center',
  },
});
