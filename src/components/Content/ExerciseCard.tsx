import { FC, useState } from "react"
import { Image, StyleSheet, Text, View } from "react-native"
import { sizes, styles, theme } from "utils/styles"
import {
  StyleProperty,
  MuscleCategory,
  ExerciseSet,
  Exercise,
} from "utils/types"
import IconButton from "../Base/IconButton"
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
  showSetsDefault?: boolean
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
  exerciseData,
  sets,
  showSetsDefault,
  style,
}) => {
  const [showSets, setShowSets] = useState(showSetsDefault)

  return (
    <View>
      <View style={[stylesheet.exerciseBackground, style]}>
        <View style={styles.rowCenter}>
          <View style={[styles.column, stylesheet.exerciseTextWrapper]}>
            <View style={styles.rowCenter}>
              {sets && (
                <IconButton
                  name={showSets ? "chevron-up" : "chevron-down"}
                  color={theme.colors.primary}
                  onPress={() => setShowSets(!showSets)}
                  style={{ marginEnd: sizes.SIZE_12 }}
                  size={sizes.SIZE_18}
                />
              )}
              <Text
                style={stylesheet.exerciseName}
                numberOfLines={2}
                ellipsizeMode="tail">
                {name}
              </Text>
            </View>
            {muscleCategories.length !== 0 && (
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
                      {
                        backgroundColor: sets
                          ? theme.colors.background
                          : theme.colors.background_2,
                      },
                    ]}>
                    <Text style={stylesheet.tagNumberPlus}>
                      {"+ " + `${muscleCategories.length - 2}`}
                    </Text>
                  </View>
                )}
              </View>
            )}
          </View>
          {image && (
            <View style={[stylesheet.exerciseImageBackground]}>
              <Image
                source={{ uri: image }}
                resizeMode="contain"
                style={stylesheet.exerciseImage}
              />
            </View>
          )}
        </View>
        {showSets && sets && (
          <View style={{ padding: sizes.SIZE_12 }}>
            {sets.map((item, index) => (
              <Set {...item} key={item.id} setNumber={index + 1} />
            ))}
          </View>
        )}
      </View>
    </View>
  )
}

interface SetProps {
  setNumber: number
  weight: number
  reps: number
}

const Set: FC<SetProps> = ({ reps, setNumber, weight }) => {
  return (
    <View
      style={[
        styles.rowCenter,
        {
          alignSelf: "center",
          marginTop: sizes.SIZE_8,
        },
      ]}>
      <View
        style={[
          stylesheet.inputBackground,
          {
            paddingHorizontal: sizes.SIZE_12,
            paddingVertical: sizes.SIZE_5,
          },
        ]}>
        <Text
          style={{
            color: theme.colors.border,
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
    </View>
  )
}

const stylesheet = StyleSheet.create({
  exerciseBackground: {
    backgroundColor: "#132831",
    borderRadius: sizes.SIZE_8,
    paddingVertical: sizes.SIZE_6,
  },
  exerciseImageBackground: {
    backgroundColor: theme.colors.primary,
    padding: sizes.SIZE_8,
    borderRadius: sizes.SIZE_8,
    marginStart: sizes.SIZE_20,
    marginEnd: sizes.SIZE_10,
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
    fontWeight: "bold",
  },
  inputBackground: {
    backgroundColor: theme.colors.background,
    borderRadius: sizes.SIZE_12,
    marginEnd: sizes.SIZE_12,
  },
  textInput: {
    textAlign: "center",
    color: theme.colors.border,
    fontSize: sizes.SIZE_12,
    fontWeight: "bold",
  },
  subtitle: {
    color: theme.colors.primary,
    fontWeight: "bold",
    fontSize: sizes.SIZE_10,
  },
})
export default ExerciseCard
