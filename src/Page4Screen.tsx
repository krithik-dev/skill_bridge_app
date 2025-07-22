import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Page4Screen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.pageText}>Page 4</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  pageText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default Page4Screen;