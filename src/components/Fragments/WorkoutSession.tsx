import { FC, MutableRefObject } from "react"
import { Image, StyleSheet, Text, View } from "react-native"
import { Modalize } from "react-native-modalize"
import { IHandles } from "react-native-modalize/lib/options"
import { sizes, styles, theme } from "utils/styles"
import { HEIGHT } from "utils/constants"
import { WorkoutTemplate, Exercise } from "utils/types"
import Button from "../Base/Button"

interface Props {
  workoutSessionModalRef: MutableRefObject<IHandles>
  activeTemplates: WorkoutTemplate[]
}

const WorkoutSession: FC<Props> = ({
  workoutSessionModalRef,
  activeTemplates,
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

  return (
    <Modalize
      ref={workoutSessionModalRef}
      panGestureComponentEnabled
      withHandle={false}
      onBackButtonPress={() => false}
      modalStyle={{ backgroundColor: theme.colors.background }}
      HeaderComponent={HeaderComponent}
      modalHeight={HEIGHT * 0.85}>
      <View style={stylesheet.exercisesList}>
        {exercises.map((exercise) => (
          <Image
            source={{ uri: exercise.image ?? "" }}
            style={{
              width: sizes.SIZE_90,
              height: sizes.SIZE_90,
            }}
          />
        ))}
      </View>
    </Modalize>
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
  exercisesList: {},
})

export default WorkoutSession
