import React, { FC } from "react";
import { View, StyleSheet, Text } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetTextInput,
} from "@gorhom/bottom-sheet";
import { sizes, styles, theme } from "utils/styles";
import { Exercise } from "utils/types";
import ExerciseCard from "../Content/ExerciseCard";
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { HEIGHT } from "utils/constants";

interface Props {
  exerciseSearch: string;
  changeExerciseQuery: (value: string) => void;
  exercisesQueryData: Exercise[];
  navigateToExerciseInfo: (exercise: Exercise) => void;
  addExercise: (newExercise: Exercise) => Promise<void>;
  bottomSheetRef: React.MutableRefObject<BottomSheetMethods>;
  snapPoints: string[];
}

const ChooseExercise: FC<Props> = ({
  changeExerciseQuery,
  exerciseSearch,
  exercisesQueryData,
  navigateToExerciseInfo,
  addExercise,
  bottomSheetRef,
  snapPoints,
}) => {
  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={-1}
      keyboardBehavior="extend"
      enablePanDownToClose={true}
      snapPoints={snapPoints}
      backdropComponent={(props) => (
        <BottomSheetBackdrop
          {...props}
          appearsOnIndex={0}
          disappearsOnIndex={-1}
          opacity={0.65}
        />
      )}
      handleIndicatorStyle={{ backgroundColor: theme.colors.primary }}
      backgroundStyle={{
        backgroundColor: theme.colors.background,
      }}
    >
      <View style={[styles.flex, { paddingVertical: sizes.SIZE_12 }]}>
        <Text style={stylesheet.bottomSheetTitle} numberOfLines={1}>
          Add exercises to your workout
        </Text>
        <View style={stylesheet.bottomSheetSearchBar}>
          <BottomSheetTextInput
            placeholder="Search any exercise..."
            placeholderTextColor={theme.colors.border}
            value={exerciseSearch}
            onChangeText={changeExerciseQuery}
            style={stylesheet.bottomSheetSearchBarInput}
            selectionColor={theme.colors.primary_3}
          />
        </View>
        <FlatList
          data={exercisesQueryData}
          showsVerticalScrollIndicator={false}
          nestedScrollEnabled
          renderItem={({ item, index }) => (
            <ExerciseCard
              {...item}
              exerciseData={item}
              key={index}
              onPress={() => addExercise(item)}
              onLongPress={() => navigateToExerciseInfo(item)}
              style={{
                marginBottom: sizes.SIZE_24,
                marginHorizontal: sizes.SIZE_18,
              }}
            />
          )}
          ListFooterComponent={() => (
            <View style={{ height: HEIGHT * 0.35 }}></View>
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
    </BottomSheet>
  );
};

const stylesheet = StyleSheet.create({
  bottomSheetTitle: {
    color: theme.colors.primary,
    fontWeight: "bold",
    fontSize: sizes.SIZE_20,
    alignSelf: "center",
  },
  bottomSheetSearchBar: {
    backgroundColor: "#132831",
    marginHorizontal: sizes.SIZE_36,
    marginTop: sizes.SIZE_20,
    borderRadius: sizes.SIZE_4,
    paddingVertical: sizes.SIZE_6,
    paddingHorizontal: sizes.SIZE_12,
    marginBottom: sizes.SIZE_10,
  },
  bottomSheetSearchBarInput: {
    textAlignVertical: "center",
    color: theme.colors.text,
    fontSize: sizes.SIZE_12,
  },
});

export default ChooseExercise;
