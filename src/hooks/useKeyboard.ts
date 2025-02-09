import { useEffect, useState } from "react";
import { Keyboard, Platform } from "react-native";

export const useKeyboard = () => {
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
  const [KeyboardHeight, setKeyboardHeight] = useState<number | undefined>();

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(Platform.OS === "android" ? "keyboardDidShow" : "keyboardWillShow", (event) => {
      const keyboardHeight = event.endCoordinates.height;
      setIsKeyboardVisible(true);
      setKeyboardHeight(keyboardHeight);
    });

    const keyboardDidHideListener = Keyboard.addListener(Platform.OS === "android" ? "keyboardDidHide" : "keyboardWillHide", () => {
      setIsKeyboardVisible(false);
      setKeyboardHeight(0);
    });

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return { isKeyboardVisible, KeyboardHeight };
};
