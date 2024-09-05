import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  Modal,
  TextInput,
  Button,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import axios from "axios";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import StarFilled from "../assets/star_filled.png";
import StarCorner from "../assets/star_corner.png";
import FeedbackImage from "../assets/feedbackBg.png";
import Back from "../assets/back.png";
import User from "../assets/user.png";
import { DarkModeContext } from "../components/DarkModeContext";

const Feedback = ({ navigation, route }) => {
  const { username, userId } = route.params;

  const [feedbacks, setFeedbacks] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newType, setNewType] = useState("");
  const [newContent, setNewContent] = useState("");
  const [newRate, setNewRate] = useState("");
  const { isDarkMode } = useContext(DarkModeContext);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await axios.get("http://10.0.0.21:3001/feedback");
        setFeedbacks(response.data);
      } catch (error) {
        console.error("Error fetching feedbacks:", error);
      }
    };
    fetchFeedbacks();
  }, []);

  const handleAddFeedback = async () => {
    if (newType.trim() && newContent.trim()) {
      try {
        const response = await axios.post("http://10.0.0.21:3001/feedback", {
          type: newType,
          content: newContent,
          rating: 2, // Assuming a default rating for new feedbacks
        });
        setFeedbacks([response.data, ...feedbacks]);
        setIsModalVisible(false);
        setNewType("");
        setNewContent("");
      } catch (error) {
        console.error("Error saving feedback:", error);
      }
    }
  };

  const handleRatingChange = async (rating, index) => {
    const feedback = feedbacks[index];
    const updatedFeedbacks = feedbacks.map((fb, idx) => {
      if (idx === index) {
        return { ...fb, rating };
      }
      return fb;
    });
    setFeedbacks(updatedFeedbacks);

    try {
      const response = await axios.put(
        `http://10.0.0.21:3001/feedback/${feedback._id}`,
        {
          rating: rating,
        }
      );
      console.log("Rating updated:", response.data);
    } catch (error) {
      console.error("Error updating rating:", error);
    }
  };

  const backToHome = () => {
    navigation.navigate("Home", { username, userId });
  };

  return (
    <>
      <View
        style={[
          { color: "black", height:"100%" },
          { backgroundColor: isDarkMode ? "black" : "#fff" },
        ]}
      >
        <View style={[styles.container, isDarkMode && styles.darkContainer]}>
          <TouchableOpacity onPress={backToHome}>
            <Image source={Back} style={styles.backButton} />
          </TouchableOpacity>
          <Text style={[styles.header, isDarkMode && styles.darkText]}>
            Feedback Hub
          </Text>
          <Image source={FeedbackImage} style={styles.feedbackImage} />
        </View>

        <Modal
          visible={isModalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setIsModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setIsModalVisible(false)}
              >
                <Text style={styles.closeText}>x</Text>
              </TouchableOpacity>

              <TextInput
                style={[styles.input, isDarkMode && styles.darkInput]}
                placeholder="Enter your type"
                placeholderTextColor={isDarkMode ? "#ccc" : "#000"}
                value={newType}
                onChangeText={(text) => setNewType(text)}
              />
              <TextInput
                style={[styles.input, isDarkMode && styles.darkInput]}
                placeholder="Enter your content"
                placeholderTextColor={isDarkMode ? "#ccc" : "#000"}
                value={newContent}
                onChangeText={(text) => setNewContent(text)}
              />
              <Button title="Add feedback" onPress={handleAddFeedback} />
            </View>
          </View>
        </Modal>

        <GestureHandlerRootView
          style={[
            styles.scrollViewContainer,
            { backgroundColor: isDarkMode ? "black" : "#fff" },
          ]}
        >
          <ScrollView showsVerticalScrollIndicator={false}>
            {feedbacks.map((feedback, index) => (
              <View
                key={index}
                style={[
                  styles.feedbackItem,
                  isDarkMode && styles.darkFeedbackItem,
                ]}
              >
                <Image source={User} style={styles.userIcon} />
                <Text
                  style={[styles.feedbackType, isDarkMode && styles.darkText]}
                >
                  {feedback.type}
                </Text>
                <Text
                  style={[
                    styles.feedbackContent,
                    isDarkMode && styles.darkFeedbackContent,
                  ]}
                >
                  {feedback.content}
                </Text>
                <View style={styles.ratingContainer}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <TouchableOpacity
                      key={star}
                      onPress={() => handleRatingChange(star, index)}
                    >
                      <Image
                        style={styles.star}
                        source={
                          feedback.rating >= star ? StarFilled : StarCorner
                        }
                      />
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            ))}
          </ScrollView>
        </GestureHandlerRootView>
     
      <TouchableOpacity
        style={[
          styles.addFeedbackButton,
          isDarkMode && styles.darkAddFeedbackButton,
        ]}
        onPress={() => setIsModalVisible(true)}
      >
        <Text style={styles.addFeedbackText}>Write Review</Text>
      </TouchableOpacity> 
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFAE64",
    height: "50%",
    borderRadius: 70,
    marginTop: -50,
  },
  darkContainer: {
    backgroundColor: "#FFAE64",
  },
  backButton: {
    position: "absolute",
    marginTop: 110,
    marginLeft: 30,
    width: 30,
    height: 30,
  },
  header: {
    color: "white",
    fontSize: 35,
    fontWeight: "bold",
    position: "absolute",
    marginTop: 150,
    marginLeft: 80,
  },
  feedbackImage: {
    width: 250,
    height: 180,
    marginTop: 200,
    marginLeft: 70,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: 300,
  },
  closeButton: {
    alignSelf: "flex-end",
  },
  closeText: {
    color: "gray",
    fontSize: 25,
  },
  input: {
    height: 40,
    borderColor: "#ddd",
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  darkInput: {
    borderColor: "#555",
    backgroundColor: "#666",
    color: "#fff",
  },
  scrollViewContainer: {
    height: "50%",
    marginTop:10,
    backgroundColor:"#FAFAFA"
  },
  feedbackItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
    backgroundColor: "#FAFAFA",
    width: "85%",
    borderRadius: 15,
    marginLeft: 30,
    marginTop: 10,
    height: 100,
  },
  darkFeedbackItem: {
    backgroundColor: "#1F1F1F",
  },
  userIcon: {
    width: 50,
    height: 50,
    marginLeft: 10,
  },
  feedbackType: {
    fontSize: 15,
    color: "black",
    paddingLeft: 70,
    top: 10,
    position: "absolute",
    // paddingBottom:10
  },
  feedbackContent: {
    fontSize: 10,
    color: "gray",
    width: "60%",
    marginTop: 25,
    marginLeft: 10,
  },
  darkFeedbackContent: {
    color: "#ccc",
  },
  
  ratingContainer: {
    flexDirection: "row",
    marginRight: 60,
    marginTop: -55,
  },
  star: {
    width: 12,
    height: 12,
    resizeMode: "cover",
  },
  addFeedbackButton: {
    width: 250,
    height: 50,
    backgroundColor: "#FFAE64",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    marginTop: 800,
    marginLeft: 70,
  },
  darkAddFeedbackButton: {
    backgroundColor: "#FFAE64",
  },
  addFeedbackText: {
    color: "white",
    fontSize: 18,
  },
  darkText: {
    color: "#fff",
  },
});

export default Feedback;

// import React, { useEffect, useState } from "react";
// import {
//   View, Text, Modal, TextInput, Button, ScrollView, Image, TouchableOpacity, StyleSheet
// } from "react-native";
// import axios from "axios";
// import { GestureHandlerRootView } from "react-native-gesture-handler";

// import StarFilled from "../assets/star_filled.png";
// import StarCorner from "../assets/star_corner.png";
// import FeedbackImage from "../assets/feedbackBg.png";
// import Back from "../assets/back.png";
// import User from "../assets/user.png";

// const Feedback = ({ navigation }) => {
//   const [feedbacks, setFeedbacks] = useState([]);
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const [newType, setNewType] = useState("");
//   const [newContent, setNewContent] = useState("");
//   const [newRate, setNewRate] = useState("");

//   useEffect(() => {
//     const fetchFeedbacks = async () => {
//       try {
//         const response = await axios.get("http://10.0.0.21:3001/feedback");
//         // const feedbacksWithRating = response.data.map(feedback => ({
//         //   ...feedback,
//         //   rating: 2 // default rating for each feedback
//         // }));
//         setFeedbacks(response.data);

//         // setFeedbacks(feedbacksWithRating);
//       } catch (error) {
//         console.error("Error fetching feedbacks:", error);
//       }
//     };
//     fetchFeedbacks();
//   }, []);

//  const handleAddFeedback = async () => {
//   if (newType.trim() && newContent.trim()) {
//     try {
//       const response = await axios.post("http://10.0.0.21:3001/feedback", {
//         type: newType,
//         content: newContent,
//         rating: 2 // Assuming a default rating for new feedbacks
//       });

//       // Prepend the new feedback to the feedbacks array
//       setFeedbacks([response.data, ...feedbacks]);

//       // Reset inputs and close modal
//       setIsModalVisible(false);
//       setNewType("");
//       setNewContent("");
//     } catch (error) {
//       console.error("Error saving feedback:", error);
//     }

//   }
// };

//   const handleRatingChange = async (rating, index) => {
//     const feedback = feedbacks[index];
//     const updatedFeedbacks = feedbacks.map((fb, idx) => {
//       if (idx === index) {
//         return { ...fb, rating };
//       }
//       return fb;
//     });
//     setFeedbacks(updatedFeedbacks);

//     try {
//       const response = await axios.put(`http://10.0.0.21:3001/feedback/${feedback._id}`, {
//         rating: rating
//       });
//       console.log("Rating updated:", response.data);
//     } catch (error) {
//       console.error("Error updating rating:", error);
//     }
//     fetchFeedbacks();
//   };

//   const backToHome = () => {
//     navigation.navigate("Home");
//   };

//   return (
//     <>
//       <View style={styles.container}>
//         <TouchableOpacity onPress={backToHome}>
//           <Image
//             source={Back}
//             style={styles.backButton}
//           />
//         </TouchableOpacity>
//         <Text style={styles.header}>Feedback Hub</Text>
//         <Image
//           source={FeedbackImage}
//           style={styles.feedbackImage}
//         />
//       </View>

//       <Modal
//         visible={isModalVisible}
//         animationType="slide"
//         transparent={true}
//         onRequestClose={() => setIsModalVisible(false)}
//       >
//         <View style={styles.modalContainer}>
//           <View style={styles.modalContent}>
//             <TouchableOpacity
//               style={styles.closeButton}
//               onPress={() => setIsModalVisible(false)}
//             >
//               <Text style={styles.closeText}>x</Text>
//             </TouchableOpacity>

//             <TextInput
//               style={styles.input}
//               placeholder="Enter your type"
//               value={newType}
//               onChangeText={(text) => setNewType(text)}
//             />
//             <TextInput
//               style={styles.input}
//               placeholder="Enter your content"
//               value={newContent}
//               onChangeText={(text) => setNewContent(text)}
//             />

//             <Button
//               title="Add feedback"
//               onPress={handleAddFeedback}
//             />

//           </View>
//         </View>
//       </Modal>

//       <GestureHandlerRootView style={styles.scrollViewContainer}>
//         <ScrollView showsVerticalScrollIndicator={false}>
//           {feedbacks.map((feedback, index) => (
//             <View key={index} style={styles.feedbackItem}>
//               <Image
//                 source={User}
//                 style={styles.userIcon}
//               />
//               <Text style={styles.feedbackType}>{feedback.type}</Text>
//               <Text style={styles.feedbackContent}>{feedback.content}</Text>
//               <View style={styles.ratingContainer}>
//                 {[1, 2, 3, 4, 5].map((star) => (
//                   <TouchableOpacity
//                     key={star}
//                     onPress={() => handleRatingChange(star, index)}
//                   >
//                     <Image
//                       style={styles.star}
//                       source={feedback.rating >= star ? StarFilled : StarCorner}
//                     />
//                   </TouchableOpacity>
//                 ))}
//               </View>
//             </View>
//           ))}
//         </ScrollView>
//       </GestureHandlerRootView>

//       <TouchableOpacity style={styles.addFeedbackButton} onPress={() => setIsModalVisible(true)}>
//         <Text style={styles.addFeedbackText}>Write Review</Text>
//       </TouchableOpacity>
//     </>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: "#FFAE64",
//     height: "50%",
//     borderRadius: 70,
//     marginTop: -50
//   },
//   backButton: {
//     position: "absolute",
//     marginTop: 110,
//     marginLeft: 30,
//     width: 30,
//     height: 30
//   },
//   header: {
//     color: "white",
//     fontSize: 35,
//     fontWeight: "bold",
//     position: "absolute",
//     marginTop: 150,
//     marginLeft: 80
//   },
//   feedbackImage: {
//     width: 250,
//     height: 180,
//     marginTop: 200,
//     marginLeft: 70
//   },
//   modalContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "rgba(0, 0, 0, 0.5)"
//   },
//   modalContent: {
//     backgroundColor: "white",
//     padding: 20,
//     borderRadius: 10,
//     width: 300
//   },
//   closeButton: {
//     alignSelf: "flex-end"
//   },
//   closeText: {
//     color: "gray",
//     fontSize: 25
//   },
//   input: {
//     height: 40,
//     borderColor: "#ddd",
//     borderWidth: 1,
//     marginBottom: 20,
//     paddingHorizontal: 10
//   },
//   scrollViewContainer: {
//     height: "40%"
//   },
//   feedbackItem: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: 15,
//     backgroundColor: "white",
//     width:"85%",
//     borderRadius: 15,
//     marginLeft:30,
//     marginTop:10,
//     height: 80
//   },
//   userIcon: {
//     width: 50,
//     height: 50,
//     marginLeft: 10
//   },
//   feedbackType: {
//     fontSize: 15,
//     color: "black",
//     paddingLeft: 70,
//     top: 5,
//     position: "absolute",
//   },
//   feedbackContent: {
//     fontSize: 10,
//     color: "gray",
//     width: "60%",
//     marginTop: 20,
//     marginLeft: 10,
//   },
//   ratingContainer: {
//     flexDirection: 'row',
//     marginRight: 60,
//     marginTop: -55
//   },
//   star: {
//     width: 12,
//     height: 12,
//     resizeMode: 'cover'
//   },
//   addFeedbackButton: {
//     width: 250,
//     height: 50,
//     backgroundColor: "#FFAE64",
//     borderRadius: 20,
//     alignItems: "center",
//     justifyContent: "center",
//     position: "absolute",
//     marginTop: 670,
//     marginLeft: 70
//   },
//   addFeedbackText: {
//     color: "white",
//     fontSize: 18
//   }
// });

// export default Feedback;
