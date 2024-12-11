import ReactNativeModal from "react-native-modal";
import { View, Text, Image } from "react-native";
import { icons, images } from "@/constants";
import OTPInputField from "./OTPInputField";
import { StringValidation } from "zod";
import CustomButton from "./CustomButton";

export const SuccessModal = ({
  isVisible,
  message,
}: {
  isVisible: boolean;
  message: string;
}) => {
  return (
    <ReactNativeModal isVisible={isVisible}>
      <View className="bg-white px-7 py-9 rounded-2xl min-h-[300px]">
        <Image
          source={images.check}
          className="w-[110px] h-[110px] mx-auto my-5"
        />
        <Text className="text-3xl font-JakartaBold text-center">Success!!</Text>
        <Text className="text-base text-customBlack-100 font-Jakarta text-center mt-2">
          {message}
        </Text>
      </View>
    </ReactNativeModal>
  );
};

type VerificationModalProps = {
    verificationState: string;
    verificationCode: string;
    setVerificationCode:  React.Dispatch<React.SetStateAction<string>>;
    message: string;
    onPress: () => Promise<void>;
}

export const VerificationModal = ({verificationState, message, verificationCode, setVerificationCode, onPress}:VerificationModalProps) => {
  return (
    <ReactNativeModal isVisible={verificationState === "pending"}>
      <View className="bg-white px-7 py-9 rounded-2xl min-h-[300px]">
        <Text className="text-2xl font-JakartaExtraBold mb-2">
          Verification
        </Text>
        <Text className="font-Jakarta">
          {message}
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
          <Text className="text-red-500 text-sm mt-1">Verification Failed</Text>
        )}
        <CustomButton
          title="Verify Account"
          onPress={onPress}
          className="mt-5 bg-primary-200"
        />
      </View>
    </ReactNativeModal>
  );
};
