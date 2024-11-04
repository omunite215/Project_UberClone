import CustomButton from "@/components/CustomButton";
import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "react-native";

const Options = () => {
  return (
    <SafeAreaView className="flex h-full items-center justify-between bg-white">
      <Text>Welcome to Sarthi</Text>
      <Text>Please choose relevant option from below:</Text>
      <Link href="/(auth)/sign-up">
        <CustomButton title="I am Rider" />
      </Link>
      <Link href="/(auth)/driver-sign-up">
        <CustomButton title="I am Driver" bgVariant="outline" />
      </Link>
    </SafeAreaView>
  );
};

export default Options;
