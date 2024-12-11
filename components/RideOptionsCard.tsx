import {
  Image,
  Text,
  TouchableOpacity,
  View,
  type ImageSourcePropType,
} from "react-native";

type RideOptionsCardProps = {
  imgSrc: ImageSourcePropType;
  title: "Mini" | "Sedan" | "Hatchback" | "Auto";
  description: string;
  farePrice: number | undefined;
};

const RideOptionsCard = ({
  imgSrc,
  title,
  description,
  farePrice,
}: RideOptionsCardProps) => (
  <TouchableOpacity
    className="px-5 py-2.5 rounded-md shadow-sm bg-primary-300/20 flex flex-row justify-center items-start my-2"
    activeOpacity={0.8}
  >
    <View className="flex flex-row justify-start items-start gap-2">
      <Image
        source={imgSrc}
        resizeMode="contain"
        alt="mini"
        className="w-20 h-20"
      />
      <View className="w-[63%]">
        <Text className=" font-JakartaSemiBold text-lg">{title}</Text>
        <Text className=" text-customBlack-100 text-xs mt-1">
          {description}
        </Text>
      </View>
    </View>
    <Text className="font-JakartaMedium text-base">₹ {farePrice}</Text>
  </TouchableOpacity>
);

export default RideOptionsCard;
