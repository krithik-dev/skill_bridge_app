import React, { useMemo, useRef } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { WebView } from 'react-native-webview';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';

const { height } = Dimensions.get('window');

const Tab = createMaterialTopTabNavigator();

const VideoPlayer = ({ videoId }: { videoId: string }) => {
  const embedUrl = `https://www.youtube.com/embed/${videoId}?controls=1&fs=0&modestbranding=1&rel=0&showinfo=0`;

  const webviewRef = useRef(null);

  const videoComponent = useMemo(() => (
    <WebView
      ref={webviewRef}
      source={{ uri: embedUrl }}
      style={styles.webView}
      javaScriptEnabled
      domStorageEnabled
      allowsFullscreenVideo={false}
      mediaPlaybackRequiresUserAction={false}
    />
  ), []);

  return videoComponent;
};

const TabPage1 = () => <View style={styles.tabPage}></View>;
const TabPage2 = () => <View style={styles.tabPage}></View>;


const VideoTabs = () => (
  <Tab.Navigator>
    <Tab.Screen name="Page 1" component={TabPage1} />
    <Tab.Screen name="Page 2" component={TabPage2} />
  </Tab.Navigator>
);

const VideoScreen = ({ route }: { route: any }) => {
  const { videoId } = route.params;

  return (
    <View style={{ flex: 1 }}>
      <View style={{ height: height * 0.3 }}>
        <VideoPlayer videoId={videoId} />
      </View>
      <View style={{ flex: 1 }}>
        <VideoTabs />
      </View>
    </View>
  );
};

export default VideoScreen;

const styles = StyleSheet.create({
  webView: {
    flex: 1,
  },
  tabPage: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
