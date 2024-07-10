// import React, { useState, useRef, useEffect } from "react";
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
// import Chatty from '../../../assets/chatty.png';
// import Back from '../../../assets/back.png';

// const ChatBot = ({ navigation }) => {
//   const [data, setData] = useState([]);
//   const [textInput, setTextInput] = useState("");
//   const scrollViewRef = useRef();

//   const handleSend = () => {
//     const userInput = textInput.trim();
//     if (userInput === "") return;

//     // Mapping of user inputs to bot responses
//     const responses = {
//       hi: "Hello!",
//       hello: "Hi there!",
//       how: "I'm just a bot, but I'm doing great!",
//       "how are you": "I'm just a bot, but I'm doing great!",
//       thanks: "You're welcome!",
//       thank: "You're welcome!",
//       bye: "Goodbye! Have a great day!",
//       goodnight: "Goodnight! Sleep well!",
//       goodmorning: "Good morning! Have a nice day!",
//       "how do you feel": "I don't have feelings, but I'm here to chat!",
//       "what is your name": "My name is Chatty! and you?",
//       "reem": "nice to meet you reem!",
//       "what can you do": "I can chat with you and answer some questions!",
//       "tell me a joke": "Why don't scientists trust atoms? Because they make up everything!",
//       default: "I'm not sure how to respond to that.",
//     };

//     // Determine bot response based on user input
//     const botResponse = responses[userInput.toLowerCase()] || responses.default;

//     setData([
//       ...data,
//       { type: "user", text: userInput },
//       { type: "bot", text: "..." }, // Show loading dots
//     ]);

//     setTextInput("");

//     // Add a delay of 2 seconds before bot responds
//     setTimeout(() => {
//       setData((prevData) => [
//         ...prevData.slice(0, -1), // Remove the loading dots
//         { type: "bot", text: botResponse },
//       ]);
//     }, 2000);
//   };

//   useEffect(() => {
//     // Automatically scroll to the bottom when new messages are added
//     scrollViewRef.current?.scrollToEnd({ animated: true });
//   }, [data]);

//   const renderItem = (item, index) => (
//     <View
//       key={index}
//       style={[
//         styles.messageContainer,
//         item.type === "user" ? styles.userMessageContainer : styles.botMessageContainer,
//       ]}
//     >
//       <Text
//         style={[
//           styles.messageText,
//           item.type === "user" ? styles.userMessageText : styles.botMessageText,
//         ]}
//       >
//         {item.text}
//       </Text>
//     </View>
//   );

//   const backToPsychoSection = () => {
//     navigation.navigate('PsychologicalSection');
//   };

//   return (
//     <KeyboardAvoidingView
//       style={styles.container}
//       behavior={Platform.OS === "ios" ? "padding" : null}
//       keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
//     >
//       <View style={styles.header}>
//         <TouchableOpacity style={{ left: -180, top: 0 }} onPress={backToPsychoSection}>
//           <Image source={Back} style={{ width: 30, height: 30, position: "absolute" }} />
//         </TouchableOpacity>
//         <Image source={Chatty} style={{ width: 50, height: 50, position: "absolute", left: 60, top: 40 }} />
//         <Text style={styles.headerText}>Chatty</Text>
//       </View>
//       <ScrollView
//         ref={scrollViewRef}
//         contentContainerStyle={styles.body}
//       >
//         {data.map((item, index) => renderItem(item, index))}
//       </ScrollView>
//       <View style={styles.inputContainer}>
//         <TextInput
//           style={styles.input}
//           value={textInput}
//           onChangeText={(text) => setTextInput(text)}
//           placeholder="Type something..."
//         />
//         <TouchableOpacity onPress={handleSend} style={styles.sendButton}>
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
//     backgroundColor: "#5e17eb",
//     paddingTop: 50,
//     paddingBottom: 20,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   headerText: {
//     fontSize: 24,
//     fontWeight: "bold",
//     color: "#fff",
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
//   },
//   userMessageContainer: {
//     backgroundColor: "#C0A4FC",
//     alignSelf: "flex-end",
//   },
//   botMessageContainer: {
//     backgroundColor: "#5200FF",
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
//     backgroundColor: "#fff",
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
//     backgroundColor: "#5e17eb",
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


import React, { useState, useRef, useEffect, useContext } from "react";
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
import Chatty from '../../../assets/chatty.png';
import Back from '../../../assets/back.png';
import { DarkModeContext } from "../../../components/DarkModeContext"; // Adjust the path as per your project structure

const ChatBot = ({ navigation }) => {
  const { isDarkMode } = useContext(DarkModeContext);
  const [data, setData] = useState([]);
  const [textInput, setTextInput] = useState("");
  const scrollViewRef = useRef();

  const handleSend = () => {
    const userInput = textInput.trim();
    if (userInput === "") return;

    // Mapping of user inputs to bot responses
    const responses = {
      hi: "Hello!",
      hello: "Hi there!",
      how: "I'm just a bot, but I'm doing great!",
      "how are you": "I'm just a bot, but I'm doing great!",
      thanks: "You're welcome!",
      thank: "You're welcome!",
      bye: "Goodbye! Have a great day!",
      goodnight: "Goodnight! Sleep well!",
      goodmorning: "Good morning! Have a nice day!",
      "how do you feel": "I don't have feelings, but I'm here to chat!",
      "what is your name": "My name is Chatty! and you?",
      "reem": "nice to meet you reem!",
      "what can you do": "I can chat with you and answer some questions!",
      "tell me a joke": "Why don't scientists trust atoms? Because they make up everything!",
      default: "I'm not sure how to respond to that.",
    };

    // Determine bot response based on user input
    const botResponse = responses[userInput.toLowerCase()] || responses.default;

    setData([
      ...data,
      { type: "user", text: userInput },
      { type: "bot", text: "..." }, // Show loading dots
    ]);

    setTextInput("");

    // Add a delay of 2 seconds before bot responds
    setTimeout(() => {
      setData((prevData) => [
        ...prevData.slice(0, -1), // Remove the loading dots
        { type: "bot", text: botResponse },
      ]);
    }, 2000);
  };

  useEffect(() => {
    // Automatically scroll to the bottom when new messages are added
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [data]);

  const renderItem = (item, index) => (
    <View
      key={index}
      style={[
        styles.messageContainer,
        item.type === "user" ? styles.userMessageContainer : styles.botMessageContainer,
        { backgroundColor: isDarkMode ? "#333" : (item.type === "user" ? "#C0A4FC" : "#5200FF") },
      ]}
    >
      <Text
        style={[
          styles.messageText,
          item.type === "user" ? styles.userMessageText : styles.botMessageText,
          { color: isDarkMode ? "#fff" : "#fff" },
        ]}
      >
        {item.text}
      </Text>
    </View>
  );

  const backToPsychoSection = () => {
    navigation.navigate('PsychologicalSection');
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: isDarkMode ? "#1A1A1A" : "#f7f7f7" }]}
      behavior={Platform.OS === "ios" ? "padding" : null}
      keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
    >
      <View style={[styles.header, { backgroundColor: "#5e17eb" }]}>
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
        {data.map((item, index) => renderItem(item, index))}
      </ScrollView>
      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input, { backgroundColor: isDarkMode ? "#333" : "#fff", color: isDarkMode ? "#fff" : "#000" }]}
          value={textInput}
          onChangeText={(text) => setTextInput(text)}
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
