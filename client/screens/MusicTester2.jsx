// import React, { useEffect } from "react";
// import { Text, TouchableOpacity, View ,StyleSheet, ScrollView} from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import Sound from "react-native-sound";
// import { Platform } from 'react-native';

// const MusicTester2 = () => {
//   let sound1, sound2, sound3;
//   const IsAndroid = Platform.OS === 'android';
//   const containerStyle = IsAndroid ? styles.androidContainer : styles.container;

//   useEffect(() => {
//     Sound.setCategory("Playback", true);
//     return () => {
//       if (sound1) sound1.release();
//       if (sound2) sound2.release();
//       if (sound3) sound3.release();
//       if (sound4) sound4.release();
//       if (sound5) sound5.release();
//       if (sound6) sound6.release();
//     };
//   }, []);

//   const audioList = [
//     {
//       title: "test one",
//       isRequired: true,
//       url: require("../tracks/ASitarStory.mp3"),
//     },
//     {
//       title: "test two",
//       isRequired: true,
//       url: require("../tracks/BetterDays.mp3"),
//     },
//     {
//       title: "test three",
//       isRequired: true,
//       url: require("../tracks/SweetMath.mp3"),
//     },
//   ];

//   const playSound = (item, index) => {
//     if (index == 0) {
//       sound1 = new Sound(item.url, "", (error, _sound) => {
//         if (error) {
//           alert("error" + error.message);
//           return;
//         }
//         sound1.play(() => {
//           sound1.release();
//         });
//       });
//     } else if (index == 1) {
//       sound2 = new Sound(item.url, "", (error, _sound) => {
//         if (error) {
//           alert("error" + error.message);
//           return;
//         }
//         sound2.play(() => {
//           sound2.release();
//         });
//       });
//     } else if (index == 2) {
//       sound3 = new Sound(item.url, "", (error, _sound) => {
//         if (error) {
//           alert("error" + error.message);
//           return;
//         }
//         sound3.play(() => {
//           sound3.release();
//         });
//       });
//     }
//   };

//   const stopSound = () => {
//     if (index == 0 && sound1) {
//       sound1.stop(() => {
//         console.log("stop");
//       });
//     }
//     else  if (index == 1 && sound2) {
//         sound2.stop(() => {
//           console.log("stop");
//         });
//       }
//       else  if (index == 2 && sound3) {
//         sound3.stop(() => {
//           console.log("stop");
//         });
//       }
//   };

//   const ItemView =(item,index)=>{
//     return (

//         <View style={styles.features} key={index}>
//             <Text style={styles.textStyle}>{item.title}</Text>
//             <TouchableOpacity onPress={()=>playSound(item,index)}>
//                 <Text style={styles.buttonPlay}>PLay</Text>
//             </TouchableOpacity>

//             <TouchableOpacity onPress={()=>stopSound(item,index)}>
//                 <Text style={styles.buttonStop}>Stop</Text>
//             </TouchableOpacity>

//         </View>
//     )

//   }
//   return (
//     <SafeAreaView style={{flex:1}}>
//         <View style={containerStyle}>
//             <Text style={styles.titleText}>
//                 Playy musicooo
//             </Text>
//             <ScrollView style={{flex:1}}>
//                 {audioList.map(ItemView)}
//             </ScrollView>
//         </View>
//     </SafeAreaView>
//   );
// };
// const styles =StyleSheet.create({
//     container:{
//         flex:1,
//         backgroundColor:"white",
//         padding:10
//     },
//     titleText:{
//         fontSize:22,
//         textAlign:'center',
//         fontWeight:"bold"
//     },
//     textStyle:{
//         flex:1,
//         padding:5
//     },
//     buttonPlay:{
//         fontSize:15,
//         color:"white",
//         backgroundColor:"black",
//         overflow:"hidden",
//         paddingHorizontal:15,
//         paddingVertical:7
//     },
//     buttonStop:{
//         fontSize:15,
//         color:"white",
//         backgroundColor:"black",
//         overflow:"hidden",
//         paddingHorizontal:15,
//         paddingVertical:7
//     },
//     features:{
//         flexDirection:'row',
//         padding
//         :5,
//         marginTop:7,
//         alignSelf:"stretch",
//         alignItems:'center',
//         borderTopWidth:1
//     },
//     androidContainer: {
//         flex: 1,
//         backgroundColor: 'lightgrey',
//       },

// })

// export default MusicTester2;








// import React, { useEffect } from "react";
// import {
//   Text,
//   TouchableOpacity,
//   View,
//   StyleSheet,
//   ScrollView,
//   Platform,
// } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import Sound from "react-native-sound";

// const MusicTester2 = () => {
//   let sound1, sound2, sound3;

//   const isAndroid = Platform.OS === "android";
//   const containerStyle = isAndroid ? styles.androidContainer : styles.container;
//   var RNSound = require("react-native").NativeModules.RNSound;
//   var IsAndroid = RNSound.IsAndroid;

//   useEffect(() => {
//     Sound.setCategory("Playback", true);
//     return () => {
//       if (sound1) sound1.release();
//       if (sound2) sound2.release();
//       if (sound3) sound3.release();
//     };
//   }, []);

//   const audioList = [
//     {
//       title: "test one",
//       isRequired: true,
//       url: require("../tracks/ASitarStory.mp3"),
//     },
//     {
//       title: "test two",
//       isRequired: true,
//       url: require("../tracks/BetterDays.mp3"),
//     },
//     {
//       title: "test three",
//       isRequired: true,
//       url: require("../tracks/SweetMath.mp3"),
//     },
//   ];

//   const playSound = (item, index) => {
//     if (index === 0) {
//       sound1 = new Sound(item.url, "", (error, _sound) => {
//         if (error) {
//           alert("error" + error.message);
//           return;
//         }
//         sound1.play(() => {
//           sound1.release();
//         });
//       });
//     } else if (index === 1) {
//       sound2 = new Sound(item.url, "", (error, _sound) => {
//         if (error) {
//           alert("error" + error.message);
//           return;
//         }
//         sound2.play(() => {
//           sound2.release();
//         });
//       });
//     } else if (index === 2) {
//       sound3 = new Sound(item.url, "", (error, _sound) => {
//         if (error) {
//           alert("error" + error.message);
//           return;
//         }
//         sound3.play(() => {
//           sound3.release();
//         });
//       });
//     }
//   };

//   const stopSound = (index) => {
//     if (index === 0 && sound1) {
//       sound1.stop(() => {
//         console.log("stopped");
//       });
//     } else if (index === 1 && sound2) {
//       sound2.stop(() => {
//         console.log("stopped");
//       });
//     } else if (index === 2 && sound3) {
//       sound3.stop(() => {
//         console.log("stopped");
//       });
//     }
//   };

//   const ItemView = (item, index) => (
//     <View style={styles.features} key={index}>
//       <Text style={styles.textStyle}>{item.title}</Text>
//       <TouchableOpacity>
//         <Text style={styles.buttonPlay}>Play</Text>
//       </TouchableOpacity>
//       <TouchableOpacity>
//         <Text style={styles.buttonStop}>Stop</Text>
//       </TouchableOpacity>
//     </View>
//   );

//   return (
//     <SafeAreaView style={{ flex: 1 }}>
//       <View style={containerStyle}>
//         <Text style={styles.titleText}>Play Music</Text>
//         <ScrollView style={{ flex: 1 }}>{audioList.map(ItemView)}</ScrollView>
//       </View>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "white",
//     padding: 10,
//   },
//   titleText: {
//     fontSize: 22,
//     textAlign: "center",
//     fontWeight: "bold",
//   },
//   textStyle: {
//     flex: 1,
//     padding: 5,
//   },
//   buttonPlay: {
//     fontSize: 15,
//     color: "white",
//     backgroundColor: "black",
//     overflow: "hidden",
//     paddingHorizontal: 15,
//     paddingVertical: 7,
//   },
//   buttonStop: {
//     fontSize: 15,
//     color: "white",
//     backgroundColor: "black",
//     overflow: "hidden",
//     paddingHorizontal: 15,
//     paddingVertical: 7,
//   },
//   features: {
//     flexDirection: "row",
//     padding: 5,
//     marginTop: 7,
//     alignSelf: "stretch",
//     alignItems: "center",
//     borderTopWidth: 1,
//   },
//   androidContainer: {
//     flex: 1,
//     backgroundColor: "lightgrey",
//   },
// });

// export default MusicTester2;








import { useEffect, useState } from 'react';
import { View, StyleSheet, Button } from 'react-native';
import { Audio } from 'expo-av';

export default function App() {
  const [sound, setSound] = useState(null);
  const [currentTrack, setCurrentTrack] = useState(null);

  async function togglePlaySound(trackId, source) {
    if (sound && currentTrack === trackId) {
      console.log('Stopping Sound');
      await sound.stopAsync();
      sound.unloadAsync(); // unload the sound to clean up resources
      setSound(null);
      setCurrentTrack(null);
    } else {
      if (sound && currentTrack !== trackId) {
        await sound.stopAsync();
        sound.unloadAsync(); // stop and unload any other playing sound
      }
      console.log('Loading Sound');
      const { sound: newSound } = await Audio.Sound.createAsync(source);
      setSound(newSound);
      setCurrentTrack(trackId);
      console.log('Playing Sound');
      await newSound.playAsync();
    }
  }

  useEffect(() => {
    return () => {
      sound?.unloadAsync(); // make sure to unload sound when component unmounts
    };
  }, [sound]);

  return (
    <View style={styles.container}>
      <Button title="Toggle BetterDays" onPress={() => togglePlaySound(1, require('../tracks/BetterDays.mp3'))} />
      <Button title="Toggle ASitarStory" onPress={() => togglePlaySound(2, require('../tracks/ASitarStory.mp3'))} />
      <Button title="Toggle TwoHearts" onPress={() => togglePlaySound(3, require('../tracks/TwoHearts.mp3'))} />
      <Button title="Toggle SweetMath" onPress={() => togglePlaySound(4, require('../tracks/SweetMath.mp3'))} />
      <Button title="Toggle Another ASitarStory" onPress={() => togglePlaySound(5, require('../tracks/ASitarStory.mp3'))} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 10,
    paddingBottom: 15
  },
});
