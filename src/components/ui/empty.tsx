import React from "react";
import { View, ViewStyle } from "react-native";
import { useTheme } from "../../lib/theme-context";
import { radii } from "../../lib/radius";
import Text from "./text";

export function Empty({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: ViewStyle;
}) {
  const { colors } = useTheme();
  return (
    <View
      style={[
        {
          alignItems: "center",
          paddingVertical: 32,
          paddingHorizontal: 24,
          borderRadius: radii.lg,
          borderWidth: 1,
          borderColor: colors.border,
          borderStyle: "dashed",
          gap: 16,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}

export function EmptyHeader({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: ViewStyle;
}) {
  return <View style={[{ alignItems: "center", gap: 8 }, style]}>{children}</View>;
}

export function EmptyMedia({
  children,
  variant = "icon",
  style,
}: {
  children: React.ReactNode;
  variant?: "icon" | "default";
  style?: ViewStyle;
}) {
  const { colors } = useTheme();
  const size = variant === "icon" ? 48 : 64;

  return (
    <View
      style={[
        {
          width: size,
          height: size,
          borderRadius: radii.lg,
          backgroundColor: colors.muted,
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 4,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}

export function EmptyTitle({ children }: { children: React.ReactNode }) {
  const { colors } = useTheme();
  return (
    <Text variant="h4" style={{ color: colors.foreground, textAlign: "center", fontWeight: "600" }}>
      {children}
    </Text>
  );
}

export function EmptyDescription({ children }: { children: React.ReactNode }) {
  return (
    <Text variant="small" color="muted" style={{ textAlign: "center", maxWidth: 280, lineHeight: 20 }}>
      {children}
    </Text>
  );
}

export function EmptyContent({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: ViewStyle;
}) {
  return (
    <View style={[{ flexDirection: "row", flexWrap: "wrap", justifyContent: "center", gap: 8 }, style]}>
      {children}
    </View>
  );
}

Empty.displayName = "Empty";
export default Empty;
