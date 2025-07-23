import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Platform,
} from 'react-native';

const AIMentorScreen = () => {
  // We'll use state to manage the status of our voice chat
  const [status, setStatus] = useState('Press the button to start talking.');
  const [isListening, setIsListening] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>AI Mentor</Text>
      <View style={styles.statusContainer}>
        <Text style={styles.statusText}>{status}</Text>
      </View>

      <View style={styles.micButtonContainer}>
        <TouchableOpacity style={styles.micButton}>
          <Text style={styles.micIcon}>🎙️</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
    alignItems: 'center',
    paddingTop: Platform.OS === 'android' ? 40 : 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 20,
  },
  statusContainer: {
    height: 100,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  statusText: {
    fontSize: 18,
    color: '#64748b',
    textAlign: 'center',
  },
  micButtonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  micButton: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#4F46E5',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  micIcon: {
    fontSize: 60,
  },
});

export default AIMentorScreen;