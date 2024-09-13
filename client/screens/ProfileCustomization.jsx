import React, { useEffect, useState, useContext } from "react";
import {

  StyleSheet,
  View,
  Image,
  Text,
  TextInput,
  Pressable,
  TouchableOpacity,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import User from "../assets/user.png";
import BlueEllipse from "../assets/blueEllipse.png";
import GrayEllipse from "../assets/DarkEllipse.png";
import People from "../assets/people-remover.png";
import Camera from "../assets/camera.png";
import axios from "axios";
import { Asset } from 'expo-asset';

import { DarkModeContext } from "../components/DarkModeContext"; 

const imgDir = FileSystem.documentDirectory + "/images";

const ProfileCustomization = ({ navigation, route }) => {
  const [imageUri, setImageUri] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [bioError, setBioError] = useState("");
  const { isDarkMode } = useContext(DarkModeContext); 

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState(null);
  const [gender, setGender] = useState("female");
  const [phoneNo, setPhoneNo] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [dateOfBirthError, setDateOfBirthError] = useState("");
  const [genderError, setGenderError] = useState("");
  const [phoneNoError, setPhoneNoError] = useState("");
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [usernameExists, setUsernameExists] = useState(false);



  useEffect(() => {
    if (route.params && route.params.username && route.params.email) {
      setUsername(route.params.username);
      setEmail(route.params.email);
      setDateOfBirth(route.params.dateOfBirth);
      setGender(route.params.gender);
      setPassword(route.params.password);
      setPhoneNo(route.params.phoneNo);
    }
  }, [route.params]);

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
    if (!bio.trim()) {
      setBioError("Bio is required");
      isValid = false;
    } else {
      setBioError("");
    }

    return isValid;
  };


  
 
  const ensureDirExists = async () => {
    const dirInfo = await FileSystem.getInfoAsync(imgDir);

    if (!dirInfo.exists) {
      await FileSystem.makeDirectoryAsync(imgDir, { intermediates: true });
    }
  };

  useEffect(() => {
    ensureDirExists();
  }, []);

  
  // const handleSignUp = async () => {
  //   if (validateForm()) {
  //     let imageToUpload = imageUri;

  //     if (!imageUri) {
  //       // Load the default image asset
  //       const asset = Asset.fromModule(User);
  //       await asset.downloadAsync(); // Ensure the image is available locally
  //       const defaultImageUri = asset.localUri || asset.uri;
        
  //       // Convert the default image to Base64
  //       const base64Image = await FileSystem.readAsStringAsync(defaultImageUri, {
  //         encoding: FileSystem.EncodingType.Base64,
  //       });
        
  //       imageToUpload = `${base64Image}`;
  //     }
  //     try {
  //       const response = await axios.post("http://10.0.0.21:3001/SignUp", {
  //         username,
  //         email,
  //         password,
  //         gender,
  //         dateOfBirth,
  //         phoneNo,
  //         bio,
  //         image: imageToUpload, // Send the base64 encoded image
  //       });
  
  //       if (response.status === 200) {
  //         const userId = response.data.user._id; // Extract the _id from the response
  //         console.log("SignUp success:", response.data);
  //         console.log("UserId:", userId); // Log to confirm it's extracted correctly
  //         navigation.navigate("Home", { username, bio, imageUri, userId:  response.data.user._id }); // Pass userId to Home
  //       } else {
  //         console.error("SignUp error: Unexpected status code", response.status);
  //         alert("Error: Failed to create account");
  //       }
  //     } catch (error) {

  //       console.error("SignUp error:", error);
  //       if (error.response) {
  //         alert(`Error: ${error.response.data.error}`);
  //       } else {
  //         alert("Error: No response received from server");
  //       }
  //     }
  //   }
  // };
  const handleSignUp = async () => {
    if (validateForm()) {
      let imageToUpload = imageUri;
  
      if (!imageUri) {
        // Load the default image asset
        const asset = Asset.fromModule(User);
        await asset.downloadAsync(); // Ensure the image is available locally
        const defaultImageUri = asset.localUri || asset.uri;
        
        // Convert the default image to Base64
        const base64Image = await FileSystem.readAsStringAsync(defaultImageUri, {
          encoding: FileSystem.EncodingType.Base64,
        });
        
        imageToUpload = `${base64Image}`;
      } else {
        // If imageUri is provided, remove the Base64 prefix
        imageToUpload = imageUri.replace(/^data:image\/[a-z]+;base64,/, '');
      }
  
      try {
        const response = await axios.post("http://10.0.0.21:3001/SignUp", {
          username,
          email,
          password,
          gender,
          dateOfBirth,
          phoneNo,
          bio,
          image: imageToUpload, // Send the Base64 without the prefix
        });
  
        if (response.status === 200) {
          const userId = response.data.user._id;
          console.log("SignUp success:", response.data);
          console.log("UserId:", userId);
          navigation.navigate("Home", { username, bio, imageUri, userId: response.data.user._id });
        } else {
          console.error("SignUp error: Unexpected status code", response.status);
          alert("Error: Failed to create account");
        }
      } catch (error) {
        console.error("SignUp error:", error);
        if (error.response) {
          alert(`Error: ${error.response.data.error}`);
        } else {
          alert("Error: No response received from server");
        }
      }
    }
  };
  
  const pickImageAsync = async (useLibrary) => {
    try {
      await ensureDirExists();
      let result;
  
      if (useLibrary) {
        const options = {
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        };
        result = await ImagePicker.launchImageLibraryAsync(options);
      } else {
        const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
  
        if (!permissionResult.granted) {
          alert("Permission denied to access camera!");
          return;
        }
  
        result = await ImagePicker.launchCameraAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
      }
  
      if (!result.cancelled) {
        const uri = result.assets[0].uri;
        const base64Image = await FileSystem.readAsStringAsync(uri, {
          encoding: FileSystem.EncodingType.Base64,
        });
        setImageUri(`data:image/jpeg;base64,${base64Image}`);
      } else {
        alert("You did not select any image.");
      }
    } catch (error) {
      console.log("Error while picking an image:", error);
    }
  };
  


  const saveImage = async (uri) => {
    const filename = "profile_image.jpg";
    const dest = imgDir + "/" + filename;
    await FileSystem.copyAsync({ from: uri, to: dest });
  };

  return (
    <View
      style={[
        { backgroundColor: "white", height: "100%" },
        { backgroundColor: isDarkMode ? "black" : "white" },
      ]}
    >
      {isDarkMode ? (
        <Image
          source={GrayEllipse}
          style={{
            width: 150,
            height: 150,
            position: "absolute",
            marginLeft: 310,
            marginTop: -15,
            borderRadius:200

          }}
        />
      ) : (
        <Image
          source={BlueEllipse}
          style={{
            width: 150,
            height: 150,
            position: "absolute",
            marginLeft: 310,
            marginTop: -15,
          }}
        />
      )}
     
      {isDarkMode ? (
        <Image
          source={GrayEllipse}
          style={{
            width: 150,
          height: 150,
          position: "absolute",
          marginLeft: -90,
          marginTop: 135,
          borderRadius:200
          }}
        />
      ) : (
        <Image
        source={BlueEllipse}
        style={{
          width: 150,
          height: 150,
          position: "absolute",
          marginLeft: -90,
          marginTop: 135,
        }}
      />
      )}
      
      <Image
        source={People}
        style={{
          width: 200,
          height: 200,
          position: "absolute",
          marginLeft: 100,
          marginTop: 105,
        }}
      />

      <Text
        style={[
          {
            position: "absolute",
            marginLeft: 60,
            marginTop: 120,
            fontWeight: "bold",
            fontSize: 27,
          },
          { color: isDarkMode ? "white" : "#1B436F" },
        ]}
      >
        Customize Your Profile
      </Text>

      <View style={{ alignItems: "center", top: 250 }}>
        <Image
          source={User}
          style={{
            width: 150,
            height: 150,
            marginBottom: 20,
            position: "absolute",

            marginTop: -90,
          }}
        />
        <Image
          source={{ uri: imageUri }}
          style={{
            width: 150,
            height: 150,
            marginBottom: 20,
            borderRadius: 100,
            position: "absolute",
            marginTop: -90,
          }}
        />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            width: "100%",
            marginBottom: 20,
          }}
        >
          <Pressable onPress={() => pickImageAsync(true)}>
            <Text
              style={{
                marginLeft: 100,
                fontWeight: "500",
                color: "#636363",
                marginTop: 50,
                top: 10,
              }}
            >
              Choose a photo
            </Text>
          </Pressable>
          <Pressable onPress={() => pickImageAsync(false)}>
            <View
              style={{
                backgroundColor: "#D9D9D9",
                borderRadius: 40,
                width: 35,
                height: 35,
                marginLeft: -120,
                marginTop: 50,
                top: -30,
                position: "absolute",
              }}
            >
              <Image
                source={Camera}
                style={{ width: 25, height: 25, marginLeft: 5, marginTop: 5 }}
              />
            </View>
          </Pressable>
        </View>

        <TextInput
          style={[
            {
              width: 300,
              height: 40,
              backgroundColor: "#EEEEEE",
              marginBottom: 10,
              paddingHorizontal: 10,
              borderRadius: 10,
              top: 0,
            },
            { backgroundColor: isDarkMode ? "#333" : "#EEEEEE" },
            { color: isDarkMode ? "white" : "gray" },
          ]}
          placeholder="Username"
          value={username}
          onChangeText={(text) => setUsername(text)}
        />
        {usernameError ? (
          <Text style={{ color: "red", marginLeft: -180, marginBottom: 10 }}>
            {usernameError}
          </Text>
        ) : null}

        <TextInput
          style={[
            {
              width: 300,
              height: 40,
              backgroundColor: "#EEEEEE",
              marginBottom: 10,
              paddingHorizontal: 10,
              borderRadius: 10,
              top: 5,
            },
            { backgroundColor: isDarkMode ? "#333" : "white" },
            { color: isDarkMode ? "white" : "gray" },
          ]}
          placeholder="Bio"
          value={bio}
          onChangeText={(text) => setBio(text)}
        />
        {bioError ? (
          <Text style={{ color: "red", marginLeft: -220, marginBottom: 5 }}>
            {bioError}
          </Text>
        ) : null}

        <TouchableOpacity
          onPress={handleSignUp}
          style={[
            {
              backgroundColor: "#719AEA",
              width: 300,
              paddingTop: 1,
              height: 40,
              borderRadius: 30,
              top: 15,
              
            },
            { backgroundColor: isDarkMode ? "#032B79" : "#719AEA" },
            { color: isDarkMode ? "white" : "white" },
          ]}
        >
          <Text
            style={{
              color: "white",
              fontSize: 16,
              fontWeight: "500",
              marginLeft: 120,
              marginTop: 5,
            }}
          >
            Confirm
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
});
export default ProfileCustomization;
