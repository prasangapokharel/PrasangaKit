import React from "react";
import { View, ViewStyle, StyleSheet } from "react-native";

interface CardProps {
  /** Card content */
  children: React.ReactNode;
  /** Whether to show shadow */
  shadow?: boolean;
  /** Card padding */
  padding?: number;
  /** Border radius */
  rounded?: number;
  /** Container style override */
  style?: ViewStyle;
  /** Background color */
  backgroundColor?: string;
}

const Card = React.forwardRef<View, CardProps>(
  (
    {
      children,
      shadow = true,
      padding = 16,
      rounded = 8,
      style,
      backgroundColor = "#ffffff",
    },
    ref
  ) => {
    const styles = StyleSheet.create({
      card: {
        backgroundColor: backgroundColor,
        borderRadius: rounded,
        padding: padding,
        borderWidth: 1,
        borderColor: "#f0f0f0",
        ...(shadow && {
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.08,
          shadowRadius: 4,
          elevation: 3,
        }),
      },
    });

    return (
      <View ref={ref} style={[styles.card, style]}>
        {children}
      </View>
    );
  }
);

Card.displayName = "Card";

export default Card;
