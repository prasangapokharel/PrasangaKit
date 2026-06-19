import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import {
  Text,
  Pressable,
  Modal,
  FlatList,
  StyleSheet,
  ViewStyle,
  TextInput,
} from "react-native";
import { useTheme } from "../../lib/theme-context";
import { typography } from "../../lib/typography";
import { withOpacity } from "../../lib/utils";
import { createShadows } from "../../lib/theme";
import { radii } from "../../lib/radius";

type ComboboxContextValue = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  value: string;
  setValue: (v: string) => void;
  query: string;
  setQuery: (q: string) => void;
  items: readonly string[];
};

const ComboboxContext = createContext<ComboboxContextValue | null>(null);

function useComboboxContext() {
  const ctx = useContext(ComboboxContext);
  if (!ctx) throw new Error("Combobox components must be used within <Combobox>");
  return ctx;
}

export function Combobox<T extends string>({
  items,
  children,
  value,
  defaultValue = "",
  onValueChange,
}: {
  items: readonly T[];
  children: React.ReactNode;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
}) {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;

  const setValue = useCallback(
    (next: string) => {
      if (!isControlled) setInternalValue(next);
      onValueChange?.(next);
    },
    [isControlled, onValueChange]
  );

  const ctx = useMemo(
    () => ({
      open,
      onOpenChange: setOpen,
      value: currentValue,
      setValue,
      query,
      setQuery,
      items,
    }),
    [open, currentValue, setValue, query, items]
  );

  return <ComboboxContext.Provider value={ctx}>{children}</ComboboxContext.Provider>;
}

export function ComboboxInput({
  placeholder = "Select…",
  style,
}: {
  placeholder?: string;
  style?: ViewStyle;
}) {
  const { colors } = useTheme();
  const { value, open, onOpenChange, query, setQuery } = useComboboxContext();

  const styles = StyleSheet.create({
    input: {
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: radii.md,
      paddingHorizontal: 12,
      paddingVertical: 10,
      ...typography.body.md,
      color: colors.foreground,
      backgroundColor: colors.background,
    },
  });

  return (
    <Pressable onPress={() => onOpenChange(true)}>
      <TextInput
        style={[styles.input, style]}
        placeholder={placeholder}
        placeholderTextColor={colors.mutedForeground}
        value={open ? query : value || query}
        onChangeText={(t) => {
          setQuery(t);
          onOpenChange(true);
        }}
        onFocus={() => onOpenChange(true)}
      />
    </Pressable>
  );
}

export function ComboboxContent({ children, style }: { children: React.ReactNode; style?: ViewStyle }) {
  const { open, onOpenChange } = useComboboxContext();
  const { colors } = useTheme();
  const shadows = createShadows(colors.foreground);

  const styles = StyleSheet.create({
    overlay: {
      flex: 1,
      backgroundColor: withOpacity(colors.overlay, 0.2),
      justifyContent: "center",
      padding: 24,
    },
    content: {
      backgroundColor: colors.card,
      borderRadius: radii.lg,
      borderWidth: 1,
      borderColor: colors.border,
      maxHeight: 280,
      ...shadows.lg,
    },
  });

  return (
    <Modal visible={open} transparent animationType="fade" onRequestClose={() => onOpenChange(false)}>
      <Pressable style={styles.overlay} onPress={() => onOpenChange(false)}>
        <Pressable style={[styles.content, style]} onPress={(e) => e.stopPropagation()}>
          {children}
        </Pressable>
      </Pressable>
    </Modal>
  );
}

export function ComboboxEmpty({ children }: { children: React.ReactNode }) {
  const { colors } = useTheme();
  const { query, items } = useComboboxContext();
  const filtered = items.filter((i) => i.toLowerCase().includes(query.toLowerCase()));
  if (filtered.length > 0) return null;
  return (
    <Text style={{ ...typography.body.sm, color: colors.mutedForeground, padding: 16, textAlign: "center" }}>
      {children}
    </Text>
  );
}

export function ComboboxList({
  children,
}: {
  children: (item: string) => React.ReactNode;
}) {
  const { query, items } = useComboboxContext();
  const filtered = items.filter((i) => i.toLowerCase().includes(query.toLowerCase()));

  return (
    <FlatList
      data={filtered}
      keyExtractor={(item) => item}
      keyboardShouldPersistTaps="handled"
      renderItem={({ item }) => <>{children(item)}</>}
    />
  );
}

export function ComboboxItem({
  value,
  children,
}: {
  value: string;
  children: React.ReactNode;
}) {
  const { colors } = useTheme();
  const { setValue, onOpenChange, setQuery } = useComboboxContext();

  return (
    <Pressable
      onPress={() => {
        setValue(value);
        setQuery(value);
        onOpenChange(false);
      }}
      style={({ pressed }) => ({
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: pressed ? colors.muted : "transparent",
      })}
    >
      {typeof children === "string" ? (
        <Text style={{ ...typography.body.sm, color: colors.foreground }}>{children}</Text>
      ) : (
        children
      )}
    </Pressable>
  );
}

Combobox.displayName = "Combobox";
export default Combobox;
