import React, { useEffect, useState, useContext } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,

  ScrollView,
  TouchableOpacity,
  Linking,
  Alert,
} from "react-native";
import axios from "axios";
import StarRating from "react-native-star-rating";
import { DarkModeContext } from "../../components/DarkModeContext"; // Import the context

const SupplementSuggestion = ({route}) => {
  const [products, setProducts] = useState([]);
  const {userId}=route.params;
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

  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        { backgroundColor: isDarkMode ? "black" : "#fff" },
      ]}
    >
      <Text style={[styles.title, { color: isDarkMode ? "white" : "black" }]}>
        Supplement suggestion
      </Text>
      {/* <Text style={[styles.title, { color: isDarkMode ? "white" : "black" }]}>
        {userId}
      </Text> */}
      <Text
        style={[styles.subtitle, { color: isDarkMode ? "white" : "black" }]}
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
            <StarRating
              disabled={true}
              maxStars={5}
              rating={product.rating}
              fullStarColor={"gold"}
              starSize={20}
            />
            <Text style={styles.productPrice}>${product.price}</Text>
            <TouchableOpacity
              style={styles.buyButton}
              onPress={() => handleBuyClick(product.url)}
            >
              <Text style={styles.buyButtonText}>BUY</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 8,
    top: 20,
  },
  subtitle: {
    fontSize: 12,
    textAlign: "center",
    marginBottom: 16,
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
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    alignItems: "center",
  },
  productImage: {
    width: 150,
    height: 180,
    marginBottom: 8,
    // backgroundColor: "gray",
  },
  productName: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 8,
  },
  productPrice: {
    fontSize: 16,
    color: "#333",
    marginBottom: 8,
  },
  buyButton: {
    backgroundColor: "#007bff",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 5,
  },
  buyButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default SupplementSuggestion;
