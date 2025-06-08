// hooks/useAnimatedValue.ts
import { useRef, useEffect } from 'react';
import { Animated } from 'react-native';

interface AnimationConfig {
  toValue: number;
  duration?: number;
  delay?: number;
  useNativeDriver?: boolean;
}

export const useAnimatedValue = (initialValue: number = 0) => {
  const animatedValue = useRef(new Animated.Value(initialValue)).current;

  const animate = ({
    toValue,
    duration = 300,
    delay = 0,
    useNativeDriver = true,
  }: AnimationConfig) => {
    return Animated.timing(animatedValue, {
      toValue,
      duration,
      delay,
      useNativeDriver,
    });
  };

  const spring = ({
    toValue,
    useNativeDriver = true,
  }: Omit<AnimationConfig, 'duration'>) => {
    return Animated.spring(animatedValue, {
      toValue,
      tension: 50,
      friction: 7,
      useNativeDriver,
    });
  };

  const setValue = (value: number) => {
    animatedValue.setValue(value);
  };

  const reset = () => {
    animatedValue.setValue(initialValue);
  };

  return {
    value: animatedValue,
    animate,
    spring,
    setValue,
    reset,
  };
};