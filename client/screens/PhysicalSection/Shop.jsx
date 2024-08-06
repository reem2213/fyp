
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import axios from 'axios';
import StarRating from 'react-native-star-rating';
import { WebView } from "react-native-webview";


const SupplementSuggestion = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('http://10.0.0.21:3001/products')
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Supplement suggestion</Text>
      <Text style={styles.subtitle}>
        "To accelerate your journey to achieving your fitness goals, consider integrating these supplements into your regimen for enhanced results."
      </Text>
      <View style={styles.productsContainer}>
        {products.map(product => (
          <View key={product._id} style={styles.productCard}>
            <WebView
                style={styles.productImage}
                originWhitelist={["*"]}
                source={{
                  html: `<img src="data:image/jpeg;base64,${product.image}" style="width:250px; height:250px;margin-top:150px;" />`,
                }}
              />
            <Image source={{ uri: product.image }} style={styles.productImage} />
            <Text style={styles.productName}>{product.name}</Text>
            <StarRating

              disabled={true}
              maxStars={5}
              rating={product.rating}
              fullStarColor={'gold'}
              starSize={20}
            />
            <Text style={styles.productPrice}>${product.price}</Text>
            <TouchableOpacity style={styles.buyButton}>
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
    backgroundColor: '#f0f0f0',
    marginTop:50
  },
  
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 16,
  },
  productsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  productCard: {
    width: '45%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    alignItems: 'center',
  },
  productImage: {
    width: 100,
    height: 100,
    marginBottom: 8,
  },
  productName: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  productPrice: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
  },
  buyButton: {
    backgroundColor: '#007bff',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 5,
  },
  buyButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default SupplementSuggestion;


