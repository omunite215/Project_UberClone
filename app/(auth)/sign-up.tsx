import CustomButton from "@/components/CustomButton";
import CustomFormField from "@/components/CustomFormField";
import OAuth from "@/components/OAuth";
import OTPInputField from "@/components/OTPInputField";
import { icons, images } from "@/constants";
import { fetchAPI } from "@/lib/fetch";
import { SignUpFormSchema } from "@/lib/validationSchemas";
import { useSignUp } from "@clerk/clerk-expo";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, router } from "expo-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Alert,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  View,
} from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import ReactNativeModal from "react-native-modal";
import type { z } from "zod";

const SignUp = () => {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [isChecked, setIsChecked] = useState(false);
  const [disableSubmit, setDisableSubmit] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = useForm<z.infer<typeof SignUpFormSchema>>({
    resolver: zodResolver(SignUpFormSchema),
  });

  const [verification, setVerification] = useState({
    state: "default",
    error: "",
    code: "",
  });

  const onSignUpPress = async (values: z.infer<typeof SignUpFormSchema>) => {
    console.log(values);
    setDisableSubmit(true);
    if (!isLoaded) {
      return;
    }

    try {
      await signUp.create({
        emailAddress: values.email,
        password: values.password,
      });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      setVerification({
        ...verification,
        state: "pending",
      });
      // biome-ignore lint/suspicious/noExplicitAny: No Error Types
    } catch (err: any) {
      Alert.alert("Error: ", err.errors[0].longMessage);
    }
  };

  const onPressVerify = async () => {
    if (!isLoaded) {
      return;
    }
    try {
      const { name, email, adhaarCardNo, phone } = getValues();
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code: verification.code,
      });
      console.log(completeSignUp.status);
      if (completeSignUp.status === "complete") {
        await fetchAPI("/(api)/user", {
          method: "POST",
          body: JSON.stringify({
            name: name,
            email: email,
            phone: `+91 ${phone}`,
            adhaarId: adhaarCardNo,
            clerkId: completeSignUp.createdUserId,
          }),
        });
        await setActive({ session: completeSignUp.createdSessionId });

        setVerification({
          ...verification,
          state: "success",
        });
        console.log("Step-1");
      } else {
        setVerification({
          ...verification,
          error: "Verification Failed!!",
          state: "failed",
        });
      }
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    } catch (err: any) {
      setVerification({
        ...verification,
        error: err?.errors[0]?.longMessage || "Oops!! An Error Occured!!",
        state: "failed",
      });
      console.log("Step-3");
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1"
      enabled
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        className="bg-black/10"
      >
        <ImageBackground
          source={require("@/assets/images/signup-car.png")}
          resizeMode="cover"
          className=" h-full w-full justify-center items-center opacity-80"
        >
          <View className="flex-1 bg-black/50 w-full px-5">
            <View className="relative w-full h-[130px]">
              <Text className="text-2xl text-white font-JakartaSemiBold absolute bottom-0 mt-6 left-0">
                Create Your Account
              </Text>
            </View>
            <View className="py-5">
              <CustomFormField
                control={control}
                errors={errors}
                label="Name"
                name="name"
                placeholder="Enter your name"
                icon={icons.person}
              />
              <CustomFormField
                control={control}
                errors={errors}
                label="Email"
                name="email"
                placeholder="Enter your Email"
                icon={icons.email}
              />
              <CustomFormField
                control={control}
                errors={errors}
                label="Password"
                name="password"
                placeholder="Enter your Password"
                icon={icons.lock}
                secureTextEntry={true}
              />
              <CustomFormField
                control={control}
                errors={errors}
                label="Phone"
                name="phone"
                placeholder="Enter your Phone Number"
                icon={icons.indiaFlag}
                prefixText="+91"
              />
              <CustomFormField
                control={control}
                errors={errors}
                label="Adhaar Card Number"
                name="adhaarCardNo"
                placeholder="Enter your Adhaar Card Number"
                icon={icons.adhaar}
              />
              <View className="flex flex-row items-center justify-start gap-x-6 my-2">
                <BouncyCheckbox
                  isChecked={isChecked}
                  disableText
                  fillColor="#0ad1c8"
                  useBuiltInState={false}
                  size={24}
                  onPress={() => {
                    setIsChecked(!isChecked);
                    setValue("acceptTerms", !isChecked);
                  }}
                />
                <Link href="/(root)/policies" className="pr-6">
                  <Text className="text-white text-[15px]">
                    By Signing Up you agree to the&nbsp;
                  </Text>
                  <Text className="text-primary-300 text-[15px] font-JakartaSemiBold">
                    Privacy Policies and Terms & Conditions
                  </Text>
                </Link>
              </View>
              <CustomButton
                disabled={disableSubmit}
                title="Sign Up"
                onPress={handleSubmit(onSignUpPress)}
                className="mt-6"
              />
              <OAuth />
              <Link
                href="/(auth)/sign-in"
                className="text-lg text-center text-customBlack-100 my-10"
              >
                <Text>Already have an account? </Text>
                <Text className=" text-primary-300">Log In</Text>
              </Link>
            </View>
            <ReactNativeModal
              isVisible={verification.state === "pending"}
              onModalHide={() => {
                if (verification.state === "success") setShowSuccessModal(true);
              }}
            >
              <View className="bg-white px-7 py-9 rounded-2xl min-h-[300px]">
                <Text className="text-2xl font-JakartaExtraBold mb-2">
                  Verfication
                </Text>
                <Text className="font-Jakarta">
                  We&apos;ve sent a verification code to {getValues("phone")}
                </Text>
                <OTPInputField
                  label="Code"
                  icon={icons.lock}
                  placeholder="XXXXX"
                  value={verification.code}
                  keyboardType="numeric"
                  onChangeText={(code) =>
                    setVerification({ ...verification, code })
                  }
                />
                {verification.error && (
                  <Text className=" text-red-500 text-sm mt-1">
                    {verification.error}
                  </Text>
                )}
                <CustomButton
                  title="Verify Account"
                  onPress={onPressVerify}
                  className="mt-5 bg-primary-200"
                />
              </View>
            </ReactNativeModal>
            <ReactNativeModal isVisible={showSuccessModal}>
              <View className="bg-white px-7 py-9 rounded-2xl min-h-[300px]">
                <Image
                  source={images.check}
                  className="w-[110px] h-[110px] mx-auto my-5"
                />
                <Text className="text-3xl font-JakartaBold text-center">
                  Success!!
                </Text>
                <Text className="text-base text-customBlack-100 font-Jakarta text-center mt-2">
                  You have succesfully verfied your account.
                </Text>
                <CustomButton
                  title="Browse Home"
                  onPress={() => {
                    setShowSuccessModal(false);
                    router.push("/(root)/(tabs)/home");
                  }}
                  className="mt-5"
                />
              </View>
            </ReactNativeModal>
          </View>
        </ImageBackground>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignUp;
