// app/tabs/projects.tsx
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Linking,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { portfolioData } from '../../constants/portfolioData';

interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  githubUrl: string;
}

const ProjectCard = ({ project }: { project: Project }) => {
  const openGitHub = () => {
    Linking.openURL(project.githubUrl).catch(() => {
      Alert.alert('Error', 'Could not open GitHub repository');
    });
  };

  return (
    <View style={styles.projectCard}>
      <Image
        source={{ uri: `https://via.placeholder.com/300x200/007AFF/ffffff?text=${project.title.charAt(0)}` }}
        style={styles.projectImage}
      />
      <View style={styles.projectContent}>
        <Text style={styles.projectTitle}>{project.title}</Text>
        <Text style={styles.projectDescription}>{project.description}</Text>

        <View style={styles.technologiesContainer}>
          {project.technologies.map((tech, index) => (
            <View key={index} style={styles.techTag}>
              <Text style={styles.techText}>{tech}</Text>
            </View>
          ))}
        </View>

        <TouchableOpacity style={styles.githubButton} onPress={openGitHub}>
          <Ionicons name="logo-github" size={20} color="#fff" />
          <Text style={styles.githubButtonText}>View Code</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default function ProjectsScreen() {
  const renderProject = ({ item }: { item: Project }) => <ProjectCard project={item} />;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Projects</Text>
        <Text style={styles.headerSubtitle}>
          Here are some of my recent works
        </Text>
      </View>

      <FlatList
        data={portfolioData.projects}
        renderItem={renderProject}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
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
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#666',
  },
  listContainer: {
    paddingBottom: 20,
  },
  projectCard: {
    backgroundColor: '#fff',
    marginHorizontal: 15,
    marginTop: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
    overflow: 'hidden',
  },
  projectImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  projectContent: {
    padding: 20,
  },
  projectTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  projectDescription: {
    fontSize: 16,
    color: '#666',
    lineHeight: 22,
    marginBottom: 15,
  },
  technologiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  techTag: {
    backgroundColor: '#e6f2ff',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    marginRight: 8,
    marginBottom: 8,
  },
  techText: {
    fontSize: 12,
    color: '#007AFF',
    fontWeight: '600',
  },
  githubButton: {
    flexDirection: 'row',
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-start',
  },
  githubButtonText: {
    color: '#fff',
    fontWeight: '600',
    marginLeft: 8,
    fontSize: 16,
  },
});