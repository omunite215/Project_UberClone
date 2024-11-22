import { icons } from "@/constants";
import type { GoogleInputProps } from "@/types/type";
import { router } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

const googlePlacesApiKey = process.env.EXPO_PUBLIC_GOOGLE_API_KEY;

const GoogleTextInput = ({
  icon,
  initialLocation,
  containerStyle,
  textInputBackgroundColor,
  handlePress,
  purpose,
  placeholder
}: GoogleInputProps) => {
  return (
    <View
      className={`flex flex-row items-center justify-center relative z-50 rounded-xl ${containerStyle} mb-5`}
    >
      <GooglePlacesAutocomplete
        fetchDetails={true}
        placeholder={
          purpose === "destination" ? "Search Destination" : "Search Pickup"
        }
        debounce={200}
        styles={{
          textInputContainer: {
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 20,
            marginHorizontal: 20,
            position: "relative",
          },
          textInput: {
            backgroundColor: textInputBackgroundColor || "white",
            fontSize: 14,
            fontWeight: "600",
            marginTop: 5,
            width: "100%",
            borderRadius: 200,
          },
          listView: {
            backgroundColor: textInputBackgroundColor || "transparent",
            position: "relative",
            top: 0,
            width: "100%",
            borderRadius: 10,
            shadowColor: "#d4d4d4",
            zIndex: 99,
          },
        }}
        onPress={(data, details = null) => {
          handlePress({
            // biome-ignore lint/style/noNonNullAssertion: API CALL
            latitude: details?.geometry.location.lat!,
            // biome-ignore lint/style/noNonNullAssertion: API CALL
            longitude: details?.geometry.location.lng!,
            address: data.description,
          });
        }}
        query={{
          key: googlePlacesApiKey,
          language: "en",
        }}
        renderLeftButton={() =>
          icon ? (
            <Image source={icon || icons.search} className="w-6 h-6" resizeMode="contain" />
          ) : (
            <View className="flex flex-row gap-3 justify-start items-center">
              <Image
                source={icons.menu}
                className="w-6 h-6"
                resizeMode="contain"
              />
              <View className="h-2 w-2 rounded-full bg-primary-200" />
            </View>
          )
        }
        renderRightButton={() => (
          <TouchableOpacity onPress={() => router.push("/(root)/favorites")}>
            <Image
              source={icons.heart}
              resizeMode="contain"
              className="h-4 w-4"
            />
          </TouchableOpacity>
        )}
        textInputProps={{
          placeholderTextColor: "gray",
          placeholder: initialLocation || placeholder
        }}
      />
    </View>
  );
};

export default GoogleTextInput;
