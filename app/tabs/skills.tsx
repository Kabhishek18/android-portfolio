// app/tabs/skills.tsx
import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Animated,
} from 'react-native';
import { portfolioData } from '../../constants/portfolioData';

interface Skill {
  name: string;
  level: number;
  category: string;
}

const SkillCard = ({ skill }: { skill: Skill }) => {
  const animatedValue = new Animated.Value(0);

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: skill.level,
      duration: 1500,
      useNativeDriver: false,
    }).start();
  }, [skill.level]);

  const progressWidth = animatedValue.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
    extrapolate: 'clamp',
  });

  return (
    <View style={styles.skillCard}>
      <View style={styles.skillHeader}>
        <Text style={styles.skillName}>{skill.name}</Text>
        <Text style={styles.skillLevel}>{skill.level}%</Text>
      </View>

      <View style={styles.progressBarContainer}>
        <Animated.View
          style={[
            styles.progressBar,
            { width: progressWidth }
          ]}
        />
      </View>
    </View>
  );
};

export default function SkillsScreen() {
  // Group skills by proficiency level
  const expertSkills = portfolioData.skills.filter(skill => skill.category === 'expert');
  const intermediateSkills = portfolioData.skills.filter(skill => skill.category === 'intermediate');
  const learningSkills = portfolioData.skills.filter(skill => skill.category === 'learning');

  const renderSection = (title: string, skills: Skill[], color: string) => (
    <View style={styles.section} key={title}>
      <View style={[styles.sectionHeader, { backgroundColor: color }]}>
        <Text style={styles.sectionTitle}>{title}</Text>
      </View>
      <View style={styles.sectionContent}>
        {skills.map((skill, index) => (
          <SkillCard key={skill.name} skill={skill} />
        ))}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Technical Skills</Text>
        <Text style={styles.headerSubtitle}>
          My expertise across different technologies
        </Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        {expertSkills.length > 0 && renderSection('Expert Level', expertSkills, '#28a745')}
        {intermediateSkills.length > 0 && renderSection('Intermediate Level', intermediateSkills, '#ffc107')}
        {learningSkills.length > 0 && renderSection('Learning', learningSkills, '#17a2b8')}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#666',
  },
  scrollContainer: {
    paddingBottom: 30,
  },
  section: {
    marginTop: 20,
    marginHorizontal: 15,
    borderRadius: 15,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionHeader: {
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  sectionContent: {
    backgroundColor: '#fff',
  },
  skillCard: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  skillHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  skillName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  skillLevel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: '#e9ecef',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#007AFF',
    borderRadius: 4,
  },
});