// app/home/skills.tsx - Enhanced with Dark Mode and Modular Components
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  StatusBar,
} from 'react-native';
import { useTheme } from '../../../contexts/ThemeContext';
import { portfolioData } from '../../../constants/portfolioData';
import { SkillCard, FilterButton, Section } from '../../components/ui';
import { Skill } from '../../components/ui/types';

export default function SkillsScreen() {
  const { colors, colorScheme } = useTheme();
  const [filter, setFilter] = useState('All');

  const categories = ['All', 'Expert', 'Advanced', 'Intermediate'];

  // Group skills by proficiency level
  const expertSkills = portfolioData.skills.filter(skill => skill.level >= 90);
  const advancedSkills = portfolioData.skills.filter(skill => skill.level >= 80 && skill.level < 90);
  const intermediateSkills = portfolioData.skills.filter(skill => skill.level >= 60 && skill.level < 80);

  const getFilteredSkills = () => {
    switch (filter) {
      case 'Expert': return expertSkills;
      case 'Advanced': return advancedSkills;
      case 'Intermediate': return intermediateSkills;
      default: return portfolioData.skills;
    }
  };

  const filteredSkills = getFilteredSkills();

  const renderSkill = ({ item, index }: { item: Skill; index: number }) => (
    <SkillCard skill={item} index={index} animated={true} />
  );

  const renderFilterButton = (type: string) => {
    const count = type === 'All'
      ? portfolioData.skills.length
      : type === 'Expert'
      ? expertSkills.length
      : type === 'Advanced'
      ? advancedSkills.length
      : intermediateSkills.length;

    return (
      <FilterButton
        key={type}
        title={type}
        active={filter === type}
        onPress={() => setFilter(type)}
        count={count}
      />
    );
  };

  const styles = createStyles(colors);

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor={colors.background}
      />

      <View style={styles.header}>
        <Text style={styles.headerTitle}>Technical Skills</Text>
        <Text style={styles.headerSubtitle}>
          {portfolioData.skills.length} technologies • {expertSkills.length} expert level
        </Text>
      </View>

      {/* Filter Buttons */}
      <View style={styles.filterContainer}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={categories}
          renderItem={({ item }) => renderFilterButton(item)}
          keyExtractor={(item) => item}
          contentContainerStyle={styles.filterList}
        />
      </View>

      {/* Skills Overview Cards */}
      <View style={styles.overviewContainer}>
        <View style={styles.overviewCard}>
          <Text style={styles.overviewNumber}>{expertSkills.length}</Text>
          <Text style={styles.overviewLabel}>Expert Level</Text>
          <View style={[styles.overviewIndicator, { backgroundColor: colors.success }]} />
        </View>
        <View style={styles.overviewCard}>
          <Text style={styles.overviewNumber}>{advancedSkills.length}</Text>
          <Text style={styles.overviewLabel}>Advanced</Text>
          <View style={[styles.overviewIndicator, { backgroundColor: colors.info }]} />
        </View>
        <View style={styles.overviewCard}>
          <Text style={styles.overviewNumber}>{intermediateSkills.length}</Text>
          <Text style={styles.overviewLabel}>Intermediate</Text>
          <View style={[styles.overviewIndicator, { backgroundColor: colors.warning }]} />
        </View>
      </View>

      {/* Skills List */}
      <FlatList
        data={filteredSkills}
        renderItem={renderSkill}
        keyExtractor={(item) => item.name}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

const createStyles = (colors: any) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    padding: 20,
    paddingTop: 60,
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 16,
    color: colors.textSecondary,
  },
  filterContainer: {
    backgroundColor: colors.surface,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  filterList: {
    paddingHorizontal: 15,
  },
  overviewContainer: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    paddingVertical: 15,
    justifyContent: 'space-between',
  },
  overviewCard: {
    backgroundColor: colors.surface,
    flex: 1,
    padding: 15,
    marginHorizontal: 5,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    position: 'relative',
    borderWidth: 1,
    borderColor: colors.border,
  },
  overviewNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 5,
  },
  overviewLabel: {
    fontSize: 12,
    color: colors.textSecondary,
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
  listContainer: {
    paddingBottom: 30,
  },
});