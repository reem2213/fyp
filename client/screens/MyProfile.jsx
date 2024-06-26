// import React, { useState, useEffect } from "react";
// import {
//   StyleSheet,
//   View,
//   Text,
//   FlatList,
//   TouchableOpacity,
//   Image,
// } from "react-native";
// import { useNavigation } from "@react-navigation/native";
// import axios from "axios";
// import { PieChart } from "react-native-chart-kit";
// import { Dimensions } from "react-native";
// import Settings from "../assets/settings.png";


// const App = ({ route }) => {
//   const { navigate } = useNavigation();
//   const { username, bio, imageUri } = route.params;
//   const [userProfile, setUserProfile] = useState({
//     username: "",
//     bio: "",
//     imageUri: "",
//   });
//   const [activeSection, setActiveSection] = useState("Meetings");
//   const [activeStatus, setActiveStatus] = useState("upcoming");
//   const [meetings, setMeetings] = useState([]);
//   const [goals, setGoals] = useState([]);

//   useEffect(() => {
//     fetchUserProfile();
//     fetchMeetings();
//     fetchGoals();
//   }, []);

//   const fetchUserProfile = async () => {
//     try {
//       const response = await axios.get(
//         `http://10.0.0.21:3001/user/${username}`
//       );
//       setUserProfile(response.data);
//     } catch (error) {
//       console.error("Error fetching user profile:", error);
//     }
//   };

//   const fetchMeetings = async () => {
//     try {
//       const response = await axios.get("http://10.0.0.21:3001/bookings");
//       setMeetings(response.data);
//     } catch (error) {
//       console.error("Error fetching meetings:", error);
//     }
//   };

//   const fetchGoals = async () => {
//     try {
//       const response = await axios.get("http://10.0.0.21:3001/goal");
//       setGoals(response.data);
//     } catch (error) {
//       console.error("Error fetching goals:", error);
//     }
//   };

//   const handleStatusChange = async (id, newStatus, oldStatus) => {
//     try {
//       const response = await axios.put(`http://10.0.0.21:3001/goal/${id}`, {
//         status: newStatus,
//       });
//       if (response.status === 200) {
//         if (activeSection === "Meetings") {
//           const updatedMeetings = meetings.map((meeting) => {
//             if (meeting._id === id) {
//               return { ...meeting, status: newStatus };
//             }
//             return meeting;
//           });
//           setMeetings(updatedMeetings);
//         } else if (activeSection === "Goals") {
//           const updatedGoals = goals.map((goal) => {
//             if (goal._id === id) {
//               return { ...goal, status: newStatus };
//             }
//             return goal;
//           });
//           setGoals(updatedGoals);
//         }
//       }
//     } catch (error) {
//       console.error(
//         `Error updating ${activeSection.toLowerCase()} status:`,
//         error
//       );
//     }
//     try {
//       const responsee = await axios.put(
//         `http://10.0.0.21:3001/bookings/${id}`,
//         { status: newStatus }
//       );
//       if (responsee.status === 200) {
//         const updatedMeetings = meetings.map((meeting) => {
//           if (meeting._id === id) {
//             return { ...meeting, status: newStatus };
//           }
//           return meeting;
//         });
//         setMeetings(updatedMeetings);
//       }
//     } catch (error) {
//       console.error("Error updating meeting status:", error);
//     }
//   };

//   const calculateStatusPercentages = (goals) => {
//     const totalGoals = goals.length;
//     const statusCounts = goals.reduce(
//       (acc, goal) => {
//         acc[goal.status] = (acc[goal.status] || 0) + 1;
//         return acc;
//       },
//       { "in progress": 0, completed: 0, cancelled: 0 }
//     );

//     const statusPercentages = {
//       "in progress": (statusCounts["in progress"] / totalGoals) * 100,
//       completed: (statusCounts.completed / totalGoals) * 100,
//       cancelled: (statusCounts.cancelled / totalGoals) * 100,
//     };

//     return statusPercentages;
//   };

//   const renderItem = ({ item }) => {
//     if (activeSection === "Meetings") {
//       return (
//         <View style={styles.itemContainer}>
//           <Text style={styles.itemTitle}>{item.mentorName}</Text>
//           <Text style={styles.itemTitle}>
//             {new Date(item.date).toLocaleDateString()}
//           </Text>
//           <Text style={styles.itemTitle}>{item.time}</Text>
//           <View style={styles.statusContainer}>
//             {(item.status === "upcoming" || item.status === "in progress") && (
//               <View style={styles.actionButtons}>
//                 <TouchableOpacity
//                   style={[styles.actionButton, styles.doneButton]}
//                   onPress={() =>
//                     handleStatusChange(item._id, "Completed", item.status)
//                   }
//                 >
//                   <Text style={styles.actionButtonText2}>Done</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity
//                   style={[styles.actionButton, styles.cancelButton]}
//                   onPress={() =>
//                     handleStatusChange(item._id, "Cancelled", item.status)
//                   }
//                 >
//                   <Text style={styles.actionButtonText}>Cancel</Text>
//                 </TouchableOpacity>
//               </View>
//             )}
//           </View>
//         </View>
//       );
//     } else if (activeSection === "Goals") {
//       return (
//         <View style={styles.itemContainer}>
//           <Text style={styles.itemTitle}>{item.goal}</Text>
//           <View style={styles.statusContainer}>
//             {(item.status === "upcoming" || item.status === "in progress") && (
//               <View style={styles.actionButtons}>
//                 <TouchableOpacity
//                   style={[styles.actionButton, styles.doneButton]}
//                   onPress={() =>
//                     handleStatusChange(item._id, "Completed", item.status)
//                   }
//                 >
//                   <Text style={styles.actionButtonText2}>Done</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity
//                   style={[styles.actionButton, styles.cancelButton]}
//                   onPress={() =>
//                     handleStatusChange(item._id, "Cancelled", item.status)
//                   }
//                 >
//                   <Text style={styles.actionButtonText}>Cancel</Text>
//                 </TouchableOpacity>
//               </View>
//             )}
//           </View>
//         </View>
//       );
//     }
//   };

//   const filteredData =
//     activeSection === "Meetings"
//       ? meetings.filter(
//           (meeting) =>
//             meeting.status === activeStatus ||
//             (activeStatus === "upcoming" && meeting.status === "in progress")
//         )
//       : goals.filter(
//           (goal) =>
//             goal.status === activeStatus ||
//             (activeStatus === "upcoming" && goal.status === "in progress")
//         );

//   const goToSettings = () => {
//     navigate("Settings");
//   };

//   const statusPercentages = calculateStatusPercentages(goals);
//   const data = [
//     {
//       name: "In Progress",
//       percentage: statusPercentages["in progress"],
//       color: "#FFA500",
//       legendFontColor: "#7F7F7F",
//       legendFontSize: 15,
//     },
//     {
//       name: "Completed",
//       percentage: statusPercentages.completed,
//       color: "#4CAF50",
//       legendFontColor: "#7F7F7F",
//       legendFontSize: 15,
//     },
//     {
//       name: "Cancelled",
//       percentage: statusPercentages.cancelled,
//       color: "#F44336",
//       legendFontColor: "#7F7F7F",
//       legendFontSize: 15,
//     },
//   ];

//   return (
//     <>
//       <View style={{ backgroundColor: "#FAFAFA" }}>
//         <Text
//           style={{
//             color: "#032B79",
//             fontSize: 40,
//             fontWeight: "bold",
//             textAlign: "center",
//             top: 40,
//           }}
//         >
//           Profile
//         </Text>
//         <TouchableOpacity onPress={goToSettings}>
//           <Image
//             style={{ width: 45, height: 45, left: 320, top: -10 }}
//             source={Settings}
//           />
//         </TouchableOpacity>
//         <Text
//           style={{ color: "gray", fontSize: 20, fontWeight: "600", left: 40 }}
//         >
//           550 Pts
//         </Text>
//         {imageUri && (
//           <Image
//             source={{ uri: imageUri }}
//             style={{
//               width: 150,
//               height: 150,
//               borderRadius: 100,
//               top: 20,
//               left: 20,
//             }}
//           />
//         )}
//       </View>
//       <View style={styles.container}>
//         <View style={styles.sectionSwitcher}>
//           <TouchableOpacity
//             style={[
//               styles.sectionButton,
//               activeSection === "Meetings" ? styles.activeSectionButton : null,
//             ]}
//             onPress={() => setActiveSection("Meetings")}
//           >
//             <Text
//               style={[
//                 styles.sectionButtonText,
//                 activeSection === "Meetings"
//                   ? styles.activeSectionButtonText
//                   : null,
//               ]}
//             >
//               Meetings
//             </Text>
//           </TouchableOpacity>
//           <TouchableOpacity
//             style={[
//               styles.sectionButton,
//               activeSection === "Goals" ? styles.activeSectionButton : null,
//             ]}
//             onPress={() => setActiveSection("Goals")}
//           >
//             <Text
//               style={[
//                 styles.sectionButtonText,
//                 activeSection === "Goals"
//                   ? styles.activeSectionButtonText
//                   : null,
//               ]}
//             >
//               Goals
//             </Text>
//           </TouchableOpacity>
//         </View>
//         {activeSection === "Goals" && (
//           <PieChart
//             data={data}
//             width={Dimensions.get("window").width - 32}
//             height={220}
//             chartConfig={{
//               backgroundColor: "#fff",
//               backgroundGradientFrom: "#fff",
//               backgroundGradientTo: "#fff",
//               color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
//             }}
//             accessor={"percentage"}
//             backgroundColor={"transparent"}
//             paddingLeft={"16"}
//             absolute
//           />
//         )}
//         <View style={styles.statusContainer}>
//           <TouchableOpacity
//             style={[
//               styles.statusButton,
//               activeStatus === "upcoming" ? styles.activeStatusButton : null,
//             ]}
//             onPress={() => setActiveStatus("upcoming")}
//           >
//             <Text
//               style={[
//                 styles.statusButtonText,
//                 activeStatus === "upcoming"
//                   ? styles.activeStatusButtonText
//                   : null,
//               ]}
//             >
//               In Progress
//             </Text>
//           </TouchableOpacity>
//           <TouchableOpacity
//             style={[
//               styles.statusButton,
//               activeStatus === "Completed" ? styles.activeStatusButton : null,
//             ]}
//             onPress={() => setActiveStatus("Completed")}
//           >
//             <Text
//               style={[
//                 styles.statusButtonText,
//                 activeStatus === "Completed"
//                   ? styles.activeStatusButtonText
//                   : null,
//               ]}
//             >
//               Completed
//             </Text>
//           </TouchableOpacity>
//           <TouchableOpacity
//             style={[
//               styles.statusButton,
//               activeStatus === "Cancelled" ? styles.activeStatusButton : null,
//             ]}
//             onPress={() => setActiveStatus("Cancelled")}
//           >
//             <Text
//               style={[
//                 styles.statusButtonText,
//                 activeStatus === "Cancelled"
//                   ? styles.activeStatusButtonText
//                   : null,
//               ]}
//             >
//               Cancelled
//             </Text>
//           </TouchableOpacity>
//         </View>
//         <FlatList
//           data={filteredData}
//           renderItem={renderItem}
//           keyExtractor={(item) => item._id}
//           style={styles.listContainer}
//         />
//       </View>
//     </>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     top: -20,
//     flex: 1,
//     backgroundColor: "#FAFAFA",
//     paddingHorizontal: 16,
//     paddingVertical: 24,
//   },
//   actionButtons: {
//     flexDirection: "row",
//     marginLeft: 16,
//     top: 5,
//     gap: 10,
//   },
//   actionButton: {
//     backgroundColor: "#f0f0f0",
//     borderRadius: 8,
//     paddingVertical: 4,
//     paddingHorizontal: 8,
//     marginRight: 8,
//   },
//   doneButton: {
//     backgroundColor: "#032B79",
//   },
//   cancelButton: {
//     backgroundColor: "#032B79",
//   },
//   actionButtonText: {
//     fontSize: 15,
//     fontWeight: "bold",
//     color: "red",
//   },
//   actionButtonText2: {
//     fontSize: 15,
//     fontWeight: "bold",
//     color: "white",
//   },
//   header: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: 16,
//   },
//   headerTitle: {
//     fontSize: 24,
//     fontWeight: "bold",
//   },
//   sectionSwitcher: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginBottom: 16,
//     backgroundColor: "white",
//     padding: 10,
//     left: 40,
//     borderRadius: 20,
//     width: 300,
//   },
//   sectionButton: {
//     borderRadius: 20,
//     paddingVertical: 8,
//     paddingHorizontal: 16,
//     marginHorizontal: 4,
//   },
//   activeSectionButton: {
//     backgroundColor: "#032B79",
//   },
//   sectionButtonText: {
//     fontSize: 14,
//     fontWeight: "bold",
//     color: "#032B79",
//   },
//   activeSectionButtonText: {
//     color: "#fff",
//   },
//   statusContainer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginBottom: 16,
//   },
//   statusButton: {
//     borderRadius: 8,
//     paddingVertical: 8,
//     paddingHorizontal: 16,
//     flex: 1,
//     marginHorizontal: 4,
//   },
//   activeStatusButton: {
//     backgroundColor: "#032B79",
//   },
//   statusButtonText: {
//     fontSize: 14,
//     fontWeight: "bold",
//     textAlign: "center",
//     color: "#606060",
//   },
//   activeStatusButtonText: {
//     color: "#032B79",
//   },
//   listContainer: {
//     flex: 1,
//   },
//   itemContainer: {
//     backgroundColor: "#032B79",
//     borderRadius: 20,
//     paddingVertical: 12,
//     paddingHorizontal: 16,
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginVertical: 4,
//   },
//   itemTitle: {
//     fontSize: 16,
//     fontWeight: "bold",
//     color: "#fff",
//   },
//   itemStatus: {
//     fontSize: 14,
//     paddingVertical: 4,
//     paddingHorizontal: 8,
//     borderRadius: 4,
//   },
//   upcoming: {
//     backgroundColor: "#2196F3",
//     color: "#fff",
//   },
//   completed: {
//     backgroundColor: "#4CAF50",
//     color: "#fff",
//   },
//   cancelled: {
//     backgroundColor: "#F44336",
//     color: "#fff",
//   },
//   in_progress: {
//     backgroundColor: "#FFA500",
//     color: "#fff",
//   },
// });

// export default App;




import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  Image,
  View,
  Text,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import Settings from "../assets/settings.png";
import Coin from '../assets/coin.png';
import Back from '../assets/arrowBack.png';
const App = ({ route }) => {
  const { navigate } = useNavigation();
  const { username, bio, imageUri } = route.params;
  const [userProfile, setUserProfile] = useState({
    username: "",
    bio: "",
    imageUri: "",
  });
  const [activeSection, setActiveSection] = useState("Meetings");
  const [activeStatus, setActiveStatus] = useState("upcoming");
  const [meetings, setMeetings] = useState([]);
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    fetchUserProfile();
    fetchMeetings();
    fetchGoals();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const response = await axios.get(
        `http://10.0.0.21:3001/user/${username}`
      );
      setUserProfile(response.data);
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  const fetchMeetings = async () => {
    try {
      const response = await axios.get("http://10.0.0.21:3001/bookings");
      setMeetings(response.data);
    } catch (error) {
      console.error("Error fetching meetings:", error);
    }
  };

  const fetchGoals = async () => {
    try {
      const response = await axios.get("http://10.0.0.21:3001/goal");
      setGoals(response.data);
    } catch (error) {
      console.error("Error fetching goals:", error);
    }
  };

  const handleStatusChange = async (id, newStatus, oldStatus) => {
    try {
      const response = await axios.put(`http://10.0.0.21:3001/goal/${id}`, {
        status: newStatus,
      });
      if (response.status === 200) {
        if (activeSection === "Meetings") {
          const updatedMeetings = meetings.map((meeting) => {
            if (meeting._id === id) {
              return { ...meeting, status: newStatus };
            }
            
            return meeting;
          });
          setMeetings(updatedMeetings);
        } else if (activeSection === "Goals") {
          const updatedGoals = goals.map((goal) => {
            if (goal._id === id) {
              return { ...goal, status: newStatus };
            }
            return goal;
          });
          setGoals(updatedGoals);
        }
      }
    } catch (error) {
      console.error(
        `Error updating ${activeSection.toLowerCase()} status:`,
        error
      );
    }
    try {
      const responsee = await axios.put(
        `http://10.0.0.21:3001/bookings/${id}`,
        { status: newStatus }
      );
      if (responsee.status === 200) {
        const updatedMeetings = meetings.map((meeting) => {
          if (meeting._id === id) {
            return { ...meeting, status: newStatus };
          }
          return meeting;
        });
        setMeetings(updatedMeetings);
        if(newStatus==="Cancelled"){
                  navigate("CancelBooking", { id });

        }
      }

      
    } catch (error) {
      console.error("Error updating meeting status:", error);
    }
  };

  const handleCancelPress = (id) => {
    navigate("CancelBooking", { id });
  };


  const renderItem = ({ item }) => {
    if (activeSection === "Meetings") {
      return (
        <View style={styles.itemContainer}>
          <Text style={styles.itemTitle}>{item.mentorName}</Text>
          <Text style={styles.itemTitle}>{new Date(item.date).toLocaleDateString()}</Text>
          <Text style={styles.itemTitle}>{item.time}</Text>
          <View style={styles.statusContainer}>
            {(item.status === "upcoming" || item.status === "in progress") && (
              <View style={styles.actionButtons}>
                <TouchableOpacity
                  style={[styles.actionButton, styles.doneButton]}
                  onPress={() => handleStatusChange(item._id, "Completed", item.status)}
                >
                  <Text style={styles.actionButtonText2}>Done</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.actionButton, styles.cancelButton]}
                  onPress={() => handleStatusChange(item._id, "Cancelled", item.status)}
                >
                 {/* <TouchableOpacity
                style={[styles.actionButton, styles.cancelButton]}
                onPress={() => handleStatusChange(item._id)}
              > */}
                  <Text style={styles.actionButtonText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      );
    } else if (activeSection === "Goals") {
      return (
        <View style={styles.itemContainer}>
          <Text style={styles.itemTitle}>{item.goal}</Text>
          <View style={styles.statusContainer}>
            {(item.status === "upcoming" || item.status === "in progress") && (
              <View style={styles.actionButtons}>
                <TouchableOpacity
                  style={[styles.actionButton, styles.doneButton]}
                  onPress={() => handleStatusChange(item._id, "Completed", item.status)}
                >
                  <Text style={styles.actionButtonText2}>Done</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.actionButton, styles.cancelButton]}
                  onPress={() => handleStatusChange(item._id, "Cancelled", item.status)}
                >
                
                  <Text style={styles.actionButtonText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      );
    }
  };

  const filteredData =
    activeSection === "Meetings"
      ? meetings.filter((meeting) => meeting.status === activeStatus || (activeStatus === "upcoming" && meeting.status === "in progress"))
      : goals.filter((goal) => goal.status === activeStatus || (activeStatus === "upcoming" && goal.status === "in progress"));

  const goToSettings = () => {
    navigate("Settings");
  };

  return (
    <>
      <View style={{ backgroundColor: "#FAFAFA" }}>
        <Image source={Back} style={{position:"absolute", top:50,left:20, width:40,height:40}}/>
        <Text
          style={{
            color: "#032B79",
            fontSize: 40,
            fontWeight: "bold",
            textAlign: "center",
            top: 40,
          }}
        >
          Profile
        </Text>
        <TouchableOpacity onPress={goToSettings}>
          <Image
            style={{ width: 45, height: 45, left: 320, top: -10 }}
            source={Settings}
          />
        </TouchableOpacity>
        <Image source={Coin} style={{position:"absolute", top:97,left:10}}/>
        <Text
          style={{ color: "gray", fontSize: 20, fontWeight: "600", left: 60,top:10 }}
        >
          550 Pts
        </Text>
        <View style={{position:"absolute",backgroundColor:"#FAFAFA", width:"100%",top:270, height:40 }}>
        <Text></Text>
      </View>
        {imageUri && (
          <Image
            source={{ uri: imageUri }}
            style={{
              width: 150,
              height: 150,
              borderRadius: 100,
              top: 20,
              left: 20,
            }}
          />
        )}
      </View>
     

      <View style={{ backgroundColor: "#FAFAFA", top: 30 }}>
        <Text style={{ top: -90, left: 190, fontSize: 15, fontWeight: "500" }}>
          {username}
        </Text>
        <Text style={{ top: -80, left: 190, fontSize: 15, fontWeight: "500" }}>
          {bio}
        </Text>
        <TouchableOpacity>
          <Text
            style={{
              backgroundColor: "white",
              width: "40%",
              borderColor: "#E5E0E0",
              borderWidth: 1,
              borderRadius: 10,
              padding: 5,
              textAlign: "center",
              left: 185,
              top: -60,
            }}
          >
            Edit your Profile
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.sectionSwitcher}>
            <TouchableOpacity
              style={[
                styles.sectionButton,
                activeSection === "Meetings"
                  ? styles.activeSectionButton
                  : null,
              ]}
              onPress={() => setActiveSection("Meetings")}
            >
              <Text
                style={[
                  styles.sectionButtonText,
                  activeSection === "Meetings"
                    ? styles.activeSectionButtonText
                    : null,
                ]}
              >
                Meetings
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.sectionButton,
                activeSection === "Goals" ? styles.activeSectionButton : null,
              ]}
              onPress={() => setActiveSection("Goals")}
            >
              <Text
                style={[
                  styles.sectionButtonText,
                  activeSection === "Goals"
                    ? styles.activeSectionButtonText
                    : null,
                ]}
              >
                Goals
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.statusContainer}>
          <TouchableOpacity
            style={[
              styles.statusButton,
              activeStatus === "upcoming" ? styles.activeStatusButton : null,
            ]}
            onPress={() => setActiveStatus("upcoming")}
          >
            <Text
              style={[
                styles.statusButtonText,
                activeStatus === "upcoming"
                  ? styles.activeStatusButtonText
                  : null,
              ]}
            >
              In Progress
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.statusButton,
              activeStatus === "Completed" ? styles.activeStatusButton : null,
            ]}
            onPress={() => setActiveStatus("Completed")}
          >
            <Text
              style={[
                styles.statusButtonText,
                activeStatus === "Completed"
                  ? styles.activeStatusButtonText
                  : null,
              ]}
            >
              Completed
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.statusButton,
              activeStatus === "Cancelled" ? styles.activeStatusButton : null,
            ]}
            onPress={() => setActiveStatus("Cancelled")}
          >
            <Text
              style={[
                styles.statusButtonText,
                activeStatus === "Cancelled"
                  ? styles.activeStatusButtonText
                  : null,
              ]}
            >
              Cancelled
            </Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={filteredData}
          renderItem={renderItem}
          keyExtractor={(item) => item._id}
          style={styles.listContainer}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    top: -20,
    flex: 1,
    backgroundColor: "#FAFAFA",
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  actionButtons: {
    flexDirection: "row",
    marginLeft: 16,
    top: 5,
    gap: 10,
  },
  actionButton: {
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    paddingVertical: 4,
    paddingHorizontal: 8,
    marginRight: 8,
  },
  doneButton: {
    backgroundColor: "#032B79",
  },
  cancelButton: {
    backgroundColor: "#032B79",
  },
  actionButtonText: {
    fontSize: 15,
    fontWeight: "bold",
    color: "red",
  },
  actionButtonText2: {
    fontSize: 15,
    fontWeight: "bold",
    color: "white",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  sectionSwitcher: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
    backgroundColor: "white",
    padding: 10,
    left: 40,
    borderRadius: 20,
    width: 300,
  },
  sectionButton: {
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginHorizontal: 4,
  },
  activeSectionButton: {
    backgroundColor: "#032B79",
width:130,   
    justifyContent:"center"
  },
  sectionButtonText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#032B79",
    


  },
  activeSectionButtonText: {
    color: "#fff",
    textAlign:"center"
    



  },
  statusContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  statusButton: {
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    flex: 1,
    marginHorizontal: 4,
  },
  activeStatusButton: {
    // backgroundColor: "#032B79",
  },
  statusButtonText: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
    color: "#606060",
  },
  activeStatusButtonText: {
    color: "#032B79",
  },
  listContainer: {
    flex: 1,
  },
  itemContainer: {
    backgroundColor: "#032B79",
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 4,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color:"white"
  },
  itemStatus: {
    fontSize: 14,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  upcoming: {
    backgroundColor: "#2196F3",
    color: "#fff",
  },
  completed: {
    backgroundColor: "#4CAF50",
    color: "#fff",
  },
  cancelled: {
    backgroundColor: "#F44336",
    color: "#fff",
  },
  in_progress: {
    backgroundColor: "#FFA500",
    color: "#fff",
  },
});

export default App;


