import { icons } from "@/constants";
import React from "react";
import {
  Image,
  type ImageSourcePropType,
  TouchableOpacity,
  View,
  Text,
} from "react-native";

type Props = {
  image: ImageSourcePropType;
  title: string;
  description: string;
  onPress: () => void;
};

const GeneralCard = ({ image, title, description, onPress }: Props) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="py-4 flex flex-row justify-between items-start"
    >
      <View className="flex flex-row justify-start items-center gap-x-6">
        <Image
          source={image}
          alt={title}
          resizeMode="contain"
          className="rounded-full h-10 w-10"
        />
        <View>
          <Text className=" text-customBlack-200 font-JakartaMedium">
            {title}
          </Text>
          <Text className="text-xs w-52 text-customBlack-100 font-JakartaLight mt-1.5">
            {description}
          </Text>
        </View>
      </View>
      <Image
        source={icons.arrowRight}
        alt="go"
        resizeMode="contain"
        className="h-6 w-6"
      />
    </TouchableOpacity>
  );
};

export default GeneralCard;
