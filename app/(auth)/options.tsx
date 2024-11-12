import CustomButton from "@/components/CustomButton";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, View, ImageBackground } from "react-native";

const Options = () => {
  return (
    <ImageBackground
      source={require("@/assets/images/signup-car.png")}
      resizeMode="cover"
      className=" h-full w-full justify-center items-center opacity-80"
    >
      <SafeAreaView className="h-full bg-black/50 space-y-12">
        <View className="space-y-3 p-5">
          <Text className="text-white text-center font-JakartaExtraBold text-4xl pt-6">
            Sarthi
          </Text>
          <View className="h-0.5 rounded-xl bg-customBlack-100" />
        </View>
        <View>
          <Text className=" text-primary-300 text-center font-JakartaBold text-3xl">
            Let's Get Started
          </Text>
          <Text className="text-customBlack-100 text-center font-JakartaMedium text-xl">
            Be a Rider or a Driver
          </Text>
        </View>
        <View className="space-y-3 px-5 w-full">
          <CustomButton
            title="I am Rider"
            className="min-w-full bg-primary-300"
            onPress={() => router.replace("/(auth)/sign-up")}
          />
          <CustomButton
            title="I am Driver"
            bgVariant="outline"
            className="min-w-full"
            onPress={() => router.replace("/(auth)/driver-sign-up")}
          />
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default Options;
