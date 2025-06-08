// app/home/_layout.tsx - Complete Layout with Settings Tab
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { Platform } from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';

export default function TabLayout() {
  const { colors } = useTheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textTertiary,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopWidth: 1,
          borderTopColor: colors.border,
          height: Platform.OS === 'ios' ? 88 : 68,
          paddingBottom: Platform.OS === 'ios' ? 24 : 8,
          paddingTop: 8,
          paddingHorizontal: 16,
          shadowColor: colors.shadow,
          shadowOffset: {
            width: 0,
            height: -4,
          },
          shadowOpacity: 0.1,
          shadowRadius: 12,
          elevation: 12,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
          marginTop: 4,
        },
        tabBarIconStyle: {
          marginBottom: 0,
        },
        headerShown: false,
      }}>

      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused, size }) => (
            <FontAwesome
              size={focused ? size + 2 : size}
              name="home"
              color={color}
              style={{
                transform: [{ scale: focused ? 1.1 : 1 }],
              }}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="projects"
        options={{
          title: 'Projects',
          tabBarIcon: ({ color, focused, size }) => (
            <FontAwesome
              size={focused ? size + 2 : size}
              name="briefcase"
              color={color}
              style={{
                transform: [{ scale: focused ? 1.1 : 1 }],
              }}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="skills"
        options={{
          title: 'Skills',
          tabBarIcon: ({ color, focused, size }) => (
            <FontAwesome
              size={focused ? size + 2 : size}
              name="star"
              color={color}
              style={{
                transform: [{ scale: focused ? 1.1 : 1 }],
              }}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="contact"
        options={{
          title: 'Contact',
          tabBarIcon: ({ color, focused, size }) => (
            <FontAwesome
              size={focused ? size + 2 : size}
              name="envelope"
              color={color}
              style={{
                transform: [{ scale: focused ? 1.1 : 1 }],
              }}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color, focused, size }) => (
            <Ionicons
              name="settings"
              size={focused ? size + 2 : size}
              color={color}
              style={{
                transform: [{ scale: focused ? 1.1 : 1 }],
              }}
            />
          ),
        }}
      />
    </Tabs>
  );
}