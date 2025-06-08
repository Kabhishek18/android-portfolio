// components/ui/Card.tsx
import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';
import { CardProps } from './types';

const Card: React.FC<CardProps> = ({
  children,
  style,
  elevated = true,
  padding = 20,
  margin = 15,
  radius = 16,
  testID,
}) => {
  const { colors } = useTheme();

  const cardStyle: ViewStyle = {
    backgroundColor: colors.surface,
    padding,
    margin,
    borderRadius: radius,
    borderWidth: 1,
    borderColor: colors.border,
    ...(elevated && {
      shadowColor: colors.shadow,
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 5,
    }),
  };

  return (
    <View style={[cardStyle, style]} testID={testID}>
      {children}
    </View>
  );
};

export default Card;