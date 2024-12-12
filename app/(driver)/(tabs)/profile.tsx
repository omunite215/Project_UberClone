import CustomButton from "@/components/CustomButton";
import { icons } from "@/constants";
import { useFetch } from "@/lib/fetch";
import type { DriverProfileDetails } from "@/types/type";
import { useAuth, useUser } from "@clerk/clerk-expo";
import { router } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import ReactNativeModal from "react-native-modal";
import { SafeAreaView } from "react-native-safe-area-context";

const Profile = () => {
  const [showModal, setShowModal] = useState(false);
  const { user } = useUser();
  const { signOut } = useAuth();
  const { data: profileDetails, loading } = useFetch<DriverProfileDetails[]>(
    `/(api)/driver/${user?.id}`
  );
  const handleSignOut = () => {
    signOut();
    router.replace("/(auth)/options");
  };

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
      <Text className="text-2xl font-JakartaBold my-5">Profile Settings</Text>
      {!profileDetails || loading ? (
        <ActivityIndicator size="small" color="#0AD1C8" />
      ) : (
        <View className="my-5">
          <View className="py-4 px-3 rounded-lg bg-white mb-5">
            <Text className="font-JakartaMedium">
              Firstname : {profileDetails[0]?.first_name}
            </Text>
          </View>
          <View className="py-4 px-3 rounded-lg bg-white mb-5">
            <Text className=" font-JakartaMedium">
              Lastname : {profileDetails[0]?.last_name}
            </Text>
          </View>
          <View className="py-4 px-3 rounded-lg bg-white mb-5">
            <Text className=" font-JakartaMedium">
              Email : {profileDetails[0]?.email}
            </Text>
          </View>
          <View className="py-4 px-3 rounded-lg bg-white mb-5">
            <Text className=" font-JakartaMedium">
              Phone :{profileDetails[0]?.phone}
            </Text>
          </View>
          <View className="py-4 px-3 rounded-lg bg-white mb-5">
            <Text className=" font-JakartaMedium">
              Adhaar Card :{profileDetails[0]?.adhaar_id}
            </Text>
          </View>
          <View className="py-4 px-3 rounded-lg bg-white mb-5">
            <Text className=" font-JakartaMedium">
              Vehicle No :{profileDetails[0]?.vehicle_no}
            </Text>
          </View>
          <View className="py-4 px-3 rounded-lg bg-white mb-5">
            <Text className=" font-JakartaMedium">
              Vehicle No :{profileDetails[0]?.vehicle_type}
            </Text>
          </View>
          <View className="py-4 px-3 rounded-lg bg-white mb-5">
            <Text className=" font-JakartaMedium">
              Vehicle No :{profileDetails[0]?.drivingLicenseNo}
            </Text>
          </View>
          <View className="py-4 px-3 rounded-lg bg-white mb-5">
            <Text className=" font-JakartaMedium">Role : Rider</Text>
          </View>
        </View>
      )}
      <TouchableOpacity
        onPress={() => setShowModal(true)}
        className="flex flex-row justify-start items-center gap-x-3 mt-6"
      >
        <Image source={icons.out} resizeMode="contain" className="w-6 h-6" />
        <Text className=" text-danger-600 font-JakartaMedium text-base">
          Logout
        </Text>
      </TouchableOpacity>
      <ReactNativeModal isVisible={showModal}>
        <View>
          <View className="bg-white p-7 rounded-2xl min-h-[200px]">
            <Text className="text-2xl font-JakartaBold">Are you Sure ?</Text>
            <Text className="text-xs text-customBlack-100 font-Jakarta mt-2">
              This action can't be undone.
            </Text>
            <View className="mt-12 flex flex-row justify-end items-center gap-x-6">
              <CustomButton
                title="Cancel"
                bgVariant="outline"
                textVariant="primary"
                className="w-24 shadow-none"
                onPress={() => setShowModal(false)}
              />
              <CustomButton
                title="Logout"
                bgVariant="danger"
                className="w-24 shadow-none"
                onPress={handleSignOut}
              />
            </View>
          </View>
        </View>
      </ReactNativeModal>
    </SafeAreaView>
  );
};

export default Profile;
