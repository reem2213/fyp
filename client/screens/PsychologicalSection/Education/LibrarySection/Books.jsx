// import React, { useState, useEffect } from "react";
// import {
//   View,
//   Text,
//   ScrollView,
//   TouchableOpacity,
//   Image,
//   StyleSheet,
// } from "react-native";
// import Duolingo from "../../../../assets/duolingo.png";
// import Busuu from "../../../../assets/busuu logo.png";
// import Drops from "../../../../assets/drops.jpeg";
// import Menrise from "../../../../assets/memrise.jpeg";
// import Mondly from "../../../../assets/mondly.png";

// import Fluentu from "../../../../assets/fluentu-logo.png";
// import axios from "axios";
// const Books = ({ navigation }) => {
//   const featuredBooks = [
//     {
//       id: 1,
//       title: "November 9",
//       image: Fluentu,
//     },
//     {
//       id: 2,
//       title: "November 9",
//       image: Menrise,
//     },
//     {
//       id: 3,
//       title: "November 9",
//       image: Duolingo,
//     },
//     {
//       id: 4,
//       title: "November 9",
//       image: Duolingo,
//     },
//   ];

//   const [books, setBooks] = useState([]);

//   useEffect(() => {
//     const fetchGoals = async () => {
//       try {
//         const response = await axios.get("http://10.0.0.21:3001/books");
//         setBooks(response.data);
//       } catch (error) {
//         console.error("Error fetching books:", error);
//       }
//     };

//     fetchGoals();
//   }, []);

//   return (
//     <View style={styles.container}>

//       <Text style={styles.header}>Our Library</Text>
//       <View style={styles.tabs}>
//         <Text>All</Text>
//         <Text>Saved</Text>
//       </View>
//       <Text style={styles.subHeader}>Top Books</Text>
//       <ScrollView horizontal showsHorizontalScrollIndicator={false}>
//         {books.map((b, index) => (
//           <TouchableOpacity
//             key={b.id}
//             style={styles.bookItem}
//             onPress={() =>
//               navigation.navigate("BookDetails", {
//                 title: b.title,
//                 image: b.image,
//                 description: b.description,
//                 rating: b.rating,
//                 author: b.author,
//               })
//             }

//           >
//             <View key={index}>

//               <Text>{b.title}</Text>
//             </View>
//           </TouchableOpacity>
//         ))}
//       </ScrollView>
//       <Text style={styles.subHeader}>Featured Books</Text>
//       <ScrollView>
//         {featuredBooks.map((book) => (
//           <TouchableOpacity key={book.id} style={styles.bookItemVertical}>
//             <Image source={book.image} style={styles.bookImage} />
//             <Text>{book.title}</Text>
//           </TouchableOpacity>
//         ))}
//       </ScrollView>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: "#fff",
//   },

//   header: {
//     fontSize: 24,
//     fontWeight: "bold",
//   },
//   tabs: {
//     flexDirection: "row",
//     justifyContent: "space-around",
//     marginTop: 10,
//     marginBottom: 20,
//   },
//   subHeader: {
//     fontSize: 18,
//     fontWeight: "bold",
//     marginTop: 10,
//     marginBottom: 10,
//   },
//   bookItem: {
//     width: 120,
//     marginRight: 10,
//   },
//   bookItemVertical: {
//     marginBottom: 10,
//   },
//   bookImage: {
//     width: "100%",
//     height: 150,
//   },
// });

// export default Books;

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import AtomicHabits from '../../../../assets/atomicHabits.jpg';
import Verity from '../../../../assets/verity.jpg';
import Dad from '../../../../assets/rich-dad-poor-dad.jpg';
import Nov9 from '../../../../assets/nov9.jpg';
import axios from "axios";
import Agatha1 from '../../../../assets/book2.jpg';
import Agatha3 from '../../../../assets/book3.jpg';
import Book4 from '../../../../assets/the-silent-patient.jpg';

const Books = ({ navigation }) => {
  const imageMap = {
    "November 9": Nov9,
    "atomic habits": AtomicHabits,
    "rich dad poor dad": Dad,
    Verity: Verity,
    // Add more mappings as necessary
  };
  const featuredBooks = [
    {
      id: 1,
      title: "November 9",
      image: Agatha1,
    },
    {
      id: 2,
      title: "November 9",
      image: Agatha3,
    },
    {
      id: 3,
      title: "November 9",
      image: Book4,
    },
    {
      id: 4,
      title: "November 9",
      image: Verity,
    },
    {
      id: 5,
      title: "November 9",
      image: Nov9,
    },
    {
      id: 6,
      title: "November 9",
      image: Dad,
    },
  ];
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get("http://172.16.165.205:3001/books");
        setBooks(response.data);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchBooks();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Our Library</Text>
      <View style={styles.tabs}>
        <Text style={{ color: "#B1CB14", fontSize: 18, fontWeight: "bold" }}>
          All
        </Text>
        <Text style={{ color: "#B1CB14", fontSize: 18, fontWeight: "bold" }}>
          Saved
        </Text>
      </View>
      <Text style={styles.subHeader}>Top Books</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {books.map((b, index) => (
          <TouchableOpacity
            key={b.id}
            style={styles.bookItem}
            onPress={() =>
              navigation.navigate("BookDetails", {
                title: b.title,
                image: imageMap[b.title],
                description: b.description,
                rating: b.rating,
                author: b.author,
              })
            }
          >
            <View key={index}>
              <Image source={imageMap[b.title]} style={styles.bookImage} />
              <Text
                style={{
                  color: "black",
                  width: "100%",
                  fontSize: 12,
                  textAlign: "center",
                  fontWeight: "bold",
                  position: "absolute",
                  marginTop: 130,
                }}
              >
                {b.title}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <Text style={styles.subHeader2}>Featured Books</Text>
      {/* <ScrollView style={{ top: 80 }}>
        {featuredBooks.map((book) => (
          <TouchableOpacity key={book.id} style={styles.bookItemVertical}>
            <Image source={book.image} style={styles.bookImage2} />
            <Text style={{marginBottom:20}}>{book.title}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView> */}
      <ScrollView style={{ top: 70 }}>
  {featuredBooks.reduce((rows, book, index) => {
    if (index % 2 === 0) {
      rows.push([]);
    }
    rows[rows.length - 1].push(book);
    return rows;
  }, []).map((row, rowIndex) => (
    <View key={rowIndex} style={{ flexDirection: 'row',gap:50, marginBottom: 20 }}>
      {row.map((book) => (
        <TouchableOpacity key={book.id} style={styles.bookItemVertical}>
          <Image source={book.image} style={styles.bookImage2} />
          {/* <Text>{book.title}</Text> */}
        </TouchableOpacity>
      ))}
    </View>
  ))}
</ScrollView>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F9F9F9",
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 70,
    color: "#B1CB14",
  },
  tabs: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
    marginBottom: 20,
    backgroundColor: "white",
    padding: 10,
    color: "#B1CB14",
    borderRadius: 20,
  },
  subHeader: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 15,
    color: "#B1CB14",
  },
  subHeader2: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 450,
    marginBottom: 10,
    marginLeft: 20,
    color: "#B1CB14",
    position: "absolute",
  },
  bookItem: {
    width: 120,
    marginRight: 10,
  },
  bookItemVertical: {
    top: -150,
    left: 20,
    marginBottom: 10,
  },
  bookImage: {
    width: 120,
    height: 120,
    borderRadius: 20,
    marginBottom: 160,
  },
  bookImage2: {
    width: 120,
    height: 150,
    borderRadius: 20,
    marginBottom: 0,
    top: 150,
  },
});

export default Books;
