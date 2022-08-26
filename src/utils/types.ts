import { StyleProp, TextStyle, ViewStyle } from "react-native";

type StyleProperty = StyleProp<ViewStyle>;
type TextStyleProperty = StyleProp<TextStyle>;
export { StyleProperty, TextStyleProperty };

// default props to components
interface defaultProps {
  style?: StyleProperty;
}
export { defaultProps };
