// components/ui/SkillCard.tsx
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';
import { SkillCardProps } from './types';
import ProgressBar from './ProgressBar';

const SkillCard: React.FC<SkillCardProps> = ({
  skill,
  index = 0,
  animated = true,
  style,
  testID,
}) => {
  const { colors } = useTheme();
  const scaleValue = new Animated.Value(0);

  useEffect(() => {
    if (animated) {
      const delay = index * 100;
      setTimeout(() => {
        Animated.spring(scaleValue, {
          toValue: 1,
          tension: 50,
          friction: 7,
          useNativeDriver: true,
        }).start();
      }, delay);
    } else {
      scaleValue.setValue(1);
    }
  }, [skill, index, animated]);

  const getSkillColor = (level: number) => {
    if (level >= 90) return colors.success;
    if (level >= 80) return colors.info;
    if (level >= 70) return colors.warning;
    return colors.accent;
  };

  const getProficiencyText = (level: number) => {
    if (level >= 90) return 'Expert';
    if (level >= 80) return 'Advanced';
    if (level >= 70) return 'Intermediate';
    return 'Learning';
  };

  const styles = StyleSheet.create({
    container: {
      backgroundColor: colors.surface,
      padding: 20,
      marginBottom: 2,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 12,
    },
    titleContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
    },
    icon: {
      fontSize: 20,
      marginRight: 12,
    },
    name: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.text,
      flex: 1,
    },
    levelContainer: {
      backgroundColor: colors.background,
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderRadius: 12,
    },
    level: {
      fontSize: 14,
      fontWeight: 'bold',
      color: getSkillColor(skill.level),
    },
    progressContainer: {
      marginBottom: 10,
    },
    footer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    proficiencyText: {
      fontSize: 12,
      color: colors.textSecondary,
      fontWeight: '500',
      backgroundColor: colors.background,
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 8,
    },
    yearsText: {
      fontSize: 11,
      color: colors.textTertiary,
      fontStyle: 'italic',
    },
  });

  return (
    <Animated.View
      style={[
        styles.container,
        style,
        { transform: [{ scale: scaleValue }] }
      ]}
      testID={testID}
    >
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Text style={styles.icon}>{skill.icon}</Text>
          <Text style={styles.name}>{skill.name}</Text>
        </View>
        <View style={styles.levelContainer}>
          <Text style={styles.level}>{skill.level}%</Text>
        </View>
      </View>

      <View style={styles.progressContainer}>
        <ProgressBar
          progress={skill.level}
          color={getSkillColor(skill.level)}
          animated={animated}
        />
      </View>

      <View style={styles.footer}>
        <Text style={styles.proficiencyText}>
          {getProficiencyText(skill.level)}
        </Text>
        {skill.years && (
          <Text style={styles.yearsText}>
            {skill.years} experience
          </Text>
        )}
      </View>
    </Animated.View>
  );
};

export default SkillCard;