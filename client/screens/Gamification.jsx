// import React from "react";
// import { Text, View, Image, TouchableOpacity } from "react-native";
// import PinkEllipse from "../assets/pinkEllipse.png";
// import Back from "../assets/whiteArrowBack.png";
// import Bg from "../assets/gamificationBg.png";
// const Gamification = ({ navigation }) => {
//   const GoBackToHome = () => {
//     navigation.navigate("Home");
//   };
//   return (
//     <View style={{ backgroundColor: "#FFEEF7", height: "100%" }}>
//       <Image
//         style={{ width: 250, height: 250, top: -80, left: 290 }}
//         source={PinkEllipse}
//       />

//       <TouchableOpacity onPress={GoBackToHome}>
//         <Image style={{ top: -200, left: 20 }} source={Back} />
//       </TouchableOpacity>

//       <Image
//         source={Bg}
//         style={{ width: 350, height: 250, top: -200, left: 20 }}
//       />

//       <Text
//         style={{
//           fontSize: 30,
//           fontWeight: "bold",
//           top: -200,
//           left: 20,
//           color: "#EB1F88",
//         }}
//       >
//         Gamification
//       </Text>
//     </View>
//   );
// };

// export default Gamification;

// import React from "react";
// import { Text, View, Image, TouchableOpacity, StyleSheet } from "react-native";
// import PinkEllipse from "../assets/pinkEllipse.png";
// import Back from "../assets/whiteArrowBack.png";
// import Bg from "../assets/gamificationBg.png";
// import GoldBadge from "../assets/GoldBadge.png";
// import SilverBadge from "../assets/SilverBadge.png";
// import BronzeBadge from "../assets/BronzeBadge.png";

// const Gamification = ({ route, navigation }) => {
//   const { points } = route.params;

//   const GoBackToHome = () => {
//     navigation.navigate("Home");
//   };

//   const getBadge = () => {
//     if (points === 100) {
//       return GoldBadge;
//     } else if (points === 75) {
//       return SilverBadge;
//     } else if (points === 50) {
//       return BronzeBadge;
//     } else {
//       return null;
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Image
//         style={styles.pinkEllipse}
//         source={PinkEllipse}
//       />

//       <TouchableOpacity onPress={GoBackToHome}>
//         <Image style={styles.backButton} source={Back} />
//       </TouchableOpacity>

//       <Image
//         source={Bg}
//         style={styles.backgroundImage}
//       />

//       <Text style={styles.headerText}>Gamification</Text>

//       <View style={styles.pointsContainer}>
//         <Text style={styles.pointsText}>You've earned {points} points!</Text>
//         {getBadge() && <Image source={getBadge()} style={styles.badgeImage} />}
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: "#FFEEF7",
//     height: "100%",
//     alignItems: "center",
//     paddingTop: 50,
//   },
//   pinkEllipse: {
//     width: 250,
//     height: 250,
//     position: "absolute",
//     top: -80,
//     left: 290,
//   },
//   backButton: {
//     position: "absolute",
//     top: 10,
//     left: 20,
//   },
//   backgroundImage: {
//     width: 350,
//     height: 250,
//     marginTop: -200,
//   },
//   headerText: {
//     fontSize: 30,
//     fontWeight: "bold",
//     marginTop: -200,
//     color: "#EB1F88",
//   },
//   pointsContainer: {
//     marginTop: 20,
//     alignItems: "center",
//   },
//   pointsText: {
//     fontSize: 20,
//     fontWeight: "bold",
//     color: "#EB1F88",
//     top:150
//   },
//   badgeImage: {
//     width: 100,
//     height: 100,
//     marginTop: 10,
//   },
// });

// export default Gamification;





import React, { useEffect, useState } from "react";
import { Text, View, Image, TouchableOpacity, StyleSheet, FlatList } from "react-native";
import axios from 'axios';
import PinkEllipse from "../assets/pinkEllipse.png";
import Back from "../assets/whiteArrowBack.png";
import Bg from "../assets/gamificationBg.png";
import GoldBadge from "../assets/GoldBadge.png";
import SilverBadge from "../assets/SilverBadge.png";
import BronzeBadge from "../assets/BronzeBadge.png";

const Gamification = ({ route, navigation }) => {
  const [scores, setScores] = useState([]);

  useEffect(() => {
    fetchScores();
  }, []);

  const fetchScores = async () => {
    try {
      const response = await axios.get('http://10.0.0.21:3001/scores');
      setScores(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const GoBackToHome = () => {
    navigation.navigate("Home");
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
      <View style={styles.pointsContainer}>
        <Text style={styles.pointsText}>Great job! You've earned bonus coins for completing your goal</Text>
        <View style={styles.pointsRow}>
          <Text style={styles.pointsValue}>{item.points} pts</Text>
          {badge.image && <Image source={badge.image} style={styles.badgeImage} />}
        </View>
        <Text style={styles.badgeLabel}>{badge.label}</Text>
      </View>
    );
  };

  return (
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

      <Text style={styles.headerText}>Gamification</Text>

      <FlatList
        data={scores}
        renderItem={renderScoreItem}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFEEF7",
    height: "100%",
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
    marginLeft: 0,
  },
  backgroundImage: {
    width: 350,
    height: 250,
    alignSelf: "center",
  },
  headerText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#EB1F88",
    marginTop: -150,
    top: 150,
    marginLeft: 0,
  },
  pointsContainer: {
    backgroundColor: "#FFF",
    borderRadius: 10,
    padding: 20,
    marginTop: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  pointsText: {
    fontSize: 16,
    color: "#000",
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
    color: "#EB1F88",
    marginRight: 10,
  },
  badgeImage: {
    width: 100,
    height: 70,
  },
  badgeLabel: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  listContainer: {
    paddingBottom: 20,
  },
});

export default Gamification;



// import React from "react";
// import { Text, View, Image, TouchableOpacity, StyleSheet } from "react-native";
// import PinkEllipse from "../assets/pinkEllipse.png";
// import Back from "../assets/whiteArrowBack.png";
// import Bg from "../assets/gamificationBg.png";
// import GoldBadge from "../assets/GoldBadge.png";
// import SilverBadge from "../assets/SilverBadge.png";
// import BronzeBadge from "../assets/BronzeBadge.png";

// const Gamification = ({ route, navigation }) => {
//   const { points } = route.params;

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

//   const badge = getBadge(points);

//   return (
//     <View style={styles.container}>
//       <Image
//         style={styles.pinkEllipse}
//         source={PinkEllipse}
//       />

//       <TouchableOpacity onPress={GoBackToHome}>
//         <Image style={styles.backButton} source={Back} />
//       </TouchableOpacity>

//       <Image
//         source={Bg}
//         style={styles.backgroundImage}
//       />

//       <Text style={styles.headerText}>Gamification</Text>

//       <View style={styles.pointsContainer}>
//         <Text style={styles.pointsText}>Great job! You've earned bonus coins for completing your goal</Text>
//         <View style={styles.pointsRow}>
//           <Text style={styles.pointsValue}>{points} pts</Text>
//           {badge.image && <Image source={badge.image} style={styles.badgeImage} />}
//         </View>
//         <Text style={styles.badgeLabel}>{badge.label}</Text>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: "#FFEEF7",
//     height: "100%",
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
//     marginLeft: 0,
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
//     top:150,
//     marginLeft: 0,
//   },
//   pointsContainer: {
//     backgroundColor: "#FFF",
//     borderRadius: 10,
//     padding: 20,
//     marginTop: 150,
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
//     height: 70,
//   },
//   badgeLabel: {
//     fontSize: 18,
//     fontWeight: "bold",
//     color: "#000",
//   },
// });

// export default Gamification;
