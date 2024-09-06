import React, { useState, useRef, useEffect,useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, FlatList, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { DarkModeContext } from "../../../components/DarkModeContext"; // Import the context

const ITEM_HEIGHT = 50;
const { width,height } = Dimensions.get('window');

export default function Level({ route, navigation }) {
  const {age, gender,weight, height, goal, medicalCondition } = route.params;
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
  const [selectedLevel, setSelectedLevel] = useState("Rookie");
  const flatListRef = useRef();

  const levels = [
    "True Beast",
    "Rookie",
    "Intermediate",
    "Advanced",
    "Beginner"
  ];

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={[item === selectedLevel ? styles.selectedItemText : styles.itemText,{color: isDarkMode ? "white" : "black"}]}>{item}</Text>
    </View>
  );

  useEffect(() => {
    scrollToSelectedPlace();
  }, []);

  const scrollToSelectedPlace = () => {
    const index = levels.findIndex(place => place === selectedLevel);
    if (flatListRef.current) {
      flatListRef.current.scrollToIndex({ index, animated: true });
    }
  };

  return (
    <SafeAreaView style={[styles.container,{ backgroundColor: isDarkMode ? "black" : "#fff" }]}>
       <View style={styles.circleLeft} />
        <View style={styles.circleLeft1} />
        <View style={styles.circleLeft2} />

        <View style={styles.circleRight} />

      <View style={styles.content}>
        <Text style={styles.headerText}>What’s your favorite place to exercise?</Text>
        <Text style={styles.subHeaderText}>This helps us create your personalized plan</Text>

        <View style={styles.pickerContainer}>
          <FlatList
            data={levels}
            ref={flatListRef}
            keyExtractor={(item) => item}
            renderItem={renderItem}
            style={styles.picker}
            contentContainerStyle={styles.pickerContent}
            snapToOffsets={[...Array(levels.length).keys()].map((i) => i * ITEM_HEIGHT)}
            snapToAlignment="center"
            decelerationRate="fast"
            showsVerticalScrollIndicator={false}
            onMomentumScrollEnd={(event) => {
              const index = Math.round(event.nativeEvent.contentOffset.y / ITEM_HEIGHT);
              setSelectedLevel(levels[index]);
            }}
            initialScrollIndex={levels.indexOf(selectedLevel)}
            getItemLayout={(data, index) => (
              { length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index }
            )}
            onScrollToIndexFailed={() => {}}
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
            style={styles.nextButton}
            onPress={() => {
              navigation.navigate('ConditionScreen', {userId,age, gender,weight, height, goal, physicalLevel: selectedLevel,username,bio,imageData });
            }}
          >
            <Text style={styles.nextButtonText}>Start</Text>
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
    color: '#087CEA',
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
    height: ITEM_HEIGHT * 5, // Show 5 items
    alignItems: 'center',
    justifyContent: 'center',
  },
  picker: {
    width: '100%',
  },
  pickerContent: {
    paddingVertical: ITEM_HEIGHT * 2, // Center the items
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
    fontSize: 36,
    color: '#000',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  selectedItemBorder: {
    position: 'absolute',
    top: (ITEM_HEIGHT * 2.5) - (ITEM_HEIGHT / 2.5), // Center the border
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