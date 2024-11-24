import type React from "react";
import { useEffect } from "react";
import { Dimensions, StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
} from "react-native-reanimated";

const { height } = Dimensions.get("window");

interface AnimatedModalProps {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const AnimatedModal: React.FC<AnimatedModalProps> = ({
  visible,
  onClose,
  children,
}) => {
  const translateY = useSharedValue(height);
  const backdropOpacity = useSharedValue(0);

  // biome-ignore lint/correctness/useExhaustiveDependencies: NOT NEEDED
  useEffect(() => {
    if (visible) {
      translateY.value = withSpring(0, { damping: 20, stiffness: 90 });
      backdropOpacity.value = withTiming(1, { duration: 500 });
    } else {
      translateY.value = withSpring(0, { damping: 20, stiffness: 90 });
      backdropOpacity.value = withTiming(0, { duration: 500 });
    }
  }, [visible]);

  const backdropStyle = useAnimatedStyle(() => ({
    opacity: backdropOpacity.value,
  }));

  const modalStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <Animated.View style={[styles.backdrop, backdropStyle]}>
      <Animated.View style={[styles.modal, modalStyle]}>
        {children}
      </Animated.View>
      {visible && (
        <Animated.View style={styles.touchArea} onTouchStart={onClose} />
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    width: "90%",
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 10,
  },
  touchArea: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default AnimatedModal;
