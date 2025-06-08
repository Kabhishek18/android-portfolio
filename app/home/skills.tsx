// app/tabs/skills.tsx
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Animated,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { portfolioData } from '../../constants/portfolioData';

const { width } = Dimensions.get('window');

interface Skill {
  name: string;
  level: number;
  category: string;
  icon: string;
}

const SkillCard = ({ skill, index }: { skill: Skill; index: number }) => {
  const animatedValue = new Animated.Value(0);
  const scaleValue = new Animated.Value(0);

  useEffect(() => {
    // Stagger animations
    const delay = index * 100;

    setTimeout(() => {
      Animated.parallel([
        Animated.timing(animatedValue, {
          toValue: skill.level,
          duration: 1500,
          useNativeDriver: false,
        }),
        Animated.spring(scaleValue, {
          toValue: 1,
          tension: 50,
          friction: 7,
          useNativeDriver: true,
        }),
      ]).start();
    }, delay);
  }, [skill.level, index]);

  const progressWidth = animatedValue.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
    extrapolate: 'clamp',
  });

  const getSkillColor = (level: number) => {
    if (level >= 90) return '#4CAF50';
    if (level >= 80) return '#2196F3';
    if (level >= 70) return '#FF9800';
    return '#9C27B0';
  };

  return (
    <Animated.View
      style={[
        styles.skillCard,
        { transform: [{ scale: scaleValue }] }
      ]}
    >
      <View style={styles.skillHeader}>
        <View style={styles.skillTitleContainer}>
          <Text style={styles.skillIcon}>{skill.icon}</Text>
          <Text style={styles.skillName}>{skill.name}</Text>
        </View>
        <View style={styles.levelContainer}>
          <Text style={[styles.skillLevel, { color: getSkillColor(skill.level) }]}>
            {skill.level}%
          </Text>
        </View>
      </View>

      <View style={styles.progressBarContainer}>
        <Animated.View
          style={[
            styles.progressBar,
            {
              width: progressWidth,
              backgroundColor: getSkillColor(skill.level)
            }
          ]}
        />
      </View>

      <View style={styles.skillFooter}>
        <Text style={styles.proficiencyText}>
          {skill.level >= 90 ? 'Expert' :
           skill.level >= 80 ? 'Advanced' :
           skill.level >= 70 ? 'Intermediate' : 'Learning'}
        </Text>
      </View>
    </Animated.View>
  );
};

const CategoryHeader = ({ title, color, count }: { title: string; color: string; count: number }) => (
  <View style={[styles.categoryHeader, { backgroundColor: color }]}>
    <Text style={styles.categoryTitle}>{title}</Text>
    <View style={styles.countBadge}>
      <Text style={styles.countText}>{count}</Text>
    </View>
  </View>
);

export default function SkillsScreen() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Expert', 'Intermediate', 'Learning'];

  // Group skills by proficiency level
  const expertSkills = portfolioData.skills.filter(skill => skill.level >= 80);
  const intermediateSkills = portfolioData.skills.filter(skill => skill.level >= 60 && skill.level < 80);
  const learningSkills = portfolioData.skills.filter(skill => skill.level < 60);

  const getFilteredSkills = () => {
    switch (selectedCategory) {
      case 'Expert': return expertSkills;
      case 'Intermediate': return intermediateSkills;
      case 'Learning': return learningSkills;
      default: return portfolioData.skills;
    }
  };

  const filteredSkills = getFilteredSkills();

  const renderCategoryButton = (category: string) => (
    <TouchableOpacity
      key={category}
      style={[
        styles.categoryButton,
        selectedCategory === category && styles.activeCategoryButton
      ]}
      onPress={() => setSelectedCategory(category)}
    >
      <Text style={[
        styles.categoryButtonText,
        selectedCategory === category && styles.activeCategoryButtonText
      ]}>
        {category}
      </Text>
    </TouchableOpacity>
  );

  const renderSkillsSection = (title: string, skills: Skill[], color: string) => {
    if (skills.length === 0) return null;

    return (
      <View style={styles.section} key={title}>
        <CategoryHeader title={title} color={color} count={skills.length} />
        <View style={styles.sectionContent}>
          {skills.map((skill, index) => (
            <SkillCard key={skill.name} skill={skill} index={index} />
          ))}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Technical Skills</Text>
        <Text style={styles.headerSubtitle}>
          {portfolioData.skills.length} technologies • {expertSkills.length} expert level
        </Text>
      </View>

      {/* Category Filter */}
      <View style={styles.filterContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterScrollView}
        >
          {categories.map(renderCategoryButton)}
        </ScrollView>
      </View>

      {/* Skills Overview Cards */}
      <View style={styles.overviewContainer}>
        <View style={styles.overviewCard}>
          <Text style={styles.overviewNumber}>{expertSkills.length}</Text>
          <Text style={styles.overviewLabel}>Expert Level</Text>
          <View style={[styles.overviewIndicator, { backgroundColor: '#4CAF50' }]} />
        </View>
        <View style={styles.overviewCard}>
          <Text style={styles.overviewNumber}>{intermediateSkills.length}</Text>
          <Text style={styles.overviewLabel}>Intermediate</Text>
          <View style={[styles.overviewIndicator, { backgroundColor: '#FF9800' }]} />
        </View>
        <View style={styles.overviewCard}>
          <Text style={styles.overviewNumber}>{learningSkills.length}</Text>
          <Text style={styles.overviewLabel}>Learning</Text>
          <View style={[styles.overviewIndicator, { backgroundColor: '#9C27B0' }]} />
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        {selectedCategory === 'All' ? (
          <>
            {expertSkills.length > 0 && renderSkillsSection('Expert Level (80%+)', expertSkills, '#4CAF50')}
            {intermediateSkills.length > 0 && renderSkillsSection('Intermediate Level (60-79%)', intermediateSkills, '#FF9800')}
            {learningSkills.length > 0 && renderSkillsSection('Learning (<60%)', learningSkills, '#9C27B0')}
          </>
        ) : (
          <View style={styles.section}>
            <CategoryHeader
              title={`${selectedCategory} Skills`}
              color={
                selectedCategory === 'Expert' ? '#4CAF50' :
                selectedCategory === 'Intermediate' ? '#FF9800' : '#9C27B0'
              }
              count={filteredSkills.length}
            />
            <View style={styles.sectionContent}>
              {filteredSkills.map((skill, index) => (
                <SkillCard key={skill.name} skill={skill} index={index} />
              ))}
            </View>
          </View>
        )}
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
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#666',
  },
  filterContainer: {
    backgroundColor: '#fff',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  filterScrollView: {
    paddingHorizontal: 15,
  },
  categoryButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginRight: 12,
    borderRadius: 25,
    backgroundColor: '#f8f9fa',
    borderWidth: 2,
    borderColor: '#e9ecef',
  },
  activeCategoryButton: {
    backgroundColor: '#667eea',
    borderColor: '#667eea',
  },
  categoryButtonText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '600',
  },
  activeCategoryButtonText: {
    color: '#fff',
  },
  overviewContainer: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    paddingVertical: 15,
    justifyContent: 'space-between',
  },
  overviewCard: {
    backgroundColor: '#fff',
    flex: 1,
    padding: 15,
    marginHorizontal: 5,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    position: 'relative',
  },
  overviewNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  overviewLabel: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    fontWeight: '500',
  },
  overviewIndicator: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 3,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  scrollContainer: {
    paddingBottom: 30,
  },
  section: {
    marginTop: 20,
    marginHorizontal: 15,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  categoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  countBadge: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
  },
  countText: {
    fontSize: 12,
    color: '#fff',
    fontWeight: '600',
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
    marginBottom: 12,
  },
  skillTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  skillIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  skillName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    flex: 1,
  },
  levelContainer: {
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
  },
  skillLevel: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  progressBarContainer: {
    height: 6,
    backgroundColor: '#e9ecef',
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 10,
  },
  progressBar: {
    height: '100%',
    borderRadius: 3,
  },
  skillFooter: {
    alignItems: 'flex-start',
  },
  proficiencyText: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
});