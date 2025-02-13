import React, { useState, useEffect, useContext } from "react";
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
import { DarkModeContext } from "../../../components/DarkModeContext";
import GrayEllipse from '../../../assets/DarkEllipse.png';
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function GroupsScreen({ navigation, route }) {
  const [groups, setGroups] = useState([]);
  const { username,userId } = route.params;
  const { isDarkMode } = useContext(DarkModeContext);

  useEffect(() => {
    fetchGroups();
  }, []);

  const fetchGroups = async () => {
    try {
      const response = await axios.get(`http://10.0.0.21:3001/groups?userId=${userId}&section=physical`);
      setGroups(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  
  const joinGroup = async (groupId) => {
    try {
      const response = await axios.post(
        `http://10.0.0.21:3001/groups/${groupId}/join`,
        { userId }  // Pass userId instead of username
      );
      Alert.alert("Success", `You have joined ${response.data.name}`);
      const updatedGroup = response.data;
      setGroups((prevGroups) =>
        prevGroups.map((group) =>
          group._id === groupId ? { ...group, joined: true } : group
        )
      );
  
      navigation.navigate("Chat", { groupId, userId,username });
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Failed to join the group");
    }
  };
  

  const BackToPsycho = () => {
    navigation.navigate("PsychologicalSection",{username,userId});
  };

  return (
    <View style={[{ height: "100%",width:"100%", backgroundColor: "#f5f5f5" }, { backgroundColor: isDarkMode ? "black" : "#f5f5f5" }]}>
      {isDarkMode ? (
        <Image
          source={GrayEllipse}
          style={{ width: 120, height: 120, left: 320, top: -10,borderRadius:200 }}
        />
      ) : (
        <Image
          source={BlueEllipse}
          style={{ width: 120, height: 120, left: 290, top: -40 }}
        />
      )}

      <TouchableOpacity onPress={BackToPsycho}>
        <Image
          source={Back}
          style={{ width: 40, height: 40, left: 20, top: -50 }}
        />
      </TouchableOpacity>

      <ScrollView style={[styles.container, { backgroundColor: isDarkMode ? "black" : "#f5f5f5" }]}>
        <Text style={[styles.header, { color: isDarkMode ? "white" : "#032B79" }]}>Communities</Text>
        <View style={styles.groupsContainer}>
          {groups.map((item) => (
            <View key={item._id} style={[styles.groupItem, { backgroundColor: isDarkMode ? "#1F1F1F" : "#fff" }]}>
              <Text style={[styles.groupName, { color: isDarkMode ? "white" : "black" }]}>{item.name}</Text>
              <Text style={styles.groupDescription}>{item.description}</Text>
              <View style={styles.bottomRow}>
                <Text style={[styles.groupMembers, { color: isDarkMode ? "white" : "black" }]}>{`${item.members?.length || 0} participants`}</Text>
                <TouchableOpacity
                  style={[styles.joinButton, { backgroundColor: isDarkMode ? "#011C4F" : "#4a90e2" }]}
                  onPress={() => joinGroup(item._id)}
                  disabled={item.joined}
                >
                  <Text style={styles.joinButtonText}>
                    {item.joined ? "Joined" : "Join Now"}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
          
        </View>
        <TouchableOpacity
          style={[styles.viewJoinedButton, { backgroundColor: isDarkMode ? "#011C4F" : "#4a90e2" }]}
          onPress={() => navigation.navigate("Community", { username,userId })}
        >
          <Text style={styles.viewJoinedButtonText}>
            View Joined Communities
          </Text>
        </TouchableOpacity>
        {isDarkMode ? (
        <Image
          source={GrayEllipse}
          style={{ width: 120, height: 120, left: -80, top: 40,borderRadius:200 }}
        />
      ) : (
        <Image
          source={BlueEllipse}
          style={{ width: 120, height: 120, left: -50, top: 40 }}
        />
      )}
      </ScrollView>

      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
    marginTop: -50,
    height:"100%",
    width:"100%"
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
    marginBottom: 40,
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
  bottomRow: {
    flexDirection: "col",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  groupMembers: {
    fontSize: 12,
    color: "#666",
    paddingBottom:10
  },
  joinButton: {
    paddingVertical: 5,
    paddingHorizontal: 15,
    backgroundColor: "#4a90e2",
    borderRadius: 5,

    
  },
  joinButtonText: {
    color: "#fff",
    fontSize: 14,
  },
  viewJoinedButton: {
    marginTop: 0,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#4a90e2",
    borderRadius: 20,
    alignSelf: "center",
  },
  viewJoinedButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});
