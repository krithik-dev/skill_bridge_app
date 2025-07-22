import React from 'react';
import { AuthProvider, useAuth } from './AuthContext';
import AuthScreen from './AuthScreen';
import HomeScreen from './HomeScreen';
import { View, ActivityIndicator } from 'react-native';

const AppContent: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return user ? <HomeScreen /> : <AuthScreen />;
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;