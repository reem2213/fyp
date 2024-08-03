// import React, { useEffect, useState } from "react";
// import {
//   View,
//   Text,
//   Button,
//   StyleSheet,
//   Alert,
//   TouchableOpacity,
// } from "react-native";
// import axios from "axios";

// const CategoryScreen = ({ navigation }) => {
//   const [categories, setCategories] = useState([]);

//   useEffect(() => {
//     axios
//       .get("http://10.0.0.21:3001/categories")
//       .then((response) => {
//         setCategories(response.data);
//       })
//       .catch((error) => {
//         console.error("Axios Error:", error);
//         Alert.alert("Error", "Failed to load categories");
//       });
//   }, []);

//   return (
//     <View style={styles.container}>
//       <View style={styles.ellipse}></View>
//       <View style={styles.ellipse2}></View>

//       <Text style={styles.title}>Choose a Category</Text>
//       <View style={styles.box}>
//         {categories.length > 0 ? (
//           categories.map((category, index) => (
//             <TouchableOpacity
//               style={styles.boxes}
//               key={index}
//               onPress={() => navigation.navigate("StartQuiz", { category })}
//             >
//               <Text style={{ color: "white", fontWeight: "bold" }}>
//                 {category}
//               </Text>
//             </TouchableOpacity>
//           ))
//         ) : (
//           <Text>Loading categories...</Text>
//         )}
//       </View>
//     </View>
//   );
// };


// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     padding: 20,
//     backgroundColor: "#FFD3B3",
//   },
//   title: {
//     fontSize: 24,
//     marginBottom: 20,
//     color: "white",
//     fontWeight: "bold",
//     fontSize: 35,
//     top: 150,
//     position:"absolute"
//   },
//   ellipse: {
//     width: 150,
//     height: 150,
//     backgroundColor: "#FF6B00",
//     position: "absolute",
//     top: -20,
//     left: 300,
//     borderRadius: 100,
//   },
//   ellipse2: {
//     width: 150,
//     height: 150,
//     backgroundColor: "#FF6B00",
//     position: "absolute",
//     top: 180,
//     left: -90,
//     borderRadius: 100,
//   },
//   boxes: {
//     backgroundColor: "#FF6B00",
//     color: "red",
//     marginBottom: 20,
//     padding: 20,
//     borderRadius: 20,
//     alignItems:"center"
//   },
// //   box:{
// //     flexDirection: "row",
// //     gap:60,
// //     width:"70%"


// //   }
// });

// export default CategoryScreen;




import React, { useEffect, useState, useContext } from "react";
import { View, Text, Alert, TouchableOpacity, StyleSheet } from "react-native";
import axios from "axios";
import { DarkModeContext } from "../../../../components/DarkModeContext"; // Import the context

const CategoryScreen = ({ navigation,route }) => {
  const { isDarkMode } = useContext(DarkModeContext); // Use the context
  const [categories, setCategories] = useState([]);
  const {username}=route.params

  useEffect(() => {
    axios
      .get("http://10.0.0.21:3001/categories")
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error("Axios Error:", error);
        Alert.alert("Error", "Failed to load categories");
      });
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? "black" : "#FFD3B3" }]}>
      <View style={[styles.ellipse, { backgroundColor: isDarkMode ? "#ff8c00" : "#FF6B00" }]}></View>
      <View style={[styles.ellipse2, { backgroundColor: isDarkMode ? "#ff8c00" : "#FF6B00" }]}></View>

      <Text style={[styles.title, { color: isDarkMode ? "white" : "white" }]}>
        Choose a Category
      </Text>
      <View style={styles.box}>
        {categories.length > 0 ? (
          categories.map((category, index) => (
            <TouchableOpacity
              style={[styles.boxes, { backgroundColor: isDarkMode ? "#ff8c00" : "#FF6B00" }]}
              key={index}
              onPress={() => navigation.navigate("StartQuiz", { category,username })}
            >
              <Text style={{ color: "white", fontWeight: "bold" }}>{category}</Text>
            </TouchableOpacity>
          ))
        ) : (
          <Text style={{ color: isDarkMode ? "white" : "black" }}>Loading categories...</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: "bold",
    fontSize: 35,
    top: 150,
    position: "absolute",
  },
  ellipse: {
    width: 150,
    height: 150,
    position: "absolute",
    top: -20,
    left: 300,
    borderRadius: 100,
  },
  ellipse2: {
    width: 150,
    height: 150,
    position: "absolute",
    top: 180,
    left: -90,
    borderRadius: 100,
  },
  boxes: {
    marginBottom: 20,
    padding: 20,
    borderRadius: 20,
    alignItems: "center",
  },
});

export default CategoryScreen;
