import { FC } from "react"
import { View, Text, StyleSheet, Animated } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"
import { sizes, styles, theme } from "utils/styles"
import { StyleProperty } from "utils/types"
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons"

interface Props {
  text: string
  onRemove?: () => void
  style?: StyleProperty
  backgroundColor?: string
  onPress?: () => void
}

const Tag: FC<Props> = ({
  text,
  onRemove,
  onPress,
  style,
  backgroundColor,
}) => {
  return (
    <Animated.View style={style}>
      <TouchableOpacity
        onPress={onRemove ? onRemove : onPress}
        activeOpacity={0.5}
        style={[
          styles.rowCenter,
          stylesheet.tag,
          {
            backgroundColor: backgroundColor
              ? backgroundColor
              : theme.colors.background,
          },
        ]}>
        <Text
          style={[
            stylesheet.tagText,
            { marginEnd: onRemove ? sizes.SIZE_5 : sizes.SIZE_10 },
          ]}>
          {text}
        </Text>
        {onRemove && (
          <MaterialCommunityIcons
            name="close"
            color={theme.colors.text}
            style={{ marginEnd: sizes.SIZE_5 }}
            size={sizes.SIZE_8}
          />
        )}
      </TouchableOpacity>
    </Animated.View>
  )
}

const stylesheet = StyleSheet.create({
  tag: {
    borderRadius: sizes.SIZE_4,
    paddingStart: sizes.SIZE_10,
    paddingVertical: sizes.SIZE_4,
  },
  tagText: {
    fontSize: sizes.SIZE_10,
    color: theme.colors.text,
  },
})

export default Tag
