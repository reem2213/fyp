import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
  Image,
  TouchableOpacity,
  ScrollView
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from 'expo-image-picker';
import axios from "axios";
import { DarkModeContext } from "../components/DarkModeContext"; // Import the context

const EditProfile = ({ route,navigation }) => {
  const { username } = route.params;
  const { isDarkMode } = useContext(DarkModeContext); // Use the context

  const [userProfile, setUserProfile] = useState({
    username: "",
    email: "",
    bio: "",
    password: "",
    image: ""
  });

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const response = await axios.get(`http://10.0.0.21:3001/user/${username}`);
      setUserProfile(response.data);
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  const handleInputChange = (field, value) => {
    setUserProfile({ ...userProfile, [field]: value });
  };

  const handleUpdateProfile = async () => {
    try {
      await axios.put(`http://10.0.0.21:3001/user/${username}`, userProfile);
      alert("Profile updated successfully!");
      // Navigate back to profile or any other screen
      navigation.navigate("Profile", { username });
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile.");
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    if (!result.canceled) {
      setUserProfile({ ...userProfile, image: result.assets[0].base64 });
    }
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: isDarkMode ? "black" : "#FAFAFA" }]}>
      <Text style={[styles.label, { color: isDarkMode ? "white" : "black" }]}>Username:</Text>
      <TextInput
        style={styles.input}
        value={userProfile.username}
        onChangeText={(text) => handleInputChange("username", text)}
      />

      <Text style={[styles.label, { color: isDarkMode ? "white" : "black" }]}>Email:</Text>
      <TextInput
        style={styles.input}
        value={userProfile.email}
        onChangeText={(text) => handleInputChange("email", text)}
      />

      <Text style={[styles.label, { color: isDarkMode ? "white" : "black" }]}>Bio:</Text>
      <TextInput
        style={styles.input}
        value={userProfile.bio}
        onChangeText={(text) => handleInputChange("bio", text)}
      />

      <Text style={[styles.label, { color: isDarkMode ? "white" : "black" }]}>Password:</Text>
      <TextInput
        style={styles.input}
        secureTextEntry
        value={userProfile.password}
        onChangeText={(text) => handleInputChange("password", text)}
      />

      <Text style={[styles.label, { color: isDarkMode ? "white" : "black" }]}>Profile Image:</Text>
      <TouchableOpacity onPress={pickImage}>
        <Text style={styles.imagePickerButton}>Pick an image</Text>
      </TouchableOpacity>
      {userProfile.image ? (
        <Image
          source={{ uri: `data:image/jpeg;base64,${userProfile.image}` }}
          style={styles.image}
        />
      ) : null}

      <Button title="Update Profile" onPress={handleUpdateProfile} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 8,
    marginBottom: 16,
    borderRadius: 4,
  },
  imagePickerButton: {
    color: "#0066CC",
    marginBottom: 16,
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 16,
  },
});

export default EditProfile;
