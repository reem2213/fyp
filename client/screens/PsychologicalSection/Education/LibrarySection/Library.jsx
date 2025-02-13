// import React from "react";
// import { Text, View, TouchableOpacity, Image } from "react-native";
// import Back from "../../../../assets/back.png";
// import LangBg from "../../../../assets/LibBg.png";
// import Next from "../../../../assets/arrowRight.png";
// const Library = ({ navigation }) => {
//   const backToHome = () => {
//     navigation.navigate("EduSection");
//   };
//   const toApps = () => {
//     navigation.navigate("books");
//     console.log("enterreeeddd")
//   };
//   return (
//     <View style={{ backgroundColor: "#B1CB14", height: 900 }}>
//       <TouchableOpacity onPress={backToHome}>
//         <Image
//           source={Back}
//           style={{
//             marginLeft: 20,
//             marginTop: 50,
//             position: "absolute",
//             width: 30,
//             height: 30,
//           }}
//         />
//       </TouchableOpacity>
//       <Text
//         style={{
//           marginLeft: 60,
//           marginTop: 90,
//           color: "white",
//           fontSize: 30,
//           fontWeight: "bold",
//           justifyContent: "center",
//         }}
//       >
//         Find the book you like the most!{" "}
//       </Text>
//       <Image
//         source={LangBg}
//         style={{ width: 390, height: 400, marginTop: -10 }}
//       />
//       <Text
//         style={{ width: "80%", color: "white", marginLeft: 50, marginTop: -30 }}
//       >
//         Dive into a world of knowledge and imagination with our extensive
//         library of books, offering something for every reader's taste and
//         interest
//       </Text>

//       <TouchableOpacity
//         onPress={toApps}
//         style={{
//           backgroundColor: "#B1CB14",
//           width: 100,
//           borderWidth: 10,
//           borderColor: "white",
//           height: 100,
//           borderRadius: 200,
//           marginLeft: 150,
//           marginTop: 50,
//         }}
//       >
//         <Image
//           source={Next}
//           style={{
//             marginLeft: 15,
//             marginTop: 15,
//             position: "absolute",
//             width: 50,
//             height: 50,
//           }}
//         />
//       </TouchableOpacity>
//     </View>
//   );
// };

// export default Library;



import React, { useContext } from "react";
import { Text, View, TouchableOpacity, Image } from "react-native";
import { DarkModeContext } from "../../../../components/DarkModeContext"; // Adjust the import path as needed
import Back from "../../../../assets/back.png";
import LangBg from "../../../../assets/LibBg.png";
import Next from "../../../../assets/arrowRight.png";

const Library = ({ navigation,route }) => {
  const {username,userId}=route.params

  const { isDarkMode } = useContext(DarkModeContext); // Get the dark mode state

  const backToHome = () => {
    navigation.navigate("EduSection",{username,userId});
  };

  const toApps = () => {
    navigation.navigate("books",{username,userId});
    console.log("enterreeeddd");
  };

  return (
    <View style={{ backgroundColor: isDarkMode ? "black" : "#B1CB14", height: "100%" }}>
      <TouchableOpacity onPress={backToHome}>
        <Image
          source={Back}
          style={{
            marginLeft: 20,
            marginTop: 50,
            position: "absolute",
            width: 30,
            height: 30,
          }}
        />
      </TouchableOpacity>
      <Text
        style={{
          marginLeft: 60,
          marginTop: 90,
          color: isDarkMode ? "white" : "white", // Adjust based on the background color
          fontSize: 30,
          fontWeight: "bold",
          justifyContent: "center",
        }}
      >
        Find the book you like the most!
      </Text>
      <Image
        source={LangBg}
        style={{ width: 390, height: 400, marginTop: -10 }}
      />
      <Text
        style={{ width: "80%", color: isDarkMode ? "#ccc" : "white", marginLeft: 50, marginTop: -30 }}
      >
        Dive into a world of knowledge and imagination with our extensive
        library of books, offering something for every reader's taste and
        interest
      </Text>
      <TouchableOpacity
        onPress={toApps}
        style={[{
          backgroundColor: "#B1CB14",
          width: 100,
          borderWidth: 10,
          borderColor: "white",
          height: 100,
          borderRadius: 200,
          marginLeft: 150,
          marginTop: 50,
        },{ backgroundColor: isDarkMode ? "black" : "#B1CB14", borderColor: "#B1CB14" }]}
      >
        <Image
          source={Next}
          style={{
            marginLeft: 15,
            marginTop: 15,
            position: "absolute",
            width: 50,
            height: 50,
          }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Library;
