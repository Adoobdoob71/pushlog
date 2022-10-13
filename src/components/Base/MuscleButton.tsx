import { FC } from "react";
import { Text, View, StyleSheet } from "react-native";
import { sizes, theme } from "utils/styles";
import { StyleProperty } from "utils/types";
import { TouchableOpacity } from "react-native-gesture-handler";

interface Props {
  name: string;
  nameEn: string;
  active: boolean;
  onPress: () => void;
  style?: StyleProperty;
}

const MuscleButton: FC<Props> = ({ name, nameEn, active, onPress, style }) => {
  return (
    <View style={[style]}>
      <TouchableOpacity
        activeOpacity={0.5}
        style={[
          stylesheet.wrapper,
          {
            borderColor: active ? theme.colors.primary : "transparent",
          },
        ]}
        onPress={onPress}
      >
        <Text
          style={{
            fontSize: sizes.SIZE_14,
            color: theme.colors.text,
            fontWeight: "bold",
          }}
        >
          {name}
        </Text>
        {nameEn && (
          <Text
            style={{
              fontSize: sizes.SIZE_12,
              color: theme.colors.border,
              fontWeight: "bold",
            }}
          >
            {nameEn}
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const stylesheet = StyleSheet.create({
  wrapper: {
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: `${theme.colors.card}`,
    borderRadius: sizes.SIZE_8,
    paddingHorizontal: sizes.SIZE_10,
    paddingVertical: sizes.SIZE_8,
    borderWidth: sizes.SIZE_2,
  },
});

export default MuscleButton;
