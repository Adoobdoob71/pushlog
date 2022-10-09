import React, { FC } from "react";
import { View, StyleSheet, Text, TextInput } from "react-native";
import { sizes, theme } from "utils/styles";
import { Exercise } from "utils/types";
import ExerciseCard from "../Content/ExerciseCard";
import { HEIGHT } from "utils/constants";
import { Modalize } from "react-native-modalize";
import { IHandles } from "react-native-modalize/lib/options";

interface Props {
  exerciseSearch: string;
  changeExerciseQuery: (value: string) => void;
  exercisesQueryData: Exercise[];
  navigateToExerciseInfo: (exercise: Exercise) => void;
  addExercise: (newExercise: Exercise) => Promise<void>;
  modalizeRef: React.MutableRefObject<IHandles>;
}

const ChooseExercise: FC<Props> = ({
  changeExerciseQuery,
  exerciseSearch,
  exercisesQueryData,
  navigateToExerciseInfo,
  addExercise,
  modalizeRef,
}) => {
  const HeaderComponent = (
    <View style={[{ paddingTop: sizes.SIZE_20, paddingBottom: sizes.SIZE_6 }]}>
      <Text style={stylesheet.bottomSheetTitle} numberOfLines={1}>
        Add exercises to your workout
      </Text>
      <View style={stylesheet.bottomSheetSearchBar}>
        <TextInput
          placeholder="Search any exercise..."
          placeholderTextColor={theme.colors.border}
          value={exerciseSearch}
          onChangeText={changeExerciseQuery}
          style={stylesheet.bottomSheetSearchBarInput}
          selectionColor={theme.colors.primary_3}
        />
      </View>
    </View>
  );
  const renderItem = ({ item, index }) => (
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
  );

  return (
    <Modalize
      ref={modalizeRef}
      flatListProps={{
        data: exercisesQueryData,
        renderItem: renderItem,
        keyExtractor: (item) => item.id,
        showsVerticalScrollIndicator: false,
      }}
      modalHeight={HEIGHT * 0.65}
      modalStyle={{ backgroundColor: theme.colors.background }}
      HeaderComponent={HeaderComponent}
      handleStyle={{ backgroundColor: theme.colors.primary }}
    />
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
