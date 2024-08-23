import React,{useState,useContext,useEffect} from 'react';
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity } from 'react-native';
import Swiper from 'react-native-swiper';
import { useNavigation } from '@react-navigation/native';
import Book1 from '../../assets/Agatha2.jpg'
import { DarkModeContext } from "../../components/DarkModeContext"; // Import the context

const { width, height } = Dimensions.get('window');

const App = ({route}) => {
  const navigation = useNavigation();
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

  return (
    <Swiper loop={false} dotStyle={styles.dot} activeDotStyle={styles.activeDot}>
    
      <View style={[styles.container,{ backgroundColor: isDarkMode ? "black" : "#fff" },]}>
        <View style={styles.circleLeft} />
        <View style={styles.circleRight} />
        <Image
          source={Book1} // Adjust the path as needed
          style={styles.image}
        />
        <Text style={[styles.title,{color: isDarkMode ? "white" : "black" }]}>Sweat It Out!</Text>
        <Text style={styles.subtitle}>Find your way to the perfect body</Text>
        <Text style={styles.subtitle}>{userId}</Text>

      </View>

      <View style={[styles.container,{ backgroundColor: isDarkMode ? "black" : "#fff" },]}>
        <View style={styles.circleLeft} />
        <View style={styles.circleRight} />
        <Image
          source={Book1} // Adjust the path as needed
          style={styles.image}
        />
        <Text style={[styles.title,{color: isDarkMode ? "white" : "black" }]}>Track your Active Lifestyle</Text>
        <Text style={styles.subtitle}>Find your way to the perfect body</Text>
      </View>

      <View style={[styles.container,{ backgroundColor: isDarkMode ? "black" : "#fff" },]}>
        <View style={styles.circleLeft} />
        <View style={styles.circleRight} />
        <Image
          source={Book1} // Adjust the path as needed
          style={styles.image}
        />
        <Text style={[styles.title,{color: isDarkMode ? "white" : "black" }]}>Stay Fit!</Text>
        <Text style={styles.subtitle}>Find your way to the perfect body</Text>
      </View>

      <View style={[styles.container,{ backgroundColor: isDarkMode ? "black" : "#fff" },]}>
        <View style={styles.circleLeft} />
        <View style={styles.circleRight} />
        <View style={styles.imageContainer}>
          <Image
            source={Book1} // Adjust the path as needed
            style={styles.image}
          />
        </View>
        <Text style={[styles.title,{color: isDarkMode ? "white" : "black" }]}>Track your Active Lifestyle</Text>
        <Text style={styles.subtitle}>Find your way to the perfect body</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('GenderScreen',{ username, bio, imageData,userId })}
        >
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </Swiper>
   
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
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
  circleRight: {
    position: 'absolute',
    bottom: -width * 0.2,
    right: -width * 0.2,
    width: width * 0.4,
    height: width * 0.4,
    borderRadius: width * 0.2,
    backgroundColor: '#4A90E2',
  },
  image: {
    width: width * 0.6,
    height: width * 0.6,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 10,
    textAlign: 'center',
  },
  dot: {
    backgroundColor: '#ddd',
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 3,
  },
  activeDot: {
    backgroundColor: '#000',
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 3,
  },
   button: {
    backgroundColor: '#083EA0',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default App;