import { StyleProp, TextStyle, ViewStyle } from "react-native";

type StyleProperty = StyleProp<ViewStyle>;
type TextStyleProperty = StyleProp<TextStyle>;
export { StyleProperty, TextStyleProperty };

// default props to components
interface defaultProps {
  style?: StyleProperty;
}

interface WorkoutRoutine {
  sunday: {
    muscleGroups: number[];
    exercises: number[];
  };
  monday: {
    muscleGroups: number[];
    exercises: number[];
  };
  tuesday: {
    muscleGroups: number[];
    exercises: number[];
  };
  wednesday: {
    muscleGroups: number[];
    exercises: number[];
  };
  thursday: {
    muscleGroups: number[];
    exercises: number[];
  };
  friday: {
    muscleGroups: number[];
    exercises: number[];
  };
  saturday: {
    muscleGroups: number[];
    exercises: number[];
  };
}

export { defaultProps, WorkoutRoutine };
