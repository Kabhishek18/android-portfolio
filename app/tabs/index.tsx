// app/tabs/index.tsx
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Dimensions,
} from 'react-native';
import { portfolioData } from '../../constants/portfolioData';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const { profile } = portfolioData;

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Hero Section */}
      <View style={styles.heroSection}>
        <View style={styles.profileImageContainer}>
          <Image
            source={{ uri: 'https://via.placeholder.com/150x150/007AFF/ffffff?text=AK' }}
            style={styles.profileImage}
          />
        </View>
        <Text style={styles.name}>{profile.name}</Text>
        <Text style={styles.title}>{profile.title}</Text>
      </View>

      {/* Bio Section */}
      <View style={styles.bioSection}>
        <Text style={styles.sectionTitle}>About Me</Text>
        <Text style={styles.bioText}>{profile.bio}</Text>
      </View>

      {/* Quick Stats */}
      <View style={styles.statsSection}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{portfolioData.projects.length}</Text>
          <Text style={styles.statLabel}>Projects</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{portfolioData.skills.length}</Text>
          <Text style={styles.statLabel}>Skills</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>2+</Text>
          <Text style={styles.statLabel}>Years</Text>
        </View>
      </View>

      {/* Featured Skills Preview */}
      <View style={styles.featuredSection}>
        <Text style={styles.sectionTitle}>Top Skills</Text>
        <View style={styles.skillsPreview}>
          {portfolioData.skills.slice(0, 4).map((skill, index) => (
            <View key={index} style={styles.skillTag}>
              <Text style={styles.skillTagText}>{skill.name}</Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  heroSection: {
    backgroundColor: '#007AFF',
    paddingTop: 60,
    paddingBottom: 50,
    alignItems: 'center',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  profileImageContainer: {
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: '#fff',
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    color: '#e6f2ff',
    fontStyle: 'italic',
  },
  bioSection: {
    padding: 20,
    backgroundColor: '#fff',
    margin: 15,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  bioText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#666',
    textAlign: 'justify',
  },
  statsSection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    margin: 15,
    padding: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  featuredSection: {
    padding: 20,
    backgroundColor: '#fff',
    margin: 15,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 30,
  },
  skillsPreview: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  skillTag: {
    backgroundColor: '#e6f2ff',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: 10,
    minWidth: '45%',
    alignItems: 'center',
  },
  skillTagText: {
    color: '#007AFF',
    fontWeight: '600',
    fontSize: 14,
  },
});