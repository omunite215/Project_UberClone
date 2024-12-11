import GeneralCard from "@/components/GeneralCard";
import { icons } from "@/constants";
import { useFetch } from "@/lib/fetch";
import type { walletBalanceResponse } from "@/types/type";
import { useUser } from "@clerk/clerk-expo";
import { router } from "expo-router";
import {
  ActivityIndicator,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Wallet = () => {
  const { user } = useUser();
  const { data: profileDetails, loading } = useFetch<walletBalanceResponse[]>(
    `/(api)/user/${user?.id}?fields=wallet_balance`
  );
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
          {!profileDetails || loading ? (
            <ActivityIndicator size="small" color="#0AD1C8" />
          ) : (
            <Text className="text-sm font-JakartaMedium mt-2">
              Available Balance: ₹ {profileDetails[0]?.wallet_balance}
            </Text>
          )}
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
