import { Header } from "components/index";
import { useExerciseInfo } from "hooks/useExerciseInfo";
import React, { FC } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { fontSizes, sizes, styles, theme } from "utils/styles";
import RenderHTML, { MixedStyleDeclaration } from "react-native-render-html";
import { WIDTH } from "utils/constants";
import { ScrollView } from "react-native-gesture-handler";
import {
  VictoryChart,
  VictoryLine,
  VictoryTheme,
  VictoryTooltip,
} from "victory-native";

const ExerciseInfo: FC = () => {
  const { currentExercise, exerciseSets, readExerciseSets } = useExerciseInfo();

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
        </View>
        <View style={stylesheet.graphs}>
          <View style={{ alignSelf: "center" }}>
            <VictoryLine
              style={{
                data: { stroke: theme.colors.primary },
              }}
              interpolation="natural"
              animate
              data={[
                { x: 1, y: 2 },
                { x: 2, y: 3 },
                { x: 3, y: 5 },
                { x: 4, y: 4 },
                { x: 5, y: 7 },
              ]}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const stylesheet = StyleSheet.create({
  top: {
    padding: sizes.SIZE_20,
  },
  title: {
    fontSize: fontSizes.FONT_24,
    fontWeight: "bold",
    // fontFamily: "orbitronBold",
    color: theme.colors.primary,
  },
  subtitle: {
    fontSize: fontSizes.FONT_14,
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
    fontSize: fontSizes.FONT_14,
    fontWeight: "bold",
    lineHeight: sizes.SIZE_22,
  },
  ul: {
    listStyleType: "disclosure-closed",
    color: theme.colors.primary,
  },
  li: {
    color: theme.colors.border,
    fontSize: fontSizes.FONT_12,
    fontWeight: "bold",
  },
};

export default ExerciseInfo;
