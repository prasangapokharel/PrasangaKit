import React from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  useWindowDimensions,
} from "react-native";
import { createOverlayContext, cloneTrigger } from "../../lib/overlay-root";
import { useTheme } from "../../lib/theme-context";
import { typography } from "../../lib/typography";
import { withOpacity } from "../../lib/utils";
import { createShadows } from "../../lib/theme";
import { radii } from "../../lib/radius";
import { useLayoutMetrics } from "../../lib/layout";
import Button from "./button";

const { OverlayRoot, useOverlayContext } = createOverlayContext("AlertDialog");

export function AlertDialog({
  children,
  open,
  defaultOpen,
  onOpenChange,
}: {
  children: React.ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}) {
  return (
    <OverlayRoot open={open} defaultOpen={defaultOpen} onOpenChange={onOpenChange}>
      {children}
    </OverlayRoot>
  );
}

export function AlertDialogTrigger({
  children,
  asChild = true,
}: {
  children: React.ReactElement;
  asChild?: boolean;
}) {
  const { onOpenChange } = useOverlayContext();
  return cloneTrigger(children, () => onOpenChange(true), asChild);
}

export function AlertDialogContent({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: ViewStyle;
}) {
  const { open, onOpenChange } = useOverlayContext();
  const { colors } = useTheme();
  const shadows = createShadows(colors.foreground);
  const { width } = useWindowDimensions();
  const layout = useLayoutMetrics({ width, height: 800, scale: 1, fontScale: 1 });

  const styles = StyleSheet.create({
    overlay: {
      flex: 1,
      backgroundColor: withOpacity(colors.overlay, 0.5),
      justifyContent: "center",
      alignItems: "center",
      padding: 24,
    },
    content: {
      backgroundColor: colors.card,
      borderRadius: radii.lg,
      borderWidth: 1,
      borderColor: colors.border,
      width: "100%",
      maxWidth: Math.min(layout.sheetMaxWidth, 400),
      padding: 24,
      ...shadows.xl,
    },
  });

  return (
    <Modal visible={open} transparent animationType="fade" onRequestClose={() => onOpenChange(false)}>
      <View style={styles.overlay}>
        <View style={[styles.content, style]}>{children}</View>
      </View>
    </Modal>
  );
}

export function AlertDialogHeader({ children, style }: { children: React.ReactNode; style?: ViewStyle }) {
  return <View style={[{ gap: 6, marginBottom: 8 }, style]}>{children}</View>;
}

export function AlertDialogTitle({ children, style }: { children: React.ReactNode; style?: TextStyle }) {
  const { colors } = useTheme();
  return (
    <Text style={{ ...typography.heading.sm, color: colors.foreground, textAlign: "center", ...(style as object) }}>
      {children}
    </Text>
  );
}

export function AlertDialogDescription({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: TextStyle;
}) {
  const { colors } = useTheme();
  return (
    <Text
      style={{
        ...typography.body.sm,
        color: colors.mutedForeground,
        lineHeight: 20,
        textAlign: "center",
        ...(style as object),
      }}
    >
      {children}
    </Text>
  );
}

export function AlertDialogFooter({ children, style }: { children: React.ReactNode; style?: ViewStyle }) {
  return <View style={[{ gap: 8, marginTop: 16 }, style]}>{children}</View>;
}

export function AlertDialogCancel({
  children,
  onPress,
}: {
  children: React.ReactNode;
  onPress?: () => void;
}) {
  const { onOpenChange } = useOverlayContext();
  return (
    <Button
      variant="outline"
      fullWidth
      onPress={() => {
        onPress?.();
        onOpenChange(false);
      }}
    >
      {children}
    </Button>
  );
}

export function AlertDialogAction({
  children,
  onPress,
  variant = "primary",
}: {
  children: React.ReactNode;
  onPress?: () => void;
  variant?: "primary" | "destructive";
}) {
  const { onOpenChange } = useOverlayContext();
  return (
    <Button
      variant={variant}
      fullWidth
      onPress={() => {
        onPress?.();
        onOpenChange(false);
      }}
    >
      {children}
    </Button>
  );
}

AlertDialog.displayName = "AlertDialog";
export default AlertDialog;
