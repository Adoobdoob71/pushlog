import { FC } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { fontSizes, sizes, styles, theme } from "utils/styles";
import { Exercise, StyleProperty, TagType } from "utils/types";
import Tag from "../Base/Tag";

interface Props {
  id: string;
  name: string;
  tags: TagType[];
  exercises: Exercise[];
  description?: string;
  style?: StyleProperty;
}

const TemplateCard: FC<Props> = ({
  id,
  name,
  tags,
  exercises,
  description,
  style,
}) => {
  return (
    <TouchableOpacity
      style={[stylesheet.templateCard, style, styles.rowCenter]}
      key={id}
      activeOpacity={0.7}
    >
      <View style={{ flex: 1.5 }}>
        <Text style={stylesheet.templateName}>{name}</Text>
        <Text style={stylesheet.templateDescription} numberOfLines={3}>
          {description}
        </Text>
        <View style={[styles.rowCenter, { marginTop: sizes.SIZE_12 }]}>
          {tags.slice(0, 2).map((value, index) => (
            <Tag
              text={value.name}
              key={index}
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
      <Image
        source={{
          uri: exercises[Math.trunc(Math.random() * (exercises.length - 1))]
            ?.image,
        }}
        style={stylesheet.templateImage}
        resizeMode="contain"
      />
    </TouchableOpacity>
  );
};

const stylesheet = StyleSheet.create({
  templateCard: {
    backgroundColor: theme.colors.card,
    borderRadius: sizes.SIZE_8,
    paddingVertical: sizes.SIZE_12,
    paddingHorizontal: sizes.SIZE_16,
    elevation: sizes.SIZE_4,
  },
  templateName: {
    color: theme.colors.primary,
    fontSize: fontSizes.FONT_14,
    fontWeight: "bold",
    marginBottom: sizes.SIZE_4,
  },
  templateDescription: {
    fontSize: fontSizes.FONT_12,
    color: theme.colors.border,
    fontWeight: "bold",
  },
  tagNumberPlusWrapper: {
    backgroundColor: theme.colors.background,
    borderRadius: sizes.SIZE_4,
    paddingHorizontal: sizes.SIZE_6,
    paddingVertical: sizes.SIZE_4,
  },
  tagNumberPlus: {
    fontSize: fontSizes.FONT_10,
    color: theme.colors.text,
  },
  templateImage: {
    width: sizes.SIZE_100,
    height: sizes.SIZE_100,
    flex: 1,
  },
});

export default TemplateCard;
