import type { ButtonProps } from "@/types/type";
import { Text, TouchableOpacity } from "react-native";

const getBgVariantStyle = (variant: ButtonProps["bgVariant"]) => {
  switch (variant) {
    case "secondary":
      return "bg-gray-500";
    case "danger":
      return "bg-red-500";
    case "success":
      return "bg-green-200";
    case "outline":
      return "bg-transparent border-neutral-300 border-[0.5px]";
    default:
      return "bg-primary-400";
  }
};

const getTextVariantStyle = (variant: ButtonProps["textVariant"]) => {
  switch (variant) {
    case "primary":
      return "text-customBlack-200";
    case "secondary":
      return "text-gray-100";
    case "danger":
      return "text-red-100";
    case "success":
      return "text-green-100";
    default:
      return "text-white";
  }
};

const CustomButton = ({
  onPress,
  title,
  bgVariant = "primary",
  textVariant = "default",
  IconLeft,
  IconRight,
  className,
  ...props
}: ButtonProps) => (
  <TouchableOpacity
    onPress={onPress}
    className={`w-full rounded-md flex flex-row justify-center items-center p-3 shadow-md shadow-neutral-400/70 ${getBgVariantStyle(bgVariant)} ${className}`}
    {...props}
  >
    {IconLeft && <IconLeft />}
    <Text className={`text-lg font-bold ${getTextVariantStyle(textVariant)}`}>
      {title}
    </Text>
    {IconRight && <IconRight />}
  </TouchableOpacity>
);

export default CustomButton;
