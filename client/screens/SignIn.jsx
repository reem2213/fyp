import React, { useState, useEffect,useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  Pressable,
  Alert,
  TouchableOpacity,
  Button,
  Switch,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FontFamily, Color, Border, FontSize } from "../GlobalStyles";
import AuthenticationProviders from "../components/authProviders";
import AuthenticationTester from "./authenticationTester";
import { DarkModeContext } from "../components/DarkModeContext"; // Import the context

const SignIn = ({ navigation, route }) => {
  const { isDarkMode } =  useContext(DarkModeContext); // Get dark mode state from route params
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState("");

  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const validateForm = () => {
    let isValid = true;

    if (!username.trim()) {
      setUsernameError("Username is required");
      isValid = false;
    } else {
      setUsernameError("");
    }

    if (!password.trim()) {
      setPasswordError("Password is required");
      isValid = false;
    } else {
      setPasswordError("");
    }

    return isValid;
  };

  const handleSignUp = async () => {
    if (validateForm()) {
      try {
        const response = await axios.post("http://10.0.0.21:3001/SignIn", {
          username,
          password,
        });
        if (response.data.status === "Success") {
          const userId = response.data.userId; // Get user ID from response

          const welcomeMessage = `Welcome back, ${username}!`;
          const newNotification = { message: welcomeMessage, time: new Date() };

          try {
            const storedNotifications = await AsyncStorage.getItem('Notifications');
            console.log('Stored Notifications:', storedNotifications); // Debugging line
            let notifications = storedNotifications ? JSON.parse(storedNotifications) : [];
            if (!Array.isArray(notifications)) {
              notifications = [];
            }
            notifications.push(newNotification);
            await AsyncStorage.setItem('Notifications', JSON.stringify(notifications));
            console.log('New Notifications:', notifications); // Debugging line
            navigation.navigate("Home", { username, bio,userId });
          } catch (error) {
            console.error("Failed to save notification:", error);
          }
        }
        console.log(response.data);
      } catch (error) {
        alert(error.message);
      }
    }
  };

  const goToSignUp = () => {
    navigation.navigate("SignUp");
  };

  return (
    <View style={[styles.signUp, isDarkMode ? styles.darkMode : styles.lightMode]}>
      <Image
        style={styles.splashScreenRemovebgPreviewIcon}
        contentFit="cover"
        source={require("../assets/people-remover.png")}
      />

      <Pressable onPress={goToSignUp}>
        <Image
          style={styles.signUpChild}
          contentFit="cover"
          source={require("../assets/arrowBack.png")}
        />
      </Pressable>

      <Text style={[styles.createYourAccount, styles.signUp1Typo]}>
        Welcome Back!
      </Text>

      <View style={styles.signUpChild2} />

      <TextInput
        style={[
          styles.input,
          styles.username,
          styles.phoneNoClr,
          styles.signUpInner,
          styles.signLayout,
          usernameError && styles.inputError,
          isDarkMode ? styles.darkInput : styles.lightInput,
        ]}
        placeholder="Username"
        placeholderTextColor={isDarkMode ? "#ccc" : "#000"}
        underlineColorAndroid="transparent"
        value={username}
        onChangeText={(text) => setUsername(text)}
      />
      {usernameError ? (
        <Text style={[styles.errorText, styles.errorTextUsername]}>
          Username is required
        </Text>
      ) : null}

      <TextInput
        style={[
          styles.input,
          styles.password,
          styles.phoneNoClr,
          styles.rectangleView,
          styles.signLayout,
          passwordError && styles.inputError,
          isDarkMode ? styles.darkInput : styles.lightInput,
        ]}
        placeholder="Password"
        placeholderTextColor={isDarkMode ? "#ccc" : "#000"}
        secureTextEntry={true}
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      {passwordError && (
        <Text style={[styles.errorText, styles.errorTextPassword]}>
          Password is required
        </Text>
      )}

      <Text style={[styles.orSignIn, styles.orSignInLayout]}>
        OR SIGN IN WITH
      </Text>
      <Pressable
        onPress={handleSignUp}
        style={[styles.signUp1, styles.signUp1Position]}
      >
        <Text style={styles.signUpWord}>Sign In</Text>
      </Pressable>

      <Text style={[styles.alreadyHaveAnContainer, styles.orSignInLayout]}>
        {`Already Have An Account?`}
        <Text style={styles.signIn} onPress={goToSignUp}>
          Sign Up
        </Text>
      </Text>
      <View style={styles.containerrrr}></View>
      <AuthenticationTester />

      <Image
        style={[styles.ellipseIcon]}
        contentFit="cover"
        source={require("../assets/blueEllipse.png")}
      />
      <Image
        style={[styles.ellipseIcon2]}
        contentFit="cover"
        source={require("../assets/blueEllipse.png")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  signUp1Typo: {
    textAlign: "left",
    fontFamily: FontFamily.arial,
    fontWeight: "700",
  },
  signLayout: {
    height: 42,
    width: 290,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "transparent",
    left: 52,
    position: "absolute",
  },
  signChildLayout: {
    width: 150,
    top: 430,
    height: 42,
    backgroundColor: Color.colorWhitesmoke_100,
    borderRadius: Border.br_mini,
    position: "absolute",
  },
  ellipseIcon: {
    top: -100,
    left: 320,
    width: 150,
    height: 150,
  },
  ellipseIcon2: {
    top: 500,
    left: -70,
    width: 150,
    height: 150,
  },
  ellipseIconLayout: {
    height: 200,
    width: 200,
    position: "absolute",
  },
  orSignInLayout: {
    lineHeight: 16,
    textAlign: "left",
    position: "absolute",
  },
  signUp1Position: {
    left: 171,
    position: "absolute",
  },
  signUpWord: {
    color: "white",
    fontSize: 18,
    marginTop: -93,
  },
  textTypo: {
    lineHeight: 27,
    fontSize: FontSize.size_xl,
    color: Color.colorGray_100,
    textAlign: "left",
    fontFamily: FontFamily.arial,
    position: "absolute",
  },
  icons8Facebook501Position: {
    width: 50,
    top: 639,
    position: "absolute",
  },

  splashScreenRemovebgPreviewIcon: {
    top: 70,
    width: 250,
    height: 250,
    left: 70,
    position: "absolute",
  },
  signUpChild: {
    top: 90,
    left: 50,
    height: 30,
    width: 30,
  },
  inputError: {
    borderColor: "red",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginBottom: 15,
    textAlign: "center",
  },
  errorTextUsername: {
    position: "absolute",
    top: 287,
    left: 52,
  },
  errorTextPassword: {
    position: "absolute",
    top: 422,
    left: 52,
  },
  createYourAccount: {
    top: 240,
    left: 60,
    fontSize: 40,
    color: "#032b79",
    position: "absolute",
  },
  signUpInner: {
    top: 317,
  },
  rectangleView: {
    top: 373,
  },
  signUpChild2: {
    top: 458,
    backgroundColor: Color.colorCornflowerblue,
    height: 46,
    width: 295,
    borderRadius: 25,
    left: 52,
    position: "absolute",
  },
  username: {
    top: 330,
    lineHeight: 20,
    color: Color.colorGray_100,
    fontSize: FontSize.size_mini,
    textAlign: "left",
    position: "absolute",
    left: 73,
    borderColor: "#939191",
  },
  orSignIn: {
    top: 525,
    left: 145,
    fontSize: 15,
    color: Color.colorGray_100,
    fontFamily: FontFamily.arial,
    fontWeight: "700",
  },
  signUp1: {
    top: 559,
    fontSize: 18,
    color: Color.colorWhite,
    textAlign: "left",
    fontFamily: FontFamily.arial,
    fontWeight: "700",
  },
  alreadyHaveAnContainer: {
    top: 620,
    left: 71,
    letterSpacing: 0.8,
    fontWeight: "600",
    fontFamily: FontFamily.interSemiBold,
    color: Color.colorGray_200,
    fontSize: FontSize.size_mini,
    lineHeight: 16,
  },
  signUp: {
    backgroundColor: Color.colorWhite,
    width: 430,
    height: 932,
    overflow: "hidden",
  },
  darkMode: {
    backgroundColor: "#121212",
  },
  lightMode: {
    backgroundColor: Color.colorWhite,
  },
  darkInput: {
    backgroundColor: "#333",
    color: "#fff",
    borderColor: "#444",
    padding:10
  },
  lightInput: {
    backgroundColor: Color.colorWhitesmoke_100,
    color: Color.colorGray_100,
    padding:10

  },
  containerrrr: {
    backgroundColor: "#719AEA",
    width: "50%",
    height: 50,
    marginLeft: 100,
    top: 520,
    borderRadius: 20,
  },
});

export default SignIn;




// import React from 'react';
// import { Text, View } from 'react-native';
// import { useTranslation } from 'react-i18next';
// import './i18n'; // Import the i18n configuration

// const App = () => {
//   const { t, i18n } = useTranslation();

//   const changeLanguage = (lng) => {
//     i18n.changeLanguage(lng);
//   };

//   return (
//     <View>
//       <Text>{t('welcome')}</Text>
//       <Button title="Switch to French" onPress={() => changeLanguage('fr')} />
//     </View>
//   );
// };

// export default App;






// import React, { useState, useContext } from "react";
// import {
//   StyleSheet,
//   Text,
//   View,
//   TextInput,
//   Image,
//   Pressable,
//   Alert,
// } from "react-native";
// import axios from "axios";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { FontFamily, Color, Border, FontSize } from "../GlobalStyles";
// import { DarkModeContext } from "../components/DarkModeContext"; // Import the context

// const SignIn = ({ navigation }) => {
//   const { isDarkMode } = useContext(DarkModeContext); // Get dark mode state from route params
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");

//   const [usernameError, setUsernameError] = useState("");
//   const [passwordError, setPasswordError] = useState("");

//   const validateForm = () => {
//     let isValid = true;

//     if (!username.trim()) {
//       setUsernameError("Username is required");
//       isValid = false;
//     } else {
//       setUsernameError("");
//     }

//     if (!password.trim()) {
//       setPasswordError("Password is required");
//       isValid = false;
//     } else {
//       setPasswordError("");
//     }

//     return isValid;
//   };

//   const handleSignUp = async () => {
//     if (validateForm()) {
//       try {
//         const response = await axios.post("http://10.0.0.21:3001/SignIn", {
//           username,
//           password,
//         });
//         if (response.data === "Successss") {
//           const welcomeMessage = `Welcome back, ${username}!`;
//           const newNotification = { message: welcomeMessage, time: new Date() };

//           try {
//             const storedNotifications = await AsyncStorage.getItem("Notifications");
//             console.log("Stored Notifications:", storedNotifications); // Debugging line
//             let notifications = storedNotifications ? JSON.parse(storedNotifications) : [];
//             if (!Array.isArray(notifications)) {
//               notifications = [];
//             }
//             notifications.push(newNotification);
//             await AsyncStorage.setItem("Notifications", JSON.stringify(notifications));
//             console.log("New Notifications:", notifications); // Debugging line
//             navigation.navigate("Home", { username });
//           } catch (error) {
//             console.error("Failed to save notification:", error);
//           }
//         }
//         console.log(response.data);
//       } catch (error) {
//         alert(error.message);
//       }
//     }
//   };

//   const goToSignUp = () => {
//     navigation.navigate("SignUp");
//   };

//   return (
//     <View style={[styles.signUp, isDarkMode ? styles.darkMode : styles.lightMode]}>
//       <Image
//         style={styles.splashScreenRemovebgPreviewIcon}
//         contentFit="cover"
//         source={require("../assets/people-remover.png")}
//       />

//       <Pressable onPress={goToSignUp}>
//         <Image
//           style={styles.signUpChild}
//           contentFit="cover"
//           source={require("../assets/arrowBack.png")}
//         />
//       </Pressable>

//       <Text style={[styles.createYourAccount, styles.signUp1Typo]}>
//         Welcome Back!
//       </Text>

//       <View style={styles.signUpChild2} />

//       <TextInput
//         style={[
//           styles.input,
//           styles.username,
//           styles.phoneNoClr,
//           styles.signUpInner,
//           styles.signLayout,
//           usernameError && styles.inputError,
//           isDarkMode ? styles.darkInput : styles.lightInput,
//         ]}
//         placeholder="Username"
//         placeholderTextColor={isDarkMode ? "#ccc" : "#000"}
//         underlineColorAndroid="transparent"
//         value={username}
//         onChangeText={(text) => setUsername(text)}
//       />
//       {usernameError ? (
//         <Text style={[styles.errorText, styles.errorTextUsername]}>
//           Username is required
//         </Text>
//       ) : null}

//       <TextInput
//         style={[
//           styles.input,
//           styles.password,
//           styles.phoneNoClr,
//           styles.rectangleView,
//           styles.signLayout,
//           passwordError && styles.inputError,
//           isDarkMode ? styles.darkInput : styles.lightInput,
//         ]}
//         placeholder="Password"
//         placeholderTextColor={isDarkMode ? "#ccc" : "#000"}
//         secureTextEntry={true}
//         value={password}
//         onChangeText={(text) => setPassword(text)}
//       />
//       {passwordError && (
//         <Text style={[styles.errorText, styles.errorTextPassword]}>
//           Password is required
//         </Text>
//       )}

//       <Pressable
//         onPress={handleSignUp}
//         style={[styles.signUp1, styles.signUp1Position]}
//       >
//         <Text style={styles.signUpWord}>Sign In</Text>
//       </Pressable>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   signUp1Typo: {
//     textAlign: "left",
//     fontFamily: FontFamily.arial,
//     fontWeight: "700",
//   },
//   signLayout: {
//     height: 42,
//     width: 290,
//     borderRadius: 10,
//     borderWidth: 1,
//     borderColor: "transparent",
//     left: 52,
//     position: "absolute",
//   },
//   signChildLayout: {
//     width: 150,
//     top: 430,
//     height: 42,
//     backgroundColor: Color.colorWhitesmoke_100,
//     borderRadius: Border.br_mini,
//     position: "absolute",
//   },
//   ellipseIcon: {
//     top: -100,
//     left: 320,
//     width: 150,
//     height: 150,
//   },
//   ellipseIcon2: {
//     top: 450,
//     left: -70,
//     width: 150,
//     height: 150,
//   },
//   ellipseIconLayout: {
//     height: 200,
//     width: 200,
//     position: "absolute",
//   },
//   signUp1Position: {
//     left: 171,
//     position: "absolute",
//   },
//   signUpWord: {
//     color: "white",
//     fontSize: 18,
//     marginTop: -93,
//   },
//   textTypo: {
//     lineHeight: 27,
//     fontSize: FontSize.size_xl,
//     color: Color.colorGray_100,
//     textAlign: "left",
//     fontFamily: FontFamily.arial,
//     position: "absolute",
//   },
//   splashScreenRemovebgPreviewIcon: {
//     top: 70,
//     width: 250,
//     height: 250,
//     left: 70,
//     position: "absolute",
//   },
//   signUpChild: {
//     top: 90,
//     left: 50,
//     height: 30,
//     width: 30,
//   },
//   inputError: {
//     borderColor: "red",
//   },
//   errorText: {
//     color: "red",
//     fontSize: 12,
//     marginBottom: 15,
//     textAlign: "center",
//   },
//   errorTextUsername: {
//     position: "absolute",
//     top: 287,
//     left: 52,
//   },
//   errorTextPassword: {
//     position: "absolute",
//     top: 422,
//     left: 52,
//   },
//   createYourAccount: {
//     top: 240,
//     left: 60,
//     fontSize: 40,
//     color: "#032b79",
//     position: "absolute",
//   },
//   signUpInner: {
//     top: 317,
//   },
//   rectangleView: {
//     top: 373,
//   },
//   signUpChild2: {
//     top: 458,
//     backgroundColor: Color.colorCornflowerblue,
//     height: 46,
//     width: 295,
//     borderRadius: 25,
//     left: 52,
//     position: "absolute",
//   },
//   username: {
//     top: 330,
//     lineHeight: 20,
//     color: Color.colorGray_100,
//     fontSize: FontSize.size_mini,
//     textAlign: "left",
//     position: "absolute",
//     left: 73,
//     borderColor: "#939191",
//   },
//   signUp1: {
//     top: 559,
//     fontSize: 18,
//     color: Color.colorWhite,
//     textAlign: "left",
//     fontFamily: FontFamily.arial,
//     fontWeight: "700",
//   },
//   signUp: {
//     backgroundColor: Color.colorWhite,
//     width: 430,
//     height: 932,
//     overflow: "hidden",
//   },
//   darkMode: {
//     backgroundColor: "#121212",
//   },
//   lightMode: {
//     backgroundColor: Color.colorWhite,
//   },
//   darkInput: {
//     backgroundColor: "#333",
//     color: "#fff",
//     borderColor: "#444",
//     padding: 10,
//   },
//   lightInput: {
//     backgroundColor: Color.colorWhitesmoke_100,
//     color: Color.colorGray_100,
//     padding: 10,
//   },
// });

// export default SignIn;
