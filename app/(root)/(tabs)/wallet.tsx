import GeneralCard from "@/components/GeneralCard";
import { icons } from "@/constants";
import { router } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Wallet = () => {
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
      <View>
        <Text className="pt-12 text-2xl font-JakartaBold">Payment methods</Text>
      </View>
      <View className="mt-12">
        <View>
          <Text className="text-xl font-JakartaSemiBold">
            <Text className="text-primary-400">Sarthi </Text>Wallet
          </Text>
          <Text className="text-sm font-JakartaMedium mt-2">
            Available Balance: ₹ 123
          </Text>
        </View>
        <View className="py-3">
          <GeneralCard
            image={icons.upi}
            title="UPI"
            description="Pay by any UPI"
            onPress={() => {}}
          />
          <GeneralCard
            image={icons.card}
            title="Credit / Debit Card"
            description="Pay by Credit / Debit Cards"
            onPress={() => {}}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Wallet;
