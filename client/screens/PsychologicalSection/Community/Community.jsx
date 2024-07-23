import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  Image,
} from "react-native";
import axios from "axios";
import BlueEllipse from "../../../assets/blueEllipse.png";
import Back from "../../../assets/arrowBack.png";
export default function GroupsScreen({ navigation }) {
  const [groups, setGroups] = useState([]);
  const [joinedGroups, setJoinedGroups] = useState([]);
  const userId = "user1";

  useEffect(() => {
    fetchGroups();
  }, []);

  const fetchGroups = async () => {
    try {
      const response = await axios.get("http://10.0.0.21:3001/groups");
      setGroups(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const joinGroup = async (groupId) => {
    // if (joinedGroups.some((group) => group._id === groupId)) {
    //   Alert.alert("Info", "You have already joined this group");
    //   return;
    // }

    try {
      const response = await axios.post(
        `http://10.0.0.21:3001/groups/${groupId}/join`,
        {
          userId,
        }
      );
      Alert.alert("Success", `You have joined ${response.data.name}`);
      const updatedGroup = response.data;
      setGroups((prevGroups) =>
        prevGroups.map((group) =>
          group._id === groupId ? updatedGroup : group
        )
      );
      setJoinedGroups((prevJoinedGroups) => [
        ...prevJoinedGroups,
        updatedGroup,
      ]);
      navigation.navigate("Chat", { groupId });
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Failed to join the group");
    }
  };
  const BackToPsycho = () => {
    navigation.navigate("PsychologicalSection");
  };

  return (
    <>
      <View style={{ height: "100%", backgroundColor: "#f5f5f5" }}>
        <Image
          source={BlueEllipse}
          style={{ width: 120, height: 120, left: 290, top: -40 }}
        />
        <TouchableOpacity onPress={BackToPsycho}>
          <Image
            source={Back}
            style={{ width: 40, height: 40, left: 20, top: -50 }}
          />
        </TouchableOpacity>

        <ScrollView style={styles.container}>
          <Text style={styles.header}>Communities</Text>
          <View style={styles.groupsContainer}>
            {groups.map((item) => (
              <View key={item._id} style={styles.groupItem}>
                <Text style={styles.groupName}>{item.name}</Text>
                <Text style={styles.groupDescription}>{item.description}</Text>
                <View style={styles.bottomRow}>
                  <Text style={styles.groupMembers}>{`${item.members?.length ||
                    0} participants`}</Text>
                  
                  <TouchableOpacity
                    style={styles.joinButton}
                    onPress={() => joinGroup(item._id)}
                    disabled={item.status === "joined"}
                  >
                    <Text style={styles.joinButtonText}>
                      {item.status === "joined" ? "Joined" : "Join Now"}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}


            
          </View>
          <TouchableOpacity
            style={styles.viewJoinedButton}
            onPress={() => navigation.navigate("Community", { joinedGroups })}
          >
            <Text style={styles.viewJoinedButtonText}>
              View Joined Communities
            </Text>
          </TouchableOpacity>
        </ScrollView>
        <Image
          source={BlueEllipse}
          style={{ width: 120, height: 120, left: -50, top: 40 }}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
    marginTop: -50,
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    left: -90,
    color: "#032B79",
  },
  groupsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  groupItem: {
    width: "48%",
    marginBottom: 20,
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    alignItems: "center",
  },
  groupName: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  groupDescription: {
    fontSize: 14,
    color: "#888",
    marginBottom: 20,
    textAlign: "center",
  },
  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  groupMembers: {
    fontSize: 14,
    color: "#888",
    left: 20,
  },
  joinButton: {
    backgroundColor: "#4a90e2",
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    top: -40,
    right: 70,
  },
  joinButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  viewJoinedButton: {
    marginTop: 20,
    backgroundColor: "#4a90e2",
    paddingVertical: 12,
    borderRadius: 20,
    alignItems: "center",
  },
  viewJoinedButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});



// import React, { useState, useEffect } from "react";
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   Alert,
//   ScrollView,
//   Image,
// } from "react-native";
// import axios from "axios";
// import BlueEllipse from "../../../assets/blueEllipse.png";
// import Back from "../../../assets/arrowBack.png";

// export default function GroupsScreen({ navigation }) {
//   const [groups, setGroups] = useState([]);
//   const [joinedGroups, setJoinedGroups] = useState([]);
//   const userId = "user1";

//   useEffect(() => {
//     fetchGroups();
//   }, []);

//   const fetchGroups = async () => {
//     try {
//       const response = await axios.get("http://10.0.0.21:3001/groups");
//       setGroups(response.data);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const joinGroup = async (groupId) => {
//     try {
//       const response = await axios.post(
//         `http://10.0.0.21:3001/groups/${groupId}/join`,
//         {
//           userId,
//         }
//       );
//       Alert.alert("Success", `You have joined ${response.data.name}`);
//       const updatedGroup = response.data;
//       setGroups((prevGroups) =>
//         prevGroups.map((group) =>
//           group._id === groupId ? updatedGroup : group
//         )
//       );

//       setJoinedGroups((prevJoinedGroups) => [
//         ...prevJoinedGroups,
//         updatedGroup,
//       ]);
//       navigation.navigate("Chat", { groupId });
//     } catch (error) {
//       console.error(error);
//       Alert.alert("Error", "Failed to join the group");
//     }

//   };

//   const BackToPsycho = () => {
//     navigation.navigate("PsychologicalSection");
//   };

//   return (
//     <>
//       <View style={{ height: "100%", backgroundColor: "#121212" }}>
//         <Image
//           source={BlueEllipse}
//           style={{ width: 120, height: 120, left: 290, top: -40 }}
//         />
//         <TouchableOpacity onPress={BackToPsycho}>
//           <Image
//             source={Back}
//             style={{ width: 40, height: 40, left: 20, top: -50 }}
//           />
//         </TouchableOpacity>

//         <ScrollView style={styles.container}>
//           <Text style={styles.header}>Communities</Text>
//           <View style={styles.groupsContainer}>
//             {groups.map((item) => (
//               <View key={item._id} style={styles.groupItem}>
//                 <Text style={styles.groupName}>{item.name}</Text>
//                 <Text style={styles.groupDescription}>{item.description}</Text>
//                 <View style={styles.bottomRow}>
//                   <Text style={styles.groupMembers}>
//                     {`${item.members?.length || 0} participants`}
//                   </Text>

//                   <TouchableOpacity
//                     style={styles.joinButton}
//                     onPress={() => joinGroup(item._id)}
//                     disabled={item.status === "joined"}
//                   >
//                     <Text style={styles.joinButtonText}>
//                       {item.status === "joined" ? "Joined" : "Join Now"}
//                     </Text>
//                   </TouchableOpacity>
//                 </View>
//               </View>
//             ))}
//           </View>
//           <TouchableOpacity
//             style={styles.viewJoinedButton}
//             onPress={() => navigation.navigate("Community", { joinedGroups })}
//           >
//             <Text style={styles.viewJoinedButtonText}>
//               View Joined Communities
//             </Text>
//           </TouchableOpacity>
//         </ScrollView>
//         <Image
//           source={BlueEllipse}
//           style={{ width: 120, height: 120, left: -50, top: 40 }}
//         />
//       </View>
//     </>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: "#121212", // Dark mode background color
//     marginTop: -50,
//   },
//   header: {
//     fontSize: 28,
//     fontWeight: "bold",
//     marginBottom: 20,
//     textAlign: "center",
//     left: -90,
//     color: "white", // Light color for dark mode
//   },
//   groupsContainer: {
//     flexDirection: "row",
//     flexWrap: "wrap",
//     justifyContent: "space-between",
//   },
//   groupItem: {
//     width: "48%",
//     marginBottom: 20,
//     padding: 20,
//     backgroundColor: "#1E1E1E", // Darker background for dark mode
//     borderRadius: 15,
//     shadowColor: "#000",
//     shadowOpacity: 0.1,
//     shadowRadius: 10,
//     shadowOffset: { width: 0, height: 5 },
//     alignItems: "center",
//   },
//   groupName: {
//     fontSize: 20,
//     fontWeight: "bold",
//     marginBottom: 10,
//     textAlign: "center",
//     color: "#FFFFFF", // White text for dark mode
//   },
//   groupDescription: {
//     fontSize: 14,
//     color: "#AAAAAA", // Light gray for dark mode
//     marginBottom: 20,
//     textAlign: "center",
//   },
//   bottomRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     width: "100%",
//   },
//   groupMembers: {
//     fontSize: 14,
//     color: "#AAAAAA", // Light gray for dark mode
//     left: 20,
//   },
//   joinButton: {
//     backgroundColor: "#4A90E2",
//     paddingVertical: 8,
//     paddingHorizontal: 20,
//     borderRadius: 20,
//     top: -40,
//     right: 70,
//   },
//   joinButtonText: {
//     color: "#FFFFFF", // White text for dark mode
//     fontSize: 16,
//   },
//   viewJoinedButton: {
//     marginTop: 20,
//     backgroundColor: "#4A90E2",
//     paddingVertical: 12,
//     borderRadius: 20,
//     alignItems: "center",
//   },
//   viewJoinedButtonText: {
//     color: "#FFFFFF", // White text for dark mode
//     fontSize: 16,
//   },
// });
