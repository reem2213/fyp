import React from 'react';
import { Text, View, FlatList, StyleSheet } from 'react-native';

const CommunityJoined = ({ route }) => {
  const { joinedGroups } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Communities Joined</Text>
      {joinedGroups.length > 0 ? (
        <FlatList
          data={joinedGroups}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <View style={styles.groupItem}>
              <Text style={styles.groupName}>{item.name}</Text>
              <Text style={styles.groupMembers}>{`${item.members?.length || 0} participants`}</Text>
            </View>
          )}
        />
      ) : (
        <Text style={styles.noGroupsText}>No groups joined yet.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    alignItems: 'center',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  groupItem: {
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 10,
    width: '90%',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    alignItems: 'center',
  },
  groupName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  groupMembers: {
    fontSize: 14,
    color: '#888',
  },
  noGroupsText: {
    fontSize: 16,
    color: '#888',
  },
});

export default CommunityJoined;
