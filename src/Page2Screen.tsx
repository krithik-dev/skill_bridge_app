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
                text: `Find 3 actual free courses from Harvard (edX, Harvard Extension, or Harvard OpenCourseWare) and 3 from MIT (MIT OpenCourseWare or edX) related to "${searchTerm}". 

For each course, provide:
1. The exact course title as it appears on the website
2. The direct URL to the course page
3. Make sure these are real, accessible courses

Respond in this exact JSON format:
[
  {
    "title": "Exact Course Title",
    "link": "https://actual-course-url.com",
    "institution": "Harvard" or "MIT"
  }
]

Only include courses that are currently available and free to audit or access. Do not create fictional links.`
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
    console.log('Gemini Raw Response:', rawText);
    
    // Try to extract JSON from the response
    let jsonMatch = rawText.match(/\[\s*{[\s\S]*?}\s*\]/);
    
    if (!jsonMatch) {
      // If no JSON array found, try to extract individual course information
      const coursePattern = /(?:title|Title):\s*"([^"]+)"[\s\S]*?(?:link|Link|URL|url):\s*"([^"]+)"/g;
      const courses = [];
      let match;
      
      while ((match = coursePattern.exec(rawText)) !== null && courses.length < 6) {
        courses.push({
          title: match[1],
          link: match[2],
          institution: courses.length < 3 ? 'Harvard' : 'MIT'
        });
      }
      
      if (courses.length > 0) {
        return courses;
      }
      
      // Fallback: provide some known free courses
      return [
        {
          title: "CS50's Introduction to Computer Science",
          link: "https://cs50.harvard.edu/x/",
          institution: "Harvard"
        },
        {
          title: "Introduction to Data Science with Python",
          link: "https://www.edx.org/course/introduction-to-data-science-with-python",
          institution: "Harvard"
        },
        {
          title: "CS50's Web Programming with Python and JavaScript",
          link: "https://cs50.harvard.edu/web/",
          institution: "Harvard"
        },
        {
          title: "Introduction to Computer Science and Programming Using Python",
          link: "https://www.edx.org/course/introduction-to-computer-science-and-programming-7",
          institution: "MIT"
        },
        {
          title: "Calculus 1A: Differentiation",
          link: "https://www.edx.org/course/calculus-1a-differentiation",
          institution: "MIT"
        },
        {
          title: "Introduction to Algorithms",
          link: "https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-fall-2011/",
          institution: "MIT"
        }
      ];
    }

    const parsed = JSON.parse(jsonMatch[0]);
    
    // Validate that we have valid links
    const validCourses = parsed.filter((course: { title: string; link: string; institution?: string }) => 
      course.link && 
      course.title && 
      (course.link.startsWith('http://') || course.link.startsWith('https://'))
    );
    
    return validCourses.length > 0 ? validCourses : [];
  } catch (error) {
    console.error('Gemini API Error:', error);
    
    // Return fallback courses if API fails
    return [
      {
        title: "CS50's Introduction to Computer Science",
        link: "https://cs50.harvard.edu/x/",
        institution: "Harvard"
      },
      {
        title: "Introduction to Data Science with Python",
        link: "https://www.edx.org/course/introduction-to-data-science-with-python",
        institution: "Harvard"
      },
      {
        title: "CS50's Web Programming with Python and JavaScript",
        link: "https://cs50.harvard.edu/web/",
        institution: "Harvard"
      },
      {
        title: "Introduction to Computer Science and Programming Using Python",
        link: "https://www.edx.org/course/introduction-to-computer-science-and-programming-7",
        institution: "MIT"
      },
      {
        title: "Machine Learning with Python",
        link: "https://www.edx.org/course/machine-learning-with-python-from-linear-models-to",
        institution: "MIT"
      },
      {
        title: "Introduction to Algorithms",
        link: "https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-fall-2011/",
        institution: "MIT"
      }
    ];
  }
};

const Page2Screen = () => {
  const [query, setQuery] = useState('');
  const [videos, setVideos] = useState([]);
  const [geminiLinks, setGeminiLinks] = useState<{ title: string; link: string; institution?: string }[]>([]);
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
                  paddingVertical: 12,
                  paddingHorizontal: 8,
                  marginVertical: 4,
                  backgroundColor: '#fff',
                  borderRadius: 6,
                  borderLeftWidth: 3,
                  borderLeftColor: item.institution === 'Harvard' ? '#A51C30' : '#8A1538',
                }}
              >
                <Text style={{ color: '#007AFF', fontWeight: '600', fontSize: 14 }}>
                  {item.title}
                </Text>
                {item.institution && (
                  <Text style={{ 
                    color: '#666', 
                    fontSize: 12, 
                    marginTop: 2,
                    fontStyle: 'italic' 
                  }}>
                    {item.institution}
                  </Text>
                )}
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