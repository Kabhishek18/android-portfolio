// app/components/ui/Badge.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../../contexts/ThemeContext';
import { BadgeProps } from './types';

const Badge: React.FC<BadgeProps> = ({
  text,
  icon,
  variant = 'primary',
  size = 'medium',
  style,
  textStyle,
  testID,
}) => {
  const { colors } = useTheme();

  const getVariantColors = () => {
    switch (variant) {
      case 'primary':
        return { backgroundColor: colors.primary, textColor: '#fff' };
      case 'secondary':
        return { backgroundColor: colors.secondary, textColor: '#fff' };
      case 'success':
        return { backgroundColor: colors.success, textColor: '#fff' };
      case 'warning':
        return { backgroundColor: colors.warning, textColor: '#fff' };
      case 'error':
        return { backgroundColor: colors.error, textColor: '#fff' };
      case 'info':
        return { backgroundColor: colors.info, textColor: '#fff' };
      default:
        return { backgroundColor: colors.primary, textColor: '#fff' };
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return { paddingHorizontal: 8, paddingVertical: 4, fontSize: 11, iconSize: 12 };
      case 'large':
        return { paddingHorizontal: 16, paddingVertical: 8, fontSize: 14, iconSize: 16 };
      default:
        return { paddingHorizontal: 12, paddingVertical: 6, fontSize: 12, iconSize: 14 };
    }
  };

  const variantColors = getVariantColors();
  const sizeStyles = getSizeStyles();

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: variantColors.backgroundColor,
      paddingHorizontal: sizeStyles.paddingHorizontal,
      paddingVertical: sizeStyles.paddingVertical,
      borderRadius: 12,
      alignSelf: 'flex-start',
    },
    text: {
      color: variantColors.textColor,
      fontSize: sizeStyles.fontSize,
      fontWeight: '600',
    },
    icon: {
      marginRight: 4,
    },
  });

  return (
    <View style={[styles.container, style]} testID={testID}>
      {icon && (
        <Ionicons
          name={icon}
          size={sizeStyles.iconSize}
          color={variantColors.textColor}
          style={styles.icon}
        />
      )}
      <Text style={[styles.text, textStyle]}>{text}</Text>
    </View>
  );
};

export default Badge;