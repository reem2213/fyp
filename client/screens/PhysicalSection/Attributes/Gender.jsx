import React,{useState,useContext,useEffect} from 'react';
import { View, Text, TouchableOpacity,Dimensions, StyleSheet, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { DarkModeContext } from "../../../components/DarkModeContext"; // Import the context
const { width, height } = Dimensions.get('window');

export default function App({navigation,route}) {
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
  const [selectedGender, setSelectedGender] = useState(null);

  const handleGenderSelection = (gender) => {
    setSelectedGender(gender);
  };

  return (
    <SafeAreaView style={[styles.container,{ backgroundColor: isDarkMode ? "black" : "#fff" }]}>
     <View style={styles.circleLeft} />
        <View style={styles.circleLeft1} />
        <View style={styles.circleLeft2} />

        <View style={styles.circleRight} />
      <View style={styles.content}>
        <Text style={styles.headerText}>Tell us about yourself!</Text>
        <Text style={styles.subHeaderText}>To give you a better experience we need to know your gender</Text>
        
        <TouchableOpacity
          style={[
            styles.button,
            selectedGender === 'Male' ? styles.selectedButton : styles.deselectedButton,
          ]}
          onPress={() => handleGenderSelection('Male')}
        >
          <Ionicons name="male" size={50} color="white" />
          <Text style={styles.buttonText}>Male</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.button,
            selectedGender === 'Female' ? styles.selectedButton : styles.deselectedButton,
          ]}
          onPress={() => handleGenderSelection('Female')}
        >
          <Ionicons name="female" size={50} color="white" />
          <Text style={styles.buttonText}>Female</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.nextButton}
          onPress={() => {
            if (selectedGender) {
           
              navigation.navigate('AgeScreen', { userId,gender: selectedGender,username,bio,imageData });
            }
          }}
        >
          <Text style={styles.nextButtonText}>Next</Text>
          <Ionicons name="arrow-forward" size={20} color="white" />
        </TouchableOpacity>
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
    marginBottom: 40,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  button: {
    width: 120,
    height: 120,
    borderRadius: 75,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    marginTop: 0,
  },
  selectedButton: {
    backgroundColor: '#083EA7', // Dark blue color for selected state
  },
  deselectedButton: {
    backgroundColor: '#719AEA', // Light blue color for deselected state
  },
  nextButton: {
    flexDirection: 'row',
    backgroundColor: '#083EA7',
    paddingHorizontal: 40,
    paddingVertical: 20,
    borderRadius: 20,
    alignItems: 'center',
    marginTop: 20,
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