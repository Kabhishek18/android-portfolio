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
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { portfolioData } from '../../constants/portfolioData';

interface ContactButtonProps {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  subtitle: string;
  onPress: () => void;
  color: string;
}

const ContactButton: React.FC<ContactButtonProps> = ({ icon, title, subtitle, onPress, color }) => (
  <TouchableOpacity style={[styles.contactButton, { borderLeftColor: color }]} onPress={onPress}>
    <View style={[styles.iconContainer, { backgroundColor: color }]}>
      <Ionicons name={icon} size={28} color="#fff" />
    </View>
    <View style={styles.contactInfo}>
      <Text style={styles.contactTitle}>{title}</Text>
      <Text style={styles.contactSubtitle}>{subtitle}</Text>
    </View>
    <Ionicons name="chevron-forward" size={24} color="#ccc" />
  </TouchableOpacity>
);

export default function ContactScreen() {
  const { profile } = portfolioData;

  const handleEmail = () => {
    const emailUrl = `mailto:${profile.email}?subject=Hello from Portfolio App`;
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
    Linking.openURL(profile.whatsapp).catch(() => {
      Alert.alert('Error', 'Could not open WhatsApp');
    });
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Get In Touch</Text>
        <Text style={styles.headerSubtitle}>
          Let's discuss your next project or opportunity
        </Text>
      </View>

      <View style={styles.contactSection}>
        <Text style={styles.sectionTitle}>Contact Methods</Text>

        <ContactButton
          icon="mail"
          title="Email"
          subtitle={profile.email}
          onPress={handleEmail}
          color="#EA4335"
        />

        <ContactButton
          icon="call"
          title="Phone"
          subtitle={profile.phone}
          onPress={handlePhone}
          color="#34A853"
        />

        <ContactButton
          icon="logo-whatsapp"
          title="WhatsApp"
          subtitle="Quick messaging"
          onPress={handleWhatsApp}
          color="#25D366"
        />
      </View>

      <View style={styles.socialSection}>
        <Text style={styles.sectionTitle}>Social Profiles</Text>

        <ContactButton
          icon="logo-github"
          title="GitHub"
          subtitle="View my repositories"
          onPress={handleGitHub}
          color="#333"
        />

        <ContactButton
          icon="logo-linkedin"
          title="LinkedIn"
          subtitle="Professional network"
          onPress={handleLinkedIn}
          color="#0A66C2"
        />
      </View>

      <View style={styles.availabilitySection}>
        <View style={styles.availabilityCard}>
          <Ionicons name="time" size={32} color="#007AFF" />
          <Text style={styles.availabilityTitle}>Availability</Text>
          <Text style={styles.availabilityText}>
            Open to new opportunities and freelance projects
          </Text>
          <View style={styles.statusIndicator}>
            <View style={styles.statusDot} />
            <Text style={styles.statusText}>Available for work</Text>
          </View>
        </View>
      </View>

      <View style={styles.responseSection}>
        <Text style={styles.responseTitle}>Response Time</Text>
        <Text style={styles.responseText}>
          I typically respond to emails within 24 hours
        </Text>
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
  contactSection: {
    margin: 15,
  },
  socialSection: {
    margin: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  contactButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
    marginBottom: 12,
    borderRadius: 15,
    borderLeftWidth: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  contactInfo: {
    flex: 1,
  },
  contactTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  contactSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  availabilitySection: {
    margin: 15,
  },
  availabilityCard: {
    backgroundColor: '#fff',
    padding: 25,
    borderRadius: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  availabilityTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 15,
    marginBottom: 10,
  },
  availabilityText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 20,
  },
  statusIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#28a745',
    marginRight: 8,
  },
  statusText: {
    fontSize: 16,
    color: '#28a745',
    fontWeight: '600',
  },
  responseSection: {
    margin: 15,
    backgroundColor: '#fff',
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
    marginBottom: 30,
  },
  responseTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  responseText: {
    fontSize: 16,
    color: '#666',
    lineHeight: 22,
  },
});