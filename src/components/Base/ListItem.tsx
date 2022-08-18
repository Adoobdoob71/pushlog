import { ComponentProps, FC } from "react";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { fontSizes, sizes, styles, theme } from "utils/styles";

interface Props {
  icon?: ComponentProps<typeof MaterialCommunityIcons>["name"];
  title: string;
  description: string;
  onPress?: () => void;
}

const ListItem: FC<Props> = ({ icon, title, description, onPress }) => {
  return (
    <TouchableOpacity
      style={[stylesheet.listItem, styles.rowCenter]}
      onPress={onPress}
    >
      <MaterialCommunityIcons
        name={icon}
        size={sizes.SIZE_24}
        color={theme.colors.border}
      />
      <View style={stylesheet.listItemTextView}>
        <Text style={stylesheet.title}>{title}</Text>
        <Text style={stylesheet.description}>{description}</Text>
      </View>
    </TouchableOpacity>
  );
};

const stylesheet = StyleSheet.create({
  listItem: {
    paddingHorizontal: sizes.SIZE_10,
    paddingVertical: sizes.SIZE_16,
  },
  listItemTextView: {
    marginStart: sizes.SIZE_16,
  },
  title: {
    fontSize: fontSizes.FONT_16,
    color: theme.colors.text,
  },
  description: {
    fontSize: fontSizes.FONT_12,
    color: theme.colors.border,
  },
});

export default ListItem;
