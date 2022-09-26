import { StyleProp, TextStyle, ViewStyle } from "react-native";

// style types
type StyleProperty = StyleProp<ViewStyle>;
type TextStyleProperty = StyleProp<TextStyle>;
interface defaultProps {
  style?: StyleProperty;
}

export { StyleProperty, TextStyleProperty, defaultProps };

// database types
interface MuscleCategory {
  id: string;
  name: string;
}

interface Exercise {
  id: string;
  exerciseNumber: number;
  name: string;
  description?: string;
  muscleCategories?: MuscleCategory[];
  image?: string;
}

interface WorkoutTemplate {
  id: string;
  name: string;
  description?: string;
  muscleCategories: MuscleCategory[];
  exercises: Exercise[];
}

interface TagType {
  id: string;
  name: string;
}

interface ExerciseSet {
  id: string;
  exerciseNumber: number;
  exerciseId: string;
  setNumber: number;
  reps: number;
  weight: number;
}

export { WorkoutTemplate, Exercise, MuscleCategory, TagType, ExerciseSet };

// navigation types
type RootStackParamList = {
  Home: undefined;
  Settings: undefined;
  WorkoutPlan: undefined;
  CustomizeTemplate: { template?: WorkoutTemplate };
  ExerciseInfo: { exercise: Exercise };
};

export { RootStackParamList };
