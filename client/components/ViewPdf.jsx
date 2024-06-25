// import React, { useState } from 'react';
// import { View, Button, StyleSheet } from 'react-native';
// import { WebView } from 'react-native-webview';
// import AtomicHabits from '../android/app/src/main/assets/atomicHabits.pdf'
// import RichDad from '../android/app/src/main/assets/RichDadPoorDad.pdf'

// const App = () => {
//   const [showPdf, setShowPdf] = useState(false);

//   const handlePress = () => {
//     setShowPdf(true);
//   };

//   return (
//     <View style={styles.container}>
//       {!showPdf ? (
//         <Button title="Open PDF" onPress={handlePress} />
//       ) : (
//         <WebView
//           source={AtomicHabits}
//           style={{ flex: 1 }}
//         />
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });

// export default App;

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

const PdfScreen = ({ route }) => {
  const { pdfUri } = route.params;

  return (
    <View style={styles.container}>
      <WebView source={pdfUri } style={{ flex: 1 }} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PdfScreen;
