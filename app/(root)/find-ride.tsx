import CustomButton from "@/components/CustomButton";
import GoogleTextInput from "@/components/GoogleTextInput";
import RideLayout from "@/components/RideLayout";
import { icons } from "@/constants";
import { useLocationStore } from "@/store";
import { router } from "expo-router";
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";

const FindRide = () => {
  const {
    userAddress,
    destinationAddress,
    setDestinationLocation,
    setUserLocation,
  } = useLocationStore();
  return (
    <SafeAreaView className="mx-5">
      <View className="flex flex-row items-center justify-start py-5">
        <TouchableOpacity onPress={() => router.back()}>
          <View className=" w-10 h-10 bg-white rounded-full items-center justify-center">
            <Image
              source={icons.backArrow}
              resizeMode="contain"
              className="w-6 h-6"
            />
          </View>
        </TouchableOpacity>
        <Text className="text-xl font-JakartaSemiBold ml-5">
          Please Enter Locations
        </Text>
      </View>
      <View className="my-3">
        <Text className="text-lg font-JakartaBold mb-3">From</Text>
        <GoogleTextInput
          purpose="pickup"
          icon={icons.target}
          placeholder="Could Not Found Your Location."
          // biome-ignore lint/style/noNonNullAssertion: API CALL
          initialLocation={userAddress!}
          containerStyle="bg-neutral-100"
          textInputBackgroundColor="#f5f5f5"
          handlePress={(location) => setUserLocation(location)}
        />
      </View>
      <View className="my-3">
        <Text className="text-lg font-JakartaBold mb-3">To</Text>
        <GoogleTextInput
          purpose="destination"
          placeholder="Search Destination"
          icon={icons.map}
          // biome-ignore lint/style/noNonNullAssertion: API CALL
          initialLocation={destinationAddress!}
          containerStyle="bg-neutral-100"
          textInputBackgroundColor="transparent"
          handlePress={(location) => setDestinationLocation(location)}
        />
      </View>
      <CustomButton
        title="Find Now"
        // disabled={!destinationAddress}
        onPress={() => router.push("/(root)/confirm-ride")}
        className="mt-5"
      />
    </SafeAreaView>
  );
};
export default FindRide;
