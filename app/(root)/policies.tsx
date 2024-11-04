import { View, Text, SectionList } from "react-native";
import { termsAndConditionsData } from "@/constants/termsAndConditionsData";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";

const Policies = () => {
  return (
    <SafeAreaProvider>
      <SafeAreaView className="flex-1" edges={["top"]}>
        <Text className="m-4 text-2xl font-JakartaBold text-primary-600">
          Terms and Policies*
        </Text>
        <SectionList
          stickySectionHeadersEnabled={false}
          sections={termsAndConditionsData.map((section) => ({
            title: section.section,
            data: section.terms,
          }))}
          keyExtractor={(item) => item.title}
          renderItem={({ item, index }) => (
            <View className="py-3 px-5">
              <Text className="text-sm">
                {index + 1}) {item.title}
              </Text>
              <Text className="text-xs">{item.description}</Text>
            </View>
          )}
          renderSectionHeader={({ section }) => (
            <Text className="text-primary-600 py-3 underline px-5 font-JakartaBold text-base">
              {section.title}
            </Text>
          )}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};
export default Policies;
