import React, { useState } from "react";
import { Text, View, StyleSheet, FlatList, TextInput, TouchableOpacity } from "react-native";

const ChatBot = () => {
  const [data, setData] = useState([]);
  const [textInput, setTextInput] = useState("");

  const handleSend = () => {
    const userInput = textInput.trim();
    if (userInput === "") return;

    // Mapping of user inputs to bot responses (dummy data)
    const responses = {
      hi: "Hello!",
      hello: "Hi there!",
      thanks: "You're welcome!",
      thank: "You're welcome!",
      default: "I'm not sure how to respond to that.",
    };

    // Determine bot response based on user input
    const botResponse = responses[userInput.toLowerCase()] || responses.default;

    setData([
      ...data,
      { type: "user", text: userInput },
      { type: "bot", text: botResponse },
    ]);
    setTextInput("");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ChatBot</Text>
      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        style={styles.body}
        renderItem={({ item }) => (
          <View style={{ flexDirection: "row", padding: 10 }}>
            <Text
              style={{
                fontWeight: "bold",
                color: item.type === "user" ? "green" : "red",
              }}
            >
              {item.type === "user" ? "You" : "Bot"}
            </Text>
            <Text style={styles.bot}>{item.text}</Text>
          </View>
        )}
      />
      <TextInput
        style={styles.input}
        value={textInput}
        onChangeText={(text) => setTextInput(text)}
        placeholder="Type something..."
      />
      <TouchableOpacity onPress={handleSend} style={styles.button}>
        <Text style={styles.buttonText}>Send</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    marginTop: 70,
  },
  container: {
    flex: 1,
    backgroundColor: "yellow",
    alignItems: "center",
  },
  body: {
    backgroundColor: "blue",
    margin: 10,
    width: "100%",
  },
  bot: {
    fontSize: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "green",
    width: "90%",
    height: 60,
    marginBottom: 10,
    borderRadius: 10,
    paddingLeft: 10,
  },
  button: {
    backgroundColor: "yellow",
    width: "90%",
    height: 60,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 25,
    fontWeight: "bold",
    color: "blue",
  },
});

export default ChatBot;
