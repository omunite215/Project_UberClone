import { useSignIn } from "@clerk/clerk-expo";
import CustomButton from "@/components/CustomButton";
import OAuth from "@/components/OAuth";
import { icons } from "@/constants";
import { Link, useRouter } from "expo-router";
import { useCallback } from "react";
import {
  ScrollView,
  Text,
  View,
  KeyboardAvoidingView,
  Platform,
  ImageBackground,
} from "react-native";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { SignInFormSchema } from "@/lib/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomFormField from "@/components/CustomFormField";

const SignIn = () => {
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof SignInFormSchema>>({
    resolver: zodResolver(SignInFormSchema),
  });

  const onSignInPress = useCallback(
    async (values: z.infer<typeof SignInFormSchema>) => {
      if (!isLoaded) {
        return;
      }

      try {
        const signInAttempt = await signIn.create({
          identifier: values.email,
          password: values.password,
        });

        if (signInAttempt.status === "complete") {
          await setActive({ session: signInAttempt.createdSessionId });
          router.replace("/");
        } else {
          // See https://clerk.com/docs/custom-flows/error-handling
          // for more info on error handling
          console.error(JSON.stringify(signInAttempt, null, 2));
        }
        // biome-ignore lint/suspicious/noExplicitAny: CUSTOMIZED ERROR
      } catch (err: any) {
        console.error(JSON.stringify(err, null, 2));
      }
    },
    [isLoaded, setActive, signIn, router]
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1"
      enabled
    >
      <ScrollView className="flex-1 bg-white">
        <ImageBackground
          source={require("@/assets/images/signup-car.png")}
          resizeMode="cover"
          className=" h-full w-full justify-center items-center opacity-80"
        >
          <View className="flex-1 bg-black/50 w-full px-5">
            <View className="relative w-full h-[130px]">
              <Text className="text-2xl text-white font-JakartaSemiBold absolute bottom-0 mt-6 left-0">
                Welcome Back!!
              </Text>
            </View>
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
            <CustomButton
              title="Sign In"
              onPress={handleSubmit(onSignInPress)}
              className="mt-6"
            />
            <OAuth />
            <Link
              href="/(auth)/sign-up"
              className="text-lg text-center text-customBlack-100 mt-10"
            >
              <Text>Don't have an account? </Text>
              <Text className=" text-primary-300">Sign Up</Text>
            </Link>
          </View>
        </ImageBackground>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignIn;
