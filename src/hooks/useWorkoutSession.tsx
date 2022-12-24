import {
  MutableRefObject,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react"
import { Exercise, ExerciseSet, Session, WorkoutTemplate } from "utils/types"
import Toast from "react-native-toast-message"
import sqliteDB from "context/sqliteDB"
import { WorkoutSession, ExerciseSet as Set } from "database/schemas"
import { IHandles } from "react-native-modalize/lib/options"
import moment from "moment"
import { Alert } from "react-native"
import workoutSessions from "context/workoutSessions"
import AnimatedLottieView from "lottie-react-native"

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
  const [exerciseHistory, setExerciseHistory] = useState<WorkoutSession | null>(
    null
  )
  const { connector } = useContext(sqliteDB)
  const { refreshSessions } = useContext(workoutSessions)

  const activeExercise = exercises[currentExercise]

  const confettiRef = useRef<AnimatedLottieView>(null)

  useEffect(() => {
    loadExerciseHistory()
    setWeight(0)
    setReps(0)
  }, [currentExercise])

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
              (item) => item.exerciseNumber === activeExercise.exerciseNumber
            ).length + 1,
          exerciseNumber: activeExercise.exerciseNumber,
          when: new Date(),
        },
      ]
      return newSets
    })
    setReps(0)
    setWeight(0)
    setNote("")
  }

  const loadExerciseHistory = async () => {
    try {
      const result = await connector?.getRepository(WorkoutSession).findOne({
        where: {
          sets: { exerciseNumber: activeExercise.exerciseNumber },
        },
      })
      setExerciseHistory(result)
    } catch (error) {
      console.error(error)
    }
  }
  const removeSet = (index: number) => {
    let setsFilter = sets.filter((item, setNumber) => {
      if (activeExercise?.exerciseNumber !== item.exerciseNumber) return true
      else return item.setNumber !== index
    })
    setsFilter.sort((a, b) => a.when.getTime() - b.when.getTime())
    let count = 1
    setsFilter.map((item) => {
      if (item.exerciseNumber !== activeExercise?.exerciseNumber) return item
      item.setNumber = count
      count++
      return item
    })
    setSets(setsFilter)
  }

  const submitSession = async () => {
    Alert.alert("Are you sure?", "Are you really done?", [
      { text: "Go back", onPress: () => {}, style: "cancel" },
      {
        text: "Yes!",
        onPress: async () => {
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
            setSets([])
            setWeight(0)
            setReps(0)
            setNote("")
            resetActiveTemplates()
            refreshSessions()
            confettiRef.current?.play()
          } catch (error) {
            Toast.show({
              type: "error",
              text1: "Uh oh...",
              text2: "Something went wrong 😥",
            })
          }
        },
      },
    ])
  }

  const quitWorkout = async () => {
    Alert.alert("Are you sure?", "All changes will be lost", [
      { text: "Go back", onPress: () => {}, style: "cancel" },
      {
        text: "Quit",
        onPress: () => {
          workoutSessionModalRef.current.close()
          setNote("")
          setReps(0)
          setWeight(0)
          setSets([])
          resetActiveTemplates()
        },
        style: "default",
      },
    ])
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
    exerciseHistory,
    quitWorkout,
    confettiRef,
  }
}

export { useWorkoutSession }
