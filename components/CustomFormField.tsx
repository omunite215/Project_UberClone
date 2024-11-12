import type { InputFieldProps } from "@/types/type";
import { Controller } from "react-hook-form";
import {
  Image,
  Keyboard,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";

const CustomFormField = ({
  control,
  name,
  errors,
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
    label === "Phone" || label === "Adhaar Card Number"
      ? "number-pad"
      : keyboardType;

  return (
    <>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="my-2 w-full">
          <Text
            className={`text-base text-white font-JakartaSemiBold mb-3 ${labelStyle}`}
          >
            {label}
          </Text>
          <View
            className={`flex flex-row justify-start items-center relative bg-neutral-100 rounded-md border border-neutral-100 focus:border-primary-400 ${containerStyle}`}
          >
            <Image
              source={icon}
              className={`h-6 w-6 ml-4 ${iconStyle}`}
              resizeMode="contain"
            />
            {prefixText && (
              <Text className="rounded-full p-4 font-JakartaSemiBold text-[15px]">
                {prefixText}
              </Text>
            )}
            <Controller
              control={control}
              name={name}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  className={`rounded-full p-4 font-JakartaSemiBold text-[15px] flex-1 ${inputStyle} text-left`}
                  onBlur={onBlur}
                  secureTextEntry={secureTextEntry}
                  maxLength={inputMaxLength}
                  keyboardType={inputKeyboardType}
                  onChangeText={onChange}
                  value={value}
                  {...props}
                />
              )}
            />
          </View>
            {errors.name && <Text className="my-1.5 text-danger-600 font-JakartaMedium">{errors.name.message}</Text>}
        </View>
      </TouchableWithoutFeedback>
    </>
  );
};

export default CustomFormField;
