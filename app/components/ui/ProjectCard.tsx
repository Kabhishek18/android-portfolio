// components/ui/ProjectCard.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../contexts/ThemeContext';
import { ProjectCardProps } from './types';
import Card from './Card';
import Button from './Button';

const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  onPress,
  showActions = true,
  style,
  testID,
}) => {
  const { colors } = useTheme();

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
      case 'Web Application': return colors.info;
      case 'Template': return '#9C27B0';
      case 'Educational': return colors.success;
      case 'Tool': return colors.warning;
      case 'API': return '#795548';
      case 'Platform': return '#E91E63';
      case 'Portfolio': return '#607D8B';
      case 'ML Project': return '#8BC34A';
      case 'Fork/Enhancement': return '#FFC107';
      default: return colors.textTertiary;
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

  const styles = createStyles(colors);

  return (
    <Card style={[styles.container, style]} testID={testID}>
      <TouchableOpacity
        onPress={() => onPress?.(project)}
        activeOpacity={onPress ? 0.7 : 1}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{project.title}</Text>
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

        {/* Description */}
        <Text style={styles.description}>{project.description}</Text>

        {/* Last Updated */}
        {project.lastUpdated && (
          <View style={styles.lastUpdatedContainer}>
            <Ionicons name="time-outline" size={12} color={colors.textTertiary} />
            <Text style={styles.lastUpdated}>Last updated: {project.lastUpdated}</Text>
          </View>
        )}

        {/* Technologies */}
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

        {/* Actions */}
        {showActions && (
          <View style={styles.actionsContainer}>
            <Button
              title="GitHub"
              onPress={openGitHub}
              icon="logo-github"
              variant="primary"
              size="small"
              style={styles.actionButton}
            />

            {project.pypiUrl && (
              <Button
                title="PyPI"
                onPress={openPyPI}
                icon="cube"
                style={[styles.actionButton, { backgroundColor: '#FF6B35' }]}
                size="small"
              />
            )}
          </View>
        )}
      </TouchableOpacity>
    </Card>
  );
};

const createStyles = (colors: any) => StyleSheet.create({
  container: {
    marginHorizontal: 15,
    marginVertical: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  titleContainer: {
    flex: 1,
    marginRight: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
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
    backgroundColor: colors.background,
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 10,
    marginBottom: 4,
  },
  starsText: {
    fontSize: 11,
    color: colors.textSecondary,
    marginLeft: 3,
    fontWeight: '500',
  },
  licenseContainer: {
    backgroundColor: colors.border,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  licenseText: {
    fontSize: 10,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  description: {
    fontSize: 15,
    color: colors.textSecondary,
    lineHeight: 22,
    marginBottom: 10,
  },
  lastUpdatedContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  lastUpdated: {
    fontSize: 12,
    color: colors.textTertiary,
    marginLeft: 5,
    fontStyle: 'italic',
  },
  technologiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  techTag: {
    backgroundColor: colors.primary + '20',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    marginRight: 8,
    marginBottom: 6,
    borderWidth: 1,
    borderColor: colors.primary + '30',
  },
  techText: {
    fontSize: 12,
    color: colors.primary,
    fontWeight: '600',
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  actionButton: {
    flex: 1,
  },
});

export default ProjectCard;