import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from './App';

const YOUTUBE_API_KEY = 'AIzaSyD7BT9vJFIGFd0C2KdVl1QDHAkT7q3bszI';
const topics = ['Data Science', 'Machine Learning', 'Python', 'AI', 'Finance'];

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

const Page2Screen = () => {
  const [query, setQuery] = useState('');
  const [videos, setVideos] = useState([]);
  const navigation = useNavigation<NavigationProp>();

  const searchYouTube = async (searchTerm: string) => {
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=4&q=learn full ${encodeURIComponent(
      searchTerm
    )} course in english&type=video&videoDuration=long&key=${YOUTUBE_API_KEY}`;
    const res = await axios.get(url);
    setVideos(res.data.items);
  };

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <TextInput
        value={query}
        onChangeText={setQuery}
        onSubmitEditing={() => searchYouTube(query)}
        placeholder="Search..."
        style={{ borderWidth: 1, padding: 10, borderRadius: 6, marginBottom: 10 }}
      />
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {topics.map((topic) => (
          <Button key={topic} title={topic} onPress={() => searchYouTube(topic)} />
        ))}
      </ScrollView>
      <ScrollView style={{ marginTop: 20 }}>
        {videos.map((video: any) => (
          <TouchableOpacity
            key={video.id.videoId}
            onPress={() =>
              navigation.navigate('Video', { videoId: video.id.videoId })
            }
            style={{ flexDirection: 'row', marginBottom: 15 }}
          >
            <Image
              source={{ uri: video.snippet.thumbnails.medium.url }}
              style={{ width: 120, height: 90, borderRadius: 6 }}
            />
            <View style={{ flex: 1, marginLeft: 10 }}>
              <Text numberOfLines={2} style={{ fontWeight: 'bold' }}>
                {video.snippet.title}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
        <View style={{ marginTop: 40, padding: 20, backgroundColor: '#f0f0f0', borderRadius: 8 }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Open Source Resource</Text>
            <View style={{ height: 100, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: '#888' }}>Coming soon...</Text>
            </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Page2Screen;
