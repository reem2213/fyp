import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, FlatList, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ITEM_HEIGHT = 40;
const { height } = Dimensions.get('window');

export default function AgeSelectionScreen({ route, navigation }) {
  const { gender } = route.params;
  const [selectedAge, setSelectedAge] = useState(20);
  const flatListRef = useRef();

  const ages = Array.from({ length: 100 }, (_, i) => i + 1);

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={item === selectedAge ? styles.selectedItemText : styles.itemText}>{item}</Text>
    </View>
  );

  useEffect(() => {
    scrollToSelectedAge();
  }, []);

  const scrollToSelectedAge = () => {
    const index = ages.findIndex(age => age === selectedAge);
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
        <Text style={styles.headerText}>How old are you?</Text>
        <Text style={styles.subHeaderText}>This helps us create your personalized plan</Text>

        <View style={styles.pickerContainer}>
          <FlatList
            data={ages}
            ref={flatListRef}
            keyExtractor={(item) => item.toString()}
            renderItem={renderItem}
            style={styles.picker}
            contentContainerStyle={styles.pickerContent}
            snapToOffsets={[...Array(ages.length).keys()].map((i) => i * ITEM_HEIGHT)}
            snapToAlignment="center"
            decelerationRate="fast"
            showsVerticalScrollIndicator={false}
            onMomentumScrollEnd={(event) => {
              const index = Math.round(event.nativeEvent.contentOffset.y / ITEM_HEIGHT);
              setSelectedAge(ages[index]);
            }}
            initialScrollIndex={selectedAge - 1}
            getItemLayout={(data, index) => (
              { length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index }
            )}
            onScrollToIndexFailed={() => {}}
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
              navigation.navigate('WeightScreen', { gender, age: selectedAge });
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
    color: '#87CEEB',
    marginBottom: 10,
    textAlign: 'center',
  },
  subHeaderText: {
    fontSize: 14,
    color: '#888',
    marginBottom: 40,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  pickerContainer: {
    height: ITEM_HEIGHT * 5, // Show 5 items
    alignItems: 'center',
    justifyContent: 'center',
  },
  picker: {
    width: '100%',
  },
  pickerContent: {
    paddingVertical: ITEM_HEIGHT * 2, // Center the items
  },
  item: {
    height: ITEM_HEIGHT,
    justifyContent: 'center',
  },
  itemText: {
    fontSize: 24,
    color: '#888',
    textAlign: 'center',
  },
  selectedItemText: {
    fontSize: 36,
    color: '#000',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  selectedItemBorder: {
    position: 'absolute',
    top: (ITEM_HEIGHT * 2.5) - (ITEM_HEIGHT / 2.5), // Center the border
    left: 0,
    right: 0,
    height: ITEM_HEIGHT,
    borderTopWidth: 1,
    borderBottomWidth: 1,
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
