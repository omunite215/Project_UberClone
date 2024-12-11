import { icons } from "@/constants";
import { Image, Text, View } from "react-native";

type ConfirmRideProps = {
  title: "Pickup Location" | "Destination Location";
  value: string | null;
};

const ConfirmRideCard = ({ title, value }: ConfirmRideProps) => (
  <View className="p-2 w-full bg-customWhite my-2 flex flex-row rounded-md items-center justify-start">
    <Image
      source={title === "Pickup Location" ? icons.pin : icons.pin2}
      resizeMode="contain"
      className="w-8 h-8"
    />
    <Text className=" font-JakartaLight text-sm">{value}</Text>
  </View>
);

export default ConfirmRideCard;
