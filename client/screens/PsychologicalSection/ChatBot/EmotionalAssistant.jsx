// import React from "react";
// import { Text, View, TouchableOpacity, Image } from "react-native";
// import Back from "../../../assets/back.png";
// import LangBg from "../../../assets/bgChatBot.png";

// const EmotionalAssistant = ({ navigation }) => {
//     const backToHome = () => {
//         navigation.navigate("PsychologicalSection");
//       };
//       const Start = () => {
//         navigation.navigate("Chatting");
//       };
      
//   return (
//     <View style={{ backgroundColor: "#5200FF", height: 900 }}>
//       <TouchableOpacity onPress={backToHome}>
//         <Image
//           source={Back}
//           style={{ marginLeft: 20, marginTop: 50, position: "absolute" , width: 30, height: 30 }}
//         />
//       </TouchableOpacity>
//       <Text
//         style={{ width: "48%", color: "white", marginLeft: 100, marginTop: 100 ,
//         fontSize: 40,
//         fontWeight: "bold",}}
//       >
//         Hello! I am Chatty
//       </Text>
//       <Image source={LangBg} style={{position: "absolute", width: 350, height: 400, marginTop:240 }} />
     

//       <TouchableOpacity style={{backgroundColor:"white", width:200, height:50,borderRadius:20 ,marginLeft:100, marginTop:450}} onPress={Start}>
//         <Text style={{color:"#5200FF", top:10, left:45, fontSize:18, fontWeight:"bold"}}>Start Chatting</Text>
//       </TouchableOpacity>

//     </View>

//   );
// };

// export default EmotionalAssistant;



import React, { useContext } from "react";
import { Text, View, TouchableOpacity, Image, StyleSheet } from "react-native";
import Back from "../../../assets/back.png";
import LangBg from "../../../assets/bgChatBot.png";
import { DarkModeContext } from "../../../components/DarkModeContext"; // Adjust the path as per your project structure

const EmotionalAssistant = ({ navigation,route }) => {
  const { isDarkMode } = useContext(DarkModeContext);
  const {username,userId}=route.params;

  const backToHome = () => {
    navigation.navigate("PsychologicalSection",{username,userId});
  };

  const startChatting = () => {
    navigation.navigate("Chatting",{username,userId});
  };

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? "#1A1A1A" : "#5200FF" }]}>
      <TouchableOpacity onPress={backToHome}>
        <Image source={Back} style={styles.backButton} />
      </TouchableOpacity>
      <Text style={[styles.title, { color: isDarkMode ? "#fff" : "#fff" }]}>
        Hello! I am Chatty
      </Text>
      <Image source={LangBg} style={styles.backgroundImage} />
      <TouchableOpacity
        style={[styles.startButton, { backgroundColor: isDarkMode ? "#fff" : "#fff" }]}
        onPress={startChatting}
      >
        <Text style={[styles.startButtonText, { color: isDarkMode ? "black" : "#5200FF" }]}>
          Start Chatting
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  backButton: {
    marginLeft: -170,
    marginTop: -60,
    position: "absolute",
    width: 30,
    height: 30,
  },
  title: {
    width: "48%",
    fontSize: 40,
    fontWeight: "bold",
    marginTop: -40,
    marginLeft: -20,
    color: "#fff",
  },
  backgroundImage: {
    position: "absolute",
    width: 350,
    height: 400,
    marginTop: 240,
  },
  startButton: {
    backgroundColor: "#fff",
    width: 200,
    height: 50,
    borderRadius: 20,
    marginLeft: 0,
    marginTop: 450,
    justifyContent: "center",
    alignItems: "center",
  },
  startButtonText: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default EmotionalAssistant;
