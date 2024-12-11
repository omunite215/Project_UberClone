import { useState } from "react";
import {
  Alert,
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
import { useSignUp } from "@clerk/clerk-expo";
import type { z } from "zod";
import CustomButton from "@/components/CustomButton";
import CustomFormField from "@/components/CustomFormField";
import { fetchAPI } from "@/lib/fetch";
import { SignUpFormSchema } from "@/lib/validationSchemas";
import { signupFields } from "@/constants/arrayData";
import { AcceptTermsCheckbox } from "@/components/InputField";
import { SuccessModal, VerificationModal } from "@/components/Modals";

type VerificationState = "default" | "pending" | "success" | "failed";

const SignUp: React.FC = () => {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [isChecked, setIsChecked] = useState(false);
  const [verificationState, setVerificationState] =
    useState<VerificationState>("default");
  const [verificationCode, setVerificationCode] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
    getValues,
  } = useForm<z.infer<typeof SignUpFormSchema>>({
    resolver: zodResolver(SignUpFormSchema),
  });

  const handleSignUp = async (
    values: z.infer<typeof SignUpFormSchema>
  ): Promise<void> => {
    if (!isLoaded) return;
    try {
      await signUp.create({
        emailAddress: values.email,
        password: values.password,
        firstName: values.firstName,
        lastName: values.lastName,
        unsafeMetadata: {
          role: "user",
        },
      });
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      setVerificationState("pending");
      // biome-ignore lint/suspicious/noExplicitAny: ERROR STATE
    } catch (err: any) {
      Alert.alert("Error", err.errors?.[0]?.longMessage || "Sign-up failed");
      reset();
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
            phone: `+91${phone}`,
            adhaarId: adhaarCardNo,
            clerkId: completeSignUp.createdUserId,
          }),
        });

        await setActive({ session: completeSignUp.createdSessionId });
        setVerificationState("success");
        setShowSuccessModal(true);
        router.replace("/(user)/(tabs)/home");
      } else {
        setVerificationState("failed");
        Alert.alert(
          "Verification Failed",
          "Please check the code and try again."
        );
        reset();
      }
      setShowSuccessModal(false);
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
              <AcceptTermsCheckbox
                isChecked={isChecked}
                onPress={() => {
                  setIsChecked(!isChecked);
                  setValue("acceptTerms", !isChecked);
                }}
                to="/(user)/policies"
              />
              <CustomButton
                disabled={isSubmitting}
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
            <VerificationModal
              verificationState={verificationState}
              setVerificationCode={setVerificationCode}
              verificationCode={verificationCode}
              onPress={handleVerification}
              message={`We've sent a verification code to ${getValues("email")}`}
            />
            {/* Success Modal */}
            <SuccessModal
              isVisible={showSuccessModal}
              message="Your account has been verified!!"
            />
          </View>
        </ImageBackground>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignUp;
