// components/ui/FilterButton.tsx
import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { useTheme } from '../../../contexts/ThemeContext';
import { FilterButtonProps } from './types';

const FilterButton: React.FC<FilterButtonProps> = ({
  title,
  active = false,
  onPress,
  count,
  style,
  testID,
}) => {
  const { colors } = useTheme();

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingVertical: 10,
      marginRight: 10,
      borderRadius: 25,
      backgroundColor: active ? colors.primary : colors.background,
      borderWidth: 2,
      borderColor: active ? colors.primary : colors.border,
    },
    text: {
      fontSize: 14,
      color: active ? '#fff' : colors.textSecondary,
      fontWeight: active ? '600' : '500',
    },
    countContainer: {
      backgroundColor: active ? 'rgba(255,255,255,0.2)' : colors.border,
      marginLeft: 8,
      paddingHorizontal: 6,
      paddingVertical: 2,
      borderRadius: 10,
    },
    countText: {
      fontSize: 10,
      color: active ? '#fff' : colors.textTertiary,
      fontWeight: '600',
    },
  });

  return (
    <TouchableOpacity
      style={[styles.container, style]}
      onPress={onPress}
      activeOpacity={0.7}
      testID={testID}
    >
      <Text style={styles.text}>{title}</Text>
      {count !== undefined && (
        <View style={styles.countContainer}>
          <Text style={styles.countText}>{count}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default FilterButton;