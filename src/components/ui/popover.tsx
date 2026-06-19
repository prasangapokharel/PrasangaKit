import React, { createContext, useCallback, useContext, useMemo, useState } from "react";
import { View, Text, Pressable, StyleSheet, ViewStyle, Modal } from "react-native";
import { useTheme } from "../../lib/theme-context";
import { typography } from "../../lib/typography";
import { withOpacity } from "../../lib/utils";
import { createShadows } from "../../lib/theme";
import { radii } from "../../lib/radius";

type PopoverContextValue = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const PopoverContext = createContext<PopoverContextValue | null>(null);

function usePopoverContext() {
  const ctx = useContext(PopoverContext);
  if (!ctx) throw new Error("Popover components must be used within <Popover>");
  return ctx;
}

export interface PopoverProps {
  children: React.ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function Popover({ children, open, defaultOpen = false, onOpenChange }: PopoverProps) {
  const [internal, setInternal] = useState(defaultOpen);
  const isControlled = open !== undefined;
  const isOpen = isControlled ? open : internal;

  const handleOpenChange = useCallback(
    (next: boolean) => {
      if (!isControlled) setInternal(next);
      onOpenChange?.(next);
    },
    [isControlled, onOpenChange]
  );

  const value = useMemo(
    () => ({ open: isOpen, onOpenChange: handleOpenChange }),
    [isOpen, handleOpenChange]
  );

  return <PopoverContext.Provider value={value}>{children}</PopoverContext.Provider>;
}

export function PopoverTrigger({
  children,
  asChild = true,
}: {
  children: React.ReactElement;
  asChild?: boolean;
}) {
  const { onOpenChange } = usePopoverContext();
  const open = () => onOpenChange(true);

  if (asChild && React.isValidElement(children)) {
    const child = children as React.ReactElement<{ onPress?: () => void }>;
    return React.cloneElement(child, {
      onPress: () => {
        child.props.onPress?.();
        open();
      },
    });
  }

  return <Pressable onPress={open}>{children}</Pressable>;
}

export function PopoverContent({
  children,
  style,
  align = "start",
}: {
  children: React.ReactNode;
  style?: ViewStyle;
  align?: "start" | "center" | "end";
}) {
  const { open, onOpenChange } = usePopoverContext();
  const { colors } = useTheme();
  const shadows = createShadows(colors.foreground);
  const close = () => onOpenChange(false);

  const styles = StyleSheet.create({
    overlay: {
      flex: 1,
      backgroundColor: withOpacity(colors.overlay, 0.2),
      justifyContent: "center",
      alignItems:
        align === "end" ? "flex-end" : align === "center" ? "center" : "flex-start",
      padding: 24,
    },
    content: {
      backgroundColor: colors.card,
      borderRadius: radii.lg,
      borderWidth: 1,
      borderColor: colors.border,
      padding: 0,
      minWidth: 280,
      maxWidth: "100%",
      ...shadows.lg,
    },
  });

  return (
    <Modal visible={open} transparent animationType="fade" onRequestClose={close}>
      <Pressable style={styles.overlay} onPress={close}>
        <Pressable style={[styles.content, style]} onPress={(e) => e.stopPropagation()}>
          {children}
        </Pressable>
      </Pressable>
    </Modal>
  );
}

/** @deprecated Use composable Popover */
interface LegacyPopoverProps {
  visible: boolean;
  onClose: () => void;
  title?: string;
  children?: React.ReactNode;
  trigger?: React.ReactNode;
  onTriggerPress?: () => void;
  containerStyle?: ViewStyle;
  position?: "top" | "bottom" | "left" | "right";
  showArrow?: boolean;
  overlayOpacity?: number;
  closeOnOverlayTap?: boolean;
}

export function PopoverLegacy({
  visible,
  onClose,
  title,
  children,
  trigger,
  onTriggerPress,
}: LegacyPopoverProps) {
  const { colors } = useTheme();

  return (
    <Popover open={visible} onOpenChange={(o) => !o && onClose()}>
      {trigger ? (
        <PopoverTrigger asChild>
          {React.isValidElement(trigger) ? (
            React.cloneElement(trigger as React.ReactElement<{ onPress?: () => void }>, {
              onPress: () => {
                (trigger as React.ReactElement<{ onPress?: () => void }>).props.onPress?.();
                onTriggerPress?.();
              },
            })
          ) : (
            <Pressable onPress={onTriggerPress}>{trigger}</Pressable>
          )}
        </PopoverTrigger>
      ) : null}
      <PopoverContent>
        {title ? (
          <View style={{ padding: 16, paddingBottom: 8 }}>
            <Text style={{ ...typography.heading.md, color: colors.foreground }}>{title}</Text>
          </View>
        ) : null}
        <View style={{ padding: 16, paddingTop: title ? 0 : 16 }}>
          {typeof children === "string" ? (
            <Text style={{ ...typography.body.md, color: colors.mutedForeground }}>{children}</Text>
          ) : (
            children
          )}
        </View>
      </PopoverContent>
    </Popover>
  );
}

Popover.displayName = "Popover";
export default Popover;
