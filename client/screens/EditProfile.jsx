// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   Button,
//   Image,
//   TouchableOpacity,
//   StyleSheet,
//   Alert,
// } from "react-native";
// import * as ImagePicker from "expo-image-picker";
// import axios from "axios";

// const EditProfileScreen = ({ route, navigation }) => {
//   const { username, bio, email, imageData,userId } = route.params;
//   const [newUsername, setNewUsername] = useState(username);
//   const [newBio, setNewBio] = useState(bio);
//   const [newEmail, setNewEmail] = useState(email);
//   const [newImage, setNewImage] = useState(imageData);

//   const pickImage = async () => {
//     let result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.All,
//       allowsEditing: true,
//       aspect: [4, 3],
//       quality: 1,
//       base64: true,
//     });

//     if (!result.canceled) {
//       setNewImage(result.assets[0].base64);
//     }
//   };

//   const handleUpdate = async () => {

//     try {
//       const response = await axios.put(`http://10.0.0.21:3001/user/${userId}`, {
//         newUsername: newUsername,
//         bio: newBio,
//         email: newEmail,
//         image: newImage,
//       });

//       if (response.status === 200) {
//         Alert.alert("Profile Updated", "Your profile has been updated successfully.");
//         navigation.navigate("MyProfile", {
//           userId, // Pass the user ID instead of the username
//           bio: newBio,
//           email: newEmail,
//           imageData: newImage,
//           username:newUsername
//         });
//       }
//     } catch (error) {
//       console.error("Error updating profile:", error);
//       Alert.alert("Error", "There was an error updating your profile. Please try again.");
//       console.log('userId:', userId); // Add this to see if userId is available

//     }
//   };

//   return (
//     <View style={styles.container}>

//       <TouchableOpacity onPress={pickImage}>
//         <Image
//           style={styles.profileImage}
//           source={{
//             uri: `data:image/jpeg;base64,${newImage}`,
//           }}
//         />
//         <Text style={styles.changeImageText}>Change Profile Image</Text>
//       </TouchableOpacity>
//       <TextInput
//         style={styles.input}
//         placeholder="Username"
//         value={newUsername}
//         onChangeText={setNewUsername}
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Email"
//         value={newEmail}
//         onChangeText={setNewEmail}
//         keyboardType="email-address"
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Bio"
//         value={newBio}
//         onChangeText={setNewBio}
//         multiline
//       />
//       <Button title="Update Profile" onPress={handleUpdate} />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: "#fff",
//     paddingTop:70
//   },
//   profileImage: {
//     width: 100,
//     height: 100,
//     borderRadius: 50,
//     alignSelf: "center",
//     marginBottom: 20,
//   },
//   changeImageText: {
//     textAlign: "center",
//     color: "#007AFF",
//     marginBottom: 20,
//   },
//   input: {
//     borderBottomWidth: 1,
//     borderBottomColor: "#ccc",
//     padding: 10,
//     marginBottom: 20,
//   },
// });

// export default EditProfileScreen;
import React, { useState, useEffect ,useContext} from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import Photo from "../assets/camera.png";
import { DarkModeContext } from "../components/DarkModeContext";

const EditProfileScreen = ({ route, navigation }) => {
  const { userId, phoneNo, username } = route.params;
  const [originalData, setOriginalData] = useState({});
  const [newUsername, setNewUsername] = useState(username);
  const [newPassword, setNewPassword] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPhone, setNewPhone] = useState(phoneNo);
  const [newImage, setNewImage] = useState("");
  const [newBio, setNewBio] = useState("");
  const { isDarkMode } = useContext(DarkModeContext);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `http://10.0.0.21:3001/user/${userId}`
        );
        const userData = response.data;

        setOriginalData(userData);
        setNewPassword("");
        setNewEmail(userData.email);
        setNewPhone(userData.phoneNo);
        setNewBio(userData.bio);
        setNewImage(userData.image);
      } catch (error) {
        console.error("Error fetching user data:", error);
        Alert.alert("Error", "There was an error fetching your profile data.");
      }
    };

    fetchUserData();
  }, [userId]);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    if (!result.canceled) {
      setNewImage(result.assets[0].base64);
    }
  };

  const handleUpdate = async () => {
    const updatedData = {};

    if (newUsername !== originalData.username) {
      updatedData.username = newUsername;
    }
    if (newPassword) {
      updatedData.password = newPassword; // Only update if a new password is entered
    }
    if (newEmail !== originalData.email) {
      updatedData.email = newEmail;
    }
    if (newPhone !== originalData.phoneNo) {
      updatedData.phoneNo = newPhone;
    }
    if (newBio !== originalData.bio) {
      updatedData.bio = newBio;
    }
    if (newImage !== originalData.image) {
      updatedData.image = newImage;
    }

    if (Object.keys(updatedData).length === 0) {
      Alert.alert("No Changes", "No changes were made to the profile.");
      return;
    }

    try {
      const response = await axios.put(
        `http://10.0.0.21:3001/user/${userId}`,
        updatedData
      );

      if (response.status === 200) {
        Alert.alert(
          "Profile Updated",
          "Your profile has been updated successfully."
        );
        navigation.navigate("MyProfile", {
          userId,
          username: newUsername,
          password: newPassword,
          email: newEmail,
          phoneNo: newPhone,
          bio: newBio,
          imageData: newImage,
        });
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      Alert.alert(
        "Error",
        "There was an error updating your profile. Please try again."
      );
    }
  };

  const ReturnToProfile = () => {
    navigation.navigate("MyProfile", {
      userId,
      username,
    
    });

  };

  return (
    <KeyboardAvoidingView
      style={[styles.container,{ backgroundColor: isDarkMode ? "black" : "#FAFAFA"}]}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={50} // Adjust this as needed
    >
      <ScrollView contentContainerStyle={[{ flexGrow: 1 },{ backgroundColor: isDarkMode ? "black" : "#FAFAFA"}]}>
        <Text
          style={{ color: "red", fontSize: 18, fontWeight: "600",position: "absolute", left: 30,  top: 70, }}
          onPress={ReturnToProfile}
        >
          Cancel
        </Text>
        <Text
          onPress={handleUpdate}
          style={[{
            fontWeight: "600",
            position: "absolute",
            left: 340,
            top: 70,
            color: "#032B79",
            fontSize: 18,
          },{ color: isDarkMode ? "white" : "#032B79"}]}
        >
          Save
        </Text>

        <View style={styles.imageContainer}>
          <Image
            style={styles.profileImage}
            source={{
              uri: `data:image/jpeg;base64,${newImage}`,
            }}
          />
        </View>

        <TouchableOpacity onPress={pickImage}>
          <View
            style={{
              position: "absolute",
              left: 220,
              top: -70,
              width: 40,
              height: 40,
              backgroundColor: "gray",
              borderRadius: 120,
              padding: 20,
            }}
          >
            <Image
              source={Photo}
              style={{
                position: "absolute",
                width: 20,
                height: 20,
                left: 10,
                top: 10,
              }}
            />
          </View>
        </TouchableOpacity>

        <View style={[styles.inputContainer,{ backgroundColor: isDarkMode ? "black" : "#FAFAFA"}]}>
          <Text style={styles.label}>YOUR USERNAME</Text>
          <TextInput
            style={[styles.input,{ color: isDarkMode ? "white" : "#000"}]}
            placeholder="Username"
            value={newUsername}
            onChangeText={setNewUsername}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>YOUR PASSWORD</Text>
          <TextInput
            style={[styles.input,{ color: isDarkMode ? "white" : "#000"}]}
            placeholder="Password"
            value={newPassword}
            secureTextEntry={true}
            onChangeText={setNewPassword}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>YOUR EMAIL</Text>
          <TextInput
            style={[styles.input,{ color: isDarkMode ? "white" : "#000"}]}
            placeholder="Email"
            value={newEmail}
            onChangeText={setNewEmail}
            keyboardType="email-address"
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>YOUR BIO</Text>
          <TextInput
            style={[styles.input,{ color: isDarkMode ? "white" : "#000"}]}
            placeholder="Bio"
            value={newBio}
            onChangeText={setNewBio}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>YOUR PHONE</Text>
          <TextInput
            style={[styles.input,{ color: isDarkMode ? "white" : "#000"}]}
            placeholder="Phone"
            value={newPhone}
            onChangeText={setNewPhone}
            keyboardType="phone-pad"
            onFocus={() => {
              // Any additional logic when focusing on the phone input
            }}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    height:"100%"
  },
  imageContainer: {
    alignItems: "center",
    marginBottom: 30,
    marginTop:70
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 150,
    borderColor: "#032B79",
    borderWidth: 4,
  },
  inputContainer: {
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  label: {
    fontSize: 12,
    color: "#8e8e93",
    marginBottom: 5,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingVertical: 10,
    fontSize: 16,
    color: "#000",
  },
});

export default EditProfileScreen;

// import React, { useState, useEffect } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   Button,
//   Image,
//   TouchableOpacity,
//   StyleSheet,
//   Alert,
  
// } from "react-native";
// import * as ImagePicker from "expo-image-picker";
// import axios from "axios";
// import Photo from "../assets/camera.png";
// const EditProfileScreen = ({ route, navigation }) => {
//   const { userId, phoneNo ,username} = route.params;
//   const [originalData, setOriginalData] = useState({});
//   const [newUsername, setNewUsername] = useState(username);
//   const [newPassword, setNewPassword] = useState("");
//   const [newEmail, setNewEmail] = useState("");
//   const [newPhone, setNewPhone] = useState(phoneNo);
//   const [newImage, setNewImage] = useState("");
//   const [newBio, setNewBio] = useState("");

//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const response = await axios.get(
//           `http://10.0.0.21:3001/user/${userId}`
//         );
//         const userData = response.data;

//         // Store original data
//         setOriginalData(userData);

//         // setNewUsername(userData.username);
//         setNewPassword(""); // Keep password field empty initially
//         setNewEmail(userData.email);
//         setNewPhone(userData.phoneNo);
//         setNewBio(userData.bio);
//         setNewImage(userData.image);
//       } catch (error) {
//         console.error("Error fetching user data:", error);
//         Alert.alert("Error", "There was an error fetching your profile data.");
//       }
//     };

//     fetchUserData();
//   }, [userId]);

//   const pickImage = async () => {
//     let result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.All,
//       allowsEditing: true,
//       aspect: [4, 3],
//       quality: 1,
//       base64: true,
//     });

//     if (!result.canceled) {
//       setNewImage(result.assets[0].base64);
//     }
//   };

//   const handleUpdate = async () => {
//     const updatedData = {};

//     if (newUsername !== originalData.username) {
//       updatedData.username = newUsername;
//     }
//     if (newPassword) {
//       updatedData.password = newPassword; // Only update if a new password is entered
//     }
//     if (newEmail !== originalData.email) {
//       updatedData.email = newEmail;
//     }
//     if (newPhone !== originalData.phoneNo) {
//       updatedData.phoneNo = newPhone;
//     }
//     if (newBio !== originalData.bio) {
//       updatedData.bio = newBio;
//     }
//     if (newImage !== originalData.image) {
//       updatedData.image = newImage;
//     }

//     if (Object.keys(updatedData).length === 0) {
//       Alert.alert("No Changes", "No changes were made to the profile.");
//       return;
//     }

//     try {
//       const response = await axios.put(
//         `http://10.0.0.21:3001/user/${userId}`,
//         updatedData
//       );

//       if (response.status === 200) {
//         Alert.alert(
//           "Profile Updated",
//           "Your profile has been updated successfully."
//         );
//         navigation.navigate("MyProfile", {
//           userId,
//           username: newUsername,
//           password: newPassword,
//           email: newEmail,
//           phoneNo: newPhone,
//           bio: newBio,
//           imageData: newImage,
//         });
//       }
//     } catch (error) {
//       console.error("Error updating profile:", error);
//       Alert.alert(
//         "Error",
//         "There was an error updating your profile. Please try again."
//       );
//     }
//   };

//   const ReturnToProfile = () => {
//     navigation.navigate("MyProfile", {
//       userId,
//       username,
//     });
//   };
//   return (
//     <View style={styles.container}>
//       <Text
//         style={{ color: "red", fontSize: 18, fontWeight: "600" }}
//         onPress={ReturnToProfile}
//       >
//         Cancel
//       </Text>
//       <Text
//         onPress={handleUpdate}
//         style={{
//           fontWeight: "600",
//           position: "absolute",
//           left: 340,
//           top: 70,
//           color: "#032B79",
//           fontSize: 18,
//         }}
//       >
//         Save
//       </Text>

//       <TouchableOpacity style={styles.imageContainer}>
//         <Image
//           style={styles.profileImage}
//           source={{
//             uri: `data:image/jpeg;base64,${newImage}`,
//           }}
//         />
//       </TouchableOpacity>
//       <TouchableOpacity onPress={pickImage}>
//         <View
//           style={{
//             position: "absolute",
//             left: 200,
//             top: -70,
//             width: 40,
//             height: 40,
//             backgroundColor: "gray",
//             borderRadius: 120,
//             padding: 20,
//           }}
//         >
//           <Image
//             source={Photo}
//             style={{
//               position: "absolute",
//               width: 20,
//               height: 20,
//               left: 10,
//               top: 10,
//             }}
//           />
//         </View>
//       </TouchableOpacity>

//       <View style={styles.inputContainer}>
//         <Text style={styles.label}>YOUR USERNAME</Text>
//         <TextInput
//           style={styles.input}
//           placeholder="Username"
//           value={newUsername}
//           onChangeText={setNewUsername}
//         />
//       </View>
//       <View style={styles.inputContainer}>
//         <Text style={styles.label}>YOUR PASSWORD</Text>
//         <TextInput
//           style={styles.input}
//           placeholder="Password"
//           value={newPassword}
//           secureTextEntry={true}
//           onChangeText={setNewPassword}
//         />
//       </View>
//       <View style={styles.inputContainer}>
//         <Text style={styles.label}>YOUR EMAIL</Text>
//         <TextInput
//           style={styles.input}
//           placeholder="Email"
//           value={newEmail}
//           onChangeText={setNewEmail}
//           keyboardType="email-address"
//         />
//       </View>
//       <View style={styles.inputContainer}>
//         <Text style={styles.label}>YOUR BIO</Text>
//         <TextInput
//           style={styles.input}
//           placeholder="Bio"
//           value={newBio}
//           onChangeText={setNewBio}
//         />
//       </View>
//       <View style={styles.inputContainer}>
//         <Text style={styles.label}>YOUR PHONE</Text>
//         <TextInput
//           style={styles.input}
//           placeholder="Phone"
//           value={newPhone}
//           onChangeText={setNewPhone}
//           keyboardType="phone-pad"
//         />
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: "#fff",
//     paddingTop: 70,
//   },
//   imageContainer: {
//     alignItems: "center",
//     marginBottom: 30,
//   },
//   profileImage: {
//     width: 150,
//     height: 150,
//     borderRadius: 150,
//     borderColor:"#032B79",
//     borderWidth:4,
//   },
//   inputContainer: {
//     marginBottom: 20,
//   },
//   label: {
//     fontSize: 12,
//     color: "#8e8e93",
//     marginBottom: 5,
//   },
//   input: {
//     borderBottomWidth: 1,
//     borderBottomColor: "#ccc",
//     paddingVertical: 10,
//     fontSize: 16,
//     color: "#000",
//   },
// });

// export default EditProfileScreen;
