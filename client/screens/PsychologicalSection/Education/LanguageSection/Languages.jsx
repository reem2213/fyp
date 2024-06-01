import React from "react";
import { Text, View, TouchableOpacity, Image } from "react-native";
import Back from "../../../../assets/back.png";
import LangBg from "../../../../assets/langBg.png";

const Language = ({ navigation }) => {
  const backToHome = () => {
    navigation.navigate("EduSection");

  };
  return (
    <View style={{ backgroundColor: "#F8EF14", height: 900 }}>
      <TouchableOpacity onPress={backToHome}>
        <Image
          source={Back}
          style={{ marginLeft: 20, marginTop: 50, position: "absolute" , width: 30, height: 30 }}
        />
      </TouchableOpacity>
      <Text
        style={{
          marginLeft: 60,
          marginTop: 90,
          color: "white",
          fontSize: 30,
          fontWeight: "bold",
          justifyContent: "center",
        }}
      >
        Language Learning Resources
      </Text>
      <Image source={LangBg} style={{ width: 390, height: 400 }} />
      <Text
        style={{ width: "80%", color: "white", marginLeft: 50, marginTop: -50 }}
      >
        Expand your horizons and enrich your mind by exploring our curated
        selection of language learning resources. Start your journey to fluency
        today!
      </Text>

      <TouchableOpacity style={{backgroundColor:"white", width:200, height:50,borderRadius:20 ,marginLeft:100, marginTop:50}}>
        <Text style={{color:"#E5DC08", top:10, left:30, fontSize:18, fontWeight:"bold"}}>Choose your app</Text>
      </TouchableOpacity>

    </View>

  );
};

export default Language;
