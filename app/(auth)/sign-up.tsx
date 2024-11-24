import type React from "react";
import { useState } from "react";
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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, router } from "expo-router";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import ReactNativeModal from "react-native-modal";
import { useSignUp } from "@clerk/clerk-expo";
import type { z } from "zod";
import CustomButton from "@/components/CustomButton";
import CustomFormField from "@/components/CustomFormField";
import OTPInputField from "@/components/OTPInputField";
import { fetchAPI } from "@/lib/fetch";
import { SignUpFormSchema } from "@/lib/validationSchemas";
import { icons, images } from "@/constants";
import { signupFields } from "@/constants/arrayData";
import AnimatedModal from "@/components/AnimatedModal";

type VerificationState = "default" | "pending" | "success" | "failed";

const SignUp: React.FC = () => {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [isChecked, setIsChecked] = useState(false);
  const [disableSubmit, setDisableSubmit] = useState(false);
  const [verificationState, setVerificationState] =
    useState<VerificationState>("default");
  const [verificationCode, setVerificationCode] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    getValues,
  } = useForm<z.infer<typeof SignUpFormSchema>>({
    resolver: zodResolver(SignUpFormSchema),
  });

  const handleSignUp = async (values: z.infer<typeof SignUpFormSchema>) => {
    if (!isLoaded) return;

    setDisableSubmit(true);
    try {
      await signUp.create({
        // firstName: values.firstName,
        // lastName: values.lastName,
        emailAddress: values.email,
        password: values.password,
      });
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      setVerificationState("pending");
      // biome-ignore lint/suspicious/noExplicitAny: ERROR STATE
    } catch (err: any) {
      Alert.alert("Error", err.errors?.[0]?.longMessage || "Sign-up failed");
      reset();
    } finally {
      setDisableSubmit(false);
    }
  };

  const handleVerification = async () => {
    if (!isLoaded) return;

    try {
      const { firstName, lastName, email, adhaarCardNo, phone } = getValues();
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code: verificationCode,
      });

      if (completeSignUp.status === "complete") {
        await fetchAPI("/(api)/user", {
          method: "POST",
          body: JSON.stringify({
            firstName: firstName,
            lastName: lastName,
            email: email,
            phone: `+91 ${phone}`,
            adhaarId: adhaarCardNo,
            clerkId: completeSignUp.createdUserId,
          }),
        });

        await setActive({ session: completeSignUp.createdSessionId });
        setVerificationState("success");
        setShowSuccessModal(true);
      } else {
        setVerificationState("failed");
        Alert.alert(
          "Verification Failed",
          "Please check the code and try again."
        );
        reset();
      }
      // biome-ignore lint/suspicious/noExplicitAny: ERROR STATE
    } catch (err: any) {
      setVerificationState("failed");
      Alert.alert(
        "Error",
        err.errors?.[0]?.longMessage || "Verification failed"
      );
      reset();
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1"
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        className="bg-black/10"
      >
        <ImageBackground
          source={require("@/assets/images/signup-car.png")}
          resizeMode="cover"
          className="h-full w-full justify-center items-center opacity-80"
        >
          <View className="flex-1 bg-black/50 w-full px-5">
            <View className="relative w-full h-[130px]">
              <Text className="text-3xl text-white font-JakartaBold absolute bottom-0 mt-6 left-0">
                Create Your Account
              </Text>
            </View>

            <View className="py-5">
              {signupFields.map(({ label, ...props }) => (
                <CustomFormField
                  key={props.name}
                  control={control}
                  errors={errors}
                  label={label}
                  {...props}
                />
              ))}

              <View className="flex flex-row my-6">
                <BouncyCheckbox
                  isChecked={isChecked}
                  fillColor="#0ad1c8"
                  size={24}
                  onPress={() => {
                    setIsChecked(!isChecked);
                    setValue("acceptTerms", !isChecked);
                  }}
                />
                <Link href="/(root)/policies" className="max-w-xs">
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
                onPress={handleSubmit(handleSignUp)}
                className="mt-6"
              />

              <Link
                href="/(auth)/sign-in"
                className="text-lg text-center text-customBlack-100 my-10"
              >
                <Text>Already have an account? </Text>
                <Text className=" text-primary-300">Log In</Text>
              </Link>
            </View>

            {/* Verification Modal */}
            <ReactNativeModal isVisible={verificationState === "pending"}>
              <View className="bg-white px-7 py-9 rounded-2xl min-h-[300px]">
                <Text className="text-2xl font-JakartaExtraBold mb-2">
                  Verification
                </Text>
                <Text className="font-Jakarta">
                  We've sent a verification code to {getValues("phone")}
                </Text>
                <OTPInputField
                  label="Code"
                  icon={icons.lock}
                  placeholder="XXXXX"
                  value={verificationCode}
                  keyboardType="numeric"
                  onChangeText={setVerificationCode}
                />
                {verificationState === "failed" && (
                  <Text className="text-red-500 text-sm mt-1">
                    Verification Failed
                  </Text>
                )}
                <CustomButton
                  title="Verify Account"
                  onPress={handleVerification}
                  className="mt-5 bg-primary-200"
                />
              </View>
            </ReactNativeModal>

            {/* Success Modal */}
            <ReactNativeModal
              isVisible={showSuccessModal}
              onModalHide={() => {
                setShowSuccessModal(false);
                router.replace("/(root)/(tabs)/home");
              }}
            >
              <View className="bg-white px-7 py-9 rounded-2xl min-h-[300px]">
                <Image
                  source={images.check}
                  className="w-[110px] h-[110px] mx-auto my-5"
                />
                <Text className="text-3xl font-JakartaBold text-center">
                  Success!!
                </Text>
                <Text className="text-base text-customBlack-100 font-Jakarta text-center mt-2">
                  You have successfully verified your account.
                </Text>
              </View>
            </ReactNativeModal>
          </View>
        </ImageBackground>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignUp;
