import GoogleTextInput from "@/components/GoogleTextInput";
import * as Location from "expo-location";
import { StatusBar } from "expo-status-bar";
// biome-ignore lint/suspicious/noShadowRestrictedNames: REQUIRED
import Map from "@/components/Map";
import RideCard from "@/components/RideCard";
import { icons, images } from "@/constants";
import { useLocationStore } from "@/store";
import { useUser } from "@clerk/clerk-expo";
import { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import { router } from "expo-router";
import { useFetch } from "@/lib/fetch";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import type { activeStatusResponse, Ride } from "@/types/type";
import ActiveStatusSwitch from "@/components/ActiveStatusSwitch";

const Home = () => {
  const navigation = useNavigation();
  const { setUserLocation } = useLocationStore();
  const { user } = useUser();
  const { data: status, loading } = useFetch<activeStatusResponse[]>(
    `/(api)/driver/${user?.id}?fields=active_status`
  );

  const [hasPremissions, setHasPermissions] = useState(false);
  const bottomSheetRef = useRef<BottomSheet>(null);

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
        <View className="bg-white shadow-md mx-5 px-3 z-30 -top-[41%] rounded-xl h-14 w-11/12 flex flex-row justify-start items-center">
          <TouchableOpacity
            className="mx-2"
            onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
          >
            <Image
              source={icons.menu}
              resizeMode="contain"
              className="w-6 h-6"
            />
          </TouchableOpacity>
          <TouchableOpacity
            className="w-full h-full flex flex-row space-x-5 justify-between pr-8 items-center"
            onPress={() => {}}
          >
            <View className="flex flex-row items-center gap-2 ml-3">
              {!status ? (
                <ActivityIndicator size="small" color="#0AD1C8" />
              ) : (
                <View
                  className={`w-2 h-2 ml-2 rounded-full ${status[0].active_status ? "bg-primary-200" : "bg-danger-600"}`}
                />
              )}
              <Text className=" font-JakartaMedium">
                Status:&nbsp;
                {!status ? (
                  <ActivityIndicator size="small" color="#0AD1C8" />
                ) : status[0].active_status ? (
                  "Online"
                ) : (
                  "Offline"
                )}
              </Text>
            </View>
            <ActiveStatusSwitch userId={user?.id!} />
          </TouchableOpacity>
        </View>
        <View className="absolute flex-1 flex flex-row items-center h-full w-full">
          <Map />
        </View>
      </View>
      <BottomSheet ref={bottomSheetRef} snapPoints={["50%"]} index={0}>
        <BottomSheetView style={{ flex: 1, padding: 15 }}>
          {/* <FlatList
            data={recentRides?.slice(0, 2)}
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
                    <Text className="text-sm text-customBlack-100">
                      No recent rides found
                    </Text>
                  </>
                ) : (
                  <ActivityIndicator size="small" color="#0B6477" />
                )}
              </View>
            )}
            ListHeaderComponent={() => (
              <>
                <View className="bg-white shadow-md my-2 px-3 py-3 z-30 rounded-xl h-14 w-full flex flex-row justify-start items-center">
                  <TouchableOpacity className="mx-2">
                    <Image
                      source={icons.search}
                      resizeMode="contain"
                      className="w-6 h-6"
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    className="w-full h-full flex flex-row space-x-2 justify-start items-center"
                    onPress={() => {}}
                  >
                    <Text className=" font-JakartaMedium text-lg">
                      Your Destination
                    </Text>
                  </TouchableOpacity>
                </View>
                <Text className="text-xl font-JakartaBold mt-5 px-5">
                  Recent Rides
                </Text>
              </>
            )}
          /> */}
        </BottomSheetView>
      </BottomSheet>
    </GestureHandlerRootView>
  );
};

export default Home;
