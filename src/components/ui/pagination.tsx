import React from "react";
import { View, Pressable, StyleSheet, ViewStyle } from "react-native";
import { useTheme } from "../../lib/theme-context";
import { typography } from "../../lib/typography";
import { radii } from "../../lib/radius";
import Text from "./text";

export function Pagination({ children, style }: { children: React.ReactNode; style?: ViewStyle }) {
  return (
    <View style={[{ flexDirection: "row", justifyContent: "center" }, style]}>
      {children}
    </View>
  );
}

export function PaginationContent({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: ViewStyle;
}) {
  return (
    <View style={[{ flexDirection: "row", alignItems: "center", gap: 4 }, style]}>
      {children}
    </View>
  );
}

export function PaginationItem({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: ViewStyle;
}) {
  return <View style={style}>{children}</View>;
}

export function PaginationLink({
  children,
  isActive = false,
  onPress,
}: {
  children: React.ReactNode;
  isActive?: boolean;
  onPress?: () => void;
}) {
  const { colors } = useTheme();

  const styles = StyleSheet.create({
    link: {
      minWidth: 36,
      height: 36,
      borderRadius: radii.md,
      alignItems: "center",
      justifyContent: "center",
      borderWidth: 1,
      borderColor: isActive ? colors.primary : colors.border,
      backgroundColor: isActive ? colors.primary : colors.background,
    },
    text: {
      ...typography.body.sm,
      color: isActive ? colors.primaryForeground : colors.foreground,
      fontWeight: isActive ? "600" : "400",
    },
  });

  return (
    <Pressable style={styles.link} onPress={onPress}>
      {typeof children === "string" || typeof children === "number" ? (
        <Text style={styles.text}>{children}</Text>
      ) : (
        children
      )}
    </Pressable>
  );
}

export function PaginationPrevious({ onPress }: { onPress?: () => void }) {
  const { colors } = useTheme();
  return (
    <Pressable
      onPress={onPress}
      style={{
        minWidth: 36,
        height: 36,
        borderRadius: radii.md,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: colors.border,
        marginRight: 4,
      }}
    >
      <Text style={{ color: colors.foreground }}>‹</Text>
    </Pressable>
  );
}

export function PaginationNext({ onPress }: { onPress?: () => void }) {
  const { colors } = useTheme();
  return (
    <Pressable
      onPress={onPress}
      style={{
        minWidth: 36,
        height: 36,
        borderRadius: radii.md,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: colors.border,
        marginLeft: 4,
      }}
    >
      <Text style={{ color: colors.foreground }}>›</Text>
    </Pressable>
  );
}

export function PaginationEllipsis() {
  const { colors } = useTheme();
  return (
    <View style={{ width: 36, height: 36, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ color: colors.mutedForeground }}>…</Text>
    </View>
  );
}

Pagination.displayName = "Pagination";
export default Pagination;
