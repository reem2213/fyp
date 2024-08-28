import React, { useEffect, useState, useContext } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  Pressable,
  ScrollView,
  TouchableOpacity,
  Linking,
  Alert,
} from "react-native";
import axios from "axios";
// import StarRating from "react-native-star-rating";
import { DarkModeContext } from "../../components/DarkModeContext"; // Import the context
import BlueEllipse from '../../assets/blueEllipse.png';
import ArrowBack from '../../assets/arrowBack.png';
const SupplementSuggestion = ({route,navigation}) => {
  const [products, setProducts] = useState([]);
  const {userId,username}=route.params;
  const { isDarkMode } = useContext(DarkModeContext); // Use the context

  useEffect(() => {
    axios.get("http://10.0.0.21:3001/products")
      .then((response) => {
        setProducts(response.data);
        

      })

      .catch((error) => {
        console.error(error);
      });

  }, []);

  const handleBuyClick = (url) => {
    if (url) {

      Linking.openURL(url).catch((err) =>
        console.error("Failed to open URL:", err)
      );
    } else {
      Alert.alert("Invalid URL", "The product does not have a valid URL.");
    }
  };
  const BackToHome = () => {
    navigation.navigate("PhysicalHome",{username,userId});
  };

  return (
    <>
    <ScrollView
      contentContainerStyle={[
        styles.container,
        { backgroundColor: isDarkMode ? "black" : "#FAFAFA" },
      ]}
    ><Pressable onPress={BackToHome}>
        <Image source={ArrowBack} style={styles.arrow} />
      </Pressable>
          <Image style={styles.blueEllispe} source={BlueEllipse} />
          



      <Text style={[styles.title, { color: isDarkMode ? "white" : "#032B79" }]}>
        Supplement suggestion
      </Text>
      <Text
        style={[styles.subtitle, { color: isDarkMode ? "white" : "#032B79" }]}
      >
        "To accelerate your journey to achieving your fitness goals, consider
        integrating these supplements into your regimen for enhanced results."
      </Text>
      <View style={styles.productsContainer}>
        {products.map((product) => (
          <View
            key={product._id}
            style={[
              styles.productCard,
              { backgroundColor: isDarkMode ? "gray" : "#fff" },
            ]}
          >
            <Image
              source={{ uri: `data:image/jpeg;base64,${product.image}` }}
              style={styles.productImage}
            />
            <Text style={styles.productName}>{product.name}</Text>
            {/* <StarRating
              disabled={true}
              maxStars={5}
              rating={product.rating}
              fullStarColor={"gold"}
              starSize={20}
            /> */}
            <Text style={styles.productPrice}>${product.price}</Text>
            <TouchableOpacity
              style={styles.buyButton}
              onPress={() => handleBuyClick(product.url)}
            >
              <Text style={styles.buyButtonText}>Buy</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>

    </ScrollView>
    <Image style={styles.blueEllispe2} source={BlueEllipse} />
    </>

  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
  },
  arrow: {
    marginTop: 70,
    marginLeft: 20,
    width: 30,
    height: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 8,
    color:"#032B79",
    top: 20,
  },
  blueEllispe: {
    width: 150,
    height: 150,
    marginLeft: 300,
    marginTop: -150,

  },
  blueEllispe2: {
    width: 150,
    height: 150,
    marginLeft: -50,
    marginTop: 770,
    position:"absolute"
  },
  subtitle: {
    fontSize: 12,
    textAlign: "center",
    marginBottom: 16,
    color:"#032B79",
    top: 20,
  },
  productsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    top: 20,
  },
  productCard: {
    width: "45%",
    backgroundColor: "red",
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    alignItems: "center",
  },
  productImage: {
    width: 90,
    height: 120,
    marginBottom: 8,
  },
  productName: {
    fontSize: 14,
    // fontWeight: "bold",
    textAlign: "center",
    marginBottom: 8,
  },
  productPrice: {
    fontSize: 16,
    color: "gray",
    marginBottom: 8,
  },
  buyButton: {
    backgroundColor: "#719AEA",
    paddingVertical: 8,
    paddingHorizontal: 25,
    borderRadius: 20,
  },
  buyButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default SupplementSuggestion;
