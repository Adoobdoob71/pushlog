import React, { FC } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { Button, ExerciseCard, Tag } from "components/index";
import { fontSizes, sizes, styles, theme } from "utils/styles";
import { FlatList, ScrollView, TextInput } from "react-native-gesture-handler";
import { STATUSBAR_HEIGHT } from "utils/constants";
import { useCustomizeTemplate } from "hooks/useCustomizeTemplate";

import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetTextInput,
} from "@gorhom/bottom-sheet";

const CustomizeTemplate: FC = () => {
  const {
    tags,
    workout,
    templates,
    goBack,
    handleDescription,
    handleName,
    handlePresentModalPress,
    bottomSheetRef,
    snapPoints,
    exercisesToAdd,
    exercisesQueryData,
    exerciseSearch,
    changeExerciseQuery,
  } = useCustomizeTemplate();
  return (
    <SafeAreaView style={stylesheet.mainWrapper}>
      <Text style={stylesheet.title} numberOfLines={1}>
        Customize your workout
      </Text>
      <Text style={stylesheet.subtitle} numberOfLines={1}>
        What are we hitting?
      </Text>
      <View style={stylesheet.inputsWrapper}>
        <View>
          <Text style={stylesheet.textInputTitle}>Title</Text>
          <View style={styles.textInputWrapper}>
            <TextInput
              placeholder={
                templates[Math.trunc(Math.random() * templates.length - 1)]
                  ?.name
              }
              placeholderTextColor={theme.colors.border}
              style={styles.textInput}
              value={workout.name}
              onChangeText={(value) => handleName(value)}
              selectionColor={theme.colors.primary_3}
            />
          </View>
        </View>
        <View style={{ marginVertical: sizes.SIZE_16 }}>
          <Text style={stylesheet.textInputTitle}>Description</Text>
          <View style={styles.textInputWrapper}>
            <TextInput
              placeholder={
                templates[Math.trunc(Math.random() * templates.length - 1)]
                  ?.description
              }
              value={workout.description}
              placeholderTextColor={theme.colors.border}
              style={styles.textInput}
              onChangeText={(value) => handleDescription(value)}
              selectionColor={theme.colors.primary_3}
            />
          </View>
        </View>
      </View>
      <FlatList
        data={workout.exercises}
        contentContainerStyle={{ paddingVertical: sizes.SIZE_6 }}
        ListHeaderComponent={() => (
          <ScrollView
            style={stylesheet.tagList}
            showsHorizontalScrollIndicator={false}
            horizontal
          >
            {tags.map((item, index) => (
              <Tag
                text={item.name}
                backgroundColor={theme.colors.background_2}
                key={index}
                style={{ marginEnd: sizes.SIZE_8 }}
              />
            ))}
            <View style={{ width: sizes.SIZE_24 }}></View>
          </ScrollView>
        )}
        style={{ marginBottom: sizes.SIZE_12 }}
        stickyHeaderIndices={[0]}
        stickyHeaderHiddenOnScroll
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <ExerciseCard
            {...item}
            key={index}
            style={{
              marginBottom: sizes.SIZE_16,
              paddingHorizontal: sizes.SIZE_20,
            }}
          />
        )}
        ListFooterComponent={() => (
          <Button
            mode="text"
            style={{ marginBottom: sizes.SIZE_12 }}
            icon="plus"
            onPress={handlePresentModalPress}
          >
            Add Exercise
          </Button>
        )}
      />
      <View style={[styles.rowCenter, stylesheet.buttonView]}>
        <Button mode="text" onPress={goBack} style={{ alignSelf: "flex-end" }}>
          Cancel
        </Button>
        <Button mode="text" onPress={() => {}} style={{ marginStart: "auto" }}>
          Done
        </Button>
      </View>
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
        <View style={{ paddingVertical: sizes.SIZE_12 }}>
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
            ListFooterComponent={() => (
              <View style={{ height: sizes.SIZE_100 }}></View>
            )}
            nestedScrollEnabled
            stickyHeaderIndices={[0]}
            stickyHeaderHiddenOnScroll
            renderItem={() => null}
            ListHeaderComponent={() => (
              <View
                style={stylesheet.tagList}
                onStartShouldSetResponder={() => true}
              >
                <ScrollView
                  showsHorizontalScrollIndicator={false}
                  style={{
                    marginTop: sizes.SIZE_10,
                    marginBottom: sizes.SIZE_20,
                  }}
                  horizontal
                >
                  <View style={{ width: sizes.SIZE_16 }}></View>
                  {exercisesToAdd.map((item, _index) => (
                    <Tag
                      text={item.name}
                      backgroundColor={theme.colors.background_2}
                      key={item.id}
                      // onRemove={() => removeExercisesToAdd(item.id)}
                      style={{ marginEnd: sizes.SIZE_8 }}
                    />
                  ))}
                  <View style={{ width: sizes.SIZE_16 }}></View>
                </ScrollView>
              </View>
            )}
            keyExtractor={(item) => item.id}
          />
        </View>
      </BottomSheet>
    </SafeAreaView>
  );
};

export default CustomizeTemplate;

const stylesheet = StyleSheet.create({
  mainWrapper: {
    paddingTop: STATUSBAR_HEIGHT + sizes.SIZE_60,
    paddingBottom: sizes.SIZE_36,
    backgroundColor: theme.colors.background,
    flex: 1,
  },
  title: {
    fontSize: fontSizes.FONT_24,
    fontWeight: "bold",
    color: theme.colors.primary,
    alignSelf: "center",
  },
  subtitle: {
    fontSize: fontSizes.FONT_14,
    color: theme.colors.border,
    fontWeight: "bold",
    marginTop: sizes.SIZE_18,
    alignSelf: "center",
  },
  inputsWrapper: {
    justifyContent: "space-around",
    marginHorizontal: sizes.SIZE_28,
    marginTop: sizes.SIZE_16,
  },
  textInputTitle: {
    fontSize: fontSizes.FONT_10,
    color: theme.colors.primary,
    fontWeight: "bold",
    padding: sizes.SIZE_6,
  },
  tagList: {
    paddingBottom: sizes.SIZE_16,
    paddingHorizontal: sizes.SIZE_20,
    backgroundColor: theme.colors.background,
  },
  buttonView: {
    justifyContent: "space-between",
    marginHorizontal: sizes.SIZE_40,
    marginTop: "auto",
  },
  bottomSheetTitle: {
    color: theme.colors.primary,
    fontWeight: "bold",
    fontSize: fontSizes.FONT_20,
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
    fontSize: fontSizes.FONT_12,
  },
});
