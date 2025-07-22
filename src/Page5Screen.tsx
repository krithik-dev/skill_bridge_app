import React from 'react';
import { useAuth } from './AuthContext';
import { View, Text, StyleSheet } from 'react-native';
import {TouchableOpacity} from 'react-native';
const Page5Screen: React.FC = () => {
    const { user, signOut } = useAuth();
    const handleSignOut = async (): Promise<void> => {
        await signOut();
    };
  return (
    <View style={styles.container}>
      <Text style={styles.pageText}>Page 5</Text>
        <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
            <Text>Sign Out</Text>
        </TouchableOpacity>
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
  signOutButton: {
    backgroundColor: '#FF3B30',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 6,
  },
});

export default Page5Screen;
