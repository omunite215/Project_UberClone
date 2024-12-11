import { icons } from "@/constants";
import { useFetch } from "@/lib/fetch";
import type { walletBalanceResponse } from "@/types/type";
import { useUser } from "@clerk/clerk-expo";
import { router } from "expo-router";
import { Drawer } from "expo-router/drawer";
import { ActivityIndicator, Image, Text, TouchableOpacity } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function RootLayout() {
  const { user } = useUser();
  const { data: profileDetails, loading } = useFetch<walletBalanceResponse[]>(
    `/(api)/user/${user?.id}?fields=wallet_balance`
  );
  return (
    <>
      <GestureHandlerRootView>
        <Drawer
          screenOptions={{
            headerShown: false,
            drawerType: "front",
            overlayColor: "rgba(0, 0, 0, 0.5)",
            drawerInactiveTintColor: "white",
            drawerActiveTintColor: "white",
            drawerActiveBackgroundColor: "#0AD1C8",
            drawerStyle: {
              backgroundColor: "teal",
            },
          }}
        >
          <Drawer.Screen
            name="profile"
            options={{
              drawerLabel: () => (
                <TouchableOpacity
                  onPress={() => router.push("/profile")}
                  className="flex-1 items-start justify-center"
                  activeOpacity={1}
                >
                  <Image
                    source={{
                      uri:
                        user?.externalAccounts[0]?.imageUrl ?? user?.imageUrl,
                    }}
                    resizeMode="contain"
                    width={45}
                    height={45}
                    className=" rounded-full"
                  />
                  <Text className=" text-white font-JakartaBold text-xl mt-6 uppercase w-full">
                    {user?.fullName}
                  </Text>
                  {!profileDetails || loading ? (
                    <ActivityIndicator />
                  ) : (
                    <Text className="text-sm font-JakartaMedium text-white mt-2">
                      Available Balance: ₹ {profileDetails[0]?.wallet_balance}
                    </Text>
                  )}
                </TouchableOpacity>
              ),
              title: "Profile",
              drawerActiveBackgroundColor: "transparent",
              swipeEnabled: false,
            }}
          />
          <Drawer.Screen
            name="home" // This is the name of the page and must match the url from root
            options={{
              drawerLabel: "Home",
              title: "overview",
              drawerIcon: () => (
                <Image source={icons.home} alt="home" className="w-7 h-7" />
              ),
              drawerItemStyle: { marginTop: 16 },
            }}
          />
          <Drawer.Screen
            name="wallet" // This is the name of the page and must match the url from root
            options={{
              drawerLabel: "Sarthi Wallet",
              title: "overview",
              drawerIcon: () => (
                <Image source={icons.wallet} alt="wallet" className="w-7 h-7" />
              ),
              drawerItemStyle: { marginTop: 16 },
              swipeEnabled: false,
            }}
          />
          <Drawer.Screen
            name="rides" // This is the name of the page and must match the url from root
            options={{
              drawerLabel: "History",
              title: "overview",
              drawerIcon: () => (
                <Image
                  source={icons.history}
                  alt="history"
                  className="w-7 h-7"
                />
              ),
              drawerItemStyle: { marginTop: 16 },
              swipeEnabled: false,
            }}
          />
          <Drawer.Screen
            name="support" // This is the name of the page and must match the url from root
            options={{
              drawerLabel: "Support",
              title: "overview",
              drawerIcon: () => (
                <Image
                  source={icons.support}
                  alt="support"
                  className="w-7 h-7"
                />
              ),
              drawerItemStyle: { marginTop: 16 },
              swipeEnabled: false,
            }}
          />
          <Drawer.Screen
            name="about" // This is the name of the page and must match the url from root
            options={{
              drawerLabel: "About",
              title: "overview",
              drawerIcon: () => (
                <Image source={icons.info} alt="about" className="w-7 h-7" />
              ),
              drawerItemStyle: { marginTop: 16 },
              swipeEnabled: false,
            }}
          />
        </Drawer>
      </GestureHandlerRootView>
    </>
  );
}
