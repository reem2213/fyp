// import React, { useState, useRef, useEffect, useContext } from "react";
// import {
//   Text,
//   View,
//   StyleSheet,
//   ScrollView,
//   TextInput,
//   TouchableOpacity,
//   KeyboardAvoidingView,
//   Platform,
//   Image,
// } from "react-native";
// import axios from 'axios';
// import Chatty from '../../../assets/chatty.png';
// import Back from '../../../assets/back.png';
// import { DarkModeContext } from "../../../components/DarkModeContext"; // Adjust the path as per your project structure

// const ChatBot = ({ navigation }) => {
//   const { isDarkMode } = useContext(DarkModeContext);
//   const [data, setData] = useState([]);
//   const [textInput, setTextInput] = useState("");
//   const scrollViewRef = useRef();

//   const getGptResponse = async (messages) => {
//     const systemMessage = {
//       role: 'system',
//       content: `You are a supportive and respectful assistant for emotional support. You help users discuss their feelings and provide comfort. 
//       Follow this specific flow:

//       1. Greet the user warmly:
//          'Hello! I'm here to support you. How are you feeling today?'

//       2. Listen to the user and respond with empathy and understanding:
//          'That sounds really tough. I'm sorry you're going through this.'

//       3. Ask open-ended questions to help the user express their feelings more:
//          'Would you like to share more about what's been happening?'

//       4. Offer brief, supportive statements to provide comfort:
//          'It's okay to feel this way. You're doing your best.'

//       5. If the user asks for advice, provide gentle suggestions without being directive:
//          'Maybe it could help to talk to a close friend or a professional about this?'

//       6. Maintain a respectful and non-judgmental tone throughout the conversation.

//       7. End the conversation with a positive note:
//          'Thank you for sharing with me. I'm here for you anytime you need to talk.'

//       Only respond to questions related to emotional support and the user's feelings. If a request is unrelated, politely decline and redirect back to emotional support topics. For example:
//          'I'm sorry, but I can only assist with emotional support-related inquiries. How can I support you today?'`
//     };

//     messages.unshift(systemMessage);

//     const response = await axios.post(
//       'https://api.openai.com/v1/chat/completions',
//       {
//         model: 'gpt-3.5-turbo',
//         messages,
//         temperature: 0.7,
//       },
//       {
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer sk-proj-vahdxCLwy4jP8OT2OHUfT3BlbkFJHn22ULBzQAYadiRABzmC`,
//         },
//       }
//     );
    
//     return response.data.choices[0].message.content;
//   };

//   const handleSend = async () => {
//     if (textInput.trim() === '') return;

//     const newConversation = [...data, { role: 'user', content: textInput }];
//     setData(newConversation);

//     const gptResponse = await getGptResponse(newConversation);
//     setData([...newConversation, { role: 'assistant', content: gptResponse }]);
//     setTextInput('');
//   };

//   useEffect(() => {
//     scrollViewRef.current?.scrollToEnd({ animated: true });
//   }, [data]);

//   const renderMessage = ({ item, index }) => (
//     <View
//       key={index}
//       style={[
//         styles.messageContainer,
//         item.role === "user" ? styles.userMessageContainer : styles.botMessageContainer,
//         { backgroundColor: isDarkMode ? "#333" : item.role === "user" ? "#C0A4FC" : "#5200FF" },
//       ]}
//     >
//       <Image
//         source={{ uri: item.role === 'user' ? 'https://i.pinimg.com/736x/02/41/dc/0241dc4c544ec54fee0c378b40ca6bc6.jpg' : 'https://upload.wikimedia.org/wikipedia/commons/a/a4/GPT-4.png' }}
//         style={styles.avatar}
//       />
//       <Text
//         style={[
//           styles.messageText,
//           item.role === "user" ? styles.userMessageText : styles.botMessageText,
//           { color: isDarkMode ? "#fff" : "#fff" },
//         ]}
//       >
//         {item.content}
//       </Text>
//     </View>
//   );

//   const backToPsychoSection = () => {
//     navigation.navigate('PsychologicalSection');
//   };

//   return (
//     <KeyboardAvoidingView
//       style={[styles.container, { backgroundColor: isDarkMode ? "black" : "#f7f7f7" }]}
//       behavior={Platform.OS === "ios" ? "padding" : null}
//       keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
//     >
//       <View style={[styles.header, { backgroundColor:isDarkMode ? "#0A0A0A" :  "#5e17eb"  }]}>
//         <TouchableOpacity style={{ left: -180, top: 0 }} onPress={backToPsychoSection}>
//           <Image source={Back} style={{ width: 30, height: 30, position: "absolute" }} />
//         </TouchableOpacity>
//         <Image source={Chatty} style={{ width: 50, height: 50, position: "absolute", left: 60, top: 40 }} />
//         <Text style={[styles.headerText, { color: "#fff" }]}>Chatty</Text>
//       </View>
//       <ScrollView
//         ref={scrollViewRef}
//         contentContainerStyle={styles.body}
//       >
//         {data.map((item, index) => renderMessage({ item, index }))}
//       </ScrollView>
//       <View style={styles.inputContainer}>
//         <TextInput
//           style={[styles.input, { backgroundColor: isDarkMode ? "#333" :  "#fff",color: isDarkMode ? "#fff" : "#000" }]}
//           value={textInput}
//           onChangeText={(text) => setTextInput(text)}
//           placeholder="Type something..."
//           placeholderTextColor={isDarkMode ? "#888" : "#666"}
//         />
//         <TouchableOpacity onPress={handleSend} style={[styles.sendButton, { backgroundColor: "#5e17eb" }]}>
//           <Text style={styles.sendButtonText}>Send</Text>
//         </TouchableOpacity>
//       </View>
//     </KeyboardAvoidingView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#f7f7f7",
//   },
//   header: {
//     paddingTop: 50,
//     paddingBottom: 20,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   headerText: {
//     fontSize: 24,
//     fontWeight: "bold",
//     left: -45,
//   },
//   body: {
//     padding: 10,
//   },
//   messageContainer: {
//     maxWidth: "70%",
//     borderRadius: 20,
//     padding: 10,
//     marginBottom: 10,
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   userMessageContainer: {
//     alignSelf: "flex-end",
//     backgroundColor: "#C0A4FC",
//   },
//   botMessageContainer: {
//     alignSelf: "flex-start",
//     backgroundColor: "#5200FF",
//   },
//   avatar: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     marginRight: 10,
//   },
//   messageText: {
//     fontSize: 16,
//     color: "white",
//   },
//   inputContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     padding: 10,
//   },
//   input: {
//     flex: 1,
//     borderWidth: 1,
//     borderColor: "#ddd",
//     borderRadius: 20,
//     paddingHorizontal: 15,
//     paddingVertical: 10,
//     marginRight: 10,
//   },
//   sendButton: {
//     borderRadius: 20,
//     paddingVertical: 10,
//     paddingHorizontal: 15,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   sendButtonText: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "bold",
//   },
// });

// export default ChatBot;




import React, { useState, useEffect, useContext, useRef } from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Image,
} from "react-native";
import axios from 'axios';
import Chatty from '../../../assets/chatty.png';
import Back from '../../../assets/back.png';
import { DarkModeContext } from "../../../components/DarkModeContext"; // Adjust the path as per your project structure

const ChatBot = ({ navigation,route }) => {
  const { isDarkMode } = useContext(DarkModeContext);
  const [conversation, setConversation] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [hasSystemMessageSent, setHasSystemMessageSent] = useState(false);
  const scrollViewRef = useRef();
  const {username,userId}=route.params;


  useEffect(() => {
    // Send the system message only once when the screen loads
    if (!hasSystemMessageSent) {
      const systemMessage = {
        role: 'system',
        content: `You are a supportive and respectful assistant for emotional support. You help users discuss their feelings and provide comfort. 
        Follow this specific flow:
        
        1. Greet the user warmly:
           'Hello! I'm here to support you. How are you feeling today?'
  
        2. Listen to the user and respond with empathy and understanding:
           'That sounds really tough. I'm sorry you're going through this.'
  
        3. Ask open-ended questions to help the user express their feelings more:
           'Would you like to share more about what's been happening?'
  
        4. Offer brief, supportive statements to provide comfort:
           'It's okay to feel this way. You're doing your best.'
  
        5. If the user asks for advice, provide gentle suggestions without being directive:
           'Maybe it could help to talk to a close friend or a professional about this?'
  
        6. Maintain a respectful and non-judgmental tone throughout the conversation.
  
        7. End the conversation with a positive note:
           'Thank you for sharing with me. I'm here for you anytime you need to talk.'
  
        Only respond to questions related to emotional support and the user's feelings. If a request is unrelated, politely decline and redirect back to emotional support topics. For example:
           'I'm sorry, but I can only assist with emotional support-related inquiries. How can I support you today?'`
      };

      setConversation([systemMessage]);
      setHasSystemMessageSent(true);
    }
  }, [hasSystemMessageSent]);

  const getGptResponse = async (messages) => {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages,
        temperature: 0.7,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer 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`,
        },
      }
    );

    return response.data.choices[0].message.content;
  };

  const handleSend = async () => {
    if (userInput.trim() === '') return;

    const newConversation = [...conversation, { role: 'user', content: userInput }];
    setConversation(newConversation);

    const gptResponse = await getGptResponse(newConversation);
    setConversation([...newConversation, { role: 'assistant', content: gptResponse }]);
    setUserInput('');
  };

  useEffect(() => {
    // Automatically scroll to the bottom when new messages are added
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [conversation]);

  const renderMessage = (item, index) => (
    <View
      key={index}
      style={[
        styles.messageContainer,
        item.role === "user" ? styles.userMessageContainer : styles.botMessageContainer,
        { backgroundColor: isDarkMode ? "#333" : (item.role === "user" ? "#C0A4FC" : "#5200FF") },
      ]}
    >
      <Text
        style={[
          styles.messageText,
          item.role === "user" ? styles.userMessageText : styles.botMessageText,
          { color: isDarkMode ? "#fff" : "#fff" },
        ]}
      >
        {item.content}
      </Text>
    </View>
  );

  const backToPsychoSection = () => {
    navigation.navigate('PsychologicalSection',{userId,username});
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: isDarkMode ? "black" : "#f7f7f7" }]}
      behavior={Platform.OS === "ios" ? "padding" : null}
      keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
    >
      <View style={[styles.header, { backgroundColor:isDarkMode ? "#0A0A0A" :  "#5e17eb"  }]}>
        <TouchableOpacity style={{ left: -180, top: 0 }} onPress={backToPsychoSection}>
          <Image source={Back} style={{ width: 30, height: 30, position: "absolute" }} />
        </TouchableOpacity>
        <Image source={Chatty} style={{ width: 50, height: 50, position: "absolute", left: 60, top: 40 }} />
        <Text style={[styles.headerText, { color: "#fff" }]}>Chatty</Text>
      </View>
      <ScrollView
        ref={scrollViewRef}
        contentContainerStyle={styles.body}
      >
        {conversation.map((item, index) => renderMessage(item, index))}
      </ScrollView>
      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input, { backgroundColor: isDarkMode ? "#333" :  "#fff",color: isDarkMode ? "#fff" : "#000" }]}
          value={userInput}
          onChangeText={(text) => setUserInput(text)}
          placeholder="Type something..."
          placeholderTextColor={isDarkMode ? "#888" : "#666"}
        />
        <TouchableOpacity onPress={handleSend} style={[styles.sendButton, { backgroundColor: "#5e17eb" }]}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f7f7",
  },
  header: {
    paddingTop: 50,
    paddingBottom: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    left: -45,
  },
  body: {
    padding: 10,
  },
  messageContainer: {
    maxWidth: "70%",
    borderRadius: 20,
    padding: 10,
    marginBottom: 10,
  },
  userMessageContainer: {
    alignSelf: "flex-end",
  },
  botMessageContainer: {
    alignSelf: "flex-start",
  },
  messageText: {
    fontSize: 16,
    color: "white",
  },
  userMessageText: {
    color: "white",
  },
  botMessageText: {
    color: "#fff",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginRight: 10,
  },
  sendButton: {
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  sendButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ChatBot;
