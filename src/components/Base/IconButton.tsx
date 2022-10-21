import { StyleSheet, TouchableOpacity, View, Text } from "react-native"
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons"
import { StyleProperty } from "utils/types"
import { ComponentProps, FC } from "react"
import { sizes, theme, styles } from "utils/styles"

interface Props {
  name: ComponentProps<typeof MaterialCommunityIcons>["name"]
  size?: number
  style?: StyleProperty
  color?: string
  fab?: boolean
  disabled?: boolean
  text?: string
  onPress?: () => void
}

const IconButton: FC<Props> = ({
  name,
  style,
  size,
  color,
  disabled,
  onPress,
  fab,
  text,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        fab && stylesheet.fab,
        {
          backgroundColor: fab
            ? disabled
              ? theme.colors.border
              : theme.colors.primary
            : "transparent",
        },
        style,
      ]}
      activeOpacity={0.5}
      disabled={disabled}>
      <View style={styles.rowCenter}>
        <MaterialCommunityIcons
          name={name}
          size={size ? size : sizes.SIZE_24}
          color={color ? color : theme.colors.text}
        />
        {text && <Text style={stylesheet.text}>{text}</Text>}
      </View>
    </TouchableOpacity>
  )
}

const stylesheet = StyleSheet.create({
  fab: {
    position: "absolute",
    bottom: sizes.SIZE_24,
    end: sizes.SIZE_24,
    padding: sizes.SIZE_10,
    borderRadius: sizes.SIZE_8,
    elevation: sizes.SIZE_4,
    zIndex: 1,
  },
  text: {
    color: theme.colors.text,
    fontWeight: "bold",
    fontSize: sizes.SIZE_14,
    marginStart: sizes.SIZE_8,
  },
})
export default IconButton
