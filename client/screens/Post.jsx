// import React, { useState, useEffect, useContext } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   FlatList,
//   TouchableOpacity,
//   Pressable,
//   TextInput,
//   Modal,
//   Button,
//   Image,
// } from "react-native";
// import { Alert } from "react-native";

// import DateTimePicker from "@react-native-community/datetimepicker";
// import axios from "axios";
// import * as ImagePicker from "expo-image-picker";
// import * as FileSystem from "expo-file-system";
// import ArrowBack from "../assets/arrowBack.png";
// import PostBg from "../assets/posting.png";
// const likeImage = require("../assets/like.png");
// const likedImage = require("../assets/redHeart.png");
// const repostImage = require("../assets/repost.png");
// const repostedImage = require("../assets/greenRepost.png");
// import { DarkModeContext } from "../components/DarkModeContext";
// import WhiteArrowBack from "../assets/whiteArrowBack.png";

// const App = ({ navigation, route }) => {
//   const { username, userId } = route.params;
//   const { isDarkMode } = useContext(DarkModeContext);
//   const imgDir = FileSystem.documentDirectory + "/images";

//   const GoBack = () => {
//     navigation.navigate("Home", { username, userId });
//   };
//   const [posts, setPosts] = useState([]);
//   const [modalVisible, setModalVisible] = useState(false);
//   const [newPostText, setNewPostText] = useState("");
//   const [newPostDate, setNewPostDate] = useState(new Date());
//   const [showDatePicker, setShowDatePicker] = useState(false);
//   const [likedPosts, setLikedPosts] = useState({});
//   const [repostedPosts, setRepostedPosts] = useState({});
//   const [selectedImage, setSelectedImage] = useState(null);

//   const ensureDirExists = async () => {
//     const dirInfo = await FileSystem.getInfoAsync(imgDir);
//     if (!dirInfo.exists) {
//       await FileSystem.makeDirectoryAsync(imgDir, { intermediates: true });
//     }
//   };

//   const saveImage = async (uri) => {
//     const filename = "profile_image.jpg";
//     const dest = imgDir + "/" + filename;
//     await FileSystem.copyAsync({ from: uri, to: dest });
//   };

//   useEffect(() => {
//     fetchPosts();
//   }, []);

//   const fetchPosts = async () => {
//     try {
//       const response = await axios.get("http://10.0.0.21:3001/posts");
//       const postsWithImages = response.data.map((post) => ({
//         ...post,
//         image: post.image || null,
//       }));
//       setPosts(postsWithImages);

//       const initialLikedPosts = {};
//       const initialRepostedPosts = {};

//       postsWithImages.forEach((post) => {
//         initialLikedPosts[post._id] = (post.likedBy || []).includes(userId); // Check using userId
//         initialRepostedPosts[post._id] = (post.repostedBy || []).includes(
//           userId
//         ); // Check using userId
//       });

//       setLikedPosts(initialLikedPosts);
//       setRepostedPosts(initialRepostedPosts);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const addNewPost = async () => {
//     try {
//       const newPost = {
//         text: newPostText,
//         date: newPostDate.toLocaleDateString(),
//         image: selectedImage, // send the Base64 encoded image
//       };

//       const response = await axios.post("http://10.0.0.21:3001/posts", newPost);

//       setPosts([...posts, response.data]);
//       setModalVisible(false);
//       setNewPostText("");
//       setNewPostDate(new Date());
//       setSelectedImage(null);
//     } catch (error) {
//       console.error("Error creating post:", error);
//     }
//   };

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
//         const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

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
//         const base64Image = await FileSystem.readAsStringAsync(uri, {
//           encoding: FileSystem.EncodingType.Base64,
//         });
//         setSelectedImage(`data:image/jpeg;base64,${base64Image}`);
//         saveImage(uri);
//       } else {
//         alert("You did not select any image.");
//       }
//     } catch (error) {
//       console.log("Error while picking an image:", error);
//     }
//   };

//   const toggleLikePost = async (id) => {
//     try {
//       const isLiked = likedPosts[id];
//       const response = await axios.post(
//         `http://10.0.0.21:3001/posts/${id}/toggle-like`,
//         { userId } // Use userId here
//       );
//       const updatedPosts = posts.map((post) =>
//         post._id === id ? response.data : post
//       );
//       setPosts(updatedPosts);
//       setLikedPosts({ ...likedPosts, [id]: !isLiked });
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const toggleRepostPost = async (id) => {
//     try {
//       const isReposted = repostedPosts[id];
//       const response = await axios.post(
//         `http://10.0.0.21:3001/posts/${id}/toggle-repost`,
//         { userId } // Use userId here
//       );
//       const updatedPosts = posts.map((post) =>
//         post._id === id ? response.data : post
//       );
//       setPosts(updatedPosts);
//       setRepostedPosts({ ...repostedPosts, [id]: !isReposted });
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const renderRepostText = (repostedBy) => {
//     if (!Array.isArray(repostedBy) || repostedBy.length === 0) return null;
//     if (repostedBy.length === 1) return `${repostedBy[0]} reposted this post`;
//     return `${repostedBy[0]} and ${repostedBy.length -
//       1} others reposted this post`;
//   };

//   const renderLikedText = (likedBy) => {
//     if (!Array.isArray(likedBy) || likedBy.length === 0) return null;
//     if (likedBy.length === 1) return `${likedBy[0]} liked this post`;
//     return `${likedBy[0]} and ${likedBy.length - 1} others liked this post`;
//   };

//   const handleRepostedUsersClick = async (repostedBy) => {
//     try {
//       const response = await axios.post("http://10.0.0.21:3001/get-usernames", {
//         userIds: repostedBy,
//       });

//       const usernames = response.data;

//       Alert.alert("Reposts",`Reposted by: ${usernames.join(", ")}`, [
//         { text: 'Oki', onPress: () => console.log("OK Pressed") },
//       ]);

//       // alert(`Reposted by: ${usernames.join(", ")}`);
//     } catch (error) {
//       console.error("Error fetching usernames:", error);
//       alert("Error fetching usernames");
//     }
//   };

//   const handleLikedUsersClick = async (likedBy) => {
//     try {
//       const response = await axios.post("http://10.0.0.21:3001/get-usernames", {
//         userIds: likedBy,
//       });

//       const usernames = response.data;
//       alert(`liked by: ${usernames.join(", ")}`);
//     } catch (error) {
//       console.error("Error fetching usernames:", error);
//       alert("Error fetching usernames");
//     }
//   };

//   return (
//     <View
//       style={[
//         styles.container,
//         { backgroundColor: isDarkMode ? "black" : "#fff" },
//       ]}
//     >
//       <View
//         style={[
//           styles.header,
//           { backgroundColor: isDarkMode ? "black" : "#fff" },
//         ]}
//       >
//         <Pressable onPress={GoBack}>
//           <Image
//             style={styles.notiImage}
//             source={isDarkMode ? WhiteArrowBack : ArrowBack}
//           />
//         </Pressable>
//         <Image
//           style={styles.ellipseIcon}
//           contentFit="cover"
//           source={
//             isDarkMode
//               ? require("../assets/grayEllipse.png")
//               : require("../assets/blueEllipse.png")
//           }
//         />
//         <Text
//           style={[
//             styles.headerText,
//             { color: isDarkMode ? "#fff" : "#1B436F" },
//           ]}
//         >
//           Posts
//         </Text>
//         <Image
//           source={PostBg}
//           style={[
//             { width: 250, height: 250 },
//             { backgroundColor: isDarkMode ? "black" : "#fff" },
//           ]}
//         />
//       </View>
//       <Text
//         style={[styles.headerText2, { color: isDarkMode ? "#fff" : "#1B436F" }]}
//       >
//         Top Posts
//       </Text>
//       <FlatList
//         data={posts}
//         keyExtractor={(item) => item._id}
//         renderItem={({ item }) => (
//           <View
//             style={[
//               styles.post,
//               { backgroundColor: isDarkMode ? "#333" : "#F4F7FC" },
//             ]}
//           >
//             <Text
//               style={[styles.postText, { color: isDarkMode ? "#fff" : "#333" }]}
//             >
//               {item.text}
//             </Text>
//             <View style={styles.postFooter}>
//               <Text
//                 style={[
//                   styles.postDate,
//                   { color: isDarkMode ? "#ccc" : "#888" },
//                 ]}
//               >
//                 {item.date}
//               </Text>
//               <View style={styles.postIcons}>
//                 <TouchableOpacity onPress={() => toggleLikePost(item._id)}>
//                   <Image
//                     source={likedPosts[item._id] ? likedImage : likeImage} // Red heart for liked
//                     style={styles.icon}
//                   />
//                 </TouchableOpacity>
//                 <Text
//                   style={[
//                     styles.postLikes,
//                     { color: isDarkMode ? "#fff" : "#000" },
//                   ]}
//                   onPress={() => handleLikedUsersClick(item.likedBy)}
//                 >
//                   {item.likes}
//                 </Text>
//                 <Text
//                   style={[
//                     styles.likedBy,
//                     { color: isDarkMode ? "#fff" : "#000" },
//                   ]}
//                   onPress={() => handleLikedUsersClick(item.likedBy)}
//                 >
//                   {/* {renderLikedText(item.likedBy)} */}
//                 </Text>
//                 <TouchableOpacity onPress={() => toggleRepostPost(item._id)}>
//                   <Image
//                     source={
//                       repostedPosts[item._id] ? repostedImage : repostImage // Green repost for reposted
//                     }
//                     style={styles.icon}
//                   />
//                 </TouchableOpacity>
//                 <Text
//                   style={[
//                     styles.postReposts,
//                     { color: isDarkMode ? "#fff" : "#000" },
//                   ]}
//                   onPress={() => handleRepostedUsersClick(item.repostedBy)}
//                 >
//                   {item.reposts}
//                 </Text>
//                 <Text
//                   style={[
//                     styles.repostedBy,
//                     { color: isDarkMode ? "#fff" : "#000" },
//                   ]}
//                   onPress={() => handleRepostedUsersClick(item.repostedBy)}
//                 >
//                   {/* {renderRepostText(item.repostedBy)} */}
//                 </Text>
//               </View>
//             </View>
//             {item.image && (
//               <Image source={{ uri: item.image }} style={styles.postImage} />
//             )}
//           </View>
//         )}
//       />
//       <TouchableOpacity
//         style={[
//           styles.addButton,
//           { backgroundColor: isDarkMode ? "#444" : "#719AEA" },
//         ]}
//         onPress={() => setModalVisible(true)}
//       >
//         <Text style={styles.addButtonText}>Add Yours!</Text>
//       </TouchableOpacity>
//       <Modal
//         animationType="slide"
//         transparent={true}
//         visible={modalVisible}
//         onRequestClose={() => {
//           setModalVisible(!modalVisible);
//         }}
//       >
//         <View
//           style={[
//             styles.modalView,
//             { backgroundColor: isDarkMode ? "#333" : "white" },
//           ]}
//         >
//           <Text
//             style={[styles.modalText, { color: isDarkMode ? "#fff" : "#000" }]}
//           >
//             Add a New Post
//           </Text>
//           <TextInput
//             style={[
//               styles.input,
//               {
//                 borderColor: isDarkMode ? "#555" : "#ccc",
//                 color: isDarkMode ? "#fff" : "#000",
//               },
//             ]}
//             placeholder="Enter your post"
//             value={newPostText}
//             onChangeText={setNewPostText}
//           />

//           <Pressable onPress={() => pickImageAsync(true)}>
//             <Text
//               style={{
//                 marginLeft: 0,
//                 fontWeight: "500",
//                 color: "#636363",
//                 marginTop: 20,
//                 top: -30,
//               }}
//             >
//               Choose a photo
//             </Text>
//           </Pressable>
//           {selectedImage && (
//             <Image
//               source={{ uri: selectedImage }}
//               style={{ width: 200, height: 200, marginBottom: 20 }}
//             />
//           )}
//           <Button title="Add Post" onPress={addNewPost} />
//           <Button
//             title="Cancel"
//             onPress={() => setModalVisible(false)}
//             color="red"
//           />
//         </View>
//       </Modal>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   // Define your styles here
//   container: {
//     flex: 1,
//   },
//   ellipseIcon: {
//     position: "absolute",
//     left: 320,
//     width: 150,
//     height: 150,
//     top: -15,
//   },
//   notiImage: {
//     position: "absolute",
//     top: 20,
//     left: -180,
//     width: 30,
//     height: 30,
//   },
//   header: {
//     padding: 20,
//     backgroundColor: "white",
//     alignItems: "center",
//   },
//   headerText: {
//     fontSize: 45,
//     fontWeight: "bold",
//     color: "#1B436F",
//     marginTop: 50,
//   },
//   headerText2: {
//     fontSize: 25,
//     fontWeight: "bold",
//     color: "#1B436F",
//     left: 20,
//     marginTop: 20,
//   },

//   post: {
//     backgroundColor: "#F4F7FC",
//     borderRadius: 10,
//     padding: 20,
//     marginHorizontal: 20,
//     marginVertical: 10,
//     elevation: 2,
//   },
//   postText: {
//     fontSize: 16,
//     color: "#333",
//     marginBottom: 10,
//   },
//   postFooter: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//   },
//   postDate: {
//     fontSize: 12,
//     color: "#888",
//   },
//   postIcons: {
//     flexDirection: "col",
//   },
//   icon: {
//     width: 24,
//     height: 24,
//     marginLeft: 10,
//   },
//   postImage: {
//     width: "100%",
//     height: 200,
//     marginTop: 10,
//     borderRadius: 10,
//   },
//   addButton: {
//     backgroundColor: "#719AEA",
//     padding: 15,
//     borderRadius: 30,
//     alignItems: "center",
//     justifyContent: "center",
//     position: "absolute",
//     bottom: 20,
//     right: 100,
//     width: 200,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 5,
//     elevation: 5,
//   },
//   addButtonText: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "bold",
//   },
//   modalView: {
//     margin: 20,
//     backgroundColor: "white",
//     borderRadius: 20,
//     padding: 35,
//     alignItems: "center",
//     shadowColor: "#000",
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 4,
//     elevation: 5,
//   },
//   modalText: {
//     marginBottom: 15,
//     textAlign: "center",
//     fontSize: 18,
//     fontWeight: "bold",
//   },
//   input: {
//     height: 40,
//     borderColor: "#ccc",
//     borderWidth: 1,
//     borderRadius: 5,
//     marginBottom: 15,
//     width: "100%",
//     paddingHorizontal: 10,
//   },
//   datePickerButton: {
//     marginBottom: 15,
//   },
//   datePickerText: {
//     color: "#1DA1F2",
//     fontSize: 16,
//   },
// });

// export default App;
import React, { useState, useEffect, useContext } from "react";
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
  ScrollView,
} from "react-native";
import AwesomeAlert from "react-native-awesome-alerts";
import DateTimePicker from "@react-native-community/datetimepicker";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import ArrowBack from "../assets/arrowBack.png";
import PostBg from "../assets/posting.png";
const likeImage = require("../assets/like.png");
const likedImage = require("../assets/redHeart.png");
const repostImage = require("../assets/repost.png");
const repostedImage = require("../assets/greenRepost.png");
import { DarkModeContext } from "../components/DarkModeContext";
import WhiteArrowBack from "../assets/whiteArrowBack.png";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const App = ({ navigation, route }) => {
  const { username, userId } = route.params;
  const { isDarkMode } = useContext(DarkModeContext);
  const imgDir = FileSystem.documentDirectory + "/images";

  const GoBack = () => {
    navigation.navigate("Home", { username, userId });
  };

  const [posts, setPosts] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newPostText, setNewPostText] = useState("");
  const [newPostDate, setNewPostDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [likedPosts, setLikedPosts] = useState({});
  const [repostedPosts, setRepostedPosts] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [alertTitle, setAlertTitle] = useState("");
  const [alertMessage, setAlertMessage] = useState("");

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
      const postsWithImages = response.data.map((post) => ({
        ...post,
        image: post.image || null,
      }));
      setPosts(postsWithImages);

      const initialLikedPosts = {};
      const initialRepostedPosts = {};

      postsWithImages.forEach((post) => {
        initialLikedPosts[post._id] = (post.likedBy || []).includes(userId);
        initialRepostedPosts[post._id] = (post.repostedBy || []).includes(
          userId
        );
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
        image: selectedImage,
      };

      const response = await axios.post("http://10.0.0.21:3001/posts", newPost);

      setPosts([...posts, response.data]);
      setModalVisible(false);
      setNewPostText("");
      setNewPostDate(new Date());
      setSelectedImage(null);
    } catch (error) {
      console.error("Error creating post:", error);
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
          setAlertTitle("Permission Denied");
          setAlertMessage("Permission denied to access camera!");
          setShowAlert(true);
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
        setSelectedImage(`data:image/jpeg;base64,${base64Image}`);
        saveImage(uri);
      } else {
        setAlertTitle("No Image Selected");
        setAlertMessage("You did not select any image.");
        setShowAlert(true);
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
        { userId }
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
        { userId }
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

  const handleRepostedUsersClick = async (repostedBy) => {
    try {
      const response = await axios.post("http://10.0.0.21:3001/get-usernames", {
        userIds: repostedBy,
      });

      const usernames = response.data;

      setAlertTitle("Reposts");
      setAlertMessage(`Reposted by: ${usernames.join(", ")}`);
      setShowAlert(true);
    } catch (error) {
      console.error("Error fetching usernames:", error);
      setAlertTitle("Error");
      setAlertMessage("Error fetching usernames");
      setShowAlert(true);
    }
  };

  const handleLikedUsersClick = async (likedBy) => {
    try {
      const response = await axios.post("http://10.0.0.21:3001/get-usernames", {
        userIds: likedBy,
      });

      const usernames = response.data;

      setAlertTitle("Likes");
      setAlertMessage(`Liked by: ${usernames.join(", ")}`);
      setShowAlert(true);
    } catch (error) {
      console.error("Error fetching usernames:", error);
      setAlertTitle("Error");
      setAlertMessage("Error fetching usernames");
      setShowAlert(true);
    }
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isDarkMode ? "black" : "#fff" },
      ]}
    >
      <View
        style={[
          styles.header,
          { backgroundColor: isDarkMode ? "black" : "#fff" },
        ]}
      >
        <Pressable onPress={GoBack}>
          <Image
            style={styles.notiImage}
            source={isDarkMode ? WhiteArrowBack : ArrowBack}
          />
        </Pressable>
        <Image
          style={styles.ellipseIcon}
          contentFit="cover"
          source={
            isDarkMode
              ? require("../assets/DarkEllipse.png")
              : require("../assets/blueEllipse.png")
          }
        />
        <Text
          style={[
            styles.headerText,
            { color: isDarkMode ? "#fff" : "#1B436F" },
          ]}
        >
          Posts
        </Text>
        <Image
          source={PostBg}
          style={[
            { width: 200, height: 200 },
            { backgroundColor: isDarkMode ? "black" : "#fff" },
          ]}
        />
      </View>
      <Text
        style={[styles.headerText2, { color: isDarkMode ? "#fff" : "#1B436F" }]}
      >
        Top Posts
      </Text>
      <GestureHandlerRootView style={{ height: "50%" }}>
        <FlatList
          data={posts}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <View
              style={[
                styles.post,
                { backgroundColor: isDarkMode ? "#333" : "#F4F7FC" },
              ]}
            >
              {item.image && (
                <Image source={{ uri: item.image }} style={styles.postImage} />
              )}
              <Text
                style={[
                  styles.postText,
                  { color: isDarkMode ? "#fff" : "#333" },
                ]}
              >
                {item.text}
              </Text>
              <View style={styles.postFooter}>
                <Text
                  style={[
                    styles.postDate,
                    { color: isDarkMode ? "#ccc" : "#888" },
                  ]}
                >
                  {item.date}
                </Text>
                <View style={styles.postIcons}>
                  <TouchableOpacity onPress={() => toggleLikePost(item._id)}>
                    <Image
                      source={likedPosts[item._id] ? likedImage : likeImage}
                      style={styles.icon}
                    />
                  </TouchableOpacity>
                  <Text
                    style={[
                      styles.postLikes,
                      { color: isDarkMode ? "#fff" : "#000" },
                    ]}
                    onPress={() => handleLikedUsersClick(item.likedBy)}
                  >
                    {item.likes}
                  </Text>
                  <TouchableOpacity onPress={() => toggleRepostPost(item._id)}>
                    <Image
                      source={
                        repostedPosts[item._id] ? repostedImage : repostImage
                      }
                      style={styles.icon}
                    />
                  </TouchableOpacity>
                  <Text
                    style={[
                      styles.postReposts,
                      { color: isDarkMode ? "#fff" : "#000" },
                    ]}
                    onPress={() => handleRepostedUsersClick(item.repostedBy)}
                  >
                    {item.reposts}
                  </Text>
                </View>
              </View>
            </View>
          )}
        />
      </GestureHandlerRootView>
      <TouchableOpacity
        style={[
          styles.addButton,
          { backgroundColor: isDarkMode ? "#011C4F" : "#719AEA" },
        ]}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.addButtonText}>Add Yours!</Text>
      </TouchableOpacity>
      {/* <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View
          style={[
            styles.modalView,
            { backgroundColor: isDarkMode ? "#333" : "white" },
          ]}
        >
          <Text
            style={[styles.modalText, { color: isDarkMode ? "#fff" : "#000" }]}
          >
            Add a New Post
          </Text>
          <TextInput
            style={[
              styles.input,
              {
                borderColor: isDarkMode ? "#555" : "#ccc",
                color: isDarkMode ? "#fff" : "#000",
              },
            ]}
            placeholder="Enter your post"
            value={newPostText}
            onChangeText={setNewPostText}
          />

          <Pressable onPress={() => pickImageAsync(true)}>
            <Text
              style={{
                marginLeft: 0,
                fontWeight: "500",
                color: "#636363",
                marginTop: 20,
                top: -20,
              }}
            >
              Choose a photo
            </Text>
          </Pressable>
          {selectedImage && (
            <Image
              source={{ uri: selectedImage }}
              style={{ width: 200, height: 200, marginBottom: 20,borderRadius:20 }}
            />
          )}
          <View style={{ flexDirection: "row" }}>
          <TouchableOpacity onPress={() => setModalVisible(false)} style={{backgroundColor:"red",padding:10,right:75,borderRadius:15}}>
            <Text style={{color:"white"}}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={addNewPost} style={{backgroundColor:"#719AEA",padding:10,left:75,borderRadius:15}}>
            <Text style={{color:"white"}}>Add POST</Text>
          </TouchableOpacity>
            
          </View>
        </View>
      </Modal> */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalContainer}>
          <View
            style={[
              styles.modalView,
              { backgroundColor: isDarkMode ? "#333" : "white" },
            ]}
          >
            <Text
              style={[
                styles.modalText,
                { color: isDarkMode ? "#fff" : "#000" },
              ]}
            >
              Add a New Post
            </Text>
            <TextInput
              style={[
                styles.input,
                {
                  borderColor: isDarkMode ? "#555" : "#ccc",
                  color: isDarkMode ? "#fff" : "#000",
                },
              ]}
              placeholder="Enter your post"
              value={newPostText}
              onChangeText={setNewPostText}
            />

            <Pressable onPress={() => pickImageAsync(true)}>
              <Text
                style={[{
                  marginLeft: 0,
                  fontWeight: "500",
                  marginTop: 20,
                  top: -20,
                },{color: isDarkMode ? "white" : "#636363",}]}
              >
                Choose a photo
              </Text>
            </Pressable>
            {selectedImage && (
              <Image
                source={{ uri: selectedImage }}
                style={{
                  width: 200,
                  height: 200,
                  marginBottom: 20,
                  borderRadius: 20,
                }}
              />
            )}
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={{
                  backgroundColor: "red",
                  padding: 10,
                  right: 75,
                  borderRadius: 15,
                }}
              >
                <Text style={{ color: "white" }}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={addNewPost}
                style={{
                  backgroundColor:
                    newPostText || selectedImage ? "#719AEA" : "#aaa",
                  padding: 10,
                  left: 75,
                  borderRadius: 15,
                }}
                disabled={!newPostText && !selectedImage}
              >
                <Text style={{ color: "white" }}>Add POST</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <AwesomeAlert
        show={showAlert}
        showProgress={false}
        title={alertTitle}
        message={alertMessage}
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showCancelButton={false}
        showConfirmButton={true}
        confirmText="Okay"
        confirmButtonColor="#DD6B55"
        onConfirmPressed={() => setShowAlert(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  ellipseIcon: {
    position: "absolute",
    left: 320,
    width: 150,
    height: 150,
    top: -15,
    borderRadius:200

   
  },
  notiImage: {
    position: "absolute",
    top: 20,
    left: -180,
    width: 30,
    height: 30,
  },
  header: {
    padding: 20,
    backgroundColor: "white",
    alignItems: "center",
  },
  headerText: {
    fontSize: 45,
    fontWeight: "bold",
    color: "#1B436F",
    marginTop: 50,
  },
  headerText2: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#1B436F",
    left: 20,
    marginTop: 0,
  },
  modalContainer: {
    flex: 1,

    backgroundColor: "rgba(0, 0, 0, 0.5)", // semi-transparent background
  },
  post: {
    backgroundColor: "#F4F7FC",
    borderRadius: 10,
    padding: 20,
    marginHorizontal: 20,
    marginVertical: 10,
    elevation: 2,
  },
  postText: {
    fontSize: 16,
    color: "#333",
    marginBottom: 10,
    left: 5,
    top: 7,
  },
  postFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  postDate: {
    fontSize: 12,
    color: "#888",
    left: 280,
    top: 5,
  },
  postIcons: {
    flexDirection: "row",
    right: 240,
    top: 5,
  },
  icon: {
    width: 24,
    height: 24,
    marginLeft: 20,
  },
  postImage: {
    width: "100%",
    height: 200,
    marginTop: 10,
    borderRadius: 10,
  },
  postLikes: {
    left: 5,
    top: 2,
  },
  postReposts: {
    left: 5,
    top: 2,
  },
  addButton: {
    backgroundColor: "#719AEA",
    padding: 15,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 10,
    right: 100,
    width: 200,
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
    top: 200,
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
