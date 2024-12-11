import { Redirect } from "expo-router";
import { useAuth, useUser } from "@clerk/clerk-expo";

const Home = () => {
  const { isSignedIn } = useAuth();
  const { user } = useUser();
  if (isSignedIn) {
    if (user?.unsafeMetadata.role === "driver") {
      return <Redirect href="/(driver)/(tabs)/home" />;
    }
    return <Redirect href="/(user)/(tabs)/home" />;
  }
  return <Redirect href="/(auth)/welcome" />;
};

export default Home;
