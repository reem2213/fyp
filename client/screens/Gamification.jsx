// import React, { useEffect, useState } from "react";
// import { Text, View, Image, TouchableOpacity, StyleSheet, ScrollView,FlatList } from "react-native";
// import axios from 'axios';
// import PinkEllipse from "../assets/pinkEllipse.png";
// import Back from "../assets/whiteArrowBack.png";
// import Bg from "../assets/gamificationBg.png";
// import GoldBadge from "../assets/GoldBadge.png";
// import SilverBadge from "../assets/SilverBadge.png";
// import BronzeBadge from "../assets/BronzeBadge.png";

// const Gamification = ({ route, navigation }) => {
//   const [scores, setScores] = useState([]);

//   useEffect(() => {
//     fetchScores();
//   }, []);

//   const fetchScores = async () => {
//     try {
//       const response = await axios.get('http://10.0.0.21:3001/scores');
//       setScores(response.data);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const GoBackToHome = () => {
//     navigation.navigate("Home");
//   };

//   const getBadge = (points) => {
//     if (points >= 75) {
//       return { image: GoldBadge, label: "Gold" };
//     } else if (points >= 50) {
//       return { image: SilverBadge, label: "Silver" };
//     } else if (points >= 25) {
//       return { image: BronzeBadge, label: "Bronze" };
//     } else {
//       return { image: null, label: "No Badge" };
//     }
//   };

//   const renderScoreItem = ({ item }) => {
//     const badge = getBadge(item.points);

//     return (
//       <View style={styles.pointsContainer}>
//         <Text style={styles.pointsText}>Great job! You've earned bonus coins for passing your quiz</Text>
//         <View style={styles.pointsRow}>
//           <Text style={styles.pointsValue}>{item.points} pts</Text>
//           {badge.image && <Image source={badge.image} style={styles.badgeImage} />}
//         </View>
//         <Text style={styles.badgeLabel}>{badge.label}</Text>
//       </View>
//     );
//   };

//   return (
//     <ScrollView contentContainerStyle={styles.scrollContainer}>
//       <View style={styles.container}>
//         <Image
//           style={styles.pinkEllipse}
//           source={PinkEllipse}
//         />

//         <TouchableOpacity onPress={GoBackToHome}>
//           <Image style={styles.backButton} source={Back} />
//         </TouchableOpacity>

//         <Image
//           source={Bg}
//           style={styles.backgroundImage}
//         />

//         <Text style={styles.headerText}>Gamification</Text>

//         <View style={styles.content}>
//           <FlatList
//             data={scores}
//             renderItem={renderScoreItem}
//             keyExtractor={(item) => item._id}
//           />
//         </View>
//       </View>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   scrollContainer: {
//     flexGrow: 1,
//     backgroundColor: "#FFEEF7",
//   },
//   container: {
//     flex: 1,
//     alignItems: "center",
//     padding: 20,
//   },
//   pinkEllipse: {
//     width: 250,
//     height: 250,
//     position: "absolute",
//     top: -80,
//     left: 290,
//   },
//   backButton: {
//     width: 50,
//     height: 50,
//     marginTop: 20,
//     marginLeft: -180,
//   },
//   backgroundImage: {
//     width: 350,
//     height: 250,
//     alignSelf: "center",
//   },
//   headerText: {
//     fontSize: 30,
//     fontWeight: "bold",
//     color: "#EB1F88",
//     marginTop: -150,
//     top: 150,
//     marginLeft: -180,
//   },
//   content: {
//     flex: 1,
//     width: "100%",
//     marginTop: 170,
//   },
//   pointsContainer: {
//     backgroundColor: "#FFF",
//     borderRadius: 10,
//     padding: 20,
//     marginBottom: 20,
//     alignItems: "center",
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.2,
//     shadowRadius: 2,
//     elevation: 3,
//   },
//   pointsText: {
//     fontSize: 16,
//     color: "#000",
//     textAlign: "center",
//     marginBottom: 10,
//   },
//   pointsRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: 10,
//   },
//   pointsValue: {
//     fontSize: 30,
//     fontWeight: "bold",
//     color: "#EB1F88",
//     marginRight: 10,
//   },
//   badgeImage: {
//     width: 100,
//     height: 100,
//     position:"absolute",
//     top:-15,
//     left:100

//   },
//   badgeLabel: {
//     fontSize: 18,
//     fontWeight: "bold",
//     color: "#000",
//   },
// });

// export default Gamification;



import React, { useEffect, useState, useContext } from "react";
import { Text, View, Image, TouchableOpacity, StyleSheet, ScrollView, FlatList } from "react-native";
import axios from 'axios';
import PinkEllipse from "../assets/pinkEllipse.png";
import Back from "../assets/whiteArrowBack.png";
import Bg from "../assets/gamificationBg.png";
import GoldBadge from "../assets/GoldBadge.png";
import SilverBadge from "../assets/SilverBadge.png";
import BronzeBadge from "../assets/BronzeBadge.png";
import { DarkModeContext } from "../components/DarkModeContext"; // Import the context

const Gamification = ({ route, navigation }) => {
  const { isDarkMode } = useContext(DarkModeContext); // Use the context
  const [scores, setScores] = useState([]);
  const{username}=route.params;


  useEffect(() => {
    fetchScores();
  }, []);

  const fetchScores = async () => {
    try {
      const response = await axios.get(`http://10.0.0.21:3001/scores/${username}`);
      setScores(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const GoBackToHome = () => {
    navigation.navigate("Home",{username});
    
  };

  const getBadge = (points) => {
    if (points >= 75) {
      return { image: GoldBadge, label: "Gold" };
    } else if (points >= 50) {

      return { image: SilverBadge, label: "Silver" };
    } else if (points >= 25) {
      return { image: BronzeBadge, label: "Bronze" };
    } else {
      return { image: null, label: "No Badge" };
    }
  };

  const renderScoreItem = ({ item }) => {
    const badge = getBadge(item.points);

    return (
      <View style={[styles.pointsContainer, { backgroundColor: isDarkMode ? "gray" : "#FFF" }]}>
        <Text style={[styles.pointsText, { color: isDarkMode ? "white" : "black" }]}>
          Great job! You've earned bonus coins for passing your quiz
        </Text>
        <View style={styles.pointsRow}>
          <Text style={[styles.pointsValue, { color: isDarkMode ? "white" : "#EB1F88" }]}>{item.points} pts</Text>
          {badge.image && <Image source={badge.image} style={styles.badgeImage} />}
        </View>
        <Text style={[styles.badgeLabel, { color: isDarkMode ? "white" : "black" }]}>{badge.label}</Text>
      </View>
    );
  };

  return (
    <ScrollView contentContainerStyle={[styles.scrollContainer, { backgroundColor: isDarkMode ? "black" : "#FFEEF7" }]}>
      <View style={styles.container}>
        <Image
          style={styles.pinkEllipse}
          source={PinkEllipse}
        />

        <TouchableOpacity onPress={GoBackToHome}>
          <Image style={styles.backButton} source={Back} />
        </TouchableOpacity>

        <Image
          source={Bg}
          style={styles.backgroundImage}
        />

        <Text style={[styles.headerText, { color: isDarkMode ? "white" : "#EB1F88" }]}>Gamification</Text>

        <View style={styles.content}>
          <FlatList
            data={scores}
            renderItem={renderScoreItem}
            keyExtractor={(item) => item._id}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
  },
  pinkEllipse: {
    width: 250,
    height: 250,
    position: "absolute",
    top: -80,
    left: 290,
  },
  backButton: {
    width: 50,
    height: 50,
    marginTop: 20,
    marginLeft: -180,
  },
  backgroundImage: {
    width: 350,
    height: 250,
    alignSelf: "center",
  },
  headerText: {
    fontSize: 30,
    fontWeight: "bold",
    marginTop: -150,
    top: 150,
    marginLeft: -180,
  },
  content: {
    flex: 1,
    width: "100%",
    marginTop: 170,
  },
  pointsContainer: {
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  pointsText: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 10,
  },
  pointsRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  pointsValue: {
    fontSize: 30,
    fontWeight: "bold",
    marginRight: 10,
  },
  badgeImage: {
    width: 100,
    height: 100,
    position:"absolute",
    top:-15,
    left:100
  },
  badgeLabel: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default Gamification;
