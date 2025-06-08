// app/home/contact.tsx - Enhanced with Modular Components
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  Linking,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../contexts/ThemeContext';
import { portfolioData } from '../../constants/portfolioData';
import {
  Section,
  ContactButton,
  SocialButton,
  Button,
  Card
} from '../../components/ui';

export default function ContactScreen() {
  const { colors, colorScheme } = useTheme();
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

  const styles = createStyles(colors);

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor={colors.background}
      />

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
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
        <Card style={styles.quickActionsCard}>
          <Text style={styles.cardTitle}>Quick Contact</Text>
          <View style={styles.quickActionsGrid}>
            <Button
              title="Email"
              onPress={handleEmail}
              icon="mail"
              variant="primary"
              style={styles.quickActionButton}
            />

            <Button
              title="WhatsApp"
              onPress={handleWhatsApp}
              icon="logo-whatsapp"
              variant="success"
              style={styles.quickActionButton}
            />
          </View>
        </Card>

        {/* Contact Information */}
        <Section title="Contact Information">
          <ContactButton
            icon="mail"
            title="Email"
            subtitle={profile.email}
            onPress={handleEmail}
            color={colors.primary}
            gradient
          />

          <ContactButton
            icon="call"
            title="Phone"
            subtitle={profile.phone}
            onPress={handlePhone}
            color={colors.success}
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
            color={colors.accent}
          />
        </Section>

        {/* Social & Professional */}
        <Section title="Social & Professional">
          <View style={styles.socialGrid}>
            <SocialButton
              platform="GitHub"
              url={profile.github}
              color="#333"
              icon="logo-github"
              style={styles.socialButton}
            />

            <SocialButton
              platform="LinkedIn"
              url={profile.linkedin}
              color="#0A66C2"
              icon="logo-linkedin"
              style={styles.socialButton}
            />
          </View>

          <View style={styles.socialGrid}>
            <SocialButton
              platform="Twitter"
              url={profile.twitter}
              color="#1DA1F2"
              icon="logo-twitter"
              style={styles.socialButton}
            />

            <SocialButton
              platform="Freelancer"
              url={profile.freelancer}
              color="#00b4d8"
              icon="briefcase-outline"
              style={styles.socialButton}
            />
          </View>
        </Section>

        {/* Response Time Info */}
        <Card>
          <View style={styles.responseCard}>
            <View style={styles.responseIcon}>
              <Ionicons name="time" size={32} color={colors.primary} />
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
        </Card>

        {/* Availability Status */}
        <Card>
          <View style={styles.availabilityHeader}>
            <View style={styles.statusContainer}>
              <View style={styles.statusDot} />
              <Text style={styles.statusText}>Available for Work</Text>
            </View>
            <Ionicons name="briefcase" size={24} color={colors.success} />
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
        </Card>

        {/* Contact Form CTA */}
        <Card style={styles.ctaCard}>
          <Button
            title="Start a Project Discussion"
            onPress={startProjectDiscussion}
            icon="send"
            variant="primary"
            size="large"
            fullWidth
          />
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
  header: {
    backgroundColor: colors.headerGradientStart,
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
    color: 'rgba(255,255,255,0.9)',
    textAlign: 'center',
    lineHeight: 22,
  },
  quickActionsCard: {
    marginTop: -15,
    marginHorizontal: 15,
    marginBottom: 15,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 20,
    textAlign: 'center',
  },
  quickActionsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 15,
  },
  quickActionButton: {
    flex: 1,
  },
  socialGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    marginBottom: 10,
  },
  socialButton: {
    flex: 1,
  },
  responseCard: {
    flexDirection: 'row',
    alignItems: 'center',
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
    color: colors.text,
    marginBottom: 5,
  },
  responseText: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 5,
  },
  responseSubtext: {
    fontSize: 12,
    color: colors.textTertiary,
    fontStyle: 'italic',
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
    backgroundColor: colors.success,
    marginRight: 8,
  },
  statusText: {
    fontSize: 14,
    color: colors.success,
    fontWeight: '600',
  },
  availabilityTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 10,
  },
  availabilityText: {
    fontSize: 15,
    color: colors.textSecondary,
    lineHeight: 22,
    marginBottom: 15,
  },
  opportunityTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  opportunityTag: {
    backgroundColor: colors.primary + '20',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.primary + '30',
  },
  opportunityTagText: {
    fontSize: 12,
    color: colors.primary,
    fontWeight: '500',
  },
  ctaCard: {
    marginBottom: 30,
  },
});