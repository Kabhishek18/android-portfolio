// app/tabs/index.tsx
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Linking,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { portfolioData } from '../../constants/portfolioData';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const { profile, stats, currentWork, domains, achievements, socialLinks } = portfolioData;

  const openLink = (url: string) => {
    Linking.openURL(url);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Hero Section */}
      <View style={styles.heroSection}>
        <View style={styles.profileImageContainer}>
          <Image
            source={require('../../assets/images/profile.jpeg')}
            style={styles.profileImage}
          />
          <View style={styles.statusIndicator}>
            <View style={styles.onlineDot} />
          </View>
        </View>

        <Text style={styles.greeting}>Hi there! 👋</Text>
        <Text style={styles.name}>{profile.name}</Text>
        <Text style={styles.username}>@{profile.username}</Text>
        <Text style={styles.title}>{profile.title}</Text>
        <Text style={styles.subtitle}>{profile.subtitle}</Text>

        <View style={styles.followContainer}>
          <Text style={styles.followText}>
            {profile.followers} followers • {profile.following} following
          </Text>
        </View>

        <TouchableOpacity style={styles.websiteButton} onPress={() => openLink(profile.website)}>
          <Ionicons name="globe-outline" size={16} color="#fff" />
          <Text style={styles.websiteButtonText}>{profile.website.replace('https://', '')}</Text>
        </TouchableOpacity>
      </View>

      {/* Enhanced Stats Grid */}
      <View style={styles.statsContainer}>
        <View style={styles.statsRow}>
          <View style={styles.statsCard}>
            <Text style={styles.statNumber}>{stats.experience}</Text>
            <Text style={styles.statLabel}>Years Experience</Text>
          </View>
          <View style={styles.statsCard}>
            <Text style={styles.statNumber}>{stats.totalProjects}</Text>
            <Text style={styles.statLabel}>Total Projects</Text>
          </View>
        </View>
        <View style={styles.statsRow}>
          <View style={styles.statsCard}>
            <Text style={styles.statNumber}>{stats.pypiPackages}</Text>
            <Text style={styles.statLabel}>PyPI Packages</Text>
          </View>
          <View style={styles.statsCard}>
            <Text style={styles.statNumber}>{stats.githubStars}</Text>
            <Text style={styles.statLabel}>GitHub Stars</Text>
          </View>
        </View>
      </View>

      {/* About Section */}
      <View style={styles.aboutSection}>
        <Text style={styles.sectionTitle}>About Me</Text>
        <Text style={styles.bioText}>{profile.bio}</Text>

        <View style={styles.locationContainer}>
          <Ionicons name="location-outline" size={16} color="#666" />
          <Text style={styles.locationText}>{profile.location}</Text>
          <View style={styles.availabilityBadge}>
            <View style={styles.availabilityDot} />
            <Text style={styles.availabilityText}>Available for Work</Text>
          </View>
        </View>
      </View>

      {/* Achievements Section */}
      <View style={styles.achievementsSection}>
        <Text style={styles.sectionTitle}>🏆 Achievements & Highlights</Text>
        <View style={styles.achievementsGrid}>
          {achievements.map((achievement, index) => (
            <View key={index} style={styles.achievementCard}>
              <Text style={styles.achievementIcon}>{achievement.icon}</Text>
              <Text style={styles.achievementTitle}>{achievement.title}</Text>
              <Text style={styles.achievementDescription}>{achievement.description}</Text>
              <Text style={styles.achievementDate}>{achievement.date}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Current Work Section */}
      <View style={styles.currentWorkSection}>
        <Text style={styles.sectionTitle}>What I'm Working On</Text>

        <View style={styles.workItem}>
          <Text style={styles.workLabel}>👨‍💻 Currently working on:</Text>
          <Text style={styles.workText}>{currentWork.focus}</Text>
        </View>

        <View style={styles.workItem}>
          <Text style={styles.workLabel}>🤝 Looking to collaborate on:</Text>
          <Text style={styles.workText}>{currentWork.collaboration}</Text>
        </View>

        <View style={styles.workItem}>
          <Text style={styles.workLabel}>💬 Ask me about:</Text>
          <Text style={styles.workText}>{currentWork.askMeAbout}</Text>
        </View>

        <View style={styles.workItem}>
          <Text style={styles.workLabel}>🎯 Specialization:</Text>
          <Text style={styles.workText}>{currentWork.specialization}</Text>
        </View>
      </View>

      {/* Domain Expertise */}
      <View style={styles.domainsSection}>
        <Text style={styles.sectionTitle}>Domain Expertise</Text>
        <View style={styles.domainsGrid}>
          {domains.map((domain, index) => (
            <View key={index} style={styles.domainCard}>
              <Text style={styles.domainIcon}>{domain.icon}</Text>
              <Text style={styles.domainName}>{domain.name}</Text>
              <Text style={styles.domainExperience}>{domain.experience}</Text>
              <Text style={styles.domainProjects}>{domain.projects} projects</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Social Links */}
      <View style={styles.socialLinksSection}>
        <Text style={styles.sectionTitle}>Connect With Me</Text>
        <View style={styles.socialLinksGrid}>
          {socialLinks.map((social, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.socialLinkButton, { backgroundColor: social.color }]}
              onPress={() => openLink(social.url)}
              activeOpacity={0.8}
            >
              <Ionicons name={social.icon as any} size={20} color="#fff" />
              <Text style={styles.socialLinkText}>{social.platform}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Quick Actions */}
      <View style={styles.quickActionsSection}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.quickActions}>
          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: '#667eea' }]}
            onPress={() => Linking.openURL(`mailto:${profile.email}`)}
          >
            <Ionicons name="mail" size={24} color="#fff" />
            <Text style={styles.actionText}>Email Me</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: '#25D366' }]}
            onPress={() => openLink(profile.whatsapp)}
          >
            <Ionicons name="logo-whatsapp" size={24} color="#fff" />
            <Text style={styles.actionText}>WhatsApp</Text>
          </TouchableOpacity>
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
    backgroundColor: '#667eea',
    paddingTop: 60,
    paddingBottom: 40,
    alignItems: 'center',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  profileImageContainer: {
    position: 'relative',
    marginBottom: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: '#fff',
  },
  statusIndicator: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 3,
  },
  onlineDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#4CAF50',
  },
  greeting: {
    fontSize: 16,
    color: '#e8f4fd',
    marginBottom: 5,
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  username: {
    fontSize: 16,
    color: '#d1e7ff',
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    color: '#e8f4fd',
    marginBottom: 5,
    fontWeight: '600',
  },
  subtitle: {
    fontSize: 14,
    color: '#d1e7ff',
    marginBottom: 10,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  followContainer: {
    marginBottom: 20,
  },
  followText: {
    fontSize: 14,
    color: '#d1e7ff',
  },
  websiteButton: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  websiteButtonText: {
    color: '#fff',
    marginLeft: 8,
    fontWeight: '600',
  },
  statsContainer: {
    paddingHorizontal: 15,
    marginTop: -20,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  statsCard: {
    backgroundColor: '#fff',
    width: '48%',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#667eea',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    fontWeight: '500',
  },
  aboutSection: {
    backgroundColor: '#fff',
    margin: 15,
    padding: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  bioText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#666',
    marginBottom: 15,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  locationText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 5,
    flex: 1,
  },
  availabilityBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e8f5e8',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
  },
  availabilityDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#4CAF50',
    marginRight: 5,
  },
  availabilityText: {
    fontSize: 12,
    color: '#4CAF50',
    fontWeight: '600',
  },
  achievementsSection: {
    backgroundColor: '#fff',
    margin: 15,
    padding: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  achievementsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  achievementCard: {
    width: '48%',
    backgroundColor: '#f8f9fa',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  achievementIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  achievementTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
    textAlign: 'center',
  },
  achievementDescription: {
    fontSize: 11,
    color: '#666',
    textAlign: 'center',
    marginBottom: 5,
  },
  achievementDate: {
    fontSize: 10,
    color: '#999',
    fontWeight: '500',
  },
  currentWorkSection: {
    backgroundColor: '#fff',
    margin: 15,
    padding: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  workItem: {
    marginBottom: 15,
  },
  workLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  workText: {
    fontSize: 15,
    color: '#666',
    lineHeight: 20,
  },
  domainsSection: {
    backgroundColor: '#fff',
    margin: 15,
    padding: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  domainsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  domainCard: {
    width: '48%',
    backgroundColor: '#f8f9fa',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  domainIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  domainName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
    textAlign: 'center',
  },
  domainExperience: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2,
  },
  domainProjects: {
    fontSize: 11,
    color: '#999',
    fontStyle: 'italic',
  },
  socialLinksSection: {
    backgroundColor: '#fff',
    margin: 15,
    padding: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  socialLinksGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  socialLinkButton: {
    width: '48%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 12,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  socialLinkText: {
    color: '#fff',
    marginLeft: 8,
    fontWeight: '600',
    fontSize: 14,
  },
  quickActionsSection: {
    backgroundColor: '#fff',
    margin: 15,
    padding: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 30,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 12,
    marginHorizontal: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
  },
  actionText: {
    color: '#fff',
    marginLeft: 8,
    fontWeight: '600',
  },
});