// app/tabs/projects.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Linking,
  Alert,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { portfolioData } from '../../constants/portfolioData';

const { width } = Dimensions.get('window');

interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  githubUrl: string;
  pypiUrl?: string;
  type: string;
  lastUpdated?: string;
  stars?: number;
  license?: string;
  years?: string;
}

const ProjectCard = ({ project }: { project: Project }) => {
  const openGitHub = () => {
    Linking.openURL(project.githubUrl).catch(() => {
      Alert.alert('Error', 'Could not open GitHub repository');
    });
  };

  const openPyPI = () => {
    if (project.pypiUrl) {
      Linking.openURL(project.pypiUrl).catch(() => {
        Alert.alert('Error', 'Could not open PyPI package');
      });
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'PyPI Package': return '#FF6B35';
      case 'Web Application': return '#2196F3';
      case 'Template': return '#9C27B0';
      case 'Educational': return '#4CAF50';
      case 'Tool': return '#FF9800';
      case 'API': return '#795548';
      case 'Platform': return '#E91E63';
      case 'Portfolio': return '#607D8B';
      case 'ML Project': return '#8BC34A';
      case 'Fork/Enhancement': return '#FFC107';
      default: return '#666';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'PyPI Package': return 'cube-outline';
      case 'Web Application': return 'globe-outline';
      case 'Template': return 'duplicate-outline';
      case 'Educational': return 'school-outline';
      case 'Tool': return 'build-outline';
      case 'API': return 'server-outline';
      case 'Platform': return 'layers-outline';
      case 'Portfolio': return 'person-outline';
      case 'ML Project': return 'brain-outline';
      case 'Fork/Enhancement': return 'git-branch-outline';
      default: return 'folder-outline';
    }
  };

  return (
    <View style={styles.projectCard}>
      <View style={styles.projectHeader}>
        <View style={styles.projectTitleContainer}>
          <Text style={styles.projectTitle}>{project.title}</Text>
          <View style={[styles.typeBadge, { backgroundColor: getTypeColor(project.type) }]}>
            <Ionicons
              name={getTypeIcon(project.type) as any}
              size={12}
              color="#fff"
              style={{ marginRight: 4 }}
            />
            <Text style={styles.typeBadgeText}>{project.type}</Text>
          </View>
        </View>

        <View style={styles.metaContainer}>
          {project.stars && (
            <View style={styles.starsContainer}>
              <Ionicons name="star" size={14} color="#FFD700" />
              <Text style={styles.starsText}>{project.stars}</Text>
            </View>
          )}
          {project.license && (
            <View style={styles.licenseContainer}>
              <Text style={styles.licenseText}>{project.license}</Text>
            </View>
          )}
        </View>
      </View>

      <Text style={styles.projectDescription}>{project.description}</Text>

      {project.lastUpdated && (
        <Text style={styles.lastUpdated}>
          <Ionicons name="time-outline" size={12} color="#999" /> Last updated: {project.lastUpdated}
        </Text>
      )}

      <View style={styles.technologiesContainer}>
        {project.technologies.slice(0, 4).map((tech, index) => (
          <View key={index} style={styles.techTag}>
            <Text style={styles.techText}>{tech}</Text>
          </View>
        ))}
        {project.technologies.length > 4 && (
          <View style={styles.techTag}>
            <Text style={styles.techText}>+{project.technologies.length - 4}</Text>
          </View>
        )}
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.githubButton} onPress={openGitHub}>
          <Ionicons name="logo-github" size={16} color="#fff" />
          <Text style={styles.buttonText}>GitHub</Text>
        </TouchableOpacity>

        {project.pypiUrl && (
          <TouchableOpacity style={styles.pypiButton} onPress={openPyPI}>
            <Ionicons name="cube" size={16} color="#fff" />
            <Text style={styles.buttonText}>PyPI</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default function ProjectsScreen() {
  const [filter, setFilter] = useState('Recent');

  const projectTypes = ['Recent', 'All', 'PyPI Package', 'Web Application', 'Template', 'Educational', 'Tool'];

  const getFilteredProjects = () => {
    switch (filter) {
      case 'Recent':
        return portfolioData.recentProjects;
      case 'All':
        return [...portfolioData.recentProjects, ...portfolioData.allProjects];
      default:
        return [...portfolioData.recentProjects, ...portfolioData.allProjects].filter(project => project.type === filter);
    }
  };

  const filteredProjects = getFilteredProjects();

  const renderProject = ({ item }: { item: Project }) => <ProjectCard project={item} />;

  const renderFilterButton = (type: string) => (
    <TouchableOpacity
      key={type}
      style={[
        styles.filterButton,
        filter === type && styles.activeFilterButton
      ]}
      onPress={() => setFilter(type)}
    >
      <Text style={[
        styles.filterButtonText,
        filter === type && styles.activeFilterButtonText
      ]}>
        {type}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
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
            <Ionicons name="folder-open-outline" size={64} color="#ccc" />
            <Text style={styles.emptyText}>No projects found for "{filter}"</Text>
          </View>
        }
      />
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
  filterList: {
    paddingHorizontal: 15,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 10,
    borderRadius: 20,
    backgroundColor: '#f8f9fa',
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  activeFilterButton: {
    backgroundColor: '#667eea',
    borderColor: '#667eea',
  },
  filterButtonText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  activeFilterButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  listContainer: {
    paddingBottom: 20,
  },
  projectCard: {
    backgroundColor: '#fff',
    marginHorizontal: 15,
    marginTop: 15,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  projectHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  projectTitleContainer: {
    flex: 1,
    marginRight: 10,
  },
  projectTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  typeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  typeBadgeText: {
    fontSize: 11,
    color: '#fff',
    fontWeight: '600',
  },
  metaContainer: {
    alignItems: 'flex-end',
  },
  starsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 10,
    marginBottom: 4,
  },
  starsText: {
    fontSize: 11,
    color: '#666',
    marginLeft: 3,
    fontWeight: '500',
  },
  licenseContainer: {
    backgroundColor: '#e9ecef',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  licenseText: {
    fontSize: 10,
    color: '#666',
    fontWeight: '500',
  },
  projectDescription: {
    fontSize: 15,
    color: '#666',
    lineHeight: 22,
    marginBottom: 10,
  },
  lastUpdated: {
    fontSize: 12,
    color: '#999',
    marginBottom: 15,
    fontStyle: 'italic',
  },
  technologiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  techTag: {
    backgroundColor: '#e8f4fd',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    marginRight: 8,
    marginBottom: 6,
    borderWidth: 1,
    borderColor: '#d4edda',
  },
  techText: {
    fontSize: 12,
    color: '#667eea',
    fontWeight: '600',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  githubButton: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#333',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pypiButton: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#FF6B35',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    marginLeft: 6,
    fontSize: 14,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
    marginTop: 15,
  },
});