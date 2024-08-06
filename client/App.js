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
import Community from "./screens/CommunitiesJoined.jsx";
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
import ChooseCategory from "./screens/PsychologicalSection/Education/QuizSection/ChooseCategory.jsx";
import ReviewScreen from "./screens/PsychologicalSection/Education/QuizSection/Reviews.jsx";
import Score from "./screens/PsychologicalSection/Education/QuizSection/Score.jsx";
import StartQuiz from "./screens/PsychologicalSection/Education/QuizSection/StartQuiz.jsx";
import Questions from "./screens/PsychologicalSection/Education/QuizSection/Questions.jsx";
import Chatting from "./screens/PsychologicalSection/ChatBot/ChatBot.jsx";
import ViewPdf from "./components/ViewPdf.jsx";
import MentorsAvailability from "./screens/PsychologicalSection/Mentors/MentorsAvailability.jsx";
import Settings from "./screens/Settings.jsx";
import { UserProvider } from "./components/userContext.jsx";
import PostScreen from "./screens/Post.jsx";
import CancelBookingScreen from "./screens/CancelBooking.jsx";
import { DarkModeProvider } from "./components/DarkModeContext";
import Gamification from "./screens/Gamification.jsx";
import ChatScreen from "./screens/PsychologicalSection/Community/Chat.jsx";
import EditProfile from "./screens/EditProfile.jsx";
import SplashScreenPhys from "./screens/PhysicalSection/Attributes/Splash.jsx";
import Gender from "./screens/PhysicalSection/Attributes/Gender.jsx";
import AgeScreen from "./screens/PhysicalSection/Attributes/Age.jsx";
import HeightScreen from "./screens/PhysicalSection/Attributes/Height.jsx";
import WeightScreen from "./screens/PhysicalSection/Attributes/Weight.jsx";
import ResultScreen from "./screens/PhysicalSection/Attributes/Result.jsx";
import PlaceScreen from "./screens/PhysicalSection/Attributes/Place.jsx";
import GoalScreen from "./screens/PhysicalSection/Attributes/Goal.jsx";
import ConditionScreen from "./screens/PhysicalSection/Attributes/Condition.jsx";
import FinalScreen from "./screens/PhysicalSection/Attributes/Final.jsx";
import PhysicalSectionHome from "./screens/PhysicalSection/Home.jsx";
import PlanScreen from "./screens/PhysicalSection/Plan.jsx";
import Shop from "./screens/PhysicalSection/Shop.jsx";
import PhysicalMentor from "./screens/PhysicalSection/Mentors/Mentor.jsx";
import PhysicalMentorAvailability from "./screens/PhysicalSection/Mentors/MentorAvailability.jsx";
export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <DarkModeProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="SignIn" headerMode="none">
          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="PhysicalHome"
            component={PhysicalSectionHome}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Plan"
            component={PlanScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Shop"
            component={Shop}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="PhysicalMentor"
            component={PhysicalMentor}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="PhysicalMentorAvailability"
            component={PhysicalMentorAvailability}
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
            name="Settings"
            component={Settings}
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
            name="Gamification"
            component={Gamification}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Post"
            component={PostScreen}
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
            name="Chat"
            component={ChatScreen}
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
            name="EditProfile"
            component={EditProfile}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="CancelBooking"
            component={CancelBookingScreen}
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
            name="MentorsAvailability"
            component={MentorsAvailability}
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

          <Stack.Screen
            name="QuizCategory"
            component={ChooseCategory}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Score"
            component={Score}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="StartQuiz"
            component={StartQuiz}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Review"
            component={ReviewScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Question"
            component={Questions}
            options={{
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="Chatting"
            component={Chatting}
            options={{
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="Pdf"
            component={ViewPdf}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="PhysicalSectionSplash"
            component={SplashScreenPhys}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="GenderScreen"
            component={Gender}
            options={{
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="AgeScreen"
            component={AgeScreen}
            options={{
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="WeightScreen"
            component={WeightScreen}
            options={{
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="HeightScreen"
            component={HeightScreen}
            options={{
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="GoalScreen"
            component={GoalScreen}
            options={{
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="ConditionScreen"
            component={ConditionScreen}
            options={{
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="PlaceScreen"
            component={PlaceScreen}
            options={{
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="FinalScreen"
            component={FinalScreen}
            options={{
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="ResultScreen"
            component={ResultScreen}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </DarkModeProvider>
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

