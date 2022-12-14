import { StyleProp, TextStyle, ViewStyle } from "react-native"

// style types
type StyleProperty = StyleProp<ViewStyle>
type TextStyleProperty = StyleProp<TextStyle>
interface defaultProps {
  style?: StyleProperty
}

export { StyleProperty, TextStyleProperty, defaultProps }

// database types
interface MuscleCategory {
  id?: string
  muscleId: number
  name: string
}

interface Exercise {
  id?: string
  exerciseNumber: number
  name: string
  description?: string
  muscleCategories?: MuscleCategory[]
  image?: string
  when?: Date
}

interface WorkoutTemplate {
  id?: string
  name: string
  description?: string
  muscleCategories: MuscleCategory[]
  exercises: Exercise[]
}

interface TagType {
  id?: string
  muscleId: number
  name: string
}

interface Session {
  id?: string
  templates: WorkoutTemplate[]
  when?: Date
  sets: ExerciseSet[]
}

interface ExerciseSet {
  id?: string
  workoutSessionId?: string
  exerciseNumber: number
  setNumber: number
  reps: number
  weight: number
  note?: string
  when?: Date
}

interface BodyWeight {
  id?: string
  weight: number
  when: Date
}

export {
  WorkoutTemplate,
  Exercise,
  MuscleCategory,
  TagType,
  Session,
  ExerciseSet,
  BodyWeight,
}

// navigation types
type RootStackParamList = {
  Home: undefined
  Settings: undefined
  TemplatesList: undefined
  CustomizeTemplate: { template?: WorkoutTemplate }
  ExerciseInfo: { exercise: Exercise }
}

export { RootStackParamList }
