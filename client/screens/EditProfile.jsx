import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";

const EditProfileScreen = ({ route, navigation }) => {
  const { username, bio, email, imageData } = route.params;
  const [newUsername, setNewUsername] = useState(username);
  const [newBio, setNewBio] = useState(bio);
  const [newEmail, setNewEmail] = useState(email);
  const [newImage, setNewImage] = useState(imageData);

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

  // const handleUpdate = async () => {
  //   try {
  //     const response = await axios.put(`http://10.0.0.21:3001/user/${username}`, {
  //       newUsername: newUsername, // Updated this line
  //       bio: newBio,
  //       email: newEmail,
  //       image: newImage,
  //     });
  //     if (response.status === 200) {
  //       Alert.alert("Profile Updated", "Your profile has been updated successfully.");
  //       navigation.navigate("MyProfile",{username,bio,email,imageData});
  //     }
  //   } catch (error) {
  //     console.error("Error updating profile:", error);
  //     Alert.alert("Error", "There was an error updating your profile. Please try again.");
  //   }
  // };
  const handleUpdate = async () => {
    const responses = await axios.get("http://10.0.0.21:3001/get-userid", {
      params: { username },
    });
    const userId = responses.data.userId;

    try {
      const response = await axios.put(`http://10.0.0.21:3001/user/${userId}`, {
        newUsername: newUsername,
        bio: newBio,
        email: newEmail,
        image: newImage,
      });
  
      if (response.status === 200) {
        Alert.alert("Profile Updated", "Your profile has been updated successfully.");
        navigation.navigate("MyProfile", {
          userId, // Pass the user ID instead of the username
          bio: newBio,
          email: newEmail,
          imageData: newImage,
          username:newUsername
        });
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      Alert.alert("Error", "There was an error updating your profile. Please try again.");
      console.log('userId:', userId); // Add this to see if userId is available

    }
  };
  
  
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={pickImage}>
        <Image
          style={styles.profileImage}
          source={{
            uri: `data:image/jpeg;base64,${newImage}`,
          }}
        />
        <Text style={styles.changeImageText}>Change Profile Image</Text>
      </TouchableOpacity>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={newUsername}
        onChangeText={setNewUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={newEmail}
        onChangeText={setNewEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Bio"
        value={newBio}
        onChangeText={setNewBio}
        multiline
      />
      <Button title="Update Profile" onPress={handleUpdate} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
    paddingTop:70
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: "center",
    marginBottom: 20,
  },
  changeImageText: {
    textAlign: "center",
    color: "#007AFF",
    marginBottom: 20,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    padding: 10,
    marginBottom: 20,
  },
});

export default EditProfileScreen;
