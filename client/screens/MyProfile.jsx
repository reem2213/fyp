// import React, { useState } from 'react';
// import { StyleSheet,Image, View, Text, FlatList, TouchableOpacity } from 'react-native';
// import { useNavigation } from "@react-navigation/native";
// import Settings from "../assets/settings.png";
// const App = ({ route }) => {
// //   const [activeSection, setActiveSection] = useState('Meetings');
// //   const [activeStatus, setActiveStatus] = useState('Upcoming');
//   const { username, bio, imageUri } = route.params;
//   const { userInfo } = route.params;
//   const { navigate } = useNavigation();
 

//   const goToSettings = () => {
//     navigate("Settings");
//   };
// //   const meetings = [
// //     { title: 'Meeting 1', status: 'Upcoming' },
// //     { title: 'Meeting 2', status: 'Completed' },
// //     { title: 'Meeting 3', status: 'Cancelled' },
// //     { title: 'Meeting 4', status: 'Upcoming' },
// //     { title: 'Meeting 5', status: 'Completed' },
// //     { title: 'Meeting 6', status: 'Cancelled' },
// //   ];

// //   const goals = [
// //     { title: 'Goal 1', status: 'In Progress' },
// //     { title: 'Goal 2', status: 'Completed' },
// //     { title: 'Goal 3', status: 'Cancelled' },
// //     { title: 'Goal 4', status: 'In Progress' },
// //     { title: 'Goal 5', status: 'Completed' },
// //     { title: 'Goal 6', status: 'Cancelled' },
// //   ];

// //   const renderItem = ({ item }) => (
// //     <View style={styles.itemContainer}>
// //       <Text style={styles.itemTitle}>{item.title}</Text>
// //       <Text style={[styles.itemStatus, styles[item.status.toLowerCase()]]}>{item.status}</Text>
// //     </View>
// //   );

// //   const filteredData = activeSection === 'Meetings'
// //     ? meetings.filter((meeting) => meeting.status === activeStatus)
// //     : goals.filter((goal) => goal.status === activeStatus);
// const [activeSection, setActiveSection] = useState('Meetings');
//   const [activeStatus, setActiveStatus] = useState('Upcoming');
//   const [meetings, setMeetings] = useState([
//     { title: 'Meeting 1', status: 'Upcoming' },
//     { title: 'Meeting 2', status: 'Completed' },
//     { title: 'Meeting 3', status: 'Cancelled' },
//     { title: 'Meeting 4', status: 'Upcoming' },
//     { title: 'Meeting 5', status: 'Completed' },
//     { title: 'Meeting 6', status: 'Cancelled' },
//   ]);

//   const goals = [
//     { title: 'Goal 1', status: 'In Progress' },
//     { title: 'Goal 2', status: 'Completed' },
//     { title: 'Goal 3', status: 'Cancelled' },
//     { title: 'Goal 4', status: 'In Progress' },
//     { title: 'Goal 5', status: 'Completed' },
//     { title: 'Goal 6', status: 'Cancelled' },
//   ];

//   const handleMeetingStatusChange = (index, newStatus) => {
//     const updatedMeetings = [...meetings];
//     updatedMeetings[index].status = newStatus;
//     setMeetings(updatedMeetings);
//   };

//   const renderItem = ({ item, index }) => (
//     <View style={styles.itemContainer}>
//       <Text style={styles.itemTitle}>{item.title}</Text>
//       <View style={styles.statusContainer}>
//         <Text style={[styles.itemStatus, styles[item.status.toLowerCase()]]}>{item.status}</Text>
//         {item.status === 'Upcoming' && (
//           <View style={styles.actionButtons}>
//             <TouchableOpacity
//               style={[styles.actionButton, styles.doneButton]}
//               onPress={() => handleMeetingStatusChange(index, 'Completed')}
//             >
//               <Text style={styles.actionButtonText}>Done</Text>
//             </TouchableOpacity>
//             <TouchableOpacity
//               style={[styles.actionButton, styles.cancelButton]}
//               onPress={() => handleMeetingStatusChange(index, 'Cancelled')}
//             >
//               <Text style={styles.actionButtonText}>Cancel</Text>
//             </TouchableOpacity>
//           </View>
//         )}
//       </View>
//     </View>
//   );

//   const filteredData = activeSection === 'Meetings'
//     ? meetings.filter((meeting) => meeting.status === activeStatus)
//     : goals.filter((goal) => goal.status === activeStatus);


//   return (
//     <>
//       <View>
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
//         <Image
//           style={{ width: 45, height: 45, left: 320, top: -10 }}
//           source={Settings}
//         />
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
//       <View>
//         <Text style={{ top: -90, left: 190, fontSize: 15, fontWeight: "500" }}>
//           {username}
//         </Text>
//         <Text style={{ top: -80, left: 190, fontSize: 15, fontWeight: "500" }}>
//           {bio}
//         </Text>
//         <TouchableOpacity>
//           <Text
//             style={{
//               backgroundColor: "white",
//               width: "40%",
//               borderColor: "#E5E0E0",
//               borderWidth: 1,
//               borderRadius: 10,
//               padding: 5,
//               textAlign: "center",
//               left:185,
//               top:-60
//             }}
//           >
//             Edit your Profile
//           </Text>
//         </TouchableOpacity>
//       </View>
  
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <Text style={styles.headerTitle}>My {activeSection}</Text>
//         <View style={styles.sectionSwitcher}>
//           <TouchableOpacity
//             style={[
//               styles.sectionButton,
//               activeSection === 'Meetings' ? styles.activeSectionButton : null,
//             ]}
//             onPress={() => setActiveSection('Meetings')}
//           >
//             <Text style={[
//               styles.sectionButtonText,
//               activeSection === 'Meetings' ? styles.activeSectionButtonText : null,
//             ]}>
//               Meetings
//             </Text>
//           </TouchableOpacity>
//           <TouchableOpacity
//             style={[
//               styles.sectionButton,
//               activeSection === 'Goals' ? styles.activeSectionButton : null,
//             ]}
//             onPress={() => setActiveSection('Goals')}
//           >
//             <Text style={[
//               styles.sectionButtonText,
//               activeSection === 'Goals' ? styles.activeSectionButtonText : null,
//             ]}>
//               Goals
//             </Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//       <View style={styles.statusContainer}>
//         <TouchableOpacity
//           style={[
//             styles.statusButton,
//             activeStatus === 'Upcoming' || activeStatus === 'In Progress' ? styles.activeStatusButton : null,
//           ]}
//           onPress={() => setActiveStatus(activeSection === 'Meetings' ? 'Upcoming' : 'In Progress')}
//         >
//           <Text style={[
//             styles.statusButtonText,
//             (activeStatus === 'Upcoming' || activeStatus === 'In Progress') ? styles.activeStatusButtonText : null,
//           ]}>
//             {activeSection === 'Meetings' ? 'Upcoming' : 'In Progress'}
//           </Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={[
//             styles.statusButton,
//             activeStatus === 'Completed' ? styles.activeStatusButton : null,
//           ]}
//           onPress={() => setActiveStatus('Completed')}
//         >
//           <Text style={[
//             styles.statusButtonText,
//             activeStatus === 'Completed' ? styles.activeStatusButtonText : null,
//           ]}>
//             Completed
//           </Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={[
//             styles.statusButton,
//             activeStatus === 'Cancelled' ? styles.activeStatusButton : null,
//           ]}
//           onPress={() => setActiveStatus('Cancelled')}
//         >
//           <Text style={[
//             styles.statusButtonText,
//             activeStatus === 'Cancelled' ? styles.activeStatusButtonText : null,
//           ]}>
//             Cancelled
//           </Text>
//         </TouchableOpacity>
//       </View>
//       <FlatList
//         data={filteredData}
//         renderItem={renderItem}
//         keyExtractor={(item) => item.title}
//         style={styles.listContainer}
//       />
//     </View>
//     </>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     top:-20,
//     flex: 1,
//     backgroundColor: '#fff',
//     paddingHorizontal: 16,
//     paddingVertical: 24,
//   },
//   actionButtons: {
//     flexDirection: 'row',
//     marginLeft: 16,
//   },
//   actionButton: {
//     backgroundColor: '#f0f0f0',
//     borderRadius: 8,
//     paddingVertical: 4,
//     paddingHorizontal: 8,
//     marginRight: 8,
//   },
//   doneButton: {
//     backgroundColor: '#4CAF50',
//   },
//   cancelButton: {
//     backgroundColor: '#F44336',
//   },
//   actionButtonText: {
//     fontSize: 12,
//     fontWeight: 'bold',
//     color: '#fff',
//   },
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 16,
//   },
//   headerTitle: {
//     fontSize: 24,
//     fontWeight: 'bold',
//   },
//   sectionSwitcher: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     marginBottom: 16,
//   },
//   sectionButton: {
//     backgroundColor: '#f0f0f0',
//     borderRadius: 8,
//     paddingVertical: 8,
//     paddingHorizontal: 16,
//     marginHorizontal: 4,
//   },
//   activeSectionButton: {
//     backgroundColor: '#2196F3',
//   },
//   sectionButtonText: {
//     fontSize: 14,
//     fontWeight: 'bold',
//   },
//   activeSectionButtonText: {
//     color: '#fff',
//   },
//   statusContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 16,
//   },
//   statusButton: {
//     backgroundColor: '#f0f0f0',
//     borderRadius: 8,
//     paddingVertical: 8,
//     paddingHorizontal: 16,
//     flex: 1,
//     marginHorizontal: 4,
//   },
//   activeStatusButton: {
//     backgroundColor: '#2196F3',
//   },
//   statusButtonText: {
//     fontSize: 14,
//     fontWeight: 'bold',
//     textAlign: 'center',
//   },
//   activeStatusButtonText: {
//     color: '#fff',
//   },
//   listContainer: {
//     flex: 1,
//   },
//   itemContainer: {
//     backgroundColor: '#f0f0f0',
//     borderRadius: 8,
//     paddingVertical: 12,
//     paddingHorizontal: 16,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginVertical: 4,
//   },
//   itemTitle: {
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   itemStatus: {
//     fontSize: 14,
//     paddingVertical: 4,
//     paddingHorizontal: 8,
//     borderRadius: 4,
//   },
//   upcoming: {
//     backgroundColor: '#2196F3',
//     color: '#fff',
//   },
//   completed: {
//     backgroundColor: '#4CAF50',
//     color: '#fff',
//   },
//   cancelled: {
//     backgroundColor: '#F44336',
//     color: '#fff',
//   },
//   in_progress: {
//     backgroundColor: '#FFA500',
//     color: '#fff',
//   },
// });

// export default App;
import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import axios from 'axios';
import Settings from "../assets/settings.png";

const App = ({ route }) => {
  const { username, bio, imageUri } = route.params;
  const { navigate } = useNavigation();

  const [activeSection, setActiveSection] = useState('Meetings');
  const [activeStatus, setActiveStatus] = useState('Upcoming');
  const [meetings, setMeetings] = useState([]);
  const [goals, setGoals] = useState([]);

  
  useEffect(() => {
    fetchMeetings();
    fetchGoals();
  }, []);

  const fetchMeetings = async () => {
    try {
      const response = await axios.get('http://10.0.0.21:3001/bookings');
      setMeetings(response.data);
    } catch (error) {
      console.error('Error fetching meetings:', error);
    }
  };

  const fetchGoals = async () => {
    try {
      const response = await axios.get('http://10.0.0.21:3001/goal');
      setGoals(response.data);
    } catch (error) {
      console.error('Error fetching goals:', error);
    }
  };


  const handleStatusChange = async (id, newStatus, oldStatus) => {
    try {
      const response = await axios.put(`http://10.0.0.21:3001/goal/${id}`, { status: newStatus });
      if (response.status === 200) {
        if (activeSection === 'Meetings') {
          const updatedMeetings = meetings.map((meeting) => {
            if (meeting._id === id) {
              return { ...meeting, status: newStatus };

            }
            return meeting;
          });
          setMeetings(updatedMeetings);
        } else if (activeSection === 'Goals') {
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
      console.error(`Error updating ${activeSection.toLowerCase()} status:`, error);
    }
    try {
      const responsee = await axios.put(`http://10.0.0.21:3001/bookings/${id}`, { status: newStatus });
      if (responsee.status === 200) {
        const updatedMeetings = meetings.map((meeting) => {
          if (meeting._id === id) {
            return { ...meeting, status: newStatus };
          }
          return meeting;
        });
        setMeetings(updatedMeetings);
      }
    } catch (error) {
      console.error('Error updating meeting status:', error);
    }
  };


  const renderItem = ({ item, index }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemTitle}>{item.title}</Text>
      <View style={styles.statusContainer}>
        <Text style={[styles.itemStatus, styles[item.status.toLowerCase()]]}>{item.status}</Text>
        {item.status === 'upcomming' || item.status === 'in progress' ? (
          <View style={styles.actionButtons}>
            <TouchableOpacity
              style={[styles.actionButton, styles.doneButton]}
              onPress={() => handleStatusChange(item._id, 'Completed', item.status)}
            >
              <Text style={styles.actionButtonText}>Done</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.actionButton, styles.cancelButton]}
              onPress={() => handleStatusChange(item._id, 'Cancelled', item.status)}
            >
              <Text style={styles.actionButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        ) : null}
      </View>
    </View>
  );


  

  const filteredData = activeSection === 'Meetings'
    ? meetings.filter((meeting) => meeting.status === activeStatus)
    : goals.filter((goal) => goal.status === activeStatus);

  const goToSettings = () => {
    navigate("Settings");
  };

  return (
    <>
      <View>
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
        <Text style={{ color: "gray", fontSize: 20, fontWeight: "600", left: 40 }}>550 Pts</Text>
        {imageUri && (
          <Image
            source={{ uri: imageUri }}
            style={{ width: 150, height: 150, borderRadius: 100, top: 20, left: 20 }}
          />
        )}
      </View>
      <View>
        <Text style={{ top: -90, left: 190, fontSize: 15, fontWeight: "500" }}>{username}</Text>
        <Text style={{ top: -80, left: 190, fontSize: 15, fontWeight: "500" }}>{bio}</Text>
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
              top: -60
            }}
          >
            Edit your Profile
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>My {activeSection}</Text>
          <View style={styles.sectionSwitcher}>
            <TouchableOpacity
              style={[
                styles.sectionButton,
                activeSection === 'Meetings' ? styles.activeSectionButton : null,
              ]}
              onPress={() => setActiveSection('Meetings')}
            >
              <Text
                style={[
                  styles.sectionButtonText,
                  activeSection === 'Meetings' ? styles.activeSectionButtonText : null,
                ]}
              >
                Meetings
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.sectionButton,
                activeSection === 'Goals' ? styles.activeSectionButton : null,
              ]}
              onPress={() => setActiveSection('Goals')}
            >
              <Text
                style={[
                  styles.sectionButtonText,
                  activeSection === 'Goals' ? styles.activeSectionButtonText : null,
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
              activeStatus === 'upcomming' || activeStatus === 'in progress' ? styles.activeStatusButton : null,
            ]}
            onPress={() => setActiveStatus(activeSection === 'Meetings' ? 'upcomming' : 'in progress')}
          >
            <Text
              style={[
                styles.statusButtonText,
                (activeStatus === 'upcomming' || activeStatus === 'in progress') ? styles.activeStatusButtonText : null,
              ]}
            >
              {activeSection === 'Meetings' ? 'upcomming' : 'in progress'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.statusButton,
              activeStatus === 'Completed' ? styles.activeStatusButton : null,
            ]}
            onPress={() => setActiveStatus('Completed')}
          >
            <Text
              style={[
                styles.statusButtonText,
                activeStatus === 'Completed' ? styles.activeStatusButtonText : null,
              ]}
            >
              Completed
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.statusButton,
              activeStatus === 'Cancelled' ? styles.activeStatusButton : null,
            ]}
            onPress={() => setActiveStatus('Cancelled')}
          >
            <Text
              style={[
                styles.statusButtonText,
                activeStatus === 'Cancelled' ? styles.activeStatusButtonText : null,
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
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  actionButtons: {
    flexDirection: 'row',
    marginLeft: 16,
  },
  actionButton: {
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    paddingVertical: 4,
    paddingHorizontal: 8,
    marginRight: 8,
  },
  doneButton: {
    backgroundColor: '#4CAF50',
  },
  cancelButton: {
    backgroundColor: '#F44336',
  },
  actionButtonText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  sectionSwitcher: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 16,
  },
  sectionButton: {
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginHorizontal: 4,
  },
  activeSectionButton: {
    backgroundColor: '#2196F3',
  },
  sectionButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  activeSectionButtonText: {
    color: '#fff',
  },
  statusContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  statusButton: {
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    flex: 1,
    marginHorizontal: 4,
  },
  activeStatusButton: {
    backgroundColor: '#2196F3',
  },
  statusButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  activeStatusButtonText: {
    color: '#fff',
  },
  listContainer: {
    flex: 1,
  },
  itemContainer: {
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 4,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemStatus: {
    fontSize: 14,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  upcoming: {
    backgroundColor: '#2196F3',
    color: '#fff',
  },
  completed: {
    backgroundColor: '#4CAF50',
    color: '#fff',
  },
  cancelled: {
    backgroundColor: '#F44336',
    color: '#fff',
  },
  in_progress: {
    backgroundColor: '#FFA500',
    color: '#fff',
  },
});

export default App;

