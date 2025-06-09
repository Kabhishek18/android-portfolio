// app/home/projects.tsx - Enhanced with Safe Areas for SDK 53
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../contexts/ThemeContext';
import { portfolioData } from '../../constants/portfolioData';
import { ProjectCard, FilterButton } from '../components/ui';
import { Project } from '../components/ui/types';

export default function ProjectsScreen() {
  const { colors, colorScheme } = useTheme();
  const insets = useSafeAreaInsets();
  const [filter, setFilter] = useState('Recent');

  const projectTypes = ['Recent', 'All', 'PyPI Package', 'Web Application', 'Template', 'Educational', 'Tool'];

  const getFilteredProjects = () => {
    switch (filter) {
      case 'Recent':
        return portfolioData.recentProjects;
      case 'All':
        return [...portfolioData.recentProjects, ...portfolioData.allProjects];
      default:
        return [...portfolioData.recentProjects, ...portfolioData.allProjects].filter(
          project => project.type === filter
        );
    }
  };

  const filteredProjects = getFilteredProjects();

  const renderProject = ({ item }: { item: Project }) => (
    <ProjectCard project={item} showActions={true} />
  );

  const renderFilterButton = (type: string) => {
    const count = type === 'All'
      ? portfolioData.recentProjects.length + portfolioData.allProjects.length
      : type === 'Recent'
      ? portfolioData.recentProjects.length
      : [...portfolioData.recentProjects, ...portfolioData.allProjects].filter(p => p.type === type).length;

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

  const styles = createStyles(colors, insets);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar
        barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor={colors.background}
      />

      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Projects Portfolio</Text>
        <Text style={styles.headerSubtitle}>
          {portfolioData.recentProjects.length + portfolioData.allProjects.length} total projects • {portfolioData.recentProjects.filter(p => p.pypiUrl).length} PyPI packages • {portfolioData.stats.githubStars} GitHub stars
        </Text>
      </View>

      {/* Filter Buttons */}
      <View style={styles.filterContainer}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={projectTypes}
          renderItem={({ item }) => renderFilterButton(item)}
          keyExtractor={(item) => item}
          contentContainerStyle={styles.filterList}
        />
      </View>

      {/* Projects List */}
      <FlatList
        data={filteredProjects}
        renderItem={renderProject}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="folder-open-outline" size={64} color={colors.textTertiary} />
            <Text style={styles.emptyText}>No projects found for "{filter}"</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const createStyles = (colors: any, insets: any) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    padding: 20,
    paddingTop: 20,
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
  listContainer: {
    paddingBottom: insets.bottom + 85,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 16,
    color: colors.textTertiary,
    marginTop: 15,
  },
});