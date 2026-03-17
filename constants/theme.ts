/**
 * Premium Design System Colors
 * Comprehensive light and dark mode color tokens for premium UI
 */

import { Platform } from 'react-native';

// Primary brand colors
const primaryLight = '#0e7ae5';
const primaryDark = '#ffffff';

export const Colors = {
  light: {
    // Primary brand
    text: '#0a0a0a',
    background: '#ffffff',
    tint: primaryLight,
    icon: '#3a3a3a',
    tabIconDefault: '#737373',
    tabIconSelected: primaryLight,
    
    // Extended palette
    primary: '#0e7ae5',
    primaryLight: '#f0f8ff',
    primaryDark: '#052242',
    
    secondary: '#14b8a6',
    secondaryLight: '#f0fdfa',
    secondaryDark: '#054e48',
    
    accent: '#9333ea',
    accentLight: '#faf5ff',
    accentDark: '#3f0f5c',
    
    success: '#22c55e',
    successLight: '#f0fdf4',
    error: '#ef4444',
    errorLight: '#fef2f2',
    warning: '#f59e0b',
    warningLight: '#fef7e0',
    
    border: '#e8e8e8',
    borderLight: '#f5f5f5',
    surface: '#fafafa',
    surfaceAlt: '#f5f5f5',
    
    textMuted: '#737373',
    textSecondary: '#525252',
    placeholder: '#a1a1a1',
  },
  dark: {
    // Primary brand
    text: '#ffffff',
    background: '#0a0a0a',
    tint: primaryDark,
    icon: '#d4d4d4',
    tabIconDefault: '#a1a1a1',
    tabIconSelected: primaryDark,
    
    // Extended palette
    primary: '#a2d5ff',
    primaryLight: '#f0f8ff',
    primaryDark: '#052242',
    
    secondary: '#5ff8d8',
    secondaryLight: '#f0fdfa',
    secondaryDark: '#054e48',
    
    accent: '#d8b4fe',
    accentLight: '#faf5ff',
    accentDark: '#3f0f5c',
    
    success: '#86efac',
    successLight: '#f0fdf4',
    error: '#f87171',
    errorLight: '#fef2f2',
    warning: '#fbbf24',
    warningLight: '#fef7e0',
    
    border: '#3a3a3a',
    borderLight: '#525252',
    surface: '#1a1a1a',
    surfaceAlt: '#242424',
    
    textMuted: '#a1a1a1',
    textSecondary: '#737373',
    placeholder: '#525252',
  },
};

/**
 * Semantic color tokens for consistent UI
 */
export const SemanticColors = {
  light: {
    // Button backgrounds
    buttonPrimary: '#0e7ae5',
    buttonPrimaryHover: '#0a5fa8',
    buttonPrimaryActive: '#083a6e',
    
    buttonSecondary: '#14b8a6',
    buttonSecondaryHover: '#0d9488',
    
    buttonDefault: '#f5f5f5',
    buttonDefaultHover: '#e8e8e8',
    
    // Status colors
    success: '#22c55e',
    error: '#ef4444',
    warning: '#f59e0b',
    info: '#0e7ae5',
    
    // Input colors
    inputBorder: '#d4d4d4',
    inputBorderFocus: '#0e7ae5',
    inputBackground: '#ffffff',
    inputBackgroundFocus: '#f0f8ff',
    inputText: '#0a0a0a',
    inputPlaceholder: '#a1a1a1',
    
    // Cards and surfaces
    cardBackground: '#ffffff',
    cardBorder: '#e8e8e8',
    cardShadow: 'rgba(0, 0, 0, 0.08)',
  },
  dark: {
    // Button backgrounds
    buttonPrimary: '#a2d5ff',
    buttonPrimaryHover: '#6bb9ff',
    buttonPrimaryActive: '#0e7ae5',
    
    buttonSecondary: '#5ff8d8',
    buttonSecondaryHover: '#2eecbf',
    
    buttonDefault: '#242424',
    buttonDefaultHover: '#3a3a3a',
    
    // Status colors
    success: '#86efac',
    error: '#f87171',
    warning: '#fbbf24',
    info: '#a2d5ff',
    
    // Input colors
    inputBorder: '#3a3a3a',
    inputBorderFocus: '#a2d5ff',
    inputBackground: '#1a1a1a',
    inputBackgroundFocus: '#242424',
    inputText: '#ffffff',
    inputPlaceholder: '#737373',
    
    // Cards and surfaces
    cardBackground: '#1a1a1a',
    cardBorder: '#3a3a3a',
    cardShadow: 'rgba(0, 0, 0, 0.5)',
  },
};

/**
 * Typography system
 * Platform-specific font families for optimal rendering
 */
export const Fonts = Platform.select({
  ios: {
    /** iOS system fonts */
    sans: 'system-ui',
    serif: 'ui-serif',
    rounded: 'ui-rounded',
    mono: 'ui-monospace',
  },
  default: {
    sans: 'Roboto',
    serif: 'serif',
    rounded: 'Roboto Rounded',
    mono: 'monospace',
  },
  web: {
    sans: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji'",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});

/**
 * Font sizes and line heights
 */
export const Typography = {
  fontSize: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    "2xl": 24,
    "3xl": 30,
    "4xl": 36,
    "5xl": 44,
  },
  lineHeight: {
    xs: 16,
    sm: 20,
    base: 24,
    lg: 28,
    xl: 28,
    "2xl": 32,
    "3xl": 36,
    "4xl": 40,
    "5xl": 52,
  },
  fontWeight: {
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
  },
};

/**
 * Spacing scale
 * 4px base unit for consistent spacing
 */
export const Spacing = {
  xs: 4,
  sm: 8,
  base: 12,
  md: 16,
  lg: 20,
  xl: 24,
  "2xl": 32,
  "3xl": 40,
  "4xl": 48,
};
