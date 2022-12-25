import { FC, MutableRefObject, Dispatch, SetStateAction } from "react"
import { Image, StyleSheet, Text, TextInput, View } from "react-native"
import { Modalize } from "react-native-modalize"
import { IHandles } from "react-native-modalize/lib/options"
import { sizes, styles, theme } from "utils/styles"
import { HEIGHT } from "utils/constants"
import { WorkoutTemplate, Exercise } from "utils/types"
import Button from "../Base/Button"
import { useWorkoutSession } from "hooks/useWorkoutSession"
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler"
import IconButton from "../Base/IconButton"

interface Props {
  workoutSessionModalRef: MutableRefObject<IHandles>
  activeTemplates: WorkoutTemplate[]
  currentExercise: number
  resetActiveTemplates: () => void
  changeExercise: (index: number) => void
}

const WorkoutSession: FC<Props> = ({
  workoutSessionModalRef,
  activeTemplates,
  currentExercise,
  resetActiveTemplates,
  changeExercise,
}) => {
  const exercises = activeTemplates.reduce(
    (previous, current) => previous.concat(current.exercises),
    [] as Exercise[]
  )

  const {
    sets,
    setSets,
    reps,
    setReps,
    weight,
    setWeight,
    addSet,
    removeSet,
    submitSession,
    exerciseHistory,
    quitWorkout,
  } = useWorkoutSession(
    currentExercise,
    activeTemplates,
    workoutSessionModalRef,
    resetActiveTemplates,
    exercises
  )

  const HeaderComponent = (
    <View style={[{ paddingTop: sizes.SIZE_8, paddingBottom: sizes.SIZE_12 }]}>
      <View style={[styles.rowCenter, { paddingHorizontal: sizes.SIZE_8 }]}>
        <Text style={stylesheet.bottomSheetTitle} numberOfLines={1}>
          Workout Session
        </Text>
        <Button
          mode="text"
          textColor={theme.colors.danger}
          style={{
            marginStart: "auto",
          }}
          onPress={quitWorkout}>
          Quit
        </Button>
        <Button mode="text" onPress={submitSession}>
          Finish
        </Button>
      </View>
    </View>
  )

  const activeExercise = exercises[currentExercise]

  const currentExerciseSets = sets.filter(
    (item) => item.exerciseNumber === activeExercise?.exerciseNumber
  )

  const exerciseHistorySets = exerciseHistory?.sets
    .filter((set) => set.exerciseNumber === activeExercise?.exerciseNumber)
    .sort((a, b) => a.when.getTime() - b.when.getTime())

  return (
    <Modalize
      ref={workoutSessionModalRef}
      panGestureComponentEnabled
      withHandle={false}
      modalStyle={{ backgroundColor: theme.colors.background }}
      HeaderComponent={HeaderComponent}
      modalHeight={HEIGHT * 0.85}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        stickyHeaderIndices={[0]}>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          style={{
            flex: 1,
            marginTop: sizes.SIZE_8,
            marginBottom: sizes.SIZE_16,
          }}
          horizontal>
          <View style={[styles.rowCenter, stylesheet.exercisesList]}>
            {exercises.map((item, index) => (
              <TouchableOpacity
                onPress={() => changeExercise(index)}
                key={index}>
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
          <Text style={[stylesheet.subtitle, { marginTop: sizes.SIZE_8 }]}>
            Sets
          </Text>
          {currentExerciseSets
            .sort((a, b) => a.when?.getTime() - b.when?.getTime())
            .map((item, index) => (
              <Set
                {...item}
                setNumber={index + 1}
                setReps={setReps}
                setWeight={setWeight}
                removeSet={removeSet}
              />
            ))}
          <Set
            reps={reps}
            weight={weight}
            setNumber={currentExerciseSets.length + 1}
            add
            addSet={addSet}
            setReps={setReps}
            setWeight={setWeight}
          />

          <Text
            style={[stylesheet.subtitle, { marginVertical: sizes.SIZE_16 }]}>
            Last Session
          </Text>
          <View style={stylesheet.previousSetsView}>
            {exerciseHistory ? (
              <>
                <View
                  style={[
                    styles.flex,
                    styles.row,
                    {
                      justifyContent: "space-around",
                      marginBottom: sizes.SIZE_2,
                    },
                  ]}>
                  <Text
                    style={[
                      stylesheet.subText,
                      { color: theme.colors.primary },
                    ]}>
                    #
                  </Text>
                  <Text
                    style={[
                      stylesheet.subText,
                      { color: theme.colors.primary },
                    ]}>
                    KG
                  </Text>
                  <Text
                    style={[
                      stylesheet.subText,
                      { color: theme.colors.primary },
                    ]}>
                    Reps
                  </Text>
                </View>
                {exerciseHistorySets.map((item, index) => (
                  <View
                    style={[
                      styles.flex,
                      styles.rowCenter,
                      { justifyContent: "space-around" },
                    ]}
                    key={index}>
                    <Text style={stylesheet.subText}>{index + 1}</Text>
                    <Text style={stylesheet.subText}>
                      {item.weight === 0 ? "Body" : item.weight}
                    </Text>
                    <Text style={stylesheet.subText}>{item.reps}</Text>
                  </View>
                ))}
              </>
            ) : (
              <Text
                style={{
                  color: theme.colors.border,
                  fontSize: sizes.SIZE_12,
                  fontWeight: "bold",
                  height: "100%",
                  width: "100%",
                  textAlign: "center",
                  textAlignVertical: "center",
                }}>
                No sets of this exercise have been recorded
              </Text>
            )}
          </View>
        </View>
      </ScrollView>
    </Modalize>
  )
}

interface SetProps {
  setNumber: number
  weight: number
  reps: number
  add?: boolean
  setReps: Dispatch<SetStateAction<number>>
  setWeight: Dispatch<SetStateAction<number>>
  addSet?: () => void
  removeSet?: (index: number) => void
}

const Set: FC<SetProps> = ({
  reps,
  setNumber,
  weight,
  add,
  setReps,
  setWeight,
  addSet,
  removeSet,
}) => {
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
        ]}
        pointerEvents={add ? "auto" : "none"}>
        <TextInput
          placeholder="KG"
          placeholderTextColor={theme.colors.border}
          style={[
            stylesheet.textInput,
            { color: add ? theme.colors.text : theme.colors.border },
          ]}
          onChangeText={(value) =>
            setWeight(value === "" ? 0 : parseInt(value))
          }
          value={
            add
              ? weight === 0
                ? undefined
                : weight.toString()
              : weight === 0
              ? "Body"
              : weight.toString()
          }
          keyboardType="numeric"
          selectionColor={theme.colors.primary_3}
        />
      </View>
      <View
        style={[
          styles.flex,
          stylesheet.inputBackground,
          { paddingHorizontal: sizes.SIZE_14, paddingVertical: sizes.SIZE_6 },
        ]}
        pointerEvents={add ? "auto" : "none"}>
        <TextInput
          placeholder="Reps"
          placeholderTextColor={theme.colors.border}
          style={[
            stylesheet.textInput,
            { color: add ? theme.colors.text : theme.colors.border },
          ]}
          onChangeText={(value) => setReps(value === "" ? 0 : parseInt(value))}
          value={
            add ? (reps === 0 ? undefined : reps.toString()) : reps.toString()
          }
          keyboardType="numeric"
          selectionColor={theme.colors.primary_3}
        />
      </View>
      <IconButton
        style={[
          stylesheet.addButton,
          { backgroundColor: add ? theme.colors.success : theme.colors.danger },
        ]}
        name={add ? "plus" : "close"}
        onPress={add ? addSet : () => removeSet(setNumber)}
        size={sizes.SIZE_16}
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
  },
  inputBackground: {
    backgroundColor: theme.colors.background_2,
    borderRadius: sizes.SIZE_12,
    marginEnd: sizes.SIZE_12,
  },
  textInput: {
    textAlign: "center",
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
    height: sizes.SIZE_160,
    borderRadius: sizes.SIZE_12,
    paddingVertical: sizes.SIZE_12,
  },
  subText: {
    color: theme.colors.border,
    fontSize: sizes.SIZE_12,
    fontWeight: "bold",
    textAlign: "center",
    width: sizes.SIZE_44,
  },
})

export default WorkoutSession
