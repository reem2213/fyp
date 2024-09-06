// import { useEffect, useState } from "react";
// import {
//   View,
//   StyleSheet,
//   Button,
//   Image,
//   Text,
//   TouchableOpacity,
// } from "react-native";
// import { Audio } from "expo-av";
// import FeedbackImage from "../assets/musicbg.png";
// import Back from "../assets/back.png";
// import AntDesign from "react-native-vector-icons/AntDesign";

// export default function App({ navigation }) {
//   const [playingIndex, setPlayingIndex] = useState(null);
//   const [sound, setSound] = useState(null);

//   async function togglePlaySound(index, source) {
//     if (sound && playingIndex === index) {
//       console.log("Stopping Sound");
//       await sound.stopAsync();
//       sound.unloadAsync(); // unload the sound to clean up resources
//       setSound(null);
//       setPlayingIndex(null);
//     } else {
//       if (sound && playingIndex !== index) {
//         await sound.stopAsync();
//         sound.unloadAsync(); // stop and unload any other playing sound
//       }
//       console.log("Loading Sound");
//       const { sound: newSound } = await Audio.Sound.createAsync(source);
//       setSound(newSound);
//       setPlayingIndex(index);
//       console.log("Playing Sound");
//       await newSound.playAsync();
//     }
//   }

//   useEffect(() => {
//     return () => {
//       sound?.unloadAsync(); // make sure to unload sound when component unmounts
//     };
//   }, [sound]);

//   const backToHome = () => {
//     navigation.navigate("Home");
//   };

//   return (
//     <>
//       <View style={styles.bigContainer}>
//         <TouchableOpacity onPress={backToHome}>
//           <Image source={Back} style={styles.backButton} />
//         </TouchableOpacity>
//         <Text style={styles.header}>Music Zone</Text>
//         <Image source={FeedbackImage} style={styles.feedbackImage} />
//       </View>
//       <View style={styles.container}>
//         <View style={styles.containerr}></View>
//         {[
//           { title: "Better Days", source: require("../tracks/BetterDays.mp3") },
//           { title: "A Sitar Story", source: require("../tracks/ASitarStory.mp3") },
//           { title: "Sweet Math", source: require("../tracks/SweetMath.mp3") },
//           { title: "Two Hearts", source: require("../tracks/TwoHearts.mp3") },
//           { title: "Music 5", source: require("../tracks/BetterDays.mp3") },
//           { title: "Music 6", source: require("../tracks/SweetMath.mp3") },

//         ].map((track, index) => (
//           <View key={index} style={{ flexDirection: "row", gap: 10 }}>
//             <TouchableOpacity
//               style={styles.playPauseBtn}
//               onPress={() => togglePlaySound(index, track.source)}
//             >
//               <AntDesign
//                 name={playingIndex === index ? "pausecircleo" : "playcircleo"}
//                 size={20}
//                 color="white"
//               />
//             </TouchableOpacity>
//             <Text style={{ marginTop: 10, left: -5 }}>{track.title}</Text>
//             <View
//               style={{
//                 backgroundColor: "#D6D7D8",
//                 borderRadius: 50,
//                 width: 220,
//                 height: 5,
//                 position: "absolute",
//                 top: 40,
//                 left: 65,
//               }}
//             ></View>
//           </View>
//         ))}
//       </View>
//     </>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     backgroundColor: "white",
//     width: "85%",
//     marginLeft: 30,
//     marginTop: 20,
//     padding: 10,
//     borderRadius: 30,
//     gap: 5,
//     paddingBottom: 10,
//     marginBottom: 25,
//   },
//   bigContainer: {
//     backgroundColor: "#22CFE7",
//     height: "50%",
//     borderRadius: 70,
//     marginTop: -50,
//   },
//   backButton: {
//     position: "absolute",
//     marginTop: 110,
//     marginLeft: 30,
//     width: 30,
//     height: 30,
//   },
//   header: {
//     color: "white",
//     fontSize: 35,
//     fontWeight: "bold",
//     position: "absolute",
//     marginTop: 150,
//     marginLeft: 100,
//   },
//   feedbackImage: {
//     width: 250,
//     height: 180,
//     marginTop: 200,
//     marginLeft: 70,
//   },
//   containerr: {
//     flexDirection: "row",
//     justifyContent: "center",
//     margin: 0,
//     alignItems: "center",
//   },
//   playPauseBtn: {
//     width: 40,
//     height: 40,
//     alignItems: "center",
//     justifyContent: "center",
//     borderRadius: 100,
//     margin: 10,
//     backgroundColor: "#22CFE7",
//   },
// });

import React, { useContext, useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  Text,
  TouchableOpacity,
} from "react-native";
import { Audio } from "expo-av";
import FeedbackImage from "../assets/musicbg.png";
import Back from "../assets/back.png";
import AntDesign from "react-native-vector-icons/AntDesign";
import { DarkModeContext } from "../components/DarkModeContext";

export default function MusicZoneScreen({ navigation, route }) {
  const { username, userId } = route.params;

  const { isDarkMode } = useContext(DarkModeContext);
  const [playingIndex, setPlayingIndex] = useState(null);
  const [sound, setSound] = useState(null);

  async function togglePlaySound(index, source) {
    if (sound && playingIndex === index) {
      await sound.stopAsync();
      sound.unloadAsync();
      setSound(null);
      setPlayingIndex(null);
    } else {
      if (sound && playingIndex !== index) {
        await sound.stopAsync();
        sound.unloadAsync();
      }
      const { sound: newSound } = await Audio.Sound.createAsync(source);
      setSound(newSound);
      setPlayingIndex(index);
      await newSound.playAsync();
    }
  }

  useEffect(() => {
    return () => {
      sound?.unloadAsync();
    };
  }, [sound]);

  const backToHome = () => {
    navigation.navigate("Home", { username, userId });
  };
  return (
    <>
      <View
        style={[
          {
            color: "black",
            position: "absolute",
            height: "100%",
            width: "100%",
          },
          { backgroundColor: isDarkMode ? "black" : "#fff" },
        ]}
      >
        <View
          style={[
            styles.bigContainer,
            { backgroundColor: isDarkMode ? "#011C4F" : "#22CFE7" },
          ]}
        >
          <TouchableOpacity onPress={backToHome}>
            <Image source={Back} style={styles.backButton} />
          </TouchableOpacity>
          <Text
            style={[styles.header, { color: isDarkMode ? "white" : "white" }]}
          >
            Music Zone
          </Text>
          <Image source={FeedbackImage} style={styles.feedbackImage} />
        </View>

        {/* ScrollView added to make song list scrollable */}
        <ScrollView
          style={[
            styles.container,
            { backgroundColor: isDarkMode ? "#333" : "white" },
          ]}
        >
          {[
            { title: "Unstoppable", source: require("../tracks/Sia - Unstoppable (Lyrics).mp3") },
            { title: "Fight Song", source: require("../tracks/Rachel Platten - Fight Song (Lyrics).mp3") },
            { title: "A Sky Full Of Stars", source: require("../tracks/@coldplay  - A Sky Full Of Stars (Lyrics).mp3") },
            { title: "Riptide", source: require("../tracks/Vance Joy - Riptide (Lyrics).mp3") },
            { title: "Believer", source: require("../tracks/Imagine Dragons - Believer (Lyrics).mp3") },
            { title: "The Greatest", source: require("../tracks/Sia - The Greatest (Lyrics).mp3") },
            { title: "Scars To Your Beautiful", source: require("../tracks/Alessia Cara - Scars To Your Beautiful (Lyrics).mp3") },
            { title: "Champion", source: require("../tracks/Neoni & Burnboy- Champion (Lyrics Video).mp3") },
            { title: "End Of Beginning", source: require("../tracks/Djo - End Of Beginning (Lyrics).mp3") },
            { title: "Cheap Thrills", source: require("../tracks/Sia - Cheap Thrills (Lyrics) ft. Sean Paul.mp3") },
            { title: "Stereo Hearts", source: require("../tracks/Gym Class Heroes - Stereo Hearts (Lyrics)  Heart Stereo.mp3") },
            { title: "Happier", source: require("../tracks/Marshmello ft. Bastille - Happier (Official Music Video).mp3") },
            { title: "Try Everything", source: require("../tracks/Zootopia - Try Everything (Lyrics, Shakira).mp3") },
          ].map((track, index) => (
            <View key={index} style={{ flexDirection: "row", gap: 10 }}>
              <TouchableOpacity
                style={[
                  styles.playPauseBtn,
                  { backgroundColor: isDarkMode ? "#011C4F" : "#22CFE7" },
                ]}
                onPress={() => togglePlaySound(index, track.source)}
              >
                <AntDesign
                  name={playingIndex === index ? "pausecircleo" : "playcircleo"}
                  size={20}
                  color="white"
                />
              </TouchableOpacity>
              <Text
                style={{
                  marginTop: 10,
                  left: -5,
                  color: isDarkMode ? "white" : "black",
                }}
              >
                {track.title}
              </Text>
              <View
                style={{
                  backgroundColor: "#D6D7D8",
                  borderRadius: 50,
                  width: 220,
                  height: 5,
                  position: "absolute",
                  top: 40,
                  left: 65,
                }}
              />
            </View>
          ))}
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "85%",
    marginLeft: 30,
    marginTop: 20,
    padding: 10,
    borderRadius: 30,
    gap: 5,
    paddingBottom: 10,
    marginBottom: 25,
  },
  bigContainer: {
    height: "50%",
    borderRadius: 70,
    marginTop: -40,
  },
  backButton: {
    position: "absolute",
    marginTop: 110,
    marginLeft: 30,
    width: 30,
    height: 30,
  },
  header: {
    fontSize: 35,
    fontWeight: "bold",
    position: "absolute",
    marginTop: 150,
    marginLeft: 100,
  },
  feedbackImage: {
    width: 250,
    height: 180,
    marginTop: 200,
    marginLeft: 70,
  },
  playPauseBtn: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
    margin: 10,
  },
});