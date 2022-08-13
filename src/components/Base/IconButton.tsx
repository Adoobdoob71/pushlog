import { TouchableOpacity } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { StyleProperty } from "utils/types";
import { ComponentProps, FC } from "react";
import { sizes, theme } from "utils/styles";

interface Props {
  name: ComponentProps<typeof MaterialCommunityIcons>["name"];
  size?: number;
  style?: StyleProperty;
  color?: string;
  onPress?: () => void;
}

const IconButton: FC<Props> = ({ name, style, size, color, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={style}>
      <MaterialCommunityIcons
        name={name}
        size={size ? size : sizes.SIZE_24}
        color={color ? color : theme.colors.text}
      />
    </TouchableOpacity>
  );
};

export default IconButton;
