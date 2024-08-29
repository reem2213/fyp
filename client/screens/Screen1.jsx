// import React, { useState,useContext } from 'react';
// import { View, TextInput, Button, Text, ScrollView, Image, StyleSheet } from 'react-native';
// import { getGPTResponse } from '../openai';
// import { DarkModeContext } from "../components/DarkModeContext"; // Import the context

// const PhysicalChatScreen = () => {
//   const [conversation, setConversation] = useState([]);
//   const [userInput, setUserInput] = useState('');
//   const [status, setStatus] = useState('');
//   const { isDarkMode } = useContext(DarkModeContext); // Use the context

//   const handleSend = async () => {
//     const newConversation = [...conversation, { role: 'user', content: userInput }];
//     setConversation(newConversation);

//     try {
//       const response = await getGPTResponse(newConversation);
//       setConversation([...newConversation, { role: 'assistant', content: response }]);
//       setUserInput('');

//       if (response.toLowerCase().includes('exercise')) {
//         const workoutProgram = extractWorkoutProgram(newConversation);
//         saveWorkoutProgramToJson(workoutProgram);
//         setStatus('Workout program has been generated and saved successfully.');
//       }
//     } catch (error) {
//       setStatus('generate workout program.');
//     }
//   };

//   return (
//     <View style={[styles.container,        { backgroundColor: isDarkMode ? "black" : "#fff" },
// ]}>
//       <ScrollView style={styles.chatArea}>
//         {conversation.map((message, index) => (
//           <View key={index} style={styles.messageRow}>
//             <Image
//               source={{ uri: message.role === 'user'
//                 ? 'https://i.pinimg.com/736x/02/41/dc/0241dc4c544ec54fee0c378b40ca6bc6.jpg'
//                 : 'https://upload.wikimedia.org/wikipedia/commons/a/a4/GPT-4.png'
//               }}
//               style={styles.avatar}
//             />
//             <Text style={styles.message}>{message.content}</Text>
//           </View>
//         ))}
//       </ScrollView>
//       <TextInput
//         style={[styles.input,{ color: isDarkMode ? "white" : "blackdm" }]}
//         value={userInput}
//         onChangeText={setUserInput}
//         placeholder="Type your message..."
//       />
//       <Button title="Send" onPress={handleSend} />
//       {status && <Text style={styles.status}>{status}</Text>}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 10,
//   },
//   chatArea: {
//     flex: 1,
//     marginBottom: 10,
//   },
//   messageRow: {
//     flexDirection: 'row',
//     marginBottom: 10,
//   },
//   avatar: {
//     width: 40,
//     height: 40,
//     marginRight: 10,
//     marginTop:40

//   },
//   message: {
//     backgroundColor: '#f0f0f0',
//     padding: 10,
//     borderRadius: 5,
//     flex: 1,
//     marginTop:40
//   },
//   input: {
//     borderColor: '#ccc',
//     borderWidth: 1,
//     borderRadius: 5,
//     padding: 10,
//     marginBottom: 10,
//   },
//   status: {
//     color: 'green',
//     marginTop: 10,
//   },
// });

// export default PhysicalChatScreen;

import React, { useState, useContext } from "react";
import {
  View,
  TextInput,
  Button,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableOpacity,
  Platform,
} from "react-native";
import { getGPTResponse } from "../openai";
import { DarkModeContext } from "../components/DarkModeContext"; // Import the context // Adjust the path as per your project structure
import axios from "axios";
import Chatty from "../assets/chatty.png";
import Back from "../assets/back.png";
const ChatBot = ({ navigation, route }) => {
  const [conversation, setConversation] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [status, setStatus] = useState("");
  const { isDarkMode } = useContext(DarkModeContext); // Use the context
  const { username, userId } = route.params;

  const handleSend = async () => {
    const newConversation = [
      ...conversation,
      { role: "user", content: userInput },
    ];
    setConversation(newConversation);

    try {
      const response = await getGPTResponse(newConversation);
      setConversation([
        ...newConversation,
        { role: "assistant", content: response },
      ]);
      setUserInput("");

      if (response.toLowerCase().includes("exercise")) {
        const workoutProgram = extractWorkoutProgram(newConversation);
        saveWorkoutProgramToJson(workoutProgram);
        setStatus("Workout program has been generated and saved successfully.");
      }
    } catch (error) {
      setStatus("generate workout program.");
    }
  };

  const backToPsychoSection = () => {
    navigation.navigate("PsychologicalSection", { userId, username });
  };
  // const renderMessage = (item, index) => (
  //   <View
  //     key={index}
  //     style={[
  //       styles.messageContainer,
  //       item.role === "user"
  //         ? styles.userMessageContainer
  //         : styles.botMessageContainer,
  //       {
  //         backgroundColor: isDarkMode
  //           ? "#333"
  //           : item.role === "user"
  //           ? "#C0A4FC"
  //           : "#5200FF",
  //       },
  //     ]}
  //   >
  //     <Image
  //       source={{
  //         uri:
  //           item.role === "user"
  //             ? "https://i.pinimg.com/736x/02/41/dc/0241dc4c544ec54fee0c378b40ca6bc6.jpg"
  //             : "https://upload.wikimedia.org/wikipedia/commons/a/a4/GPT-4.png",
  //       }}
  //       style={styles.avatar}
  //     />
  //     <Text
  //       style={[
  //         styles.messageText,
  //         item.role === "user" ? styles.userMessageText : styles.botMessageText,
  //         { color: isDarkMode ? "#fff" : "#fff" },
  //       ]}
  //     >
  //       {item.content}
  //     </Text>
  //   </View>
  // );
  const renderMessage = (item, index) => (
    <View
      key={index}
      style={item.role === "user" ? styles.userMessageContainer : styles.botMessageContainer}
    >
      {item.role === "user" ? (
        <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
          <View style={[styles.messageContainer, { backgroundColor: "#0344C3" }]}>
            <Text style={styles.messageText}>{item.content}</Text>
          </View>
          <Image
            source={{ uri: "https://i.pinimg.com/736x/02/41/dc/0241dc4c544ec54fee0c378b40ca6bc6.jpg" }}
            style={styles.userAvatar}
          />
        </View>
      ) : (
        <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
          <Image
            source={{ uri: "https://upload.wikimedia.org/wikipedia/commons/a/a4/GPT-4.png" }}
            style={styles.botAvatar}
          />
          <View style={[styles.messageContainer, { backgroundColor: "#032B79" }]}>
            <Text style={styles.messageText}>{item.content}</Text>
          </View>
        </View>
      )}
    </View>
  );
  
  return (
    <KeyboardAvoidingView
      style={[
        styles.container,
        { backgroundColor: isDarkMode ? "#101010" : "#f7f7f7" },
      ]}
      behavior={Platform.OS === "ios" ? "padding" : null}
      keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
    >
      <View
        style={[
          styles.header,
          { backgroundColor: isDarkMode ? "black" : "#032B79" },
        ]}
      >
        <TouchableOpacity
          style={{ left: -180, top: 0 }}
          onPress={backToPsychoSection}
        >
          <Image
            source={Back}
            style={{ width: 30, height: 30, position: "absolute" }}
          />
        </TouchableOpacity>
        <Image
          source={Chatty}
          style={{
            width: 50,
            height: 50,
            position: "absolute",
            left: 60,
            top: 40,
          }}
        />
        <Text style={[styles.headerText, { color: "#fff" }]}>Body Fit</Text>
      </View>
      <ScrollView contentContainerStyle={styles.body}>
        {conversation.map((item, index) => renderMessage(item, index))}
      </ScrollView>
      <View style={styles.inputContainer}>
        <TextInput
          style={[
            styles.input,
            {
              backgroundColor: isDarkMode ? "#333" : "#fff",
              color: isDarkMode ? "#fff" : "#000",
            },
          ]}
          value={userInput}
          onChangeText={(text) => setUserInput(text)}
          placeholder="Type something..."
          placeholderTextColor={isDarkMode ? "#888" : "#666"}
        />
        <TouchableOpacity
          onPress={handleSend}
          style={[styles.sendButton, { backgroundColor: "#032B79" }]}
        >
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
    borderRadius: 20,
    padding: 10,
    marginBottom: 10,
    maxWidth: "80%", // Limit the width of the message bubble
  },
  userMessageContainer: {
    alignSelf: "flex-end",
    marginBottom: 20,
    width:"100%"
  },
  botMessageContainer: {
    alignSelf: "flex-start",
    marginBottom: 20,
  },
  messageText: {
    fontSize: 16,
    color: "white",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  botAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20, // Make the avatar circular
    marginRight: 10, // Space between the avatar and the message bubble
  },
  userAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20, // Make the avatar circular
    marginLeft: 10, // Space between the avatar and the message bubble
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
    backgroundColor: "#032B79",
  },
  sendButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

// const styles = StyleSheet.create({
 
//     container: {
//       flex: 1,
//       backgroundColor: "#f7f7f7",
//     },
//     header: {
//       paddingTop: 50,
//       paddingBottom: 20,
//       alignItems: "center",
//       justifyContent: "center",
//     },
//     headerText: {
//       fontSize: 24,
//       fontWeight: "bold",
//       left: -45,
//     },
//     body: {
//       padding: 10,
//     },
//     messageContainer: {
//       maxWidth: "auto",
//       borderRadius: 20,
//       padding: 10,
//       marginBottom: 10,
//       flexDirection: "row", // Arrange avatar and text in a row
//       alignItems: "center", // Align items (avatar and text) to the center
//     },
//     userMessageContainer: {
//       alignSelf: "flex-end",
//       width:"20%"
//     },
//     botMessageContainer: {
//       alignSelf: "flex-start",
//       left:40
//     },
//     messageText: {
//       fontSize: 16,
//       color: "white",
//       flex: 1, // Allow the text to take up the remaining space
//     },
//     userMessageText: {
//       color: "white",
//     },
//     botMessageText: {
//       color: "#fff",

//     },
//     inputContainer: {
//       flexDirection: "row",
//       alignItems: "center",
//       padding: 10,
//     },
//     avatar: {
//       width: 40,
//       height: 40,
//       borderRadius: 20, // Make the avatar circular
//       marginRight: 50, // Space between the avatar and the text
//       position:"absolute",
//       right:230,
//       top:0

//     },
//     input: {
//       flex: 1,
//       borderWidth: 1,
//       borderColor: "#ddd",
//       borderRadius: 20,
//       paddingHorizontal: 15,
//       paddingVertical: 10,
//       marginRight: 10,
//     },
//     sendButton: {
//       borderRadius: 20,
//       paddingVertical: 10,
//       paddingHorizontal: 15,
//       justifyContent: "center",
//       alignItems: "center",
//     },
//     sendButtonText: {
//       color: "#fff",
//       fontSize: 16,
//       fontWeight: "bold",
//     },
//   });
  
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
//     justifyContent:"space-between"
//   },
//   userMessageContainer: {
//     alignSelf: "flex-end",
//   },
//   botMessageContainer: {
//     alignSelf: "flex-start",
//   },
//   messageText: {
//     fontSize: 16,
//     color: "white",
//   },
//   userMessageText: {
//     color: "white",
//   },
//   botMessageText: {
//     color: "#fff",
//   },
//   inputContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     padding: 10,
//   },
//     avatar: {
//     width: 40,
//     height: 40,
//     // position:"absolute",
    


//     // marginRight: 10,
//     // marginTop:40
//     },
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

export default ChatBot;
