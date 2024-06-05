import { Dimensions, Text, View } from 'react-native';
import Pdf1 from '../assets/atomicHabits.pdf';
function PDFViewer({ route }) {
    const { pdfFile } = route.params;
    return (
    //   <PDFView
    //     fadeInDuration={250.0}
    //     style={{ flex: 1 }}
    //     resource={pdfFile}
    //     resourceType="file" // or "url" if you're loading a remote file
    //     onLoad={() => console.log(`PDF rendered from ${pdfFile}`)}
    //     onError={(error) => console.log('Cannot render PDF', error)}
    //   />
    <View>
        <Pdf1/>
        <Text>hi</Text>
    </View>
    );
  }
  export default PDFViewer;