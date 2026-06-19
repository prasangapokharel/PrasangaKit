import React, { useState, useCallback, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  ViewStyle,
  TouchableOpacity,
} from "react-native";
import { useTheme } from "../../lib/theme-context";
import { typography } from "../../lib/typography";
import { createShadows } from "../../lib/theme";
import { radii } from "../../lib/radius";

export type ToastType = "success" | "error" | "info" | "warning";

interface ToastProps {
  message?: string;
  msg?: string;
  visible?: boolean;
  type?: ToastType;
  duration?: number;
  onDismiss?: () => void;
  containerStyle?: ViewStyle;
  position?: "top" | "bottom";
}

const Toast = React.forwardRef<View, ToastProps>(
  (
    {
      message,
      msg,
      visible: visibleProp,
      type = "info",
      duration = 3000,
      onDismiss,
      containerStyle,
      position = "bottom",
    },
    ref
  ) => {
    const { colors } = useTheme();
    const [visible, setVisible] = useState(visibleProp ?? true);
    const slideAnim = React.useRef(new Animated.Value(-100)).current;
    const shadows = createShadows(colors.foreground);

    const handleDismiss = useCallback(() => {
      Animated.timing(slideAnim, {
        toValue: -100,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        setVisible(false);
        onDismiss?.();
      });
    }, [slideAnim, onDismiss]);

    useEffect(() => {
      setVisible(visibleProp ?? true);
    }, [visibleProp]);

    useEffect(() => {
      if (!visible) return;

      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();

      if (duration <= 0) return;

      const timer = setTimeout(handleDismiss, duration);
      return () => clearTimeout(timer);
    }, [visible, duration, slideAnim, handleDismiss]);

    if (!visible) return null;

    const toastMessage = message || msg || "Message";

    const typeStyles: Record<
      ToastType,
      { bg: string; text: string; indicator: string }
    > = {
      success: {
        bg: colors.successLight,
        text: colors.success,
        indicator: colors.success,
      },
      error: {
        bg: colors.destructiveLight,
        text: colors.destructive,
        indicator: colors.destructive,
      },
      info: {
        bg: colors.primaryLight,
        text: colors.primary,
        indicator: colors.primary,
      },
      warning: {
        bg: colors.warningLight,
        text: colors.warning,
        indicator: colors.warning,
      },
    };

    const typeStyle = typeStyles[type];

    const styles = StyleSheet.create({
      container: {
        position: "absolute",
        [position]: 20,
        left: 16,
        right: 16,
        backgroundColor: typeStyle.bg,
        borderRadius: radii.md,
        borderLeftWidth: 3,
        borderLeftColor: typeStyle.indicator,
        paddingHorizontal: 14,
        paddingVertical: 12,
        ...shadows.sm,
        zIndex: 999,
      },
      content: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      },
      messageContainer: {
        flex: 1,
      },
      message: {
        ...typography.alert.message,
        color: typeStyle.text,
      },
      closeButton: {
        padding: 6,
        marginLeft: 12,
      },
      closeIcon: {
        ...typography.alert.close,
        color: typeStyle.indicator,
      },
    });

    return (
      <Animated.View
        ref={ref}
        style={[
          styles.container,
          containerStyle,
          { transform: [{ translateY: slideAnim }] },
        ]}
      >
        <View style={styles.content}>
          <View style={styles.messageContainer}>
            <Text style={styles.message} numberOfLines={2}>
              {toastMessage}
            </Text>
          </View>
          <TouchableOpacity style={styles.closeButton} onPress={handleDismiss}>
            <Text style={styles.closeIcon}>×</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    );
  }
);

Toast.displayName = "Toast";

export default Toast;
