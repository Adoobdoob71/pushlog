import { FC } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { fontSizes, sizes, styles, theme } from "utils/styles";
import { StyleProperty, TagType } from "utils/types";
import Tag from "../Base/Tag";

interface Props {
  image?: string;
  name: string;
  volume?: { sets: number; reps: number };
  weight?: number;
  tags: TagType[];
  style?: StyleProperty;
}

const ExerciseCard: FC<Props> = ({
  image,
  name,
  volume,
  weight,
  tags,
  style,
}) => {
  return (
    <View style={[styles.rowCenter, style]}>
      <View style={stylesheet.exerciseImageBackground}>
        <Image
          source={{ uri: image }}
          resizeMode="contain"
          style={stylesheet.exerciseImage}
        />
      </View>
      <View style={[styles.column, stylesheet.exerciseTextWrapper]}>
        <Text style={stylesheet.exerciseName}>{name}</Text>
        <Text style={stylesheet.sets}>
          {volume.sets} sets of {volume.reps}
        </Text>
        <Text style={stylesheet.exerciseWeight}>Weight: {weight}kgs</Text>
        <View style={[styles.rowCenter, { marginTop: sizes.SIZE_8 }]}>
          {tags.slice(0, 2).map(({ id, name }) => (
            <Tag
              key={id}
              text={name}
              backgroundColor={theme.colors.background_2}
              onRemove={() => {}}
              style={{ marginEnd: sizes.SIZE_8 }}
            />
          ))}
          {tags.length > 2 && (
            <View style={stylesheet.tagNumberPlusWrapper}>
              <Text style={stylesheet.tagNumberPlus}>
                {"+ " + `${tags.length - 2}`}
              </Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

const stylesheet = StyleSheet.create({
  exerciseImageBackground: {
    backgroundColor: `${theme.colors.card}50`,
    padding: sizes.SIZE_8,
    borderRadius: sizes.SIZE_8,
  },
  exerciseImage: {
    width: sizes.SIZE_80,
    height: sizes.SIZE_80,
  },
  exerciseTextWrapper: {
    marginStart: sizes.SIZE_18,
    alignSelf: "stretch",
  },
  exerciseName: {
    color: theme.colors.primary,
    fontWeight: "bold",
    fontSize: fontSizes.FONT_16,
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
