// components/ui/Section.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';
import { SectionProps } from './types';
import Card from './Card';

const Section: React.FC<SectionProps> = ({
  title,
  subtitle,
  children,
  headerAction,
  style,
  testID,
}) => {
  const { colors } = useTheme();

  const styles = StyleSheet.create({
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: 15,
    },
    titleContainer: {
      flex: 1,
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      color: colors.text,
      marginBottom: subtitle ? 5 : 0,
    },
    subtitle: {
      fontSize: 14,
      color: colors.textSecondary,
      lineHeight: 20,
    },
    content: {
      flex: 1,
    },
  });

  return (
    <Card style={style} testID={testID}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{title}</Text>
          {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
        </View>
        {headerAction}
      </View>
      <View style={styles.content}>{children}</View>
    </Card>
  );
};

export default Section;