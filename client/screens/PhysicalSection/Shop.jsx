
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image, ScrollView, TouchableOpacity,Linking } from 'react-native';
import axios from 'axios';
import StarRating from 'react-native-star-rating';
import { WebView } from "react-native-webview";


const SupplementSuggestion = () => {
  const [products, setProducts] = useState([]);

  
  const ToProduct1 = () => {
    Linking.openURL('https://www.muscleandstrength.com/store/whey-muscle-builder.html'); 
  };

  const ToProduct2 = () => {
    Linking.openURL('https://www.muscleandstrength.com/store/nutrex-whey.html'); 
  };

  const ToProduct3 = () => {

    Linking.openURL('https://www.muscleandstrength.com/store/nutrex-isofit.html'); 
  };

  const ToProduct4 = () => {
    Linking.openURL('https://www.muscleandstrength.com/store/dymatize-iso-100.html'); 
  };

  const ToProduct5 = () => {
    Linking.openURL('https://www.muscleandstrength.com/store/syntha-6-isolate.html'); 
  };

  const ToProduct6 = () => {
    Linking.openURL('https://www.muscleandstrength.com/store/primeval-labs-whey-protein-concentrate.html'); 
  };

  const ToProduct7 = () => {
    Linking.openURL('https://www.muscleandstrength.com/store/combat-sport-bar.html'); 
  };

  const ToProduct8 = () => {
    Linking.openURL('https://www.muscleandstrength.com/store/now-almond-packets.html'); 
  };

  const ToProduct9 = () => {
    Linking.openURL('https://www.muscleandstrength.com/store/perfect-sports-diesel-whey-protein-isolate.html'); 
  };

  const ToProduct10 = () => {
    Linking.openURL('https://www.muscleandstrength.com/store/hexapro-protein-bar.html'); 
  };

  const ToProduct11 = () => {
    Linking.openURL('https://www.muscleandstrength.com/store/bpisports-isohd-whey-protein.html'); 
  };

  const ToProduct12 = () => {
    Linking.openURL('https://www.muscleandstrength.com/store/magnum-quattro.html'); 
  };
  useEffect(() => {
    axios.get('http://10.0.0.21:3001/products')
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error(error);
      });

  }, []);

 const handleBuyClick = (url) => {
    if (url) {
      Linking.openURL(url).catch((err) => console.error('Failed to open URL:', err));
    } else {
      Alert.alert('Invalid URL', 'The product does not have a valid URL.');
    }
  };

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


