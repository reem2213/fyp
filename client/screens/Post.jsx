import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Pressable,
  TextInput,
  Modal,
  Button,
  Image,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
const likeImage = require("../assets/like.png");
const likedImage = require("../assets/redHeart.png");
const repostImage = require("../assets/repost.png");
const repostedImage = require("../assets/greenRepost.png");

const App = () => {
  const imgDir = FileSystem.documentDirectory + "/images";


  const [posts, setPosts] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newPostText, setNewPostText] = useState("");
  const [newPostDate, setNewPostDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [likedPosts, setLikedPosts] = useState({});
  const [repostedPosts, setRepostedPosts] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);

  const ensureDirExists = async () => {
    const dirInfo = await FileSystem.getInfoAsync(imgDir);
    if (!dirInfo.exists) {
      await FileSystem.makeDirectoryAsync(imgDir, { intermediates: true });
    }
  };

  const saveImage = async (uri) => {
    const filename = "profile_image.jpg";
    const dest = imgDir + "/" + filename;
    await FileSystem.copyAsync({ from: uri, to: dest });
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get("http://10.0.0.21:3001/posts");
      const postsWithImages = response.data.map((post, index) => ({
        ...post,
        image: post.imageUri || null,
      }));
      setPosts(postsWithImages);

      const initialLikedPosts = {};
      const initialRepostedPosts = {};
      postsWithImages.forEach((post) => {
        initialLikedPosts[post._id] = post.likes > 0;
        initialRepostedPosts[post._id] = post.reposts > 0;
      });
      setLikedPosts(initialLikedPosts);
      setRepostedPosts(initialRepostedPosts);
    } catch (error) {
      console.error(error);
    }
  };

  const addNewPost = async () => {
    try {
      const newPost = {
        text: newPostText,
        date: newPostDate.toLocaleDateString(),
        imageUri: selectedImage,
      };
      const response = await axios.post("http://10.0.0.21:3001/posts", newPost);
      setPosts([...posts, response.data]);
      setModalVisible(false);
      setNewPostText("");
      setNewPostDate(new Date());
      setSelectedImage(null);
    } catch (error) {
      console.error(error);
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
        setSelectedImage(uri);
        saveImage(uri);
      } else {
        alert("You did not select any image.");
      }
    } catch (error) {
      console.log("Error while picking an image:", error);
    }
  };

  const toggleLikePost = async (id) => {
    try {
      const isLiked = likedPosts[id];
      const response = await axios.post(
        `http://10.0.0.21:3001/posts/${id}/toggle-like`,
        { increment: !isLiked }
      );
      const updatedPosts = posts.map((post) =>
        post._id === id ? response.data : post
      );
      setPosts(updatedPosts);
      setLikedPosts({ ...likedPosts, [id]: !isLiked });
    } catch (error) {
      console.error(error);
    }
  };

  const toggleRepostPost = async (id) => {
    try {
      const isReposted = repostedPosts[id];
      const response = await axios.post(
        `http://10.0.0.21:3001/posts/${id}/toggle-repost`,
        { increment: !isReposted }
      );
      const updatedPosts = posts.map((post) =>
        post._id === id ? response.data : post
      );
      setPosts(updatedPosts);
      setRepostedPosts({ ...repostedPosts, [id]: !isReposted });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Posts</Text>
      </View>
      <FlatList
        data={posts}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.post}>
            {item.image && (
              <Image source={{ uri: item.image }} style={styles.postImage} />
            )}
            <Text style={styles.postText}>{item.text}</Text>
            <View style={styles.postFooter}>
              <Text style={styles.postDate}>{item.date}</Text>
              <View style={styles.postIcons}>
                <TouchableOpacity onPress={() => toggleLikePost(item._id)}>
                  <Image
                    source={likedPosts[item._id] ? likedImage : likeImage}
                    style={styles.icon}
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => toggleRepostPost(item._id)}>

                  <Image
                    source={
                      repostedPosts[item._id] ? repostedImage : repostImage
                    }
                    style={styles.icon}
                  />
                </TouchableOpacity>
                {selectedImage && (
            <Image
              source={{ uri: selectedImage }}
              style={{ width: 200, height: 200, marginBottom: 20 }}
            />
          )}


              </View>
            </View>
            
          </View>
        )}
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.addButtonText}>Add Yours!</Text>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Add a New Post</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your post"
            value={newPostText}
            onChangeText={setNewPostText}
          />
          <TouchableOpacity
            onPress={() => setShowDatePicker(true)}
            style={styles.datePickerButton}
          >
            <Text style={styles.datePickerText}>Select Date</Text>
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={newPostDate}
              mode="date"
              display="default"
              onChange={(event, selectedDate) => {
                setShowDatePicker(false);
                if (selectedDate) {
                  setNewPostDate(selectedDate);
                }
              }}
            />
          )}
          <Pressable onPress={() => pickImageAsync(true)}>
            <Text
              style={{
                marginLeft: 0,
                fontWeight: "500",
                color: "#636363",
                marginTop: 20,
                top: -30,
              }}
            >
              Choose a photo
            </Text>
          </Pressable>
          {selectedImage && (
            <Image
              source={{ uri: selectedImage }}
              style={{ width: 200, height: 200, marginBottom: 20 }}
            />
          )}
          <Button title="Add Post" onPress={addNewPost} />
          <Button
            title="Cancel"
            onPress={() => setModalVisible(false)}
            color="red"
          />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  header: {
    padding: 20,
    backgroundColor: "#1DA1F2",
    alignItems: "center",
  },
  headerText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
  },
  post: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 20,
    marginHorizontal: 20,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  postText: {
    fontSize: 16,
    color: "#333",
    marginBottom: 10,
  },
  postFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  postDate: {
    fontSize: 12,
    color: "#888",
  },
  postIcons: {
    flexDirection: "row",
  },
  icon: {
    width: 24,
    height: 24,
    marginLeft: 10,
  },
  addButton: {
    backgroundColor: "#1DA1F2",
    padding: 15,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: 'center',
    position: "absolute",
    bottom: 20,
    right: 140,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    width: "100%",
    paddingHorizontal: 10,
  },
  datePickerButton: {
    marginBottom: 15,
  },
  datePickerText: {
    color: "#1DA1F2",
    fontSize: 16,
  },
});

export default App;




