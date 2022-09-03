import { FC } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { fontSizes, sizes, styles, theme } from "utils/styles";
import { StyleProperty } from "utils/types";
import Tag from "../Base/Tag";
import IconButton from "../Base/IconButton";

interface Props {
  style?: StyleProperty;
}

const TemplateCard: FC<Props> = ({ style }) => {
  return (
    <View style={[stylesheet.templateCard, style]}>
      <View style={[styles.rowCenter, { marginBottom: sizes.SIZE_4 }]}>
        <Text style={stylesheet.templateName}>Getting Pecs</Text>
        <IconButton
          color={theme.colors.notification}
          onPress={() => {}}
          size={sizes.SIZE_18}
          style={{ marginStart: "auto" }}
          name="chevron-right"
        />
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ marginTop: sizes.SIZE_8 }}
        contentContainerStyle={styles.rowCenter}
      >
        <ExerciseCard
          image="https://wger.de/media/exercise-images/195/Push-ups-1.png"
          completed={Math.random() > 0.5}
        />
        <ExerciseCard
          image="https://wger.de/media/exercise-images/88/Narrow-grip-bench-press-1.png"
          completed={Math.random() > 0.5}
        />
        <ExerciseCard
          image="https://wger.de/media/exercise-images/86/Bicep-hammer-curl-1.png"
          completed={Math.random() > 0.5}
        />
        <ExerciseCard
          image="https://wger.de/media/exercise-images/192/Bench-press-1.png"
          completed={Math.random() > 0.5}
        />
        <ExerciseCard
          image="https://wger.de/media/exercise-images/91/Crunches-2.png"
          completed={Math.random() > 0.5}
        />
      </ScrollView>
      <View style={[styles.rowCenter, { marginTop: sizes.SIZE_12 }]}>
        <Tag text="Chest" style={{ marginEnd: sizes.SIZE_8 }} />
        <Tag text="Triceps" style={{ marginEnd: sizes.SIZE_8 }} />
      </View>
    </View>
  );
};

interface ExerciseCardProps {
  image: string;
  completed: boolean;
}

const ExerciseCard: FC<ExerciseCardProps> = ({ image, completed }) => {
  return (
    <View
      style={[
        stylesheet.exerciseImageBackground,
        {
          backgroundColor: completed ? theme.colors.primary : theme.colors.card,
          elevation: completed ? sizes.SIZE_4 : 0,
        },
      ]}
    >
      <Image
        style={stylesheet.exerciseImage}
        source={{
          uri: image,
        }}
        resizeMode="contain"
      />
    </View>
  );
};

const stylesheet = StyleSheet.create({
  templateCard: {
    backgroundColor: theme.colors.background,
    borderRadius: sizes.SIZE_8,
    paddingVertical: sizes.SIZE_12,
    paddingHorizontal: sizes.SIZE_16,
    elevation: sizes.SIZE_4,
  },
  templateName: {
    color: theme.colors.primary,
    fontSize: fontSizes.FONT_14,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: fontSizes.FONT_12,
    color: theme.colors.border,
    fontWeight: "bold",
  },
  exerciseImageBackground: {
    borderRadius: sizes.SIZE_8,
    marginEnd: sizes.SIZE_12,
    padding: sizes.SIZE_3,
  },
  exerciseImage: {
    width: sizes.SIZE_52,
    height: sizes.SIZE_52,
  },
});

export default TemplateCard;
