import React, { createContext, useCallback, useContext, useMemo, useState } from "react";
import {
  View,
  Text,
  Pressable,
  Modal,
  StyleSheet,
  ViewStyle,
  ScrollView,
} from "react-native";
import { useTheme } from "../../lib/theme-context";
import { typography } from "../../lib/typography";
import { withOpacity } from "../../lib/utils";
import { createShadows } from "../../lib/theme";
import { radii } from "../../lib/radius";

type MenuContextValue = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const MenuContext = createContext<MenuContextValue | null>(null);

function useMenuContext() {
  const ctx = useContext(MenuContext);
  if (!ctx) throw new Error("DropdownMenu components must be used within <DropdownMenu>");
  return ctx;
}

export function DropdownMenu({
  children,
  open,
  defaultOpen = false,
  onOpenChange,
}: {
  children: React.ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}) {
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

  return <MenuContext.Provider value={value}>{children}</MenuContext.Provider>;
}

export function DropdownMenuTrigger({
  children,
  asChild = true,
}: {
  children: React.ReactElement;
  asChild?: boolean;
}) {
  const { onOpenChange } = useMenuContext();
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

export function DropdownMenuContent({
  children,
  style,
  align = "start",
}: {
  children: React.ReactNode;
  style?: ViewStyle;
  align?: "start" | "center" | "end";
}) {
  const { open, onOpenChange } = useMenuContext();
  const { colors } = useTheme();
  const shadows = createShadows(colors.foreground);
  const close = () => onOpenChange(false);

  const styles = StyleSheet.create({
    overlay: {
      flex: 1,
      backgroundColor: withOpacity(colors.overlay, 0.15),
      justifyContent: "flex-start",
      alignItems: align === "end" ? "flex-end" : align === "center" ? "center" : "flex-start",
      paddingTop: 120,
      paddingHorizontal: 24,
    },
    content: {
      backgroundColor: colors.card,
      borderRadius: radii.lg,
      borderWidth: 1,
      borderColor: colors.border,
      minWidth: 180,
      maxWidth: 320,
      paddingVertical: 4,
      ...shadows.lg,
    },
  });

  return (
    <Modal visible={open} transparent animationType="fade" onRequestClose={close}>
      <Pressable style={styles.overlay} onPress={close}>
        <Pressable style={[styles.content, style]} onPress={(e) => e.stopPropagation()}>
          <ScrollView keyboardShouldPersistTaps="handled">{children}</ScrollView>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

export function DropdownMenuGroup({ children }: { children: React.ReactNode }) {
  return <View>{children}</View>;
}

export function DropdownMenuLabel({ children }: { children: React.ReactNode }) {
  const { colors } = useTheme();
  return (
    <Text
      style={{
        ...typography.caption.md,
        color: colors.mutedForeground,
        paddingHorizontal: 12,
        paddingVertical: 8,
        fontWeight: "600",
      }}
    >
      {children}
    </Text>
  );
}

export function DropdownMenuItem({
  children,
  onPress,
  disabled = false,
  variant = "default",
}: {
  children: React.ReactNode;
  onPress?: () => void;
  disabled?: boolean;
  variant?: "default" | "destructive";
}) {
  const { colors } = useTheme();
  const { onOpenChange } = useMenuContext();
  const textColor = variant === "destructive" ? colors.destructive : colors.foreground;

  return (
    <Pressable
      disabled={disabled}
      onPress={() => {
        onPress?.();
        onOpenChange(false);
      }}
      style={({ pressed }) => ({
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        paddingHorizontal: 12,
        paddingVertical: 10,
        opacity: disabled ? 0.4 : pressed ? 0.7 : 1,
        backgroundColor: pressed ? colors.muted : "transparent",
      })}
    >
      {typeof children === "string" ? (
        <Text style={{ ...typography.body.sm, color: textColor }}>{children}</Text>
      ) : (
        children
      )}
    </Pressable>
  );
}

export function DropdownMenuSeparator() {
  const { colors } = useTheme();
  return (
    <View
      style={{
        height: 1,
        backgroundColor: colors.border,
        marginVertical: 4,
        marginHorizontal: 8,
      }}
    />
  );
}

export function DropdownMenuShortcut({ children }: { children: React.ReactNode }) {
  const { colors } = useTheme();
  return (
    <Text style={{ ...typography.caption.sm, color: colors.mutedForeground, marginLeft: "auto" }}>
      {children}
    </Text>
  );
}

export function DropdownMenuSub({ children }: { children: React.ReactNode }) {
  return <View>{children}</View>;
}

export function DropdownMenuSubTrigger({ children }: { children: React.ReactNode }) {
  const { colors } = useTheme();
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 12,
        paddingVertical: 10,
      }}
    >
      <Text style={{ ...typography.body.sm, color: colors.foreground, flex: 1 }}>
        {children}
      </Text>
      <Text style={{ color: colors.mutedForeground }}>›</Text>
    </View>
  );
}

export function DropdownMenuSubContent({ children }: { children: React.ReactNode }) {
  return <View>{children}</View>;
}

export function DropdownMenuPortal({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

const RadioGroupContext = createContext<{
  value: string;
  onValueChange: (v: string) => void;
} | null>(null);

export function DropdownMenuRadioGroup({
  value,
  onValueChange,
  children,
}: {
  value: string;
  onValueChange: (v: string) => void;
  children: React.ReactNode;
}) {
  return (
    <RadioGroupContext.Provider value={{ value, onValueChange }}>
      <View>{children}</View>
    </RadioGroupContext.Provider>
  );
}

export function DropdownMenuRadioItem({
  value,
  children,
}: {
  value: string;
  children: React.ReactNode;
}) {
  const { colors } = useTheme();
  const radio = useContext(RadioGroupContext);
  const { onOpenChange } = useMenuContext();
  if (!radio) return null;
  const selected = radio.value === value;

  return (
    <Pressable
      onPress={() => {
        radio.onValueChange(value);
        onOpenChange(false);
      }}
      style={({ pressed }) => ({
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        paddingHorizontal: 12,
        paddingVertical: 10,
        backgroundColor: pressed ? colors.muted : "transparent",
      })}
    >
      <View
        style={{
          width: 8,
          height: 8,
          borderRadius: 4,
          backgroundColor: selected ? colors.primary : "transparent",
          borderWidth: 1,
          borderColor: colors.primary,
        }}
      />
      <Text style={{ ...typography.body.sm, color: colors.foreground }}>{children}</Text>
    </Pressable>
  );
}

DropdownMenu.displayName = "DropdownMenu";
export default DropdownMenu;
