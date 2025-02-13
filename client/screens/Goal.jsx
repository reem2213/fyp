// import React, { useState, useEffect } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   Image,
//   Pressable,
//   Modal,
//   TextInput,
//   Button,
//   ScrollView,
//   TouchableOpacity
// } from "react-native";
// import { GestureHandlerRootView } from "react-native-gesture-handler";

// import DateTimePickerModal from "react-native-modal-datetime-picker";
// import ArrowBack from "../assets/arrowBack.png";
// import BlueEllipse from "../assets/blueEllipse.png";
// import GoalScreen from "../assets/goalScreen.png";
// import axios from "axios";
// import TrashIcon from "../assets/trashIcon.png";

// const Goal = ({ navigation }) => {
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const [newGoal, setNewGoal] = useState("");
//   const [selectedDate, setSelectedDate] = useState(null);
//   const [isDatePickerVisible, setDatePickerVisible] = useState(false);
//   const [goals, setGoals] = useState([]);

//   useEffect(() => {
//     const fetchGoals = async () => {
//       try {
//         const response = await axios.get("http://10.0.0.21:3001/goal");
//         setGoals(response.data);
//       } catch (error) {
//         console.error("Error fetching goals:", error);
//       }
//     };

//     fetchGoals();
//   }, []);

//   const BackToHome = () => {
//     navigation.navigate("Home");
//   };

//   const handleAddGoal = () => {
//     setIsModalVisible(true);
//   };

//   const handleSaveGoal = async () => {
//     if (newGoal.trim() !== "") {
//       try {
//         const response = await axios.post("http://10.0.0.21:3001/goal", {
//           goal: newGoal,
//           date: selectedDate,
//           status:"in progress"
//         });
//         console.log("Goal saved:", response.data);
//         setIsModalVisible(false);
//         setNewGoal("");
//         setSelectedDate(null);
//       } catch (error) {
//         console.error("Error saving goal:", error);
//       }
//     }
//   };

//   const handleMoveGoal = async (goalItem) => {
//     try {
//       await axios.delete(`http://172.16.165.205:3001/goal/${goalItem._id}`);

//       const updatedGoals = goals.filter((goal) => goal._id !== goalItem._id);
//       setGoals(updatedGoals);

//     } catch (error) {
//       console.error("Error moving goal:", error);
//     }
//   };

//   const showDatePicker = () => {
//     setDatePickerVisible(true);
//   };

//   const hideDatePicker = () => {
//     setDatePickerVisible(false);
//   };

//   return (
//     <View style={{ height: "100%", backgroundColor: "white" }}>
//       <Pressable onPress={BackToHome}>
//         <Image source={ArrowBack} style={styles.arrow} />
//       </Pressable>

//       <Image style={styles.blueEllispe} source={BlueEllipse} />
//       <Image style={styles.blueEllispe2} source={BlueEllipse} />

//       <Text style={styles.AchieveYourDream}>Achieve Your Dreams</Text>
//       <Image source={GoalScreen} style={styles.goalImage} />
//       <Text style={styles.GoalTracking}>Goal Tracking</Text>
//       <Modal
//         visible={isModalVisible}
//         animationType="slide"
//         transparent={true}
//         onRequestClose={() => setIsModalVisible(false)}
//       >
//         <View style={styles.modalContainer}>
//           <View style={styles.modalContent}>
//             {/* Close button */}
//             <TouchableOpacity
//               style={styles.closeButton}

//               onPress={() => setIsModalVisible(false)}
//             >
//               <Text style={styles.closeText}>x</Text>
//             </TouchableOpacity>
//             <TextInput
//               style={styles.input}
//               placeholder="Enter your new goal"
//               value={newGoal}
//               onChangeText={(text) => setNewGoal(text)}
//             />
//             <Button title="Pick a Date" onPress={showDatePicker} />

//             {selectedDate && (
//               <Text style={styles.selectedDate}>
//                 Selected Date: {selectedDate.toLocaleDateString()}
//               </Text>
//             )}
//             <Button title="Add Goal" onPress={handleSaveGoal} />
//           </View>
//         </View>
//       </Modal>
//       <GestureHandlerRootView style={{ height: "40%" }}>
//         <ScrollView style={styles.goalsContainer} showsVerticalScrollIndicator>
//           {goals.map((goalItem, index) => (
//             <View key={index} style={styles.goalItemContainer}>
//               <Text style={styles.goalItem}>{goalItem.goal}</Text>

//               <Pressable onPress={() => handleMoveGoal(goalItem)}>
//                 <Image
//                   source={TrashIcon}
//                   style={{ width: 30, height: 30, marginRight: 20 }}
//                 />
//               </Pressable>
//             </View>
//           ))}
//         </ScrollView>
//       </GestureHandlerRootView>
//       <Pressable style={styles.add} onPress={handleAddGoal}>
//         <Text style={styles.addGoal}>+ Add a new Goal</Text>
//       </Pressable>

//       <DateTimePickerModal
//         isVisible={isDatePickerVisible}
//         mode="date"
//         onConfirm={(date) => {
//           setSelectedDate(date);
//           hideDatePicker();
//         }}
//         onCancel={hideDatePicker}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   arrow: {
//     marginTop: 70,
//     marginLeft: 40,
//     width: 30,
//     height: 30,
//   },
//   blueEllispe: {
//     width: 100,
//     height: 100,
//     marginLeft: 350,
//     marginTop: -90,
//   },
//   closeText: {
//     color: "gray",
//     fontSize: 25,
//     marginLeft: 250,
//     marginTop: -20,
//     width:"100%"
//   },
//   blueEllispe2: {
//     width: 100,
//     height: 100,
//     marginLeft: 300,
//     marginTop: -70,
//     opacity: 0.5,
//   },
//   AchieveYourDream: {
//     marginLeft: 55,
//     marginTop: 10,
//     fontSize: 30,
//     color: "#1B436F",
//     fontWeight: "bold",
//   },
//   goalImage: {
//     width: 250,
//     height: 180,
//     marginLeft: 70,
//     marginTop: -35,
//   },
//   GoalTracking: {
//     marginLeft: 50,
//     marginTop: 20,
//     fontSize: 20,
//     color: "#719AEA",
//     fontWeight: "bold",
//   },
//   add: {
//     width: 250,
//     height: 50,
//     marginTop: 670,
//     marginLeft: 70,
//     backgroundColor: "#1B436F",
//     borderRadius: 20,
//     alignItems: "center",
//     justifyContent: "center",
//     position: "absolute",
//   },
//   addGoal: {
//     color: "white",
//     fontSize: 18,
//   },
//   modalContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "rgba(0, 0, 0, 0.5)",
//   },
//   modalContent: {
//     backgroundColor: "white",
//     padding: 20,
//     borderRadius: 10,
//     width: 300,
//   },
//   input: {
//     height: 40,
//     borderColor: "#ddd",
//     borderWidth: 1,
//     marginBottom: 20,
//     paddingHorizontal: 10,
//   },
//   selectedDate: {
//     marginTop: 10,
//     fontSize: 16,
//     color: "#333",
//   },
//   goalsContainer: {
//     marginTop: 20,
//     paddingHorizontal: 20,

//     width: "85%",
//     marginLeft: 30,
//   },
//   goalItemContainer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: 15,
//     backgroundColor: "#719AEA",
//     color: "white",
//     borderRadius: 15,
//     height: 40,
//   },
//   goalItem: {
//     fontSize: 16,
//     color: "white",
//     paddingLeft: 20,
//   },
// });

// export default Goal;

import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  Modal,
  TextInput,
  Button,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import ArrowBack from "../assets/arrowBack.png";
import BlueEllipse from "../assets/blueEllipse.png";
import GoalScreen from "../assets/goalScreen.png";
import DarkEllipse from "../assets/DarkEllipse.png";
import axios from "axios";
import TrashIcon from "../assets/trashIcon.png";
import { DarkModeContext } from "../components/DarkModeContext";

const Goal = ({ navigation, route }) => {
  const { username, userId } = route.params;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newGoal, setNewGoal] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [goals, setGoals] = useState([]);
  const { isDarkMode } = useContext(DarkModeContext);

  useEffect(() => {
    const fetchGoals = async () => {
      // const responses = await axios.get('http://10.0.0.21:3001/get-userid', { params: { username } });
      // const userId = responses.data.userId;
      try {
        const response = await axios.get(
          `http://10.0.0.21:3001/goal/${userId}`
        );
        setGoals(response.data);
        // console.log(userId);
      } catch (error) {
        console.error("Error fetching goals:", error);
      }
    };
    fetchGoals();
  }, [goals]);

  const BackToHome = () => {
    navigation.navigate("Home", { username, userId });
  };

  const handleAddGoal = () => {
    setIsModalVisible(true);
  };

  const handleSaveGoal = async () => {
    if (newGoal.trim() !== "") {
      const responses = await axios.get("http://10.0.0.21:3001/get-userid", {
        params: { username },
      });
      const userId = responses.data.userId;
      try {
        const response = await axios.post(
          `http://10.0.0.21:3001/goal/${userId}`,
          {
            goal: newGoal,
            date: selectedDate,
            status: "in progress",
            userId,
          }
        );

        console.log("Goal saved:", response.data);
        setIsModalVisible(false);
        setNewGoal("");
        setSelectedDate(null);
      } catch (error) {
        console.error("Error saving goal:", error);
      }
    }
  };

  const handleMoveGoal = async (goalItem) => {
    try {
      await axios.delete(`http://10.0.0.21:3001/goal/${goalItem._id}`);
      const updatedGoals = goals.filter((goal) => goal._id !== goalItem._id);
      setGoals(updatedGoals);
    } catch (error) {
      console.error("Error deleting goal:", error);
    }
  };

  const showDatePicker = () => {
    setDatePickerVisible(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisible(false);
  };

  return (
    <View style={[styles.container, isDarkMode && styles.darkContainer]}>
      <Pressable onPress={BackToHome}>
        <Image source={ArrowBack} style={styles.arrow} />
      </Pressable>

      {isDarkMode ? (
        <Image style={styles.blueEllispe} source={DarkEllipse} />
      ) : (
        <Image style={styles.blueEllispe} source={BlueEllipse} />
      )}

      {isDarkMode ? (
        <Image style={styles.blueEllispe2} source={DarkEllipse} />
      ) : (
        <Image style={styles.blueEllispe2} source={BlueEllipse} />
      )}
      {isDarkMode ? (
        <Image style={styles.blueEllispe3} source={DarkEllipse} />
      ) : (
        <Image style={styles.blueEllispe3} source={BlueEllipse} />
      )}

      <Text style={[styles.AchieveYourDream, isDarkMode && styles.darkText]}>
        Achieve Your Dreams
      </Text>
      <Image source={GoalScreen} style={styles.goalImage} />
      <Text style={[styles.GoalTracking, isDarkMode && styles.darkText]}>
        Goal Tracking
      </Text>

      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={[styles.modalContainer]}>
          <View style={[styles.modalContent,{backgroundColor: isDarkMode ? "#1F1F1F" : "white",}]}>
            <TextInput
              style={[styles.input, isDarkMode && styles.darkInput]}
              placeholder="Enter your new goal"
              value={newGoal}
              placeholderTextColor={isDarkMode ? "#ccc" : "#000"}
              onChangeText={(text) => setNewGoal(text)}
            />
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                onPress={() => setIsModalVisible(false)}
                style={{
                  backgroundColor: "red",
                  padding: 10,
                  width: "25%",
                  borderRadius: 15,
                  alignItems: "center",
                }}
              >
                <Text style={{ color: "white" }}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleSaveGoal}
                style={{
                  backgroundColor: newGoal ? "#719AEA" : "#aaa",
                  padding: 10,
                  width: "30%",
                  borderRadius: 15,
                  alignItems: "center",
                  left: 130,
                }}
                disabled={!newGoal}
              >
                <Text style={{ color: "white" }}>Add Goal</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <GestureHandlerRootView style={{ height: "40%" }}>
        <ScrollView style={styles.goalsContainer} showsVerticalScrollIndicator>
          {goals.map((goalItem, index) => (
            <View
              key={index}
              style={[
                styles.goalItemContainer,
                isDarkMode && styles.darkGoalItemContainer,
              ]}
            >
              <Text style={[styles.goalItem, isDarkMode && styles.darkText]}>
                {goalItem.goal}
              </Text>
              <Pressable onPress={() => handleMoveGoal(goalItem)}>
                <Image
                  source={TrashIcon}
                  style={{ width: 30, height: 30, marginRight: 20 }}
                />
              </Pressable>
            </View>
          ))}
        </ScrollView>
      </GestureHandlerRootView>
      <Pressable
        style={[styles.add, isDarkMode && styles.darkAdd]}
        onPress={handleAddGoal}
      >
        <Text style={styles.addGoal}>+ Add a new Goal</Text>
      </Pressable>

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={(date) => {
          setSelectedDate(date);
          hideDatePicker();
        }}
        onCancel={hideDatePicker}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: "white",
  },
  darkContainer: {
    backgroundColor: "black",
  },
  arrow: {
    marginTop: 70,
    marginLeft: 40,
    width: 30,
    height: 30,
  },
  blueEllispe: {
    width: 100,
    height: 100,
    marginLeft: 350,
    marginTop: -90,
    borderRadius: 200,
  },
  // closeText: {
  //   color: "gray",
  //   fontSize: 25,
  //   marginLeft: 250,
  //   marginTop: -20,
  //   width:"100%"
  // },
  blueEllispe2: {
    width: 100,
    height: 100,
    marginLeft: 300,
    marginTop: -70,
    opacity: 0.5,
    borderRadius: 200,
  },
  blueEllispe3: {
    width: 150,
    height: 150,
    marginLeft: -80,
    marginTop: 780,
    position: "absolute",
    borderRadius: 200,
  },

  AchieveYourDream: {
    marginLeft: 55,
    marginTop: 10,
    fontSize: 30,
    color: "#1B436F",
    fontWeight: "bold",
  },
  goalImage: {
    width: 250,
    height: 180,
    marginLeft: 70,
    marginTop: -35,
  },
  GoalTracking: {
    marginLeft: 50,
    marginTop: 20,
    fontSize: 20,
    color: "#719AEA",
    fontWeight: "bold",
  },
  add: {
    width: 250,
    height: 50,
    marginTop: 750,
    marginLeft: 80,
    backgroundColor: "#1B436F",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
  },
  darkAdd: {
    backgroundColor: "#011C4F",
  },
  addGoal: {
    color: "white",
    fontSize: 18,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // semi-transparent background
  },
  modalContent: {
    width: "80%",
    padding: 20,
    backgroundColor: "white",
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5, // for Android shadow
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 1,
    backgroundColor: "red",
    padding: 5,
    borderRadius: 5,
  },
  closeText: {
    fontSize: 10,
    color: "white",
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginVertical: 20,
    fontSize: 16,
    color: "#000",
  },
  darkInput: {
    backgroundColor: "#1F1F1F",
    borderColor: "#444",
    color: "#fff",
  },
  addButton: {
    backgroundColor: "#719AEA",
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  addButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },

  goalsContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
    width: "85%",
    marginLeft: 30,
  },
  goalItemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
    backgroundColor: "#719AEA",
    color: "white",
    borderRadius: 15,
    height: 50,
  },
  darkGoalItemContainer: {
    backgroundColor: "#1F1F1F",
  },
  goalItem: {
    fontSize: 16,
    color: "white",
    paddingLeft: 20,
  },
  darkText: {
    color: "#fff",
  },
});

export default Goal;
