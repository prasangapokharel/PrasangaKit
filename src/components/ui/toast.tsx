import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  ViewStyle,
  TouchableOpacity,
} from "react-native";
import { useTheme } from "../../lib/theme-context";

export type ToastType = "success" | "error" | "info" | "warning";

interface ToastProps {
  /** Toast message (alias for message) */
  message?: string;
  /** Toast message (for backward compatibility with visible prop) */
  msg?: string;
  /** Whether toast is visible */
  visible?: boolean;
  /** Toast type */
  type?: ToastType;
  /** Duration in milliseconds (0 = no auto-dismiss) */
  duration?: number;
  /** Callback when toast is dismissed */
  onDismiss?: () => void;
  /** Custom container style */
  containerStyle?: ViewStyle;
  /** Position */
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

      if (duration > 0) {
        const timer = setTimeout(() => {
          handleDismiss();
        }, duration);

        return () => clearTimeout(timer);
      }

      return undefined;
    }, [visible]);

    const handleDismiss = () => {
      Animated.timing(slideAnim, {
        toValue: -100,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        setVisible(false);
        onDismiss?.();
      });
    };

    if (!visible) {
      return null;
    }

    const toastMessage = message || msg || "Message";

    const typeStyles: Record<
      ToastType,
      { bg: string; text: string; icon: string }
    > = {
      success: {
        bg: colors.successLight,
        text: colors.success,
        icon: "✓",
      },
      error: {
        bg: colors.destructiveLight,
        text: colors.destructive,
        icon: "✕",
      },
      info: {
        bg: colors.primaryLight,
        text: colors.primary,
        icon: "ℹ",
      },
      warning: {
        bg: colors.warningLight,
        text: colors.warning,
        icon: "!",
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
        borderRadius: 8,
        borderWidth: 1,
        borderColor: typeStyle.text,
        paddingHorizontal: 16,
        paddingVertical: 12,
        shadowColor: colors.foreground,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 3,
        zIndex: 999,
      },
      content: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      },
      messageContainer: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
      },
      icon: {
        fontSize: 18,
        fontWeight: "700",
        color: typeStyle.text,
        marginRight: 12,
      },
      message: {
        flex: 1,
        fontSize: 14,
        fontWeight: "500",
        color: typeStyle.text,
        lineHeight: 20,
      },
      closeButton: {
        padding: 4,
        marginLeft: 12,
      },
      closeIcon: {
        fontSize: 18,
        color: typeStyle.text,
        fontWeight: "600",
      },
    });

    return (
      <Animated.View
        ref={ref}
        style={[
          styles.container,
          containerStyle,
          {
            transform: [{ translateY: slideAnim }],
          },
        ]}
      >
        <View style={styles.content}>
          <View style={styles.messageContainer}>
            <Text style={styles.icon}>{typeStyle.icon}</Text>
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
