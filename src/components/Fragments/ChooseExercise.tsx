import React, { FC } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { sizes, styles, theme } from "utils/styles";
import { Exercise } from "utils/types";
import ExerciseCard from "../Content/ExerciseCard";
import Button from "../Base/Button";
import { HEIGHT } from "utils/constants";
import { Modalize } from "react-native-modalize";
import { IHandles } from "react-native-modalize/lib/options";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { FlashList } from "@shopify/flash-list";

interface Props {
  exerciseSearch: string;
  changeExerciseQuery: (value: string) => void;
  navigateToExerciseInfo: (exercise: Exercise) => void;
  addExercise: (newExercise: Exercise) => Promise<void>;
  modalizeRef: React.MutableRefObject<IHandles>;
  loading: boolean;
  exercises: Exercise[];
}

const ChooseExercise: FC<Props> = ({
  changeExerciseQuery,
  exerciseSearch,
  navigateToExerciseInfo,
  addExercise,
  modalizeRef,
  loading,
  exercises,
}) => {
  const HeaderComponent = (
    <View style={[{ paddingTop: sizes.SIZE_8, paddingBottom: sizes.SIZE_6 }]}>
      <View style={[styles.rowCenter, { paddingHorizontal: sizes.SIZE_8 }]}>
        <Text style={stylesheet.bottomSheetTitle} numberOfLines={1}>
          Exercises
        </Text>
        <Button
          mode="text"
          onPress={() => modalizeRef.current.close()}
          style={{ marginStart: "auto" }}
        >
          Close
        </Button>
      </View>
      <View
        style={[
          styles.rowCenter,
          { paddingVertical: sizes.SIZE_16, paddingHorizontal: sizes.SIZE_24 },
        ]}
      >
        <View
          style={[
            styles.flex,
            styles.rowCenter,
            stylesheet.bottomSheetSearchBar,
          ]}
        >
          <MaterialCommunityIcons
            name="magnify"
            color={theme.colors.border}
            size={sizes.SIZE_14}
            style={{ marginEnd: sizes.SIZE_8 }}
          />
          <TextInput
            placeholder="Search any exercise..."
            placeholderTextColor={theme.colors.border}
            value={exerciseSearch}
            onChangeText={changeExerciseQuery}
            style={stylesheet.bottomSheetSearchBarInput}
            selectionColor={theme.colors.primary_3}
          />
        </View>
        <Button mode="text" onPress={() => {}} icon="filter">
          Filter
        </Button>
      </View>
    </View>
  );
  const renderItem = ({ item }) => (
    <ExerciseCard
      {...item}
      exerciseData={item}
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
      customRenderer={
        loading ? (
          <View style={[styles.flex, styles.center]}>
            <ActivityIndicator size="large" color={theme.colors.primary} />
          </View>
        ) : (
          <FlashList
            data={exercises.filter((item) =>
              item.name
                .toLocaleLowerCase()
                .includes(exerciseSearch.toLocaleLowerCase())
            )}
            renderItem={renderItem}
            getItemType={(item) => typeof item}
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={false}
            estimatedItemSize={sizes.SIZE_150}
          />
        )
      }
      withHandle={false}
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
    fontSize: sizes.SIZE_24,
    marginTop: sizes.SIZE_12,
    marginStart: sizes.SIZE_12,
  },
  bottomSheetSearchBar: {
    backgroundColor: "#132831",
    marginEnd: sizes.SIZE_16,
    borderRadius: sizes.SIZE_4,
    paddingVertical: sizes.SIZE_6,
    paddingHorizontal: sizes.SIZE_12,
  },
  bottomSheetSearchBarInput: {
    flex: 1,
    textAlignVertical: "center",
    color: theme.colors.text,
    fontSize: sizes.SIZE_12,
  },
});

export default ChooseExercise;
