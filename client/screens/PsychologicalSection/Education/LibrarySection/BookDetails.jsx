// BookDetailsScreen.js
import React,{useEffect} from 'react';
import { View, Text, Image } from 'react-native';

function BookDetails({ route }) {
  const { title, image,author,description,rating } = route.params;

  
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>{title}</Text>
      <Text>{author}</Text>

      <Text>{description}</Text>
      <Text>{rating}</Text>

      <Image source={image} style={{ width: 200, height: 200 }} />
    </View>
  );
}

export default BookDetails;
