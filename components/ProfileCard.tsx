import { View, Text } from "react-native";
import { Link } from "expo-router";

type ProfileCardProps = {
title: ""
}


const ProfileCard = () => {
  return (
    <>
      <View className="py-4 px-3 rounded-lg bg-white mb-5">
        <Text className=" font-JakartaMedium">
          Text
        </Text>
      </View>
    </>
  );
};

export default ProfileCard;
