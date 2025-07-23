import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

// --- 1. IMPORTING your separate screen files ---
// Make sure this path is correct based on your project structure.
import AIMentorScreen from '../src/third_pages/AIMentorScreen';
import AIResumeCheckScreen from '../src/third_pages/AIResumeCheckScreen';
import AIRoadmapScreen from '../src/third_pages/AIRoadmapScreen';
import PeerToPeerLearningScreen from '../src/third_pages/PeerToPeerLearningScreen';

// Defines the routes available within this specific navigator
export type Page3StackParamList = {
  Main: undefined;
  AIMentor: undefined;
  AIResumeCheck: undefined;
  AIRoadmap: undefined;
  PeerToPeerLearning: undefined;
};

const Stack = createNativeStackNavigator<Page3StackParamList>();
type MainPageNavigationProp = NativeStackNavigationProp<Page3StackParamList>;

// --- 2. THE UI YOU WANT ---
// This component is the styled main menu.
const MainPage3Component = () => {
  const navigation = useNavigation<MainPageNavigationProp>();

  const sections = [
    { id: 1, title: 'AI Mentor', description: 'Get personalized guidance from AI-powered mentors', icon: '🤖', color: '#4F46E5', route: 'AIMentor' as keyof Page3StackParamList },
    { id: 2, title: 'AI Resume Check', description: 'Optimize your resume with AI-powered analysis', icon: '📄', color: '#059669', route: 'AIResumeCheck' as keyof Page3StackParamList },
    { id: 3, title: 'AI Roadmap', description: 'Create personalized learning paths with AI assistance', icon: '🗺️', color: '#DC2626', route: 'AIRoadmap' as keyof Page3StackParamList },
    { id: 4, title: 'Peer-to-Peer Learning', description: 'Connect and learn with fellow students', icon: '👥', color: '#7C3AED', route: 'PeerToPeerLearning' as keyof Page3StackParamList },
  ];

  const handleSectionPress = (route: keyof Page3StackParamList) => {
    navigation.navigate(route);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Learning Tools</Text>
        <Text style={styles.headerSubtitle}>
          Choose from our AI-powered learning tools
        </Text>
      </View>
      <View style={styles.sectionsContainer}>
        {sections.map((section) => (
          <TouchableOpacity key={section.id} style={[styles.sectionBlock, { borderLeftColor: section.color }]} onPress={() => handleSectionPress(section.route)} activeOpacity={0.7}>
            <View style={styles.sectionContent}>
              <View style={styles.iconContainer}><Text style={styles.sectionIcon}>{section.icon}</Text></View>
              <View style={styles.textContainer}><Text style={styles.sectionTitle}>{section.title}</Text><Text style={styles.sectionDescription}>{section.description}</Text></View>
              <View style={styles.arrowContainer}><Text style={styles.arrow}>→</Text></View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

// --- 3. THE NAVIGATOR ---
// This is the main export. It sets up the Stack Navigator and uses the UI and imported screens correctly.
const Page3Screen = () => {
  return (
    <Stack.Navigator
      initialRouteName="Main"
      screenOptions={{
        headerTitleAlign: 'center',
        headerStyle: { backgroundColor: '#ffffff' },
        headerTintColor: '#1e293b',
        headerTitleStyle: { fontWeight: 'bold' },
      }}
    >
      <Stack.Screen name="Main" component={MainPage3Component} options={{ headerShown: false }} />
      <Stack.Screen name="AIMentor" component={AIMentorScreen} options={{ title: 'AI Mentor' }} />
      <Stack.Screen name="AIResumeCheck" component={AIResumeCheckScreen} options={{ title: 'AI Resume Check' }} />
      <Stack.Screen name="AIRoadmap" component={AIRoadmapScreen} options={{ title: 'AI Roadmap' }} />
      <Stack.Screen name="PeerToPeerLearning" component={PeerToPeerLearningScreen} options={{ title: 'Peer-to-Peer Learning' }} />
    </Stack.Navigator>
  );
};

// --- 4. THE STYLES ---
// These styles are for the MainPage3Component UI.
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  header: { padding: 20, paddingTop: 40, backgroundColor: '#ffffff', borderBottomWidth: 1, borderBottomColor: '#e2e8f0' },
  headerTitle: { fontSize: 28, fontWeight: 'bold', color: '#1e293b', marginBottom: 8 },
  headerSubtitle: { fontSize: 16, color: '#64748b', lineHeight: 24 },
  sectionsContainer: { padding: 20, gap: 16 },
  sectionBlock: { backgroundColor: '#ffffff', borderRadius: 12, padding: 20, borderLeftWidth: 4, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 3.84, elevation: 5 },
  sectionContent: { flexDirection: 'row', alignItems: 'center' },
  iconContainer: { width: 50, height: 50, borderRadius: 25, backgroundColor: '#f1f5f9', justifyContent: 'center', alignItems: 'center', marginRight: 16 },
  sectionIcon: { fontSize: 24 },
  textContainer: { flex: 1 },
  sectionTitle: { fontSize: 18, fontWeight: '600', color: '#1e293b', marginBottom: 4 },
  sectionDescription: { fontSize: 14, color: '#64748b', lineHeight: 20 },
  arrowContainer: { marginLeft: 12 },
  arrow: { fontSize: 20, color: '#94a3b8', fontWeight: 'bold' },
});

export default Page3Screen;