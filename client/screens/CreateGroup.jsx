import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

export default function CreateGroupScreen({ navigation,route }) {
  const [groupName, setGroupName] = useState('');
  const [description, setDescription] = useState('');
  const [members, setMembers] = useState(['']); // Start with one empty member input
  const {username,userId}=route.params
  const handleCreateGroup = async () => {
    try {
      const response = await axios.post('http://10.0.0.21:3001/groups', {
        name: groupName,
        description,
        members: members.map((username) => ({ userId: username })), // Assuming usernames are used
      });

      Alert.alert('Success', 'Group created successfully!');
      navigation.navigate('Community',{username,userId}); // Assuming you have a Community screen
    } catch (error) {
      console.error("Error creating group:", error);
      Alert.alert('Error', 'Failed to create group');
    }
  };

  const addMemberField = () => {
    setMembers([...members, '']);
  };

  const updateMember = (index, value) => {
    const updatedMembers = [...members];
    updatedMembers[index] = value;
    setMembers(updatedMembers);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Group Name:</Text>
      <TextInput
        style={styles.input}
        value={groupName}
        onChangeText={setGroupName}
        placeholder="Enter group name"
        placeholderTextColor="#888"
      />

      <Text style={styles.label}>Description:</Text>
      <TextInput
        style={styles.input}
        value={description}
        onChangeText={setDescription}
        placeholder="Enter group description"
        placeholderTextColor="#888"
      />

      <Text style={styles.label}>Members:</Text>
      {members.map((member, index) => (
        <TextInput
          key={index}
          style={styles.input}
          value={member}
          onChangeText={(value) => updateMember(index, value)}
          placeholder={`Member ${index + 1} username`}
          placeholderTextColor="#888"
        />
      ))}
      <TouchableOpacity onPress={addMemberField} style={styles.addButton}>
        <Text style={styles.addButtonText}>Add Another Member</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleCreateGroup} style={styles.createButton}>
        <Text style={styles.createButtonText}>Create Group</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#121212',
  },
  label: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#1E1E1E',
    color: '#fff',
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
    borderColor: '#333',
    borderWidth: 1,
  },
  addButton: {
    backgroundColor: '#4A90E2',
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
  addButtonText: {
    color: '#fff',
    textAlign: 'center',
  },
  createButton: {
    backgroundColor: '#28a745',
    padding: 15,
    borderRadius: 5,
  },
  createButtonText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
});
