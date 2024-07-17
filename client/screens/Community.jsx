// import React from 'react';
// import { Text, View, FlatList, StyleSheet, TouchableOpacity } from 'react-native';

// const CommunityJoined = ({ route,navigation }) => {
//   const { joinedGroups } = route.params;

//   const goToCommunities=()=>{
// navigation.navigate('Communities')
//   }
//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>Communities</Text>
//       {joinedGroups.length > 0 ? (
//         <FlatList
//           data={joinedGroups}
//           keyExtractor={(item) => item._id}
//           renderItem={({ item }) => (
//             <View style={styles.groupItem}>
//               <Text style={styles.groupName}>{item.name}</Text>
//               <Text style={styles.groupMembers}>{`${item.members?.length || 0} participants`}</Text>
//             </View>
//           )}
//         />
//       ) : (
//         <View style={styles.noGroupsContainer}>
//           <Text style={styles.noGroupsText}>No communities joined yet</Text>
//           <Text style={styles.exploreText}>Start exploring and join communities to engage with like-minded individuals.</Text>
//           <TouchableOpacity style={styles.joinButton} onPress={goToCommunities}>
//             <Text style={styles.joinButtonText}>Join Now</Text>
//           </TouchableOpacity>
//         </View>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#f5f5f5',
//   },
//   header: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#2E5BFF',
//     marginVertical: 20,
//   },
//   groupItem: {
//     padding: 15,
//     backgroundColor: '#fff',
//     borderRadius: 8,
//     marginBottom: 10,
//     width: '90%',
//     shadowColor: '#000',
//     shadowOpacity: 0.1,
//     shadowRadius: 10,
//     shadowOffset: { width: 0, height: 5 },
//     alignItems: 'center',
//   },
//   groupName: {
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   groupMembers: {
//     fontSize: 14,
//     color: '#888',
//   },
//   noGroupsContainer: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop: 50,
//   },
//   noGroupsText: {
//     fontSize: 18,
//     color: '#2E5BFF',
//     marginBottom: 10,
//     fontWeight: 'bold',
//   },
//   exploreText: {
//     fontSize: 14,
//     color: '#888',
//     textAlign: 'center',
//     marginHorizontal: 30,
//     marginBottom: 20,
//   },
//   joinButton: {
//     backgroundColor: '#2E5BFF',
//     paddingVertical: 10,
//     paddingHorizontal: 30,
//     borderRadius: 8,
//   },
//   joinButtonText: {
//     fontSize: 16,
//     color: '#fff',
//     fontWeight: 'bold',
//   },
// });

// export default CommunityJoined;

import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import axios from "axios";
import BlueEllipse from "../assets/blueEllipse.png";
const CommunityJoined = ({ route, navigation }) => {
  const [joinedGroups, setJoinedGroups] = useState([]);

  useEffect(() => {
    fetchJoinedGroups();
  }, []);

  const fetchJoinedGroups = async () => {
    try {
      const response = await axios.get("http://10.0.0.21:3001/groups/joined");
      setJoinedGroups(response.data);
    } catch (error) {
      console.error("Failed to fetch joined groups:", error);
    }
  };

  const goToCommunities = () => {
    navigation.navigate("Communities");
  };

  return (
    <View style={styles.container}>
      <Image
        source={BlueEllipse}
        style={{
          width: 120,
          height: 120,
          left: 290,
          top: -40,
          position: "absolute",
        }}
      />
      <Text style={styles.header}>Communities</Text>
      {joinedGroups.length > 0 ? (
        <FlatList
          data={joinedGroups}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <View style={styles.groupItem}>
              <Text style={styles.groupName}>{item.name}</Text>
              <Text style={styles.groupMembers}>{`${item.members?.length ||
                0} participants`}</Text>
            </View>
          )}
        />
      ) : (
        <View style={styles.noGroupsContainer}>
          <Text style={styles.noGroupsText}>No communities joined yet</Text>
          <Text style={styles.exploreText}>
            Start exploring and join communities to engage with like-minded
            individuals.
          </Text>

          <TouchableOpacity style={styles.joinButton} onPress={goToCommunities}>
            <Text style={styles.joinButtonText}>Join Now</Text>
          </TouchableOpacity>
        </View>
      )}
      <Image
        source={BlueEllipse}
        style={{
          width: 120,
          height: 120,
          left: -50,
          top: 650,
          position: "absolute",
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  header: {
    fontSize:35,
    fontWeight: "bold",
    color: "#032B79",
    marginVertical: 20,
    top:-150,
    right:50
  },
  groupItem: {
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 10,
    width: "90%",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    alignItems: "center",
  },
  groupName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  groupMembers: {
    fontSize: 14,
    color: "#888",
  },
  noGroupsContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    top:-20
  },
  noGroupsText: {
    fontSize: 18,
    color: "#032B79",
    marginBottom: 10,
    fontWeight: "bold",
  },
  exploreText: {
    fontSize: 14,
    color: "#888",
    textAlign: "center",
    marginHorizontal: 30,
    marginBottom: 20,
  },
  joinButton: {
    backgroundColor: "#719AEA",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  joinButtonText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
  },
});

export default CommunityJoined;
