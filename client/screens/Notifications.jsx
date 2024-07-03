// import React, { useState, useEffect } from "react";
// import { View, Text, ScrollView, StyleSheet } from "react-native";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// const Notifications = () => {
//   const [notifications, setNotifications] = useState([]);

//   useEffect(() => {
//     const fetchNotifications = async () => {
//       try {
//         const storedNotifications = await AsyncStorage.getItem("Notifications");
//         let notificationsArray = storedNotifications
//           ? JSON.parse(storedNotifications)
//           : [];

//         // Check if the welcome notification already exists
//         const welcomeNotificationExists = notificationsArray.some(
//           (notification) =>
//             notification.message === "Welcome! You have successfully signed in."
//         );

//         if (!welcomeNotificationExists) {
//           // Add the welcome notification if it doesn't exist
//           const welcomeNotification = {
//             message: "Welcome! You have successfully signed in.",
//             time: new Date().toISOString(),
//           };
//           notificationsArray.unshift(welcomeNotification); // Add to the beginning of the array
//           await AsyncStorage.setItem(
//             "Notifications",
//             JSON.stringify(notificationsArray)
//           );
//         }

//         setNotifications(notificationsArray);
//       } catch (error) {
//         console.error("Failed to fetch notifications:", error);
//       }
//     };

//     fetchNotifications();
//   }, []);

//   return (
//     <View style={styles.container}>
//       <ScrollView>
//         {notifications.length > 0 ? (
//           notifications.map((notification, index) => (
//             <View key={index} style={styles.notification}>
//               <Text style={styles.message}>{notification.message}</Text>
//               <Text style={styles.time}>
//                   {Math.floor((new Date() - new Date(notification.time)) / 60000)}m ago
//               </Text>
//             </View>
//           ))
//         ) : (
//           <Text style={styles.noNotifications}>No notifications available</Text>
//         )}
//       </ScrollView>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: "#032B79",
//   },
//   notification: {
//     padding: 10,
//     borderBottomWidth: 1,
//     borderBottomColor: "#ddd",
//     marginBottom: 10,
//     backgroundColor: "white",
//     borderRadius: 10,
//   },
//   message: {
//     fontSize: 16,
//     color: "black",
//   },
//   time: {
//     fontSize: 14,
//     color: "#555",
//   },
//   noNotifications: {
//     fontSize: 16,
//     color: "white",
//     textAlign: "center",
//   },
// });

// export default Notifications;



import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);

  const fetchNotifications = async () => {
    try {
      const storedNotifications = await AsyncStorage.getItem("Notifications");
      let notificationsArray = storedNotifications
        ? JSON.parse(storedNotifications)
        : [];

      // Check if the welcome notification already exists
      const welcomeNotificationExists = notificationsArray.some(
        (notification) =>
          notification.message === "Welcome! You have successfully signed in."
      );

      if (!welcomeNotificationExists) {
        // Add the welcome notification if it doesn't exist
        const welcomeNotification = {
          message: "Welcome! You have successfully signed in.",
          time: new Date().toISOString(),
        };
        notificationsArray.unshift(welcomeNotification); // Add to the beginning of the array
        await AsyncStorage.setItem(
          "Notifications",
          JSON.stringify(notificationsArray)
        );
      }

      setNotifications(notificationsArray);
    } catch (error) {
      console.error("Failed to fetch notifications:", error);
    }
  };

//   const removeOldNotifications = async () => {
//     const currentTime = new Date();
//     const updatedNotifications = notifications.filter(notification => {
//       const notificationTime = new Date(notification.time);
//       const timeDifference = (currentTime - notificationTime) / 60000; // in minutes
//       return timeDifference <= 33;
//     });

//     setNotifications(updatedNotifications);
//     await AsyncStorage.setItem("Notifications", JSON.stringify(updatedNotifications));
//   };

const removeOldNotifications = async () => {
    const currentTime = new Date();
    const updatedNotifications = notifications.filter(notification => {
      const notificationTime = new Date(notification.time);
      const timeDifference = (currentTime - notificationTime) / 60000; // in minutes
      return timeDifference <= 33; // Keep notifications less than or equal to 33 minutes old
    });
  
    setNotifications(updatedNotifications);
    await AsyncStorage.setItem("Notifications", JSON.stringify(updatedNotifications));
  };
  
  useEffect(() => {
    fetchNotifications();

    const interval = setInterval(() => {
      removeOldNotifications();
    }, 5000); // Check every minute

    return () => clearInterval(interval); // Clean up the interval on component unmount
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView>
        {notifications.length > 0 ? (
          notifications.map((notification, index) => (
            <View key={index} style={styles.notification}>
              <Text style={styles.message}>{notification.message}</Text>
              <Text style={styles.time}>
                {Math.floor((new Date() - new Date(notification.time)) / 60000)}m ago
              </Text>
            </View>
          ))
        ) : (
          <Text style={styles.noNotifications}>No notifications available</Text>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#032B79",
  },
  notification: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    marginBottom: 10,
    backgroundColor: "white",
    borderRadius: 10,
  },
  message: {
    fontSize: 16,
    color: "black",
  },
  time: {
    fontSize: 14,
    color: "#555",
  },
  noNotifications: {
    fontSize: 16,
    color: "white",
    textAlign: "center",
  },
});

export default Notifications;


// import React, { useEffect, useState } from "react";
// import { View, Text, StyleSheet, ScrollView } from "react-native";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// const Notifications = () => {
//   const [notifications, setNotifications] = useState([]);

//   useEffect(() => {
//     const fetchNotifications = async () => {
//       try {
//         const storedNotifications = await AsyncStorage.getItem("Notifications");
//         console.log('Fetched Notifications:', storedNotifications); 
//         if (storedNotifications) {
//           setNotifications(JSON.parse(storedNotifications));
//         }
//       } catch (error) {
//         console.error("Failed to fetch notifications:", error);
//       }
//     };

//     fetchNotifications();
//   }, []);

//   const renderNotification = (notification, index) => (
//     <View key={index} style={styles.notificationCard}>
//       <Text style={styles.notificationTitle}>{notification.message}</Text>
//       <Text style={styles.notificationTime}>
//         {Math.floor((new Date() - new Date(notification.time)) / 60000)}m ago
//       </Text>
//     </View>
//   );

//   return (
//     <ScrollView style={styles.container}>
//       <Text style={styles.header}>Notifications</Text>
//       {notifications.length > 0 ? (
//         notifications.map((notification, index) => renderNotification(notification, index))
//       ) : (
//         <Text style={styles.noNotifications}>No Notifications</Text>
//       )}
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//     backgroundColor: "#fff",
//   },
//   header: {
//     fontSize: 24,
//     fontWeight: "bold",
//     textAlign: "center",
//     marginBottom: 16,
//   },
//   notificationCard: {
//     backgroundColor: "#ffffff",
//     padding: 20,
//     borderRadius: 8,
//     marginVertical: 8,
//     elevation: 3,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 8,
//     flexDirection: 'column',
//     alignItems: 'flex-start',
//   },
//   notificationTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: "#333",
//   },
//   notificationTime: {
//     fontSize: 14,
//     color: "#888",
//     marginTop: 4,
//   },
//   noNotifications: {
//     textAlign: "center",
//     color: "#888",
//     marginTop: 20,
//   },
// });

// export default Notifications;
