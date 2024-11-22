import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
import { useUser } from "@clerk/clerk-expo";
import { View, Image, Text } from "react-native";
import { icons } from "@/constants";

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
            drawerActiveTintColor: "white",
            drawerActiveBackgroundColor: "#0AD1C8",
            drawerStyle: {
              backgroundColor: "#55f7f0",
            },
          }}
        >
          <Drawer.Screen
            name="profile"
            options={{
              drawerLabel: () => (
                <View className="flex-1 items-start justify-center">
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
                  <Text className=" text-primary-400 font-JakartaBold text-xl my-6 uppercase w-full">
                    {user?.fullName}
                  </Text>
                  <Text>Sarthi Money Balance: 23</Text>
                </View>
              ),
              title: "Profile",
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
              drawerLabel: "Wallet",
              title: "overview",
              drawerIcon: () => (
                <Image source={icons.wallet} alt="wallet" className="w-7 h-7" />
              ),
              drawerItemStyle: { marginTop: 16 },
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
            }}
          />
        </Drawer>
      </GestureHandlerRootView>
    </>
  );
}
