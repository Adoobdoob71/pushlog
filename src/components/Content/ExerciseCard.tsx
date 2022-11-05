import { useNavigation } from "@react-navigation/native"
import { FC, Dispatch, SetStateAction } from "react"
import { Image, StyleSheet, Text, View } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"
import { sizes, styles, theme } from "utils/styles"
import {
  StyleProperty,
  MuscleCategory,
  ExerciseSet,
  Exercise,
} from "utils/types"
import Button from "../Base/Button"
import Tag from "../Base/Tag"

interface Props {
  id?: string
  exerciseNumber: number
  name: string
  description?: string
  muscleCategories?: MuscleCategory[]
  image?: string
  exerciseSets?: Promise<ExerciseSet[]>
  when?: Date
  onPress?: () => void
  onLongPress?: () => void
  exerciseData: Exercise
  sets?: ExerciseSet[]
  style?: StyleProperty
}

const ExerciseCard: FC<Props> = ({
  id,
  exerciseNumber,
  name,
  description,
  muscleCategories,
  image,
  exerciseSets,
  when,
  onPress,
  onLongPress,
  exerciseData,
  sets,
  style,
}) => {
  const navigation = useNavigation()

  const navigateToExerciseInfo = () =>
    /* @ts-ignore */
    navigation.navigate("ExerciseInfo", {
      exercise: exerciseData,
    })
  return (
    <TouchableOpacity
      onLongPress={onLongPress}
      onPress={onPress ? onPress : navigateToExerciseInfo}>
      <View style={[stylesheet.exerciseBackground, style]}>
        <View style={styles.rowCenter}>
          <View style={[styles.column, stylesheet.exerciseTextWrapper]}>
            <Text
              style={stylesheet.exerciseName}
              numberOfLines={1}
              ellipsizeMode="tail">
              {name}
            </Text>
            <View style={[styles.rowCenter, { marginTop: sizes.SIZE_8 }]}>
              {muscleCategories.slice(0, 2).map(({ id, name }) => (
                <Tag
                  key={id}
                  text={name}
                  backgroundColor={
                    sets ? theme.colors.background : theme.colors.background_2
                  }
                  style={{ marginEnd: sizes.SIZE_8 }}
                />
              ))}
              {muscleCategories.length > 2 && (
                <View
                  style={[
                    stylesheet.tagNumberPlusWrapper,
                    { backgroundColor: sets && theme.colors.background },
                  ]}>
                  <Text style={stylesheet.tagNumberPlus}>
                    {"+ " + `${muscleCategories.length - 2}`}
                  </Text>
                </View>
              )}
            </View>
          </View>
          {image && (
            <View
              style={[
                stylesheet.exerciseImageBackground,
                { backgroundColor: sets && "transparent" },
              ]}>
              <Image
                source={{ uri: image }}
                resizeMode="contain"
                style={stylesheet.exerciseImage}
              />
            </View>
          )}
        </View>
        {sets && (
          <View style={styles.flex}>
            {sets.map((item, index) => (
              <Set {...item} setNumber={item.setNumber} />
            ))}
          </View>
        )}
      </View>
    </TouchableOpacity>
  )
}

interface SetProps {
  setNumber: number
  weight: number
  reps: number
}

const Set: FC<SetProps> = ({ reps, setNumber, weight }) => {
  return (
    <View style={[styles.rowCenter, { marginTop: sizes.SIZE_12 }]}>
      <View
        style={[
          stylesheet.inputBackground,
          { paddingHorizontal: sizes.SIZE_14, paddingVertical: sizes.SIZE_10 },
        ]}>
        <Text
          style={{
            color: theme.colors.text,
            fontSize: sizes.SIZE_12,
            fontWeight: "bold",
          }}>
          {setNumber}
        </Text>
      </View>
      <View
        style={[
          styles.flex,
          stylesheet.inputBackground,
          { paddingHorizontal: sizes.SIZE_14, paddingVertical: sizes.SIZE_6 },
        ]}>
        <Text style={stylesheet.textInput}>
          {weight === 0 ? "Body" : weight}
        </Text>
      </View>
      <View
        style={[
          styles.flex,
          stylesheet.inputBackground,
          { paddingHorizontal: sizes.SIZE_14, paddingVertical: sizes.SIZE_6 },
        ]}>
        <Text style={stylesheet.textInput}>{reps}</Text>
      </View>
      <Button
        mode="text"
        onPress={() => {}}
        style={{ marginEnd: sizes.SIZE_12 }}
        textColor={theme.colors.border}>
        Note
      </Button>
    </View>
  )
}

const stylesheet = StyleSheet.create({
  exerciseBackground: {
    backgroundColor: "#132831",
    borderRadius: sizes.SIZE_8,
    paddingVertical: sizes.SIZE_6,
    paddingEnd: sizes.SIZE_10,
  },
  exerciseImageBackground: {
    backgroundColor: `${theme.colors.primary}30`,
    padding: sizes.SIZE_8,
    borderRadius: sizes.SIZE_8,
    marginStart: sizes.SIZE_20,
  },
  exerciseImage: {
    width: sizes.SIZE_70,
    height: sizes.SIZE_70,
  },
  exerciseTextWrapper: {
    flex: 1,
    marginStart: sizes.SIZE_18,
    paddingVertical: sizes.SIZE_6,
  },
  exerciseName: {
    color: theme.colors.primary,
    fontWeight: "bold",
    fontSize: sizes.SIZE_16,
    marginBottom: sizes.SIZE_4,
  },
  sets: {
    color: theme.colors.text,
    fontWeight: "bold",
    fontSize: sizes.SIZE_14,
    marginTop: sizes.SIZE_2,
  },
  exerciseWeight: {
    color: theme.colors.border,
    fontWeight: "bold",
    fontSize: sizes.SIZE_12,
    marginTop: sizes.SIZE_4,
  },
  tagNumberPlusWrapper: {
    backgroundColor: theme.colors.background_2,
    borderRadius: sizes.SIZE_4,
    paddingHorizontal: sizes.SIZE_6,
    paddingVertical: sizes.SIZE_4,
  },
  tagNumberPlus: {
    fontSize: sizes.SIZE_10,
    color: theme.colors.text,
  },
  inputBackground: {
    backgroundColor: theme.colors.background_2,
    borderRadius: sizes.SIZE_12,
    marginEnd: sizes.SIZE_12,
  },
  textInput: {
    textAlign: "center",
    color: theme.colors.border,
    fontSize: sizes.SIZE_12,
    fontWeight: "bold",
  },
})
export default ExerciseCard
