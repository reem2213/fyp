// import React from 'react'
// import { Text, View } from 'react-native'

// const Books = () => {
//   return (
//    <View>
//     <Text style={{marginLeft:100,marginTop:100}}>hiiiii boookss</Text>
//    </View>
//   )
// }

// export default Books

import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import Duolingo from "../../../../assets/duolingo.png";
import Busuu from "../../../../assets/busuu logo.png";
import Drops from "../../../../assets/drops.jpeg";
import Menrise from "../../../../assets/memrise.jpeg";
import Mondly from "../../../../assets/mondly.png";
import Fluentu from "../../../../assets/fluentu-logo.png";
const Books = ({navigation}) => {
  // Dummy data for the books
  const topBooks = [
    {
      id: 1,
      title: "Atomic Habits",
      image: Duolingo,
    },
    {
      id: 2,
      title: "Rich Dad Poor Dad",
      image: Busuu,
    },
    {
      id: 3,
      title: "Rich Dad Poor Dad",
      image: Drops,
    },{
      id: 4,
      title: "Rich Dad Poor Dad",
      image: Mondly,
    },
  ];

  const featuredBooks = [
    {
      id: 1,
      title: "November 9",
      image: Fluentu,
    },
    {
      id: 2,
      title: "November 9",
      image: Menrise,
    },
    {
      id: 3,
      title: "November 9",
      image: Duolingo,
    },
    {
      id: 4,
      title: "November 9",
      image: Duolingo,
    },

  ];

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Our Library</Text>
      <View style={styles.tabs}>
        <Text>All</Text>
        <Text>Reading</Text>
        <Text>Saved</Text>
      </View>
      <Text style={styles.subHeader}>Top Books</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {topBooks.map((book) => (
          <TouchableOpacity key={book.id} style={styles.bookItem} onPress={() => navigation.navigate('BookDetails', {
            title: book.title,
            image: book.image
          })}>
            <Image source={book.image} style={styles.bookImage} />
            <Text>{book.title}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <Text style={styles.subHeader}>Featured Books</Text>
      <ScrollView>
        {featuredBooks.map((book) => (
          <TouchableOpacity key={book.id} style={styles.bookItemVertical}>
            <Image source={book.image} style={styles.bookImage} />
            <Text>{book.title}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
  },
  tabs: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
    marginBottom: 20,
  },
  subHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 10,
  },
  bookItem: {
    width: 120,
    marginRight: 10,
  },
  bookItemVertical: {
    marginBottom: 10,
  },
  bookImage: {
    width: "100%",
    height: 150,
  },
});

export default Books;
