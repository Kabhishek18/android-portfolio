// components/ui/types.ts
import { ViewStyle, TextStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export interface BaseComponentProps {
  style?: ViewStyle;
  testID?: string;
}

export interface ThemeProps {
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';
  size?: 'small' | 'medium' | 'large';
}

export interface ButtonProps extends BaseComponentProps, ThemeProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  icon?: keyof typeof Ionicons.glyphMap;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  textStyle?: TextStyle;
}

export interface CardProps extends BaseComponentProps {
  children: React.ReactNode;
  elevated?: boolean;
  padding?: number;
  margin?: number;
  radius?: number;
}

export interface BadgeProps extends BaseComponentProps, ThemeProps {
  text: string;
  icon?: keyof typeof Ionicons.glyphMap;
  textStyle?: TextStyle;
}

export interface AvatarProps extends BaseComponentProps {
  source?: { uri: string } | number;
  size?: number;
  name?: string;
  showStatus?: boolean;
  statusColor?: string;
}

export interface ProgressBarProps extends BaseComponentProps {
  progress: number;
  color?: string;
  backgroundColor?: string;
  height?: number;
  animated?: boolean;
  showLabel?: boolean;
}

export interface SectionProps extends BaseComponentProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  headerAction?: React.ReactNode;
}

// Project related types
export interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  githubUrl: string;
  pypiUrl?: string;
  type: string;
  lastUpdated?: string;
  stars?: number;
  license?: string;
}

export interface ProjectCardProps extends BaseComponentProps {
  project: Project;
  onPress?: (project: Project) => void;
  showActions?: boolean;
}

// Skill related types
export interface Skill {
  name: string;
  level: number;
  category: string;
  icon: string;
  years?: string;
}

export interface SkillCardProps extends BaseComponentProps {
  skill: Skill;
  index?: number;
  animated?: boolean;
}

// Stats related types
export interface StatsCardProps extends BaseComponentProps {
  value: string;
  label: string;
  icon?: keyof typeof Ionicons.glyphMap;
  color?: string;
  onPress?: () => void;
}

// Contact related types
export interface ContactButtonProps extends BaseComponentProps {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  subtitle: string;
  onPress: () => void;
  color: string;
  gradient?: boolean;
}

// Social related types
export interface SocialButtonProps extends BaseComponentProps {
  platform: string;
  url: string;
  color: string;
  icon: keyof typeof Ionicons.glyphMap;
  onPress?: () => void;
}

// Filter related types
export interface FilterButtonProps extends BaseComponentProps {
  title: string;
  active?: boolean;
  onPress: () => void;
  count?: number;
}