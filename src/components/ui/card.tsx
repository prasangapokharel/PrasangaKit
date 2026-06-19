import React from "react";
import { View, ViewStyle, StyleSheet, TextStyle } from "react-native";
import { useTheme } from "../../lib/theme-context";
import { radii } from "../../lib/radius";
import Text from "./text";

export interface CardProps {
  children: React.ReactNode;
  shadow?: boolean;
  padding?: number;
  rounded?: number;
  style?: ViewStyle;
  backgroundColor?: string;
  borderColor?: string;
  shadowIntensity?: "subtle" | "medium" | "premium";
}

export function Card({
  children,
  shadow = true,
  padding = 0,
  rounded = radii.lg,
  style,
  backgroundColor,
  borderColor,
  shadowIntensity = "medium",
}: CardProps) {
  const { colors } = useTheme();

  const shadowConfigs = {
    subtle: {
      shadowColor: colors.foreground,
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.04,
      shadowRadius: 2,
      elevation: 1,
    },
    medium: {
      shadowColor: colors.foreground,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.06,
      shadowRadius: 4,
      elevation: 2,
    },
    premium: {
      shadowColor: colors.foreground,
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.1,
      shadowRadius: 16,
      elevation: 4,
    },
  };

  const styles = StyleSheet.create({
    card: {
      backgroundColor: backgroundColor || colors.card,
      borderRadius: rounded,
      padding,
      borderWidth: 1,
      borderColor: borderColor || colors.border,
      overflow: "hidden",
      ...(shadow && shadowConfigs[shadowIntensity]),
    },
  });

  return <View style={[styles.card, style]}>{children}</View>;
}

export function CardHeader({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: ViewStyle;
}) {
  return (
    <View
      style={[
        {
          paddingHorizontal: 24,
          paddingTop: 24,
          paddingBottom: 8,
          gap: 6,
          position: "relative",
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}

export function CardTitle({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: TextStyle;
}) {
  const { colors } = useTheme();
  return (
    <Text
      variant="h4"
      style={{ color: colors.foreground, fontWeight: "600", ...(style as TextStyle) }}
    >
      {children}
    </Text>
  );
}

export function CardDescription({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: TextStyle;
}) {
  return (
    <Text variant="small" color="muted" style={style}>
      {children}
    </Text>
  );
}

export function CardAction({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: ViewStyle;
}) {
  return (
    <View style={[{ position: "absolute", top: 24, right: 24 }, style]}>
      {children}
    </View>
  );
}

export function CardContent({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: ViewStyle;
}) {
  return <View style={[{ paddingHorizontal: 24, paddingVertical: 8 }, style]}>{children}</View>;
}

export function CardFooter({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: ViewStyle;
}) {
  return (
    <View
      style={[
        {
          paddingHorizontal: 24,
          paddingTop: 8,
          paddingBottom: 24,
          gap: 10,
          flexDirection: "column",
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}

Card.displayName = "Card";
export default Card;
