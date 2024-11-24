import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
import { useUser } from "@clerk/clerk-expo";
import { Image, Text, TouchableOpacity } from "react-native";
import { icons } from "@/constants";
import { router } from "expo-router";

export default function RootLayout() {
  const { user } = useUser();
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
                  <Text className=" text-white font-JakartaBold text-xl my-6 uppercase w-full">
                    {user?.fullName}
                  </Text>
                  <Text className="font-JakartaMedium mb-6 text-customWhite">
                    Sarthi Money Balance: ₹ 23
                  </Text>
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
