import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  SectionList,
} from "react-native";
import { termsAndConditionsData } from "@/constants/termsAndConditionsData";

const Policies = () => {
  return (
    <SafeAreaView className="flex-1">
      <Text className="px-4 py-3 text-3xl font-JakartaBold text-primary-600">
        Terms and Conditions*
      </Text>
      <SectionList
        sections={termsAndConditionsData.map((section) => ({
          title: section.section,
          data: section.terms,
        }))}
        keyExtractor={(item) => item.title}
        renderSectionHeader={({ section }) => (
          <View className="py-3 bg-white">
            <Text className="text-primary-600 px-5 font-JakartaBold text-2xl">
              {section.title}
            </Text>
          </View>
        )}
        renderItem={({ item, index }) => (
          <View className="bg-white space-y-2 py-3 px-5">
            <Text className="text-base">
              {index + 1}) {item.title}
            </Text>
            <Text className="text-sm">{item.description}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
};
export default Policies;
