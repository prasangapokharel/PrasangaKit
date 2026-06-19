import React from "react";
import {
  Modal,
  View,
  Text,
  Pressable,
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

const { OverlayRoot, useOverlayContext } = createOverlayContext("Dialog");

export function Dialog({
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

export function DialogTrigger({
  children,
  asChild = true,
}: {
  children: React.ReactElement;
  asChild?: boolean;
}) {
  const { onOpenChange } = useOverlayContext();
  return cloneTrigger(children, () => onOpenChange(true), asChild);
}

export function DialogClose({
  children,
  asChild = true,
}: {
  children: React.ReactElement;
  asChild?: boolean;
}) {
  const { onOpenChange } = useOverlayContext();
  return cloneTrigger(children, () => onOpenChange(false), asChild);
}

export function DialogContent({
  children,
  style,
  closeOnOverlayTap = true,
}: {
  children: React.ReactNode;
  style?: ViewStyle;
  closeOnOverlayTap?: boolean;
}) {
  const { open, onOpenChange } = useOverlayContext();
  const { colors } = useTheme();
  const shadows = createShadows(colors.foreground);
  const { width } = useWindowDimensions();
  const layout = useLayoutMetrics({ width, height: 800, scale: 1, fontScale: 1 });
  const close = () => onOpenChange(false);

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
      maxWidth: layout.sheetMaxWidth,
      padding: 24,
      ...shadows.xl,
    },
  });

  return (
    <Modal visible={open} transparent animationType="fade" onRequestClose={close}>
      <Pressable style={styles.overlay} onPress={closeOnOverlayTap ? close : undefined}>
        <Pressable style={[styles.content, style]} onPress={(e) => e.stopPropagation()}>
          {children}
        </Pressable>
      </Pressable>
    </Modal>
  );
}

export function DialogHeader({ children, style }: { children: React.ReactNode; style?: ViewStyle }) {
  return <View style={[{ gap: 6, marginBottom: 16 }, style]}>{children}</View>;
}

export function DialogTitle({ children, style }: { children: React.ReactNode; style?: TextStyle }) {
  const { colors } = useTheme();
  return (
    <Text style={{ ...typography.heading.sm, color: colors.foreground, ...(style as object) }}>
      {children}
    </Text>
  );
}

export function DialogDescription({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: TextStyle;
}) {
  const { colors } = useTheme();
  return (
    <Text style={{ ...typography.body.sm, color: colors.mutedForeground, lineHeight: 20, ...(style as object) }}>
      {children}
    </Text>
  );
}

export function DialogFooter({ children, style }: { children: React.ReactNode; style?: ViewStyle }) {
  return (
    <View style={[{ flexDirection: "row", justifyContent: "flex-end", gap: 10, marginTop: 16 }, style]}>
      {children}
    </View>
  );
}

Dialog.displayName = "Dialog";
export default Dialog;
