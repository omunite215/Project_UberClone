import type { InputFieldProps } from "@/types/type";
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";

const InputField = ({
  label,
  labelStyle,
  icon,
  secureTextEntry = false,
  containerStyle,
  inputStyle,
  iconStyle,
  prefixText,
  className,
  keyboardType = "default",
  ...props
}: InputFieldProps) => {

  const inputMaxLength =
    (label === "Aadhaar Card Number"
      ? 12
      : label === "Phone"
        ? 10
        : undefined) || 50;

  const inputKeyboardType =
    label === "Phone" || label === "Aadhaar Card Number"
      ? "number-pad"
      : keyboardType;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="my-2 w-full">
          <Text className={`text-lg text-white font-JakartaSemiBold mb-3 ${labelStyle}`}>
            {label}
          </Text>
          <View
            className={`flex flex-row justify-start items-center relative bg-neutral-100 rounded-md border border-neutral-100 focus:border-primary-500 ${containerStyle}`}
          >
            <Image source={icon} className={`h-6 w-6 ml-4 ${iconStyle}`} resizeMode="contain" />
            {prefixText && (
              <Text className="rounded-full p-4 font-JakartaSemiBold text-[15px]">
                {prefixText}
              </Text>
            )}
            <TextInput
              className={`rounded-full p-4 font-JakartaSemiBold text-[15px] flex-1 ${inputStyle} text-left`}
              secureTextEntry={secureTextEntry}
              maxLength={inputMaxLength}
              keyboardType={inputKeyboardType}
              {...props}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default InputField;
