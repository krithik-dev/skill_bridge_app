import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../src/HomeScreen';
import VideoScreen from '../src/VideoScreen';

export type RootStackParamList = {
  Home: undefined;
  Video: { videoId: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Video" component={VideoScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
