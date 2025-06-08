// components/ui/Avatar.tsx
import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';
import { AvatarProps } from './types';

const Avatar: React.FC<AvatarProps> = ({
  source,
  size = 60,
  name,
  showStatus = false,
  statusColor = '#4CAF50',
  style,
  testID,
}) => {
  const { colors } = useTheme();

  const getInitials = (name?: string) => {
    if (!name) return '?';
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const styles = StyleSheet.create({
    container: {
      position: 'relative',
      width: size,
      height: size,
    },
    avatar: {
      width: size,
      height: size,
      borderRadius: size / 2,
      backgroundColor: colors.primary,
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden',
    },
    image: {
      width: '100%',
      height: '100%',
    },
    initials: {
      color: '#fff',
      fontSize: size * 0.4,
      fontWeight: 'bold',
    },
    statusIndicator: {
      position: 'absolute',
      bottom: 0,
      right: 0,
      width: size * 0.25,
      height: size * 0.25,
      borderRadius: (size * 0.25) / 2,
      backgroundColor: statusColor,
      borderWidth: 2,
      borderColor: colors.surface,
    },
  });

  return (
    <View style={[styles.container, style]} testID={testID}>
      <View style={styles.avatar}>
        {source ? (
          <Image source={source} style={styles.image} />
        ) : (
          <Text style={styles.initials}>{getInitials(name)}</Text>
        )}
      </View>
      {showStatus && <View style={styles.statusIndicator} />}
    </View>
  );
};

export default Avatar;