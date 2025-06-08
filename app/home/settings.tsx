// app/home/settings.tsx - Settings Screen for Theme Toggle
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
} from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';
import { Section, ThemeToggle, Card } from '../components/ui';

export default function SettingsScreen() {
  const { colors, colorScheme } = useTheme();

  const styles = createStyles(colors);

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor={colors.background}
      />

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Settings</Text>
          <Text style={styles.headerSubtitle}>
            Customize your app experience
          </Text>
        </View>

        <Section
          title="Appearance"
          subtitle="Choose how the app looks"
        >
          <ThemeToggle />
        </Section>

        <Card>
          <Text style={styles.infoTitle}>About Dark Mode</Text>
          <Text style={styles.infoText}>
            • <Text style={styles.bold}>Light Mode:</Text> Always uses light theme regardless of system setting
          </Text>
          <Text style={styles.infoText}>
            • <Text style={styles.bold}>Dark Mode:</Text> Always uses dark theme regardless of system setting
          </Text>
          <Text style={styles.infoText}>
            • <Text style={styles.bold}>System:</Text> Automatically switches between light and dark based on your device's setting
          </Text>
        </Card>

        <Card>
          <Text style={styles.infoTitle}>App Information</Text>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Version:</Text>
            <Text style={styles.infoValue}>1.0.0</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Build:</Text>
            <Text style={styles.infoValue}>Enhanced with Dark Mode</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Framework:</Text>
            <Text style={styles.infoValue}>React Native with Expo</Text>
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
  header: {
    padding: 20,
    paddingTop: 60,
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
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 15,
  },
  infoText: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
    marginBottom: 8,
  },
  bold: {
    fontWeight: '600',
    color: colors.text,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  infoLabel: {
    fontSize: 14,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  infoValue: {
    fontSize: 14,
    color: colors.text,
    fontWeight: '600',
  },
});