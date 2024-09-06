import React, { useState, useRef, useEffect ,useContext} from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, FlatList, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { DarkModeContext } from "../../../components/DarkModeContext"; // Import the context

const ITEM_HEIGHT = 60; // Adjust height of each item
const {width, height } = Dimensions.get('window');

export default function GoalSelectionScreen({ route, navigation }) {
  const { age, gender, weight, height: userHeight } = route.params;
  const { username,userId } = route.params;
  const [bio, setBio] = useState("");
  const [imageData, setImageData] = useState(null);
  const { isDarkMode } = useContext(DarkModeContext); // Use the context

  useEffect(() => {
    fetch(`http://10.0.0.21:3001/userr/${username}`)
      .then((response) => response.json())
      .then((data) => {
        setBio(data.bio);
        setImageData(data.image);

        console.log("donee");
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, [username]);
  const [selectedGoal, setSelectedGoal] = useState(); // Default goal selected
  const flatListRef = useRef();

  const goals = [
    "Weight Loss",
    "Strength",
    "Muscle Building",
   
   
  ];

  useEffect(() => {
    if (selectedGoal !== null) {
      scrollToSelectedGoal();
    }
  }, []);

  const scrollToSelectedGoal = () => {
    const index = goals.findIndex(goal => goal === selectedGoal);
    if (index >= 0 && flatListRef.current) {
      flatListRef.current.scrollToIndex({ index, animated: true });
    }
  };
  

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={[item === selectedGoal ? styles.selectedItemText : styles.itemText,{color: isDarkMode ? "white" : "black"}]}>
        {item}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={[styles.container,{ backgroundColor: isDarkMode ? "black" : "#fff" }]}>
       <View style={styles.circleLeft} />
        <View style={styles.circleLeft1} />
        <View style={styles.circleLeft2} />

        <View style={styles.circleRight} />
      <View style={styles.content}>
        <Text style={styles.headerText}>What’s your goal?</Text>
        <Text style={styles.subHeaderText}>This helps us create your personalized plan</Text>

        <View style={styles.pickerContainer}>
          {/* <FlatList
            data={goals}
            ref={flatListRef}
            keyExtractor={(item) => item}
            renderItem={renderItem}
            style={styles.picker}
            contentContainerStyle={styles.pickerContent}
            snapToOffsets={[...Array(goals.length).keys()].map((i) => i * ITEM_HEIGHT)}
            snapToAlignment="center"
            decelerationRate="fast"
            showsVerticalScrollIndicator={false}
            onMomentumScrollEnd={(event) => {
              const index = Math.round(event.nativeEvent.contentOffset.y / ITEM_HEIGHT);
              setSelectedGoal(goals[index]);
            }}
            initialScrollIndex={goals.findIndex(goal => goal === selectedGoal)}
            getItemLayout={(data, index) => (
              { length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index }
            )}
            onScrollToIndexFailed={(info) => {
              const wait = new Promise(resolve => setTimeout(resolve, 500));
              wait.then(() => {
                flatListRef.current.scrollToIndex({ index: info.index, animated: true });
              });
            }}
          /> */}
          <FlatList
  data={goals}
  ref={flatListRef}
  keyExtractor={(item) => item}
  renderItem={renderItem}
  style={styles.picker}
  contentContainerStyle={styles.pickerContent}
  snapToOffsets={[...Array(goals.length).keys()].map((i) => i * ITEM_HEIGHT)}
  snapToAlignment="center"
  decelerationRate="fast"
  showsVerticalScrollIndicator={false}
  onMomentumScrollEnd={(event) => {
    const index = Math.round(event.nativeEvent.contentOffset.y / ITEM_HEIGHT);
    setSelectedGoal(goals[index]);
  }}
  initialScrollIndex={Math.max(goals.findIndex(goal => goal === selectedGoal), 0)} // Ensure a valid index
  getItemLayout={(data, index) => (
    { length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index }
  )}
  onScrollToIndexFailed={(info) => {
    const wait = new Promise(resolve => setTimeout(resolve, 500));
    wait.then(() => {
      flatListRef.current.scrollToIndex({ index: info.index, animated: true });
    });
  }}
/>

          <View style={styles.selectedItemBorder} />
        </View>

        <View style={styles.navigationButtons}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={20} color="white" />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.nextButton, { opacity: selectedGoal ? 1 : 0.5 }]}
            onPress={() => {
              navigation.navigate('Level', { userId,age ,gender,weight, height: userHeight, goal: selectedGoal,username,bio,imageData });
            }}
            disabled={!selectedGoal}
          >
            <Text style={styles.nextButtonText}>Next</Text>
            <Ionicons name="arrow-forward" size={20} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#87CEEB',
    marginBottom: 10,
    textAlign: 'center',
  },
  subHeaderText: {
    fontSize: 14,
    color: '#888',
    marginBottom: 20,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  pickerContainer: {
    height: ITEM_HEIGHT * 3, // Show 3 items at a time
    alignItems: 'center',
    justifyContent: 'center',
  },
  picker: {
    width: '100%',
  },
  pickerContent: {
    paddingVertical: ITEM_HEIGHT, // Center the items
  },
  item: {
    height: ITEM_HEIGHT,
    justifyContent: 'center',
  },
  itemText: {
    fontSize: 24,
    color: '#888',
    textAlign: 'center',
  },
  selectedItemText: {
    fontSize: 24,
    color: '#000',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  selectedItemBorder: {
    position: 'absolute',
    top: ITEM_HEIGHT,
    left: 0,
    right: 0,
    height: ITEM_HEIGHT,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#083EA7',
  },
  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginTop: 20,
  },
  backButton: {
    flexDirection: 'row',
    backgroundColor: '#000000',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    alignItems: 'center',
  },
  nextButton: {
    flexDirection: 'row',
    backgroundColor: '#083EA7',
    paddingHorizontal: 40,
    paddingVertical: 10,
    borderRadius: 20,
    alignItems: 'center',
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 5,
  },
  circleLeft: {
    position: 'absolute',
    bottom: -width * 0.2,
    left: -width * 0.2,
    width: width * 0.4,
    height: width * 0.4,
    borderRadius: width * 0.2,
    backgroundColor: '#4A90E2',
  },
  circleLeft1: {
    position: 'absolute',
    left: -70,
    top:-60,
    width: width * 0.4,
    height: width * 0.4,
    borderRadius: width * 0.2,
    backgroundColor: '#4A90E2',
  },
  circleLeft2: {
    position: 'absolute',
    left: 330,
    top:-60,
    width: width * 0.4,
    height: width * 0.4,
    borderRadius: width * 0.2,
    backgroundColor: '#4A90E2',
  },
  circleRight: {
    position: 'absolute',
    bottom: -width * 0.2,
    right: -width * 0.2,
    width: width * 0.4,
    height: width * 0.4,
    borderRadius: width * 0.2,
    backgroundColor: '#4A90E2',
  },
});