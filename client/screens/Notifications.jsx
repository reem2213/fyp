

// import React, { useState, useEffect } from "react";
// import { View, Text, ScrollView, StyleSheet,Image,Pressable } from "react-native";
// import Bg from '../assets/bgNoti.png';
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import ArrowBack from "../assets/arrowBack.png";

// const Notifications = ({navigation}) => {
//   const [notifications, setNotifications] = useState([]);

//   const GoBack = () => {
//     navigation.navigate("Home");
//   };
//   const fetchNotifications = async () => {
//     try {
//       const storedNotifications = await AsyncStorage.getItem("Notifications");
//       let notificationsArray = storedNotifications
//         ? JSON.parse(storedNotifications)
//         : [];

//       // Check if the welcome notification already exists
//       const welcomeNotificationExists = notificationsArray.some(
//         (notification) =>
//           notification.message === "Welcome! You have successfully signed in."
//       );

//       if (!welcomeNotificationExists) {
//         // Add the welcome notification if it doesn't exist
//         const welcomeNotification = {
//           message: "Welcome! You have successfully signed in.",
//           time: new Date().toISOString(),
//         };
//         notificationsArray.unshift(welcomeNotification); // Add to the beginning of the array
//         await AsyncStorage.setItem(
//           "Notifications",
//           JSON.stringify(notificationsArray)
//         );
//       }

//       setNotifications(notificationsArray);
//     } catch (error) {
//       console.error("Failed to fetch notifications:", error);
//     }
//   };

//   const removeOldNotifications = async () => {
//     const currentTime = new Date();
//     const updatedNotifications = notifications.filter(notification => {
//       const notificationTime = new Date(notification.time);
//       const timeDifference = (currentTime - notificationTime) / 60000; // in minutes
//       return timeDifference <= 33; // Keep notifications less than or equal to 33 minutes old
//     });

//     setNotifications(updatedNotifications);
//     await AsyncStorage.setItem("Notifications", JSON.stringify(updatedNotifications));
//   };

//   useEffect(() => {
//     fetchNotifications();

//     const interval = setInterval(() => {
//       removeOldNotifications();
//     }, 500000); // Check every minute

//     return () => clearInterval(interval); // Clean up the interval on component unmount
//   }, []);

//   return (
//     <View style={{backgroundColor:"white", height:"100%"}}>
//       <Pressable onPress={GoBack}>
//           <Image style={styles.notiImage} source={ArrowBack} />
//         </Pressable>
//       <Image
//         style={[styles.ellipseIcon]}
//         contentFit="cover"
//         source={require("../assets/blueEllipse.png")}
//       />
     
//       <Text style={{color:"#1B436F", fontSize:35, fontWeight:"bold",position:"absolute", left:80,top:100}}t>Notifications</Text>
// <View style={styles.container}>
//       <Image source={Bg} style={{position:"absolute", width:400,height:400,opacity:0.7}}/>
//       <ScrollView>
//         {notifications.length > 0 ? (
//           notifications.map((notification, index) => (
//             <View key={index} style={styles.notification}>
//               <Text style={styles.message}>{notification.message}</Text>
//               <Text style={styles.time}>
//                 {Math.floor((new Date() - new Date(notification.time)) / 60000)}m ago
//               </Text>
//             </View>
//           ))
//         ) : (
//           <Text style={styles.noNotifications}>No notifications available</Text>
//         )}
//       </ScrollView>
//     </View>
//     <Image
//         style={[styles.ellipseIcon2]}
//         contentFit="cover"
//         source={require("../assets/blueEllipse.png")}
//       />
//     </View>
    
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: "white",
//     top:150,
//     height:"100%"
//   },
//   notiImage: {
//     position: "absolute",
//     top: 60,
//     left: 20,
//     width: 30,
//     height: 30,
//   },
//   notification: {
//     padding: 20,
//     top:10,
//     marginBottom: 15,
//     backgroundColor: "white",
//     borderRadius: 15,
//     opacity:0.85,
//     shadowColor: "black",
//     shadowOffset: { width: 2, height:8 },
//     shadowOpacity: 0.2,
//     shadowRadius: 2,
//     elevation: 8,
//     borderColor:"grey"
//   },

//   message: {
//     fontSize: 16,
//     color: "#1B436F",
//   },
//   ellipseIcon: {
//     position:"absolute",
//     left: 320,
//     width: 150,
//     height: 150,
//     top:-15
//   },
//   ellipseIcon2: {
//     position:"absolute",
//     // margintop:150,
//     left: -90,
//     width: 150,
//     height: 150,
//     top:650
//   },
//   time: {
//     fontSize: 14,
//     color: "#888",
//     marginTop: 5,
//   },
//   noNotifications: {
//     fontSize: 16,
//     color: "#333",
//     textAlign: "center",
//     marginTop: 20,
//   },
// });

// export default Notifications;



import React, { useState, useEffect, useContext } from "react";
import { View, Text, ScrollView, StyleSheet, Image, Pressable } from "react-native";
import Bg from '../assets/bgNoti.png';
import AsyncStorage from "@react-native-async-storage/async-storage";
import ArrowBack from "../assets/arrowBack.png";
import { DarkModeContext } from "../components/DarkModeContext"; // Adjust the path as per your project structure

const Notifications = ({ navigation }) => {
  const { isDarkMode } = useContext(DarkModeContext);
  const [notifications, setNotifications] = useState([]);

  const GoBack = () => {
    navigation.navigate("Home");
  };

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
    }, 500000); // Check every minute

    return () => clearInterval(interval); // Clean up the interval on component unmount
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? "#1A1A1A" : "#fff" }]}>
      <Pressable onPress={GoBack}>
        <Image style={styles.notiImage} source={ArrowBack} />
      </Pressable>
      <Image
        style={styles.ellipseIcon}
        contentFit="cover"
        source={require("../assets/blueEllipse.png")}
      />
      <Text style={[styles.header, { color: isDarkMode ? "#fff" : "#1B436F" }]}>Notifications</Text>
      <View style={styles.notificationContainer}>
        <Image source={Bg} style={styles.bgImage} />
        <ScrollView>
          {notifications.length > 0 ? (
            notifications.map((notification, index) => (
              <View key={index} style={[styles.notification, { backgroundColor: isDarkMode ? "#3A3A3A" : "#fff" }]}>
                <Text style={[styles.message, { color: isDarkMode ? "#fff" : "#1B436F" }]}>{notification.message}</Text>
                <Text style={[styles.time, { color: isDarkMode ? "#ccc" : "#888" }]}>
                  {Math.floor((new Date() - new Date(notification.time)) / 60000)}m ago
                </Text>
              </View>
            ))
          ) : (
            <Text style={[styles.noNotifications, { color: isDarkMode ? "#ccc" : "#333" }]}>No notifications available</Text>
          )}
        </ScrollView>
      </View>
      <Image
        style={styles.ellipseIcon2}
        contentFit="cover"
        source={require("../assets/blueEllipse.png")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  notiImage: {
    position: "absolute",
    top: 60,
    left: 20,
    width: 30,
    height: 30,
  },
  ellipseIcon: {
    position: "absolute",
    left: 320,
    width: 150,
    height: 150,
    top: -15,
  },
  header: {
    fontSize: 35,
    fontWeight: "bold",
    position: "absolute",
    left: 80,
    top: 100,
  },
  notificationContainer: {
    flex: 1,
    marginTop: 150,
    backgroundColor: "black",
    borderRadius: 15,
    shadowColor: "black",
    shadowOffset: { width: 2, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 8,
    borderColor: "grey",
  },
  bgImage: {
    position: "absolute",
    width: 400,
    height: 400,
    opacity: 0.7,
  },
  notification: {
    padding: 20,
    marginBottom: 15,
    borderRadius: 15,
    opacity: 0.85,
    borderWidth: 1,
    borderColor: "grey",
    shadowColor: "black",
    shadowOffset: { width: 2, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 8,
  },
  message: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1B436F",
  },
  time: {
    fontSize: 14,
    color: "#888",
    marginTop: 5,
  },
  ellipseIcon2: {
    position: "absolute",
    left: -90,
    width: 150,
    height: 150,
    top: 650,
  },
  noNotifications: {
    fontSize: 16,
    color: "#333",
    textAlign: "center",
    marginTop: 20,
  },
});

export default Notifications;
