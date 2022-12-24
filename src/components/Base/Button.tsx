import { ComponentProps, FC, ReactNode } from "react"
import { Text, StyleSheet, View } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"
import { sizes, styles, theme } from "utils/styles"
import { StyleProperty } from "utils/types"
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons"

interface Props {
  mode: "filled" | "text"
  onPress: () => void
  style?: StyleProperty
  disabled?: boolean
  backgroundColor?: string
  textColor?: string
  icon?: ComponentProps<typeof MaterialCommunityIcons>["name"]
  children: ReactNode
}

const Button: FC<Props> = ({
  mode,
  onPress,
  style,
  disabled,
  icon,
  children,
  backgroundColor,
  textColor,
}) => {
  const color = disabled
    ? theme.colors.border
    : textColor
    ? textColor
    : mode === "filled"
    ? "#FFF"
    : theme.colors.primary

  return (
    <View style={[{ alignItems: "center" }, style]}>
      <TouchableOpacity
        style={[
          icon ? styles.rowCenter : styles.center,
          stylesheet.buttonStyle,
          mode === "filled"
            ? disabled
              ? stylesheet.filledModeDisabled
              : stylesheet.filledMode
            : stylesheet.textMode,
          backgroundColor && { backgroundColor: backgroundColor },
        ]}
        disabled={disabled}
        activeOpacity={0.5}
        onPress={onPress}>
        {icon && (
          <MaterialCommunityIcons
            name={icon}
            color={color}
            style={{ marginEnd: sizes.SIZE_8 }}
            size={sizes.SIZE_16}
          />
        )}
        <Text
          style={{
            fontSize: sizes.SIZE_14,
            color: color,
            fontWeight: "bold",
          }}>
          {children}
        </Text>
      </TouchableOpacity>
    </View>
  )
}

const stylesheet = StyleSheet.create({
  buttonStyle: {
    paddingVertical: sizes.SIZE_10,
    paddingHorizontal: sizes.SIZE_12,
    borderRadius: sizes.SIZE_6,
  },
  filledMode: {
    backgroundColor: theme.colors.primary_2,
  },
  textMode: {
    backgroundColor: "transparent",
  },
  filledModeDisabled: {
    backgroundColor: `${theme.colors.border}45`,
  },
})

export default Button
