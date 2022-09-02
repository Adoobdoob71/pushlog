import { FC, useContext, useState } from "react";
import { Text, View, StyleSheet, Image, SafeAreaView } from "react-native";
import { fontSizes, sizes, styles, theme } from "utils/styles";
import { Button } from "components/index";
import CheckBox from "expo-checkbox";
import workoutRoutine from "context/workoutTemplates";
import { useWorkoutPlan } from "hooks/useWorkoutPlan";
import * as NavigationBar from "expo-navigation-bar";
import { ScrollView } from "react-native-gesture-handler";
import { STATUSBAR_HEIGHT } from "utils/constants";

const WorkoutPlan = () => {
  const { templates } = useContext(workoutRoutine);

  const { goBack, submitChanges } = useWorkoutPlan();

  NavigationBar.setBackgroundColorAsync(theme.colors.card);

  return (
    <SafeAreaView style={[styles.flex, stylesheet.mainWrapper]}>
      <Text style={stylesheet.title} numberOfLines={1}>
        Your workout plan
      </Text>
      <Text style={stylesheet.subtitle} numberOfLines={1}>
        Customize to your liking
      </Text>
      <ScrollView style={{ marginVertical: sizes.SIZE_36 }}>
        {templates &&
          Object.values(templates).map((value, index) => (
            <Text key={value.id}>{value.name}</Text>
          ))}
        <Button mode="filled" onPress={() => {}}>
          Add Template
        </Button>
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

const ExerciseCard: FC<{ image: string; name: string; muscles: string }> = ({
  image,
  name,
  muscles,
}) => {
  const [aspectRatio, setAspectRatio] = useState(0);

  Image.getSize(image, (width, height) => {
    setAspectRatio(width / height);
  });

  return (
    <View style={[styles.rowCenter, stylesheet.workoutCard]}>
      <Image
        source={{ uri: image }}
        style={{
          aspectRatio: aspectRatio,
          width: sizes.SIZE_60,
          marginEnd: sizes.SIZE_8,
        }}
      />
      <View style={[styles.column, { flex: 1 }]}>
        <Text style={stylesheet.exerciseName}>{name}</Text>
        <Text style={stylesheet.exerciseMuscles}>{muscles}</Text>
      </View>
      <CheckBox value={Math.random() > 0.5} color={theme.colors.primary} />
    </View>
  );
};

const stylesheet = StyleSheet.create({
  mainWrapper: {
    paddingTop: STATUSBAR_HEIGHT + sizes.SIZE_60,
    paddingBottom: sizes.SIZE_60,
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
  buttonView: {
    justifyContent: "space-between",
    marginHorizontal: sizes.SIZE_40,
    marginTop: "auto",
  },
  sectionTitle: {
    color: theme.colors.primary,
    fontSize: fontSizes.FONT_14,
    fontWeight: "bold",
  },
  workoutCard: {
    padding: sizes.SIZE_12,
    borderRadius: sizes.SIZE_6,
    justifyContent: "space-between",
    elevation: 4,
    marginVertical: sizes.SIZE_6,
    backgroundColor: "#324f5b",
  },
  exerciseName: {
    fontSize: fontSizes.FONT_14,
    color: theme.colors.text,
    fontWeight: "bold",
  },
  exerciseMuscles: {
    fontSize: fontSizes.FONT_12,
    color: theme.colors.border,
    fontWeight: "bold",
  },
});

export default WorkoutPlan;
