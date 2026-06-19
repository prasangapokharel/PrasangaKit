import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import {
  View,
  TouchableOpacity,
  Text,
  ViewStyle,
  StyleSheet,
  LayoutAnimation,
  Platform,
  UIManager,
} from "react-native";
import { useTheme } from "../../lib/theme-context";
import { typography } from "../../lib/typography";
import { createShadows } from "../../lib/theme";
import { radii } from "../../lib/radius";

if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

type AccordionType = "single" | "multiple";

type AccordionContextValue = {
  type: AccordionType;
  collapsible: boolean;
  expanded: string[];
  toggle: (value: string) => void;
};

const AccordionContext = createContext<AccordionContextValue | null>(null);

function useAccordionContext() {
  const ctx = useContext(AccordionContext);
  if (!ctx) throw new Error("Accordion components must be used within <Accordion>");
  return ctx;
}

export interface AccordionProps {
  children: React.ReactNode;
  type?: AccordionType;
  collapsible?: boolean;
  defaultValue?: string | string[];
  value?: string | string[];
  onValueChange?: (value: string | string[]) => void;
  style?: ViewStyle;
}

export function Accordion({
  children,
  type = "single",
  collapsible = true,
  defaultValue,
  value,
  onValueChange,
  style,
}: AccordionProps) {
  const { colors } = useTheme();
  const shadows = createShadows(colors.foreground);

  const initial = useMemo(() => {
    if (defaultValue === undefined) return [];
    return Array.isArray(defaultValue) ? defaultValue : [defaultValue];
  }, [defaultValue]);

  const [internal, setInternal] = useState<string[]>(initial);
  const isControlled = value !== undefined;
  const expanded = useMemo(
    () =>
      isControlled
        ? Array.isArray(value)
          ? value
          : value
            ? [value]
            : []
        : internal,
    [isControlled, value, internal]
  );

  const toggle = useCallback(
    (itemValue: string) => {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      let next: string[];
      if (type === "multiple") {
        next = expanded.includes(itemValue)
          ? expanded.filter((v) => v !== itemValue)
          : [...expanded, itemValue];
      } else {
        next = expanded.includes(itemValue)
          ? collapsible
            ? []
            : expanded
          : [itemValue];
      }
      if (!isControlled) setInternal(next);
      onValueChange?.(type === "multiple" ? next : next[0] ?? "");
    },
    [type, collapsible, expanded, isControlled, onValueChange]
  );

  const ctx = useMemo(
    () => ({ type, collapsible, expanded, toggle }),
    [type, collapsible, expanded, toggle]
  );

  const styles = StyleSheet.create({
    root: {
      borderRadius: radii.lg,
      borderWidth: 1,
      borderColor: colors.border,
      overflow: "hidden",
      backgroundColor: colors.card,
      ...shadows.sm,
    },
  });

  return (
    <AccordionContext.Provider value={ctx}>
      <View style={[styles.root, style]}>{children}</View>
    </AccordionContext.Provider>
  );
}

export function AccordionItem({
  value,
  children,
  style,
}: {
  value: string;
  children: React.ReactNode;
  style?: ViewStyle;
}) {
  const { colors } = useTheme();
  return (
    <AccordionItemContext.Provider value={value}>
      <View style={[{ borderBottomWidth: 1, borderBottomColor: colors.border }, style]}>
        {children}
      </View>
    </AccordionItemContext.Provider>
  );
}

const AccordionItemContext = createContext<string>("");

export function AccordionTrigger({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: ViewStyle;
}) {
  const { colors } = useTheme();
  const { expanded, toggle } = useAccordionContext();
  const value = useContext(AccordionItemContext);
  const isOpen = expanded.includes(value);

  const styles = StyleSheet.create({
    trigger: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: 16,
      paddingVertical: 14,
    },
    text: {
      ...typography.subheading.md,
      color: colors.foreground,
      flex: 1,
    },
    chevron: {
      ...typography.body.sm,
      color: colors.mutedForeground,
      marginLeft: 8,
      transform: [{ rotate: isOpen ? "180deg" : "0deg" }],
    },
  });

  return (
    <TouchableOpacity
      style={[styles.trigger, style]}
      onPress={() => toggle(value)}
      activeOpacity={0.7}
    >
      {typeof children === "string" ? (
        <Text style={styles.text}>{children}</Text>
      ) : (
        children
      )}
      <Text style={styles.chevron}>▼</Text>
    </TouchableOpacity>
  );
}

export function AccordionContent({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: ViewStyle;
}) {
  const { colors } = useTheme();
  const { expanded } = useAccordionContext();
  const value = useContext(AccordionItemContext);
  if (!expanded.includes(value)) return null;

  const styles = StyleSheet.create({
    content: {
      paddingHorizontal: 16,
      paddingBottom: 14,
      paddingTop: 4,
    },
    text: {
      ...typography.body.sm,
      color: colors.mutedForeground,
      lineHeight: 20,
    },
  });

  return (
    <View style={[styles.content, style]}>
      {typeof children === "string" ? (
        <Text style={styles.text}>{children}</Text>
      ) : (
        children
      )}
    </View>
  );
}

/** @deprecated Use composable Accordion + AccordionItem */
export interface LegacyAccordionItem {
  id: string | number;
  title: string;
  content: React.ReactNode;
}

export function AccordionLegacy({
  items,
  allowMultiple = false,
  containerStyle,
}: {
  items: LegacyAccordionItem[];
  allowMultiple?: boolean;
  containerStyle?: ViewStyle;
}) {
  return (
    <Accordion type={allowMultiple ? "multiple" : "single"} collapsible>
      {items.map((item) => (
        <AccordionItem key={item.id} value={String(item.id)}>
          <AccordionTrigger>{item.title}</AccordionTrigger>
          <AccordionContent>{item.content}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

Accordion.displayName = "Accordion";
export default Accordion;
