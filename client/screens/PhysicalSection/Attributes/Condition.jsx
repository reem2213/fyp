import React,{useState,useContext,useEffect} from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions,SafeAreaView, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { DarkModeContext } from "../../../components/DarkModeContext"; // Import the context
const { width, height } = Dimensions.get('window');

export default function MedicalConditionScreen({ route, navigation }) {
  const {age, gender, height, weight, goal,physicalLevel } = route.params;
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
  const [selectedOption, setSelectedOption] = useState(null);
  const [medicalCondition, setMedicalCondition] = useState('No');

  return (
    <SafeAreaView style={[styles.container,{ backgroundColor: isDarkMode ? "black" : "#fff" }]}>
       <View style={styles.circleLeft} />
        <View style={styles.circleLeft1} />
        <View style={styles.circleLeft2} />

        <View style={styles.circleRight} />

      <View style={styles.content}>
        <Text style={styles.headerText}>Do you have any medical condition?</Text>
        <Text style={styles.subHeaderText}>This helps us create your personalized plan</Text>

        <View style={styles.optionsContainer}>
          <TouchableOpacity
            style={[styles.optionButton, selectedOption === 'Yes' && styles.selectedButton]}
            onPress={() => setSelectedOption('Yes')}
          >
            <Text style={styles.optionText}>Yes</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.optionButton, selectedOption === 'No' && styles.selectedButton]}
            onPress={() => setSelectedOption('No')}
          >
            <Text style={styles.optionText}>No</Text>
          </TouchableOpacity>
        </View>

        {selectedOption === 'Yes' && (
          <TextInput
            style={styles.textArea}
            placeholder="Enter if you have a medical condition..."
            multiline={true}
            numberOfLines={4}
            value={medicalCondition}
            onChangeText={setMedicalCondition}
          />
        )}

        <View style={styles.navigationButtons}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={20} color="white" />
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.nextButton,
              { opacity: (selectedOption === 'Yes' && !medicalCondition) ? 0.5 : 1 },
            ]}
            onPress={() => {
              if (selectedOption === 'No' || (selectedOption === 'Yes' && medicalCondition)) {
                navigation.navigate('PlaceScreen', {userId, age ,gender,weight, height, goal,physicalLevel, medicalCondition,username,bio,imageData });
              }
            }}
            disabled={selectedOption === 'Yes' && !medicalCondition}
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
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%',
    marginBottom: 20,
  },
  optionButton: {
    backgroundColor: '#719AEA',
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    height: 100,
  },
  selectedButton: {
    backgroundColor: '#083EA7',
  },
  optionText: {
    fontSize: 18,
    color: '#fff',
  },
  textArea: {
    height: 100,
    width: '80%',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    textAlignVertical: 'top',
    marginBottom: 20,
  },
  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
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