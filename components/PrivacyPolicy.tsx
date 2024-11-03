import React, { useCallback, useRef } from "react";
import { View, Text, FlatList } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { termsAndConditionsData } from "@/constants/termsAndConditionsData";

const PrivacyPolicy = () => {
  // ref
  const bottomSheetRef = useRef<BottomSheet>(null);

  // renders
  return (
    <GestureHandlerRootView>
      <BottomSheet ref={bottomSheetRef} snapPoints={["40%", "85%"]} index={0}>
        <BottomSheetView>
          <FlatList
            keyExtractor={(item) => item.section}
            data={termsAndConditionsData}
            renderItem={({ item }) => (
              <View>
                <Text>{item.section}</Text>
                <FlatList
                  keyExtractor={(item) => item.title}
                  data={item.terms}
                  renderItem={({ item }) => (
                    <View>
                      <Text>{item.title}</Text>
                      <Text>{item.description}</Text>
                    </View>
                  )}
                />
              </View>
            )}
            ListHeaderComponent={() => (
              <View>
                <Text>Privacy Policy</Text>
              </View>
            )}
          />
        </BottomSheetView>
      </BottomSheet>
    </GestureHandlerRootView>
  );
};
export default PrivacyPolicy