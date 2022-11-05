import { MutableRefObject, useContext, useEffect, useState } from "react"
import { Exercise, ExerciseSet, Session, WorkoutTemplate } from "utils/types"
import Toast from "react-native-toast-message"
import AsyncStorage from "@react-native-async-storage/async-storage"
import sqliteDB from "context/sqliteDB"
import { WorkoutSession } from "database/schemas"
import { IHandles } from "react-native-modalize/lib/options"
import moment from "moment"

function useWorkoutSession(
  currentExercise: number,
  activeTemplates: WorkoutTemplate[],
  workoutSessionModalRef: MutableRefObject<IHandles>,
  resetActiveTemplates: () => void,
  exercises: Exercise[]
) {
  const [sets, setSets] = useState<ExerciseSet[]>([])
  const [reps, setReps] = useState(0)
  const [weight, setWeight] = useState(0)
  const [note, setNote] = useState("")

  const { connector } = useContext(sqliteDB)

  useEffect(() => {
    AsyncStorage.getItem("sets").then((data) => {
      if (data) setSets(JSON.parse(data))
    })
    AsyncStorage.getItem("note").then((data) => {
      if (data) setNote(JSON.parse(data))
    })
  }, [])

  const updateSets = async (newSets: ExerciseSet[]) =>
    await AsyncStorage.setItem("sets", JSON.stringify(newSets))

  const addSet = () => {
    if (reps === 0) {
      Toast.show({
        type: "error",
        text1: "Uh oh...",
        text2: "You haven't done any reps 😥",
      })
      return
    }

    setSets((currentSets) => {
      const newSets = [
        ...currentSets,
        {
          reps,
          weight,
          note,
          setNumber:
            currentSets.filter(
              (item) => item.exerciseNumber === currentExercise
            ).length + 1,
          exerciseNumber: exercises[currentExercise].exerciseNumber,
          when: new Date(),
        },
      ]
      updateSets(newSets)
      return newSets
    })
    setReps(0)
    setWeight(0)
    setNote("")
  }

  const removeSet = (index: number) => {
    let setsFilter = sets.filter((item) => item.setNumber !== index)
    setsFilter = setsFilter.flatMap((item, index) => {
      item.setNumber = index + 1
      return item
    })
    setSets(setsFilter)
    updateSets(setsFilter)
  }

  const submitSession = async () => {
    try {
      if (sets.length === 0) throw ""
      const newSession: Session = {
        sets: sets,
        templates: activeTemplates,
        when: moment().toDate(),
      }
      const session = connector.manager.create(WorkoutSession, newSession)
      await connector.manager.save(WorkoutSession, session)
      Toast.show({
        type: "success",
        text1: "Amazing!",
        text2: "You've finished your workout!",
      })
      workoutSessionModalRef.current.close()
      await AsyncStorage.multiRemove(["sets", "activeTemplates"])
      setSets([])
      setWeight(0)
      setReps(0)
      setNote("")
      resetActiveTemplates()
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Uh oh...",
        text2: "Something went wrong 😥",
      })
    }
  }

  return {
    sets,
    setSets,
    reps,
    setReps,
    weight,
    setWeight,
    note,
    setNote,
    addSet,
    removeSet,
    submitSession,
  }
}

export { useWorkoutSession }
