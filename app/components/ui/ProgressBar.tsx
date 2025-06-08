// components/ui/ProgressBar.tsx
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';
import { ProgressBarProps } from './types';

const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  color,
  backgroundColor,
  height = 8,
  animated = true,
  showLabel = false,
  style,
  testID,
}) => {
  const { colors } = useTheme();
  const animatedValue = new Animated.Value(0);

  useEffect(() => {
    if (animated) {
      Animated.timing(animatedValue, {
        toValue: progress,
        duration: 1000,
        useNativeDriver: false,
      }).start();
    } else {
      animatedValue.setValue(progress);
    }
  }, [progress, animated]);

  const progressWidth = animatedValue.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
    extrapolate: 'clamp',
  });

  const styles = StyleSheet.create({
    container: {
      width: '100%',
    },
    progressContainer: {
      width: '100%',
      height,
      backgroundColor: backgroundColor || colors.border,
      borderRadius: height / 2,
      overflow: 'hidden',
    },
    progressBar: {
      height: '100%',
      backgroundColor: color || colors.primary,
      borderRadius: height / 2,
    },
    label: {
      fontSize: 12,
      color: colors.textSecondary,
      marginTop: 4,
      textAlign: 'right',
      fontWeight: '500',
    },
  });

  return (
    <View style={[styles.container, style]} testID={testID}>
      <View style={styles.progressContainer}>
        <Animated.View style={[styles.progressBar, { width: progressWidth }]} />
      </View>
      {showLabel && <Text style={styles.label}>{progress}%</Text>}
    </View>
  );
};

export default ProgressBar;