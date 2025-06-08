// components/ui/ThemeToggle.tsx
import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../../contexts/ThemeContext';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme, colors } = useTheme();

  const getThemeInfo = () => {
    switch (theme) {
      case 'light':
        return { icon: 'sunny', label: 'Light Mode' };
      case 'dark':
        return { icon: 'moon', label: 'Dark Mode' };
      default:
        return { icon: 'phone-portrait', label: 'System' };
    }
  };

  const themeInfo = getThemeInfo();

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.surface,
      padding: 16,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: colors.border,
    },
    iconContainer: {
      backgroundColor: colors.primary,
      padding: 8,
      borderRadius: 8,
      marginRight: 12,
    },
    textContainer: {
      flex: 1,
    },
    label: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.text,
      marginBottom: 2,
    },
    description: {
      fontSize: 12,
      color: colors.textSecondary,
    },
    chevron: {
      marginLeft: 8,
    },
  });

  const getDescription = () => {
    switch (theme) {
      case 'light':
        return 'Always use light theme';
      case 'dark':
        return 'Always use dark theme';
      default:
        return 'Follow system setting';
    }
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={toggleTheme}
      activeOpacity={0.7}
    >
      <View style={styles.iconContainer}>
        <Ionicons
          name={themeInfo.icon as any}
          size={20}
          color="#fff"
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.label}>{themeInfo.label}</Text>
        <Text style={styles.description}>{getDescription()}</Text>
      </View>
      <Ionicons
        name="chevron-forward"
        size={16}
        color={colors.textTertiary}
        style={styles.chevron}
      />
    </TouchableOpacity>
  );
};

export default ThemeToggle;