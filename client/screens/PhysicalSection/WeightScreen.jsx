import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, FlatList, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ITEM_WIDTH = 48; // Adjusted to match the design
const { width } = Dimensions.get('window');

export default function WeightSelectionScreen({ route, navigation }) {
  const { age ,gender } = route.params || {};
  const [selectedWeight, setSelectedWeight] = useState(54);
  const flatListRef = useRef();

  const weights = Array.from({ length: 200 }, (_, i) => i + 1);

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      {item % 5 === 0 ? (
        <Text style={item === selectedWeight ? styles.selectedItemText : styles.itemText}>{item}</Text>
      ) : (
        <View style={styles.markContainer}>
          <View style={item % 5 === 0 ? styles.longMark : styles.shortMark} />
        </View>
      )}
    </View>
  );

  useEffect(() => {
    setTimeout(scrollToSelectedWeight, 100); // Ensure the FlatList has rendered before scrolling
  }, []);

  const scrollToSelectedWeight = () => {
    const index = weights.findIndex(weight => weight === selectedWeight);
    if (flatListRef.current) {
      flatListRef.current.scrollToIndex({ index, animated: true });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.circleTopLeft}></View>
      <View style={styles.circleTopRight}></View>
      <View style={styles.circleBottomLeft}></View>
      <View style={styles.circleBottomRight}></View>

      <View style={styles.content}>
        <Text style={styles.headerText}>What’s your weight?</Text>
        <Text style={styles.subHeaderText}>You can always change this later</Text>

        <Text style={styles.selectedWeightText}>{selectedWeight} <Text style={styles.unitText}>kg</Text></Text>

        <View style={styles.pickerContainer}>
          <FlatList
            data={weights}
            ref={flatListRef}
            keyExtractor={(item) => item.toString()}
            renderItem={renderItem}
            horizontal
            snapToOffsets={[...Array(weights.length).keys()].map((i) => i * ITEM_WIDTH)}
            snapToAlignment="center"
            decelerationRate="fast"
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={(event) => {
              const index = Math.round(event.nativeEvent.contentOffset.x / ITEM_WIDTH);
              setSelectedWeight(weights[index]);
            }}
            initialScrollIndex={selectedWeight - 1}
            getItemLayout={(data, index) => (
              { length: ITEM_WIDTH, offset: ITEM_WIDTH * index, index }
            )}
          />
          <View style={styles.selectedItemBorder} />
        </View>

        <View style={styles.navigationButtons}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={20} color="white" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.nextButton}
            onPress={() => {
              navigation.navigate('HeightScreen', { age, gender, weight: selectedWeight });
            }}
          >
            <Text style={styles.nextButtonText}>Next</Text>
            <Ionicons name="arrow-forward" size={20} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#719AEA',
    marginBottom: 10,
    textAlign: 'center',
  },
  subHeaderText: {
    fontSize: 14,
    color: '#888',
    marginBottom: 20,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  selectedWeightText: {
    fontSize: 54,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 20,
    textAlign: 'center',
  },
  unitText: {
    fontSize: 24,
    fontWeight: 'normal',
    color: '#000',
  },
  pickerContainer: {
    height: 100,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  picker: {
    width: '100%',
  },
  item: {
    width: ITEM_WIDTH,
    justifyContent: 'center',
    alignItems: 'center',
  },
  markContainer: {
    height: '100%',
    justifyContent: 'center',
  },
  itemText: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
  },
  selectedItemText: {
    fontSize: 16,
    color: '#000',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  shortMark: {
    width: 1,
    height: 20,
    backgroundColor: '#719AEA',
  },
  longMark: {
    width: 1,
    height: 30,
    backgroundColor: '#719AEA',
  },
  selectedItemBorder: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: ITEM_WIDTH,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: '#083EA7',
  },
  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginTop: 20,
  },
  backButton: {
    flexDirection: 'row',
    backgroundColor: '#000000',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    alignItems: 'center',
  },
  nextButton: {
    flexDirection: 'row',
    backgroundColor: '#083EA7',
    paddingHorizontal: 40,
    paddingVertical: 10,
    borderRadius: 20,
    alignItems: 'center',
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 5,
  },
  circleTopLeft: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#719AEA',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  circleTopRight: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#719AEA',
    position: 'absolute',
    top: 0,
    right: 0,
  },
  circleBottomLeft: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#719AEA',
    position: 'absolute',
    bottom: 0,
    left: 0,
  },
  circleBottomRight: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#719AEA',
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
});
