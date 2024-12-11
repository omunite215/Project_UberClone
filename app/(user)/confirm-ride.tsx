import ConfirmRideCard from "@/components/ConfirmRideCard";
import RideLayout from "@/components/RideLayout";
import RideOptionsCard from "@/components/RideOptionsCard";
import { icons } from "@/constants";
import { calculateFares } from "@/lib/map";
import { useDriverStore, useLocationStore } from "@/store";
import type { FareEstimate } from "@/types/type";
import { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, Alert } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

const ConfirmRide = () => {
  const { drivers, selectedDriver, setSelectedDriver } = useDriverStore();
  const [fares, setFares] = useState<FareEstimate | undefined | null>(null);
  const {
    userAddress,
    destinationAddress,
    userLongitude,
    userLatitude,
    destinationLatitude,
    destinationLongitude,
  } = useLocationStore();
  useEffect(() => {
    const fetchFares = async () => {
      if (
        !userLatitude ||
        !userLongitude ||
        !destinationLatitude ||
        !destinationLongitude
      ) {
        Alert.alert("Cannot fetch Fares");
      }
      const fares = await calculateFares({
        userLatitude,
        userLongitude,
        destinationLatitude,
        destinationLongitude,
      });
      setFares(fares);
    };
    fetchFares();
  }, [userLatitude, userLongitude, destinationLatitude, destinationLongitude]);
  return (
    <RideLayout title="Choose a Ride" snapPoints={["65%"]}>
      <View className=" drop-shadow-md">
        <ConfirmRideCard title="Pickup Location" value={userAddress} />
        <View className="flex flex-row justify-between items-center">
          <Text className="font-JakartaMedium rotate-90 ml-5">....</Text>
          <TouchableOpacity
            className="bg-customWhite px-2.5 py-0.5 rounded-md justify-end items-center"
            activeOpacity={100}
          >
            <Image source={icons.time} className="h-6 w-6" />
            <Text className=" font-JakartaMedium text-xs">Now</Text>
          </TouchableOpacity>
        </View>
        <ConfirmRideCard
          title="Destination Location"
          value={destinationAddress}
        />
      </View>
      <Text className="my-3 text-base font-JakartaSemiBold">
        Recommended for You
      </Text>
      <ScrollView
        className="flex-1 bg-white"
        contentContainerStyle={{ flexGrow: 1, paddingBottom: "95%" }}
        showsVerticalScrollIndicator={false}
      >
        <RideOptionsCard
          title="Mini"
          description="Compact, comfortable, and budget-friendly travel."
          farePrice={fares?.mini}
          imgSrc={icons.mini}
        />
        <RideOptionsCard
          title="Sedan"
          description="Ride in style with extra space and superior comfort."
          farePrice={fares?.sedan}
          imgSrc={icons.sedan}
        />
        <RideOptionsCard
          title="Hatchback"
          description="Smart rides for the city, perfect for small groups!"
          farePrice={fares?.sedan}
          imgSrc={icons.hatchback}
        />
        <RideOptionsCard
          title="Auto"
          description="Hop on for a breezy, budget ride through the city!"
          farePrice={fares?.auto}
          imgSrc={icons.rickshaw}
        />
      </ScrollView>
    </RideLayout>
  );
};

export default ConfirmRide;
