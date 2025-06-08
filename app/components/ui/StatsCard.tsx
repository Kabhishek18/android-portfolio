// components/ui/StatsCard.tsx
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../../contexts/ThemeContext';
import { StatsCardProps } from './types';
import Card from './Card';

const StatsCard: React.FC<StatsCardProps> = ({
  value,
  label,
  icon,
  color,
  onPress,
  style,
  testID,
}) => {
  const { colors } = useTheme();

  const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      padding: 20,
    },
    icon: {
      marginBottom: 8,
    },
    value: {
      fontSize: 24,
      fontWeight: 'bold',
      color: color || colors.primary,
      marginBottom: 5,
    },
    label: {
      fontSize: 12,
      color: colors.textSecondary,
      textAlign: 'center',
      fontWeight: '500',
    },
  });

  const CardComponent = onPress ? TouchableOpacity : Card;

  return (
    <CardComponent
      style={[styles.container, style]}
      onPress={onPress}
      activeOpacity={onPress ? 0.7 : 1}
      testID={testID}
    >
      {icon && (
        <Ionicons
          name={icon}
          size={32}
          color={color || colors.primary}
          style={styles.icon}
        />
      )}
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.label}>{label}</Text>
    </CardComponent>
  );
};

export default StatsCard;