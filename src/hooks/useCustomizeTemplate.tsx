import { useContext, useEffect, useRef, useState } from "react"
import { Exercise, MuscleCategory, WorkoutTemplate } from "utils/types"
import { useNavigation, useRoute } from "@react-navigation/native"
import workoutTemplates from "context/workoutTemplates"
import { getAllExercises, getExerciseInfo, getMuscles } from "api/functions"
import Toast from "react-native-toast-message"
import { Alert } from "react-native"
import { Modalize } from "react-native-modalize"

function useCustomizeTemplate() {
  const navigation = useNavigation()
  const route = useRoute()
  // @ts-ignore
  const currentTemplate: WorkoutTemplate | undefined = route.params.template

  const [workout, setWorkout] = useState<WorkoutTemplate>(
    currentTemplate
      ? currentTemplate
      : { name: "", description: "", exercises: [], muscleCategories: [] }
  )
  const [tags, setTags] = useState<MuscleCategory[]>([])
  const [exercises, setExercises] = useState([])
  const [exerciseSearch, setExerciseSearch] = useState("")
  const [exercisesForRemoval, setExercisesForRemoval] = useState<number[]>([])
  const [muscles, setMuscles] = useState<
    {
      id: number
      name: string
      nameEn: string
      isFront: boolean
      image: string
    }[]
  >([])
  const [activeMuscleFilters, setActiveMuscleFilters] = useState<number[]>([])
  const [loading, setLoading] = useState(true)

  const { templates } = useContext(workoutTemplates)
  const { addTemplate, modifyTemplate } = useContext(workoutTemplates)

  const exerciseModalRef = useRef<Modalize>(null)
  const filterModalRef = useRef<Modalize>(null)

  const goBack = () =>
    Alert.alert("Are you sure?", "All changes will be lost", [
      { text: "Go back", onPress: () => {}, style: "cancel" },
      { text: "delete", onPress: () => navigation.goBack(), style: "default" },
    ])
  const navigateToExerciseInfo = (exercise: Exercise) =>
    /* @ts-ignore */
    navigation.navigate("ExerciseInfo", { exercise: exercise })

  const openExerciseModal = () => {
    exerciseModalRef.current?.open()
  }

  const openFilterModal = () => {
    filterModalRef.current?.open()
  }

  const toggleMuscleFilter = (id: number) =>
    setActiveMuscleFilters((activeFilters) => {
      if (activeFilters.some((item) => item === id))
        return activeFilters.filter((item) => item !== id)
      return [...activeFilters, id]
    })

  useEffect(() => {
    const newTags = workout.exercises.reduce(
      (previousValue, currentValue, _index, _array) => {
        const newTagsArr = currentValue.muscleCategories.filter(
          (val) => !previousValue.some((item) => item.muscleId === val.muscleId)
        )
        const nextValue = previousValue.concat(newTagsArr)
        return nextValue
      },
      [] as MuscleCategory[]
    )
    setTags(newTags)
  }, [workout.exercises])

  const handleName = (name: string) => {
    setWorkout((workout) => {
      return { ...workout, name: name }
    })
  }

  const handleDescription = (description: string) => {
    setWorkout((workout) => {
      return { ...workout, description: description }
    })
  }

  const changeExerciseQuery = (searchQuery: string) =>
    setExerciseSearch(searchQuery)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const data = await getAllExercises()
      const exercisesArr = data.results.flatMap((item) =>
        item.language.id === 2
          ? {
              name: item.name,
              description: item.description,
              exerciseNumber: item.id,
              image: item.images[0]?.image,
              muscleCategories: item.muscles[0]
                ? [
                    {
                      name:
                        item.muscles[0].name_en !== ""
                          ? item.muscles[0].name_en
                          : item.muscles[0].name,
                      muscleId: item.muscles[0].id,
                    },
                    ...item.muscles_secondary.map((mc) => {
                      return {
                        name: mc.name_en !== "" ? mc.name_en : mc.name,
                        muscleId: mc.id,
                      }
                    }),
                  ]
                : [],
            }
          : []
      )
      setExercises(exercisesArr)
      const muscleData = await getMuscles()
      muscleData.results.forEach((item) => {
        setMuscles((musclesArr) => [
          ...musclesArr,
          {
            id: item.id,
            name: item.name,
            nameEn: item.name_en,
            isFront: item.is_front,
            image: item.image_url_main,
          },
        ])
      })
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Uh oh...",
        text2: "Something went wrong 😥",
      })
    }
    setLoading(false)
  }

  const addExercise = async (newExercise: Exercise) => {
    try {
      if (
        workout.exercises.some(
          (ex) => ex.exerciseNumber === newExercise.exerciseNumber
        )
      ) {
        Toast.show({
          type: "error",
          text1: "Uh oh...",
          text2: "Exercise is already in the workout 😥",
        })
        return
      }
      const data = await getExerciseInfo(newExercise.exerciseNumber)
      const exercise: Exercise = {
        name: data.name,
        description: data.description,
        exerciseNumber: data.id,
        image: data.images[0]?.image,
        muscleCategories: data.muscles[0]
          ? [
              {
                name:
                  data.muscles[0].name_en !== ""
                    ? data.muscles[0].name_en
                    : data.muscles[0].name,
                muscleId: data.muscles[0].id,
              },
              ...data.muscles_secondary.map((mc) => {
                return {
                  name: mc.name_en !== "" ? mc.name_en : mc.name,
                  muscleId: mc.id,
                }
              }),
            ]
          : [],
      }
      setWorkout((w) => {
        return { ...w, exercises: [...w.exercises, exercise] }
      })
      Toast.show({
        type: "success",
        text1: "Great!",
        text2: "Added exercise successfully 💪",
      })
    } catch (error) {
      console.error(error)
      Toast.show({
        type: "error",
        text1: "Uh oh...",
        text2: "Something went wrong 😥",
      })
    }
  }

  const addExerciseForRemoval = (exerciseId: number) => {
    setExercisesForRemoval((removalExercises) => [
      ...removalExercises,
      exerciseId,
    ])
  }

  const removeExerciseForRemoval = (exerciseId: number) => {
    setExercisesForRemoval((removalExercises) =>
      removalExercises.filter((ex) => ex !== exerciseId)
    )
  }

  const toggleExerciseForRemoval = (exerciseId: number) => {
    if (exercisesForRemoval.some((ex) => ex === exerciseId))
      removeExerciseForRemoval(exerciseId)
    else addExerciseForRemoval(exerciseId)
  }

  const deleteExercises = async () => {
    try {
      exercisesForRemoval.map((item) =>
        setWorkout((w) => {
          return {
            ...w,
            exercises: w.exercises.filter((ex) => ex.exerciseNumber !== item),
          }
        })
      )
      setExercisesForRemoval([])
      Toast.show({
        type: "success",
        text1: "Great!",
        text2: "Deleted successfully 💪",
      })
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Uh oh...",
        text2: "Something went wrong 😥",
      })
    }
  }

  const submitWorkout = async () => {
    try {
      if (currentTemplate === undefined)
        await addTemplate({ ...workout, muscleCategories: tags })
      else await modifyTemplate({ ...workout, muscleCategories: tags })
      navigation.goBack()
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Uh oh...",
        text2: "Something went wrong 😥",
      })
    }
  }

  return {
    tags,
    workout,
    templates,
    exercises,
    muscles,
    goBack,
    handleName,
    handleDescription,
    exerciseModalRef,
    filterModalRef,
    openExerciseModal,
    openFilterModal,
    exerciseSearch,
    changeExerciseQuery,
    addExercise,
    navigateToExerciseInfo,
    exercisesForRemoval,
    addExerciseForRemoval,
    removeExerciseForRemoval,
    toggleExerciseForRemoval,
    deleteExercises,
    submitWorkout,
    loading,
    activeMuscleFilters,
    toggleMuscleFilter,
  }
}

export { useCustomizeTemplate }
