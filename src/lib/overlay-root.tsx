import React, { createContext, useCallback, useContext, useMemo, useState } from "react";

type OverlayContextValue = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function createOverlayContext(name: string) {
  const Ctx = createContext<OverlayContextValue | null>(null);

  function useOverlayContext() {
    const ctx = useContext(Ctx);
    if (!ctx) throw new Error(`${name} components must be used within <${name}>`);
    return ctx;
  }

  function OverlayRoot({
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

    return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
  }

  function OverlayTrigger({
    children,
    asChild = true,
  }: {
    children: React.ReactElement;
    asChild?: boolean;
  }) {
    const { onOpenChange } = useOverlayContext();
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

    return null;
  }

  function OverlayClose({
    children,
    asChild = true,
  }: {
    children: React.ReactElement;
    asChild?: boolean;
  }) {
    const { onOpenChange } = useOverlayContext();
    const close = () => onOpenChange(false);

    if (asChild && React.isValidElement(children)) {
      const child = children as React.ReactElement<{ onPress?: () => void }>;
      return React.cloneElement(child, {
        onPress: () => {
          child.props.onPress?.();
          close();
        },
      });
    }

    return null;
  }

  return { OverlayRoot, OverlayTrigger, OverlayClose, useOverlayContext, Ctx };
}

export function cloneTrigger(
  children: React.ReactElement,
  onPress: () => void,
  asChild = true
) {
  if (asChild && React.isValidElement(children)) {
    const child = children as React.ReactElement<{ onPress?: () => void }>;
    return React.cloneElement(child, {
      onPress: () => {
        child.props.onPress?.();
        onPress();
      },
    });
  }
  return children;
}
