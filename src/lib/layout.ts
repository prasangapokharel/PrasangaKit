import { Dimensions, ScaledSize } from "react-native";

export type Breakpoint = "phone" | "tablet" | "desktop";

export function getBreakpoint(width: number): Breakpoint {
  if (width >= 1024) return "desktop";
  if (width >= 768) return "tablet";
  return "phone";
}

export function useLayoutMetrics(window: ScaledSize = Dimensions.get("window")) {
  const { width, height } = window;
  const bp = getBreakpoint(width);
  const isPhone = bp === "phone";

  return {
    width,
    height,
    breakpoint: bp,
    isPhone,
    isTablet: bp === "tablet",
    isDesktop: bp === "desktop",
    /** Bottom sheet max width on large screens */
    sheetMaxWidth: isPhone ? width : Math.min(560, width - 32),
    /** Drawer width by size preset */
    drawerWidth(size: "sm" | "md" | "lg" = "md") {
      const caps = {
        sm: { phone: 0.72, tablet: 0.45, desktop: 0.32 },
        md: { phone: 0.78, tablet: 0.5, desktop: 0.36 },
        lg: { phone: 0.85, tablet: 0.55, desktop: 0.4 },
      };
      const maxPx = { sm: 300, md: 360, lg: 420 };
      const ratio = caps[size][bp === "phone" ? "phone" : bp === "tablet" ? "tablet" : "desktop"];
      return Math.min(maxPx[size], Math.round(width * ratio));
    },
    /** Sheet height cap */
    sheetMaxHeight(ratio = 0.75) {
      return Math.min(height * ratio, height - 80);
    },
    horizontalPadding: isPhone ? 16 : 24,
  };
}
