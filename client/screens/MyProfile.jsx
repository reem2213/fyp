import { WebView } from "react-native-webview";
import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  Image,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import Settings from "../assets/settings.png";
import Coin from "../assets/coin.png";
import Back from "../assets/arrowBack.png";
import { DarkModeContext } from "../components/DarkModeContext"; // Import the context

const App = ({ route }) => {
  const { navigate } = useNavigation();
  const { username } = route.params;
  const [bio, setBio] = useState("");

  const { isDarkMode } = useContext(DarkModeContext); // Use the context

  const [imageData, setImageData] = useState(null);
  const [userProfile, setUserProfile] = useState({
    username: "",
    bio: "",
    imageData: "",
  });
  const [activeSection, setActiveSection] = useState("Meetings");
  const [activeStatus, setActiveStatus] = useState("upcoming");
  const [meetings, setMeetings] = useState([]);
  const [goals, setGoals] = useState([]);
  useEffect(() => {
    fetch(`http://10.0.0.21:3001/userr/${username}`)
      .then((response) => response.json())
      .then((data) => {
        setBio(data.bio);
        setImageData(data.image);

        console.log("donee");

      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, [username]);
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
      const response = await axios.get(`http://10.0.0.21:3001/bookings/${username}`);
      setMeetings(response.data);
    } catch (error) {
      console.error("Error fetching meetings:", error);
    }
  };

  const fetchGoals = async () => {
    try {
      const response = await axios.get(`http://10.0.0.21:3001/goal/${username}`);
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
        <View style={styles.itemContainer}>
          <Text style={styles.itemTitle}>{item.mentorName}</Text>
          <Text style={styles.itemTitle}>
            {new Date(item.date).toLocaleDateString()}
          </Text>
          <Text style={styles.itemTitle}>{item.time}</Text>
          <View style={styles.statusContainer}>
            {(item.status === "upcoming" || item.status === "in progress") && (
              <View style={styles.actionButtons}>
                <TouchableOpacity
                  style={[styles.actionButton, styles.doneButton]}
                  onPress={() =>
                    handleStatusChange(item._id, "Completed", item.status)
                  }
                >
                  <Text style={styles.actionButtonText2}>Done</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.actionButton, styles.cancelButton]}
                  onPress={() =>
                    handleStatusChange(item._id, "Cancelled", item.status)
                  }
                >
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
                  onPress={() =>
                    handleStatusChange(item._id, "Completed", item.status)
                  }
                >
                  <Text style={styles.actionButtonText2}>Done</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.actionButton, styles.cancelButton]}
                  onPress={() =>
                    handleStatusChange(item._id, "Cancelled", item.status)
                  }
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
    navigate("Settings", { username });
  };

  const goBack = () => {
    navigate("Home", { username });
  };
  const goToEditProfile = () => {
    navigate("EditProfile", { username });
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

  const chartHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { margin: 0;background-color:#FAFAFA ;}
          canvas { display: block }
        </style>
      </head>
      <body>
        <canvas id="goalChart"></canvas>
        <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
        <script>
          const ctx = document.getElementById('goalChart').getContext('2d');
          new Chart(ctx, {
            type: 'doughnut',
            data: {
              labels: ['Completed', 'Cancelled', 'In Progress'],
              datasets: [{
                label: 'Goal Status',
                data: [${goalPercentages.completed}, ${goalPercentages.canceled}, ${goalPercentages.inProgress}],
                backgroundColor: ['#032B79', '#F44336', 'yellow'], 
              }],
            },
            options: {
              responsive: true,
              plugins: {
                legend: {
                  position: 'top',
                },
              },
            },
          });
        </script>
      </body>
    </html>
  `;
  return (

    <>
      <ScrollView style={[{ height: "100%" }, { backgroundColor: isDarkMode ? "black" : "#FAFAFA" }]}>
        <View style={{ backgroundColor: isDarkMode ? "black" : "#FAFAFA" }}>
          <TouchableOpacity onPress={goBack}>
            <Image
              source={Back}
              style={{
                top: 50,
                left: 20,
                width: 40,
                height: 40,
              }}
            />
          </TouchableOpacity>
  
          <Text
            style={[{
              color: "#032B79",
              fontSize: 40,
              fontWeight: "bold",
              textAlign: "center",
              top: 0,
              width: "40%",
              left: 110,
            },{color: isDarkMode ? "white" : "#032B79" }]}
          >
            Profile
          </Text>
          <TouchableOpacity onPress={goToSettings} style={{ width: "10%" }}>
            <Image
              style={{ width: 45, height: 45, left: 320, top: -10 }}
              source={Settings}
            />
          </TouchableOpacity>
          <Image
            source={Coin}
            style={{ position: "absolute", top: 135, left: 10 }}
          />
          <Text
            style={[{
              fontSize: 20,
              fontWeight: "600",
              left: 60,
              top: 10,
            },{color: isDarkMode ? "white" : "gray"}]}
          >
            550 Pts
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
  
        <View style={[{ top: -20, left: 20 },{backgroundColor: isDarkMode ? "black" : "#FAFAFA" }]}>
          <Text
            style={[{ top: -90, left: 190, fontSize: 15, fontWeight: "500" },{color: isDarkMode ? "white" : "black" }]}
          >
            {username}
          </Text>
          <Text
            style={[{ top: -80, left: 190, fontSize: 15, fontWeight: "500" },{color: isDarkMode ? "white" : "black" }]}
          >
            {bio}
          </Text>
          <TouchableOpacity onPress={goToEditProfile}>
          <Text
              style={[{
                width: "40%",
                borderColor: "#E5E0E0",
                borderWidth: 1,
                borderRadius: 10,
                padding: 5,
                textAlign: "center",
                left: 185,
                top: -60,
              },{backgroundColor: isDarkMode ? "gray" : "white", color:isDarkMode?"white":"black"}]}
            >
              Edit your Profile
            </Text>
          </TouchableOpacity>
        </View>
  
        <View style={[styles.container,{backgroundColor: isDarkMode ? "black" : "#FAFAFA"}]}>
          <View style={styles.header}>
            <View style={[styles.sectionSwitcher,,{backgroundColor: isDarkMode ? "gray" : "white"}]}>
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
                  activeSection === "Goals" ? styles.activeSectionButton : null
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
            <WebView
              originWhitelist={["*"]}
              source={{ html: chartHtml }}
              style={{ top: 10 }}
            />
          )}
  
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
    top:0

  },
  actionButtonText2: {
    fontSize: 15,
    fontWeight: "bold",
    color: "white",
    top:0
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
    marginBottom: 15,
    top: 0,
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
    fontWeight: "bold",
    textAlign: "center",
    color: "#606060",
  },
  activeStatusButtonText: {
    color: "#032B79",
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
    color: "white",
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
    width: 200,
    height: 200,
    top: 20,
    left: 10,
  },
});

export default App;

