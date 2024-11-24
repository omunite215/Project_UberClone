import { useUser } from "@clerk/clerk-expo";
import { Image, ScrollView, Text, View, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import InputField from "@/components/InputField";
import { icons } from "@/constants";

const Favourites = () => {
  return (
    <SafeAreaView className="flex-1 px-5">
      <TouchableOpacity onPress={() => router.replace("/(root)/(tabs)/home")}>
        <View className=" w-10 h-10 bg-white rounded-full items-center justify-center">
          <Image
            source={icons.backArrow}
            resizeMode="contain"
            className="w-6 h-6"
          />
        </View>
      </TouchableOpacity>
      <ScrollView
        className="px-5"
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        <View>
          <Text className="text-2xl font-JakartaBold mt-5">
            Your Favourites
          </Text>

          <Text className="text-customBlack-100 mt-2">
            All your favourite location are being saved here.
          </Text>
        </View>
        <View className="flex items-center justify-center my-5"></View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Favourites;
