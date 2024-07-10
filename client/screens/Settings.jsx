import React, { useContext } from "react";
import { Text, View, Image, TouchableOpacity, Switch } from "react-native";
import Back from "../assets/arrowBack.png";
import { useNavigation } from "@react-navigation/native";
import { DarkModeContext } from "../components/DarkModeContext";

const Settings = ({ navigation }) => {
  const { isDarkMode, toggleDarkMode } = useContext(DarkModeContext);

  const BackToProfile = () => {
    navigation.navigate("MyProfile");
  };
  const goToMusic = () => {
    navigation.navigate("MusicTester2");
  };

  const Logout = () => {
    navigation.navigate("SignIn");
  };

  return (
    <View style={{ flex: 1, backgroundColor: isDarkMode ? "black" : "white" }}>
      <TouchableOpacity onPress={BackToProfile}>
        <Image
          source={Back}
          style={{
            width: 40,
            height: 40,
            top: 50,
            position: "absolute",
            left: 20,
          }}
        />
      </TouchableOpacity>
      <Text
        style={{
          color: isDarkMode ? "white" : "black",
          fontSize: 40,
          fontWeight: "bold",
          textAlign: "center",
          top: 40,
        }}
      >
        Settings
      </Text>
      <View style={{ gap: 50, top: 100, left: 50 }}>
        <TouchableOpacity onPress={goToMusic}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "500",
              color: isDarkMode ? "white" : "black",
            }}
          >
            Edit Profile
          </Text>
        </TouchableOpacity>

        <Text
          style={{
            fontSize: 20,
            fontWeight: "500",
            color: isDarkMode ? "white" : "black",
          }}
        >
          Reset Password
        </Text>
        <Text
          style={{
            fontSize: 20,
            fontWeight: "500",
            color: isDarkMode ? "white" : "black",
          }}
        >
          Change Language
        </Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "500",
              color: isDarkMode ? "white" : "black",
            }}
          >
            Dark Mode
          </Text>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={isDarkMode ? "#f5dd4b" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleDarkMode}
            value={isDarkMode}
            style={{ marginLeft: 10 }}
          />
        </View>
        <TouchableOpacity onPress={Logout}>
          <Text style={{ fontSize: 20, fontWeight: "500", color: "red" }}>
            Logout
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Settings;
