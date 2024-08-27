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
import PlusIcon from "../assets/bgChatBot.png";  // Import your plus icon image here

export default function CommunitiesJoinedScreen({ navigation, route }) {
  const [joinedGroups, setJoinedGroups] = useState([]);
  const { username ,userId} = route.params;
  const { isDarkMode } = useContext(DarkModeContext);

  useEffect(() => {
    fetchJoinedGroups();
  }, []);

 
  const fetchJoinedGroups = async () => {
    try {
      const response = await axios.get(`http://10.0.0.21:3001/groups/joined?userId=${userId}`);
      setJoinedGroups(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  

  const BackToGroups = () => {
    navigation.navigate("Home", { username ,userId});
  };

 
  const navigateToCreateGroup = () => {
    navigation.navigate("CreateGroup", { username, userId });  // Ensure "CreateGroup" is the correct route
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
            <TouchableOpacity
            key={item._id}
            style={[styles.groupItem, { backgroundColor: isDarkMode ? "gray" : "#fff" }]}
            onPress={() => navigation.navigate("Chat", { groupId: item._id, username ,userId})}
          >
               <View key={item._id} style={[styles.groupItem, { backgroundColor: isDarkMode ? "gray" : "#fff" }]}>
              <Text style={[styles.groupName, { color: isDarkMode ? "white" : "black" }]}>{item.name}</Text>
              <Text style={styles.groupDescription}>{item.description}</Text>
              <Text style={[styles.groupMembers, { color: isDarkMode ? "white" : "black" }]}>{`${item.members.length} participants`}</Text>
            </View>
            </TouchableOpacity>
           
          ))}
        </View>
      </ScrollView>
      <TouchableOpacity onPress={navigateToCreateGroup} style={styles.floatingButton}>
        {/* <Image
          source={PlusIcon}  // Use your plus icon image here
          style={{ width: 50, height: 50 }}
        /> */}
        <Text style={{color:"white"}}>+</Text>
      </TouchableOpacity>
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
    width: "100%",
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
  floatingButton: {
    position: 'absolute',
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    right: 20,
    bottom: 30,
    backgroundColor: '#4A90E2',
    borderRadius: 30,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
  },
});
