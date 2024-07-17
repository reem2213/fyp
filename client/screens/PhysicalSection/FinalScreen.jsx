import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function FinalScreen({ route, navigation }) {
  const { age, gender, height ,weight , goal, medicalCondition, place } = route.params;

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://192.168.0.100:3001/formData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          age,
          gender,
          height,
          weight,
          goal,
          medicalCondition,
          place
        }),
      });

      if (response.ok) {
        const result = await response.json();
        Alert.alert('Success', 'Your data has been submitted');
        navigation.navigate('ResultScreen');
      } else {
        throw new Error('Something went wrong');
      }
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.circleTopLeft}></View>
      <View style={styles.circleTopRight}></View>
      <View style={styles.circleBottomLeft}></View>
      <View style={styles.circleBottomRight}></View>

      <View style={styles.content}>
        <Text style={styles.headerText}>Your Information</Text>

        <View style={styles.infoContainer}>
          <Text style={styles.infoTitle}>Gender:</Text>
          <Text style={styles.infoText}>{gender}</Text>
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.infoTitle}>Height:</Text>
          <Text style={styles.infoText}>{height} cm</Text>
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.infoTitle}>Goal:</Text>
          <Text style={styles.infoText}>{goal}</Text>
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.infoTitle}>Medical Condition:</Text>
          <Text style={styles.infoText}>{medicalCondition || "None"}</Text>
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.infoTitle}>Favorite Place to Exercise:</Text>
          <Text style={styles.infoText}>{place}</Text>
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
            onPress={handleSubmit}
          >
            <Text style={styles.nextButtonText}>Finish</Text>
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
    fontSize: 24,
    fontWeight: 'bold',
    color: '#087CEA',
    marginBottom: 20,
    textAlign: 'center',
  },
  infoContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  infoText: {
    fontSize: 16,
    color: '#555',
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

