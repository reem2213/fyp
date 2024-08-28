// import React, { useState, useEffect, useContext } from "react";
// import {
//   View,
//   Text,
//   ScrollView,
//   TouchableOpacity,
//   Image,
//   StyleSheet,
// } from "react-native";
// import { DarkModeContext } from "../../../../components/DarkModeContext"; // Adjust the import path as needed
// import AtomicHabits from "../../../../assets/atomicHabits.jpg";
// import Verity from "../../../../assets/verity.jpg";
// import Dad from "../../../../assets/rich-dad-poor-dad.jpg";
// import Nov9 from "../../../../assets/nov9.jpg";
// import axios from "axios";
// import Agatha1 from "../../../../assets/book2.jpg";
// import Agatha3 from "../../../../assets/book3.jpg";
// import Book4 from "../../../../assets/the-silent-patient.jpg";
// import Ato from '../../../../android/app/src/main/assets/atomicHabits.pdf'
// import Rixh from '../../../../android/app/src/main/assets/RichDadPoorDad.pdf'
// import Novemb from '../../../../android/app/src/main/assets/November9.pdf'
// import Back from "../../../../assets/greenBack.png";

// const Books = ({ navigation,route }) => {
//   const { isDarkMode } = useContext(DarkModeContext); // Get the dark mode state
//   const {username,userId}=route.params

//   const imageMap = {
//     "November 9": Nov9,
//     "atomic habits": AtomicHabits,
//     "rich dad poor dad": Dad,
//     Verity: Verity,
//   };

//   const pdfMap = {
    
//     "rich dad poor dad": Rixh,
//     "atomic habits": Ato,
//     "November 9": Novemb,
//     "Verity":Novemb
//   };

//   const featuredBooks = [
//     {
//       id: 1,
//       title: "November 9",
//       image: Agatha1,
//     },
//     {
//       id: 2,
//       title: "November 9",
//       image: Agatha3,
//     },
//     {
//       id: 3,
//       title: "November 9",
//       image: Book4,
//     },
//     {
//       id: 4,
//       title: "November 9",
//       image: Verity,
//     },
//     {
//       id: 5,
//       title: "November 9",
//       image: Nov9,
//     },
//     {
//       id: 6,
//       title: "November 9",
//       image: Dad,
//     },
//   ];

//   const [books, setBooks] = useState([]);

//   useEffect(() => {
//     const fetchBooks = async () => {
//       try {
//         const response = await axios.get("http://10.0.0.21:3001/books");
//         setBooks(response.data);
//       } catch (error) {
//         console.error("Error fetching books:", error);
//       }
//     };

//     fetchBooks();
//   }, []);
//   const backToHome = () => {
//     navigation.navigate("EduSection",{username,userId});
//   };

//   return (
//     <View style={[styles.container, { backgroundColor: isDarkMode ? "#333" : "#F9F9F9" }]}>
//        <TouchableOpacity onPress={backToHome}>
//           <Image source={Back} style={styles.backButton} />
//         </TouchableOpacity>
//       <Text style={[styles.header, { color: isDarkMode ? "white" : "#B1CB14" }]}>Our Library</Text>
//       <View style={styles.tabs}>
//         <Text style={{ color: "#B1CB14", fontSize: 18, fontWeight: "bold" }}>All</Text>
//         <Text style={{ color: "#B1CB14", fontSize: 18, fontWeight: "bold" }}>Saved</Text>
//       </View>
//       <Text style={[styles.subHeader, { color: isDarkMode ? "white" : "#B1CB14" }]}>Top Books</Text>
//       <ScrollView horizontal showsHorizontalScrollIndicator={false}>
//         {books.map((b, index) => (
//           <TouchableOpacity
//             key={b.id}
//             style={styles.bookItem}
//             onPress={() =>
//               navigation.navigate("BookDetails", {
//                 title: b.title,
//                 image: imageMap[b.title],
//                 description: b.description,
//                 rating: b.rating,
//                 author: b.author,
//                 pdfUri: pdfMap[b.title],
//                 username ,userId// Pass the PDF file path
//               })
//             }
//           >
//             <View key={index}>
//               <Image source={imageMap[b.title]} style={styles.bookImage} />
//               <Text
//                 style={{
//                   color: isDarkMode ? "white" : "black",
//                   width: "100%",
//                   fontSize: 12,
//                   textAlign: "center",
//                   fontWeight: "bold",
//                   position: "absolute",
//                   marginTop: 130,
//                 }}
//               >
//                 {b.title}
//               </Text>
//             </View>
//           </TouchableOpacity>
//         ))}
//       </ScrollView>

//       <Text style={[styles.subHeader2, { color: isDarkMode ? "white" : "#B1CB14" }]}>Featured Books</Text>
//       <ScrollView style={{ top: 70 }}>
//         {featuredBooks
//           .reduce((rows, book, index) => {
//             if (index % 2 === 0) {
//               rows.push([]);
//             }
//             rows[rows.length - 1].push(book);
//             return rows;
//           }, [])
//           .map((row, rowIndex) => (
//             <View
//               key={rowIndex}
//               style={{ flexDirection: "row", gap: 50, marginBottom: 20 }}
//             >
//               {row.map((book) => (
//                 <TouchableOpacity key={book.id} style={styles.bookItemVertical}>
//                   <Image source={book.image} style={styles.bookImage2} />
//                 </TouchableOpacity>
//               ))}
//             </View>
//           ))}
//       </ScrollView>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//   },
//   backButton: {
//     position: "absolute",
//     marginTop: 30,
//     marginLeft: 0,
//     width: 30,
//     height: 30,
//   },
//   header: {
//     fontSize: 28,
//     fontWeight: "bold",
//     textAlign: "center",
//     marginTop: 70,
//   },
//   tabs: {
//     flexDirection: "row",
//     justifyContent: "space-around",
//     marginTop: 10,
//     marginBottom: 20,
//     backgroundColor: "white",
//     padding: 10,
//     borderRadius: 20,
//   },
//   subHeader: {
//     fontSize: 20,
//     fontWeight: "bold",
//     marginTop: 10,
//     marginBottom: 15,
//   },
//   subHeader2: {
//     fontSize: 20,
//     fontWeight: "bold",
//     marginTop: 450,
//     marginBottom: 10,
//     marginLeft: 20,
//     position: "absolute",
//   },
//   bookItem: {
//     width: 120,
//     marginRight: 10,
//   },
//   bookItemVertical: {
//     top: -150,
//     left: 20,
//     marginBottom: 10,
//   },
//   bookImage: {
//     width: 120,
//     height: 120,
//     borderRadius: 20,
//     marginBottom: 160,
//   },
//   bookImage2: {
//     width: 120,
//     height: 150,
//     borderRadius: 20,
//     marginBottom: 0,
//     top: 150,
//   },
// });

// export default Books;

import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import { DarkModeContext } from "../../../../components/DarkModeContext"; // Adjust the import path as needed
import AtomicHabits from "../../../../assets/atomicHabits.jpg";
import Verity from "../../../../assets/verity.jpg";
import Dad from "../../../../assets/rich-dad-poor-dad.jpg";
import Nov9 from "../../../../assets/nov9.jpg";
import axios from "axios";
import Agatha1 from "../../../../assets/book2.jpg";
import Agatha3 from "../../../../assets/book3.jpg";
import Book4 from "../../../../assets/the-silent-patient.jpg";
import SaveIcon from "../../../../assets/saveBook.png"; // Original save icon
import GreenSaveIcon from "../../../../assets/greenSave.png"; // Green save icon
import Back from "../../../../assets/greenBack.png"; // Assuming you have a back icon image

const Books = ({ navigation, route }) => {
  const { isDarkMode } = useContext(DarkModeContext); // Get the dark mode state
  const { username, userId } = route.params;

  const imageMap = {
    "November 9": Nov9,
    "atomic habits": AtomicHabits,
    "rich dad poor dad": Dad,
    Verity: Verity,
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
  const [savedBooks, setSavedBooks] = useState([]);
  const [showSaved, setShowSaved] = useState(false);
  const [hoveredBook, setHoveredBook] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get("http://10.0.0.21:3001/books");
        setBooks(response.data);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchBooks();
  }, []);

  const toggleSaveBook = (book) => {
    if (savedBooks.includes(book)) {
      setSavedBooks(savedBooks.filter((b) => b.id !== book.id));
    } else {
      setSavedBooks([...savedBooks, book]);
    }
  };

  const backToHome = () => {
    navigation.navigate("EduSection", { username, userId });
  };

  const booksToDisplay = showSaved ? savedBooks : books;

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isDarkMode ? "#333" : "#F9F9F9" },
      ]}
    >
      <TouchableOpacity onPress={backToHome}>
        <Image source={Back} style={styles.backButton} />
      </TouchableOpacity>
      <Text
        style={[styles.header, { color: isDarkMode ? "white" : "#B1CB14" }]}
      >
        Our Library
      </Text>
      <View style={styles.tabs}>
        <TouchableOpacity onPress={() => setShowSaved(false)}>
          <Text
            style={{
              color: showSaved ? "gray" : "#B1CB14",
              fontSize: 18,
              fontWeight: "bold",
            }}
          >
            All
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setShowSaved(true)}>
          <Text
            style={{
              color: showSaved ? "#B1CB14" : "gray",
              fontSize: 18,
              fontWeight: "bold",
            }}
          >
            Saved
          </Text>
        </TouchableOpacity>
      </View>

      {!showSaved && (
        <Text
          style={[styles.subHeader, { color: isDarkMode ? "white" : "#B1CB14" }]}
        >
          Top Books
        </Text>
      )}

      {showSaved && savedBooks.length === 0 ? (
        <Text style={styles.noSavedBooksText}>No saved books</Text>
      ) : (
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {booksToDisplay.map((b, index) => (
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
                  username,
                  userId,
                })
              }
              onMouseEnter={() => setHoveredBook(b.id)}
              onMouseLeave={() => setHoveredBook(null)}
            >
              <View key={index} style={styles.bookContainer}>
                <Image source={imageMap[b.title]} style={styles.bookImage} />
                <Text
                  style={{
                    color: isDarkMode ? "white" : "black",
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
                  <TouchableOpacity
                    style={styles.saveIconContainer}
                    onPress={() => toggleSaveBook(b)}
                  >
                    <Image
                      source={
                        savedBooks.includes(b) ? GreenSaveIcon : SaveIcon
                      }
                      style={styles.saveIcon}
                    />
                  </TouchableOpacity>
    
                {showSaved && (
                  <TouchableOpacity
                    style={styles.saveIconContainer}
                    onPress={() => toggleSaveBook(b)}
                  >
                    <Image
                      source={
                        savedBooks.includes(b) ? GreenSaveIcon : SaveIcon
                      }
                      style={styles.saveIcon}
                    />
                  </TouchableOpacity>
                )}
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}

      {!showSaved && (
        <>
          <Text
            style={[
              styles.subHeader2,
              { color: isDarkMode ? "white" : "#B1CB14" },
            ]}
          >
            Featured Books
          </Text>
          <ScrollView style={{ top: 70 }}>
            {featuredBooks
              .reduce((rows, book, index) => {
                if (index % 2 === 0) {
                  rows.push([]);
                }
                rows[rows.length - 1].push(book);
                return rows;
              }, [])
              .map((row, rowIndex) => (
                <View
                  key={rowIndex}
                  style={{ flexDirection: "row", gap: 50, marginBottom: 20 }}
                >
                  {row.map((book) => (
                    <TouchableOpacity
                      key={book.id}
                      style={styles.bookItemVertical}
                    >
                      <Image source={book.image} style={styles.bookImage2} />
                    </TouchableOpacity>
                  ))}
                </View>
              ))}
          </ScrollView>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  backButton: {
    position: "absolute",
    marginTop: 30,
    marginLeft: 0,
    width: 30,
    height: 30,
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 70,
  },
  tabs: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
    marginBottom: 20,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 20,
  },
  subHeader: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 15,
  },
  subHeader2: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 450,
    marginBottom: 10,
    marginLeft: 20,
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
  bookContainer: {
    position: "relative",
  },
  saveIconContainer: {
    position: "absolute",
    right: 5,
    top: 5,
  },
  saveIcon: {
    width: 20,
    height: 20,
  },
  noSavedBooksText: {
    fontSize: 18,
    color: "gray",
    textAlign: "center",
    marginTop: 50,
  },
});

export default Books;

// import React, { useState, useEffect, useContext } from "react";
// import {
//   View,
//   Text,
//   ScrollView,
//   TouchableOpacity,
//   Image,
//   StyleSheet,
// } from "react-native";
// import { DarkModeContext } from "../../../../components/DarkModeContext"; // Adjust the import path as needed
// import AtomicHabits from "../../../../assets/atomicHabits.jpg";
// import Verity from "../../../../assets/verity.jpg";
// import Dad from "../../../../assets/rich-dad-poor-dad.jpg";
// import Nov9 from "../../../../assets/nov9.jpg";
// import axios from "axios";
// import Agatha1 from "../../../../assets/book2.jpg";
// import Agatha3 from "../../../../assets/book3.jpg";
// import Book4 from "../../../../assets/the-silent-patient.jpg";
// import SaveIcon from "../../../../assets/saveBook.png"; // Assuming you have a save icon image
// import RemoveIcon from "../../../../assets/greenSave.png"; // Assuming you have a remove icon image
// import Back from "../../../../assets/greenBack.png"; // Assuming you have a back icon image

// const Books = ({ navigation, route }) => {
//   const { isDarkMode } = useContext(DarkModeContext); // Get the dark mode state
//   const { username, userId } = route.params;

//   const imageMap = {
//     "November 9": Nov9,
//     "atomic habits": AtomicHabits,
//     "rich dad poor dad": Dad,
//     Verity: Verity,
//   };

//   const featuredBooks = [
//     {
//       id: 1,
//       title: "November 9",
//       image: Agatha1,
//     },
//     {
//       id: 2,
//       title: "November 9",
//       image: Agatha3,
//     },
//     {
//       id: 3,
//       title: "November 9",
//       image: Book4,
//     },
//     {
//       id: 4,
//       title: "November 9",
//       image: Verity,
//     },
//     {
//       id: 5,
//       title: "November 9",
//       image: Nov9,
//     },
//     {
//       id: 6,
//       title: "November 9",
//       image: Dad,
//     },
//   ];

//   const [books, setBooks] = useState([]);
//   const [savedBooks, setSavedBooks] = useState([]);
//   const [showSaved, setShowSaved] = useState(false);
//   const [hoveredBook, setHoveredBook] = useState(null);

//   useEffect(() => {
//     const fetchBooks = async () => {
//       try {
//         const response = await axios.get("http://10.0.0.21:3001/books");
//         setBooks(response.data);
//       } catch (error) {
//         console.error("Error fetching books:", error);
//       }
//     };

//     fetchBooks();
//   }, []);

//   const saveBook = (book) => {
//     if (!savedBooks.includes(book)) {
//       setSavedBooks([...savedBooks, book]);
//     }
//   };

//   const removeBook = (bookId) => {
//     setSavedBooks(savedBooks.filter((book) => book.id !== bookId));
//   };

//   const backToHome = () => {
//     navigation.navigate("EduSection", { username, userId });
//   };

//   const booksToDisplay = showSaved ? savedBooks : books;

//   return (
//     <View
//       style={[
//         styles.container,
//         { backgroundColor: isDarkMode ? "#333" : "#F9F9F9" },
//       ]}
//     >
//       <TouchableOpacity onPress={backToHome}>
//         <Image source={Back} style={styles.backButton} />
//       </TouchableOpacity>
//       <Text
//         style={[styles.header, { color: isDarkMode ? "white" : "#B1CB14" }]}
//       >
//         Our Library
//       </Text>
//       <View style={styles.tabs}>
//         <TouchableOpacity onPress={() => setShowSaved(false)}>
//           <Text
//             style={{
//               color: showSaved ? "gray" : "#B1CB14",
//               fontSize: 18,
//               fontWeight: "bold",
//             }}
//           >
//             All
//           </Text>
//         </TouchableOpacity>
//         <TouchableOpacity onPress={() => setShowSaved(true)}>
//           <Text
//             style={{
//               color: showSaved ? "#B1CB14" : "gray",
//               fontSize: 18,
//               fontWeight: "bold",
//             }}
//           >
//             Saved
//           </Text>
//         </TouchableOpacity>
//       </View>

//       {!showSaved && (
//         <Text
//           style={[styles.subHeader, { color: isDarkMode ? "white" : "#B1CB14" }]}
//         >
//           Top Books
//         </Text>
//       )}

//       {showSaved && savedBooks.length === 0 ? (
//         <Text style={styles.noSavedBooksText}>No saved books</Text>
//       ) : (
//         <ScrollView horizontal showsHorizontalScrollIndicator={false}>
//           {booksToDisplay.map((b, index) => (
//             <TouchableOpacity
//               key={b.id}
//               style={styles.bookItem}
//               onPress={() =>
//                 navigation.navigate("BookDetails", {
//                   title: b.title,
//                   image: imageMap[b.title],
//                   description: b.description,
//                   rating: b.rating,
//                   author: b.author,
//                   username,
//                   userId,
//                 })
//               }
//               onMouseEnter={() => setHoveredBook(b.id)}
//               onMouseLeave={() => setHoveredBook(null)}
//             >
//               <View key={index} style={styles.bookContainer}>
//                 <Image source={imageMap[b.title]} style={styles.bookImage} />
//                 <Text
//                   style={{
//                     color: isDarkMode ? "white" : "black",
//                     width: "100%",
//                     fontSize: 12,
//                     textAlign: "center",
//                     fontWeight: "bold",
//                     position: "absolute",
//                     marginTop: 130,
//                   }}
//                 >
//                   {b.title}
//                 </Text>
//                   <TouchableOpacity
//                     style={styles.saveIconContainer}
//                     onPress={() => saveBook(b)}
//                   >
//                     <Image source={SaveIcon} style={styles.saveIcon} />
//                   </TouchableOpacity>
              
//                 {showSaved && (
//                   <TouchableOpacity
//                     style={styles.removeIconContainer}
//                     onPress={() => removeBook(b.id)}
//                   >
//                     <Image source={RemoveIcon} style={styles.removeIcon} />
//                   </TouchableOpacity>
//                 )}
//               </View>
//             </TouchableOpacity>
//           ))}
//         </ScrollView>
//       )}

//       {!showSaved && (
//         <>
//           <Text
//             style={[
//               styles.subHeader2,
//               { color: isDarkMode ? "white" : "#B1CB14" },
//             ]}
//           >
//             Featured Books
//           </Text>
//           <ScrollView style={{ top: 70 }}>
//             {featuredBooks
//               .reduce((rows, book, index) => {
//                 if (index % 2 === 0) {
//                   rows.push([]);
//                 }
//                 rows[rows.length - 1].push(book);
//                 return rows;
//               }, [])
//               .map((row, rowIndex) => (
//                 <View
//                   key={rowIndex}
//                   style={{ flexDirection: "row", gap: 50, marginBottom: 20 }}
//                 >
//                   {row.map((book) => (
//                     <TouchableOpacity
//                       key={book.id}
//                       style={styles.bookItemVertical}
//                     >
//                       <Image source={book.image} style={styles.bookImage2} />
//                     </TouchableOpacity>
//                   ))}
//                 </View>
//               ))}
//           </ScrollView>
//         </>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//   },
//   backButton: {
//     position: "absolute",
//     marginTop: 30,
//     marginLeft: 0,
//     width: 30,
//     height: 30,
//   },
//   header: {
//     fontSize: 28,
//     fontWeight: "bold",
//     textAlign: "center",
//     marginTop: 70,
//   },
//   tabs: {
//     flexDirection: "row",
//     justifyContent: "space-around",
//     marginTop: 10,
//     marginBottom: 20,
//     backgroundColor: "white",
//     padding: 10,
//     borderRadius: 20,
//   },
//   subHeader: {
//     fontSize: 20,
//     fontWeight: "bold",
//     marginTop: 10,
//     marginBottom: 15,
//   },
//   subHeader2: {
//     fontSize: 20,
//     fontWeight: "bold",
//     marginTop: 450,
//     marginBottom: 10,
//     marginLeft: 20,
//     position: "absolute",
//   },
//   bookItem: {
//     width: 120,
//     marginRight: 10,
//   },
//   bookItemVertical: {
//     top: -150,
//     left: 20,
//     marginBottom: 10,
//   },
//   bookImage: {
//     width: 120,
//     height: 120,
//     borderRadius: 20,
//     marginBottom: 160,
//   },
//   bookImage2: {
//     width: 120,
//     height: 150,
//     borderRadius: 20,
//     marginBottom: 0,
//     top: 150,
//   },
//   bookContainer: {
//     position: "relative",
//   },
//   saveIconContainer: {
//     position: "absolute",
//     right: 5,
//     top: 5,
//   },
//   saveIcon: {
//     width: 20,
//     height: 20,
//   },
//   removeIconContainer: {
//     position: "absolute",
//     right: 5,
//     top: 5,
//   },
//   removeIcon: {
//     width: 20,
//     height: 20,
//   },
//   noSavedBooksText: {
//     fontSize: 18,
//     color: "gray",
//     textAlign: "center",
//     marginTop: 50,
//   },
// });

// export default Books;
