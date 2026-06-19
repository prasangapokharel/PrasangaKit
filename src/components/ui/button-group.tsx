import React from "react";
import { View, ViewStyle, StyleSheet } from "react-native";
import { useTheme } from "../../lib/theme-context";
import { radii } from "../../lib/radius";

interface ButtonGroupProps {
  children: React.ReactNode;
  style?: ViewStyle;
  orientation?: "horizontal" | "vertical";
}

export function ButtonGroup({
  children,
  style,
  orientation = "horizontal",
}: ButtonGroupProps) {
  const { colors } = useTheme();

  const styles = StyleSheet.create({
    group: {
      flexDirection: orientation === "horizontal" ? "row" : "column",
      alignItems: "stretch",
      borderRadius: radii.md,
      borderWidth: 1,
      borderColor: colors.border,
      overflow: "hidden",
      alignSelf: "flex-start",
    },
  });

  return <View style={[styles.group, style]}>{children}</View>;
}

ButtonGroup.displayName = "ButtonGroup";
export default ButtonGroup;
