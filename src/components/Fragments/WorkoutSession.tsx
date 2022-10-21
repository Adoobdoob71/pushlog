import { FC, MutableRefObject } from "react"
import { Image, StyleSheet, Text, TextInput, View } from "react-native"
import { Modalize } from "react-native-modalize"
import { IHandles } from "react-native-modalize/lib/options"
import { sizes, styles, theme } from "utils/styles"
import { HEIGHT } from "utils/constants"
import { WorkoutTemplate, Exercise } from "utils/types"
import Button from "../Base/Button"
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler"
import IconButton from "../Base/IconButton"

interface Props {
  workoutSessionModalRef: MutableRefObject<IHandles>
  activeTemplates: WorkoutTemplate[]
  currentExercise: number
  changeExercise: (index: number) => void
}

const WorkoutSession: FC<Props> = ({
  workoutSessionModalRef,
  activeTemplates,
  currentExercise,
  changeExercise,
}) => {
  const exercises = activeTemplates.reduce(
    (previous, current) => previous.concat(current.exercises),
    [] as Exercise[]
  )

  const HeaderComponent = (
    <View style={[{ paddingTop: sizes.SIZE_8, paddingBottom: sizes.SIZE_12 }]}>
      <View style={[styles.rowCenter, { paddingHorizontal: sizes.SIZE_8 }]}>
        <Text style={stylesheet.bottomSheetTitle} numberOfLines={1}>
          Workout Session
        </Text>
        <Button
          mode="text"
          onPress={() => workoutSessionModalRef.current?.close()}
          style={{ marginStart: "auto" }}>
          Done
        </Button>
      </View>
    </View>
  )

  const activeExercise = exercises[currentExercise]

  return (
    <Modalize
      ref={workoutSessionModalRef}
      panGestureComponentEnabled
      withHandle={false}
      onBackButtonPress={() => false}
      modalStyle={{ backgroundColor: theme.colors.background }}
      HeaderComponent={HeaderComponent}
      modalHeight={HEIGHT * 0.9}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        style={{ marginTop: sizes.SIZE_8, marginBottom: sizes.SIZE_16 }}
        horizontal>
        <View style={[styles.rowCenter, stylesheet.exercisesList]}>
          {exercises.map((item, index) => (
            <TouchableOpacity onPress={() => changeExercise(index)}>
              <View
                style={[
                  styles.center,
                  stylesheet.exerciseButton,
                  {
                    backgroundColor:
                      currentExercise === index
                        ? theme.colors.primary
                        : `${theme.colors.primary}35`,
                  },
                ]}>
                {item.image ? (
                  <Image
                    source={{ uri: item.image ?? "" }}
                    style={stylesheet.exerciseImage}
                    resizeMode="contain"
                  />
                ) : (
                  <Text
                    style={stylesheet.exerciseName}
                    numberOfLines={2}
                    lineBreakMode="tail">
                    {item.name}
                  </Text>
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      <View style={[styles.flex, stylesheet.contentView]}>
        <Text style={stylesheet.activeExerciseName}>
          {activeExercise?.name}
        </Text>
        <Text style={stylesheet.subtitle}>Sets</Text>
        <AddSet />
        <AddSet />
        <AddSet />
        <AddSet />
        <View style={[styles.center, stylesheet.previousSetsView]}>
          <Text
            style={{
              color: theme.colors.border,
              fontSize: sizes.SIZE_12,
              fontWeight: "bold",
            }}>
            No sets of this exercise have been recorded
          </Text>
        </View>
      </View>
    </Modalize>
  )
}

const AddSet = () => {
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
          1
        </Text>
      </View>
      <View
        style={[
          styles.flex,
          stylesheet.inputBackground,
          { paddingHorizontal: sizes.SIZE_14, paddingVertical: sizes.SIZE_6 },
        ]}>
        <TextInput
          placeholder="Kg"
          placeholderTextColor={theme.colors.border}
          style={stylesheet.textInput}
          keyboardType="numeric"
          selectionColor={theme.colors.primary_3}
        />
      </View>
      <View
        style={[
          styles.flex,
          stylesheet.inputBackground,
          { paddingHorizontal: sizes.SIZE_14, paddingVertical: sizes.SIZE_6 },
        ]}>
        <TextInput
          placeholder="Reps"
          placeholderTextColor={theme.colors.border}
          style={stylesheet.textInput}
          keyboardType="numeric"
          selectionColor={theme.colors.primary_3}
        />
      </View>
      <Button
        mode="text"
        onPress={() => {}}
        style={{ marginEnd: sizes.SIZE_12 }}
        textColor={theme.colors.border}>
        Note
      </Button>

      <IconButton
        style={stylesheet.addButton}
        name="plus"
        size={sizes.SIZE_20}
      />
    </View>
  )
}

const stylesheet = StyleSheet.create({
  bottomSheetTitle: {
    color: theme.colors.primary,
    fontWeight: "bold",
    fontSize: sizes.SIZE_20,
    marginTop: sizes.SIZE_12,
    marginStart: sizes.SIZE_12,
  },
  exercisesList: {
    flex: 1,
    paddingHorizontal: sizes.SIZE_18,
  },
  exerciseImage: {
    width: sizes.SIZE_52,
    height: sizes.SIZE_52,
    marginHorizontal: sizes.SIZE_8,
    marginVertical: sizes.SIZE_2,
  },
  exerciseName: {
    color: theme.colors.text,
    fontSize: sizes.SIZE_12,
    fontWeight: "bold",
    marginHorizontal: sizes.SIZE_8,
    marginVertical: sizes.SIZE_2,
  },
  exerciseButton: {
    width: sizes.SIZE_70,
    height: sizes.SIZE_56,
    borderRadius: sizes.SIZE_12,
    marginEnd: sizes.SIZE_12,
  },
  contentView: {
    paddingHorizontal: sizes.SIZE_18,
  },
  activeExerciseName: {
    color: theme.colors.primary,
    fontSize: sizes.SIZE_22,
    fontWeight: "bold",
  },
  subtitle: {
    color: theme.colors.border,
    fontSize: sizes.SIZE_14,
    fontWeight: "bold",
    marginTop: sizes.SIZE_8,
  },
  inputBackground: {
    backgroundColor: theme.colors.background_2,
    borderRadius: sizes.SIZE_12,
    marginEnd: sizes.SIZE_12,
  },
  textInput: {
    textAlign: "center",
    color: theme.colors.text,
    fontSize: sizes.SIZE_12,
    fontWeight: "bold",
  },
  addButton: {
    backgroundColor: theme.colors.primary,
    padding: sizes.SIZE_3,
    borderRadius: sizes.SIZE_6,
  },
  previousSetsView: {
    backgroundColor: theme.colors.background_2,
    height: sizes.SIZE_130,
    alignSelf: "stretch",
    borderRadius: sizes.SIZE_12,
    marginTop: sizes.SIZE_32,
  },
})

export default WorkoutSession
