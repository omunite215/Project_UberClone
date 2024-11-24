import { useUser } from "@clerk/clerk-expo";
import { Image, ScrollView, Text, View, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import InputField from "@/components/InputField";
import { icons } from "@/constants";

const Profile = () => {
  const { user } = useUser();

  return (
    <SafeAreaView className="flex-1 px-5">
      <TouchableOpacity onPress={() => router.replace("/home")}>
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
        <Text className="text-2xl font-JakartaBold my-5">Profile Settings</Text>
        <View className="my-5">
          <View className="py-4 px-3 rounded-lg bg-white mb-5">
            <Text className=" font-JakartaMedium">
              Firstname : {user?.firstName || "Sarthi User"}{" "}
            </Text>
          </View>
          <View className="py-4 px-3 rounded-lg bg-white mb-5">
            <Text className=" font-JakartaMedium">
              Lastname : {user?.lastName || "Sarthi User"}{" "}
            </Text>
          </View>
          <View className="py-4 px-3 rounded-lg bg-white mb-5">
            <Text className=" font-JakartaMedium">
              Email : {user?.emailAddresses[0].emailAddress}
            </Text>
          </View>
          <View className="py-4 px-3 rounded-lg bg-white mb-5">
            <Text className=" font-JakartaMedium">
              Password :
              {user?.primaryPhoneNumber?.phoneNumber || "No Phone Number"}
            </Text>
          </View>
          <View className="py-4 px-3 rounded-lg bg-white mb-5">
            <Text className=" font-JakartaMedium">Role : Rider</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
