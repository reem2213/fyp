// import React, { useState, useEffect } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   Image,
//   Pressable,
//   ScrollView,
//   TouchableOpacity,
// } from "react-native";
// import { GestureHandlerRootView } from "react-native-gesture-handler";
// import ArrowBack from "../../../assets/arrowBack.png";

// import GoalSection from "../../../assets/quizSection.png";
// import MusicSection from "../../../assets/BooksSection.png";
// import EduBg from "../../../assets/EduBg.png";
// import LanguageSection from "../../../assets/languageSection.png";

// import PsychoImage from "../../../assets/psychoSection.png";

// const Home = ({ navigation }) => {
//   // const { username} = route.params;
//   // useEffect(() => {
//   //   if (route.params && route.params.username) {
//   //     setUsername(route.params.username);
//   //   }
//   // }, [route.params]);

//   const toNotifications = () => {
//     navigation.navigate("Home");
//   };
//   const GoToQuizSection = () => {
//     navigation.navigate("Quiz");
//   };

//   const GoToLibrarySection = () => {
//     navigation.navigate("Library");
//   };
//   const GoToLanguagesSection = () => {
//     navigation.navigate("Languages");
//   };

//   return (
//     <GestureHandlerRootView style={styles.container}>
//       <ScrollView showsVerticalScrollIndicator={false}>
//         <Pressable onPress={toNotifications}>
//           <Image style={styles.notiImage} source={ArrowBack} />
//         </Pressable>
//         <Image
//           style={[styles.ellipseIcon]}
//           contentFit="cover"
//           source={require("../../../assets/blueEllipse.png")}
//         />

//         <Text style={styles.welcome}>{`Learn & Grow`}</Text>
//         <Image source={EduBg} style={styles.image} />

//         <View style={styles.content}>
//           <TouchableOpacity onPress={GoToQuizSection}>
//             <View style={styles.section}>
//               <Text style={styles.sectionTitle}>Interactive Quizzes</Text>
//               <Text style={styles.sectionSubtitle}>
//                 Challenge your knowledge and expand your mind with interactive
//                 quizzes tailored to your interests and expertise
//               </Text>
//               <Image source={GoalSection} style={styles.sectionImage} />
//             </View>
//           </TouchableOpacity>

//           <TouchableOpacity onPress={GoToLibrarySection}>
//             <View style={styles.section2}>
//               <Text style={styles.sectionTitle2}>Our Library</Text>
//               <Text style={styles.sectionSubtitle}>
//                 Dive into a world of knowledge and inspiration with our vast
//                 library of books covering a wide range of topics and genres
//               </Text>
//               <Image source={MusicSection} style={styles.sectionImage} />
//             </View>
//           </TouchableOpacity>

//           <TouchableOpacity onPress={GoToLanguagesSection}>
//             <View style={styles.section3}>
//               <Text style={styles.sectionTitle}>Learn a new language</Text>
//               <Text style={styles.sectionSubtitle}>
//                 Embark on a linguistic journey and broaden your horizons by
//                 mastering new languages with our interactive learning tools and
//                 resources
//               </Text>
//               <Image source={LanguageSection} style={styles.sectionImage} />
//             </View>
//           </TouchableOpacity>
//         </View>
//       </ScrollView>
//     </GestureHandlerRootView>
//   );
// };

// export default Home;
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//   },
//   ellipseIcon: {
//     left: 320,
//     width: 150,
//     height: 150,
//     top: -15,
//   },
//   ellipseIcon2: {
//     top: 50,
//     left: -90,
//     width: 150,
//     height: 150,
//   },
//   notiImage: {
//     position: "absolute",
//     top: 60,
//     left: 20,
//     width: 30,
//     height: 30,
//   },
//   welcome: {
//     position: "absolute",
//     fontWeight: "bold",
//     top: 120,
//     left: 80,
//     color: "#1B436F",
//     fontSize: 35,
//     width: "90%",
//   },
//   content: {
//     paddingVertical: 20,
//     paddingHorizontal: 20,
//     marginTop: 0,
//   },

//   image: {
//     width: 350,
//     height: 350,
//     marginTop: -20,
//     marginLeft: 20,
//   },
//   section: {
//     marginBottom: 20,
//     width: "100%",
//     height: 150,
//     borderRadius: 30,
//     backgroundColor: "#FF6B00",
//     shadowOffset: {
//       width: 0,
//       height: 40,
//     },
//     shadowColor: "rgba(0, 0, 0, 1.5)",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   section2: {
//     marginBottom: 20,
//     width: "100%",
//     height: 150,
//     borderRadius: 30,
//     backgroundColor: "#B1CB14",
//     shadowOffset: {
//       width: 0,
//       height: 40,
//     },
//     shadowColor: "rgba(0, 0, 0, 1.5)",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   section3: {
//     marginBottom: 20,
//     width: "100%",
//     height: 150,
//     borderRadius: 30,
//     backgroundColor: "#F8EF14",
//     shadowOffset: {
//       width: 0,
//       height: 40,
//     },
//     shadowColor: "rgba(0, 0, 0, 1.5)",
//     justifyContent: "center",
//     alignItems: "center",
//   },

//   sectionTitle: {
//     color: "white",
//     fontWeight: "bold",
//     fontSize: 20,
//     marginBottom: 5,
//     marginLeft: -65,
//     top: 15,
//     width: "70%",
//   },
//   sectionTitle2: {
//     color: "white",
//     fontWeight: "bold",
//     fontSize: 25,
//     marginBottom: 5,
//     marginLeft: -200,
//     top: 15,
//   },
//   sectionSubtitle: {
//     color: "white",
//     fontWeight: "400",
//     fontSize: 12,
//     marginLeft: -100,
//     width: "60%",
//     top: 7,
//   },
//   sectionImage: {
//     width: "35%",
//     height: 120,
//     marginTop: -70,
//     marginLeft: 200,
//   },
// });

import React, { useContext,useEffect,useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import ArrowBack from "../../../assets/arrowBack.png";
import GoalSection from "../../../assets/quizSection.png";
import MusicSection from "../../../assets/BooksSection.png";
import EduBg from "../../../assets/EduBg.png";
import LanguageSection from "../../../assets/languageSection.png";
import { DarkModeContext } from "../../../components/DarkModeContext"; // Import the context
import { LineChart, BarChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
const screenWidth = Dimensions.get("window").width;
const SccreenTime = ({ screenTimeData }) => {
 
    const chartData = {
      labels: ["quiz", "library", "language"],
      datasets: [
        {
          data: [
            screenTimeData.quiz || 0,
            screenTimeData.library || 0,
            screenTimeData.language || 0,
          ],
        },
      ],
    };
  
    return (
      <BarChart
        data={chartData}
        width={screenWidth - 16}
        height={220}
        yAxisLabel=""
        yAxisSuffix=""
        yLabelsOffset={8}
        fromZero={true}
        chartConfig={{
          backgroundColor: "yellow",
          backgroundGradientFrom: "orange",
          backgroundGradientTo: "yellow",
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForBackgroundLines: {
            strokeDasharray: "", // Solid background lines
            strokeWidth: 1,
            stroke: "rgba(255, 255, 255, 0.2)",
          },
          formatYLabel: (yValue) => {
            const value = Number(yValue);
            if (!isNaN(value)) {
              return value > 60 
                ? `${(value / 60).toFixed(1)}min` // Convert to minutes if > 60 seconds
                : `${value}s`; // Otherwise, show in seconds
            }
            return '0s'; // Fallback for invalid values
          },
        }}
        verticalLabelRotation={0}
        style={{
          marginVertical: 8,
          borderRadius: 16,
          marginTop: 20,
          marginLeft: 10,
        }}
        yAxisInterval={1} // Set y-axis interval
        showBarTops={true}
        yAxisMinValue={0} // Force min y-axis value
        yAxisMaxValue={90} // Force max y-axis value
      />
    );
};

const Home = ({ navigation,route }) => {
  const {username,userId}=route.params
  const { isDarkMode } = useContext(DarkModeContext); // Use the context
  const [screenTimeData, setScreenTimeData] = useState({
    quiz: 0,
    library: 0,
    language: 0,
  });
  const [startTime, setStartTime] = useState(null);
  const [currentSection, setCurrentSection] = useState(null);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      if (startTime && currentSection) {
        const elapsedTime = Math.floor((Date.now() - startTime) / 1000); // Convert to seconds
        console.log(
          `Updating time for ${currentSection}: ${elapsedTime} seconds`
        );
        setScreenTimeData((prevData) => ({
          ...prevData,
          [currentSection]: prevData[currentSection] + elapsedTime,
        }));
        setStartTime(Date.now());
      }
    };

    const timer = setInterval(updateTime, 1000); // Update every second

    return () => clearInterval(timer);
  }, [startTime, currentSection]);

  const startTracking = (section) => {
    if (currentSection) {
      updateTime();
    }
    console.log(`Starting tracking for ${section}`);
    setCurrentSection(section);
    setStartTime(Date.now());
  };

  const stopTracking = () => {
    updateTime();
    console.log(`Stopping tracking for ${currentSection}`);
    setCurrentSection(null);
    setStartTime(null);
  };

  const updateTime = () => {
    if (startTime && currentSection) {
      const elapsedTime = Math.floor((Date.now() - startTime) / 1000); // Convert to seconds
      const elapsedMinutes = Math.floor(elapsedTime / 60); // Convert to minutes
      const remainingSeconds = elapsedTime % 60; // Remaining seconds
  
      console.log(`Updating time for ${currentSection}: ${elapsedMinutes}m ${remainingSeconds}s`);
  
      setScreenTimeData((prevData) => ({
        ...prevData,
        [currentSection]: prevData[currentSection] + elapsedMinutes + remainingSeconds / 60, // Add minutes and fraction of minutes
      }));
      setStartTime(Date.now());
    }
  };
  
  useEffect(() => {
    const unsubscribeFocus = navigation.addListener("focus", () => {
      setIsFocused(true);
      stopTracking(); // Stop tracking when Home gains focus
    });

    const unsubscribeBlur = navigation.addListener("blur", () => {
      setIsFocused(false);
    });

    return () => {
      unsubscribeFocus();
      unsubscribeBlur();
    };
  }, [navigation]);
  const toNotifications = () => {
    navigation.navigate("PsychologicalSection",{username,userId});
  };
  const GoToQuizSection = () => {
    navigation.navigate("Quiz",{username,userId});
    startTracking("quiz");

  };
  const GoToLibrarySection = () => {
    navigation.navigate("Library",{username,userId});
    startTracking("library");

  };
  const GoToLanguagesSection = () => {
    navigation.navigate("Languages",{username,userId});
    startTracking("language");

  };


  return (
    <GestureHandlerRootView style={[styles.container, { backgroundColor: isDarkMode ? "black" : "white" }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Pressable onPress={toNotifications}>
          <Image style={styles.notiImage} source={ArrowBack} />
        </Pressable>
        <Image
          style={[styles.ellipseIcon]}
          contentFit="cover"
          source={require("../../../assets/blueEllipse.png")}
        />

        <Text style={[styles.welcome, { color: isDarkMode ? "white" : "#1B436F" }]}>{`Learn & Grow`}</Text>
        <Image source={EduBg} style={styles.image} />
        <Text style={[styles.screenTime, { color: isDarkMode ? "white" : "#1B436F" }]}>{`Screen Time`}</Text>

        <SccreenTime screenTimeData={screenTimeData} />

        <View style={styles.content}>
          <TouchableOpacity onPress={GoToQuizSection}>
            <View style={[styles.section, { backgroundColor: isDarkMode ? "#FF6B00" : "#FF6B00" }]}>
              <Text style={styles.sectionTitle}>Interactive Quizzes</Text>
              <Text style={styles.sectionSubtitle}>
                Challenge your knowledge and expand your mind with interactive
                quizzes tailored to your interests and expertise
              </Text>
              <Image source={GoalSection} style={styles.sectionImage} />
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={GoToLibrarySection}>
            <View style={[styles.section2, { backgroundColor: isDarkMode ? "#B1CB14" : "#B1CB14" }]}>
              <Text style={styles.sectionTitle2}>Our Library</Text>
              <Text style={styles.sectionSubtitle}>
                Dive into a world of knowledge and inspiration with our vast
                library of books covering a wide range of topics and genres
              </Text>
              <Image source={MusicSection} style={styles.sectionImage} />
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={GoToLanguagesSection}>
            <View style={[styles.section3, { backgroundColor: isDarkMode ? "#F8EF14" : "#F8EF14" }]}>
              <Text style={styles.sectionTitle}>Learn a new language</Text>
              <Text style={styles.sectionSubtitle}>
                Embark on a linguistic journey and broaden your horizons by
                mastering new languages with our interactive learning tools and
                resources
              </Text>
              <Image source={LanguageSection} style={styles.sectionImage} />
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </GestureHandlerRootView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  ellipseIcon: {
    left: 320,
    width: 150,
    height: 150,
    top: -15,
  },
  ellipseIcon2: {
    top: 50,
    left: -90,
    width: 150,
    height: 150,
  },
  notiImage: {
    position: "absolute",
    top: 60,
    left: 20,
    width: 30,
    height: 30,
  },
  welcome: {
    position: "absolute",
    fontWeight: "bold",
    top: 120,
    left: 80,
    fontSize: 35,
    width: "90%",
  },
  screenTime:{
    position: "absolute",
    fontWeight: "bold",
    top: 450,
    left: 20,
    fontSize: 25,
    width: "90%",
  },
  content: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    marginTop: 0,
  },
  image: {
    width: 350,
    height: 350,
    marginTop: -20,
    marginLeft: 20,
  },
  section: {
    marginBottom: 20,
    width: "100%",
    height: 150,
    borderRadius: 30,
    shadowOffset: {
      width: 0,
      height: 40,
    },
    shadowColor: "rgba(0, 0, 0, 1.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  section2: {
    marginBottom: 20,
    width: "100%",
    height: 150,
    borderRadius: 30,
    shadowOffset: {
      width: 0,
      height: 40,
    },
    shadowColor: "rgba(0, 0, 0, 1.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  section3: {
    marginBottom: 20,
    width: "100%",
    height: 150,
    borderRadius: 30,
    shadowOffset: {
      width: 0,
      height: 40,
    },
    shadowColor: "rgba(0, 0, 0, 1.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  sectionTitle: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 5,
    marginLeft: -65,
    top: 15,
    width: "70%",
  },
  sectionTitle2: {
    color: "white",
    fontWeight: "bold",
    fontSize: 25,
    marginBottom: 5,
    marginLeft: -200,
    top: 15,
  },
  sectionSubtitle: {
    color: "white",
    fontWeight: "400",
    fontSize: 12,
    marginLeft: -100,
    width: "60%",
    top: 7,
  },
  sectionImage: {
    width: "35%",
    height: 120,
    marginTop: -70,
    marginLeft: 200,
  },
});


