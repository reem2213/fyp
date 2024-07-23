// import React, { useEffect, useState } from "react";
// import {
//   KeyboardAvoidingView,
//   Platform,
//   StyleSheet,
//   View,
//   Image,
//   Text,
//   TextInput,
//   Pressable,
//   TouchableOpacity,
// } from "react-native";
// import * as ImagePicker from "expo-image-picker";
// import * as FileSystem from "expo-file-system";
// import User from "../assets/user.png";
// import BlueEllipse from "../assets/blueEllipse.png";
// import People from "../assets/people-remover.png";
// import Camera from "../assets/camera.png";
// import axios from "axios";
// const imgDir = FileSystem.documentDirectory + "/images";

// const ProfileCustomization = ({ navigation, route }) => {
//   const [imageUri, setImageUri] = useState("");
//   const [username, setUsername] = useState("");
//   const [bio, setBio] = useState("");
//   const [usernameError, setUsernameError] = useState("");
//   const [bioError, setBioError] = useState("");


//   const [email, setEmail] = useState("");
//   // const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [dateOfBirth, setDateOfBirth] = useState(null);
//   const [gender, setGender] = useState("female");
//   const [phoneNo, setPhoneNo] = useState("");
//   const [emailError, setEmailError] = useState("");
//   // const [usernameError, setUsernameError] = useState("");
//   const [passwordError, setPasswordError] = useState("");
//   const [dateOfBirthError, setDateOfBirthError] = useState("");
//   const [genderError, setGenderError] = useState("");
//   const [phoneNoError, setPhoneNoError] = useState("");
//   const [isDatePickerVisible, setDatePickerVisible] = useState(false);
//   const [usernameExists, setUsernameExists] = useState(false);

//   useEffect(() => {
//     if (route.params && route.params.username &&route.params.email ) {
//       setUsername(route.params.username);
//       setEmail(route.params.email);
//       setDateOfBirth(route.params.dateOfBirth);
//       setGender(route.params.gender);
//       setPassword(route.params.password);
//       setPhoneNo(route.params.phoneNo);
//     }
//   }, [route.params]);


//   const showDatePicker = () => {
//     setDatePickerVisible(true);
//   };

//   const hideDatePicker = () => {
//     setDatePickerVisible(false);
//   };

//   const handleConfirmDate = (selectedDate) => {
//     hideDatePicker();
//     if (selectedDate) {
//       setDateOfBirth(selectedDate);
//       setDateOfBirthError(""); 
//     }
//   };

//   const validateForm = () => {
//     let isValid = true;
//     const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     const phonePattern = /^\d{10}$/;

//     if (!email.trim()) {
//       setEmailError("Email is required");
//       isValid = false;
//     } else if (!emailPattern.test(email)) {
//       setEmailError("Please enter a valid email address");
//       isValid = false;
//     } else {
//       setEmailError("");
//     }

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

//     if (!dateOfBirth) {
//       setDateOfBirthError("Date of Birth is required");
//       isValid = false;
//     } else if (new Date(dateOfBirth) > new Date()) {
//       setDateOfBirthError("Date of Birth cannot be in the future");
//       isValid = false;
//     } else {
//       setDateOfBirthError("");
//     }

//     if (!gender) {
//       setGenderError("Please select a gender");
//       isValid = false;
//     } else {
//       setGenderError("");
//     }

//     if (!phoneNo.trim()) {
//       setPhoneNoError("Phone number is required");
//       isValid = false;
//     } else if (!phonePattern.test(phoneNo)) {
//       setPhoneNoError("Please enter a valid 10-digit phone number");
//       isValid = false;
//     } else {
//       setPhoneNoError("");
//     }
//     if (!bio.trim()) {
//       setBioError("Bio is required");
//       isValid = false;
//     } else {
//       setBioError("");
//     }

//     return isValid;
//   };


//   const handleSignUp = async () => {
//     // if (validateForm()) {
//       try {
//         const response = await axios.post("http://10.0.0.21:3001/SignUp", {
//           username,
//           email,
//           password,
//           gender,
//           dateOfBirth,
//           phoneNo,
//           bio, // Include bio in the request body
//         });
  
//         if (response.status === 200) {
//           navigation.navigate("MyProfile", { username, bio, imageUri });
//         } else {
//           alert("Error: Failed to create account");
//         }
//       } catch (error) {
//         // if (error.response.data.error === "Username already exists") {
//         //   setUsernameExists(true);
//         // } else if (error.response) {
//         //   alert(`Error: ${error.response.data}`);
//         // } else if (error.request) {
//         //   alert("Error: No response received from server");
//         // } else {
//         //   alert(`Error: ${error.message}`);
//         // }
//         console.log(error)
//       }
    
//   };
  
//   const ensureDirExists = async () => {
//     const dirInfo = await FileSystem.getInfoAsync(imgDir);

//     if (!dirInfo.exists) {
//       await FileSystem.makeDirectoryAsync(imgDir, { intermediates: true });
//     }
//   };

//   useEffect(() => {
//     ensureDirExists();
//   }, []);

//   const pickImageAsync = async (useLibrary) => {
//     try {
//       await ensureDirExists();

//       let result;

//       if (useLibrary) {
//         const options = {
//           mediaTypes: ImagePicker.MediaTypeOptions.Images,
//           allowsEditing: true,
//           aspect: [4, 3],
//           quality: 1,
//         };
//         result = await ImagePicker.launchImageLibraryAsync(options);
//       } else {
//         const permissionResult =
//           await ImagePicker.requestCameraPermissionsAsync();

//         if (!permissionResult.granted) {
//           alert("Permission denied to access camera!");
//           return;
//         }

//         result = await ImagePicker.launchCameraAsync({
//           mediaTypes: ImagePicker.MediaTypeOptions.Images,
//           allowsEditing: true,
//           aspect: [4, 3],
//           quality: 1,
//         });
//       }

//       if (!result.cancelled) {
//         const uri = result.assets[0].uri;
//         setImageUri(uri);
//         saveImage(uri);
//       } else {
//         alert("You did not select any image.");
//       }
//     } catch (error) {
//       console.log("Error while picking an image:", error);
//     }
//   };

//   const saveImage = async (uri) => {
//     const filename = "profile_image.jpg";
//     const dest = imgDir + "/" + filename;
//     await FileSystem.copyAsync({ from: uri, to: dest });
//   };

//   return (
//     <View style={{ backgroundColor: "white", height: "100%" }}>
//       <Image
//         source={BlueEllipse}
//         style={{
//           width: 150,
//           height: 150,
//           position: "absolute",
//           marginLeft: 310,
//           marginTop: -15,
//         }}
//       />
//       <Image
//         source={BlueEllipse}
//         style={{
//           width: 150,
//           height: 150,
//           position: "absolute",
//           marginLeft: -90,
//           marginTop: 135,
//         }}
//       />
//       <Image
//         source={People}
//         style={{
//           width: 200,
//           height: 200,
//           position: "absolute",
//           marginLeft: 100,
//           marginTop: 105,
//         }}
//       />

//       <Text
//         style={{
//           position: "absolute",
//           marginLeft: 60,
//           marginTop: 120,
//           fontWeight: "bold",
//           fontSize: 27,
//           color: "#1B436F",
//         }}
//       >
//         Customize Your Profile
//       </Text>
//       {/* <KeyboardAvoidingView
//         style={styles.container}
//         behavior={Platform.OS === "ios" ? "padding" : "height"}
//         keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 120}
//       > */}
//         <View style={{ alignItems: "center", top: 250 }}>
//           <Image
//             source={User}
//             style={{
//               width: 150,
//               height: 150,
//               marginBottom: 20,
//                position: "absolute",

//               marginTop: -90,
//             }}
//           />
//           <Image
//             source={{ uri: imageUri }}
//             style={{
//               width: 150,
//               height: 150,
//               marginBottom: 20,
//               borderRadius: 100,
//               position: "absolute",
//               marginTop: -90,

//             }}
//           />
//           <View
//             style={{
//               flexDirection: "row",
//               justifyContent: "space-around",
//               width: "100%",
//               marginBottom: 20,
//             }}
//           >
//             <Pressable onPress={() => pickImageAsync(true)}>
//               <Text
//                 style={{
//                   marginLeft: 100,
//                   fontWeight: "500",
//                   color: "#636363",
//                   marginTop: 50,
//                   top:10

//                 }}
//               >
//                 Choose a photo
//               </Text>
//             </Pressable>
//             <Pressable onPress={() => pickImageAsync(false)}>
//               <View
//                 style={{
//                   backgroundColor: "#D9D9D9",
//                   borderRadius: 40,
//                   width: 35,
//                   height: 35,
//                   marginLeft: -120,
//                   marginTop: 50,
//                   top:-30,
//                   position:"absolute"
//                 }}
//               >
//                 <Image
//                   source={Camera}
//                   style={{ width: 25, height: 25, marginLeft: 5, marginTop:5
//                   }}
//                 />
//               </View>
//             </Pressable>
//           </View>

//           <TextInput
//             style={{
//               width: 300,
//               height: 40,
//               backgroundColor: "#EEEEEE",
//               marginBottom: 10,
//               paddingHorizontal: 10,
//               borderRadius: 10,
//               top:0
//             }}
//             placeholder="Username"
//             value={username}
//             onChangeText={(text) => setUsername(text)}
//           />
//           {usernameError ? (
//             <Text style={{ color: "red", marginLeft: -180, marginBottom: 10 }}>
//               {usernameError}
//             </Text>
//           ) : null}

//           <TextInput
//             style={{
//               width: 300,
//               height: 40,
//               backgroundColor: "#EEEEEE",
//               marginBottom: 10,
//               paddingHorizontal: 10,
//               borderRadius: 10,
//               top:5

//             }}
//             placeholder="Bio"
//             value={bio}
//             onChangeText={(text) => setBio(text)}
//           />
//           {bioError ? (
//             <Text style={{ color: "red", marginLeft: -220, marginBottom: 5 }}>
//               {bioError}
//             </Text>
//           ) : null}


          

//           <TouchableOpacity
//             onPress={handleSignUp}
//             style={{
//               backgroundColor: "#719AEA",
//               width: 300,
//               paddingTop:5,
//               height: 40,
//               borderRadius: 30,
//               top:15

//             }}
//           >
//             <Text
//               style={{
//                 color: "white",
//                 fontSize: 18,
//                 fontWeight: "500",
//                 marginLeft: 120,
//                 marginTop: 5,
//               }}
//             >
//               Confirm
//             </Text>
//           </TouchableOpacity>

//         </View>
//     </View>
//   );
// };
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     paddingHorizontal: 20,
//   },
// });
// export default ProfileCustomization;


import React, { useContext, useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
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
import People from "../assets/people-remover.png";
import Camera from "../assets/camera.png";
import { DarkModeContext } from "../components/DarkModeContext";
import axios from "axios";

const imgDir = FileSystem.documentDirectory + "/images";

const ProfileCustomization = ({ navigation, route }) => {
  const { isDarkMode } = useContext(DarkModeContext);
  const [imageUri, setImageUri] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [bioError, setBioError] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState(null);
  const [gender, setGender] = useState("female");
  const [phoneNo, setPhoneNo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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

  const handleSignUp = async () => {
    try {
      const response = await axios.post("http://10.0.0.21:3001/SignUp", {
        username,
        email,
        password,
        gender,
        dateOfBirth,
        phoneNo,
        bio,
      });

      if (response.status === 200) {
        navigation.navigate("MyProfile", { username, bio, imageUri });
      } else {
        alert("Error: Failed to create account");
      }
    } catch (error) {
      console.log(error)
    }
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
        setImageUri(uri);
        saveImage(uri);
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
    <View style={[{ height: "100%" }, isDarkMode ? styles.darkContainer : styles.lightContainer]}>
      <Image
        source={BlueEllipse}
        style={[
          styles.blueEllipse,
          isDarkMode ? styles.darkBlueEllipse : styles.lightBlueEllipse
        ]}
      />
      <Image
        source={BlueEllipse}
        style={[
          styles.blueEllipse2,
          isDarkMode ? styles.darkBlueEllipse2 : styles.lightBlueEllipse2
        ]}
      />
      <Image
        source={People}
        style={[
          styles.peopleImage,
          isDarkMode ? styles.darkPeopleImage : styles.lightPeopleImage
        ]}
      />
      <Text style={[styles.title, isDarkMode ? styles.darkTitle : styles.lightTitle]}>
        Customize Your Profile
      </Text>
      <View style={styles.profileImageContainer}>
        <Image
          source={User}
          style={[styles.defaultUserImage, isDarkMode ? styles.darkDefaultUserImage : styles.lightDefaultUserImage]}
        />
        <Image
          source={{ uri: imageUri }}
          style={[styles.userImage, isDarkMode ? styles.darkUserImage : styles.lightUserImage]}
        />
        <View style={styles.imageOptions}>
          <Pressable onPress={() => pickImageAsync(true)}>
            <Text style={[styles.choosePhotoText, isDarkMode ? styles.darkChoosePhotoText : styles.lightChoosePhotoText]}>
              Choose a photo
            </Text>
          </Pressable>
          <Pressable onPress={() => pickImageAsync(false)}>
            <View style={[styles.cameraButton, isDarkMode ? styles.darkCameraButton : styles.lightCameraButton]}>
              <Image source={Camera} style={styles.cameraIcon} />
            </View>
          </Pressable>
        </View>
        <TextInput
          style={[styles.input, isDarkMode ? styles.darkInput : styles.lightInput]}
          placeholder="Username"
          value={username}
          onChangeText={(text) => setUsername(text)}
        />
        {usernameError ? (
          <Text style={styles.errorText}>{usernameError}</Text>
        ) : null}
        <TextInput
          style={[styles.input, isDarkMode ? styles.darkInput : styles.lightInput]}
          placeholder="Bio"
          value={bio}
          onChangeText={(text) => setBio(text)}
        />
        {bioError ? (
          <Text style={styles.errorText}>{bioError}</Text>
        ) : null}
        <TouchableOpacity
          onPress={handleSignUp}
          style={[styles.confirmButton, isDarkMode ? styles.darkConfirmButton : styles.lightConfirmButton]}
        >
          <Text style={[styles.confirmButtonText, isDarkMode ? styles.darkConfirmButtonText : styles.lightConfirmButtonText]}>
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
  },
  backgroundContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  blueEllipse: {
    width: 800,
    height: 800,
    position: "absolute",
    top: -50,
    left: -100,
  },
  blueEllipse2: {
    width: 600,
    height: 600,
    position: "absolute",
    top: 400,
    left: -100,
  },
  peopleImage: {
    position: "absolute",
    width: 200,
    height: 200,
    bottom: 0,
    right: 0,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 20,
  },
  profileImageContainer: {
    alignItems: "center",
  },
  defaultUserImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "#000",
  },
  userImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    position: "absolute",
    top: 0,
    left: 0,
  },
  imageOptions: {
    flexDirection: "row",
    marginTop: 10,
  },
  choosePhotoText: {
    color: "#007BFF",
    marginHorizontal: 10,
  },
  cameraButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#FFF",
    justifyContent: "center",
    alignItems: "center",
  },
  cameraIcon: {
    width: 20,
    height: 20,
  },
  input: {
    width: 300,
    height: 40,
    borderBottomWidth: 1,
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  confirmButton: {
    backgroundColor: "#007BFF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
  },
  confirmButtonText: {
    color: "#FFF",
    fontSize: 16,
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },

  /* Dark Mode Styles */
  darkContainer: {
    backgroundColor: "#333",
  },
  darkBlueEllipse: {
    tintColor: "#1a1a1a",
  },
  darkBlueEllipse2: {
    tintColor: "#1a1a1a",
  },
  darkPeopleImage: {
    tintColor: "#1a1a1a",
  },
  darkTitle: {
    color: "#FFF",
  },
  darkDefaultUserImage: {
    borderColor: "#FFF",
  },
  darkUserImage: {
    tintColor: "#FFF",
  },
  darkChoosePhotoText: {
    color: "#4B9CD3",
  },
  darkCameraButton: {
    backgroundColor: "#2E2E2E",
  },
  darkInput: {
    borderBottomColor: "#555",
    color: "#FFF",
  },
  darkConfirmButton: {
    backgroundColor: "#4B9CD3",
  },
  darkConfirmButtonText: {
    color: "#FFF",
  },
  /* Light Mode Styles */
  lightContainer: {
    backgroundColor: "#FFF",
  },
  lightBlueEllipse: {
    tintColor: "#C0D6DF",
  },
  lightBlueEllipse2: {
    tintColor: "#C0D6DF",
  },
  lightPeopleImage: {
    tintColor: "#C0D6DF",
  },
  lightTitle: {
    color: "#000",
  },
  lightDefaultUserImage: {
    borderColor: "#000",
  },
  lightUserImage: {
    tintColor: "#000",
  },
  lightChoosePhotoText: {
    color: "#007BFF",
  },
  lightCameraButton: {
    backgroundColor: "#FFF",
  },
  lightInput: {
    borderBottomColor: "#000",
    color: "#000",
  },
  lightConfirmButton: {
    backgroundColor: "#007BFF",
  },
  lightConfirmButtonText: {
    color: "#FFF",
  },
});

export default ProfileCustomization;
