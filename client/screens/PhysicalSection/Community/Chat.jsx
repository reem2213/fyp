
import React, { useState, useEffect, useRef } from 'react';
import { View, FlatList, Text, TextInput,Image, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, Modal } from 'react-native';
import axios from 'axios';
import Back from '../../../assets/DarkArrowBack.png';
import InfoDark from '../../../assets/infoDark.png';
import Quit from '../../../assets/quit.png';
export default function ChatScreen({ route, navigation }) {
  const { groupName,groupId, userId, username } = route.params;
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const [typingStatus, setTypingStatus] = useState('');
  const [members, setMembers] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
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

  const fetchGroupMembers = async () => {
    try {
      const response = await axios.get(`http://10.0.0.21:3001/groups/${groupId}/members`);
      setMembers(response.data);
      console.log(response.data)
      setModalVisible(true);
    } catch (error) {
      console.error('Error fetching group members:', error);
    }
  };

  const sendMessage = async () => {
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

  const quitGroup = async () => {
    try {
      await axios.post(`http://10.0.0.21:3001/groups/${groupId}/quit`, { userId });
      navigation.navigate("Community", { username, userId });
    } catch (error) {
      console.error("Failed to quit group:", error);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate("Community", { username, userId })} style={styles.backButton}>
          <Image source={Back} style={{width:20,height:20,marginTop:5}}/>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{groupName}</Text>
        <TouchableOpacity onPress={fetchGroupMembers} style={styles.infoButton}>
          {/* <Text style={styles.infoButtonText}>Info</Text>
          InfoDark */}
          <Image source={InfoDark} style={{width:20,height:20,marginTop:10, left:105}}/>

        </TouchableOpacity>
        <TouchableOpacity onPress={quitGroup} style={styles.quitButton}>
        <Image source={Quit} style={{width:20,height:20,marginTop:10, left:0}}/>
        </TouchableOpacity>
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
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Group Members</Text>
            {members.map((member) => (
              <Text key={member.userId} style={styles.memberName}>
                {member.username} {member.isAdmin && '(admin)'}
              </Text>
            ))}
            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    top: 0
  },
  sentMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#719AEA',
    borderRadius:25,
    paddingHorizontal:20,
   

  },
  receivedMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#2B4C8D',
    borderRadius:25
  },
  senderName: {
    fontSize: 12,
    color: 'white',
    marginBottom: 5,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 25,
    backgroundColor: '#FAFAFA',
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
    marginTop: 20
  },
  infoButton: {
    marginLeft: 'auto',
    marginRight: 10,
  },
  infoButtonText: {
    color: '#4A90E2',
    fontWeight: 'bold',
  },
  quitButton: {
    marginLeft: 'auto',
  },
  quitButtonText: {
    color: '#FF4D4D',
    fontWeight: 'bold',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  messagesContainer: {
    padding: 20,
    backgroundColor:"white"
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
    borderTopColor: '#EEEEEE',
    backgroundColor: 'white',
  },
  textInput: {
    flex: 1,
    padding: 10,
    backgroundColor: '#EEEEEE',
    borderRadius: 20,
    marginRight: 10,
    // borderColor: '#333',
    // borderWidth: 1,
    color: 'white',
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  memberName: {
    fontSize: 16,
    marginVertical: 5,
    color:"gray"
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: '#4A90E2',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  closeButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
});
