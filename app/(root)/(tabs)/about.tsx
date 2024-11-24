import { icons } from "@/constants";
import { Link } from "expo-router";
import { Image, Text, View, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

const About = () => {
  return (
    <SafeAreaView className="px-5">
      <TouchableOpacity onPress={() => router.replace("/home")}>
        <View className=" w-10 h-10 bg-white rounded-full items-center justify-center">
          <Image
            source={icons.backArrow}
            resizeMode="contain"
            className="w-6 h-6"
          />
        </View>
      </TouchableOpacity>
      <View className="flex justify-center items-center">
        <Image
          source={icons.logo}
          width={250}
          height={250}
          resizeMode="contain"
          className="w-1/2 h-1/2"
        />
        <Text className="font-JakartaLight text-sm mt-24">Version 1.0.0</Text>
        <Link href="/(root)/policies">
          <Text className="text-primary-400 font-JakartaMedium text-lg">
            Terms and Conditions
          </Text>
        </Link>
      </View>
    </SafeAreaView>
  );
};

export default About;
