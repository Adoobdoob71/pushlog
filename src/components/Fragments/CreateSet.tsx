import React, { FC } from "react";
import { View, StyleSheet, Text } from "react-native";
import { sizes, styles, theme } from "utils/styles";
import Button from "../Base/Button";
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { Picker } from "@react-native-picker/picker";

interface Props {
  bottomSheetRef: React.MutableRefObject<BottomSheetMethods>;
  snapPoints: string[];
  reps: number;
  weight: number;
  setNumber: number;
  onSetNumberChange: (value: number) => void;
  onRepsChange: (value: number) => void;
  onWeightChange: (value: number) => void;
  addSet: () => Promise<void>;
}

const CreateSet: FC<Props> = ({
  bottomSheetRef,
  snapPoints,
  onRepsChange,
  onWeightChange,
  onSetNumberChange,
  reps,
  weight,
  setNumber,
  addSet,
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
      containerStyle={{ zIndex: 2 }}
    >
      <View style={stylesheet.mainWrapper}>
        <View
          style={[
            styles.rowCenter,
            {
              justifyContent: "space-between",
              paddingHorizontal: sizes.SIZE_20,
            },
          ]}
        >
          <Text style={stylesheet.bottomSheetTitle}>Add Set</Text>
          <Button
            mode="filled"
            disabled={reps === 0}
            onPress={addSet}
            icon="plus"
          >
            Done
          </Button>
        </View>
        <View style={stylesheet.inputsWrapper}>
          <View style={styles.rowCenter}>
            <View style={styles.flex}>
              <Text style={stylesheet.optionTitle}>Set #</Text>
              <View style={[stylesheet.input]}>
                <Picker
                  selectedValue={setNumber}
                  mode="dropdown"
                  onValueChange={onSetNumberChange}
                  dropdownIconRippleColor={theme.colors.background_2}
                  dropdownIconColor={theme.colors.card}
                >
                  {[...Array(20).keys()].map((value) => (
                    <Picker.Item
                      label={value.toString()}
                      value={value}
                      color={theme.colors.border}
                    />
                  ))}
                </Picker>
              </View>
            </View>
            <View style={{ width: sizes.SIZE_12 }}></View>
            <View style={styles.flex}>
              <Text style={stylesheet.optionTitle}>Reps</Text>
              <View style={[stylesheet.input]}>
                <Picker
                  selectedValue={reps}
                  mode="dropdown"
                  onValueChange={onRepsChange}
                  dropdownIconRippleColor={theme.colors.background_2}
                  dropdownIconColor={theme.colors.card}
                >
                  {[...Array(1000).keys()].map((value) => (
                    <Picker.Item
                      label={value.toString()}
                      value={value}
                      color={theme.colors.border}
                    />
                  ))}
                </Picker>
              </View>
            </View>
            <View style={{ width: sizes.SIZE_12 }}></View>
            <View style={styles.flex}>
              <Text style={stylesheet.optionTitle}>Weight - Kgs</Text>
              <View style={[stylesheet.input]}>
                <Picker
                  selectedValue={weight}
                  mode="dropdown"
                  onValueChange={onWeightChange}
                  dropdownIconRippleColor={theme.colors.background}
                  dropdownIconColor={theme.colors.card}
                >
                  {[...Array(1000).keys()].map((value) => (
                    <Picker.Item
                      label={value.toString()}
                      value={value}
                      color={theme.colors.border}
                    />
                  ))}
                </Picker>
              </View>
            </View>
          </View>
        </View>
      </View>
    </BottomSheet>
  );
};

const stylesheet = StyleSheet.create({
  mainWrapper: {
    flex: 1,
    backgroundColor: theme.colors.background,
    borderRadius: sizes.SIZE_8,
    padding: sizes.SIZE_12,
    justifyContent: "space-around",
  },
  bottomSheetTitle: {
    color: theme.colors.primary,
    fontWeight: "bold",
    fontSize: sizes.SIZE_18,
  },
  input: {
    backgroundColor: "#132831",
    borderRadius: sizes.SIZE_4,
    paddingStart: sizes.SIZE_8,
  },
  inputsWrapper: {
    marginTop: sizes.SIZE_12,
    paddingHorizontal: sizes.SIZE_20,
  },
  optionTitle: {
    color: theme.colors.primary_2,
    fontWeight: "bold",
    fontSize: sizes.SIZE_12,
    alignSelf: "center",
    marginBottom: sizes.SIZE_8,
  },
});

export default CreateSet;
