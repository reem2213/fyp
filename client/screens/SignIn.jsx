import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Picker,
  Image,
  Platform,
  Pressable,
  Alert,
  TouchableOpacity,
  Button,
} from "react-native";
import axios from "axios";
import { FontFamily, Color, Border, FontSize } from "../GlobalStyles";
import AuthenticationProviders from "../components/authProviders";
import AuthenticationTester from "./authenticationTester";
const SignUp = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

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
        const response = await axios.post("http://172.16.165.205:3001/SignIn", {
          username: username,
          password: password,
        });
        if (response.data === "Successss") {
          navigation.navigate("Home");
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

  const back = () => {
    navigation.navigate("SplashScreen");
  };

  return (
    <View style={styles.signUp}>
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
        ]}
        placeholder="Username"
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
        ]}
        
        placeholder="Password"
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
      <AuthenticationTester/>

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
    backgroundColor: Color.colorWhitesmoke_100,
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
    top: 450,
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
  signUpItem: {
    top: 260,
  },
  signUpInner: {
    top: 317,
  },
  rectangleView: {
    top: 373,
  },
  signUpChild1: {
    top: 487,
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
  signUpChild3: {
    left: 52,
    width: 150,
    top: 430,
  },
  signUpChild4: {
    left: 227,
  },
  enterYouEmail: {
    top: 273,
    lineHeight: 20,
    color: Color.colorGray_100,
    fontSize: FontSize.size_mini,
    textAlign: "left",
    position: "absolute",
    left: 73,
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
  text: {
    top: 495,
    width: 4,
    height: 20,
    left: 105,
  },
  text1: {
    top: 497,
    left: 80,
  },
  googleIconPngRemovebgPrevi: {
    left: 156,
    height: 54,
  },
  icons8Facebook501: {
    left: 206,
    height: 50,
  },
  signIn: {
    textDecorationLine: "underline",
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

  signUpChild5: {
    top: 786,
    left: -79,
  },
  signUp: {
    backgroundColor: Color.colorWhite,
    width: 430,
    height: 932,
    overflow: "hidden",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  logo: {
    width: 204,
    height: 180,
    marginBottom: 20,
  },
  input: {
    width: 200,
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  inputError: {
    borderColor: "red",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginBottom: 5,
  },
  button: {
    backgroundColor: "blue",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  containerrrr:{
    backgroundColor:"#719AEA",
    width:"50%",
    height:50,
    marginLeft:100,
  top:520,
  borderRadius:20
  }
});

export default SignUp;
