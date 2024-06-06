import React, { useState, useEffect } from "react";
import { View, Image, TouchableOpacity, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as Google from "expo-auth-session/providers/google";
import AsyncStorage from "@react-native-async-storage/async-storage";


const AuthenticationProviders = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [accessToken, setAccessToken] = useState();
  const { navigate } = useNavigation();

  const [request, response, promptAsync] = Google.useAuthRequest({
    // androidClientId:
    //   "687357468385-n16hekphhcfnf5s91erhnenckhod4vht.apps.googleusercontent.com",
    webClientId:
      "401952058204-vb1ku0ok1u9m42fp9n9s612kp1ho7u0f.apps.googleusercontent.com",
  });

  useEffect(() => {
    if (response?.type === "success") {
      setAccessToken(response.authentication.accessToken);
      accessToken && fetchUserInfo();
    }
  }, [response, accessToken]);

  async function fetchUserInfo() {
    try {
      const response = await fetch(
        "https://www.googleapis.com/userinfo/v2/me",
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      const userInfo = await response.json();
      
      setUserInfo(userInfo);
      navigate("UserInfo", { userInfo });
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  }


  return (
    <View>
      {userInfo === null && (
        <TouchableOpacity disabled={!request} onPress={() => {promptAsync()}}>
          <Image
            source={require("../assets/google.png")}
            style={{ top: 650, left: 100, width: 50, height: 50 }}
          />
          <Text>{JSON.stringify(userInfo)}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default AuthenticationProviders;
