// screens/Page1Screen.tsx

import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { ProgressBar } from 'react-native-paper';
import { supabase } from '../src/supabaseClient'; // make sure you have this
import { Session, User } from '@supabase/supabase-js';

// Types
interface UserMeta {
  id: string;
  xp: number;
  streak: number;
  energy: number;
}

interface Course {
  id: string;
  title: string;
  description?: string;
}

interface Section {
  id: string;
  course_id: string;
  title: string;
  order_num: number;
}

interface Unit {
  id: string;
  section_id: string;
  title: string;
  type: 'lesson' | 'quiz';
  order_num: number;
}

interface Progress {
  id: string;
  user_id: string;
  unit_id: string;
  completed: boolean;
  unlocked: boolean;
  score?: number;
}

const Page1Screen: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [userData, setUserData] = useState<UserMeta | null>(null);
  const [courses, setCourses] = useState<Course[]>([]);
  const [sections, setSections] = useState<Section[]>([]);
  const [units, setUnits] = useState<Unit[]>([]);
  const [progress, setProgress] = useState<Progress[]>([]);
  const [activeCourse, setActiveCourse] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (!user) {
      console.error('No user found', userError);
      return;
    }

    const { data: userMeta } = await supabase
      .from('users')
      .select('*')
      .eq('id', user.id)
      .single();
    setUserData(userMeta);

    const { data: courseList } = await supabase.from('courses').select('*');
    setCourses(courseList || []);
    setActiveCourse(courseList?.[0]?.id || null);

    const { data: sectionList } = await supabase
      .from('sections')
      .select('*')
      .order('order_num');
    setSections(sectionList || []);

    const { data: unitList } = await supabase
      .from('units')
      .select('*')
      .order('order_num');
    setUnits(unitList || []);

    const { data: userProgress } = await supabase
      .from('user_progress')
      .select('*')
      .eq('user_id', user.id);
    setProgress(userProgress || []);

    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const getCourseProgress = (courseId: string): number => {
    const courseSections = sections.filter((s) => s.course_id === courseId);
    const courseUnits = units.filter((u) =>
      courseSections.some((s) => s.id === u.section_id)
    );
    const completed = courseUnits.filter((u) =>
      progress.find((p) => p.unit_id === u.id && p.completed)
    );
    return courseUnits.length === 0
      ? 0
      : completed.length / courseUnits.length;
  };

  const renderUnitBlock = (unit: Unit) => {
    const unitProgress = progress.find((p) => p.unit_id === unit.id);
    const isUnlocked = unitProgress?.unlocked;
    const isCompleted = unitProgress?.completed;

    return (
      <TouchableOpacity
        key={unit.id}
        style={[
          styles.unitBlock,
          !isUnlocked && styles.lockedUnit,
          isCompleted && styles.completedUnit,
        ]}
        disabled={!isUnlocked}
        onPress={() => {
          // Navigate to unit screen here
          console.log('Go to unit:', unit.title);
        }}
      >
        <Text style={{ color: isUnlocked ? '#000' : '#aaa' }}>
          {unit.title} {unit.type === 'quiz' ? '📝' : '📘'}
        </Text>
      </TouchableOpacity>
    );
  };

  if (loading) return <ActivityIndicator size="large" style={{ marginTop: 100 }} />;

  const currentCourse = courses.find((c) => c.id === activeCourse);
  const currentSections = sections.filter((s) => s.course_id === activeCourse);
  const currentSection = currentSections[0]; // You can add UI to switch later
  const sectionUnits = units.filter((u) => u.section_id === currentSection?.id);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.topBar}>
        <Text>🔥 XP: {userData?.xp ?? 0}</Text>
        <Text>📅 Streak: {userData?.streak ?? 0}</Text>
        <Text>⚡ Energy: {userData?.energy ?? 0}</Text>
      </View>

      <ScrollView horizontal style={styles.courseRow}>
        {courses.map((course) => (
          <TouchableOpacity
            key={course.id}
            style={[
              styles.courseTag,
              activeCourse === course.id && styles.activeCourseTag,
            ]}
            onPress={() => setActiveCourse(course.id)}
          >
            <Text style={{ color: activeCourse === course.id ? '#fff' : '#000' }}>
              {course.title}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>{currentCourse?.title}</Text>
        <ProgressBar
          progress={getCourseProgress(currentCourse?.id ?? '')}
          color="#4CAF50"
          style={{ height: 10, marginTop: 10 }}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{currentSection?.title}</Text>
        {sectionUnits.map(renderUnitBlock)}
      </View>
    </ScrollView>
  );
};

export default Page1Screen;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    flex: 1,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  courseRow: {
    marginBottom: 16,
  },
  courseTag: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: '#eee',
    borderRadius: 20,
    marginRight: 10,
  },
  activeCourseTag: {
    backgroundColor: '#4CAF50',
  },
  card: {
    padding: 16,
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    marginBottom: 20,
  },
  cardTitle: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  section: {
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  unitBlock: {
    padding: 14,
    backgroundColor: '#e3f2fd',
    borderRadius: 10,
    marginBottom: 8,
  },
  lockedUnit: {
    backgroundColor: '#f0f0f0',
  },
  completedUnit: {
    backgroundColor: '#c8e6c9',
  },
});
