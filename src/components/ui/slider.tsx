import React, { useState, useRef, useMemo } from "react";
import {
  View,
  Text,
  ViewStyle,
  StyleSheet,
  PanResponder,
  LayoutChangeEvent,
} from "react-native";
import { useTheme } from "../../lib/theme-context";
import { typography } from "../../lib/typography";
import { createShadows } from "../../lib/theme";
import { radii } from "../../lib/radius";

interface SliderProps {
  min?: number;
  max?: number;
  value?: number;
  step?: number;
  onValueChange?: (value: number) => void;
  disabled?: boolean;
  containerStyle?: ViewStyle;
  label?: string;
  trackColor?: string;
  thumbColor?: string;
}

const Slider = React.forwardRef<View, SliderProps>(
  (
    {
      min = 0,
      max = 100,
      value = 0,
      step = 1,
      onValueChange,
      disabled = false,
      containerStyle,
      label,
      trackColor,
      thumbColor,
    },
    ref
  ) => {
    const { colors } = useTheme();
    const track = trackColor || colors.muted;
    const thumb = thumbColor || colors.primary;
    const shadows = createShadows(colors.foreground);

    const [sliderWidth, setSliderWidth] = useState(0);
    const sliderWidthRef = useRef(0);

    const panResponder = useMemo(() => {
      const clamp = (raw: number) => {
        let adjusted = Math.round(raw / step) * step;
        return Math.max(min, Math.min(max, adjusted));
      };

      const valueFromX = (x: number) => {
        if (sliderWidthRef.current <= 0) return value;
        const ratio = Math.max(0, Math.min(1, x / sliderWidthRef.current));
        return clamp(min + ratio * (max - min));
      };

      return PanResponder.create({
        onStartShouldSetPanResponder: () => !disabled,
        onMoveShouldSetPanResponder: () => !disabled,
        onPanResponderGrant: (evt) => {
          onValueChange?.(valueFromX(evt.nativeEvent.locationX));
        },
        onPanResponderMove: (evt) => {
          onValueChange?.(valueFromX(evt.nativeEvent.locationX));
        },
      });
    }, [disabled, min, max, step, value, onValueChange]);

    const thumbPosition = (value - min) / (max - min);

    const styles = StyleSheet.create({
      container: {
        marginBottom: 12,
        opacity: disabled ? 0.5 : 1,
      },
      labelText: {
        ...typography.label.md,
        color: colors.foreground,
      },
      labelRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 8,
      },
      value: {
        ...typography.label.md,
        color: thumb,
      },
      sliderContainer: {
        height: 44,
        justifyContent: "center",
      },
      track: {
        height: 6,
        backgroundColor: track,
        borderRadius: radii.full,
        justifyContent: "center",
      },
      filledTrack: {
        height: 6,
        backgroundColor: thumb,
        borderRadius: radii.full,
        position: "absolute",
        left: 0,
      },
      thumb: {
        width: 20,
        height: 20,
        borderRadius: radii.full,
        backgroundColor: colors.background,
        borderWidth: 2,
        borderColor: thumb,
        position: "absolute",
        ...shadows.sm,
      },
    });

    const onLayout = (event: LayoutChangeEvent) => {
      const width = event.nativeEvent.layout.width;
      setSliderWidth(width);
      sliderWidthRef.current = width;
    };

    return (
      <View ref={ref} style={[styles.container, containerStyle]}>
        {label && (
          <View style={styles.labelRow}>
            <Text style={styles.labelText}>{label}</Text>
            <Text style={styles.value}>{value}</Text>
          </View>
        )}
        <View
          style={styles.sliderContainer}
          onLayout={onLayout}
          {...panResponder.panHandlers}
        >
          <View style={styles.track}>
            <View
              style={[
                styles.filledTrack,
                { width: sliderWidth * thumbPosition },
              ]}
            />
            <View
              style={[
                styles.thumb,
                {
                  left: Math.max(
                    0,
                    Math.min(sliderWidth - 20, sliderWidth * thumbPosition - 10)
                  ),
                },
              ]}
            />
          </View>
        </View>
      </View>
    );
  }
);

Slider.displayName = "Slider";

export default Slider;
