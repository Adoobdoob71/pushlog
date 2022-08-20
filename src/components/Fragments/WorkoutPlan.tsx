import { FC } from "react";
import { Text, View, StyleSheet } from "react-native";
import { fontSizes, sizes, styles, theme } from "utils/styles";
import Button from "../Base/Button";

interface Props {
  goNext: () => void;
  goBack: () => void;
}

const WorkoutPlan: FC<Props> = ({ goBack, goNext }) => {
  return (
    <View style={[styles.flex, stylesheet.mainWrapper]}>
      <Text style={stylesheet.title} numberOfLines={1}>
        Your workout plan
      </Text>
      <Text style={stylesheet.subtitle} numberOfLines={1}>
        Customize to your liking
      </Text>
      <View style={[styles.rowCenter, stylesheet.buttonView]}>
        <Button mode="text" onPress={goBack} style={{ alignSelf: "flex-end" }}>
          Back
        </Button>
        <Button mode="text" onPress={goNext} style={{ marginStart: "auto" }}>
          Done
        </Button>
      </View>
    </View>
  );
};

const stylesheet = StyleSheet.create({
  mainWrapper: {
    paddingVertical: sizes.SIZE_100,
  },
  title: {
    fontSize: fontSizes.FONT_24,
    fontWeight: "bold",
    color: theme.colors.primary,
    alignSelf: "center",
  },
  subtitle: {
    fontSize: fontSizes.FONT_14,
    color: theme.colors.border,
    fontWeight: "bold",
    marginTop: sizes.SIZE_18,
    alignSelf: "center",
  },
  buttonView: {
    justifyContent: "space-between",
    marginHorizontal: sizes.SIZE_40,
    marginTop: "auto",
  },
});

export default WorkoutPlan;
