// import React from 'react';
// import { Text, View, StyleSheet, ScrollView, ImageBackground } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';

// const Plan = ({ route }) => {
//   const { prediction } = route.params;

//   let planSections = [];

//   if (prediction === 1) {
//     planSections = [
//       {
//         day: 'Day 1: Full Body Circuit',
//         exercises: [
//           { title: 'Bodyweight Squats', description: '15 reps', level: 'Beginner' },
//           { title: 'Push-Ups', description: '10 reps', level: 'Beginner' },
//           { title: 'Glute Bridges', description: '15 reps', level: 'Beginner' },
//           { title: 'Bent-Over Rows', description: '15 reps', level: 'Intermediate' },
//           { title: 'Plank', description: '20 seconds', level: 'Beginner' },
//         ],
//       },
//       {
//         day: 'Day 2: Lower Body Focus',
//         exercises: [
//           { title: 'Lunges', description: '12 reps each leg', level: 'Intermediate' },
//           { title: 'Wall Sit', description: '30 seconds', level: 'Beginner' },
//           { title: 'Side Leg Raises', description: '15 reps each side', level: 'Beginner' },
//           { title: 'Calf Raises', description: '20 reps', level: 'Beginner' },
//           { title: 'Glute Bridges', description: '20 reps', level: 'Beginner' },
//         ],
//       },
//       // Add other days similarly...
//     ];
//   } else if (prediction === 4) {
//     planSections = [
//       {
//         day: 'Day 1: Upper Body Strength',
//         exercises: [
//           { title: 'Push-Ups', description: '3 sets of 20-25 reps', level: 'Intermediate' },
//           { title: 'Pull-Ups', description: '3 sets to failure', level: 'Advanced' },
//           { title: 'Dumbbell Bench Press', description: '3 sets of 10-12 reps', level: 'Intermediate' },
//           { title: 'Bent-Over Rows', description: '3 sets of 12-15 reps', level: 'Intermediate' },
//           { title: 'Dumbbell Shoulder Press', description: '3 sets of 10-12 reps', level: 'Intermediate' },
//         ],
//       },
//       {
//         day: 'Day 2: Lower Body Strength',
//         exercises: [
//           { title: 'Squats', description: '4 sets of 15-20 reps', level: 'Intermediate' },
//           { title: 'Lunges', description: '3 sets of 12 reps per leg', level: 'Intermediate' },
//           { title: 'Bulgarian Split Squats', description: '3 sets of 12 reps per leg', level: 'Advanced' },
//           { title: 'Deadlifts', description: '4 sets of 10-12 reps', level: 'Advanced' },
//           { title: 'Calf Raises', description: '4 sets of 20 reps', level: 'Beginner' },
//         ],
//       },
//       // Add other days similarly...
//     ];
//   }

//   return (
//     <ScrollView style={styles.container}>
//       <View style={styles.headerContainer}>
//         <ImageBackground
//           source={require('../../assets/bgChatBot.png')} // Replace with your background image path
//           style={styles.headerBackground}
//           imageStyle={styles.headerImage}
//         >
//           <View style={styles.headerContent}>
//             <Text style={styles.headerTitle}>Full Body Workout</Text>
//             <Text style={styles.headerSubtitle}>30 Days | Intermediate</Text>
//             <View style={styles.daysLeftContainer}>
//               <Text style={styles.daysLeftText}>30</Text>
//               <Text style={styles.daysLeftLabel}>Days Left</Text>
//             </View>
//           </View>
//         </ImageBackground>
//       </View>

//       {planSections.map((section, index) => (
//         <View key={index} style={styles.dayContainer}>
//           <Text style={styles.dayTitle}>{section.day}</Text>
//           {section.exercises.map((exercise, idx) => (
//             <View key={idx} style={styles.exerciseContainer}>
//               <View style={styles.exerciseDetails}>
//                 <Text style={styles.exerciseTitle}>{exercise.title}</Text>
//                 <Text style={styles.exerciseDescription}>{exercise.description}</Text>
//                 <Text style={styles.exerciseLevel}>{exercise.level}</Text>
//               </View>
//               <Ionicons name="checkmark-circle" size={24} color="green" />
//             </View>
//           ))}
//         </View>
//       ))}
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   headerContainer: {
//     height: 250,
//   },
//   headerBackground: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   headerImage: {
//     borderRadius: 20,
//   },
//   headerContent: {
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//     padding: 20,
//     borderRadius: 20,
//   },
//   headerTitle: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#fff',
//   },
//   headerSubtitle: {
//     fontSize: 16,
//     color: '#fff',
//     marginTop: 5,
//   },
//   daysLeftContainer: {
//     marginTop: 20,
//     alignItems: 'center',
//     backgroundColor: '#fff',
//     borderRadius: 50,
//     padding: 10,
//     width: 80,
//   },
//   daysLeftText: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#083EA7',
//   },
//   daysLeftLabel: {
//     fontSize: 12,
//     color: '#333',
//   },
//   dayContainer: {
//     marginTop: 20,
//     paddingHorizontal: 20,
//   },
//   dayTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   exerciseContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingVertical: 10,
//     borderBottomColor: '#ddd',
//     borderBottomWidth: 1,
//   },
//   exerciseDetails: {
//     maxWidth: '80%',
//   },
//   exerciseTitle: {
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   exerciseDescription: {
//     fontSize: 14,
//     color: '#888',
//   },
//   exerciseLevel: {
//     fontSize: 14,
//     color: '#888',
//   },
// });

// export default Plan;

import React, { useState, useEffect, useContext } from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import { DarkModeContext } from "../../components/DarkModeContext";

const Plan = ({ route }) => {
  const { prediction } = route.params;
  const [completedExercises, setCompletedExercises] = useState({});
  const { isDarkMode } = useContext(DarkModeContext);

  useEffect(() => {
    const loadCompletedExercises = async () => {
      try {
        const savedData = await AsyncStorage.getItem("completedExercises");
        if (savedData) {
          setCompletedExercises(JSON.parse(savedData));
        }
      } catch (error) {
        console.error("Failed to load completed exercises", error);
      }
    };
    loadCompletedExercises();
  }, []);

  useEffect(() => {
    const saveCompletedExercises = async () => {
      try {
        await AsyncStorage.setItem(
          "completedExercises",
          JSON.stringify(completedExercises)
        );
      } catch (error) {
        console.error("Failed to save completed exercises", error);
      }
    };
    saveCompletedExercises();
  }, [completedExercises]);

  const toggleCompletion = (exerciseId) => {
    setCompletedExercises((prev) => ({
      ...prev,
      [exerciseId]: !prev[exerciseId],
    }));
  };

  let planSections = [];
  if (prediction === "1") {
    planSections = [
      {
        day: "Day 1: Chest and Triceps",
        exercises: [
          {
            id: "1-1",
            title: "Barbell Bench Press",
            description: "4 sets of 8-10 reps",
            level: "Intermediate",
          },
          {
            id: "1-2",
            title: "Incline Dumbbell Press",
            description: "4 sets of 8-10 reps",
            level: "Intermediate",
          },
          {
            id: "1-3",
            title: "Chest Dips",
            description: "3 sets to failure",
            level: "Intermediate",
          },
          {
            id: "1-4",
            title: "Tricep Pushdowns",
            description: "3 sets of 10-12 reps",
            level: "Intermediate",
          },
          {
            id: "1-5",
            title: "Overhead Dumbbell Tricep Extension",
            description: "3 sets of 10-12 reps",
            level: "Intermediate",
          },
        ],
      },
      {
        day: "Day 2: Back and Biceps",
        exercises: [
          {
            id: "2-1",
            title: "Deadlifts",
            description: "4 sets of 6-8 reps",
            level: "Intermediate",
          },
          {
            id: "2-2",
            title: "Lat Pulldowns",
            description: "4 sets of 8-10 reps",
            level: "Intermediate",
          },
          {
            id: "2-3",
            title: "Bent-Over Rows",
            description: "4 sets of 8-10 reps",
            level: "Intermediate",
          },
          {
            id: "2-4",
            title: "Barbell Curls",
            description: "3 sets of 10-12 reps",
            level: "Intermediate",
          },
          {
            id: "2-5",
            title: "Hammer Curls",
            description: "3 sets of 10-12 reps",
            level: "Intermediate",
          },
        ],
      },
      {
        day: "Day 3: Legs",
        exercises: [
          {
            id: "3-1",
            title: "Squats",
            description: "4 sets of 8-10 reps",
            level: "Intermediate",
          },
          {
            id: "3-2",
            title: "Leg Press",
            description: "4 sets of 10-12 reps",
            level: "Intermediate",
          },
          {
            id: "3-3",
            title: "Romanian Deadlifts",
            description: "4 sets of 8-10 reps",
            level: "Intermediate",
          },
          {
            id: "3-4",
            title: "Leg Curls",
            description: "3 sets of 10-12 reps",
            level: "Intermediate",
          },
          {
            id: "3-5",
            title: "Standing Calf Raises",
            description: "4 sets of 15-20 reps",
            level: "Intermediate",
          },
        ],
      },
      {
        day: "Day 4: Shoulders",
        exercises: [
          {
            id: "4-1",
            title: "Overhead Barbell Press",
            description: "4 sets of 8-10 reps",
            level: "Intermediate",
          },
          {
            id: "4-2",
            title: "Dumbbell Lateral Raises",
            description: "4 sets of 10-12 reps",
            level: "Intermediate",
          },
          {
            id: "4-3",
            title: "Face Pulls",
            description: "3 sets of 10-12 reps",
            level: "Intermediate",
          },
          {
            id: "4-4",
            title: "Dumbbell Shrugs",
            description: "3 sets of 12-15 reps",
            level: "Intermediate",
          },
          {
            id: "4-5",
            title: "Cable Rear Delt Flys",
            description: "3 sets of 10-12 reps",
            level: "Intermediate",
          },
        ],
      },
      {
        day: "Day 5: Full Body Hypertrophy",
        exercises: [
          {
            id: "5-1",
            title: "Barbell Squat",
            description: "4 sets of 8-10 reps",
            level: "Intermediate",
          },
          {
            id: "5-2",
            title: "Bench Press",
            description: "4 sets of 8-10 reps",
            level: "Intermediate",
          },
          {
            id: "5-3",
            title: "Pull-Ups",
            description: "3 sets to failure",
            level: "Intermediate",
          },
          {
            id: "5-4",
            title: "Seated Row",
            description: "3 sets of 8-10 reps",
            level: "Intermediate",
          },
          {
            id: "5-5",
            title: "Dumbbell Curl to Press",
            description: "3 sets of 10-12 reps",
            level: "Intermediate",
          },
        ],
      },
    ];
  }
  else if (prediction === "2") {
    planSections = [
      {
        day: "Day 1: Upper Body Strength",
        exercises: [
          {
            id: "1-1",
            title: "Push-Ups (Modified if needed)",
            description: "3 sets of 12-15 reps",
            level: "Intermediate",
          },
          {
            id: "1-2",
            title: "Dumbbell Chest Press (on floor or bench)",
            description: "4 sets of 10-12 reps",
            level: "Intermediate",
          },
          {
            id: "1-3",
            title: "Dumbbell Rows",
            description: "4 sets of 10-12 reps per side",
            level: "Intermediate",
          },
          {
            id: "1-4",
            title: "Dumbbell Shoulder Press",
            description: "3 sets of 10-12 reps",
            level: "Intermediate",
          },
          {
            id: "1-5",
            title: "Dumbbell Bicep Curls",
            description: "3 sets of 12-15 reps",
            level: "Intermediate",
          },
        ],
      },
      {
        day: "Day 2: Lower Body Strength",
        exercises: [
          {
            id: "2-1",
            title: "Goblet Squats",
            description: "4 sets of 12-15 reps",
            level: "Intermediate",
          },
          {
            id: "2-2",
            title: "Lunges (Bodyweight or Dumbbells)",
            description: "3 sets of 10 reps per leg",
            level: "Intermediate",
          },
          {
            id: "2-3",
            title: "Glute Bridges",
            description: "4 sets of 15-20 reps",
            level: "Intermediate",
          },
          {
            id: "2-4",
            title: "Step-Ups (with Dumbbells if possible)",
            description: "3 sets of 12 reps per leg",
            level: "Intermediate",
          },
          {
            id: "2-5",
            title: "Calf Raises",
            description: "4 sets of 15-20 reps",
            level: "Intermediate",
          },
        ],
      },
      {
        day: "Day 3: Core and Full Body",
        exercises: [
          {
            id: "3-1",
            title: "Plank",
            description: "3 sets of 45 seconds hold",
            level: "Intermediate",
          },
          {
            id: "3-2",
            title: "Russian Twists (with weight if possible)",
            description: "3 sets of 20 reps per side",
            level: "Intermediate",
          },
          {
            id: "3-3",
            title: "Mountain Climbers",
            description: "3 sets of 30 seconds",
            level: "Intermediate",
          },
          {
            id: "3-4",
            title: "Dumbbell Thrusters (Squat to Press)",
            description: "3 sets of 12 reps",
            level: "Intermediate",
          },
          {
            id: "3-5",
            title: "Bicycle Crunches",
            description: "3 sets of 20 reps per side",
            level: "Intermediate",
          },
        ],
      },
      {
        day: "Day 4: Upper Body and Core",
        exercises: [
          {
            id: "4-1",
            title: "Dumbbell Bench Press (Floor Press if needed)",
            description: "4 sets of 10-12 reps",
            level: "Intermediate",
          },
          {
            id: "4-2",
            title: "Bent-Over Dumbbell Rows",
            description: "4 sets of 10-12 reps",
            level: "Intermediate",
          },
          {
            id: "4-3",
            title: "Dumbbell Shoulder Lateral Raises",
            description: "3 sets of 12-15 reps",
            level: "Intermediate",
          },
          {
            id: "4-4",
            title: "Side Plank",
            description: "3 sets of 30 seconds per side",
            level: "Intermediate",
          },
          {
            id: "4-5",
            title: "Dumbbell Tricep Kickbacks",
            description: "3 sets of 12-15 reps",
            level: "Intermediate",
          },
        ],
      },
      {
        day: "Day 5: Full Body Strength",
        exercises: [
          {
            id: "5-1",
            title: "Goblet Squats",
            description: "4 sets of 12-15 reps",
            level: "Intermediate",
          },
          {
            id: "5-2",
            title: "Push-Ups",
            description: "3 sets of 15-20 reps",
            level: "Intermediate",
          },
          {
            id: "5-3",
            title: "Dumbbell Deadlifts",
            description: "4 sets of 10-12 reps",
            level: "Intermediate",
          },
          {
            id: "5-4",
            title: "Burpees (Modified if needed)",
            description: "3 sets of 12 reps",
            level: "Intermediate",
          },
          {
            id: "5-5",
            title: "Jumping Jacks",
            description: "3 sets of 30 seconds",
            level: "Beginner/Intermediate",
          },
        ],
      },
    ];
    
  } else if (prediction === "4") {
     planSections = [
      {
        day: "Day 1: Full Body Strength and Cardio",
        exercises: [
          {
            id: "1-1",
            title: "Burpees",
            description: "4 sets of 15-20 reps",
            level: "Advanced",
          },
          {
            id: "1-2",
            title: "Push-Ups",
            description: "4 sets of 20-25 reps",
            level: "Advanced",
          },
          {
            id: "1-3",
            title: "Bodyweight Squats",
            description: "4 sets of 25 reps",
            level: "Advanced",
          },
          {
            id: "1-4",
            title: "Mountain Climbers",
            description: "4 sets of 30 seconds",
            level: "Advanced",
          },
          {
            id: "1-5",
            title: "Jumping Jacks",
            description: "3 sets of 1 minute",
            level: "Intermediate",
          },
        ],
      },
      {
        day: "Day 2: Upper Body Strength",
        exercises: [
          {
            id: "2-1",
            title: "Push-Ups (Variations: Incline or Decline)",
            description: "4 sets of 20 reps",
            level: "Advanced",
          },
          {
            id: "2-2",
            title: "Dumbbell Rows",
            description: "4 sets of 12-15 reps per side",
            level: "Intermediate",
          },
          {
            id: "2-3",
            title: "Dumbbell Shoulder Press",
            description: "4 sets of 10-12 reps",
            level: "Intermediate",
          },
          {
            id: "2-4",
            title: "Dumbbell Bicep Curls",
            description: "3 sets of 15 reps",
            level: "Intermediate",
          },
          {
            id: "2-5",
            title: "Tricep Dips (Chair or Bench)",
            description: "4 sets of 12-15 reps",
            level: "Intermediate",
          },
        ],
      },
      {
        day: "Day 3: Lower Body and Core",
        exercises: [
          {
            id: "3-1",
            title: "Lunges",
            description: "4 sets of 15 reps per leg",
            level: "Advanced",
          },
          {
            id: "3-2",
            title: "Jump Squats",
            description: "3 sets of 15 reps",
            level: "Advanced",
          },
          {
            id: "3-3",
            title: "Plank",
            description: "4 sets of 1 minute",
            level: "Advanced",
          },
          {
            id: "3-4",
            title: "Russian Twists",
            description: "3 sets of 20 reps per side",
            level: "Advanced",
          },
          {
            id: "3-5",
            title: "Leg Raises",
            description: "3 sets of 15 reps",
            level: "Intermediate",
          },
        ],
      },
      {
        day: "Day 4: Cardio and Core",
        exercises: [
          {
            id: "4-1",
            title: "Jump Rope",
            description: "4 sets of 1 minute",
            level: "Advanced",
          },
          {
            id: "4-2",
            title: "Mountain Climbers",
            description: "4 sets of 30 seconds",
            level: "Advanced",
          },
          {
            id: "4-3",
            title: "Plank with Shoulder Taps",
            description: "4 sets of 20 reps",
            level: "Advanced",
          },
          {
            id: "4-4",
            title: "Bicycle Crunches",
            description: "4 sets of 25 reps per side",
            level: "Advanced",
          },
          {
            id: "4-5",
            title: "High Knees",
            description: "3 sets of 1 minute",
            level: "Intermediate",
          },
        ],
      },
      {
        day: "Day 5: Full Body High-Intensity Workout",
        exercises: [
          {
            id: "5-1",
            title: "Burpees",
            description: "5 sets of 15 reps",
            level: "Advanced",
          },
          {
            id: "5-2",
            title: "Push-Ups",
            description: "4 sets of 25 reps",
            level: "Advanced",
          },
          {
            id: "5-3",
            title: "Jump Squats",
            description: "4 sets of 15 reps",
            level: "Advanced",
          },
          {
            id: "5-4",
            title: "Dumbbell Thrusters (Squat to Press)",
            description: "4 sets of 12 reps",
            level: "Intermediate",
          },
          {
            id: "5-5",
            title: "Jumping Jacks",
            description: "4 sets of 1 minute",
            level: "Intermediate",
          },
        ],
      },
    ];
  }
  else if (prediction === "5") {
    planSections = [
      {
        day: "Day 1: Upper Body Strength",
        exercises: [
          {
            id: "1-1",
            title: "Push-Ups",
            description: "3 sets of 15-20 reps",
            level: "Intermediate",
          },
          {
            id: "1-2",
            title: "Pull-Ups",
            description: "3 sets to failure",
            level: "Advanced",
          },
          {
            id: "1-3",
            title: "Dumbbell Bench Press",
            description: "3 sets of 10-12 reps",
            level: "Intermediate",
          },
          {
            id: "1-4",
            title: "Bent-Over Rows",
            description: "3 sets of 12-15 reps",
            level: "Intermediate",
          },
          {
            id: "1-5",
            title: "Dumbbell Shoulder Press",
            description: "3 sets of 10-12 reps",
            level: "Intermediate",
          },
        ],
      },
      {
        day: "Day 2: Lower Body Strength",
        exercises: [
          {
            id: "2-1",
            title: "Squats",
            description: "4 sets of 12-15 reps",
            level: "Intermediate",
          },
          {
            id: "2-2",
            title: "Lunges",
            description: "3 sets of 12-15 reps per leg",
            level: "Intermediate",
          },
          {
            id: "2-3",
            title: "Romanian Deadlifts",
            description: "3 sets of 10-12 reps",
            level: "Intermediate",
          },
          {
            id: "2-4",
            title: "Calf Raises",
            description: "3 sets of 20 reps",
            level: "Beginner",
          },
        ],
      },
      {
        day: "Day 3: Core Strength",
        exercises: [
          {
            id: "3-1",
            title: "Plank",
            description: "3 sets of 60 seconds",
            level: "Intermediate",
          },
          {
            id: "3-2",
            title: "Russian Twists",
            description: "3 sets of 20 reps per side",
            level: "Intermediate",
          },
          {
            id: "3-3",
            title: "Bicycle Crunches",
            description: "3 sets of 20-25 reps",
            level: "Intermediate",
          },
          {
            id: "3-4",
            title: "Leg Raises",
            description: "3 sets of 15-20 reps",
            level: "Intermediate",
          },
        ],
      },
      {
        day: "Day 4: Upper Body Strength (Push)",
        exercises: [
          {
            id: "4-1",
            title: "Push-Ups",
            description: "4 sets of 20-25 reps",
            level: "Intermediate",
          },
          {
            id: "4-2",
            title: "Dumbbell Shoulder Press",
            description: "3 sets of 10-12 reps",
            level: "Intermediate",
          },
          {
            id: "4-3",
            title: "Dips",
            description: "3 sets to failure",
            level: "Advanced",
          },
          {
            id: "4-4",
            title: "Chest Flys",
            description: "3 sets of 12-15 reps",
            level: "Intermediate",
          },
        ],
      },
      {
        day: "Day 5: Full Body Strength",
        exercises: [
          {
            id: "5-1",
            title: "Burpees",
            description: "3 sets of 15-20 reps",
            level: "Intermediate",
          },
          {
            id: "5-2",
            title: "Deadlifts",
            description: "3 sets of 10-12 reps",
            level: "Intermediate",
          },
          {
            id: "5-3",
            title: "Goblet Squats",
            description: "3 sets of 12-15 reps",
            level: "Intermediate",
          },
          {
            id: "5-4",
            title: "Mountain Climbers",
            description: "3 sets of 30 seconds",
            level: "Beginner",
          },
        ],
      },
    ];
 }
 else if (prediction === "6") {
  planSections = [
    {
      day: "Day 1: Upper Body Strength",
      exercises: [
        {
          id: "1-1",
          title: "Push-Ups",
          description: "4 sets of 20-25 reps",
          level: "Advanced",
        },
        {
          id: "1-2",
          title: "Dumbbell Floor Press",
          description: "4 sets of 10-12 reps",
          level: "Advanced",
        },
        {
          id: "1-3",
          title: "Renegade Rows",
          description: "4 sets of 10 reps per side",
          level: "Advanced",
        },
        {
          id: "1-4",
          title: "Dumbbell Shoulder Press",
          description: "3 sets of 10-12 reps",
          level: "Intermediate",
        },
        {
          id: "1-5",
          title: "Plank to Push-Up",
          description: "3 sets of 15 reps",
          level: "Advanced",
        },
      ],
    },
    {
      day: "Day 2: Lower Body Strength",
      exercises: [
        {
          id: "2-1",
          title: "Goblet Squats",
          description: "4 sets of 12-15 reps",
          level: "Intermediate",
        },
        {
          id: "2-2",
          title: "Single-Leg Deadlifts",
          description: "3 sets of 10 reps per leg",
          level: "Advanced",
        },
        {
          id: "2-3",
          title: "Bulgarian Split Squats",
          description: "4 sets of 12 reps per leg",
          level: "Advanced",
        },
        {
          id: "2-4",
          title: "Step-Ups (with Dumbbells)",
          description: "3 sets of 12-15 reps per leg",
          level: "Intermediate",
        },
        {
          id: "2-5",
          title: "Glute Bridge",
          description: "4 sets of 20 reps",
          level: "Intermediate",
        },
      ],
    },
    {
      day: "Day 3: Core and Full Body Strength",
      exercises: [
        {
          id: "3-1",
          title: "Plank",
          description: "4 sets of 1 minute hold",
          level: "Advanced",
        },
        {
          id: "3-2",
          title: "Russian Twists (with weight)",
          description: "3 sets of 20 reps per side",
          level: "Advanced",
        },
        {
          id: "3-3",
          title: "Bicycle Crunches",
          description: "3 sets of 25 reps per side",
          level: "Advanced",
        },
        {
          id: "3-4",
          title: "Mountain Climbers",
          description: "4 sets of 30 seconds",
          level: "Intermediate",
        },
        {
          id: "3-5",
          title: "Burpees",
          description: "3 sets of 15 reps",
          level: "Advanced",
        },
      ],
    },
    {
      day: "Day 4: Upper Body and Core",
      exercises: [
        {
          id: "4-1",
          title: "Dumbbell Rows",
          description: "4 sets of 10 reps per side",
          level: "Advanced",
        },
        {
          id: "4-2",
          title: "Push-Up Variations (elevated or clap)",
          description: "4 sets of 20 reps",
          level: "Advanced",
        },
        {
          id: "4-3",
          title: "Overhead Dumbbell Tricep Extension",
          description: "3 sets of 12 reps",
          level: "Intermediate",
        },
        {
          id: "4-4",
          title: "Side Plank",
          description: "3 sets of 45 seconds per side",
          level: "Advanced",
        },
        {
          id: "4-5",
          title: "Dumbbell Bicep Curls",
          description: "3 sets of 12 reps",
          level: "Intermediate",
        },
      ],
    },
    {
      day: "Day 5: Full Body Strength and Conditioning",
      exercises: [
        {
          id: "5-1",
          title: "Dumbbell Thrusters",
          description: "4 sets of 12 reps",
          level: "Advanced",
        },
        {
          id: "5-2",
          title: "Jump Squats",
          description: "3 sets of 15 reps",
          level: "Advanced",
        },
        {
          id: "5-3",
          title: "Kettlebell Swings (if available)",
          description: "4 sets of 15 reps",
          level: "Intermediate",
        },
        {
          id: "5-4",
          title: "High Knees",
          description: "3 sets of 30 seconds",
          level: "Intermediate",
        },
        {
          id: "5-5",
          title: "Burpees",
          description: "3 sets of 15 reps",
          level: "Advanced",
        },
      ],
    },
  ];
}

  return (
    <ScrollView
      style={[
        styles.container,
        { backgroundColor: isDarkMode ? "#1a1a1a" : "#f5f5f5" },
      ]}
    >
      <View style={styles.headerContainer}>
        <ImageBackground
          source={require("../../assets/gymBg.jpg")}
          style={styles.headerBackground}
          imageStyle={styles.headerImage}
        >
          <LinearGradient
            colors={["rgba(3, 43, 121, 0.8)", "rgba(113, 154, 234, 0.8)"]}
            style={styles.headerOverlay}
          >
            <Text style={styles.headerTitle}>Full Body Workout</Text>
            <Text style={styles.headerSubtitle}>30 Days | Intermediate</Text>
            <View style={styles.daysLeftContainer}>
              <Text style={styles.daysLeftText}>30</Text>
              <Text style={styles.daysLeftLabel}>Days Left</Text>
            </View>
          </LinearGradient>
        </ImageBackground>
      </View>

      {planSections.length === 0 ? (
        <Text
          style={[
            styles.noPlanText,
            { color: isDarkMode ? "#fff" : "#333" },
          ]}
        >
          No workout plan available for this prediction.
        </Text>
      ) : (
        planSections.map((section, index) => (
          <View key={index} style={styles.dayContainer}>
            <Text
              style={[
                styles.dayTitle,
                { color: isDarkMode ? "#fff" : "#032B79" },
              ]}
            >
              {section.day}
            </Text>
            {section.exercises.map((exercise) => (
              <View key={exercise.id} style={styles.exerciseContainer}>
                <View style={styles.exerciseDetails}>
                  <Text
                    style={[
                      styles.exerciseTitle,
                      { color: isDarkMode ? "#fff" : "#032B79" },
                    ]}
                  >
                    {exercise.title}
                  </Text>
                  <Text
                    style={[
                      styles.exerciseDescription,
                      { color: isDarkMode ? "#ccc" : "#555" },
                    ]}
                  >
                    {exercise.description}
                  </Text>
                  <Text
                    style={[
                      styles.exerciseLevel,
                      { color: isDarkMode ? "#bbb" : "#719AEA" },
                    ]}
                  >
                    {exercise.level}
                  </Text>
                </View>
                <TouchableOpacity onPress={() => toggleCompletion(exercise.id)}>
                  <Ionicons
                    name={
                      completedExercises[exercise.id]
                        ? "checkmark-circle"
                        : "ellipse-outline"
                    }
                    size={28}
                    color={
                      completedExercises[exercise.id]
                        ? "#719AEA"
                        : isDarkMode
                        ? "#555"
                        : "#ccc"
                    }
                  />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        ))
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    height: 300,
    marginBottom: 20,
  },
  headerBackground: {
    flex: 1,
  },
  headerImage: {
    resizeMode: "cover",
  },
  headerOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: "rgba(0,0,0,0)",
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginBottom: 10,
  },
  headerSubtitle: {
    fontSize: 18,
    color: "#fff",
    marginBottom: 20,
  },
  daysLeftContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  daysLeftText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#032B79",
    marginRight: 10,
  },
  daysLeftLabel: {
    fontSize: 16,
    color: "#032B79",
  },
  dayContainer: {
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  dayTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 15,
  },
  exerciseContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  exerciseDetails: {
    flex: 1,
    marginRight: 10,
  },
  exerciseTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  exerciseDescription: {
    fontSize: 16,
    marginBottom: 3,
  },
  exerciseLevel: {
    fontSize: 14,
    fontStyle: "italic",
  },
  

  
});

export default Plan;
