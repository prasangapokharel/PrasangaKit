import React, { createContext, useCallback, useContext, useMemo, useState } from "react";
import { View, ViewStyle, LayoutAnimation, Platform, UIManager } from "react-native";
import { cloneTrigger } from "../../lib/overlay-root";

if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

type CollapsibleContextValue = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const CollapsibleContext = createContext<CollapsibleContextValue | null>(null);

function useCollapsibleContext() {
  const ctx = useContext(CollapsibleContext);
  if (!ctx) throw new Error("Collapsible components must be used within <Collapsible>");
  return ctx;
}

export function Collapsible({
  children,
  open,
  defaultOpen = false,
  onOpenChange,
  style,
}: {
  children: React.ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  style?: ViewStyle;
}) {
  const [internal, setInternal] = useState(defaultOpen);
  const isControlled = open !== undefined;
  const isOpen = isControlled ? open : internal;

  const handleOpenChange = useCallback(
    (next: boolean) => {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      if (!isControlled) setInternal(next);
      onOpenChange?.(next);
    },
    [isControlled, onOpenChange]
  );

  const value = useMemo(
    () => ({ open: isOpen, onOpenChange: handleOpenChange }),
    [isOpen, handleOpenChange]
  );

  return (
    <CollapsibleContext.Provider value={value}>
      <View style={[{ gap: 8 }, style]}>{children}</View>
    </CollapsibleContext.Provider>
  );
}

export function CollapsibleTrigger({
  children,
  asChild = true,
}: {
  children: React.ReactElement;
  asChild?: boolean;
}) {
  const { open, onOpenChange } = useCollapsibleContext();
  return cloneTrigger(children, () => onOpenChange(!open), asChild);
}

export function CollapsibleContent({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: ViewStyle;
}) {
  const { open } = useCollapsibleContext();
  if (!open) return null;
  return <View style={[{ gap: 8 }, style]}>{children}</View>;
}

Collapsible.displayName = "Collapsible";
export default Collapsible;
