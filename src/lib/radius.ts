/**
 * shadcn-aligned border radius tokens — single source for all UI components
 * Matches --radius in globals.css (12px base)
 */
export const radii = {
  xs: 4,
  sm: 6,
  md: 8,
  lg: 12,
  xl: 16,
  "2xl": 20,
  "3xl": 24,
  full: 9999,
} as const;

export type Radii = typeof radii;
