import { PanGestureHandler } from "react-native-gesture-handler";
import Animated, { runOnJS, useAnimatedGestureHandler, useAnimatedStyle, useSharedValue } from "react-native-reanimated";
import { DEFAULT_ZINDEX, DRAGGABLE_ACTIVE_ZINDEX } from "../constants";
import { AnimatedContext, DraggableProps } from "../types/components";

export const Draggable = ({ children, initialTranslateX, initialTranslateY, zIndex, keyboardVisibleTranslateY, onFinish }: DraggableProps) => {
  const translateX = useSharedValue(initialTranslateX ?? 0);
  const translateY = useSharedValue(initialTranslateY ?? 0);

  const isGestureActive = useSharedValue(false);
  const initialPosition = useSharedValue({ x: initialTranslateX ?? 0, y: initialTranslateY ?? 0 });

  const panGesture = useAnimatedGestureHandler({
    onStart: (_, ctx: AnimatedContext) => {
      ctx.startX = translateX.value;
      ctx.startY = translateY.value;
      initialPosition.value = { x: translateX.value, y: translateY.value };
      isGestureActive.value = true;
    },
    onActive: (evt, ctx) => {
      translateX.value = ctx.startX + evt.translationX;
      translateY.value = ctx.startY + evt.translationY;
    },
    onFinish: (evt, ctx) => {
      isGestureActive.value = false;
      const finalX = ctx.startX + evt.translationX;
      const finalY = ctx.startY + evt.translationY;
      const movedSignificantly = Math.abs(finalX - initialPosition.value.x) > 5 || Math.abs(finalY - initialPosition.value.y) > 5;
      if (movedSignificantly) {
        translateX.value = ctx.startX + evt.translationX;
        translateY.value = ctx.startY + evt.translationY;
        if (onFinish) runOnJS(onFinish)({ translateX: finalX, translateY: finalY });
      }
    },
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      zIndex: isGestureActive.value ? DRAGGABLE_ACTIVE_ZINDEX : zIndex ?? DEFAULT_ZINDEX,
      transform: [{ translateX: translateX.value }, { translateY: keyboardVisibleTranslateY ?? translateY.value }],
      opacity: isGestureActive.value ? 0.7 : 1,
    };
  });

  return (
    <Animated.View style={[animatedStyle]}>
      <PanGestureHandler onGestureEvent={panGesture}>
        <Animated.View>{children}</Animated.View>
      </PanGestureHandler>
    </Animated.View>
  );
};
