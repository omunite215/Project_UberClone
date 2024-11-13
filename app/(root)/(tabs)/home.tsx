import GoogleTextInput from "@/components/GoogleTextInput";
import * as Location from "expo-location";
import { StatusBar } from "expo-status-bar";
// biome-ignore lint/suspicious/noShadowRestrictedNames: REQUIRED
import Map from "@/components/Map";
import RideCard from "@/components/RideCard";
import { icons, images } from "@/constants";
import { useLocationStore } from "@/store";
import { useAuth, useUser } from "@clerk/clerk-expo";
import { useEffect, useRef, useState } from "react";
import { ActivityIndicator, FlatList, Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { useFetch } from "@/lib/fetch";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";

const Home = () => {
  const { setUserLocation, setDestinationLocation } = useLocationStore();
  const { user } = useUser();
  const { signOut } = useAuth();
  const { data: recentRides, loading } = useFetch(`/(api)/ride/${user?.id}`);

  const [hasPremissions, setHasPermissions] = useState(false);
  const bottomSheetRef = useRef<BottomSheet>(null);

  const handleSignout = () => {
    signOut();
    router.replace("/(auth)/sign-in");
  };
  const handleDestinationPress = (location: {
    latitude: number;
    longitude: number;
    address: string;
  }) => {
    setDestinationLocation(location);
    router.push("/(root)/find-ride");
  };

  useEffect(() => {
    const requestLocation = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setHasPermissions(false);
        return;
      }
      const location = await Location.getCurrentPositionAsync();
      const address = await Location.reverseGeocodeAsync({
        // biome-ignore lint/style/noNonNullAssertion: GEOLOCATION API
        latitude: location.coords?.longitude!,
        // biome-ignore lint/style/noNonNullAssertion: GEOLOCATION API
        longitude: location.coords?.latitude!,
      });
      setUserLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        address: `${address[0].name}, ${address[0].region}`,
      });
    };
    requestLocation();
  }, [setUserLocation]);

  return (
    <GestureHandlerRootView className="bg-general-500 relative flex-1">
      <View className="flex-1 justify-center items-center">
        <GoogleTextInput
          purpose="pickup"
          containerStyle="bg-white shadow-md mx-5 z-30 -top-[85%]"
          handlePress={handleDestinationPress}
        />
        <View className="absolute flex-1 flex flex-row items-center h-full w-full">
          <Map />
        </View>
      </View>
      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={["18%", "50%", "75%"]}
        index={1}
      >
        <BottomSheetView style={{ flex: 1, padding: 15 }}>
          <FlatList
            data={recentRides?.slice(0, 5)}
            renderItem={({ item }) => <RideCard ride={item} />}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{
              paddingBottom: 0,
            }}
            ListEmptyComponent={() => (
              <View className="flex flex-col items-center justify-center pb-12">
                {!loading ? (
                  <>
                    <Image
                      source={images.noResult}
                      className="w-40 h-40"
                      alt="No recent rides found"
                      resizeMode="contain"
                    />
                    <Text className="text-sm">No recent rides found</Text>
                  </>
                ) : (
                  <ActivityIndicator size="small" color="#0B6477" />
                )}
              </View>
            )}
            ListHeaderComponent={() => (
              <>
                <GoogleTextInput
                  purpose="destination"
                  icon={icons.search}
                  containerStyle="bg-white shadow-md mt-4 mx-0.5"
                  handlePress={handleDestinationPress}
                />
                <Text className="text-xl font-JakartaBold mt-5 px-5">
                  Recent Rides
                </Text>
              </>
            )}
          />
        </BottomSheetView>
      </BottomSheet>
    </GestureHandlerRootView>
  );
};

export default Home;
