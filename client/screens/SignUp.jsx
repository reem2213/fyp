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
  const [countryCode, setCountryCode] = useState("+961"); // Add a state for the country code

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
    // const phonePattern = /^\d{10}$/;

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

    // if (!phoneNo.trim()) {
    //   setPhoneNoError("Phone number is required");
    //   isValid = false;
    // } else if (!phonePattern.test(phoneNo)) {
    //   setPhoneNoError("Please enter a valid 10-digit phone number");
    //   isValid = false;
    // } else {
    //   setPhoneNoError("");
    // }
    const phonePattern = /^\d{8,14}$/; // Modify to allow a range of digits for different countries

    if (!phoneNo.trim()) {
      setPhoneNoError("Phone number is required");
      isValid = false;
    } else if (!phonePattern.test(phoneNo)) {
      setPhoneNoError("Please enter a valid phone number");
      isValid = false;
    } else {
      setPhoneNoError("");
    }

    return isValid;
  };

  const handleSignUp = async () => {
    if (validateForm()) {
      const fullPhoneNumber = countryCode + phoneNo;
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


  const handleCountryCodeChange = (code) => {
    setCountryCode(code); // Set only the code part in state
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
        placeholderTextColor={isDarkMode ? "#ccc" : "gray"}
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
        placeholderTextColor={isDarkMode ? "white" : "gray"}
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
        placeholderTextColor={isDarkMode ? "#ccc" : "gray"}
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





      <View style={styles.phoneContainer}>
        <Picker
          selectedValue={countryCode}
          style={styles.countryCodePicker}
          onValueChange={(itemValue) => handleCountryCodeChange(itemValue)}
        >
          <Picker.Item label="Lebanon (+961)" value="+961" />
  <Picker.Item label="USA (+1)" value="+1" />
  <Picker.Item label="UK (+44)" value="+44" />
  <Picker.Item label="Germany (+49)" value="+49" />
  <Picker.Item label="France (+33)" value="+33" />
  <Picker.Item label="UAE (+971)" value="+971" />
  <Picker.Item label="Canada (+1)" value="+1" />
  <Picker.Item label="Australia (+61)" value="+61" />
  <Picker.Item label="India (+91)" value="+91" />
  <Picker.Item label="China (+86)" value="+86" />
  <Picker.Item label="Japan (+81)" value="+81" />
  <Picker.Item label="South Korea (+82)" value="+82" />
  <Picker.Item label="Brazil (+55)" value="+55" />
  <Picker.Item label="Mexico (+52)" value="+52" />
  <Picker.Item label="Italy (+39)" value="+39" />
  <Picker.Item label="Spain (+34)" value="+34" />
  <Picker.Item label="Russia (+7)" value="+7" />
  <Picker.Item label="South Africa (+27)" value="+27" />
  <Picker.Item label="Egypt (+20)" value="+20" />
  <Picker.Item label="Saudi Arabia (+966)" value="+966" />
  <Picker.Item label="Argentina (+54)" value="+54" />
  <Picker.Item label="Nigeria (+234)" value="+234" />
  <Picker.Item label="Turkey (+90)" value="+90" />
  <Picker.Item label="Sweden (+46)" value="+46" />
  <Picker.Item label="Norway (+47)" value="+47" />
  <Picker.Item label="Denmark (+45)" value="+45" />
  <Picker.Item label="Finland (+358)" value="+358" />
  <Picker.Item label="Netherlands (+31)" value="+31" />
  <Picker.Item label="Belgium (+32)" value="+32" />
  <Picker.Item label="Switzerland (+41)" value="+41" />
  <Picker.Item label="Austria (+43)" value="+43" />
  <Picker.Item label="Portugal (+351)" value="+351" />
  <Picker.Item label="Greece (+30)" value="+30" />
  <Picker.Item label="Poland (+48)" value="+48" />
  <Picker.Item label="Ukraine (+380)" value="+380" />
  <Picker.Item label="Czech Republic (+420)" value="+420" />
  <Picker.Item label="Hungary (+36)" value="+36" />
  <Picker.Item label="Romania (+40)" value="+40" />
  <Picker.Item label="Malaysia (+60)" value="+60" />
  <Picker.Item label="Philippines (+63)" value="+63" />
  <Picker.Item label="Thailand (+66)" value="+66" />
  <Picker.Item label="Vietnam (+84)" value="+84" />
  <Picker.Item label="Indonesia (+62)" value="+62" />
  <Picker.Item label="Pakistan (+92)" value="+92" />
  <Picker.Item label="Bangladesh (+880)" value="+880" />
  <Picker.Item label="New Zealand (+64)" value="+64" />
  <Picker.Item label="Singapore (+65)" value="+65" />
  <Picker.Item label="Hong Kong (+852)" value="+852" />
  <Picker.Item label="Taiwan (+886)" value="+886" />
  <Picker.Item label="Iran (+98)" value="+98" />
  <Picker.Item label="Iraq (+964)" value="+964" />
  <Picker.Item label="Syria (+963)" value="+963" />
  <Picker.Item label="Jordan (+962)" value="+962" />
  <Picker.Item label="Morocco (+212)" value="+212" />
  <Picker.Item label="Algeria (+213)" value="+213" />
  <Picker.Item label="Tunisia (+216)" value="+216" />
        </Picker>

        <TextInput
          style={[
            styles.phoneInput,
            { backgroundColor: isDarkMode ? "#333" : "#EEEEEE", color: isDarkMode ? "white" : "gray" },
          ]}
          placeholderTextColor={isDarkMode ? "#ccc" : "gray"}
          placeholder="Phone Number"
          keyboardType="numeric"
          value={`${countryCode}${phoneNo}`} // Show the country code as a prefix in the input
          onChangeText={(text) => setPhoneNo(text.replace(countryCode, ""))}
        />
      </View>
      {phoneNoError ? <Text style={styles.errorText}>{phoneNoError}</Text> : null}
      {/* <TextInput
        style={[
          styles.input,
          { backgroundColor: isDarkMode ? "#333" : "#EEEEEE" },{ color: isDarkMode ? "white" : "gray" },
        ]}
        placeholderTextColor={isDarkMode ? "#ccc" : "gray"}
        placeholder="Phone Number"
        keyboardType="numeric"
        value={phoneNo}
        onChangeText={(text) => setPhoneNo(text)}
      />
      {phoneNoError ? (
        <Text style={styles.errorText}>{phoneNoError}</Text>
      ) : null} */}

      <TouchableOpacity
        style={[
          styles.input,
          { backgroundColor: isDarkMode ? "#333" : "white" },
        ]}
        placeholderTextColor={isDarkMode ? "white" : "gray"}
        onPress={showDatePicker}
      >
        <Text style={[styles.datebith,{ backgroundColor: isDarkMode ? "#333" : "#EEEEEE" },{ color: isDarkMode ? "white" : "gray" },]}>
          {dateOfBirth ? (
            dateOfBirth.toDateString()
          ) : (
            <Text>Date Of Birth</Text>
          )}
        </Text>
        <Image source={Calendar} style={styles.Calendar} />


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
    left: 270,
    top:5,
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
    width: 315,
    height: 40,
    borderRadius: 10,
    right:10,
    paddingTop:7,
    paddingLeft:10





    

  },



  phoneContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "85%",
    marginBottom: 10,
    top:50
  },
  countryCodePicker: {
    width: 90,
    height: 40,
    backgroundColor: "#EEEEEE",
    borderRadius: 10,
    fontSize:10
  },
  phoneInput: {
    width: "68%",
    height: 40,
    backgroundColor: "#EEEEEE",
    borderRadius: 10,
    paddingHorizontal: 10,
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
    marginBottom: 5,
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
