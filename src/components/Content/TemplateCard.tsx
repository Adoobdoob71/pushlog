import { useNavigation } from "@react-navigation/native"
import { FC } from "react"
import { Image, StyleSheet, Text, View } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"
import { sizes, styles, theme } from "utils/styles"
import { Exercise, StyleProperty, TagType, WorkoutTemplate } from "utils/types"
import Tag from "../Base/Tag"

interface Props {
  id?: string
  name: string
  tags: TagType[]
  exercises: Exercise[]
  description?: string
  templateData: WorkoutTemplate
  onPress?: () => void
  onLongPress?: () => void
  style?: StyleProperty
}

const TemplateCard: FC<Props> = ({
  id,
  name,
  tags,
  exercises,
  description,
  templateData,
  onPress,
  onLongPress,
  style,
}) => {
  const navigation = useNavigation()
  const navigateToCustomizeTemplate = () =>
    navigation.navigate({
      // @ts-ignore
      name: "CustomizeTemplate",
      // @ts-ignore
      params: { template: templateData },
    })
  return (
    <TouchableOpacity
      style={[stylesheet.templateCard, style, styles.rowCenter]}
      key={id}
      onPress={onPress ? onPress : navigateToCustomizeTemplate}
      onLongPress={onLongPress}
      activeOpacity={0.7}>
      <View style={{ flex: 1 }}>
        <Text
          style={stylesheet.templateName}
          ellipsizeMode="tail"
          numberOfLines={1}>
          {name}
        </Text>
        <Text
          style={stylesheet.templateDescription}
          ellipsizeMode="tail"
          numberOfLines={1}>
          {description}
        </Text>
        <View style={[styles.rowCenter, { marginTop: sizes.SIZE_12 }]}>
          {tags.slice(0, 2).map((value, index) => (
            <Tag
              text={value.name}
              key={index}
              style={{ marginEnd: sizes.SIZE_8 }}
            />
          ))}
          {tags.length > 2 && (
            <View style={stylesheet.tagNumberPlusWrapper}>
              <Text style={stylesheet.tagNumberPlus}>
                {"+ "}
                {tags.length - 2}
              </Text>
            </View>
          )}
        </View>
      </View>
      {exercises[0].image && (
        <View style={stylesheet.exerciseImageBackground}>
          <Image
            source={{ uri: exercises[0].image }}
            resizeMode="contain"
            style={stylesheet.templateImage}
          />
        </View>
      )}
    </TouchableOpacity>
  )
}

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
    fontSize: sizes.SIZE_14,
    fontWeight: "bold",
    marginBottom: sizes.SIZE_4,
  },
  templateDescription: {
    fontSize: sizes.SIZE_12,
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
    fontSize: sizes.SIZE_10,
    color: theme.colors.text,
    fontWeight: "bold",
  },
  exerciseImageBackground: {
    backgroundColor: theme.colors.primary,
    padding: sizes.SIZE_5,
    borderRadius: sizes.SIZE_8,
    marginStart: sizes.SIZE_12,
  },
  templateImage: {
    width: sizes.SIZE_70,
    height: sizes.SIZE_70,
    flex: 1,
  },
})

export default TemplateCard
