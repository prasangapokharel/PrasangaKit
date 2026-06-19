import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  Modal,
  View,
  Text,
  Pressable,
  StyleSheet,
  ViewStyle,
  TextStyle,
  Animated,
  PanResponder,
  ScrollView,
  useWindowDimensions,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "../../lib/theme-context";
import { typography } from "../../lib/typography";
import { withOpacity } from "../../lib/utils";
import { radii } from "../../lib/radius";
import { useLayoutMetrics } from "../../lib/layout";
import { createShadows } from "../../lib/theme";

export type DrawerDirection = "top" | "right" | "bottom" | "left";

type DrawerContextValue = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  direction: DrawerDirection;
};

const DrawerContext = createContext<DrawerContextValue | null>(null);

function useDrawerContext() {
  const ctx = useContext(DrawerContext);
  if (!ctx) {
    throw new Error("Drawer compound components must be used within <Drawer>");
  }
  return ctx;
}

export interface DrawerProps {
  children: React.ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** shadcn: direction — default bottom */
  direction?: DrawerDirection;
  /** @deprecated use direction */
  position?: "left" | "right";
}

export function Drawer({
  children,
  open,
  defaultOpen = false,
  onOpenChange,
  direction,
  position,
}: DrawerProps) {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const isControlled = open !== undefined;
  const isOpen = isControlled ? open : internalOpen;

  const resolvedDirection: DrawerDirection =
    direction ?? (position === "right" ? "right" : position === "left" ? "left" : "bottom");

  const handleOpenChange = useCallback(
    (next: boolean) => {
      if (!isControlled) setInternalOpen(next);
      onOpenChange?.(next);
    },
    [isControlled, onOpenChange]
  );

  const value = useMemo(
    () => ({
      open: isOpen,
      onOpenChange: handleOpenChange,
      direction: resolvedDirection,
    }),
    [isOpen, handleOpenChange, resolvedDirection]
  );

  return <DrawerContext.Provider value={value}>{children}</DrawerContext.Provider>;
}

interface DrawerTriggerProps {
  children: React.ReactElement;
  asChild?: boolean;
}

export function DrawerTrigger({ children, asChild = true }: DrawerTriggerProps) {
  const { onOpenChange } = useDrawerContext();

  const open = useCallback(() => onOpenChange(true), [onOpenChange]);

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

interface DrawerCloseProps {
  children: React.ReactElement;
  asChild?: boolean;
}

export function DrawerClose({ children, asChild = true }: DrawerCloseProps) {
  const { onOpenChange } = useDrawerContext();

  const close = useCallback(() => onOpenChange(false), [onOpenChange]);

  if (asChild && React.isValidElement(children)) {
    const child = children as React.ReactElement<{ onPress?: () => void }>;
    return React.cloneElement(child, {
      onPress: () => {
        child.props.onPress?.();
        close();
      },
    });
  }

  return <Pressable onPress={close}>{children}</Pressable>;
}

export interface DrawerContentProps {
  children: React.ReactNode;
  style?: ViewStyle;
  /** Max height ratio for top/bottom drawers (shadcn default 50vh) */
  maxHeightRatio?: number;
  overlayOpacity?: number;
  closeOnOverlayTap?: boolean;
}

export function DrawerContent({
  children,
  style,
  maxHeightRatio = 0.5,
  overlayOpacity = 0.5,
  closeOnOverlayTap = true,
}: DrawerContentProps) {
  const { open, onOpenChange, direction } = useDrawerContext();
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const { width: windowWidth, height: windowHeight } = useWindowDimensions();
  const layout = useLayoutMetrics({ width: windowWidth, height: windowHeight, scale: 1, fontScale: 1 });
  const shadows = createShadows(colors.foreground);

  const isVertical = direction === "top" || direction === "bottom";
  const panelWidth = layout.drawerWidth("md");
  const panelHeight = Math.min(windowHeight * maxHeightRatio, windowHeight - insets.top - insets.bottom - 40);
  const sheetWidth = layout.sheetMaxWidth;

  const offscreen = useMemo(() => {
    switch (direction) {
      case "left":
        return -panelWidth;
      case "right":
        return panelWidth;
      case "top":
        return -panelHeight;
      case "bottom":
      default:
        return panelHeight;
    }
  }, [direction, panelWidth, panelHeight]);

  const slideAnim = useRef(new Animated.Value(offscreen)).current;

  useEffect(() => {
    slideAnim.setValue(offscreen);
    if (open) {
      Animated.spring(slideAnim, {
        toValue: 0,
        useNativeDriver: true,
        damping: 24,
        stiffness: 240,
      }).start();
    }
  }, [open, slideAnim, offscreen]);

  const close = useCallback(() => onOpenChange(false), [onOpenChange]);

  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: (_, g) =>
          Math.abs(g.dx) > 4 || Math.abs(g.dy) > 4,
        onPanResponderMove: (_, { dx, dy }) => {
          if (direction === "left" && dx < 0) slideAnim.setValue(dx);
          if (direction === "right" && dx > 0) slideAnim.setValue(dx);
          if (direction === "bottom" && dy > 0) slideAnim.setValue(dy);
          if (direction === "top" && dy < 0) slideAnim.setValue(dy);
        },
        onPanResponderRelease: (_, { dx, dy, vx, vy }) => {
          const closeH =
            (direction === "left" && (dx < -panelWidth * 0.25 || vx < -0.5)) ||
            (direction === "right" && (dx > panelWidth * 0.25 || vx > 0.5)) ||
            (direction === "bottom" && (dy > panelHeight * 0.2 || vy > 0.75)) ||
            (direction === "top" && (dy < -panelHeight * 0.2 || vy < -0.75));

          if (closeH) {
            Animated.timing(slideAnim, {
              toValue: offscreen,
              duration: 240,
              useNativeDriver: true,
            }).start(close);
          } else {
            Animated.spring(slideAnim, {
              toValue: 0,
              useNativeDriver: true,
              damping: 24,
              stiffness: 240,
            }).start();
          }
        },
      }),
    [slideAnim, direction, panelWidth, panelHeight, offscreen, close]
  );

  const styles = StyleSheet.create({
    overlay: {
      flex: 1,
      backgroundColor: withOpacity(colors.overlay, overlayOpacity),
      justifyContent:
        direction === "bottom"
          ? "flex-end"
          : direction === "top"
            ? "flex-start"
            : "center",
      alignItems:
        direction === "left"
          ? "flex-start"
          : direction === "right"
            ? "flex-end"
            : "center",
      flexDirection: isVertical ? "column" : "row",
    },
    backdrop: {
      ...StyleSheet.absoluteFillObject,
    },
    panel: {
      backgroundColor: colors.card,
      borderColor: colors.border,
      borderWidth: 1,
      overflow: "hidden",
      ...shadows.lg,
    },
    panelBottom: {
      width: sheetWidth,
      maxHeight: panelHeight,
      borderTopLeftRadius: radii["2xl"],
      borderTopRightRadius: radii["2xl"],
      paddingBottom: Math.max(insets.bottom, 12),
    },
    panelTop: {
      width: sheetWidth,
      maxHeight: panelHeight,
      borderBottomLeftRadius: radii["2xl"],
      borderBottomRightRadius: radii["2xl"],
      paddingTop: Math.max(insets.top, 12),
    },
    panelLeft: {
      width: panelWidth,
      height: "100%",
      borderRightWidth: 1,
      borderTopRightRadius: radii["2xl"],
      borderBottomRightRadius: radii["2xl"],
      paddingTop: insets.top,
      paddingBottom: insets.bottom,
    },
    panelRight: {
      width: panelWidth,
      height: "100%",
      borderLeftWidth: 1,
      borderTopLeftRadius: radii["2xl"],
      borderBottomLeftRadius: radii["2xl"],
      paddingTop: insets.top,
      paddingBottom: insets.bottom,
    },
    handle: {
      width: 48,
      height: 5,
      borderRadius: radii.full,
      backgroundColor: colors.border,
      alignSelf: "center",
      marginTop: direction === "bottom" ? 10 : 0,
      marginBottom: direction === "top" ? 10 : 8,
    },
  });

  const panelStyle = [
    styles.panel,
    direction === "bottom" && styles.panelBottom,
    direction === "top" && styles.panelTop,
    direction === "left" && styles.panelLeft,
    direction === "right" && styles.panelRight,
    style,
    isVertical
      ? { transform: [{ translateY: slideAnim }] }
      : { transform: [{ translateX: slideAnim }] },
  ];

  return (
    <Modal visible={open} transparent animationType="fade" onRequestClose={close}>
      <View style={styles.overlay}>
        <Pressable
          style={styles.backdrop}
          onPress={closeOnOverlayTap ? close : undefined}
          accessibilityLabel="Close drawer"
        />
        <Animated.View {...panResponder.panHandlers} style={panelStyle}>
          {isVertical && <View style={styles.handle} />}
          {children}
        </Animated.View>
      </View>
    </Modal>
  );
}

export function DrawerHeader({ children, style }: { children: React.ReactNode; style?: ViewStyle }) {
  const { direction } = useDrawerContext();
  const { colors } = useTheme();

  const styles = StyleSheet.create({
    header: {
      paddingHorizontal: 20,
      paddingTop: direction === "bottom" ? 4 : 16,
      paddingBottom: 12,
      alignItems: direction === "bottom" || direction === "top" ? "center" : "flex-start",
      gap: 6,
    },
    border: {
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
      marginBottom: 4,
    },
  });

  return (
    <View style={[styles.header, direction === "left" || direction === "right" ? styles.border : undefined, style]}>
      {children}
    </View>
  );
}

export function DrawerTitle({ children, style }: { children: React.ReactNode; style?: TextStyle }) {
  const { direction } = useDrawerContext();
  const { colors } = useTheme();

  return (
    <Text
      style={[
        typography.heading.sm,
        {
          color: colors.foreground,
          textAlign: direction === "bottom" || direction === "top" ? "center" : "left",
        },
        style,
      ]}
    >
      {children}
    </Text>
  );
}

export function DrawerDescription({ children, style }: { children: React.ReactNode; style?: TextStyle }) {
  const { direction } = useDrawerContext();
  const { colors } = useTheme();

  return (
    <Text
      style={[
        typography.body.sm,
        {
          color: colors.mutedForeground,
          textAlign: direction === "bottom" || direction === "top" ? "center" : "left",
        },
        style,
      ]}
    >
      {children}
    </Text>
  );
}

export function DrawerBody({
  children,
  style,
  contentStyle,
}: {
  children: React.ReactNode;
  style?: ViewStyle;
  contentStyle?: ViewStyle;
}) {
  return (
    <ScrollView
      style={[{ flexGrow: 0 }, style]}
      contentContainerStyle={[{ paddingHorizontal: 20, paddingVertical: 8 }, contentStyle]}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      {children}
    </ScrollView>
  );
}

export function DrawerFooter({ children, style }: { children: React.ReactNode; style?: ViewStyle }) {
  const { colors } = useTheme();

  const styles = StyleSheet.create({
    footer: {
      paddingHorizontal: 20,
      paddingTop: 12,
      paddingBottom: 8,
      gap: 10,
      borderTopWidth: 1,
      borderTopColor: colors.border,
      marginTop: 8,
    },
  });

  return <View style={[styles.footer, style]}>{children}</View>;
}

/** @deprecated Use composable Drawer + DrawerContent */
export interface LegacyDrawerProps {
  visible?: boolean;
  isOpen?: boolean;
  onClose: () => void;
  title?: string;
  children?: React.ReactNode;
  overlayOpacity?: number;
  closeOnOverlayTap?: boolean;
  position?: "left" | "right";
  size?: "sm" | "md" | "lg";
}

export function DrawerLegacy({
  visible,
  isOpen,
  onClose,
  title,
  children,
  overlayOpacity = 0.5,
  closeOnOverlayTap = true,
  position = "left",
}: LegacyDrawerProps) {
  const open = isOpen ?? visible ?? false;

  return (
    <Drawer
      open={open}
      onOpenChange={(next) => {
        if (!next) onClose();
      }}
      direction={position}
    >
      <DrawerContent
        overlayOpacity={overlayOpacity}
        closeOnOverlayTap={closeOnOverlayTap}
        maxHeightRatio={0.82}
      >
        {title ? (
          <DrawerHeader>
            <DrawerTitle>{title}</DrawerTitle>
          </DrawerHeader>
        ) : null}
        <DrawerBody>{children}</DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}

Drawer.displayName = "Drawer";

export default Drawer;
