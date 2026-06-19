import React, { createContext, useContext, useState } from "react";
import {
  View,
  Text,
  ViewStyle,
  StyleSheet,
  Image as RNImage,
  ImageSourcePropType,
  ImageStyle,
} from "react-native";
import { useTheme } from "../../lib/theme-context";
import { typography } from "../../lib/typography";

type AvatarSize = "sm" | "md" | "lg";

const SIZE_MAP: Record<AvatarSize, number> = { sm: 32, md: 40, lg: 48 };

const AvatarContext = createContext<{ size: number; imageFailed: boolean; setImageFailed: (v: boolean) => void }>({
  size: 40,
  imageFailed: false,
  setImageFailed: () => {},
});

export function Avatar({
  children,
  size = "md",
  style,
}: {
  children?: React.ReactNode;
  size?: AvatarSize | number;
  style?: ViewStyle;
}) {
  const { colors } = useTheme();
  const px = typeof size === "number" ? size : SIZE_MAP[size];
  const [imageFailed, setImageFailed] = useState(false);

  const styles = StyleSheet.create({
    root: {
      width: px,
      height: px,
      borderRadius: px / 2,
      backgroundColor: colors.muted,
      overflow: "hidden",
      position: "relative",
    },
  });

  return (
    <AvatarContext.Provider value={{ size: px, imageFailed, setImageFailed }}>
      <View style={[styles.root, style]}>{children}</View>
    </AvatarContext.Provider>
  );
}

export function AvatarImage({
  source,
  style,
}: {
  source: ImageSourcePropType;
  style?: ImageStyle;
}) {
  const { size, imageFailed, setImageFailed } = useContext(AvatarContext);
  if (imageFailed) return null;
  return (
    <RNImage
      source={source}
      onError={() => setImageFailed(true)}
      style={[{ width: size, height: size, borderRadius: size / 2 }, style]}
    />
  );
}

export function AvatarFallback({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: ViewStyle;
}) {
  const { colors } = useTheme();
  const { size } = useContext(AvatarContext);

  const styles = StyleSheet.create({
    fallback: {
      ...(StyleSheet.absoluteFillObject as object),
      width: size,
      height: size,
      borderRadius: size / 2,
      backgroundColor: colors.primary,
      alignItems: "center",
      justifyContent: "center",
    },
    text: {
      ...typography.caption.md,
      color: colors.primaryForeground,
      fontWeight: "700",
      fontSize: size * 0.35,
    },
  });

  return (
    <View style={[styles.fallback, style]}>
      {typeof children === "string" ? (
        <Text style={styles.text}>{children}</Text>
      ) : (
        children
      )}
    </View>
  );
}

export function AvatarBadge({
  style,
  color,
}: {
  style?: ViewStyle;
  color?: string;
}) {
  const { colors } = useTheme();
  const { size } = useContext(AvatarContext);

  const badgeSize = Math.max(10, size * 0.28);

  return (
    <View
      style={[
        {
          position: "absolute",
          bottom: 0,
          right: 0,
          width: badgeSize,
          height: badgeSize,
          borderRadius: badgeSize / 2,
          backgroundColor: color ?? colors.success,
          borderWidth: 2,
          borderColor: colors.background,
        },
        style,
      ]}
    />
  );
}

export function AvatarGroup({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: ViewStyle;
}) {
  return (
    <View style={[{ flexDirection: "row", alignItems: "center" }, style]}>
      {React.Children.map(children, (child, index) =>
        React.isValidElement(child) ? (
          <View key={index} style={{ marginLeft: index === 0 ? 0 : -10, zIndex: 10 - index }}>
            {React.cloneElement(child as React.ReactElement<{ style?: ViewStyle }>, {
              style: {
                borderWidth: 2,
                borderColor: "transparent",
                ...(child.props as { style?: ViewStyle }).style,
              },
            })}
          </View>
        ) : null
      )}
    </View>
  );
}

export function AvatarGroupCount({ children }: { children: React.ReactNode }) {
  const { colors } = useTheme();

  const styles = StyleSheet.create({
    count: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: colors.muted,
      alignItems: "center",
      justifyContent: "center",
      marginLeft: -10,
      borderWidth: 2,
      borderColor: colors.background,
    },
    text: {
      ...typography.caption.sm,
      color: colors.mutedForeground,
      fontWeight: "600",
    },
  });

  return (
    <View style={styles.count}>
      {typeof children === "string" ? (
        <Text style={styles.text}>{children}</Text>
      ) : (
        children
      )}
    </View>
  );
}

/** @deprecated Use composable Avatar + AvatarImage + AvatarFallback */
interface LegacyAvatarProps {
  source?: ImageSourcePropType;
  size?: number;
  initials?: string;
  backgroundColor?: string;
  textColor?: string;
  style?: ViewStyle;
}

function LegacyAvatar({
  source,
  size = 40,
  initials = "A",
  backgroundColor,
  textColor,
  style,
}: LegacyAvatarProps) {
  const { colors } = useTheme();
  const bg = backgroundColor ?? colors.primary;
  const fg = textColor ?? colors.primaryForeground;

  return (
    <View
      style={[
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: bg,
          overflow: "hidden",
          alignItems: "center",
          justifyContent: "center",
        },
        style,
      ]}
    >
      {source ? (
        <RNImage source={source} style={{ width: size, height: size }} />
      ) : (
        <Text style={{ fontSize: size * 0.4, fontWeight: "700", color: fg }}>
          {initials}
        </Text>
      )}
    </View>
  );
}

Avatar.displayName = "Avatar";
export { LegacyAvatar };
export default Avatar;
