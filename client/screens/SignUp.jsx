import React, { useState, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  Pressable,
  TouchableOpacity,
  Alert,
} from "react-native";
import { KeyboardAvoidingView, Platform } from "react-native";
import { DarkModeContext } from "../components/DarkModeContext"; // Import the context

import axios from "axios";
import { Picker } from "@react-native-picker/picker";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Calendar from "../assets/calendar.png";
const SignUp = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState(null);
  const [gender, setGender] = useState("female");
  const [phoneNo, setPhoneNo] = useState("");
  const [emailError, setEmailError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [dateOfBirthError, setDateOfBirthError] = useState("");
  const [genderError, setGenderError] = useState("");
  const [phoneNoError, setPhoneNoError] = useState("");
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [usernameExists, setUsernameExists] = useState(false);
  const { isDarkMode } = useContext(DarkModeContext); // Use the context

  const showDatePicker = () => {
    setDatePickerVisible(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisible(false);
  };

  const handleConfirmDate = (selectedDate) => {
    hideDatePicker();
    if (selectedDate) {
      setDateOfBirth(selectedDate);
      setDateOfBirthError("");
    }
  };

  const validateForm = () => {
    let isValid = true;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phonePattern = /^\d{10}$/;

    if (!email.trim()) {
      setEmailError("Email is required");
      isValid = false;
    } else if (!emailPattern.test(email)) {
      setEmailError("Please enter a valid email address");
      isValid = false;
    } else {
      setEmailError("");
    }

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

    if (!dateOfBirth) {
      setDateOfBirthError("Date of Birth is required");
      isValid = false;
    } else if (new Date(dateOfBirth) > new Date()) {
      setDateOfBirthError("Date of Birth cannot be in the future");
      isValid = false;
    } else {
      setDateOfBirthError("");
    }

    if (!gender) {
      setGenderError("Please select a gender");
      isValid = false;
    } else {
      setGenderError("");
    }

    if (!phoneNo.trim()) {
      setPhoneNoError("Phone number is required");
      isValid = false;
    } else if (!phonePattern.test(phoneNo)) {
      setPhoneNoError("Please enter a valid 10-digit phone number");
      isValid = false;
    } else {
      setPhoneNoError("");
    }

    return isValid;
  };

  const handleSignUp = async () => {
    if (validateForm()) {
      // try {
      //   const response = await axios.post("http://10.0.0.21:3001/SignUp", {
      //     username,
      //     email,
      //     password,
      //     gender,
      //     dateOfBirth: dateOfBirth.toISOString(),
      //     phoneNo,
      //   });

      // if (response.status === 200) {
      navigation.navigate("Customize", {
        username,
        email,
        password,
        gender,
        phoneNo,
        dateOfBirth,
      });
      console.log(response.data);
      // } else {
      //   alert("Error: Failed to create account");
      // }

      // } catch (error) {
      //   if (

      //     error.response.data.error === "Username already exists"
      //   ) {
      //     setUsernameExists(true);
      //   } else if (error.response) {
      //     alert(`Error: ${error.response.data}`);
      //   } else if (error.request) {
      //     alert("Error: No response received from server");
      //   } else {
      //     alert(`Error: ${error.message}`);
      //   }
      // }
    } else {
      console.log(console.error);
    }
  };

  const goToSignIn = () => {
    navigation.navigate("SignIn");
  };
  const goToSignUp = () => {
    navigation.navigate("Splash");
  };

  const handleUsernameChange = (text) => {
    setUsername(text);
    setUsernameExists(false);
  };
  return (
    <KeyboardAvoidingView
      style={[
        styles.container,
        { backgroundColor: isDarkMode ? "black" : "#fff" },
      ]}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
    >
      <TouchableOpacity onPress={goToSignUp}>
        {isDarkMode ? (
          <Image
            style={styles.signUpChild}
            contentFit="cover"
            source={require("../assets/back.png")}
          />
        ) : (
          <Image
            style={styles.signUpChild}
            contentFit="cover"
            source={require("../assets/arrowBack.png")}
          />
        )}
      </TouchableOpacity>
      <Image
        style={styles.splashScreenRemovebgPreviewIcon}
        contentFit="cover"
        source={require("../assets/people-remover.png")}
      />
      <Text style={[styles.title, { color: isDarkMode ? "white" : "#032B79" }]}>
        Create Your Account
      </Text>

      <TextInput
        style={[
          styles.input,
          { backgroundColor: isDarkMode ? "#333" : "#EEEEEE" },{ color: isDarkMode ? "white" : "gray" },
        ]}
        placeholderTextColor={isDarkMode ? "#ccc" : "#000"}
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

      <TextInput
        style={[
          styles.input,
          { backgroundColor: isDarkMode ? "#333" : "#EEEEEE" },{ color: isDarkMode ? "white" : "gray" },
        ]}
        placeholderTextColor={isDarkMode ? "white" : "#000"}
        placeholder="Username"
        value={username}
        onChangeText={(text) => handleUsernameChange(text)}
      />
      {usernameError && <Text style={styles.errorText}>{usernameError}</Text>}
      {usernameExists && (
        <Text style={styles.errorText}>Username already exists</Text>
      )}

      <TextInput
        style={[
          styles.input,
          { backgroundColor: isDarkMode ? "#333" : "#EEEEEE" },{ color: isDarkMode ? "white" : "gray" },
        ]}
        placeholderTextColor={isDarkMode ? "#ccc" : "#000"}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      {passwordError ? (
        <Text style={styles.errorText}>{passwordError}</Text>
      ) : null}

      <Picker
        style={[
          styles.input,
          { backgroundColor: isDarkMode ? "#333" : "#EEEEEE" },{ color: isDarkMode ? "white" : "gray" },
        ]}
        placeholderTextColor={isDarkMode ? "#ccc" : "#000"}
        selectedValue={gender}
        onValueChange={(itemValue) => setGender(itemValue)}
      >
        <Picker.Item label="Male" value="male" />
        <Picker.Item label="Female" value="female" />
      </Picker>
      {genderError ? <Text style={styles.errorText}>{genderError}</Text> : null}

      <TextInput
        style={[
          styles.input,
          { backgroundColor: isDarkMode ? "#333" : "#EEEEEE" },{ color: isDarkMode ? "white" : "gray" },
        ]}
        placeholderTextColor={isDarkMode ? "#ccc" : "#000"}
        placeholder="Phone Number"
        keyboardType="numeric"
        value={phoneNo}
        onChangeText={(text) => setPhoneNo(text)}
      />
      {phoneNoError ? (
        <Text style={styles.errorText}>{phoneNoError}</Text>
      ) : null}

      <TouchableOpacity
        style={[
          styles.input,
          { backgroundColor: isDarkMode ? "#333" : "white" },
        ]}
        placeholderTextColor={isDarkMode ? "white" : "#000"}
        onPress={showDatePicker}
      >
        <Text style={[styles.datebith,{ backgroundColor: isDarkMode ? "#333" : "#EEEEEE" },{ color: isDarkMode ? "white" : "gray" },]}>
          {dateOfBirth ? (
            dateOfBirth.toDateString()
          ) : (
            <Image source={Calendar} style={[styles.Calendar]} />
          )}
        </Text>
      </TouchableOpacity>
      {dateOfBirth ? (
        <Text style={styles.errorText}>{dateOfBirthError}</Text>
      ) : null}

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        placeholder="date of birth"
        value={dateOfBirth}
        onConfirm={handleConfirmDate}
        onCancel={hideDatePicker}
        style={[{ backgroundColor: isDarkMode ? "#333" : "#EEEEEE" },{ color: isDarkMode ? "white" : "gray" }]}
      />

      <TouchableOpacity
        style={[
          styles.button,
          { backgroundColor: isDarkMode ? "#032b79" : "#719AEA" },
        ]}
        onPress={handleSignUp}
      >
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      <Text
        style={[styles.signInText, { color: isDarkMode ? "white" : "gray" }]}
      >
        {`Already have an account?`}
        <TouchableOpacity onPress={goToSignIn}>
          <Text
            style={[
              styles.signInText2,
              { color: isDarkMode ? "white" : "gray" },
            ]}
          >
            {" "}
            Sign In
          </Text>
        </TouchableOpacity>
      </Text>

      {isDarkMode ? (
        <Image
          style={[styles.ellipseIcon]}
          contentFit="cover"
          source={require("../assets/DarkEllipse.png")}
        />
      ) : (
        <Image
          style={[styles.ellipseIcon]}
          contentFit="cover"
          source={require("../assets/blueEllipse.png")}
        />
      )}

      {isDarkMode ? (
        <Image
          style={[styles.ellipseIcon2]}
          contentFit="cover"
          source={require("../assets/DarkEllipse.png")}
        />
      ) : (
        <Image
          style={[styles.ellipseIcon2]}
          contentFit="cover"
          source={require("../assets/blueEllipse.png")}
        />
      )}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  Calendar: {
    width: 30,
    height: 30,
    left: 200,
    position: "absolute",
  },
  ellipseIcon: {
    top: -50,
    left: 320,
    width: 150,
    height: 150,
    position: "absolute",
    borderRadius:200

  },
  ellipseIcon2: {
    top: 700,
    left: -70,
    width: 150,
    height: 150,
    position: "absolute",
    borderRadius:200
  },
  signUpChild: {
    top: -50,
    left: -150,

    height: 30,
    width: 30,
    position: "absolute",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    top: 50,
  },
  input: {
    width: "85%",
    top: 50,
    height: 40,
    backgroundColor: "#EEEEEE",
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  datebith:{
    width: "85%",
    height: 40,


  },
  button: {
    width: "85%",
    height: 40,
    backgroundColor: "#719AEA",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    marginTop: 50,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  errorText: {
    color: "red",
    // marginBottom: 5,
    marginLeft: 30,
    top: 50,
    alignSelf: "flex-start",
  },
  signInText: {
    marginTop: 20,
    top: 5,
  },
  signInText2: {
    textDecorationLine: "underline",
  },
  splashScreenRemovebgPreviewIcon: {
    top: 50,
    width: 200,
    height: 200,
    left: 100,
    position: "absolute",
  },
});

export default SignUp;
