import React, { useEffect, useState } from "react";
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

const imgDir = FileSystem.documentDirectory + "/images";

const ProfileCustomization = ({ navigation, route }) => {
  const [imageUri, setImageUri] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [bioError, setBioError] = useState("");

  useEffect(() => {
    if (route.params && route.params.username) {
      setUsername(route.params.username);
    }
  }, [route.params]);

  const validateForm = () => {
    let isValid = true;

    if (!username.trim()) {
      setUsernameError("Username is required");
      isValid = false;
    } else {
      setUsernameError("");
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
    if (validateForm()) {
      try {
        navigation.navigate("profileTest", { username, bio, imageUri });
      } catch (error) {
        Alert.alert("Error", error.message);
      }
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
        const permissionResult =
          await ImagePicker.requestCameraPermissionsAsync();

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
    <View style={{ backgroundColor: "white", height: "100%" }}>
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
        style={{
          position: "absolute",
          marginLeft: 60,
          marginTop: 230,
          fontWeight: "bold",
          fontSize: 27,
          color: "#1B436F",
        }}
      >
        Customize Your Profile
      </Text>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 120}
      >
        <View style={{ alignItems: "center", top: 300 }}>
          <Image
            source={User}
            style={{
              width: 150,
              height: 150,
              marginBottom: 20,
              //  position: "absolute",

              marginTop: -350,
            }}
          />
          <Image
            source={{ uri: imageUri }}
            style={{
              width: 150,
              height: 150,
              marginBottom: 20,
              borderRadius: 100,
              // position: "absolute",
              marginTop: -170,

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
                  marginLeft: 50,
                  fontWeight: "500",
                  color: "#636363",
                  marginTop: -15,

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
                  marginTop: -55,
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
            style={{
              width: 300,
              height: 40,
              backgroundColor: "#EEEEEE",
              marginBottom: 10,
              paddingHorizontal: 10,
              borderRadius: 10,
            }}
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
            style={{
              width: 300,
              height: 40,
              backgroundColor: "#EEEEEE",
              marginBottom: 10,
              paddingHorizontal: 10,
              borderRadius: 10,
            }}
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
            style={{
              backgroundColor: "#719AEA",
              width: 300,
              paddingTop:5,
              height: 40,
              borderRadius: 30,
            }}
          >
            <Text
              style={{
                color: "white",
                fontSize: 18,
                fontWeight: "500",
                marginLeft: 120,
                marginTop: 5,
              }}
            >
              Confirm
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "#fff",
    paddingHorizontal: 20,
  },
});
export default ProfileCustomization;
