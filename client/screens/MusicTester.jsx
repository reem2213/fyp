// import { View, Text, StyleSheet, Image, ImageBackground, TouchableOpacity } from "react-native";
// import MusicBg from "../assets/musicbg.jpg";
// const MusicTester = () => {
//   return (
//     <View>
//       {/* <Text>hiiii</Text> */}
//       <ImageBackground source={MusicBg} style={styles.bg}>
//         <View>
//           <Text style={styles.text}>hii this is my music section</Text>
//           <View>
//             <TouchableOpacity>

//             </TouchableOpacity>
//         </View>
//         </View>

//       </ImageBackground>
//     </View>
//   );
// };
// const styles = StyleSheet.create({
//   text: {
//     color: "white",
//     marginLeft: 100,
//     marginTop: 100,
//   },
//   bg: {
//     resizeMode: "cover",
// height:"100%"  },
// });
// export default MusicTester;

import { StatusBar } from "expo-status-bar";
import MusicBg from "../assets/musicbg.jpg";
import Song1 from '../tracks/BetterDays.mp3';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import { Audio } from "expo-av";

export default function App() {
  playSound = async (url) => {
    await Audio.setIsEnabledAsync(true);
    await Audio.Sound.createAsync({ uri: url }, { shouldPlay: true });
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={MusicBg} resizeMode="cover" style={{ flex: 1 }}>
        <View style={{ flex: 0.2 }}>
          <Text style={styles.textDesign}>MixTape for Saisha</Text>
        </View>

        <ScrollView style={{ flex: 0.6 }}>
          <TouchableOpacity
            style={[
              styles.buttonDesign,
              {
                marginTop: 15,
              },
            ]}
            onPress={() => {
                var url={Song1}
            //   var url =
            //     "https://cdn.glitch.global/88a45ff5-855c-4337-9c23-a7d2475ba747/06%20Moh%20Moh%20Ke%20Dhaage%20(Female)%20-%20Monali%20Thakur%20-%20320Kbps.mp3?v=1647317300480";
            //   
            playSound(url);
            }}
          >
            {/* <Image source={require("./assets/button.png")} /> */}

            <Text style={styles.buttonText}>Moh Moh ke</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.buttonDesign}
            onPress={() => {
              var url =
                "https://cdn.glitch.global/88a45ff5-855c-4337-9c23-a7d2475ba747/01.%20Saibo.mp3?v=1647317900340";

              playSound(url);
            }}
          >
            <Text style={styles.buttonText}>Saibo</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.buttonDesign}
            onPress={() => {
              var url =
                "https://cdn.glitch.global/88a45ff5-855c-4337-9c23-a7d2475ba747/godGaveMeU.mp3?v=1647318928874";

              playSound(url);
            }}
          >
            <Text style={styles.buttonText}>God gave me U</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.buttonDesign}
            onPress={() => {
                var url={Song1}
            //   var url =
            //     "https://cdn.glitch.global/88a45ff5-855c-4337-9c23-a7d2475ba747/06%20Moh%20Moh%20Ke%20Dhaage%20(Female)%20-%20Monali%20Thakur%20-%20320Kbps.mp3?v=1647317300480";
            //   
            playSound(url);
            }}
          >
            <Text style={styles.buttonText}>Begin Again</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.buttonDesign}
            onPress={() => {
              var url =
                "https://cdn.glitch.global/88a45ff5-855c-4337-9c23-a7d2475ba747/Enchanted.mp3?v=1647318996409";

              playSound(url);
            }}
          >
            <Text style={styles.buttonText}>Enchanted</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.buttonDesign}
            onPress={() => {
              var url =
                "https://cdn.glitch.global/88a45ff5-855c-4337-9c23-a7d2475ba747/when%20you%20say%20nothing%20at%20all.mp3?v=1647319002430";

              playSound(url);
            }}
          >
            <Text style={styles.buttonText}>When you Say</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.buttonDesign}
            onPress={() => {
              var url =
                "https://cdn.glitch.global/88a45ff5-855c-4337-9c23-a7d2475ba747/04.%20Bikhri%20Bikhri.mp3?v=1647319034872";

              playSound(url);
            }}
          >
            <Text style={styles.buttonText}>Bikhri Bikhri</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.buttonDesign}
            onPress={() => {
              var url =
                "https://cdn.glitch.global/88a45ff5-855c-4337-9c23-a7d2475ba747/BeautifulTimes.mp3?v=1647319044331";

              playSound(url);
            }}
          >
            <Text style={styles.buttonText}>Beautiful times</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.buttonDesign}
            onPress={() => {
              var url =
                "https://cdn.glitch.global/88a45ff5-855c-4337-9c23-a7d2475ba747/VanillaTwilight.mp3?v=1647319045674";

              playSound(url);
            }}
          >
            <Text style={styles.buttonText}>Vannila Twilight</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.buttonDesign}
            onPress={() => {
              var url =
                "https://cdn.glitch.global/88a45ff5-855c-4337-9c23-a7d2475ba747/07.%20Bin%20Tere%20Kiya%20Hai%20Jeena%20-%20Jawad%20Ahmed.mp3?v=1647319073325";

              playSound(url);
            }}
          >
            <Text style={styles.buttonText}>Bin tere</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.buttonDesign, { paddingBottom: 50 }]}
            onPress={() => {
              var url =
                "https://cdn.glitch.global/88a45ff5-855c-4337-9c23-a7d2475ba747/dbz10.mp3?v=1647323509040";

              playSound(url);
            }}
          >
            <Text style={styles.buttonText}>Dragon Ball z</Text>
          </TouchableOpacity>
        </ScrollView>

        <View style={{ flex: 0.2 }}>
          <TouchableOpacity
            style={[styles.buttonDesign, { marginTop: -20 }]}
            onPress={() => {
              Audio.setIsEnabledAsync(false);
            }}
          >
            <Text style={styles.buttonText}>Stop Song</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: "#fff",
  },

  textDesign: {
    color: "white",

    backgroundColor: "#81d8d0",

    borderWidth: 5,

    borderColor: "white",

    borderRadius: 30,

    fontSize: 35,

    overflow: "hidden",

    textAlign: "center",

    width: "75%",

    height: 60,


    marginTop: -120,

    alignSelf: "center",
  },

  buttonDesign: {
    justifyContent: "center",

    alignItems: "center",

    alignSelf: "center",

    width: 200,

    marginTop: 50,
  },

  buttonText: {
    color: "white",

    fontSize: 28,

    textAlign: "center",


    marginTop: -90,
  },
});
