// import React from "react";
// import { Text, View, TouchableOpacity, Image } from "react-native";
// import Back from "../../../../assets/back.png";
// import LangBg from "../../../../assets/langBg.png";


// const Language = ({ navigation }) => {
//   const backToHome = () => {
//     navigation.navigate("EduSection");

//   };
//   const toApps = () => {
//     navigation.navigate("apps");
//     console.log("enterreeeddd")
//   };
//   return (
//     <View style={{ backgroundColor: "#F8EF14", height: 900 }}>
//       <TouchableOpacity onPress={backToHome}>
//         <Image
//           source={Back}
//           style={{ marginLeft: 20, marginTop: 50, position: "absolute" , width: 30, height: 30 }}
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
//         Language Learning Resources
//       </Text>
//       <Image source={LangBg} style={{ width: 390, height: 400 }} />
//       <Text
//         style={{ width: "80%", color: "white", marginLeft: 50, marginTop: -50 }}
//       >
//         Expand your horizons and enrich your mind by exploring our curated
//         selection of language learning resources. Start your journey to fluency
//         today!
//       </Text>

//       <TouchableOpacity onPress={toApps} style={{backgroundColor:"white", width:200, height:50,borderRadius:20 ,marginLeft:100, marginTop:50}}>
//         <Text style={{color:"#E5DC08", top:10, left:30, fontSize:18, fontWeight:"bold"}}>Choose your app</Text>
//       </TouchableOpacity>

//     </View>

//   );
// };

// export default Language;

import React, { useContext } from "react";
import { Text, View, TouchableOpacity, Image, StyleSheet } from "react-native";
import { DarkModeContext } from "../../../../components/DarkModeContext"; // Adjust the import path as needed
import Back from "../../../../assets/back.png";
import LangBg from "../../../../assets/langBg.png";

const Language = ({ navigation,route }) => {
  const { isDarkMode } = useContext(DarkModeContext);
  const{username,userId}=route.params // Get the dark mode state

  const backToHome = () => {
    navigation.navigate("EduSection",{username,userId});
  };

  const toApps = () => {
    navigation.navigate("apps",{username,userId});
    console.log("entered");
  };

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? "#121212" : "#F8EF14" }]}>
      <TouchableOpacity onPress={backToHome}>
        <Image
          source={Back}
          style={styles.backButton}
        />
      </TouchableOpacity>
      <Text style={[styles.title, { color: isDarkMode ? "white" : "white" }]}>
        Language Learning Resources
      </Text>
      <Image source={LangBg} style={styles.backgroundImage} />
      <Text style={[styles.description, { color: isDarkMode ? "white" : "white" }]}>
        Expand your horizons and enrich your mind by exploring our curated
        selection of language learning resources. Start your journey to fluency
        today!
      </Text>
      <TouchableOpacity onPress={toApps} style={[styles.button, { backgroundColor: isDarkMode ? "#E5DC08" : "white" }]}>
        <Text style={[styles.buttonText, { color: isDarkMode ? "white" : "#E5DC08" }]}>
          Choose your app
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    padding: 20,
  },
  backButton: {
    marginLeft: 20,
    marginTop: 50,
    position: "absolute",
    width: 30,
    height: 30,
  },
  title: {
    marginLeft: 20,
    marginTop: 120,
    fontSize: 25,
    fontWeight: "bold",
    justifyContent: "center",
    width:"100%"
  },
  backgroundImage: {
    width: 400,
    height: 400,
    marginTop: 20,
    left:-20
  },
  description: {
    width: "80%",
    marginLeft: 50,
    marginTop: -50,
  },
  button: {
    width: 200,
    height: 50,
    borderRadius: 20,
    marginLeft: 90,
    marginTop: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default Language;
