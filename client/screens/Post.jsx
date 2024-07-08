// import React, { useState, useEffect } from 'react';
// import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, Modal, Button } from 'react-native';
// import Icon from 'react-native-vector-icons/FontAwesome';
// import DateTimePicker from '@react-native-community/datetimepicker';
// import axios from 'axios';

// const App = () => {
//   const [posts, setPosts] = useState([]);
//   const [modalVisible, setModalVisible] = useState(false);
//   const [newPostText, setNewPostText] = useState('');
//   const [newPostDate, setNewPostDate] = useState(new Date());
//   const [showDatePicker, setShowDatePicker] = useState(false);
//   const [likedPosts, setLikedPosts] = useState({});
//   const [repostedPosts, setRepostedPosts] = useState({});

//   useEffect(() => {
//     fetchPosts();
//   }, []);

//   const fetchPosts = async () => {
//     try {
//       const response = await axios.get('http://10.0.0.21:3001/posts');
//       setPosts(response.data);
//     } catch (error) {
//       console.error(error);
//     }

//   };

//   const addNewPost = async () => {
//     try {
//       const newPost = {
//         text: newPostText,
//         date: newPostDate.toLocaleDateString(),
//       };
//       const response = await axios.post('http://10.0.0.21:3001/posts', newPost);
//       setPosts([...posts, response.data]);
//       setModalVisible(false);
//       setNewPostText('');
//       setNewPostDate(new Date());
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const toggleLikePost = async (id) => {
//     try {
//       const isLiked = likedPosts[id];
//       const response = await axios.post(`http://10.0.0.21:3001/posts/${id}/toggle-like`, { increment: !isLiked });
//       const updatedPosts = posts.map(post => post._id === id ? response.data : post);
//       setPosts(updatedPosts);
//       setLikedPosts({ ...likedPosts, [id]: !isLiked });
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const toggleRepostPost = async (id) => {
//     try {
//       const isReposted = repostedPosts[id];
//       const response = await axios.post(`http://10.0.0.21:3001/posts/${id}/toggle-repost`, { increment: !isReposted });
//       const updatedPosts = posts.map(post => post._id === id ? response.data : post);
//       setPosts(updatedPosts);
//       setRepostedPosts({ ...repostedPosts, [id]: !isReposted });
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <Text style={styles.headerText}>Posts</Text>
//       </View>
//       <FlatList
//         data={posts}
//         keyExtractor={(item) => item._id}
//         renderItem={({ item }) => (
//           <View style={styles.post}>
//             <Text style={styles.postText}>{item.text}</Text>
//             <View style={styles.postFooter}>
//               <Text style={styles.postDate}>{item.date}</Text>
//               <View style={styles.postIcons}>
//                 <TouchableOpacity onPress={() => toggleLikePost(item._id)}>
//                   <Icon name="heart" size={20} style={[styles.icon, likedPosts[item._id] ? styles.iconLiked : null]} />
//                 </TouchableOpacity>
//                 <TouchableOpacity onPress={() => toggleRepostPost(item._id)}>
//                   <Icon name="retweet" size={20} style={[styles.icon, repostedPosts[item._id] ? styles.iconReposted : null]} />
//                 </TouchableOpacity>
//               </View>
//             </View>
//           </View>
//         )}
//       />
//       <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
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
//         <View style={styles.modalView}>
//           <Text style={styles.modalText}>Add a New Post</Text>
//           <TextInput
//             style={styles.input}
//             placeholder="Enter your post"
//             value={newPostText}
//             onChangeText={setNewPostText}
//           />
//           <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.datePickerButton}>
//             <Text style={styles.datePickerText}>Select Date</Text>
//           </TouchableOpacity>
//           {showDatePicker && (
//             <DateTimePicker
//               value={newPostDate}
//               mode="date"
//               display="default"
//               onChange={(event, selectedDate) => {
//                 setShowDatePicker(false);
//                 if (selectedDate) {
//                   setNewPostDate(selectedDate);
//                 }
//               }}
//             />
//           )}
//           <Button title="Add Post" onPress={addNewPost} />
//           <Button title="Cancel" onPress={() => setModalVisible(false)} color="red" />
//         </View>
//       </Modal>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   header: {
//     padding: 20,
//     backgroundColor: '#F0F0F0',
//     alignItems: 'center',
//   },
//   headerText: {
//     fontSize: 24,
//     fontWeight: 'bold',
//   },
//   post: {
//     padding: 20,
//     borderBottomWidth: 1,
//     borderBottomColor: '#ccc',
//   },
//   postText: {
//     fontSize: 16,
//   },
//   postFooter: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginTop: 10,
//   },
//   postDate: {
//     fontSize: 12,
//     color: '#888',
//   },
//   postIcons: {
//     flexDirection: 'row',
//   },
//   icon: {
//     marginLeft: 10,
//   },
//   iconLiked: {
//     color: 'red',
//   },
//   iconReposted: {
//     color: 'green',
//   },
//   addButton: {
//     backgroundColor: '#007BFF',
//     padding: 15,
//     alignItems: 'center',
//   },
//   addButtonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   modalView: {
//     margin: 20,
//     backgroundColor: 'white',
//     borderRadius: 20,
//     padding: 35,
//     alignItems: 'center',
//     shadowColor: '#000',
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
//     textAlign: 'center',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   input: {
//     height: 40,
//     borderColor: '#ccc',
//     borderWidth: 1,
//     borderRadius: 5,
//     marginBottom: 15,
//     width: '100%',
//     paddingHorizontal: 10,
//   },
//   datePickerButton: {
//     marginBottom: 15,
//   },
//   datePickerText: {
//     color: '#007BFF',
//     fontSize: 16,
//   },
// });

// export default App;

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, Modal, Button, Image } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';

const likeImage = require('../assets/whiteHeart.png');
const likedImage = require('../assets/redHeart.png');
const repostImage = require('../assets/repost.png');
const repostedImage = require('../assets/greenRepost.png');


const App = () => {
  const [posts, setPosts] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newPostText, setNewPostText] = useState('');
  const [newPostDate, setNewPostDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [likedPosts, setLikedPosts] = useState({});
  const [repostedPosts, setRepostedPosts] = useState({});

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get('http://10.0.0.21:3001/posts');
      setPosts(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const addNewPost = async () => {
    try {
      const newPost = {
        text: newPostText,
        date: newPostDate.toLocaleDateString(),
      };
      const response = await axios.post('http://10.0.0.21:3001/posts', newPost);
      setPosts([...posts, response.data]);
      setModalVisible(false);
      setNewPostText('');
      setNewPostDate(new Date());
    } catch (error) {
      console.error(error);
    }
  };

  const toggleLikePost = async (id) => {
    try {
      const isLiked = likedPosts[id];
      const response = await axios.post(`http://10.0.0.21:3001/posts/${id}/toggle-like`, { increment: !isLiked });
      const updatedPosts = posts.map(post => post._id === id ? response.data : post);
      setPosts(updatedPosts);
      setLikedPosts({ ...likedPosts, [id]: !isLiked });
    } catch (error) {
      console.error(error);
    }
  };

  const toggleRepostPost = async (id) => {
    try {
      const isReposted = repostedPosts[id];
      const response = await axios.post(`http://10.0.0.21:3001/posts/${id}/toggle-repost`, { increment: !isReposted });
      const updatedPosts = posts.map(post => post._id === id ? response.data : post);
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
                    source={repostedPosts[item._id] ? repostedImage : repostImage}
                    style={styles.icon}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      />
      <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
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
          <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.datePickerButton}>
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
          <Button title="Add Post" onPress={addNewPost} />
          <Button title="Cancel" onPress={() => setModalVisible(false)} color="red" />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 20,
    backgroundColor: '#F0F0F0',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  post: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  postText: {
    fontSize: 16,
  },
  postFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  postDate: {
    fontSize: 12,
    color: '#888',
  },
  postIcons: {
    flexDirection: 'row',
  },
  icon: {
    width: 20,
    height: 20,
    marginLeft: 10,
  },
  addButton: {
    backgroundColor: '#007BFF',
    padding: 15,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
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
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    width: '100%',
    paddingHorizontal: 10,
  },
  datePickerButton: {
    marginBottom: 15,
  },
  datePickerText: {
    color: '#007BFF',
    fontSize: 16,
  },
});

export default App;
