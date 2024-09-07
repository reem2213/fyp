// import { WebView } from "react-native-webview";
// import React, { useState, useEffect, useContext } from "react";
// import {
//   StyleSheet,
//   Image,
//   View,
//   Text,
//   FlatList,
//   TouchableOpacity,
//   ScrollView,
// } from "react-native";
// import { useNavigation } from "@react-navigation/native";
// import axios from "axios";
// import Settings from "../assets/settings.png";
// import Coin from "../assets/coin.png";
// import Back from "../assets/arrowBack.png";
// import { DarkModeContext } from "../components/DarkModeContext"; // Import the context

// const App = ({ route }) => {
//   const { navigate } = useNavigation();
//   const { username } = route.params;
//   const [bio, setBio] = useState("");
//   const [points, setPoints] = useState(0); // Add state for points

//   const { isDarkMode } = useContext(DarkModeContext); // Use the context

//   const [imageData, setImageData] = useState(null);
//   const [userProfile, setUserProfile] = useState({
//     username: "",
//     bio: "",
//     imageData: "",
//   });
//   const [activeSection, setActiveSection] = useState("Meetings");
//   const [activeStatus, setActiveStatus] = useState("upcoming");
//   const [meetings, setMeetings] = useState([]);
//   const [goals, setGoals] = useState([]);
//   useEffect(() => {
//     fetch(`http://10.0.0.21:3001/userr/${username}`)
//       .then((response) => response.json())
//       .then((data) => {
//         setBio(data.bio);
//         setImageData(data.image);

//         console.log("donee");
//       })
//       .catch((error) => {
//         console.error("Error fetching user data:", error);
//       });
//   }, [username]);
//   useEffect(() => {
//     fetchUserProfile();
//     fetchMeetings();
//     fetchGoals();
//     fetchUserPoints(); // Fetch user points
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
//       const response = await axios.get(
//         `http://10.0.0.21:3001/bookings/${username}`
//       );
//       setMeetings(response.data);
//     } catch (error) {
//       console.error("Error fetching meetings:", error);
//     }
//   };

//   const fetchGoals = async () => {
//     try {
//       const response = await axios.get(
//         `http://10.0.0.21:3001/goal/${username}`
//       );
//       setGoals(response.data);
//     } catch (error) {
//       console.error("Error fetching goals:", error);
//     }
//   };

//   const fetchUserPoints = async () => {
//     try {
//       const response = await fetch(`http://10.0.0.21:3001/user-points/${username}`);

//       // Check if the response is valid
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       const data = await response.json();

//       setPoints(data.totalPoints);
//       console.log(data.totalPoints)
//     } catch (error) {
//       console.error('Error fetching points:', error);
//     }
//   };

//   useEffect(() => {
//     fetchUserPoints();
//   }, []);

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
//         if (newStatus === "Cancelled") {
//           navigate("CancelBooking", { id });
//         }
//       }
//     } catch (error) {
//       console.error("Error updating meeting status:", error);
//     }
//   };

//   const handleCancelPress = (id) => {
//     navigate("CancelBooking", { id });
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
//     navigate("Settings", { username });
//   };

//   const goBack = () => {
//     navigate("Home", { username });
//   };
//   const goToEditProfile = () => {
//     navigate("EditProfile", { username });
//   };

//   const calculateGoalPercentages = () => {
//     const totalGoals = goals.length;
//     const completedGoals = goals.filter((goal) => goal.status === "Completed")
//       .length;
//     const canceledGoals = goals.filter((goal) => goal.status === "Cancelled")
//       .length;
//     const inProgressGoals = totalGoals - completedGoals - canceledGoals;

//     return {
//       completed: (completedGoals / totalGoals) * 100,
//       canceled: (canceledGoals / totalGoals) * 100,
//       inProgress: (inProgressGoals / totalGoals) * 100,
//     };
//   };

//   const goalPercentages = calculateGoalPercentages();

//   const chartHtml = `
//     <!DOCTYPE html>
//     <html>
//       <head>
//         <style>
//           body { margin: 0;background-color:#FAFAFA ;}
//           canvas { display: block }
//         </style>
//       </head>
//       <body>

//         <canvas id="goalChart"></canvas>
//         <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
//         <script>
//           const ctx = document.getElementById('goalChart').getContext('2d');
//           new Chart(ctx, {
//             type: 'doughnut',
//             data: {
//               labels: ['Completed', 'Cancelled', 'In Progress'],
//               datasets: [{
//                 label: 'Goal Status',
//                 data: ['30', '60','10'],
//                 backgroundColor: ['#032B79', '#F44336', 'yellow'],
//               }],
//             },
//             options: {
//               responsive: true,
//               plugins: {
//                 legend: {
//                   position: 'top',
//                 },
//               },
//             },
//           });
//         </script>
//       </body>
//     </html>
//   `;
//   return (
//     <>
//       <ScrollView
//         style={[
//           { height: "100%" },
//           { backgroundColor: isDarkMode ? "black" : "#FAFAFA" },
//         ]}
//       >
//         <View style={{ backgroundColor: isDarkMode ? "black" : "#FAFAFA" }}>
//           <TouchableOpacity onPress={goBack}>
//             <Image
//               source={Back}
//               style={{
//                 top: 50,
//                 left: 20,
//                 width: 40,
//                 height: 40,
//               }}
//             />
//           </TouchableOpacity>

//           <Text
//             style={[
//               {
//                 color: "#032B79",
//                 fontSize: 40,
//                 fontWeight: "bold",
//                 textAlign: "center",
//                 top: 0,
//                 width: "40%",
//                 left: 110,
//               },
//               { color: isDarkMode ? "white" : "#032B79" },
//             ]}
//           >
//             Profile
//           </Text>
//           <TouchableOpacity onPress={goToSettings} style={{ width: "10%" }}>
//             <Image
//               style={{ width: 45, height: 45, left: 320, top: -10 }}
//               source={Settings}
//             />
//           </TouchableOpacity>
//           <Image
//             source={Coin}
//             style={{ position: "absolute", top: 135, left: 10 }}
//           />
//           <Text
//             style={[
//               {
//                 fontSize: 20,
//                 fontWeight: "600",
//                 left: 60,
//                 top: 10,
//               },
//               { color: isDarkMode ? "white" : "gray" },
//             ]}
//           >
//             {points} Points
//           </Text>
//           {/* <View style={styles.pointsContainer}>
//         <Image source={Coin} style={styles.coinIcon} />
//         <Text style={styles.pointsText}>{points} Points</Text>
//       </View> */}

//           {imageData ? (
//             <Image
//               style={styles.imagee}
//               source={{ uri: `data:image/jpeg;base64,${imageData} ` }}
//             />
//           ) : (
//             <Text>no imageeeeeeeeeee</Text>
//           )}
//         </View>

//         <View
//           style={[
//             { top: -20, left: 20 },
//             { backgroundColor: isDarkMode ? "black" : "#FAFAFA" },
//           ]}
//         >
//           <Text
//             style={[
//               { top: -90, left: 190, fontSize: 15, fontWeight: "500" },
//               { color: isDarkMode ? "white" : "black" },
//             ]}
//           >
//             {username}
//           </Text>
//           <Text
//             style={[
//               { top: -80, left: 190, fontSize: 15, fontWeight: "500" },
//               { color: isDarkMode ? "white" : "black" },
//             ]}
//           >
//             {bio}
//           </Text>
//           <TouchableOpacity onPress={goToEditProfile}>
//             <Text
//               style={[
//                 {
//                   width: "40%",
//                   borderColor: "#E5E0E0",
//                   borderWidth: 1,
//                   borderRadius: 10,
//                   padding: 5,
//                   textAlign: "center",
//                   left: 185,
//                   top: -60,
//                 },
//                 {
//                   backgroundColor: isDarkMode ? "gray" : "white",
//                   color: isDarkMode ? "white" : "black",
//                 },
//               ]}
//             >
//               Edit your Profile
//             </Text>
//           </TouchableOpacity>
//         </View>

//         <View
//           style={[
//             styles.container,
//             { backgroundColor: isDarkMode ? "black" : "#FAFAFA" },
//           ]}
//         >
//           <View style={styles.header}>
//             <View
//               style={[
//                 styles.sectionSwitcher,
//                 ,
//                 { backgroundColor: isDarkMode ? "gray" : "white" },
//               ]}
//             >
//               <TouchableOpacity
//                 style={[
//                   styles.sectionButton,
//                   activeSection === "Meetings"
//                     ? styles.activeSectionButton
//                     : null,
//                 ]}
//                 onPress={() => setActiveSection("Meetings")}
//               >
//                 <Text
//                   style={[
//                     styles.sectionButtonText,
//                     activeSection === "Meetings"
//                       ? styles.activeSectionButtonText
//                       : null,
//                   ]}
//                 >
//                   Meetings
//                 </Text>
//               </TouchableOpacity>

//               <TouchableOpacity
//                 style={[
//                   styles.sectionButton,
//                   activeSection === "Goals" ? styles.activeSectionButton : null,
//                 ]}
//                 onPress={() => setActiveSection("Goals")}
//               >
//                 <Text
//                   style={[
//                     styles.sectionButtonText,
//                     activeSection === "Goals"
//                       ? styles.activeSectionButtonText
//                       : null,
//                   ]}
//                 >
//                   Goals
//                 </Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//           {activeSection === "Goals" && (
//             <WebView
//               originWhitelist={["*"]}
//               source={{ html: chartHtml }}
//               style={{ top: 10 }}
//             />
//           )}

//           <View style={styles.statusContainer}>
//             <TouchableOpacity
//               style={[
//                 styles.statusButton,
//                 activeStatus === "upcoming" ? styles.activeStatusButton : null,
//               ]}
//               onPress={() => setActiveStatus("upcoming")}
//             >
//               <Text
//                 style={[
//                   styles.statusButtonText,
//                   activeStatus === "upcoming"
//                     ? styles.activeStatusButtonText
//                     : null,
//                 ]}
//               >
//                 In Progress
//               </Text>
//             </TouchableOpacity>
//             <TouchableOpacity
//               style={[
//                 styles.statusButton,
//                 activeStatus === "Completed" ? styles.activeStatusButton : null,
//               ]}
//               onPress={() => setActiveStatus("Completed")}
//             >
//               <Text
//                 style={[
//                   styles.statusButtonText,
//                   activeStatus === "Completed"
//                     ? styles.activeStatusButtonText
//                     : null,
//                 ]}
//               >
//                 Completed
//               </Text>
//             </TouchableOpacity>
//             <TouchableOpacity
//               style={[
//                 styles.statusButton,
//                 activeStatus === "Cancelled" ? styles.activeStatusButton : null,
//               ]}
//               onPress={() => setActiveStatus("Cancelled")}
//             >
//               <Text
//                 style={[
//                   styles.statusButtonText,
//                   activeStatus === "Cancelled"
//                     ? styles.activeStatusButtonText
//                     : null,
//                 ]}
//               >
//                 Cancelled
//               </Text>
//             </TouchableOpacity>
//           </View>

//           <FlatList
//             data={filteredData}
//             renderItem={renderItem}
//             keyExtractor={(item) => item._id}
//             style={styles.listContainer}
//           />
//         </View>
//       </ScrollView>
//     </>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     top: -70,
//     flex: 1,
//     backgroundColor: "#FAFAFA",
//     paddingHorizontal: 16,
//     paddingVertical: 24,
//     height: 1500,
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
//     top: 0,
//   },
//   actionButtonText2: {
//     fontSize: 15,
//     fontWeight: "bold",
//     color: "white",
//     top: 0,
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
//     width: 130,
//     justifyContent: "center",
//   },
//   sectionButtonText: {
//     fontSize: 14,
//     fontWeight: "bold",
//     color: "#032B79",
//   },
//   activeSectionButtonText: {
//     color: "#fff",
//     textAlign: "center",
//   },
//   statusContainer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginBottom: 15,
//     top: 0,
//   },
//   listContainer: {
//     flex: 1,
//     height: 300,
//     top: 0,
//   },
//   statusButton: {
//     borderRadius: 8,
//     paddingVertical: 8,
//     paddingHorizontal: 16,
//     flex: 1,
//     marginHorizontal: 4,
//   },
//   activeStatusButton: {
//     // backgroundColor: "#032B79",
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
//     color: "white",
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
//   imagee: {
//     width: 150,
//     height: 150,
//     top: -20,
//     left: 10,
//     marginTop:40,
//     borderRadius:150
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
  ScrollView,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import Settings from "../assets/settings.png";
import Coin from "../assets/coin.png";
import Back from "../assets/arrowBack.png";
import { DarkModeContext } from "../components/DarkModeContext"; // Import the context
import GoalIcon from "../assets/goalIcon.png";
import AppIcon from "../assets/appointment.png";
import WhiteArrow from "../assets/whiteArrowBack.png";
import WhiteSettings from "../assets/WhiteSettings.png";
const App = ({ route }) => {
  const { navigate } = useNavigation();
  const { username, userId } = route.params;
  const [bio, setBio] = useState("");
  const [points, setPoints] = useState(0); // Add state for points
  const [email, setEmail] = useState("");
  const { isDarkMode } = useContext(DarkModeContext);
  const [phoneNo, setphoneNo] = useState(0);

  const [imageData, setImageData] = useState(null);

  const [activeSection, setActiveSection] = useState("Meetings");
  const [activeStatus, setActiveStatus] = useState("upcoming");
  const [meetings, setMeetings] = useState([]);
  const [goals, setGoals] = useState([]);
  console.log(bio);

  useEffect(() => {
    fetchUserProfile();
    fetchMeetings();
    fetchGoals();
    fetchUserPoints();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const response = await axios.get(`http://10.0.0.21:3001/user/${userId}`);
      setBio(response.data.bio);
      setImageData(response.data.image);
      setEmail(response.data.email);
      setphoneNo(response.data.phoneNo);
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  const fetchMeetings = async () => {
    try {
      const response = await axios.get(
        `http://10.0.0.21:3001/bookings/${userId}`
      );
      setMeetings(response.data);
    } catch (error) {
      console.error("Error fetching meetings:", error);
    }
  };

  const fetchGoals = async () => {
    try {
      const response = await axios.get(`http://10.0.0.21:3001/goal/${userId}`);
      setGoals(response.data);
    } catch (error) {
      console.error("Error fetching goals:", error);
    }
  };

  const fetchUserPoints = async () => {
    try {
      const response = await axios.get(
        `http://10.0.0.21:3001/user-points/${userId}`
      );

      // Set the points if the response is successful
      setPoints(response.data.totalPoints);
      console.log(response.data.totalPoints);
    } catch (error) {
      console.error("Error fetching points:", error);
    }
  };

  useEffect(() => {
    fetchUserPoints();
  }, []);

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
        if (newStatus === "Cancelled") {
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
        <View style={styles.itemContainer2}>
          <Text style={styles.itemTitle2}>Dr. {item.mentorName} </Text>
          <Image
            source={AppIcon}
            style={{
              width: 80,
              height: 80,
              position: "absolute",
              top: 12,
              left: 12,
            }}
          />

          <Text style={styles.itemTitle3}>
            on {new Date(item.date).toDateString()}
          </Text>
          <Text style={styles.itemTitle3}> at {item.time}</Text>
          <View style={styles.statusContainer}>
            {(item.status === "upcoming" || item.status === "in progress") && (
              <View style={styles.actionButtons2}>
                <TouchableOpacity
                  style={[styles.actionButton, styles.doneButton]}
                  onPress={() =>
                    handleStatusChange(item._id, "Completed", item.status)
                  }
                >
                  <Text style={styles.actionButtonTextt2}>Done</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.actionButton, styles.cancelButton]}
                  onPress={() =>
                    handleStatusChange(item._id, "Cancelled", item.status)
                  }
                >
                  <Text style={styles.actionButtonTextt}>Cancel</Text>
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
          <Image
            source={GoalIcon}
            style={{
              width: 50,
              height: 50,
              position: "absolute",
              top: 12,
              left: 12,
            }}
          />

          <View style={styles.statusContainer}>
            {(item.status === "upcoming" || item.status === "in progress") && (
              <View style={styles.actionButtons}>
                <TouchableOpacity
                  style={[styles.actionButton]}
                  onPress={() =>
                    handleStatusChange(item._id, "Completed", item.status)
                  }
                >
                  <Text style={styles.actionButtonText2}>
                    Mark as completed
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.actionButton]}
                  onPress={() =>
                    handleStatusChange(item._id, "Cancelled", item.status)
                  }
                >
                  <Text style={styles.actionButtonText}>Mark as failed</Text>
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
      ? meetings.filter(
          (meeting) =>
            meeting.status === activeStatus ||
            (activeStatus === "upcoming" && meeting.status === "in progress")
        )
      : goals.filter(
          (goal) =>
            goal.status === activeStatus ||
            (activeStatus === "upcoming" && goal.status === "in progress")
        );

  const goToSettings = () => {
    navigate("Settings", { username, userId, bio, imageData, email, phoneNo });
  };

  const goBack = () => {
    navigate("Home", { username, userId });
  };
  const goToEditProfile = () => {
    navigate("EditProfile", {
      username,
      bio,
      imageData,
      email,
      userId,
      phoneNo,
    });
  };

  const calculateGoalPercentages = () => {
    const totalGoals = goals.length;
    const completedGoals = goals.filter((goal) => goal.status === "Completed")
      .length;
    const canceledGoals = goals.filter((goal) => goal.status === "Cancelled")
      .length;
    const inProgressGoals = totalGoals - completedGoals - canceledGoals;

    return {
      completed: (completedGoals / totalGoals) * 100,
      canceled: (canceledGoals / totalGoals) * 100,
      inProgress: (inProgressGoals / totalGoals) * 100,
    };
  };

  const goalPercentages = calculateGoalPercentages();

  const screenWidth = Dimensions.get("window").width;

  return (
    <>
      <ScrollView
        style={[
          { height: "100%" },
          { backgroundColor: isDarkMode ? "black" : "#FAFAFA" },
        ]}
      >
        <View style={{ backgroundColor: isDarkMode ? "black" : "#FAFAFA" }}>
          <TouchableOpacity onPress={goBack}>
            {isDarkMode ? (
              <Image
                source={WhiteArrow}
                style={{
                  top: 50,
                  left: 20,
                  width: 40,
                  height: 40,
                }}
              />

            ) : (
              <Image
                source={Back}
                style={{
                  top: 50,
                  left: 20,
                  width: 40,
                  height: 40,
                }}
              />
            )}
          </TouchableOpacity>

          <Text
            style={[
              {
                color: "#032B79",
                fontSize: 40,
                fontWeight: "bold",
                textAlign: "center",
                top: 0,
                width: "40%",
                left: 110,
              },
              { color: isDarkMode ? "white" : "#032B79" },
            ]}
          >
            Profile
          </Text>
          <TouchableOpacity onPress={goToSettings} style={{ width: "10%" }}>
            {isDarkMode ? (
              <Image
                source={WhiteSettings}
                style={{ width: 45, height: 45, left: 330, top: -45 }}
              />
            ) : (
              <Image
                style={{ width: 45, height: 45, left: 330, top: -45 }}
                source={Settings}
              />
            )}
          </TouchableOpacity>
          <Image
            source={Coin}
            style={{ position: "absolute", top: 130, left: 30 }}
          />
          <Text
            style={[
              {
                fontSize: 20,
                fontWeight: "600",
                left: 80,
                top: 3,
              },
              { color: isDarkMode ? "white" : "gray" },
            ]}
          >
            {points}
          </Text>

          {imageData ? (
            <Image
              style={styles.imagee}
              source={{ uri: `data:image/jpeg;base64,${imageData} ` }}
            />
          ) : (
            <Text>no imageeeeeeeeeee</Text>
          )}
        </View>

        <View
          style={[
            { top: -40, left: 20 },
            // { backgroundColor: isDarkMode ? "black" : "#FAFAFA" },
          ]}
        >
          <Text
            style={[
              { top: -90, left: 190, fontSize: 15, fontWeight: "500" },
              { color: isDarkMode ? "white" : "black" },
            ]}
          >

            {username}
          </Text>
          <Text
            style={[
              { top: -80, left: 190, fontSize: 15, fontWeight: "500", width:"50%" },
              { color: isDarkMode ? "white" : "black" },
            ]}
          >
            {bio}
          </Text>
          <TouchableOpacity onPress={goToEditProfile}>
            <Text
              style={[
                {
                  width: "40%",
                  // borderColor: "#E5E0E0",
                  // borderWidth: 1,
                  borderRadius: 10,
                  padding: 5,
                  textAlign: "center",
                  left: 185,
                  top: -60,
                  fontSize: 12,
                },
                {
                  backgroundColor: isDarkMode ? "#1f1f1f" : "#032B79",
                  color: isDarkMode ? "white" : "white",
                },
              ]}
            >
              Edit your Profile
            </Text>
          </TouchableOpacity>
        </View>

        <View
          style={[
            styles.container,
            { backgroundColor: isDarkMode ? "black" : "#FAFAFA" },
          ]}
        >
          <View style={styles.header}>
            <View
              style={[
                styles.sectionSwitcher,
                ,
                { backgroundColor: isDarkMode ? "#1f1f1f" : "white" },
              ]}
            >
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

          {activeSection === "Goals" && (
            <View style={[styles.chartContainer,{backgroundColor:isDarkMode?"#1f1f1f":"white"},]}>
              <Text style={[styles.chartTitle,{color:isDarkMode?"white":"#032B79"}]}>Goal Status</Text>
              <View style={styles.barContainer}>
                <Text style={[styles.barLabel,{color:isDarkMode?"white":"#032B79"}]}>In Progress</Text>
                <View
                  style={[
                    styles.bar,
                    {
                      width: `${goalPercentages.inProgress}%`,
                      backgroundColor: "yellow",
                      
                    },
                  ]}
                />
                <Text style={[styles.percentageLabel,{color:isDarkMode?"white":"#032B79"}]}>
                  {goalPercentages.inProgress.toFixed(2)}%
                </Text>
              </View>
              <View style={styles.barContainer}>
                <Text style={[styles.barLabel,{color:isDarkMode?"white":"#032B79"}]}>Completed</Text>
                <View
                  style={[
                    styles.bar,
                    {
                      width: `${goalPercentages.completed}%`,
                      backgroundColor: "blue",
                    },
                  ]}
                />
                <Text style={[styles.percentageLabel,{color:isDarkMode?"white":"#032B79"}]}>
                  {goalPercentages.completed.toFixed(2)}%
                </Text>
              </View>
              <View style={styles.barContainer}>
                <Text style={[styles.barLabel,{color:isDarkMode?"white":"#032B79"}]}>Cancelled</Text>
                <View
                  style={[
                    styles.bar,
                    {
                      width: `${goalPercentages.canceled}%`,
                      backgroundColor: "red",
                    },
                  ]}
                />
                <Text style={[styles.percentageLabel,{color:isDarkMode?"white":"#032B79"}]}>
                  {goalPercentages.canceled.toFixed(2)}%
                </Text>
              </View>
            </View>
          )}

          <View style={styles.statusContainer2}>
            <TouchableOpacity
              style={[
                styles.statusButton,
                activeStatus === "upcoming" ? styles.activeStatusButton : null,
                
              ]}
              onPress={() => setActiveStatus("upcoming")}
            >
              <Text
                style={[
                  styles.statusButtonText,{color:isDarkMode?"white":"#606060"},
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
                  styles.statusButtonText,,{color:isDarkMode?"white":"#606060"},
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
                  styles.statusButtonText,{color:isDarkMode?"white":"#606060"},
                  activeStatus === "Cancelled"
                    ? styles.activeStatusButtonText
                    : null,
                ]}
              >
                Cancelled
              </Text>
            </TouchableOpacity>
          </View>

          {/* <FlatList
            data={filteredData}
            renderItem={renderItem}
            keyExtractor={(item) => item._id}
            style={styles.listContainer}
          /> */}
          {filteredData.length === 0 ? (
    <Text style={[{ textAlign: "center", fontSize:18, color: isDarkMode ? "white" : "black", marginTop: 80 }]}>
      {activeSection === "Meetings"
        ? `No meeting ${activeStatus.toLowerCase()}`
        : `No goal ${activeStatus.toLowerCase()}`}
    </Text>
  ) : (
    <FlatList
      data={filteredData}
      renderItem={renderItem}
      keyExtractor={(item) => item._id}
      style={styles.listContainer}
    />
  )}
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    top: -70,
    flex: 1,
    backgroundColor: "#FAFAFA",
    paddingHorizontal: 16,
    paddingVertical: 24,
    height: 1500,
    
  },
  actionButtons: {
    flexDirection: "row",
    marginLeft: 16,
    top: 5,

    gap: 10,
  },
  actionButtons2: {
    flexDirection: "row",
    right: 265,
    top: 10,
    gap: 10,
    position: "absolute",
  },
  actionButton: {
    // backgroundColor: "#f0f0f0",
    borderRadius: 8,
    paddingVertical: 4,
    paddingHorizontal: 8,
    marginRight: 8,
  },
  // doneButton: {
  //   backgroundColor: "#032B79",
  // },
  // cancelButton: {
  //   backgroundColor: "#032B79",
  // },
  actionButtonText: {
    fontSize: 10,
    color: "red",
    top: 25,
    left: -50,
  },
  actionButtonText2: {
    fontSize: 10,
    color: "white",
    top: 25,
    left: -50,
  },

  actionButtonTextt: {
    fontSize: 10,
    color: "white",
    top: 30,
    left: -50,
    backgroundColor: "red",
    padding: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  actionButtonTextt2: {
    fontSize: 10,
    color: "blue",
    top: 30,
    left: -50,
    backgroundColor: "white",
    padding: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
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
    width: 130,
    justifyContent: "center",
  },
  sectionButtonText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#032B79",
  },
  activeSectionButtonText: {
    color: "#fff",
    textAlign: "center",
  },
  statusContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 40,
    top: 0,
    alignItems:"center"
  },
  statusContainer2: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    top: 0,
    alignItems:"center"
  },
  listContainer: {
    flex: 1,
    height: 300,
    top: 0,
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
    textAlign: "center",
    color: "#606060",
  },
  activeStatusButtonText: {
    color: "#032B79",
  },

  itemContainer: {
    backgroundColor: "#032B79",
    borderRadius: 15,
    paddingVertical: 15,
    paddingHorizontal: 100,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 4,
  },
  itemContainer2: {
    backgroundColor: "#032B79",
    borderRadius: 15,
    paddingVertical: 35,
    paddingHorizontal: 110,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 4,
  },
  itemTitle: {
    position: "absolute",
    fontSize: 18,
    color: "white",
    top: 20,
    left: 72,
  },
  itemTitle2: {
    fontSize: 18,
    color: "white",
    top: -25,
    right: 10,
  },
  itemTitle3: {
    fontSize: 15,
    color: "white",
    top: 5,
    right: 90,
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
  imagee: {
    width: 150,
    height: 150,
    top: -20,
    left: 30,
    marginTop: 40,
    borderRadius: 150,
    borderColor: "#032B79",
    borderWidth: 4,
  },
  chartContainer: {
    padding: 20,
    marginBottom: 20,
    backgroundColor: "white",
    borderRadius: 10,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    // color: "#032B79",
    textAlign: "center",
  },
  barContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  bar: {
    height: 20,
    borderRadius: 5,
  },
  barLabel: {
    width: 100,
    fontSize: 14,
   
  },
  percentageLabel: {
    marginLeft: 5,
    fontSize: 14,
    // fontWeight: "bold",
    color: "#032B79",
  },
});

export default App;
