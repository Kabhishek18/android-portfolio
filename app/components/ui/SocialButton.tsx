// components/ui/SocialButton.tsx
import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../../contexts/ThemeContext';
import { SocialButtonProps } from './types';

const SocialButton: React.FC<SocialButtonProps> = ({
  platform,
  url,
  color,
  icon,
  onPress,
  style,
  testID,
}) => {
  const { colors } = useTheme();

  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      Linking.openURL(url);
    }
  };

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: color,
      paddingVertical: 16,
      paddingHorizontal: 20,
      borderRadius: 12,
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    text: {
      color: '#fff',
      fontWeight: '600',
      marginLeft: 8,
      fontSize: 14,
    },
  });

  return (
    <TouchableOpacity
      style={[styles.container, style]}
      onPress={handlePress}
      activeOpacity={0.8}
      testID={testID}
    >
      <Ionicons name={icon} size={24} color="#fff" />
      <Text style={styles.text}>{platform}</Text>
    </TouchableOpacity>
  );
};

export default SocialButton;