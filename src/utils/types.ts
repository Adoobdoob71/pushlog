import { StyleProp, TextStyle, ViewStyle } from "react-native";

type StyleProperty = StyleProp<ViewStyle>;
type TextStyleProperty = StyleProp<TextStyle>;
export { StyleProperty, TextStyleProperty };

// default props to components
interface defaultProps {
  style?: StyleProperty;
}

interface MuscleCategory {
  id: number;
  name: string;
}

interface Exercise {
  id: number;
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

export { defaultProps, WorkoutTemplate, Exercise, MuscleCategory, TagType };
