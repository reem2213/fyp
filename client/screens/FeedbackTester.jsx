// import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
// import React, { useEffect, useState } from "react";
// import StarFilled from "../assets/star_filled.png";
// import StarCorner from "../assets/star_corner.png";
// const FeedbackTester = () => {
//   const [defaultRating, setDefaultRating] = useState(2);
//   const [maxRating, setMaxRating] = useState([1, 2, 3, 4, 5]);
//   const starImgFilled =
//     "https://github.com/tranhonghan/images/blob/main/star_filled.png?raw=true";
//   const starImgCorner =
//     "https://github.com/tranhonghan/images/blob/main/star_corner.png?raw=true";

//   return (
//     <>
//       <View style={styles.customizeRatingBar}>
//         {maxRating.map((item, key) => {
//           return (
//             <>
//               <TouchableOpacity
//                 activeOpacity={0.7}
//                 key={item}
//                 onPress={() => setDefaultRating(item)}
//               >
//                 <Image
//                   style={styles.Imgrating}
//                   source={
//                     item <= defaultRating
//                       ? { uri: starImgFilled }
//                       : { uri: starImgCorner }
//                   }
//                 />
//               </TouchableOpacity>
//             </>
//           );
//         })}
//       </View>
//       <Text style={{ marginLeft: 50, marginTop: 150 }}>
//         {defaultRating + "/" + maxRating.length}
//       </Text>
//     </>
//   );
// };
// const styles = StyleSheet.create({
//   customizeRatingBar: {
//     justifyContent: "center",
//     flexDirection: "row",
//     marginTop: 30,
//   },
//   Imgrating: {
//     width: 40,
//     height: 40,
//     resizeMode: "cover",
//   },
// });

// export default FeedbackTester;













// import React, { useEffect, useState } from "react";
// import {
//   View, Text, Modal, TextInput, Button, ScrollView, Image, TouchableOpacity, StyleSheet
// } from "react-native";
// import axios from "axios";
// import { GestureHandlerRootView } from "react-native-gesture-handler";

// // Import images
// import StarFilled from "../assets/star_filled.png";
// import StarCorner from "../assets/star_corner.png";
// import FeedbackImage from "../assets/feedbackBg.png";
// import Back from "../assets/back.png";
// import User from "../assets/user.png";

// const Feedback = ({ navigation }) => {
//   const [feedbacks, setFeedbacks] = useState([]);

//   useEffect(() => {
//     const fetchFeedbacks = async () => {
//       try {
//         const response = await axios.get("http://10.0.0.21:3001/feedback");
//         const feedbacksWithRating = response.data.map(feedback => ({
//           ...feedback,
//           rating: 2 // default rating for each feedback
//         }));
//         setFeedbacks(feedbacksWithRating);
//       } catch (error) {
//         console.error("Error fetching feedbacks:", error);
//       }
//     };
//     fetchFeedbacks();
//   }, []);

//   const handleRatingChange = (rating, index) => {
//     const updatedFeedbacks = feedbacks.map((feedback, idx) => {
//       if (idx === index) {
//         return { ...feedback, rating };
//       }
//       return feedback;
//     });
//     setFeedbacks(updatedFeedbacks);
//   };

//   return (
//     <View style={{ flex: 1 }}>
//       <ScrollView>
//         {feedbacks.map((feedback, index) => (
//           <View key={index} style={styles.feedbackItem}>
//             <Text>{feedback.type}</Text>
//             <Text>{feedback.content}</Text>
//             <View style={styles.ratingContainer}>
//               {[1, 2, 3, 4, 5].map((star) => (
//                 <TouchableOpacity
//                   key={star}
//                   onPress={() => handleRatingChange(star, index)}
//                 >
//                   <Image
//                     style={styles.star}
//                     source={feedback.rating >= star ? StarFilled : StarCorner}
//                   />
//                 </TouchableOpacity>
//               ))}
//             </View>
//           </View>
//         ))}
//       </ScrollView>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   feedbackItem: {
//     padding: 10,
//     borderBottomWidth: 1,
//     borderBottomColor: '#ccc'
//   },
//   ratingContainer: {
//     flexDirection: 'row'
//   },
//   star: {
//     width: 30,
//     height: 30
//   }
// });

// export default Feedback;





import React, { useEffect, useState } from "react";
import {
  View, Text, Modal, TextInput, Button, ScrollView, Image, TouchableOpacity, StyleSheet
} from "react-native";
import axios from "axios";
import { GestureHandlerRootView } from "react-native-gesture-handler";

// Local imports for assets - ensure paths are correct
import StarFilled from "../assets/star_filled.png";
import StarCorner from "../assets/star_corner.png";
import FeedbackImage from "../assets/feedbackBg.png";
import Back from "../assets/back.png";
import User from "../assets/user.png";

const Feedback = ({ navigation }) => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newType, setNewType] = useState("");
  const [newContent, setNewContent] = useState("");
  const [newRate, setNewRate] = useState("");

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await axios.get("http://10.0.0.21:3001/feedback");
        const feedbacksWithRating = response.data.map(feedback => ({
          ...feedback,
          rating: 2 // default rating for each feedback
        }));
        setFeedbacks(feedbacksWithRating);
      } catch (error) {
        console.error("Error fetching feedbacks:", error);
      }
    };
    fetchFeedbacks();
  }, []);

  const handleAddFeedback = async () => {
    if (newType.trim() && newContent.trim() && newRate.trim()) {
      try {
        const response = await axios.post("http://10.0.0.21:3001/feedback", {
          type: newType,
          content: newContent,
          rating: newRate,
        });
        console.log("Feedback saved:", response.data);
        setIsModalVisible(false);
        setNewType("");
        setNewContent("");
        setNewRate("");
      } catch (error) {
        console.error("Error saving feedback:", error);
      }
    }
  };

  const handleRatingChange = (rating, index) => {
    const updatedFeedbacks = feedbacks.map((feedback, idx) => {
      if (idx === index) {
        return { ...feedback, rating };
      }
      return feedback;
    });
    setFeedbacks(updatedFeedbacks);
  };

  const backToHome = () => {
    navigation.navigate("Home");
  };

  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity onPress={backToHome}>
          <Image
            source={Back}
            style={styles.backButton}
          />
        </TouchableOpacity>
        <Text style={styles.header}>Feedback Hub</Text>
        <Image
          source={FeedbackImage}
          style={styles.feedbackImage}
        />
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
              style={styles.input}
              placeholder="Enter your type"
              value={newType}
              onChangeText={(text) => setNewType(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Enter your content"
              value={newContent}
              onChangeText={(text) => setNewContent(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Enter your rate"
              value={newRate}
              onChangeText={(text) => setNewRate(text)}
            />

            <Button
              title="Add feedback"
              onPress={handleAddFeedback}
            />
          </View>
        </View>
      </Modal>

      <GestureHandlerRootView style={styles.scrollViewContainer}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {feedbacks.map((feedback, index) => (
            <View key={index} style={styles.feedbackItem}>
              <Image
                source={User}
                style={styles.userIcon}
              />
              <Text style={styles.feedbackType}>{feedback.type}</Text>
              <Text style={styles.feedbackContent}>{feedback.content}</Text>
              <View style={styles.ratingContainer}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <TouchableOpacity
                    key={star}
                    onPress={() => handleRatingChange(star, index)}
                  >
                    <Image
                      style={styles.star}
                      source={feedback.rating >= star ? StarFilled : StarCorner}
                    />
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          ))}
        </ScrollView>
      </GestureHandlerRootView>

      <TouchableOpacity style={styles.addFeedbackButton} onPress={() => setIsModalVisible(true)}>
        <Text style={styles.addFeedbackText}>Write Review</Text>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFAE64",
    height: "50%",
    borderRadius: 70,
    marginTop: -50
  },
  backButton: {
    position: "absolute",
    marginTop: 110,
    marginLeft: 30,
    width: 30,
    height: 30
  },
  header: {
    color: "white",
    fontSize: 35,
    fontWeight: "bold",
    position: "absolute",
    marginTop: 150,
    marginLeft: 80
  },
  feedbackImage: {
    width: 250,
    height: 180,
    marginTop: 200,
    marginLeft: 70
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)"
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: 300
  },
  closeButton: {
    alignSelf: "flex-end"
  },
  closeText: {
    color: "gray",
    fontSize: 25
  },
  input: {
    height: 40,
    borderColor: "#ddd",
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10
  },
  scrollViewContainer: {
    height: "40%"
  },
  feedbackItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
    backgroundColor: "white",
    borderRadius: 15,
    height: 80
  },
  userIcon: {
    width: 50,
    height: 50,
    marginLeft: 10
  },
  feedbackType: {
    fontSize: 15,
    color: "black",
    paddingLeft: 70,
    top: 5,
    position: "absolute",
  },
  feedbackContent: {
    fontSize: 10,
    color: "gray",
    width: "60%",
    marginTop: 20,
    marginLeft: 10,
  },
  ratingContainer: {
    flexDirection: 'row',
    marginRight: 60,
    marginTop: -55
  },
  star: {
    width: 12,
    height: 12,
    resizeMode: 'cover'
  },
  addFeedbackButton: {
    width: 250,
    height: 50,
    backgroundColor: "#FFAE64",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    marginTop: 670,
    marginLeft: 70
  },
  addFeedbackText: {
    color: "white",
    fontSize: 18
  }
});

export default Feedback;
