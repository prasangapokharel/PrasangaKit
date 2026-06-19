import React from "react";
import { Text, TextStyle, StyleSheet } from "react-native";
import { useTheme } from "../../lib/theme-context";
import { typography } from "../../lib/typography";

interface LabelProps {
  children: React.ReactNode;
  style?: TextStyle;
  nativeID?: string;
}

export function Label({ children, style, nativeID }: LabelProps) {
  const { colors } = useTheme();

  const styles = StyleSheet.create({
    label: {
      ...typography.label.md,
      color: colors.foreground,
      marginBottom: 6,
    },
  });

  return (
    <Text nativeID={nativeID} style={[styles.label, style]}>
      {children}
    </Text>
  );
}

Label.displayName = "Label";
export default Label;
