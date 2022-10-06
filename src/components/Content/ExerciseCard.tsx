import { useNavigation } from "@react-navigation/native";
import { FC } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { fontSizes, sizes, styles, theme } from "utils/styles";
import {
  StyleProperty,
  TagType,
  MuscleCategory,
  ExerciseSet,
  Exercise,
} from "utils/types";
import Tag from "../Base/Tag";

interface Props {
  id?: string;
  exerciseNumber: number;
  name: string;
  description?: string;
  muscleCategories?: MuscleCategory[];
  image?: string;
  exerciseSets?: Promise<ExerciseSet[]>;
  when?: Date;
  onPress?: () => void;
  onLongPress?: () => void;
  exerciseData: Exercise;
  style?: StyleProperty;
}

const ExerciseCard: FC<Props> = ({
  id,
  exerciseNumber,
  name,
  description,
  muscleCategories,
  image,
  exerciseSets,
  when,
  onPress,
  onLongPress,
  exerciseData,
  style,
}) => {
  const navigation = useNavigation();

  const navigateToExerciseInfo = () =>
    /* @ts-ignore */
    navigation.navigate("ExerciseInfo", {
      exercise: exerciseData,
    });
  return (
    <TouchableOpacity
      onLongPress={onLongPress}
      onPress={onPress ? onPress : navigateToExerciseInfo}
    >
      <View style={[styles.rowCenter, style, stylesheet.exerciseBackground]}>
        <View style={[styles.column, stylesheet.exerciseTextWrapper]}>
          <Text
            style={stylesheet.exerciseName}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {name}
          </Text>
          <View style={[styles.rowCenter, { marginTop: sizes.SIZE_8 }]}>
            {muscleCategories.slice(0, 2).map(({ id, name }) => (
              <Tag
                key={id}
                text={name}
                backgroundColor={theme.colors.background_2}
                style={{ marginEnd: sizes.SIZE_8 }}
              />
            ))}
            {muscleCategories.length > 2 && (
              <View style={stylesheet.tagNumberPlusWrapper}>
                <Text style={stylesheet.tagNumberPlus}>
                  {"+ " + `${muscleCategories.length - 2}`}
                </Text>
              </View>
            )}
          </View>
        </View>
        {image && (
          <View style={stylesheet.exerciseImageBackground}>
            <Image
              source={{ uri: image }}
              resizeMode="contain"
              style={stylesheet.exerciseImage}
            />
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const stylesheet = StyleSheet.create({
  exerciseBackground: {
    backgroundColor: "#132831",
    borderRadius: sizes.SIZE_8,
    paddingVertical: sizes.SIZE_6,
    paddingEnd: sizes.SIZE_10,
  },
  exerciseImageBackground: {
    backgroundColor: `${theme.colors.primary}30`,
    padding: sizes.SIZE_8,
    borderRadius: sizes.SIZE_8,
  },
  exerciseImage: {
    width: sizes.SIZE_70,
    height: sizes.SIZE_70,
  },
  exerciseTextWrapper: {
    flex: 1,
    marginStart: sizes.SIZE_18,
    paddingVertical: sizes.SIZE_6,
  },
  exerciseName: {
    color: theme.colors.primary,
    fontWeight: "bold",
    fontSize: fontSizes.FONT_16,
    marginBottom: sizes.SIZE_4,
  },
  sets: {
    color: theme.colors.text,
    fontWeight: "bold",
    fontSize: fontSizes.FONT_14,
    marginTop: sizes.SIZE_2,
  },
  exerciseWeight: {
    color: theme.colors.border,
    fontWeight: "bold",
    fontSize: fontSizes.FONT_12,
    marginTop: sizes.SIZE_4,
  },
  tagNumberPlusWrapper: {
    backgroundColor: theme.colors.background_2,
    borderRadius: sizes.SIZE_4,
    paddingHorizontal: sizes.SIZE_6,
    paddingVertical: sizes.SIZE_4,
  },
  tagNumberPlus: {
    fontSize: fontSizes.FONT_10,
    color: theme.colors.text,
  },
});
export default ExerciseCard;
