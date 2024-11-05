import { icons } from "@/constants";
import { Tabs } from "expo-router";
import { Image, type ImageSourcePropType, View } from "react-native";

const TabIcon = ({
  focused,
  source,
}: {
  focused: boolean;
  source: ImageSourcePropType;
}) => (
  <View
    className={`flex flex-row font-JakartaBold justify-center items-center rounded-full ${focused ? "bg-general-300" : ""}`}
  >
    <View
      className={` rounded-full mt-3 py-1 w-14 h-14 items-center justify-start ${focused ? "bg-primary-400" : ""}`}
    >
      <Image
        source={source}
        tintColor="white"
        resizeMode="contain"
        className="w-6 h-6"
      />
    </View>
  </View>
);

const Layout = () => (
  <Tabs
    initialRouteName="index"
    screenOptions={{
      tabBarActiveTintColor: "white",
      tabBarInactiveTintColor: "white",
      tabBarShowLabel: true,
      tabBarLabelStyle: {
        top: 10,
        fontWeight: 800,
      },
      tabBarStyle: {
        marginTop: 12,
        backgroundColor: "#333333",
        borderRadius: 50,
        paddingBottom: 0,
        overflow: "hidden",
        marginHorizontal: 20,
        marginBottom: 20,
        height: 78,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        position: "absolute",
      },
    }}
  >
    <Tabs.Screen
      name="home"
      options={{
        title: "Home",
        headerShown: false,
        tabBarIcon: ({ focused }) => (
          <TabIcon focused={focused} source={icons.home} />
        ),
      }}
    />
    <Tabs.Screen
      name="rides"
      options={{
        title: "Rides",
        headerShown: false,
        tabBarIcon: ({ focused }) => (
          <TabIcon focused={focused} source={icons.list} />
        ),
      }}
    />
    <Tabs.Screen
      name="chat"
      options={{
        title: "Chat",
        headerShown: false,
        tabBarIcon: ({ focused }) => (
          <TabIcon focused={focused} source={icons.chat} />
        ),
      }}
    />
    <Tabs.Screen
      name="profile"
      options={{
        title: "Profile",
        headerShown: false,
        tabBarIcon: ({ focused }) => (
          <TabIcon focused={focused} source={icons.profile} />
        ),
      }}
    />
  </Tabs>
);

export default Layout;
