
import { View, Text, Image, Pressable } from "react-native";
import * as Google from "expo-auth-session/providers/google";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as WebBrowser from "expo-web-browser";
import { useEffect, useState } from "react";
import ShowUserInfo from "../components/ShowUserInfo";

const AuthenticationTester = () => {

  WebBrowser.maybeCompleteAuthSession();
  const [userInfo, setUserInfo] = useState(null);
  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId:
      "401952058204-26914hadiog7cql9v7f81nnnjih2l5tt.apps.googleusercontent.com",
    // iosClientId:
    //   "401952058204-2icuf068v4pccidni0mfej7gdn9k5lvr.apps.googleusercontent.com",
    // webClientId:
    //   "401952058204-vb1ku0ok1u9m42fp9n9s612kp1ho7u0f.apps.googleusercontent.com",
      scopes: ['profile', 'email'],
  });

  useEffect(() => {
    handleSignInWithGoole();
  }, [response]);
 

  async function handleSignInWithGoole() {
    const user = await AsyncStorage.getItem("@user");
    if (!user) {
      if (response?.type == "success") {
        await fetchUserInfo(response.authentication.accessToken);
      }
    } else {
      setUserInfo(JSON.parse(user));
    }
  }

  async function fetchUserInfo(token) {
    if (!token) return;
    try {
      const response = await fetch(
        "https://www.googleapis.com/userinfo/v2/me",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const user = await response.json();
      
      await AsyncStorage.setItem("@user", JSON.stringify(user));
      setUserInfo(user);
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  }
  return (
    <View style={{ marginLeft: 150, marginTop: 20 }}>
      <Text>{JSON.stringify(userInfo,null,2)}</Text>


      <Pressable onPress={()=>promptAsync()}>
        <Text style={{ marginLeft: 50, marginTop: 120 }}>sign in with google</Text>
      </Pressable>
      <Pressable onPress={() => AsyncStorage.removeItem("@user")}>
                <Text style={{ marginLeft: 50, marginTop: 150 }}>Logout</Text>
      </Pressable>

      

    </View>
  );
};

export default AuthenticationTester;
