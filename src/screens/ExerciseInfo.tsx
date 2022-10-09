import { CreateSet, Graph, Header, IconButton, Tag } from "components/index";
import { useExerciseInfo } from "hooks/useExerciseInfo";
import React, { FC } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { sizes, styles, theme } from "utils/styles";
import RenderHTML, { MixedStyleDeclaration } from "react-native-render-html";
import { WIDTH } from "utils/constants";
import { ScrollView } from "react-native-gesture-handler";

const ExerciseInfo: FC = () => {
  const exerciseInfoHook = useExerciseInfo(),
    { currentExercise, handlePresentModalPress, exerciseSets } =
      exerciseInfoHook;

  const sets = [
    ...exerciseSets.map((item) => {
      return {
        x: item.when.getTime(),
        y: item.reps,
        weight: item.weight,
        setNumber: item.setNumber,
      };
    }),
  ];

  return (
    <SafeAreaView style={styles.mainWrapper}>
      <Header title="Exercise data" backButton />
      <ScrollView style={styles.flex}>
        <View style={stylesheet.top}>
          <Text style={stylesheet.title}>{currentExercise.name}</Text>
          <RenderHTML
            source={{ html: currentExercise.description }}
            tagsStyles={htmlStylesheet}
            contentWidth={WIDTH}
          />
          <ScrollView
            showsHorizontalScrollIndicator={false}
            style={{ marginTop: sizes.SIZE_8 }}
            horizontal
          >
            {currentExercise.muscleCategories.map((item, index) => (
              <Tag
                text={item.name}
                backgroundColor={theme.colors.background_2}
                key={index}
                style={{ marginEnd: sizes.SIZE_8 }}
              />
            ))}
            <View style={{ width: sizes.SIZE_24 }}></View>
          </ScrollView>
        </View>
        <View style={stylesheet.graphs}>
          <View style={{ alignSelf: "center" }}>
            <Graph data={sets} />
          </View>
        </View>
        <View style={{ height: sizes.SIZE_52 }}></View>
      </ScrollView>
      <IconButton
        name="pencil"
        color={theme.colors.text}
        onPress={handlePresentModalPress}
        size={sizes.SIZE_24}
        fab
      />
      <CreateSet {...exerciseInfoHook} />
    </SafeAreaView>
  );
};

const stylesheet = StyleSheet.create({
  top: {
    padding: sizes.SIZE_20,
  },
  title: {
    fontSize: sizes.SIZE_24,
    fontWeight: "bold",
    color: theme.colors.primary,
  },
  subtitle: {
    fontSize: sizes.SIZE_14,
    color: theme.colors.border,
    fontWeight: "bold",
    marginTop: sizes.SIZE_18,
  },
  graphs: {
    padding: sizes.SIZE_40,
  },
});

const htmlStylesheet: Readonly<Record<string, MixedStyleDeclaration>> = {
  p: {
    color: theme.colors.border,
    fontSize: sizes.SIZE_14,
    fontWeight: "bold",
    lineHeight: sizes.SIZE_22,
  },
  ul: {
    listStyleType: "disclosure-closed",
    color: theme.colors.primary,
  },
  li: {
    color: theme.colors.border,
    fontSize: sizes.SIZE_12,
    fontWeight: "bold",
  },
};

export default ExerciseInfo;
