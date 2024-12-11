import { icons } from "@/constants";
import { Image, StyleSheet, Text, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";

const data = [
  { label: "Mini", value: "mini" },
  { label: "Sedan", value: "sedan" },
  { label: "Hatchback", value: "hatchback" },
  { label: "Auto", value: "auto" },
];

// biome-ignore lint/suspicious/noExplicitAny: PROP DRILLING
const CustomDropdown = ({ onChange }: { onChange: (item:any) => void }) => {
  return (
    <View className="my-2 w-full">
    <Text className="text-base text-white font-JakartaSemiBold mb-3">Vehicle Type</Text>
    <View className="relative py-4 bg-neutral-100 rounded-md border border-neutral-100 focus:border-primary-400">
      <Dropdown
      style={styles.dropdown}
      containerStyle= {styles.containerMenu}
        data={data}
        labelField="label"
        valueField="value"
        placeholder="Select Vehicle Type"
        onChange={onChange}
        activeColor="#149198"
        renderLeftIcon={() => (
          <Image
            source={icons.vehicle}
            alt="vehicle"
            className="h-6 w-6 mx-4"
          />
        )}
      />
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
    dropdown: {
      backgroundColor: '#f5f5f5',
      width: "auto",
      height: "auto"
    },
    containerMenu: {
      backgroundColor: '#f5f5f5',
      height: "auto"
    },
  });

export default CustomDropdown;
