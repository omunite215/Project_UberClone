import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Wallet = () => {
  return (
    <SafeAreaView className="px-5">
      <View>
        <Text className="pt-12 text-3xl font-JakartaSemiBold">
          Sarthi Money
        </Text>
        <Text className="text-sm font-JakartaMedium">
          Available Balance: ₹123
        </Text>
      </View>
      <View className="mt-12">
        <Text>Want to Add Balance?</Text>
      </View>
    </SafeAreaView>
  );
};

export default Wallet;
