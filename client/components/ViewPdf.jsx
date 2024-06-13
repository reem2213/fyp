// import { Dimensions, Text, View } from 'react-native';
// function PDFViewer({ route }) {
//     return (
//     //   <PDFView
//     //     fadeInDuration={250.0}
//     //     style={{ flex: 1 }}
//     //     resource={pdfFile}
//     //     resourceType="file" // or "url" if you're loading a remote file
//     //     onLoad={() => console.log(`PDF rendered from ${pdfFile}`)}
//     //     onError={(error) => console.log('Cannot render PDF', error)}
//     //   />
//     <View>
        
//         <Text style={{marginLeft:100,marginTop:100}}>hi</Text>
//     </View>
//     );
//   }
//   export default PDFViewer;


import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import Pdf from 'react-native-view-pdf';
import Atomichabit from '../assets/atomicHabits.pdf'
function PdfScreen({ route }) {

  return (
    <View style={{ flex: 1 }}>
      <Pdf
        resource={Atomichabit} // Use resource instead of source for react-native-view-pdf
        onLoadComplete={(numberOfPages, Atomichabit) => {
          console.log(`Number of pages: ${numberOfPages}`);
        }}
        onError={(error) => {
          console.log(error);
        }}
        style={{ flex: 1 }}
      />
    </View>
  );
}

export default PdfScreen;
