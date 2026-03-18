import React from "react";
import {
  View,
  Text,
  ViewStyle,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useTheme } from "../../lib/theme-context";

export type AlertType = "success" | "error" | "warning" | "info";

interface AlertProps {
  /** Alert title */
  title: string;
  /** Alert message */
  message?: string;
  /** Alert type */
  type?: AlertType;
  /** Callback to close alert */
  onClose?: () => void;
  /** Show close button */
  showCloseButton?: boolean;
  /** Container style */
  containerStyle?: ViewStyle;
}

const Alert = React.forwardRef<View, AlertProps>(
  (
    {
      title,
      message,
      type = "info",
      onClose,
      showCloseButton = true,
      containerStyle,
    },
    ref
  ) => {
    const { colors } = useTheme();

    const typeStyles: Record<AlertType, { bg: string; border: string; text: string; icon: string; shadow: string }> = {
      success: {
        bg: colors.successLight,
        border: colors.success,
        text: colors.foreground,
        icon: "✓",
        shadow: colors.success,
      },
      error: {
        bg: colors.destructiveLight,
        border: colors.destructive,
        text: colors.foreground,
        icon: "✕",
        shadow: colors.destructive,
      },
      warning: {
        bg: colors.warningLight,
        border: colors.warning,
        text: colors.foreground,
        icon: "!",
        shadow: colors.warning,
      },
      info: {
        bg: colors.primaryLight,
        border: colors.primary,
        text: colors.foreground,
        icon: "ⓘ",
        shadow: colors.primary,
      },
    };

    const selectedType = typeStyles[type];

    const styles = StyleSheet.create({
      alert: {
        backgroundColor: selectedType.bg,
        borderLeftWidth: 4,
        borderLeftColor: selectedType.border,
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 14,
        marginBottom: 12,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        shadowColor: selectedType.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
        elevation: 2,
        borderWidth: 1,
        borderColor: selectedType.border + "20",
      },
      content: {
        flex: 1,
        marginRight: 12,
      },
      icon: {
        fontSize: 18,
        color: selectedType.text,
        fontWeight: "700",
        marginRight: 12,
        marginTop: 2,
      },
      title: {
        fontSize: 15,
        fontWeight: "600",
        color: selectedType.text,
        marginBottom: message ? 6 : 0,
      },
      message: {
        fontSize: 13,
        color: selectedType.text + "CC",
        lineHeight: 20,
      },
      closeButton: {
        padding: 4,
      },
      closeText: {
        fontSize: 18,
        color: selectedType.text,
        fontWeight: "700",
      },
    });

    return (
      <View ref={ref} style={[styles.alert, containerStyle]}>
        <View style={{ flexDirection: "row", flex: 1 }}>
          <Text style={styles.icon}>{selectedType.icon}</Text>
          <View style={styles.content}>
            <Text style={styles.title}>{title}</Text>
            {message && <Text style={styles.message}>{message}</Text>}
          </View>
        </View>
        {showCloseButton && (
          <TouchableOpacity
            style={styles.closeButton}
            onPress={onClose}
          >
            <Text style={styles.closeText}>✕</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  }
);

Alert.displayName = "Alert";

export default Alert;
