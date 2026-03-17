import React from "react";
import {
  TextInput,
  View,
  Text,
  ViewStyle,
  TextInputProps,
  StyleSheet,
} from "react-native";

export type InputSize = "sm" | "md" | "lg";

interface InputComponentProps extends TextInputProps {
  /** Input size */
  size?: InputSize;
  /** Label text */
  label?: string;
  /** Error message */
  error?: string;
  /** Helper text */
  helperText?: string;
  /** Left element/icon */
  leftElement?: React.ReactNode;
  /** Right element/icon */
  rightElement?: React.ReactNode;
  /** Container style */
  containerStyle?: ViewStyle;
  /** Whether input has error state */
  hasError?: boolean;
  /** Placeholder text */
  placeholder?: string;
}

const Input = React.forwardRef<TextInput, InputComponentProps>(
  (
    {
      size = "md",
      label,
      error,
      helperText,
      leftElement,
      rightElement,
      containerStyle,
      hasError = false,
      placeholder = "",
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = React.useState(false);

    const sizeStyles: Record<InputSize, number> = {
      sm: 32,
      md: 40,
      lg: 48,
    };

    const textSizeStyles: Record<InputSize, number> = {
      sm: 12,
      md: 14,
      lg: 16,
    };

    const paddingStyles: Record<InputSize, number> = {
      sm: 8,
      md: 12,
      lg: 16,
    };

    const getBorderColor = () => {
      if (hasError || error) return "#fca5a5";
      if (isFocused) return "#0ea5e9";
      return "#e5e7eb";
    };

    const getBackgroundColor = () => {
      if (isFocused) return "#f0f9ff";
      return "#ffffff";
    };

    const styles = StyleSheet.create({
      container: {
        marginBottom: 12,
      },
      labelText: {
        fontSize: 14,
        fontWeight: "600",
        color: "#1f2937",
        marginBottom: 6,
        letterSpacing: 0.3,
      },
      inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        borderRadius: 8,
        borderWidth: 1.5,
        borderColor: getBorderColor(),
        backgroundColor: getBackgroundColor(),
        height: sizeStyles[size],
        paddingHorizontal: paddingStyles[size],
        gap: 8,
        shadowColor: isFocused ? "#0ea5e9" : "transparent",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: isFocused ? 0.1 : 0,
        shadowRadius: 4,
        elevation: isFocused ? 2 : 0,
      },
      input: {
        flex: 1,
        fontSize: textSizeStyles[size],
        color: "#1f2937",
        padding: 0,
        fontFamily: "System",
      },
      errorText: {
        fontSize: 12,
        color: "#dc2626",
        marginTop: 4,
        fontWeight: "500",
        letterSpacing: 0.2,
      },
      helperText: {
        fontSize: 12,
        color: "#6b7280",
        marginTop: 4,
        letterSpacing: 0.2,
      },
      leftElement: {
        marginRight: 4,
      },
      rightElement: {
        marginLeft: 4,
      },
    });

    return (
      <View style={[styles.container, containerStyle]}>
        {label && <Text style={styles.labelText}>{label}</Text>}
        <View style={styles.inputContainer}>
          {leftElement && <View style={styles.leftElement}>{leftElement}</View>}
          <TextInput
            ref={ref}
            style={styles.input}
            placeholder={placeholder}
            placeholderTextColor="#d1d5db"
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            {...props}
          />
          {rightElement && (
            <View style={styles.rightElement}>{rightElement}</View>
          )}
        </View>
        {error && <Text style={styles.errorText}>{error}</Text>}
        {!error && helperText && (
          <Text style={styles.helperText}>{helperText}</Text>
        )}
      </View>
    );
  }
);

Input.displayName = "Input";

export default Input;
