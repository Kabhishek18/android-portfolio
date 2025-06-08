// app/home/index.tsx - Enhanced with Dark Mode
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Linking,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../contexts/ThemeContext';
import { portfolioData } from '../../constants/portfolioData';
import { Card, Button } from '../components/ui';

export default function HomeScreen() {
  const { colors, colorScheme } = useTheme();
  const { profile, stats, currentWork, domains, achievements, socialLinks } = portfolioData;

  const openLink = (url: string) => {
    Linking.openURL(url);
  };

  const styles = createStyles(colors);

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor={colors.background}
      />

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentInsetAdjustmentBehavior="automatic"
      >
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

          <Button
            title={profile.website.replace('https://', '')}
            onPress={() => openLink(profile.website)}
            icon="globe-outline"
            variant="secondary"
            size="small"
            style={styles.websiteButton}
          />
        </View>

        {/* Enhanced Stats Grid */}
        <View style={styles.statsContainer}>
          <View style={styles.statsRow}>
            <Card style={styles.statsCard} padding={20} margin={7.5}>
              <Text style={styles.statNumber}>{stats.experience}</Text>
              <Text style={styles.statLabel}>Years Experience</Text>
            </Card>
            <Card style={styles.statsCard} padding={20} margin={7.5}>
              <Text style={styles.statNumber}>{stats.totalProjects}</Text>
              <Text style={styles.statLabel}>Total Projects</Text>
            </Card>
          </View>
          <View style={styles.statsRow}>
            <Card style={styles.statsCard} padding={20} margin={7.5}>
              <Text style={styles.statNumber}>{stats.pypiPackages}</Text>
              <Text style={styles.statLabel}>PyPI Packages</Text>
            </Card>
            <Card style={styles.statsCard} padding={20} margin={7.5}>
              <Text style={styles.statNumber}>{stats.githubStars}</Text>
              <Text style={styles.statLabel}>GitHub Stars</Text>
            </Card>
          </View>
        </View>

        {/* About Section */}
        <Card>
          <Text style={styles.sectionTitle}>About Me</Text>
          <Text style={styles.bioText}>{profile.bio}</Text>

          <View style={styles.locationContainer}>
            <Ionicons name="location-outline" size={16} color={colors.textSecondary} />
            <Text style={styles.locationText}>{profile.location}</Text>
            <View style={styles.availabilityBadge}>
              <View style={styles.availabilityDot} />
              <Text style={styles.availabilityText}>Available for Work</Text>
            </View>
          </View>
        </Card>

        {/* Achievements Section */}
        <Card>
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
        </Card>

        {/* Current Work Section */}
        <Card>
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
        </Card>

        {/* Domain Expertise */}
        <Card>
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
        </Card>

        {/* Social Links */}
        <Card>
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
        </Card>

        {/* Quick Actions */}
        <Card style={styles.quickActionsCard}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActions}>
            <Button
              title="Email Me"
              onPress={() => Linking.openURL(`mailto:${profile.email}`)}
              icon="mail"
              variant="primary"
              style={styles.actionButton}
            />

            <Button
              title="WhatsApp"
              onPress={() => openLink(profile.whatsapp)}
              icon="logo-whatsapp"
              variant="success"
              style={styles.actionButton}
            />
          </View>
        </Card>
      </ScrollView>
    </View>
  );
}

const createStyles = (colors: any) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  heroSection: {
    backgroundColor: colors.headerGradientStart,
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
    backgroundColor: colors.success,
  },
  greeting: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.9)',
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
    color: 'rgba(255,255,255,0.8)',
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    color: 'rgba(255,255,255,0.9)',
    marginBottom: 5,
    fontWeight: '600',
  },
  subtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    marginBottom: 10,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  followContainer: {
    marginBottom: 20,
  },
  followText: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
  },
  websiteButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
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
    width: '48%',
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    textAlign: 'center',
    fontWeight: '500',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 15,
  },
  bioText: {
    fontSize: 16,
    lineHeight: 24,
    color: colors.textSecondary,
    marginBottom: 15,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  locationText: {
    fontSize: 14,
    color: colors.textSecondary,
    marginLeft: 5,
    flex: 1,
  },
  availabilityBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.success + '20',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
  },
  availabilityDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.success,
    marginRight: 5,
  },
  availabilityText: {
    fontSize: 12,
    color: colors.success,
    fontWeight: '600',
  },
  achievementsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  achievementCard: {
    width: '48%',
    backgroundColor: colors.background,
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: colors.border,
  },
  achievementIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  achievementTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 5,
    textAlign: 'center',
  },
  achievementDescription: {
    fontSize: 11,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 5,
  },
  achievementDate: {
    fontSize: 10,
    color: colors.textTertiary,
    fontWeight: '500',
  },
  workItem: {
    marginBottom: 15,
  },
  workLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 5,
  },
  workText: {
    fontSize: 15,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  domainsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  domainCard: {
    width: '48%',
    backgroundColor: colors.background,
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: colors.border,
  },
  domainIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  domainName: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
    textAlign: 'center',
  },
  domainExperience: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 2,
  },
  domainProjects: {
    fontSize: 11,
    color: colors.textTertiary,
    fontStyle: 'italic',
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
    shadowColor: colors.shadow,
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
  quickActionsCard: {
    marginBottom: 30,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 15,
  },
  actionButton: {
    flex: 1,
  },
});