import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Home from "./screens/Home";
import Screen1 from "./screens/Screen1";
import Notifications from "./screens/Notifications";
import ProfileCustomization from "./screens/ProfileCustomization";
import Goal from "./screens/Goal";
import SplashScreen from "./screens/Splash";
import SignUp from "./screens/SignUp";
import SignIn from "./screens/SignIn";
import ProfileTest from "./screens/ProfileTest";
import ShowUserInfo from "./components/ShowUserInfo";
import Feedback from "./screens/FeedbackSection";
import Community from "./screens/Community";
import MyProfile from "./screens/MyProfile";
import PhysicalSection from "./screens/PhysicalSection/PhysicalSection.jsx";
import PsychologicalSection from "./screens/PsychologicalSection/PsychologicalSection.jsx";
import AuthenticationTester from "./screens/authenticationTester.jsx";
import FeedbackTester from "./screens/FeedbackTester.jsx";
import MusicBooster from "./screens/MusicBooster.jsx";
import Controls from "./components/Controls.jsx";
import TrackPlayer from "react-native-track-player";
export default function App() {
  const Stack = createNativeStackNavigator();
  TrackPlayer.registerPlaybackService(()=>require('./components/services.js'));

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="MusicBooster" headerMode="none">
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="SignIn"
          component={SignIn}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="UserInfo"
          component={ShowUserInfo}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Notifications"
          component={Notifications}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Screen2"
          component={Screen1}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Customize"
          component={ProfileCustomization}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="goal"
          component={Goal}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="profileTest"
          component={ProfileTest}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Feedback"
          component={Feedback}
          options={{
            headerShown: false,
          }}
        />
         <Stack.Screen
          name="FeedbackTester"
          component={FeedbackTester}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Community"
          component={Community}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="MyProfile"
          component={MyProfile}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="PhysicalSection"
          component={PhysicalSection}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="PsychologicalSection"
          component={PsychologicalSection}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="AuthenticationTester"
          component={AuthenticationTester}
          options={{
            headerShown: false,
          }}
        />
         <Stack.Screen
          name="MusicBooster"
          component={MusicBooster}
          options={{
            headerShown: false,
          }}
        />
         <Stack.Screen
          name="Controls"
          component={Controls}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
