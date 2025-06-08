// app/components/ui/Button.tsx
import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../../contexts/ThemeContext';
import { ButtonProps } from './types';

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  disabled = false,
  loading = false,
  icon,
  iconPosition = 'left',
  variant = 'primary',
  size = 'medium',
  fullWidth = false,
  style,
  textStyle,
  testID,
}) => {
  const { colors } = useTheme();

  const getVariantColors = () => {
    switch (variant) {
      case 'primary':
        return {
          backgroundColor: colors.primary,
          textColor: '#fff',
        };
      case 'secondary':
        return {
          backgroundColor: colors.secondary,
          textColor: '#fff',
        };
      case 'success':
        return {
          backgroundColor: colors.success,
          textColor: '#fff',
        };
      case 'warning':
        return {
          backgroundColor: colors.warning,
          textColor: '#fff',
        };
      case 'error':
        return {
          backgroundColor: colors.error,
          textColor: '#fff',
        };
      case 'info':
        return {
          backgroundColor: colors.info,
          textColor: '#fff',
        };
      default:
        return {
          backgroundColor: colors.primary,
          textColor: '#fff',
        };
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return {
          paddingVertical: 8,
          paddingHorizontal: 16,
          fontSize: 14,
          iconSize: 16,
        };
      case 'large':
        return {
          paddingVertical: 18,
          paddingHorizontal: 24,
          fontSize: 18,
          iconSize: 24,
        };
      default:
        return {
          paddingVertical: 14,
          paddingHorizontal: 20,
          fontSize: 16,
          iconSize: 20,
        };
    }
  };

  const variantColors = getVariantColors();
  const sizeStyles = getSizeStyles();

  const buttonStyle: ViewStyle = {
    backgroundColor: disabled ? colors.textTertiary : variantColors.backgroundColor,
    paddingVertical: sizeStyles.paddingVertical,
    paddingHorizontal: sizeStyles.paddingHorizontal,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.shadow,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: disabled ? 0 : 0.15,
    shadowRadius: 6,
    elevation: disabled ? 0 : 4,
    opacity: disabled ? 0.6 : 1,
    ...(fullWidth && { alignSelf: 'stretch' }),
  };

  const textStyles: TextStyle = {
    color: disabled ? colors.textSecondary : variantColors.textColor,
    fontSize: sizeStyles.fontSize,
    fontWeight: '600',
    textAlign: 'center',
  };

  const renderIcon = () => {
    if (loading) {
      return (
        <ActivityIndicator
          size="small"
          color={textStyles.color}
          style={{ marginRight: 8 }}
        />
      );
    }

    if (icon) {
      return (
        <Ionicons
          name={icon}
          size={sizeStyles.iconSize}
          color={textStyles.color}
          style={{
            marginRight: iconPosition === 'left' ? 8 : 0,
            marginLeft: iconPosition === 'right' ? 8 : 0,
          }}
        />
      );
    }

    return null;
  };

  return (
    <TouchableOpacity
      style={[buttonStyle, style]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
      testID={testID}
    >
      {iconPosition === 'left' && renderIcon()}
      <Text style={[textStyles, textStyle]}>{title}</Text>
      {iconPosition === 'right' && renderIcon()}
    </TouchableOpacity>
  );
};

export default Button;