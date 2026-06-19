/**
 * Type-safe environment configuration (static EXPO_PUBLIC_* access only)
 */

export const env = {
  APP_VERSION: process.env.EXPO_PUBLIC_APP_VERSION ?? "1.5.0",
  APP_NAME: process.env.EXPO_PUBLIC_APP_NAME ?? "Prasanga UI",
  APP_ENVIRONMENT: process.env.EXPO_PUBLIC_ENVIRONMENT ?? "development",

  API_BASE_URL: process.env.EXPO_PUBLIC_API_BASE_URL ?? "http://localhost:3000/api",
  API_TIMEOUT: parseInt(process.env.EXPO_PUBLIC_API_TIMEOUT ?? "30000", 10),
  API_RETRY_ATTEMPTS: parseInt(process.env.EXPO_PUBLIC_API_RETRY_ATTEMPTS ?? "3", 10),

  THEME_DEFAULT: process.env.EXPO_PUBLIC_THEME_DEFAULT ?? "light",
  THEME_PERSISTENCE: process.env.EXPO_PUBLIC_THEME_PERSISTENCE === "true",

  TOAST_DURATION: parseInt(process.env.EXPO_PUBLIC_TOAST_DURATION ?? "3000", 10),
  MODAL_OVERLAY_OPACITY: parseFloat(process.env.EXPO_PUBLIC_MODAL_OVERLAY_OPACITY ?? "0.5"),
  DRAWER_ANIMATION_DURATION: parseInt(
    process.env.EXPO_PUBLIC_DRAWER_ANIMATION_DURATION ?? "400",
    10
  ),

  ENABLE_LOGGING: process.env.EXPO_PUBLIC_ENABLE_LOGGING !== "false",
  ENABLE_ANALYTICS: process.env.EXPO_PUBLIC_ENABLE_ANALYTICS === "true",
  ENABLE_CRASH_REPORTING: process.env.EXPO_PUBLIC_ENABLE_CRASH_REPORTING === "true",

  SENTRY_DSN: process.env.EXPO_PUBLIC_SENTRY_DSN ?? "",
  ANALYTICS_TRACKING_ID: process.env.EXPO_PUBLIC_ANALYTICS_TRACKING_ID ?? "",
} as const;

export type Environment = typeof env;

export function validateEnvironment(): { valid: boolean; errors: string[] } {
  return { valid: true, errors: [] };
}

export const isDevelopment = (): boolean => env.APP_ENVIRONMENT === "development";
export const isProduction = (): boolean => env.APP_ENVIRONMENT === "production";
export const isStaging = (): boolean => env.APP_ENVIRONMENT === "staging";

export default env;
