import { FC, ReactNode } from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { fontSizes, sizes, theme } from "utils/styles";
import { StyleProperty } from "utils/types";

interface Props {
  mode: "filled" | "text";
  onPress: () => void;
  style?: StyleProperty;
  disabled?: boolean;
  children: ReactNode;
}

const Button: FC<Props> = ({ mode, onPress, style, disabled, children }) => {
  return (
    <TouchableOpacity
      style={[
        style,
        stylesheet.buttonStyle,
        mode === "filled"
          ? disabled
            ? stylesheet.filledModeDisabled
            : stylesheet.filledMode
          : stylesheet.textMode,
      ]}
      disabled={disabled}
      onPress={onPress}
    >
      <Text
        style={{
          fontSize: fontSizes.FONT_14,
          color: disabled
            ? theme.colors.border
            : mode === "filled"
            ? "#FFF"
            : theme.colors.primary,
          fontWeight: "bold",
        }}
      >
        {children}
      </Text>
    </TouchableOpacity>
  );
};

const stylesheet = StyleSheet.create({
  buttonStyle: {
    paddingVertical: sizes.SIZE_10,
    paddingHorizontal: sizes.SIZE_12,
    borderRadius: sizes.SIZE_6,
  },
  filledMode: {
    backgroundColor: theme.colors.primary_3,
  },
  textMode: {
    backgroundColor: "transparent",
  },
  filledModeDisabled: {
    backgroundColor: theme.colors.card,
  },
});

export default Button;