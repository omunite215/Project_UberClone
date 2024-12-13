import { useFetch } from "@/lib/fetch";
import React, { useState } from "react";
import { View } from "react-native";
import { Switch } from "react-native-gesture-handler";

const ActiveStatusSwitch = ({ userId }: { userId: string }) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => {
    setIsEnabled((previousState) => !previousState);
    const { data: status, loading } = useFetch(`/(api)/driver/${userId}`, {
      method: "PATCH",
      body: JSON.stringify({
        active_status: !isEnabled,
      }),
    });
  };

  return (
    <View>
      <Switch
        trackColor={{ false: "#2A2A2A", true: "#45DF81" }}
        thumbColor={isEnabled ? "#F3F3F3" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
    </View>
  );
};

export default ActiveStatusSwitch;
