import React, { createContext, useContext, useRef, useState } from "react";
import {
  View,
  ScrollView,
  Pressable,
  ViewStyle,
  NativeSyntheticEvent,
  NativeScrollEvent,
  useWindowDimensions,
} from "react-native";
import { useTheme } from "../../lib/theme-context";
import { radii } from "../../lib/radius";
import Text from "./text";

type CarouselContextValue = {
  index: number;
  setIndex: (i: number) => void;
  itemWidth: number;
  scrollRef: React.RefObject<ScrollView | null>;
};

const CarouselContext = createContext<CarouselContextValue | null>(null);

function useCarouselContext() {
  const ctx = useContext(CarouselContext);
  if (!ctx) throw new Error("Carousel components must be used within <Carousel>");
  return ctx;
}

export function Carousel({
  children,
  style,
  itemWidth: itemWidthProp,
}: {
  children: React.ReactNode;
  style?: ViewStyle;
  itemWidth?: number;
}) {
  const { width } = useWindowDimensions();
  const itemWidth = itemWidthProp ?? Math.min(width - 80, 192);
  const [index, setIndex] = useState(0);
  const scrollRef = useRef<ScrollView>(null);

  return (
    <CarouselContext.Provider value={{ index, setIndex, itemWidth, scrollRef }}>
      <View style={[{ width: itemWidth + 48, alignSelf: "center", position: "relative" }, style]}>
        {children}
      </View>
    </CarouselContext.Provider>
  );
}

export function CarouselContent({ children, style }: { children: React.ReactNode; style?: ViewStyle }) {
  const { setIndex, itemWidth, scrollRef } = useCarouselContext();

  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const x = e.nativeEvent.contentOffset.x;
    setIndex(Math.round(x / itemWidth));
  };

  return (
    <ScrollView
      ref={scrollRef}
      horizontal
      pagingEnabled
      snapToInterval={itemWidth}
      decelerationRate="fast"
      showsHorizontalScrollIndicator={false}
      onScroll={onScroll}
      scrollEventThrottle={16}
      style={style}
    >
      {children}
    </ScrollView>
  );
}

export function CarouselItem({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: ViewStyle;
}) {
  const { itemWidth } = useCarouselContext();
  return <View style={[{ width: itemWidth, padding: 4 }, style]}>{children}</View>;
}

export function CarouselPrevious({ style }: { style?: ViewStyle }) {
  const { colors } = useTheme();
  const { index, setIndex, itemWidth, scrollRef } = useCarouselContext();

  return (
    <Pressable
      style={[carouselNavStyle(colors.border), { left: 0 }, style]}
      onPress={() => {
        const next = Math.max(0, index - 1);
        setIndex(next);
        scrollRef.current?.scrollTo({ x: next * itemWidth, animated: true });
      }}
    >
      <Text style={{ color: colors.foreground }}>‹</Text>
    </Pressable>
  );
}

export function CarouselNext({ style }: { style?: ViewStyle }) {
  const { colors } = useTheme();
  const { index, setIndex, itemWidth, scrollRef } = useCarouselContext();

  return (
    <Pressable
      style={[carouselNavStyle(colors.border), { right: 0 }, style]}
      onPress={() => {
        const next = index + 1;
        setIndex(next);
        scrollRef.current?.scrollTo({ x: next * itemWidth, animated: true });
      }}
    >
      <Text style={{ color: colors.foreground }}>›</Text>
    </Pressable>
  );
}

function carouselNavStyle(borderColor: string): ViewStyle {
  return {
    position: "absolute",
    top: "50%",
    marginTop: -18,
    width: 36,
    height: 36,
    borderRadius: radii.full,
    borderWidth: 1,
    borderColor,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2,
  };
}

Carousel.displayName = "Carousel";
export default Carousel;
