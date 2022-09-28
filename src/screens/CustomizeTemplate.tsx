import React, { FC } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { Button, ExerciseCard, Tag } from "components/index";
import { fontSizes, sizes, styles, theme } from "utils/styles";
import { FlatList, ScrollView, TextInput } from "react-native-gesture-handler";
import { STATUSBAR_HEIGHT } from "utils/constants";
import { useCustomizeTemplate } from "hooks/useCustomizeTemplate";

const CustomizeTemplate: FC = () => {
  const { tags, workout, templates, currentTemplate, goBack } =
    useCustomizeTemplate();

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
              value={currentTemplate.name}
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
              placeholderTextColor={theme.colors.border}
              style={styles.textInput}
              selectionColor={theme.colors.primary_3}
            />
          </View>
        </View>
      </View>
      <FlatList
        data={workout.exercises}
        contentContainerStyle={{ padding: sizes.SIZE_6 }}
        ListHeaderComponent={() => (
          <ScrollView style={stylesheet.tagList} horizontal>
            {tags.map((item, index) => (
              <Tag
                text={item.name}
                backgroundColor={theme.colors.background_2}
                key={index}
                style={{ marginEnd: sizes.SIZE_8 }}
              />
            ))}
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
            onPress={() => {}}
          >
            Add Exercise
          </Button>
        )}
      />
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
        <Button mode="text" onPress={() => {}} style={{ marginStart: "auto" }}>
          Done
        </Button>
      </View>
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
});
