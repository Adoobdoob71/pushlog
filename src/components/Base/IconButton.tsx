import { StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { StyleProperty } from "utils/types";
import { ComponentProps, FC } from "react";
import { sizes, theme } from "utils/styles";

interface Props {
  name: ComponentProps<typeof MaterialCommunityIcons>["name"];
  size?: number;
  style?: StyleProperty;
  color?: string;
  fab?: boolean;
  onPress?: () => void;
}

const IconButton: FC<Props> = ({ name, style, size, color, onPress, fab }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[style, fab && stylesheet.fab]}
      activeOpacity={0.5}
    >
      <MaterialCommunityIcons
        name={name}
        size={size ? size : sizes.SIZE_24}
        color={color ? color : theme.colors.text}
      />
    </TouchableOpacity>
  );
};

const stylesheet = StyleSheet.create({
  fab: {
    backgroundColor: theme.colors.primary,
    position: "absolute",
    bottom: sizes.SIZE_24,
    end: sizes.SIZE_24,
    padding: sizes.SIZE_10,
    borderRadius: sizes.SIZE_8,
    elevation: sizes.SIZE_4,
    zIndex: 1,
  },
});
export default IconButton;
