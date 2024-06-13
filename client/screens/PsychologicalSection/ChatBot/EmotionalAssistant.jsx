import React from "react";
import { Text, View, TouchableOpacity, Image } from "react-native";
import Back from "../../../assets/back.png";
import LangBg from "../../../assets/bgChatBot.png";

const EmotionalAssistant = ({ navigation }) => {
    const backToHome = () => {
        navigation.navigate("PsychologicalSection");
      };
      const Start = () => {
        navigation.navigate("Chatting");
      };
      
  return (
    <View style={{ backgroundColor: "#5200FF", height: 900 }}>
      <TouchableOpacity onPress={backToHome}>
        <Image
          source={Back}
          style={{ marginLeft: 20, marginTop: 50, position: "absolute" , width: 30, height: 30 }}
        />
      </TouchableOpacity>
      <Text
        style={{ width: "48%", color: "white", marginLeft: 100, marginTop: 100 ,
        fontSize: 40,
        fontWeight: "bold",}}
      >
        Hello! I am Chatty
      </Text>
      <Image source={LangBg} style={{position: "absolute", width: 350, height: 400, marginTop:240 }} />
     

      <TouchableOpacity style={{backgroundColor:"white", width:200, height:50,borderRadius:20 ,marginLeft:100, marginTop:450}} onPress={Start}>
        <Text style={{color:"#5200FF", top:10, left:45, fontSize:18, fontWeight:"bold"}}>Start Chatting</Text>
      </TouchableOpacity>

    </View>

  );
};

export default EmotionalAssistant;
