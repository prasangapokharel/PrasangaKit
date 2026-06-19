import React, { useRef, useEffect, useMemo } from "react";
import {
  Modal,
  View,
  Text,
  Pressable,
  StyleSheet,
  ViewStyle,
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

interface SheetProps {
  visible?: boolean;
  isOpen?: boolean;
  onClose: () => void;
  title?: string;
  children?: React.ReactNode;
  showCloseButton?: boolean;
  containerStyle?: ViewStyle;
  overlayOpacity?: number;
  closeOnOverlayTap?: boolean;
  maxHeight?: number;
}

const Sheet = React.forwardRef<View, SheetProps>(
  (
    {
      visible,
      isOpen,
      onClose,
      title,
      children,
      showCloseButton = true,
      containerStyle,
      overlayOpacity = 0.45,
      closeOnOverlayTap = true,
      maxHeight,
    },
    ref
  ) => {
    const { colors } = useTheme();
    const insets = useSafeAreaInsets();
    const { width: windowWidth, height: windowHeight } = useWindowDimensions();
    const layout = useLayoutMetrics({ width: windowWidth, height: windowHeight, scale: 1, fontScale: 1 });
    const isSheetOpen = isOpen ?? visible ?? false;

    const sheetHeight = maxHeight ?? layout.sheetMaxHeight(0.82);
    const sheetWidth = layout.sheetMaxWidth;

    const slideAnim = useRef(new Animated.Value(windowHeight)).current;

    useEffect(() => {
      slideAnim.setValue(windowHeight);
      if (isSheetOpen) {
        Animated.spring(slideAnim, {
          toValue: 0,
          useNativeDriver: true,
          damping: 22,
          stiffness: 220,
        }).start();
      }
    }, [isSheetOpen, slideAnim, windowHeight]);

    const panResponder = useMemo(
      () =>
        PanResponder.create({
          onStartShouldSetPanResponder: () => true,
          onMoveShouldSetPanResponder: (_, { dy }) => dy > 4,
          onPanResponderMove: (_, { dy }) => {
            if (dy > 0) slideAnim.setValue(dy);
          },
          onPanResponderRelease: (_, { dy, vy }) => {
            if (dy > sheetHeight * 0.2 || vy > 0.75) {
              Animated.timing(slideAnim, {
                toValue: windowHeight,
                duration: 260,
                useNativeDriver: true,
              }).start(onClose);
            } else {
              Animated.spring(slideAnim, {
                toValue: 0,
                useNativeDriver: true,
                damping: 22,
                stiffness: 220,
              }).start();
            }
          },
        }),
      [slideAnim, sheetHeight, windowHeight, onClose]
    );

    const styles = StyleSheet.create({
      overlay: {
        flex: 1,
        justifyContent: "flex-end",
        backgroundColor: withOpacity(colors.overlay, overlayOpacity),
      },
      sheetWrap: {
        width: "100%",
        alignItems: "center",
        paddingHorizontal: layout.isPhone ? 0 : 16,
      },
      container: {
        width: sheetWidth,
        maxHeight: sheetHeight,
        backgroundColor: colors.card,
        borderTopLeftRadius: radii["2xl"],
        borderTopRightRadius: radii["2xl"],
        borderBottomLeftRadius: layout.isPhone ? 0 : radii["2xl"],
        borderBottomRightRadius: layout.isPhone ? 0 : radii["2xl"],
        borderWidth: 1,
        borderColor: colors.border,
        paddingBottom: Math.max(insets.bottom, 12),
      },
      dragHandle: {
        width: 40,
        height: 4,
        backgroundColor: colors.border,
        borderRadius: radii.full,
        alignSelf: "center",
        marginTop: 10,
        marginBottom: 8,
      },
      header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: layout.horizontalPadding,
        paddingBottom: 12,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
      },
      title: {
        ...typography.heading.sm,
        color: colors.foreground,
        flex: 1,
      },
      closeButton: {
        padding: 8,
        borderRadius: radii.sm,
        backgroundColor: colors.muted,
        minWidth: 36,
        height: 36,
        alignItems: "center",
        justifyContent: "center",
      },
      closeButtonText: {
        ...typography.heading.xs,
        color: colors.foreground,
      },
      content: {
        paddingHorizontal: layout.horizontalPadding,
        paddingTop: 16,
        paddingBottom: 8,
      },
    });

    return (
      <Modal visible={isSheetOpen} transparent animationType="fade" onRequestClose={onClose}>
        <View style={styles.overlay}>
          <Pressable
            style={StyleSheet.absoluteFill}
            onPress={closeOnOverlayTap ? onClose : undefined}
            accessibilityRole="button"
            accessibilityLabel="Close sheet"
          />
          <View style={styles.sheetWrap}>
            <Animated.View
              {...panResponder.panHandlers}
              ref={ref}
              style={[
                styles.container,
                containerStyle,
                { transform: [{ translateY: slideAnim }] },
              ]}
            >
              <View style={styles.dragHandle} />
              {(title || showCloseButton) && (
                <View style={styles.header}>
                  {title ? <Text style={styles.title}>{title}</Text> : <View style={{ flex: 1 }} />}
                  {showCloseButton && (
                    <Pressable style={styles.closeButton} onPress={onClose}>
                      <Text style={styles.closeButtonText}>×</Text>
                    </Pressable>
                  )}
                </View>
              )}
              <ScrollView
                style={{ maxHeight: sheetHeight - 120 }}
                contentContainerStyle={styles.content}
                showsVerticalScrollIndicator={false}
                bounces={false}
                keyboardShouldPersistTaps="handled"
              >
                {children}
              </ScrollView>
            </Animated.View>
          </View>
        </View>
      </Modal>
    );
  }
);

Sheet.displayName = "Sheet";

export default Sheet;
