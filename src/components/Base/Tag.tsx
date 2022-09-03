import { FC } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { fontSizes, sizes, styles, theme } from "utils/styles";
import { StyleProperty } from "utils/types";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

interface Props {
  text: string;
  onRemove?: () => void;
  style?: StyleProperty;
}

const Tag: FC<Props> = ({ text, onRemove, style }) => {
  return (
    <View style={[style]}>
      <TouchableOpacity
        onPress={onRemove}
        style={[styles.rowCenter, stylesheet.tag]}
      >
        <Text style={stylesheet.tagText}>{text}</Text>
        <MaterialCommunityIcons
          name="close"
          color={theme.colors.text}
          size={sizes.SIZE_8}
        />
      </TouchableOpacity>
    </View>
  );
};

const stylesheet = StyleSheet.create({
  tag: {
    backgroundColor: theme.colors.card,
    borderRadius: sizes.SIZE_4,
    paddingHorizontal: sizes.SIZE_8,
    paddingVertical: sizes.SIZE_4,
  },
  tagText: {
    fontSize: fontSizes.FONT_10,
    color: theme.colors.text,
    marginEnd: sizes.SIZE_4,
  },
});

export default Tag;
