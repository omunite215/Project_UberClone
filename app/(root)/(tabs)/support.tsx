import GeneralCard from "@/components/GeneralCard";
import { icons } from "@/constants";
import { router } from "expo-router";
import { Text, TouchableOpacity, View, Image, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Support = () => {
  return (
    <SafeAreaView>
      <ScrollView>
        <View className="pb-12 pt-3 px-5 bg-primary-400">
          <TouchableOpacity
            onPress={() => router.replace("/home")}
          >
            <View className=" w-10 h-10 bg-white rounded-full items-center justify-center">
              <Image
                source={icons.backArrow}
                resizeMode="contain"
                className="w-6 h-6"
              />
            </View>
          </TouchableOpacity>
          <View className="flex flex-row justify-between items-center">
            <View className="w-8/12">
              <Text className="text-white font-JakartaBold text-2xl mt-8">
                How Can We Help You ?
              </Text>
              <Text className=" text-general-100 font-JakartaMedium text-base">
                This is the support page for any service related queries
              </Text>
            </View>
            <Image
              source={icons.support}
              width={40}
              height={40}
              resizeMode="contain"
              className="h-20 w-20"
            />
          </View>
        </View>
        <View className="px-5 my-6">
          <GeneralCard
            title="Rides"
            description="View Rides to get help with your billing, driver or other issues."
            image={icons.car}
            onPress={() => {
              router.push("/(root)/(tabs)/rides");
            }}
          />
          <GeneralCard
            title="Fares, Charges and Transaction FAQ's"
            description="Get information on Fares, Charges and Transaction FAQ's"
            image={icons.card}
            onPress={() => {}}
          />
          <GeneralCard
            title="Contact Us"
            description="Couldn't find what you were looking for ? Contact Us!!"
            image={icons.call}
            onPress={() => {}}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Support;
