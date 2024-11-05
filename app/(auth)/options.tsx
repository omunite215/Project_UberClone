import CustomButton from "@/components/CustomButton";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, View } from "react-native";

const Options = () => {
  return (
    <SafeAreaView className="h-full bg-primary-500 space-y-12">
      <View className="space-y-3 p-5">
        <Text className="text-white font-JakartaBold text-3xl">
          Welcome to Sarthi
        </Text>
        <Text className="text-white font-JakartaMedium text-lg">
          Please choose relevant option from below:
        </Text>
      </View>
      <View className="space-y-3 px-5 w-full">
        <CustomButton
          title="I am Rider"
          className="min-w-full bg-primary-200"
          onPress={() => router.replace("/(auth)/sign-up")}
        />
        <CustomButton
          title="I am Driver"
          className="min-w-full bg-primary-300"
          onPress={() => router.replace("/(auth)/driver-sign-up")}
        />
      </View>
    </SafeAreaView>
  );
};

export default Options;
