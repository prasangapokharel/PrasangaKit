import React from "react";
import {
  TouchableOpacity,
  Text,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
  View,
} from "react-native";
import { useTheme } from "../../lib/theme-context";
import { typography } from "../../lib/typography";
import { radii } from "../../lib/radius";

export type ButtonVariant =
  | "default"
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "destructive"
  | "link";

export type ButtonSize =
  | "xs"
  | "sm"
  | "md"
  | "lg"
  | "icon-xs"
  | "icon-sm"
  | "icon"
  | "icon-lg";

interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  isLoading?: boolean;
  children: React.ReactNode;
  onPress?: () => void;
  containerStyle?: ViewStyle;
  textStyle?: TextStyle;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
  style?: ViewStyle;
  accessibilityLabel?: string;
}

const ICON_SIZES: Record<string, number> = {
  "icon-xs": 24,
  "icon-sm": 32,
  icon: 36,
  "icon-lg": 40,
};

function isIconOnlyChild(children: React.ReactNode) {
  return React.isValidElement(children) && typeof children !== "string" && typeof children !== "number";
}

const Button = React.forwardRef<View, ButtonProps>(
  (
    {
      variant = "default",
      size = "md",
      disabled = false,
      isLoading = false,
      children,
      onPress,
      containerStyle,
      textStyle,
      leftIcon,
      rightIcon,
      fullWidth = false,
      style,
      accessibilityLabel,
    },
    ref
  ) => {
    const { colors } = useTheme();
    const isIconButton = size.startsWith("icon");
    const iconOnly = isIconButton || isIconOnlyChild(children);

    const sizeStyles: Record<ButtonSize, ViewStyle> = {
      xs: { paddingHorizontal: 10, paddingVertical: 4, minHeight: 24 },
      sm: { paddingHorizontal: 12, paddingVertical: 8, minHeight: 32 },
      md: { paddingHorizontal: 16, paddingVertical: 12, minHeight: 40 },
      lg: { paddingHorizontal: 24, paddingVertical: 16, minHeight: 48 },
      "icon-xs": { width: ICON_SIZES["icon-xs"], height: ICON_SIZES["icon-xs"], padding: 0 },
      "icon-sm": { width: ICON_SIZES["icon-sm"], height: ICON_SIZES["icon-sm"], padding: 0 },
      icon: { width: ICON_SIZES.icon, height: ICON_SIZES.icon, padding: 0 },
      "icon-lg": { width: ICON_SIZES["icon-lg"], height: ICON_SIZES["icon-lg"], padding: 0 },
    };

    const variantStyles: Record<ButtonVariant, ViewStyle> = {
      default: {
        backgroundColor: colors.muted,
        borderWidth: 1,
        borderColor: colors.border,
      },
      primary: { backgroundColor: colors.primary },
      secondary: { backgroundColor: colors.secondary },
      outline: {
        backgroundColor: "transparent",
        borderWidth: 1,
        borderColor: colors.border,
      },
      ghost: { backgroundColor: "transparent" },
      destructive: { backgroundColor: colors.destructive },
      link: { backgroundColor: "transparent", paddingHorizontal: 0, paddingVertical: 0, minHeight: undefined },
    };

    const variantTextColors: Record<ButtonVariant, string> = {
      default: colors.foreground,
      primary: colors.primaryForeground,
      secondary: colors.secondaryForeground,
      outline: colors.foreground,
      ghost: colors.foreground,
      destructive: colors.destructiveForeground,
      link: colors.primary,
    };

    const textSizeMap: Record<ButtonSize, TextStyle> = {
      xs: typography.button.sm,
      sm: typography.button.sm,
      md: typography.button.md,
      lg: typography.button.lg,
      "icon-xs": typography.button.sm,
      "icon-sm": typography.button.sm,
      icon: typography.button.md,
      "icon-lg": typography.button.lg,
    };

    return (
      <TouchableOpacity
        ref={ref}
        onPress={onPress}
        disabled={disabled || isLoading}
        activeOpacity={0.7}
        accessibilityLabel={accessibilityLabel}
        accessibilityRole="button"
        style={[
          {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: radii.md,
            opacity: disabled ? 0.5 : 1,
          },
          sizeStyles[size],
          variantStyles[variant],
          fullWidth && { alignSelf: "stretch" },
          containerStyle,
          style,
        ]}
      >
        {isLoading ? (
          <ActivityIndicator color={variantTextColors[variant]} size="small" />
        ) : iconOnly ? (
          children
        ) : (
          <>
            {leftIcon && <View style={{ marginRight: 8 }}>{leftIcon}</View>}
            <Text
              style={[
                { color: variantTextColors[variant] },
                textSizeMap[size],
                variant === "link" && { textDecorationLine: "underline" },
                textStyle,
              ]}
            >
              {children}
            </Text>
            {rightIcon && <View style={{ marginLeft: 8 }}>{rightIcon}</View>}
          </>
        )}
      </TouchableOpacity>
    );
  }
);

Button.displayName = "Button";

export default Button;
