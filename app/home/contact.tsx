// app/tabs/contact.tsx
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
  ScrollView,
  Alert,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { portfolioData } from '../../constants/portfolioData';

const { width } = Dimensions.get('window');

interface ContactButtonProps {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  subtitle: string;
  onPress: () => void;
  color: string;
  gradient?: boolean;
}

const ContactButton: React.FC<ContactButtonProps> = ({ icon, title, subtitle, onPress, color, gradient }) => (
  <TouchableOpacity
    style={[
      styles.contactButton,
      { borderLeftColor: color },
      gradient && styles.gradientButton
    ]}
    onPress={onPress}
    activeOpacity={0.7}
  >
    <View style={[styles.iconContainer, { backgroundColor: color }]}>
      <Ionicons name={icon} size={24} color="#fff" />
    </View>
    <View style={styles.contactInfo}>
      <Text style={styles.contactTitle}>{title}</Text>
      <Text style={styles.contactSubtitle}>{subtitle}</Text>
    </View>
    <Ionicons name="chevron-forward" size={20} color="#ccc" />
  </TouchableOpacity>
);

const SocialButton = ({ platform, url, color, icon }: {
  platform: string;
  url: string;
  color: string;
  icon: keyof typeof Ionicons.glyphMap;
}) => (
  <TouchableOpacity
    style={[styles.socialButton, { backgroundColor: color }]}
    onPress={() => Linking.openURL(url)}
    activeOpacity={0.8}
  >
    <Ionicons name={icon} size={24} color="#fff" />
    <Text style={styles.socialButtonText}>{platform}</Text>
  </TouchableOpacity>
);

export default function ContactScreen() {
  const { profile } = portfolioData;

  const handleEmail = () => {
    const emailUrl = `mailto:${profile.email}?subject=Hello from Portfolio App&body=Hi Kumar,%0D%0A%0D%0AI'm reaching out regarding...`;
    Linking.openURL(emailUrl).catch(() => {
      Alert.alert('Error', 'Could not open email client');
    });
  };

  const handleGitHub = () => {
    Linking.openURL(profile.github).catch(() => {
      Alert.alert('Error', 'Could not open GitHub profile');
    });
  };

  const handleLinkedIn = () => {
    Linking.openURL(profile.linkedin).catch(() => {
      Alert.alert('Error', 'Could not open LinkedIn profile');
    });
  };

  const handlePhone = () => {
    const phoneUrl = `tel:${profile.phone}`;
    Linking.openURL(phoneUrl).catch(() => {
      Alert.alert('Error', 'Could not open phone dialer');
    });
  };

  const handleWhatsApp = () => {
    const message = "Hi Kumar! I found your portfolio app and would like to connect.";
    const whatsappUrl = `${profile.whatsapp}?text=${encodeURIComponent(message)}`;
    Linking.openURL(whatsappUrl).catch(() => {
      Alert.alert('Error', 'Could not open WhatsApp');
    });
  };

  const handleWebsite = () => {
    Linking.openURL(profile.website).catch(() => {
      Alert.alert('Error', 'Could not open website');
    });
  };

  const startProjectDiscussion = () => {
    const subject = encodeURIComponent("Project Inquiry from Portfolio App");
    const body = encodeURIComponent(`Hi Kumar,

I'm interested in discussing a project opportunity with you.

Project Details:
- Type:
- Timeline:
- Budget:
- Requirements:

Looking forward to hearing from you!

Best regards,`);

    const emailUrl = `mailto:${profile.email}?subject=${subject}&body=${body}`;
    Linking.openURL(emailUrl).catch(() => {
      Alert.alert('Error', 'Could not open email client');
    });
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Let's Connect! 🤝</Text>
          <Text style={styles.headerSubtitle}>
            I'm always excited to discuss new opportunities and collaborate on interesting projects
          </Text>
        </View>
      </View>

      {/* Quick Actions */}
      <View style={styles.quickActionsSection}>
        <Text style={styles.sectionTitle}>Quick Contact</Text>
        <View style={styles.quickActionsGrid}>
          <TouchableOpacity
            style={[styles.quickActionButton, { backgroundColor: '#667eea' }]}
            onPress={handleEmail}
          >
            <Ionicons name="mail" size={28} color="#fff" />
            <Text style={styles.quickActionText}>Email</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.quickActionButton, { backgroundColor: '#25D366' }]}
            onPress={handleWhatsApp}
          >
            <Ionicons name="logo-whatsapp" size={28} color="#fff" />
            <Text style={styles.quickActionText}>WhatsApp</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Contact Methods */}
      <View style={styles.contactSection}>
        <Text style={styles.sectionTitle}>Contact Information</Text>

        <ContactButton
          icon="mail"
          title="Email"
          subtitle={profile.email}
          onPress={handleEmail}
          color="#667eea"
          gradient
        />

        <ContactButton
          icon="call"
          title="Phone"
          subtitle={profile.phone}
          onPress={handlePhone}
          color="#4CAF50"
        />

        <ContactButton
          icon="logo-whatsapp"
          title="WhatsApp"
          subtitle="Quick messaging & voice calls"
          onPress={handleWhatsApp}
          color="#25D366"
        />

        <ContactButton
          icon="globe-outline"
          title="Website"
          subtitle={profile.website}
          onPress={handleWebsite}
          color="#FF6B35"
        />
      </View>

      {/* Social & Professional */}
      <View style={styles.socialSection}>
        <Text style={styles.sectionTitle}>Social & Professional</Text>

        <View style={styles.socialGrid}>
          <SocialButton
            platform="GitHub"
            url={profile.github}
            color="#333"
            icon="logo-github"
          />

          <SocialButton
            platform="LinkedIn"
            url={profile.linkedin}
            color="#0A66C2"
            icon="logo-linkedin"
          />
        </View>

        <View style={styles.socialGrid}>
          <SocialButton
            platform="Twitter"
            url={profile.twitter}
            color="#1DA1F2"
            icon="logo-twitter"
          />

          <SocialButton
            platform="Freelancer"
            url={profile.freelancer}
            color="#00b4d8"
            icon="briefcase-outline"
          />
        </View>
      </View>

      {/* Response Time Info */}
      <View style={styles.responseSection}>
        <View style={styles.responseCard}>
          <View style={styles.responseIcon}>
            <Ionicons name="time" size={32} color="#667eea" />
          </View>
          <View style={styles.responseContent}>
            <Text style={styles.responseTitle}>Response Time</Text>
            <Text style={styles.responseText}>
              Usually responds within 24 hours
            </Text>
            <Text style={styles.responseSubtext}>
              Faster response via WhatsApp or email
            </Text>
          </View>
        </View>
      </View>

      {/* Availability Status */}
      <View style={styles.availabilitySection}>
        <View style={styles.availabilityCard}>
          <View style={styles.availabilityHeader}>
            <View style={styles.statusContainer}>
              <View style={styles.statusDot} />
              <Text style={styles.statusText}>Available for Work</Text>
            </View>
            <Ionicons name="briefcase" size={24} color="#4CAF50" />
          </View>

          <Text style={styles.availabilityTitle}>Open to New Opportunities</Text>
          <Text style={styles.availabilityText}>
            I'm currently available for freelance projects, consulting, and full-time opportunities in:
          </Text>

          <View style={styles.opportunityTags}>
            <View style={styles.opportunityTag}>
              <Text style={styles.opportunityTagText}>Full Stack Development</Text>
            </View>
            <View style={styles.opportunityTag}>
              <Text style={styles.opportunityTagText}>Python/Django Projects</Text>
            </View>
            <View style={styles.opportunityTag}>
              <Text style={styles.opportunityTagText}>React Native Apps</Text>
            </View>
            <View style={styles.opportunityTag}>
              <Text style={styles.opportunityTagText}>Technical Consulting</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Contact Form CTA */}
      <View style={styles.ctaSection}>
        <TouchableOpacity
          style={styles.ctaButton}
          onPress={startProjectDiscussion}
        >
          <Ionicons name="send" size={20} color="#fff" />
          <Text style={styles.ctaButtonText}>Start a Project Discussion</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    backgroundColor: '#667eea',
    paddingTop: 60,
    paddingBottom: 30,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  headerContent: {
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#e8f4fd',
    textAlign: 'center',
    lineHeight: 22,
  },
  quickActionsSection: {
    backgroundColor: '#fff',
    margin: 15,
    marginTop: -10,
    marginBottom: 25,
    padding: 25,
    borderRadius: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#2c3e50',
    marginBottom: 25,
    letterSpacing: 0.8,
    textAlign: 'center',
  },
  quickActionsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 20,
  },
  quickActionButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 28,
    paddingHorizontal: 20,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 8,
  },
  quickActionText: {
    color: '#fff',
    fontWeight: '800',
    marginTop: 12,
    fontSize: 17,
    letterSpacing: 0.5,
    textAlign: 'center',
  },
  contactSection: {
    margin: 15,
    marginTop: 10,
  },
  contactButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
    marginBottom: 15,
    borderRadius: 16,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  gradientButton: {
    borderWidth: 2,
    borderColor: '#667eea',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  contactInfo: {
    flex: 1,
  },
  contactTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  contactSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  socialSection: {
    margin: 15,
  },
  socialGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    marginBottom: 10,
  },
  socialButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  socialButtonText: {
    color: '#fff',
    fontWeight: '600',
    marginLeft: 8,
    fontSize: 14,
  },
  responseSection: {
    margin: 15,
  },
  responseCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 16,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  responseIcon: {
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  responseContent: {
    flex: 1,
  },
  responseTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  responseText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  responseSubtext: {
    fontSize: 12,
    color: '#999',
    fontStyle: 'italic',
  },
  availabilitySection: {
    margin: 15,
  },
  availabilityCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  availabilityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#4CAF50',
    marginRight: 8,
  },
  statusText: {
    fontSize: 14,
    color: '#4CAF50',
    fontWeight: '600',
  },
  availabilityTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  availabilityText: {
    fontSize: 15,
    color: '#666',
    lineHeight: 22,
    marginBottom: 15,
  },
  opportunityTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  opportunityTag: {
    backgroundColor: '#e8f4fd',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#d4edda',
  },
  opportunityTagText: {
    fontSize: 12,
    color: '#667eea',
    fontWeight: '500',
  },
  ctaSection: {
    margin: 15,
    marginBottom: 30,
  },
  ctaButton: {
    backgroundColor: '#667eea',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  ctaButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});