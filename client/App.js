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
import Communities from "./screens/PsychologicalSection/Community/Community.jsx";
import MyProfile from "./screens/MyProfile";
import PhysicalSection from "./screens/PhysicalSection/PhysicalSection.jsx";
import PsychologicalSection from "./screens/PsychologicalSection/PsychologicalSection.jsx";
import AuthenticationTester from "./screens/authenticationTester.jsx";
import FeedbackTester from "./screens/FeedbackTester.jsx";
import MusicBooster from "./screens/MusicBooster.jsx";
import EducationSection from "./screens/PsychologicalSection/Education/Home.jsx";
import ChatBot from "./screens/PsychologicalSection/ChatBot/EmotionalAssistant.jsx";
import Controls from "./components/Controls.jsx";
import MusicTester from "./screens/MusicTester.jsx";
import MusicTester2 from "./screens/MusicTester2.jsx";
import Mentors from "./screens/PsychologicalSection/Mentors/Mentors.jsx";
import Quiz from "./screens/PsychologicalSection/Education/QuizSection/Quiz.jsx";
import Library from "./screens/PsychologicalSection/Education/LibrarySection/Library.jsx";
import Language from "./screens/PsychologicalSection/Education/LanguageSection/Languages.jsx";
import Apps from "./screens/PsychologicalSection/Education/LanguageSection/apps.jsx";
import Books from "./screens/PsychologicalSection/Education/LibrarySection/Books.jsx";
import BookDetails from "./screens/PsychologicalSection/Education/LibrarySection/BookDetails.jsx";
export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="books" headerMode="none">
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
          name="MusicTester"
          component={MusicTester}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="MusicTester2"
          component={MusicTester2}
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
        <Stack.Screen
          name="Mentors"
          component={Mentors}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="EduSection"
          component={EducationSection}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="ChatBot"
          component={ChatBot}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Communities"
          component={Communities}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="Quiz"
          component={Quiz}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="Library"
          component={Library}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="Languages"
          component={Language}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="apps"
          component={Apps}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="books"
          component={Books}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="BookDetails"
          component={BookDetails}
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
