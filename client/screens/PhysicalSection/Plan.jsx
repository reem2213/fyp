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



import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, ScrollView, TouchableOpacity, ImageBackground } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Plan = ({ route }) => {
  const { prediction } = route.params;
  const [completedExercises, setCompletedExercises] = useState({});

  // Load completed exercises from AsyncStorage when the component mounts
  useEffect(() => {
    const loadCompletedExercises = async () => {
      try {
        const savedData = await AsyncStorage.getItem('completedExercises');
        if (savedData) {
          setCompletedExercises(JSON.parse(savedData));
        }
      } catch (error) {
        console.error('Failed to load completed exercises', error);
      }
    };
    loadCompletedExercises();
  }, []);

  // Save completed exercises to AsyncStorage whenever it changes
  useEffect(() => {
    const saveCompletedExercises = async () => {
      try {
        await AsyncStorage.setItem('completedExercises', JSON.stringify(completedExercises));
      } catch (error) {
        console.error('Failed to save completed exercises', error);
      }
    };
    saveCompletedExercises();
  }, [completedExercises]);

  // Toggle completion state of an exercise
  const toggleCompletion = (exerciseId) => {
    setCompletedExercises((prev) => ({
      ...prev,
      [exerciseId]: !prev[exerciseId],
    }));
  };

  // Define workout plan sections based on the prediction
  let planSections = [];

  if (prediction === "6") {
    planSections = [
      {
        day: 'Day 1: Full Body Circuit',
        exercises: [
          { id: '1-1', title: 'Bodyweight Squats', description: '15 reps', level: 'Beginner' },
          { id: '1-2', title: 'Push-Ups', description: '10 reps', level: 'Beginner' },
          { id: '1-3', title: 'Glute Bridges', description: '15 reps', level: 'Beginner' },
          { id: '1-4', title: 'Bent-Over Rows', description: '15 reps', level: 'Intermediate' },
          { id: '1-5', title: 'Plank', description: '20 seconds', level: 'Beginner' },
        ],
      },
      {
        day: 'Day 2: Lower Body Focus',
        exercises: [
          { id: '2-1', title: 'Lunges', description: '12 reps each leg', level: 'Intermediate' },
          { id: '2-2', title: 'Wall Sit', description: '30 seconds', level: 'Beginner' },
          { id: '2-3', title: 'Side Leg Raises', description: '15 reps each side', level: 'Beginner' },
          { id: '2-4', title: 'Calf Raises', description: '20 reps', level: 'Beginner' },
          { id: '2-5', title: 'Glute Bridges', description: '20 reps', level: 'Beginner' },
        ],
      },
      // Add other days similarly...
    ];
  } else if (prediction === "4") {
    planSections = [
      {
        day: 'Day 1: Upper Body Strength',
        exercises: [
          { id: '4-1', title: 'Push-Ups', description: '3 sets of 20-25 reps', level: 'Intermediate' },
          { id: '4-2', title: 'Pull-Ups', description: '3 sets to failure', level: 'Advanced' },
          { id: '4-3', title: 'Dumbbell Bench Press', description: '3 sets of 10-12 reps', level: 'Intermediate' },
          { id: '4-4', title: 'Bent-Over Rows', description: '3 sets of 12-15 reps', level: 'Intermediate' },
          { id: '4-5', title: 'Dumbbell Shoulder Press', description: '3 sets of 10-12 reps', level: 'Intermediate' },
        ],
      },
      {
        day: 'Day 2: Lower Body Strength',
        exercises: [
          { id: '5-1', title: 'Squats', description: '4 sets of 15-20 reps', level: 'Intermediate' },
          { id: '5-2', title: 'Lunges', description: '3 sets of 12 reps per leg', level: 'Intermediate' },
          { id: '5-3', title: 'Bulgarian Split Squats', description: '3 sets of 12 reps per leg', level: 'Advanced' },
          { id: '5-4', title: 'Deadlifts', description: '4 sets of 10-12 reps', level: 'Advanced' },
          { id: '5-5', title: 'Calf Raises', description: '4 sets of 20 reps', level: 'Beginner' },
        ],
      },
      // Add other days similarly...
    ];
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <ImageBackground
          source={require('../../assets/bgChatBot.png')} // Replace with your background image path
          style={styles.headerBackground}
          imageStyle={styles.headerImage}
        >
          <View style={styles.headerContent}>
            <Text style={styles.headerTitle}>Full Body Workout</Text>
            <Text style={styles.headerSubtitle}>30 Days | Intermediate</Text>
            <View style={styles.daysLeftContainer}>
              <Text style={styles.daysLeftText}>30</Text>
              <Text style={styles.daysLeftLabel}>Days Left</Text>
            </View>
          </View>
        </ImageBackground>
      </View>

      {planSections.length === 0 ? (
        <Text style={styles.noPlanText}>No workout plan available for this prediction.</Text>
      ) : (
        planSections.map((section, index) => (
          <View key={index} style={styles.dayContainer}>
            <Text style={styles.dayTitle}>{section.day}</Text>
            {section.exercises.map((exercise) => (
              <View key={exercise.id} style={styles.exerciseContainer}>
                <View style={styles.exerciseDetails}>
                  <Text style={styles.exerciseTitle}>{exercise.title}</Text>
                  <Text style={styles.exerciseDescription}>{exercise.description}</Text>
                  <Text style={styles.exerciseLevel}>{exercise.level}</Text>
                </View>
                <TouchableOpacity onPress={() => toggleCompletion(exercise.id)}>
                  <Ionicons
                    name={completedExercises[exercise.id] ? "checkmark-circle" : "checkmark-circle-outline"}
                    size={24}
                    color={completedExercises[exercise.id] ? "green" : "grey"}
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
    backgroundColor: '#fff',
  },
  headerContainer: {
    height: 250,
  },
  headerBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerImage: {
    borderRadius: 20,
  },
  headerContent: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 20,
    borderRadius: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#fff',
    marginTop: 5,
  },
  daysLeftContainer: {
    marginTop: 20,
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 50,
    padding: 10,
    width: 80,
  },
  daysLeftText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#083EA7',
  },
  daysLeftLabel: {
    fontSize: 12,
    color: '#333',
  },
  dayContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  dayTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  exerciseContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
  },
  exerciseDetails: {
    maxWidth: '80%',
  },
  exerciseTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  exerciseDescription: {
    fontSize: 14,
    color: '#888',
  },
  exerciseLevel: {
    fontSize: 14,
    color: '#888',
  },
});

export default Plan;
