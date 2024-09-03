// import React, { useEffect } from "react";
// import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
// import Back from "../../../../assets/back.png";
// import Star from "../../../../assets/star.png";

// import AtomicHabits from '../../../../assets/atomicHabits.jpg';
// import Verity from '../../../../assets/verity.jpg';
// import Nov9 from '../../../../assets/nov9.jpg';
// function BookDetails({ route, navigation }) {
//   const { title, image, author, description, rating,pdfUri } = route.params;
//   const backToHome = () => {
//     navigation.navigate("books");
//   };

//   const goToPdf = () => {
//     navigation.navigate("Pdf", { pdfUri });
//   };
//   const featuredBooks = [
//     {
//       id: 1,
//       title: "atomic habits",
//       image: AtomicHabits,
//     },
//     {
//       id: 2,
//       title: "Verity",
//       image: Verity,
//     },
//     {
//       id: 3,
//       title: "November 9",
//       image: Nov9,
//     },
//   ];

//   return (
//     <>
//       <View style={{ backgroundColor: "white", top: 0, height: "100%" }}>
//         <View style={styles.container}>
//           <TouchableOpacity onPress={backToHome}>
//             <Image source={Back} style={styles.backButton} />
//           </TouchableOpacity>
//         </View>
//         <View
//           style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
//         >
//           <Image
//             source={image}
//             style={{
//               width: 130,
//               height: 175,
//               borderRadius: 20,
//               marginRight: 180,
//               marginTop: 130,
//             }}
//           />

//           <Text
//             style={{
//               marginLeft: 160,
//               fontSize: 25,
//               top: -160,
//               fontWeight: "bold",
//             }}
//           >
//             {title}
//           </Text>
//           <Text
//             style={{ marginLeft: 160, fontSize: 22, top: -160, color: "gray" }}
//           >
//             {author}
//           </Text>
//           <Image
//             style={{ marginLeft: 80, width: 30, height: 30, top: -150 }}
//             source={Star}
//           />
//           <Text
//             style={{
//               marginLeft: 160,
//               fontSize: 22,
//               top: -180,
//               color: "gray",
//               fontWeight: "bold",
//             }}
//           >
//             {rating}
//           </Text>
//           <TouchableOpacity onPress={goToPdf}>
//             <Text
//               style={{
//                 color: "white",
//                 marginTop: -170,
//                 left: 80,
//                 fontSize: 15,
//                 fontWeight: "bold",
//                 backgroundColor: "#B1CB14",
//                 padding: 12,
//                 textAlign: "center",
//                 borderRadius: 15,
//                 width: "70%",
//               }}
//             >
//               Read Now
//             </Text>
//           </TouchableOpacity>
//           <Text style={{ width: "80%", marginLeft: 0, top: -70 }}>
//             {description}
//           </Text>
//         </View>

//         <View style={styles.container2}>
//           <Text
//             style={{
//               textAlign: "center",
//               color: "white",
//               fontSize: 30,
//               fontWeight: "bold",
//               top: 20,
//               position: "absolute",
//             }}
//           >
//             More Books
//           </Text>
//           {featuredBooks.map((book) => (
//             <TouchableOpacity key={book.id} style={styles.bookItemVertical}>
//               <Image source={book.image} style={styles.bookImage} />
//               <Text style={{marginTop:195,position:"absolute", color:"white"}}>{book.title}</Text>


//               <TouchableOpacity>
//             <Text
//               style={{
//                 color: "#B1CB14",
//                 marginTop: 90,
//                 left: 0,
//                 fontSize: 12,
//                 fontWeight: "bold",
//                 backgroundColor: "white",
//                 padding: 10,
//                 textAlign: "center",
//                 borderRadius: 20,
//                 // width: "70%",
//               }}
//             >
//               Read Now
//             </Text>
          
//           </TouchableOpacity>
//             </TouchableOpacity>
//           ))}
//         </View>
//       </View>
//     </>
//   );
// }
// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: "#B1CB14",
//     height: "20%",
//     borderRadius: 70,
//     marginTop: -50,
//   },
//   container2: {
//     backgroundColor: "#B1CB14",
//     height: "45%",
//     borderRadius: 75,
//     top: 70,
//     flexDirection: "row",
//     flexWrap: "wrap",
//     justifyContent: "center",
//   },
//   backButton: {
//     position: "absolute",
//     marginTop: 95,
//     marginLeft: 30,
//     width: 30,
//     height: 30,
//   },
//   header: {
//     color: "white",
//     fontSize: 35,
//     fontWeight: "bold",
//     position: "absolute",
//     marginTop: 150,
//     marginLeft: 80,
//   },
//   bookItemVertical: {
//     margin: 10,
//     alignItems: "center",
//   },
//   bookImage: {
//     width: 90,
//     height: 130,
//     top: 60,
//     borderRadius: 20,
//   },
// });
// export default BookDetails;



import React, { useContext } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { DarkModeContext } from "../../../../components/DarkModeContext"; // Adjust the import path as needed
import Back from "../../../../assets/back.png";
import Star from "../../../../assets/star.png";
import AtomicHabits from '../../../../assets/atomicHabits.jpg';
import Verity from '../../../../assets/verity.jpg';
import Nov9 from '../../../../assets/nov9.jpg';

function BookDetails({ route, navigation }) {
  const { title, image, author, description, rating, pdfUri } = route.params;
  const {username,userId}=route.params

  const { isDarkMode } = useContext(DarkModeContext); // Get the dark mode state

  const backToHome = () => {
    navigation.navigate("books",{username,userId});
  };

  const goToPdf = () => {
    navigation.navigate("Pdf", { pdfUri });
  };

  const featuredBooks = [
    {
      id: 1,
      title: "atomic habits",
      image: AtomicHabits,
    },
    {
      id: 2,
      title: "Verity",
      image: Verity,
    },
    {
      id: 3,
      title: "November 9",
      image: Nov9,
    },
  ];

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? "#121212" : "white" }]}>
      <View style={[styles.headerContainer, { backgroundColor: isDarkMode ? "#1E1E1E" : "#B1CB14" }]}>
        <TouchableOpacity onPress={backToHome}>
          <Image source={Back} style={styles.backButton} />
        </TouchableOpacity>
      </View>
      <View style={styles.detailsContainer}>
        <Image
          source={{ uri: image }}
          style={styles.bookImage}
        />
        <Text style={[styles.title, { color: isDarkMode ? "white" : "black" }]}>{title}</Text>
        <Text style={[styles.author, { color: isDarkMode ? "gray" : "gray" }]}>{author}</Text>
        <Image style={styles.star} source={Star} />
        <Text style={[styles.rating, { color: isDarkMode ? "gray" : "gray" }]}>{rating}</Text>
        <TouchableOpacity onPress={goToPdf}>
          <Text style={[styles.readNowButton, { backgroundColor: isDarkMode ? "#333" : "#B1CB14" }]}>
            Read Now
          </Text>
        </TouchableOpacity>
        <Text style={[styles.description, { color: isDarkMode ? "white" : "black" }]}>{description}</Text>
      </View>
      <View style={[styles.featuredBooksContainer, { backgroundColor: isDarkMode ? "#1E1E1E" : "#B1CB14" }]}>
        <Text style={[styles.moreBooksText, { color: isDarkMode ? "white" : "white" }]}>
          More Books
        </Text>
        {featuredBooks.map((book) => (
          <TouchableOpacity key={book.id} style={styles.bookItemVertical}>
            <Image source={book.image} style={styles.bookImageVertical} />
            <Text style={[styles.bookTitle, { color: isDarkMode ? "white" : "white" }]}>{book.title}</Text>
            <TouchableOpacity>
              <Text style={[styles.readNowButtonVertical, { backgroundColor: isDarkMode ? "#333" : "white", color: isDarkMode ? "white" : "#B1CB14" }]}>
                Read Now
              </Text>
            </TouchableOpacity>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    height: "20%",
    borderRadius: 70,
    marginTop: -50,
  },
  backButton: {
    position: "absolute",
    marginTop: 95,
    marginLeft: 30,
    width: 30,
    height: 30,
  },
  detailsContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  bookImage: {
    width: 130,
    height: 175,
    borderRadius: 20,
    marginRight: 180,
    marginTop: 130,
  },
  title: {
    marginLeft: 160,
    fontSize: 25,
    top: -160,
    fontWeight: "bold",
  },
  author: {
    marginLeft: 160,
    fontSize: 22,
    top: -160,
  },
  star: {
    marginLeft: 80,
    width: 30,
    height: 30,
    top: -150,
  },
  rating: {
    marginLeft: 160,
    fontSize: 22,
    top: -180,
    fontWeight: "bold",
  },
  readNowButton: {
    color: "white",
    marginTop: -170,
    left: 80,
    fontSize: 15,
    fontWeight: "bold",
    padding: 12,
    textAlign: "center",
    borderRadius: 15,
    width: "70%",
  },
  description: {
    width: "80%",
    marginLeft: 0,
    top: -70,
  },
  featuredBooksContainer: {
    height: "45%",
    borderRadius: 75,
    top: 70,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  moreBooksText: {
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold",
    top: 20,
    position: "absolute",
  },
  bookItemVertical: {
    margin: 10,
    alignItems: "center",
  },
  bookImageVertical: {
    width: 90,
    height: 130,
    top: 60,
    borderRadius: 20,
  },
  bookTitle: {
    marginTop: 195,
    position: "absolute",
  },
  readNowButtonVertical: {
    color: "#B1CB14",
    marginTop: 90,
    left: 0,
    fontSize: 12,
    fontWeight: "bold",
    padding: 10,
    textAlign: "center",
    borderRadius: 20,
  },
});

export default BookDetails;
