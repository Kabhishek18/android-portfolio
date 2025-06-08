// contexts/ThemeContext.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Appearance, ColorSchemeName } from 'react-native';

type Theme = 'light' | 'dark' | 'system';

interface ThemeContextType {
  theme: Theme;
  colorScheme: ColorSchemeName;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
  colors: typeof lightColors | typeof darkColors;
}

export const lightColors = {
  primary: '#667eea',
  secondary: '#764ba2',
  background: '#f8f9fa',
  surface: '#ffffff',
  card: '#ffffff',
  text: '#333333',
  textSecondary: '#666666',
  textTertiary: '#999999',
  border: '#e9ecef',
  success: '#4CAF50',
  warning: '#FF9800',
  error: '#F44336',
  info: '#2196F3',
  accent: '#FF6B35',
  shadow: 'rgba(0, 0, 0, 0.1)',
  overlay: 'rgba(0, 0, 0, 0.5)',
  headerGradientStart: '#667eea',
  headerGradientEnd: '#764ba2',
  statusBar: 'dark-content' as const,
};

export const darkColors = {
  primary: '#8B9FFF',
  secondary: '#9B7FE8',
  background: '#121212',
  surface: '#1e1e1e',
  card: '#2d2d2d',
  text: '#ffffff',
  textSecondary: '#b0b0b0',
  textTertiary: '#808080',
  border: '#404040',
  success: '#66BB6A',
  warning: '#FFB74D',
  error: '#EF5350',
  info: '#42A5F5',
  accent: '#FF8A65',
  shadow: 'rgba(0, 0, 0, 0.3)',
  overlay: 'rgba(0, 0, 0, 0.7)',
  headerGradientStart: '#1a1a2e',
  headerGradientEnd: '#16213e',
  statusBar: 'light-content' as const,
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>('system');
  const [colorScheme, setColorScheme] = useState<ColorSchemeName>(
    Appearance.getColorScheme()
  );

  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setColorScheme(colorScheme);
    });

    return () => subscription?.remove();
  }, []);

  const getActiveColorScheme = (): ColorSchemeName => {
    if (theme === 'system') {
      return colorScheme;
    }
    return theme as ColorSchemeName;
  };

  const activeColorScheme = getActiveColorScheme();
  const colors = activeColorScheme === 'dark' ? darkColors : lightColors;

  const toggleTheme = () => {
    const themes: Theme[] = ['light', 'dark', 'system'];
    const currentIndex = themes.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themes.length;
    setThemeState(themes[nextIndex]);
  };

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };

  const value: ThemeContextType = {
    theme,
    colorScheme: activeColorScheme,
    toggleTheme,
    setTheme,
    colors,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};