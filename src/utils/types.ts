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

export { WorkoutTemplate, Exercise, MuscleCategory, TagType };

// navigation types
type RootStackParamList = {
  Home: undefined;
  Settings: undefined;
  WorkoutPlan: undefined;
  CustomizeTemplate: { template?: WorkoutTemplate };
};

export { RootStackParamList };
