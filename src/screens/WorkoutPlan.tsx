import { FC, useContext, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  SafeAreaView,
  KeyboardAvoidingView,
} from "react-native";
import { fontSizes, sizes, styles, theme } from "utils/styles";
import { Button, TemplateCard } from "components/index";
import CheckBox from "expo-checkbox";
import workoutRoutine from "context/workoutTemplates";
import { useWorkoutPlan } from "hooks/useWorkoutPlan";
import * as NavigationBar from "expo-navigation-bar";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import { STATUSBAR_HEIGHT } from "utils/constants";

const WorkoutPlan = () => {
  const { templates } = useContext(workoutRoutine);

  const { goBack, submitChanges } = useWorkoutPlan();

  NavigationBar.setBackgroundColorAsync(theme.colors.card);

  return (
    <SafeAreaView style={[styles.flex, stylesheet.mainWrapper]}>
      <Text style={stylesheet.title} numberOfLines={1}>
        Your workout templates
      </Text>
      <Text style={stylesheet.subtitle} numberOfLines={1}>
        Customize to your liking
      </Text>
      <View style={stylesheet.searchBar}>
        <KeyboardAvoidingView behavior="position">
          <TextInput
            placeholder="Search any template..."
            placeholderTextColor={theme.colors.border}
            style={stylesheet.searchBarInput}
            selectionColor={theme.colors.primary_3}
          />
        </KeyboardAvoidingView>
      </View>
      <ScrollView
        style={{
          marginVertical: sizes.SIZE_18,
        }}
        showsVerticalScrollIndicator={false}
        stickyHeaderHiddenOnScroll
        stickyHeaderIndices={[0]}
      >
        {/* {templates &&
          Object.values(templates).map((value, index) => (
            <Text key={value.id}>{value.name}</Text>
          ))} */}

        <View style={{ backgroundColor: theme.colors.card }}>
          <Button
            mode="text"
            style={{
              marginStart: "auto",
              marginBottom: sizes.SIZE_8,
              marginHorizontal: sizes.SIZE_20,
            }}
            onPress={() => {}}
          >
            +{"  "}Add Template
          </Button>
        </View>
        <TemplateCard
          style={{
            marginBottom: sizes.SIZE_18,
            marginHorizontal: sizes.SIZE_20,
          }}
        />
        <TemplateCard
          style={{
            marginBottom: sizes.SIZE_18,
            marginHorizontal: sizes.SIZE_20,
          }}
        />
        <TemplateCard
          style={{
            marginBottom: sizes.SIZE_18,
            marginHorizontal: sizes.SIZE_20,
          }}
        />
        <TemplateCard
          style={{
            marginBottom: sizes.SIZE_18,
            marginHorizontal: sizes.SIZE_20,
          }}
        />
        <TemplateCard
          style={{
            marginBottom: sizes.SIZE_18,
            marginHorizontal: sizes.SIZE_20,
          }}
        />
      </ScrollView>
      <View style={[styles.rowCenter, stylesheet.buttonView]}>
        {templates && (
          <Button
            mode="text"
            onPress={goBack}
            style={{ alignSelf: "flex-end" }}
          >
            Cancel
          </Button>
        )}
        <Button
          mode="text"
          onPress={submitChanges}
          style={{ marginStart: "auto" }}
        >
          Done
        </Button>
      </View>
    </SafeAreaView>
  );
};

const stylesheet = StyleSheet.create({
  mainWrapper: {
    paddingTop: STATUSBAR_HEIGHT + sizes.SIZE_60,
    paddingBottom: sizes.SIZE_36,
    backgroundColor: theme.colors.card,
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
  searchBar: {
    backgroundColor: "#132831",
    marginHorizontal: sizes.SIZE_36,
    marginTop: sizes.SIZE_20,
    borderRadius: sizes.SIZE_4,
    paddingVertical: sizes.SIZE_6,
    paddingHorizontal: sizes.SIZE_12,
  },
  searchBarInput: {
    textAlignVertical: "center",
    color: theme.colors.text,
    fontSize: fontSizes.FONT_12,
  },
  buttonView: {
    justifyContent: "space-between",
    marginHorizontal: sizes.SIZE_40,
    marginTop: "auto",
  },
});

export default WorkoutPlan;
