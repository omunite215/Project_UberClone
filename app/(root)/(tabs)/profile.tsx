import { useUser } from "@clerk/clerk-expo";
import { Image, ScrollView, Text, View, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { useState } from "react";
import InputField from "@/components/InputField";
import { icons } from "@/constants";
import CustomButton from "@/components/CustomButton";
import ReactNativeModal from "react-native-modal";

const Profile = () => {
  const [showModal, setShowModal] = useState(false);
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
        <TouchableOpacity
          onPress={() => setShowModal(true)}
          className="flex flex-row justify-start items-center gap-x-3 mt-6"
        >
          <Image source={icons.out} resizeMode="contain" className="w-7 h-7" />
          <Text className=" text-danger-600 font-JakartaMedium text-base">
            Logout
          </Text>
        </TouchableOpacity>
      </ScrollView>
      <ReactNativeModal isVisible={showModal}>
        <View>
          <View className="bg-white px-7 py-9 rounded-2xl min-h-[300px]">
            <Text className="text-3xl font-JakartaBold">
              Are you Sure ?
            </Text>
            <Text className="text-base text-customBlack-100 font-Jakarta mt-2">
              This action can't be undone.
            </Text>
            <View className="pt-6 flex flex-row justify-end items-center gap-x-6">
              <CustomButton
                title="Cancel"
                bgVariant="outline"
                textVariant="primary"
                className="w-24"
              />
              <CustomButton title="Logout" bgVariant="danger" className="w-24" />
            </View>
          </View>
        </View>
      </ReactNativeModal>
    </SafeAreaView>
  );
};

export default Profile;
