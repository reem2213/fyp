import React from "react";
import { Text, View, TouchableOpacity, Image } from "react-native";
import Back from "../../../../assets/back.png";
import LangBg from "../../../../assets/quizSection.png";

const Quiz = ({ navigation }) => {
    const backToHome = () => {
        navigation.navigate("EduSection");
      };
      
  return (
    <View style={{ backgroundColor: "#FF6B00", height: 900 }}>
      <TouchableOpacity onPress={backToHome}>
        <Image
          source={Back}
          style={{ marginLeft: 20, marginTop: 50, position: "absolute" , width: 30, height: 30 }}
        />
      </TouchableOpacity>
      
      <Image source={LangBg} style={{position: "absolute", width: 390, height: 400, marginTop:100 }} />
      <Text
        style={{ width: "90%", color: "white", marginLeft: 50, marginTop: 400 ,
        fontSize: 25,
        fontWeight: "bold",}}
      >
        Test your knowledge and challenge your mind with our interactive quizzes
      </Text>

      <TouchableOpacity style={{backgroundColor:"white", width:200, height:50,borderRadius:20 ,marginLeft:100, marginTop:50}}>
        <Text style={{color:"#FF6B00", top:10, left:50, fontSize:18, fontWeight:"bold"}}>Let's Start</Text>
      </TouchableOpacity>

    </View>

  );
};

export default Quiz;
