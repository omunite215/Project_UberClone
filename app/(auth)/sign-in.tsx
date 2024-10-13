import CustomButton from "@/components/CustomButton";
import InputField from "@/components/InputField";
import OAuth from "@/components/OAuth";
import { icons, images } from "@/constants";
import { Link } from "expo-router";
import { useState } from "react";
import { Image, ScrollView, Text, View } from "react-native";

const SignIn = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const onSignIpPress = async () => {};

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="flex-1 bg-white">
        <View className="relative w-full h-[250px]">
          <Image source={images.signUpCar} className="z-0 w-full h-[250px]" />
          <Text className="text-2xl text-customBlack-200 font-JakartaSemiBold absolute bottom-5 left-5">
            Welcome Back!!
          </Text>
        </View>
      </View>
      <View className="p-5">
        <InputField
          label="Email"
          placeholder="Enter your email"
          icon={icons.email}
          value={form.email}
          onChangeText={(value) => setForm({ ...form, email: value })}
        />
        <InputField
          label="Password"
          placeholder="Enter your password"
          icon={icons.email}
          secureTextEntry={true}
          value={form.password}
          onChangeText={(value) => setForm({ ...form, password: value })}
        />
        <CustomButton
          title="Sign In"
          onPress={onSignIpPress}
          className="mt-6"
        />
        <OAuth />
        <Link
          href="/(auth)/sign-up"
          className="text-lg text-center text-customBlack-100 mt-10"
        >
          <Text>Don't have an account? </Text>
          <Text className=" text-primary-600">Sign Up</Text>
        </Link>
      </View>
    </ScrollView>
  );
};

export default SignIn;
