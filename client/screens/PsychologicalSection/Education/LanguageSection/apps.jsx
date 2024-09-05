// import React from "react";
// import { Text, View, Image, StyleSheet, TouchableOpacity ,Linking} from "react-native";
// import LangBg from "../../../../assets/languageSection.png";
// import Duolingo from "../../../../assets/duolingo.png";
// import Busuu from "../../../../assets/busuu logo.png";
// import Drops from "../../../../assets/drops.jpeg";
// import Menrise from "../../../../assets/memrise.jpeg";
// import Mondly from "../../../../assets/mondly.png";
// import Fluentu from "../../../../assets/fluentu-logo.png";
// import Back from "../../../../assets/back.png";

// const Apps = ({navigation}) => {
//     const handlePress = () => {
//         Linking.openURL('https://www.fluentu.com/'); 
//       };

//       const goToDuolingo = () => {
//         Linking.openURL('https://www.duolingo.com/'); 
//       };
//       const goToDrops = () => {
//         Linking.openURL('https://languagedrops.com/'); 
//       };
//       const goToMenrise = () => {
//         Linking.openURL('https://app.memrise.com/'); 
//       };
//       const goToBusuu = () => {
//         Linking.openURL('https://www.busuu.com/'); 
//       };
//       const goToMondly = () => {
//         Linking.openURL('https://app.mondly.com/home'); 
//       };
//       const backToHome = () => {
//         navigation.navigate("EduSection");
    
//       };
    
//   return (
//     <View>
//         <TouchableOpacity onPress={backToHome}>
//         <Image
//           source={Back}
//           style={{ marginLeft: 20, marginTop: 50 , width: 30, height: 30 }}
//         />
//         </TouchableOpacity>
//       <Image style={styles.bg} source={LangBg} />
//       <Image style={styles.bg} source={LangBg} />
//       <Image style={styles.bg} source={LangBg} />
//       <Text style={styles.title}>Choose your app</Text>
//       <TouchableOpacity style={styles.im1} onPress={goToDuolingo}>
//         <Image style={styles.im1} source={Duolingo} />
//         <Text style={styles.title1}>Duolingo</Text>
//       </TouchableOpacity>

//       <TouchableOpacity style={styles.im2} onPress={goToMondly}> 
//         <Image style={styles.im2} source={Mondly} />
//         <Text style={styles.title2}>Mondly</Text>
//       </TouchableOpacity>

//       <TouchableOpacity style={styles.im3} onPress={goToBusuu}>
//         <Image style={styles.im3} source={Busuu} />
//         <Text style={styles.title3}>Busuu</Text>
//       </TouchableOpacity>

//       <TouchableOpacity style={styles.im5} onPress={goToMenrise}>
//         <Image style={styles.im5} source={Menrise} />
//         <Text style={styles.title5}>Menrise</Text>
//       </TouchableOpacity>

//       <TouchableOpacity style={styles.im6} onPress={goToDrops}>
//         <Image style={styles.im6} source={Drops} />
//         <Text style={styles.title6}>Drops</Text>
//       </TouchableOpacity>

// <View style={styles.bggg}> 
// <Text style={{color:"white"}}>helo</Text>
// </View>
// <TouchableOpacity style={styles.im4} onPress={handlePress}>
//         <Image style={styles.im4} source={Fluentu} />
//         <Text style={styles.title4}>Fluentu</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };
// const styles = StyleSheet.create({
//   bg: {
//     opacity: 0.2,
//   },
//   title: {
//     marginTop: 100,
//     position: "absolute",
//     color: "#F8EF14",
//     backgroundColor: "white",
//     fontSize: 30,
//     fontWeight: "bold",
//     opacity: 0.9,
//     padding: 10,
//     borderRadius: 20,
//     marginLeft: 70,
//   },
//   im1: {
//     marginTop: 100,
//     marginLeft: 25,
//     position: "absolute",
//     width: 120,
//     height: 120,
//   },
//   title1: {
//     marginTop: 230,
//     marginLeft: 50,
//     fontSize:18,
//     fontWeight:"bold",
//     position: "absolute",
//     width: "100%",
//   },
//   im2: {
//     marginTop: 100,
//     marginLeft: 110,
//     position: "absolute",
//     width: 120,
//     height: 120,
//     borderRadius:30
//   },
//   title2: {
//     marginTop: 230,
//     marginLeft: 140,
//     fontSize:18,
//     fontWeight:"bold",
//     position: "absolute",
//     width: "100%",
//   },
//   im3: {
//     marginTop: 190,
//     marginLeft: 110,
//     position: "absolute",
//     width: 120,
//     height: 120,
//     borderRadius:30
//   },
//   title3: {
//     marginTop: 320,
//     marginLeft: 140,
//     fontSize:18,
//     fontWeight:"bold",
//     position: "absolute",
//     width: "100%",
//   },
//   im4: {
//     marginTop: -275,
//     marginLeft: 110,
//     width: 115,
//     height: 23,
//     borderRadius:30,
    
//   },
//   title4: {
//     marginTop: -185,
//     marginLeft: 140,
//     fontSize:18,
//     fontWeight:"bold",
//     position: "absolute",
//     width: "100%",
//   },
  
//   bggg:{
//     backgroundColor:"white",
//     color:"white",
//     width: 120,
//     height: 120,
//     marginTop:560,
//     borderRadius:30,
//     padding:10,
//     position:"absolute",
// marginLeft:220,
//   },
//   im5: {
//     marginTop: 190,
//     marginLeft: 25,
//     position: "absolute",
//     width: 120,
//     height: 120,
//     borderRadius:30

//   },
//   title5: {
//     marginTop: 320,
//     marginLeft: 50,
//     fontSize:18,
//     fontWeight:"bold",    position: "absolute",
//     width: "100%",
//   },

//   im6: {
//     marginTop: 280,
//     marginLeft: 25,
//     position: "absolute",
//     width: 120,
//     height: 120,
//     borderRadius:30

//   },
//   title6: {
//     marginTop: 410,
//     marginLeft: 55,
//     fontSize:18,
//     fontWeight:"bold",    position: "absolute",
//     width: "100%",
//   },
// });
// export default Apps;



import React ,{useContext}from "react";
import { Text, View, Image, StyleSheet, TouchableOpacity, Linking } from "react-native";
import LangBg from "../../../../assets/languageSection.png";
import Duolingo from "../../../../assets/duolingo.png";
import Busuu from "../../../../assets/busuu logo.png";
import Drops from "../../../../assets/drops.jpeg";
import Menrise from "../../../../assets/memrise.jpeg";
import Mondly from "../../../../assets/mondly.png";
import Fluentu from "../../../../assets/fluentu-logo.png";
import Back from "../../../../assets/back.png";
import { DarkModeContext } from "../../../../components/DarkModeContext"; // Adjust the import path as needed

const Apps = ({ navigation,route }) => {
  const{username,userId}=route.params // Get the dark mode state
  const { isDarkMode } = useContext(DarkModeContext); // Get the dark mode state

  const handlePress = () => {
    Linking.openURL('https://www.fluentu.com/'); 
  };

  const goToDuolingo = () => {
    Linking.openURL('https://www.duolingo.com/'); 
  };

  const goToDrops = () => {
    Linking.openURL('https://languagedrops.com/'); 
  };

  const goToMenrise = () => {
    Linking.openURL('https://app.memrise.com/'); 
  };

  const goToBusuu = () => {
    Linking.openURL('https://www.busuu.com/'); 
  };

  const goToMondly = () => {
    Linking.openURL('https://app.mondly.com/home'); 
  };

  const backToHome = () => {
    navigation.navigate("EduSection",{username,userId});
  };

  return (
    <View style={[styles.container,{backgroundColor: isDarkMode ? "black" : "white"}]}>
      <TouchableOpacity onPress={backToHome}>
        <Image
          source={Back}
          style={styles.backButton}
        />
      </TouchableOpacity>
      
      <Image style={styles.bg} source={LangBg} />
      <Image style={styles.bg} source={LangBg} />
      <Image style={styles.bg} source={LangBg} />

      <Text style={[styles.title,{color: isDarkMode ? "#F8EF14" : "black"}]}>Choose your app</Text>
      <TouchableOpacity style={styles.im1} onPress={goToDuolingo}>
        <Image style={styles.im1} source={Duolingo} />
        <Text style={[styles.title1,{color: isDarkMode ? "#F8EF14" : "black"}]}>Duolingo</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.im2} onPress={goToMondly}> 
        <Image style={styles.im2} source={Mondly} />
        <Text style={[styles.title2,{color: isDarkMode ? "#F8EF14" : "black"}]}>Mondly</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.im3} onPress={goToBusuu}>
        <Image style={styles.im3} source={Busuu} />
        <Text style={[styles.title3,{color: isDarkMode ? "#F8EF14" : "black"}]}>Busuu</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.im5} onPress={goToMenrise}>
        <Image style={styles.im5} source={Menrise} />
        <Text style={[styles.title5,{color: isDarkMode ? "#F8EF14" : "black"}]}>Menrise</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.im6} onPress={goToDrops}>
        <Image style={styles.im6} source={Drops} />
        <Text style={[styles.title6,{color: isDarkMode ? "#F8EF14" : "black"}]}>Drops</Text>
      </TouchableOpacity>

      <TouchableOpacity  onPress={handlePress}>
        <Image style={styles.im4} source={Fluentu} />
        <Text style={[styles.title4,{color: isDarkMode ? "#F8EF14" : "black"}]}>Fluentu</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white", // Dark mode background color
    height: "100%",
  },
  backButton: {
    marginLeft: 20,
    marginTop: 50,
    width: 30,
    height: 30,
  },
  bg: {
    opacity: 0.2,
  },
  title: {
    marginTop: 100,
    position: "absolute",
    // Dark mode background color for the title
    fontSize: 30,
    fontWeight: "bold",
    opacity: 0.9,
    padding: 10,
    borderRadius: 20,
    marginLeft: 70,
  },
  im1: {
    marginTop: 100,
    marginLeft: 25,
    position: "absolute",
    width: 120,
    height: 120,
  },
  title1: {
    marginTop: 230,
    marginLeft: 50,
    fontSize: 18,
    fontWeight: "bold",
    position: "absolute",
    width: "100%",
    
  },
  im2: {
    marginTop: 100,
    marginLeft: 110,
    position: "absolute",
    width: 120,
    height: 120,
    borderRadius: 30,
  },
  title2: {
    marginTop: 230,
    marginLeft: 140,
    fontSize: 18,
    fontWeight: "bold",
    position: "absolute",
    width: "100%",
  },
  im3: {
    marginTop: 190,
    marginLeft: 110,
    position: "absolute",
    width: 120,
    height: 120,
    borderRadius: 30,
  },
  title3: {
    marginTop: 320,
    marginLeft: 140,
    fontSize: 18,
    fontWeight: "bold",
    position: "absolute",
    width: "100%",
  },
  im4: {
    marginTop: -585,
    marginLeft: 220,
    width: 120,
    height: 120,
    borderRadius: 30,
    backgroundColor:"white",
    position: "absolute",

  },
  title4: {
    marginTop: -460,
    marginLeft: 250,
    fontSize: 18,
    fontWeight: "bold",
    position: "absolute",
    width: "100%",
  },
  im5: {
    marginTop: 190,
    marginLeft: 25,
    position: "absolute",
    width: 120,
    height: 120,
    borderRadius: 30,
  },
  title5: {
    marginTop: 320,
    marginLeft: 50,
    fontSize: 18,
    fontWeight: "bold",
    position: "absolute",
    width: "100%",
  },
  im6: {
    marginTop: 280,
    marginLeft: 25,
    position: "absolute",
    width: 120,
    height: 120,
    borderRadius: 30,
  },
  title6: {
    marginTop: 410,
    marginLeft: 55,
    fontSize: 18,
    fontWeight: "bold",
    position: "absolute",
    width: "100%",
  },
});

export default Apps;
