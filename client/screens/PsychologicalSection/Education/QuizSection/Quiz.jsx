// import React from "react";
// import { Text, View, TouchableOpacity, Image } from "react-native";
// import Back from "../../../../assets/back.png";
// import LangBg from "../../../../assets/quizSection.png";

// const Quiz = ({ navigation }) => {
//     const backToHome = () => {
//         navigation.navigate("EduSection");
//       };
//       const Start = () => {
//         navigation.navigate("QuizCategory");
//       };
      
//   return (
//     <View style={{ backgroundColor: "#FF6B00", height: 900 }}>
//       <TouchableOpacity onPress={backToHome}>
//         <Image
//           source={Back}
//           style={{ marginLeft: 20, marginTop: 50, position: "absolute" , width: 30, height: 30 }}
//         />
//       </TouchableOpacity>
      
//       <Image source={LangBg} style={{position: "absolute", width: 390, height: 400, marginTop:100 }} />
//       <Text
//         style={{ width: "90%", color: "white", marginLeft: 50, marginTop: 400 ,
//         fontSize: 25,
//         fontWeight: "bold",}}
//       >
//         Test your knowledge and challenge your mind with our interactive quizzes
//       </Text>

//       <TouchableOpacity style={{backgroundColor:"white", width:200, height:50,borderRadius:20 ,marginLeft:100, marginTop:50}} onPress={Start}>
//         <Text style={{color:"#FF6B00", top:10, left:50, fontSize:18, fontWeight:"bold"}}>Let's Start</Text>
//       </TouchableOpacity>

//     </View>

//   );
// };

// export default Quiz;



import React, { useContext } from "react";
import { Text, View, TouchableOpacity, Image } from "react-native";
import Back from "../../../../assets/back.png";
import LangBg from "../../../../assets/quizSection.png";
import { DarkModeContext } from "../../../../components/DarkModeContext"; // Import the context

const Quiz = ({ navigation,route }) => {
  const { isDarkMode } = useContext(DarkModeContext); // Use the context
  const {username,userId}=route.params

  const backToHome = () => {
    navigation.navigate("EduSection",{username,userId});
  };
  const Start = () => {
    navigation.navigate("QuizCategory",{username,userId});
  };

  return (
    <View style={{ backgroundColor: isDarkMode ? "black" : "#FF6B00", height: 900 }}>
      <TouchableOpacity onPress={backToHome}>
        <Image
          source={Back}
          style={{ marginLeft: 20, marginTop: 50, position: "absolute", width: 30, height: 30 }}
        />
      </TouchableOpacity>

      <Image source={LangBg} style={{ position: "absolute", width: 390, height: 400, marginTop: 100 }} />
      <Text
        style={{
          width: "90%",
          color: isDarkMode ? "white" : "white",
          marginLeft: 50,
          marginTop: 400,
          fontSize: 25,
          fontWeight: "bold",
        }}
      >
        Test your knowledge and challenge your mind with our interactive quizzes
      </Text>

      <TouchableOpacity
        style={{
          backgroundColor: isDarkMode ? "#FF6B00" : "white",
          width: 200,
          height: 50,
          borderRadius: 20,
          marginLeft: 100,
          marginTop: 50,
        }}
        onPress={Start}
      >
        <Text
          style={{
            color: isDarkMode ? "white" : "#FF6B00",
            top: 10,
            left: 50,
            fontSize: 18,
            fontWeight: "bold",
          }}
        >
          Let's Start
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Quiz;
