import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  TouchableOpacity,
  Image,
  Linking,
} from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from './App';

const YOUTUBE_API_KEY = 'AIzaSyD7BT9vJFIGFd0C2KdVl1QDHAkT7q3bszI';
const GEMINI_API_KEY = 'AIzaSyBvSEofW-r5vO_wQS8PmdYwXkwES2XMdy8';

const topics = ['Data Science', 'Machine Learning', 'Python', 'AI', 'Finance'];

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

const fetchGeminiLinks = async (searchTerm: string) => {
  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [
              {
                text: `Give exactly 5 direct free course links from MIT and 5 from Harvard about "${searchTerm}". Respond ONLY in raw JSON array like this: [ { "title": "Course Title", "link": "https://example.com" }, ... ]`
              }
            ]
          }
        ]
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    const rawText = response.data.candidates?.[0]?.content?.parts?.[0]?.text || '';
    const jsonMatch = rawText.match(/\[\s*{[\s\S]*?}\s*\]/);
    if (!jsonMatch) {
      console.warn('Gemini response:', rawText);
      throw new Error('No JSON array found in Gemini response');
    }

    const parsed = JSON.parse(jsonMatch[0]);
    return parsed;
  } catch (error) {
    console.error('Gemini API Error:', error);
    return [];
  }
};

const Page2Screen = () => {
  const [query, setQuery] = useState('');
  const [videos, setVideos] = useState([]);
  const [geminiLinks, setGeminiLinks] = useState<{ title: string; link: string }[]>([]);
  const navigation = useNavigation<NavigationProp>();

  const searchYouTube = async (searchTerm: string) => {
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&q=learn full ${encodeURIComponent(
      searchTerm
    )} course in english&type=video&videoDuration=long&key=${YOUTUBE_API_KEY}`;
    try {
      const res = await axios.get(url);
      setVideos(res.data.items);

      const links = await fetchGeminiLinks(searchTerm);
      setGeminiLinks(links);
    } catch (err) {
      console.error('Error fetching videos or Gemini links', err);
    }
  };

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <TextInput
        value={query}
        onChangeText={setQuery}
        onSubmitEditing={() => searchYouTube(query)}
        placeholder="Search..."
        style={{
          borderWidth: 1,
          padding: 10,
          borderRadius: 6,
          marginBottom: 10,
        }}
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

        <View
          style={{
            marginTop: 40,
            padding: 20,
            backgroundColor: '#f0f0f0',
            borderRadius: 8,
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>
            Free Courses from MIT, Harvard & More
          </Text>
          {geminiLinks.length > 0 ? (
            geminiLinks.map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => Linking.openURL(item.link)}
                style={{
                  paddingVertical: 8,
                  borderBottomWidth: 1,
                  borderColor: '#ddd',
                }}
              >
                <Text style={{ color: '#007AFF' }}>{item.title}</Text>
              </TouchableOpacity>
            ))
          ) : (
            <View
              style={{
                height: 100,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text style={{ color: '#888' }}>
                Search a topic to load free courses from MIT, Harvard, etc.
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default Page2Screen;
