// BookDetailsScreen.js
import React from 'react';
import { View, Text, Image } from 'react-native';

function BookDetails({ route }) {
  const { title, image } = route.params;
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>{title}</Text>
      <Image source={image} style={{ width: 200, height: 200 }} />
    </View>
  );
}

export default BookDetails;
