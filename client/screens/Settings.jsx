import React from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import Back from "../assets/arrowBack.png";
import { useNavigation } from "@react-navigation/native";

const Settings = ({navigation}) => {

    const BackToProfile=()=>{
        navigation.navigate("MyProfile")


    }
  return (
    <View >
        <TouchableOpacity onPress={BackToProfile}>
        <Image source={Back} style={{width:40,height:40,top:50,position:"absolute",left:20}} />
        </TouchableOpacity>
      <Text
        style={{
          color: "Black",
          fontSize: 40,
          fontWeight: "bold",
          textAlign: "center",
          top: 40,
        }}
      >
        Settings
      </Text>
      <View style={{ gap: 50, top: 100, left: 50 }}>
        <Text style={{ fontSize: 20, fontWeight: "500" }}>Edit Profile</Text>
        <Text style={{ fontSize: 20, fontWeight: "500" }}>Reset Password</Text>
        <Text style={{ fontSize: 20, fontWeight: "500" }}>Change Language</Text>
        <Text style={{ fontSize: 20, fontWeight: "500" }}>Dark Mode</Text>
        <Text style={{ fontSize: 20, fontWeight: "500", color: "red" }}>
          Logout
        </Text>
      </View>
    </View>
  );
};

export default Settings;


