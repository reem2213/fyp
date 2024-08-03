// import React, { useEffect, useState, useContext } from "react";
// import {
//   Text,
//   View,
//   FlatList,
//   StyleSheet,
//   TouchableOpacity,
//   Image,
//   Dimensions,
// } from "react-native";
// import axios from "axios";
// import BlueEllipse from "../assets/blueEllipse.png";
// import { DarkModeContext } from "../components/DarkModeContext"; // Import the context
// import Plus from "../assets/plus.png";

// import Psycho from "../assets/psychologicLight.png";
// import Physical from "../assets/physicalSectionLight.png";
// import SettingsIcon from "../assets/settings.png";
// import HomeIcon from "../assets/homeLight.png";
// const CommunityJoined = ({ route, navigation }) => {
//   const { isDarkMode } = useContext(DarkModeContext); // Use the context
//   const [joinedGroups, setJoinedGroups] = useState([]);
//   const { username } = route.params;

//   useEffect(() => {
//     fetchJoinedGroups();
//   }, []);

//   const fetchJoinedGroups = async () => {
//     try {
//       const response = await axios.get("http://10.0.0.21:3001/groups/joined");
//       setJoinedGroups(response.data);
//     } catch (error) {
//       console.error("Failed to fetch joined groups:", error);
//     }
//   };

//   const goToCommunities = () => {
//     navigation.navigate("Communities");
//   };

//   const renderGroupPair = ({ item, index }) => {
//     const secondItem = joinedGroups[index * 2 + 1];
//     return (
//       <View style={styles.row}>
//         <View
//           style={[
//             styles.groupItem,
//             { backgroundColor: isDarkMode ? "gray" : "#fff" },
//           ]}
//         >
//           <TouchableOpacity
//             onPress={() =>
//               navigation.navigate("Chat", { groupId: item._id, username })
//             }
//           >
        
//           <Text
//             style={[
//               styles.groupName,
//               { color: isDarkMode ? "white" : "black" },
//             ]}
//           >
//             {item.name}
//           </Text>
//           <Text
//             style={[
//               styles.groupMembers,
//               { color: isDarkMode ? "#ccc" : "#888" },
//             ]}
//           >{`${item.members?.length || 0} participants`}</Text>
//             </TouchableOpacity>
//         </View>
//         {secondItem && (
//           <View
//             style={[
//               styles.groupItem,
//               { backgroundColor: isDarkMode ? "gray" : "#fff" },
//             ]}
//           >
//             <Text
//               style={[
//                 styles.groupName,
//                 { color: isDarkMode ? "white" : "black" },
//               ]}
//             >
//               {secondItem.name}
//             </Text>
//             <Text
//               style={[
//                 styles.groupMembers,
//                 { color: isDarkMode ? "#ccc" : "#888" },
//               ]}
//             >{`${secondItem.members?.length || 0} participants`}</Text>
//           </View>
//         )}
//       </View>
//     );
//   };
//   const ToHome = () => {
//     navigation.navigate("Home", { username });
//   };
//   const ToCommunity = () => {
//     ata;
//     navigation.navigate("Community", { username });
//   };
//   const ToPsychologicalSection = () => {
//     navigation.navigate("PsychologicalSection", { username });
//   };
//   const ToPhysicalSection = () => {
//     navigation.navigate("PhysicalSection", { username });
//   };
//   const ToSettings = () => {
//     navigation.navigate("Settings", { username });
//   };
//   return (
//     <>
//       <View
//         style={[
//           styles.container,
//           { backgroundColor: isDarkMode ? "black" : "#f5f5f5" },
//         ]}
//       >
//         <Image
//           source={BlueEllipse}
//           style={{
//             width: 120,
//             height: 120,
//             left: 300,
//             top: -40,
//             position: "absolute",
//           }}
//         />
//         <Text
//           style={[styles.header, { color: isDarkMode ? "white" : "#032B79" }]}
//         >
//           Communities
//         </Text>

//         {joinedGroups.length > 0 ? (
//           <>
//             <FlatList
//               data={joinedGroups.filter((_, index) => index % 2 === 0)}
//               keyExtractor={(item, index) => `row-${index}`}
//               renderItem={renderGroupPair}
//               contentContainerStyle={styles.listContent}
//             />
//           </>
//         ) : (
//           <View style={styles.noGroupsContainer}>
//             <Text
//               style={[
//                 styles.noGroupsText,
//                 { color: isDarkMode ? "white" : "#032B79" },
//               ]}
//             >
//               No communities joined yet
//             </Text>
//             <Text
//               style={[
//                 styles.exploreText,
//                 { color: isDarkMode ? "#ccc" : "#888" },
//               ]}
//             >
//               Start exploring and join communities to engage with like-minded
//               individuals.
//             </Text>
//             <TouchableOpacity
//               style={styles.joinButton}
//               onPress={goToCommunities}
//             >
//               <Text style={styles.joinButtonText}>Join Now</Text>
//             </TouchableOpacity>
//           </View>
//         )}
//         <Image
//           source={BlueEllipse}
//           style={{
//             width: 120,
//             height: 120,
//             left: -50,
//             bottom: 0,
//             position: "absolute",
//           }}
//         />
//       </View>
//       <View
//         style={{
//           flexDirection: "row",
//           height: 70,
//           padding: 10,
//           left: 10,
//           top: -10,
//         }}
//       >
//         <TouchableOpacity onPress={ToHome}>
//           <Image source={HomeIcon} style={{ margin: 10 }} />
//         </TouchableOpacity>

//         <TouchableOpacity onPress={ToCommunity}>
//           <Image source={Plus} style={{ margin: 10 }} />
//         </TouchableOpacity>

//         <TouchableOpacity onPress={ToPsychologicalSection}>
//           <Image
//             source={Psycho}
//             style={{ margin: 10, width: 50, height: 50 }}
//           />
//         </TouchableOpacity>

//         <TouchableOpacity onPress={ToPhysicalSection}>
//           <Image source={Physical} style={{ margin: 10 }} />
//         </TouchableOpacity>

//         <TouchableOpacity onPress={ToSettings}>
//           <Image source={SettingsIcon} style={{ margin: 10 }} />
//         </TouchableOpacity>
//       </View>
//     </>
//   );
// };

// const windowWidth = Dimensions.get("window").width;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingTop: 80,
//   },
//   header: {
//     fontSize: 35,
//     fontWeight: "bold",
//     marginBottom: 20,
//     paddingLeft: 20,
//   },
//   listContent: {
//     paddingHorizontal: 10,
//   },
//   row: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginBottom: 20,
//   },
//   groupItem: {
//     padding: 15,
//     borderRadius: 8,
//     width: (windowWidth - 40) / 2,
//     shadowColor: "#000",
//     shadowOpacity: 0.1,
//     shadowRadius: 10,
//     shadowOffset: { width: 0, height: 5 },
//     alignItems: "center",
//   },
//   groupName: {
//     fontSize: 16,
//     fontWeight: "bold",
//     textAlign: "center",
//   },
//   groupMembers: {
//     fontSize: 14,
//     marginTop: 5,
//   },
//   noGroupsContainer: {
//     justifyContent: "center",
//     alignItems: "center",
//     marginTop: 150,
//   },
//   noGroupsText: {
//     fontSize: 18,
//     marginBottom: 10,
//     fontWeight: "bold",
//   },
//   exploreText: {
//     fontSize: 14,
//     textAlign: "center",
//     marginHorizontal: 30,
//     marginBottom: 20,
//   },
//   joinButton: {
//     backgroundColor: "#719AEA",
//     paddingVertical: 10,
//     paddingHorizontal: 30,
//     borderRadius: 8,
//   },
//   joinButtonText: {
//     fontSize: 16,
//     color: "#fff",
//     fontWeight: "bold",
//   },
// });

// export default CommunityJoined;


import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from "react-native";
import axios from "axios";
import BlueEllipse from "../assets/blueEllipse.png";
import Back from "../assets/arrowBack.png";
import { DarkModeContext } from "../components/DarkModeContext";
import GrayEllipse from '../assets/grayEllipse.png';

export default function CommunitiesJoinedScreen({ navigation, route }) {
  const [joinedGroups, setJoinedGroups] = useState([]);
  const { username } = route.params;
  const { isDarkMode } = useContext(DarkModeContext);

  useEffect(() => {
    fetchJoinedGroups();
  }, []);

  const fetchJoinedGroups = async () => {
    try {
      const response = await axios.get(`http://10.0.0.21:3001/groups/joined?username=${username}`);
      setJoinedGroups(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const BackToGroups = () => {
    navigation.navigate("Home", { username });
  };

  return (
    <View style={[{ height: "100%", backgroundColor: "#f5f5f5" }, { backgroundColor: isDarkMode ? "black" : "#f5f5f5" }]}>
      {isDarkMode ? (
        <Image
          source={GrayEllipse}
          style={{ width: 120, height: 120, left: 290, top: -40 }}
        />
      ) : (
        <Image
          source={BlueEllipse}
          style={{ width: 120, height: 120, left: 290, top: -40 }}
        />
      )}

      <TouchableOpacity onPress={BackToGroups}>
        <Image
          source={Back}
          style={{ width: 40, height: 40, left: 20, top: -50 }}
        />
      </TouchableOpacity>

      <ScrollView style={[styles.container, { backgroundColor: isDarkMode ? "black" : "#f5f5f5" }]}>
        <Text style={[styles.header, { color: isDarkMode ? "white" : "#032B79" }]}>Joined Communities</Text>
        <View style={styles.groupsContainer}>
          {joinedGroups.map((item) => (
            <View key={item._id} style={[styles.groupItem, { backgroundColor: isDarkMode ? "gray" : "#fff" }]}>
              <Text style={[styles.groupName, { color: isDarkMode ? "white" : "black" }]}>{item.name}</Text>
              <Text style={styles.groupDescription}>{item.description}</Text>
              <Text style={[styles.groupMembers, { color: isDarkMode ? "white" : "black" }]}>{`${item.members.length} participants`}</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      {isDarkMode ? (
        <Image
          source={GrayEllipse}
          style={{ width: 120, height: 120, left: -50, top: 40 }}
        />
      ) : (
        <Image
          source={BlueEllipse}
          style={{ width: 120, height: 120, left: -50, top: 40 }}
        />
      )}
    </View>
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
    left: 0,
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
    color: "#666",
    textAlign: "center",
    marginBottom: 10,
  },
  groupMembers: {
    fontSize: 12,
    color: "#666",
  },
});
