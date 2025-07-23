import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const PeerToPeerLearningScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Peer-to-Peer Learning Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
  },
  text: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1e293b',
  },
});

export default PeerToPeerLearningScreen;