import React from "react";
import { View, ViewStyle, StyleSheet } from "react-native";

export function FieldGroup({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: ViewStyle;
}) {
  return <View style={[{ gap: 16 }, style]}>{children}</View>;
}

export function Field({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: ViewStyle;
}) {
  const styles = StyleSheet.create({
    field: { gap: 6 },
  });
  return <View style={[styles.field, style]}>{children}</View>;
}

FieldGroup.displayName = "FieldGroup";
Field.displayName = "Field";
export default Field;
