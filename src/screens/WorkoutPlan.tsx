import { FC, useContext, useState } from "react";
import { Text, View, StyleSheet, SectionList, Image } from "react-native";
import { fontSizes, sizes, styles, theme } from "utils/styles";
import { Button } from "components/index";
import CheckBox from "expo-checkbox";
import AsyncStorage from "@react-native-async-storage/async-storage";
import workoutRoutine from "context/workoutRoutine";
import { useWorkoutPlan } from "hooks/useWorkoutPlan";

const WorkoutPlan = () => {
  const { routine } = useContext(workoutRoutine);

  const { goBack, submitChanges } = useWorkoutPlan();

  return (
    <View style={[styles.flex, stylesheet.mainWrapper]}>
      <Text style={stylesheet.title} numberOfLines={1}>
        Your workout plan
      </Text>
      <Text style={stylesheet.subtitle} numberOfLines={1}>
        Customize to your liking
      </Text>
      <SectionList
        sections={[
          {
            day: "Sunday",
            exercise: "Chest & Triceps",
            data: [
              {
                name: "Bench Press",
                image:
                  "https://wger.de/media/exercise-images/192/Bench-press-1.png",
                muscles: "Chest, Triceps",
              },
              {
                name: "Bench Press",
                image:
                  "https://wger.de/media/exercise-images/192/Bench-press-1.png",
                muscles: "Chest, Triceps",
              },
              {
                name: "Bench Press",
                image:
                  "https://wger.de/media/exercise-images/192/Bench-press-1.png",
                muscles: "Chest, Triceps",
              },
            ],
          },
          {
            day: "Monday",
            exercise: "Chest & Triceps",
            data: [
              {
                name: "Bench Press",
                image:
                  "https://wger.de/media/exercise-images/192/Bench-press-1.png",
                muscles: "Chest, Triceps",
              },
              {
                name: "Bench Press",
                image:
                  "https://wger.de/media/exercise-images/192/Bench-press-1.png",
                muscles: "Chest, Triceps",
              },
            ],
          },
          {
            day: "Tuesday",
            exercise: "Chest & Triceps",
            data: [
              {
                name: "Bench Press",
                image:
                  "https://wger.de/media/exercise-images/192/Bench-press-1.png",
                muscles: "Chest, Triceps",
              },
              {
                name: "Bench Press",
                image:
                  "https://wger.de/media/exercise-images/192/Bench-press-1.png",
                muscles: "Chest, Triceps",
              },
              {
                name: "Bench Press",
                image:
                  "https://wger.de/media/exercise-images/192/Bench-press-1.png",
                muscles: "Chest, Triceps",
              },
              {
                name: "Bench Press",
                image:
                  "https://wger.de/media/exercise-images/192/Bench-press-1.png",
                muscles: "Chest, Triceps",
              },
            ],
          },
          {
            day: "Wednesday",
            exercise: "Chest & Triceps",
            data: [
              {
                name: "Bench Press",
                image:
                  "https://wger.de/media/exercise-images/192/Bench-press-1.png",
                muscles: "Chest, Triceps",
              },
            ],
          },
          {
            day: "Thursday",
            exercise: "Chest & Triceps",
            data: [
              {
                name: "Bench Press",
                image:
                  "https://wger.de/media/exercise-images/192/Bench-press-1.png",
                muscles: "Chest, Triceps",
              },
            ],
          },
          {
            day: "Friday",
            exercise: "Chest & Triceps",
            data: [
              {
                name: "Bench Press",
                image:
                  "https://wger.de/media/exercise-images/192/Bench-press-1.png",
                muscles: "Chest, Triceps",
              },
            ],
          },
          {
            day: "Saturday",
            exercise: "Chest & Triceps",
            data: [
              {
                name: "Bench Press",
                image:
                  "https://wger.de/media/exercise-images/192/Bench-press-1.png",
                muscles: "Chest, Triceps",
              },
              {
                name: "Bench Press",
                image:
                  "https://wger.de/media/exercise-images/192/Bench-press-1.png",
                muscles: "Chest, Triceps",
              },
              {
                name: "Bench Press",
                image:
                  "https://wger.de/media/exercise-images/192/Bench-press-1.png",
                muscles: "Chest, Triceps",
              },
              {
                name: "Bench Press",
                image:
                  "https://wger.de/media/exercise-images/192/Bench-press-1.png",
                muscles: "Chest, Triceps",
              },
            ],
          },
        ]}
        renderSectionHeader={({ section: { day } }) => (
          <Text style={stylesheet.sectionTitle}>{day}</Text>
        )}
        showsVerticalScrollIndicator={false}
        SectionSeparatorComponent={() => (
          <View style={{ height: sizes.SIZE_16 }}></View>
        )}
        contentContainerStyle={{
          paddingHorizontal: sizes.SIZE_18,
        }}
        style={{
          marginVertical: sizes.SIZE_36,
        }}
        renderItem={({ item }) => <ExerciseCard {...item} />}
      />
      <View style={[styles.rowCenter, stylesheet.buttonView]}>
        {!routine && (
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
    </View>
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
    paddingVertical: sizes.SIZE_100,
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
