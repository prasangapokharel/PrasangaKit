import React from "react";
import { View, ViewStyle, StyleSheet } from "react-native";
import { useTheme } from "../../lib/theme-context";
import { radii } from "../../lib/radius";

interface AspectRatioProps {
  ratio?: number;
  children?: React.ReactNode;
  style?: ViewStyle;
  rounded?: boolean;
}

export function AspectRatio({
  ratio = 16 / 9,
  children,
  style,
  rounded = true,
}: AspectRatioProps) {
  const { colors } = useTheme();

  const styles = StyleSheet.create({
    root: {
      width: "100%",
      aspectRatio: ratio,
      overflow: "hidden",
      backgroundColor: colors.muted,
      borderRadius: rounded ? radii.lg : 0,
    },
    inner: {
      ...StyleSheet.absoluteFillObject,
    },
  });

  return (
    <View style={[styles.root, style]}>
      <View style={styles.inner}>{children}</View>
    </View>
  );
}

AspectRatio.displayName = "AspectRatio";
export default AspectRatio;
