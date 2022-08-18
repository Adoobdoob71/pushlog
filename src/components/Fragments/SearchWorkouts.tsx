import { FC, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { fontSizes, sizes, styles, theme } from "utils/styles";
import MasonryList from "../Content/MasonryList";
import Button from "../Base/Button";
import { useSearchWorkouts } from "hooks/useSearchWorkouts";

interface Props {
  goNext: () => void;
  goBack: () => void;
}

const SearchWorkouts: FC<Props> = ({ goBack, goNext }) => {
  const { activeCard, changeActiveCard } = useSearchWorkouts();

  return (
    <View style={[styles.flex, stylesheet.mainWrapper]}>
      <Text style={stylesheet.title} numberOfLines={1}>
        What are you working on?
      </Text>
      <Text style={stylesheet.subtitle} numberOfLines={1}>
        Choose one
      </Text>
      <MasonryList
        data={[
          {
            workoutTitle: "Full Body",
            workoutImage:
              "https://wger.de/media/exercise-images/192/Bench-press-1.png",
          },
          {
            workoutTitle: "Upper Body",
            workoutImage:
              "https://wger.de/media/exercise-images/195/Push-ups-1.png",
          },
          {
            workoutTitle: "Lower Body",
            workoutImage:
              "https://wger.de/media/exercise-images/192/Bench-press-1.png",
          },
          {
            workoutTitle: "Legs & Abs",
            workoutImage:
              "https://wger.de/media/exercise-images/91/Crunches-1.png",
          },
          {
            workoutTitle: "Back & Chest",
            workoutImage:
              "https://wger.de/media/exercise-images/181/Chin-ups-2.png",
          },
          {
            workoutTitle: "Shoulders",
            workoutImage:
              "https://wger.de/media/exercise-images/129/Standing-biceps-curl-1.png",
          },
        ]}
        style={stylesheet.cardList}
        renderItem={({ index, item }) => (
          <WorkoutCard
            active={index === activeCard}
            workoutImage={item.workoutImage}
            workoutTitle={item.workoutTitle}
            onPress={() => changeActiveCard(index)}
          />
        )}
        numColumns={2}
      />
      <View style={[styles.rowCenter, stylesheet.buttonView]}>
        <Button mode="text" onPress={goBack} style={{ alignSelf: "flex-end" }}>
          Back
        </Button>
        <Button mode="text" onPress={goNext} style={{ alignSelf: "flex-end" }}>
          Next
        </Button>
      </View>
    </View>
  );
};

interface WorkoutCardProps {
  active: boolean;
  onPress: () => void;
  workoutTitle: string;
  workoutImage: string;
}

const WorkoutCard: FC<WorkoutCardProps> = ({
  active,
  onPress,
  workoutImage,
  workoutTitle,
}) => {
  const [aspectRatio, setAspectRatio] = useState(0);

  Image.getSize(workoutImage, (width, height) => {
    setAspectRatio(width / height);
  });

  return (
    <TouchableOpacity
      style={[
        styles.row,
        stylesheet.workoutCard,
        {
          backgroundColor: active ? theme.colors.primary : "#1d2e35",
        },
      ]}
      onPress={onPress}
    >
      <Image
        source={{
          uri: workoutImage,
        }}
        style={{
          aspectRatio: aspectRatio,
          width: sizes.SIZE_44,
          height: undefined,
        }}
      />
      <Text style={stylesheet.cardTitle}>{workoutTitle}</Text>
    </TouchableOpacity>
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
  cardList: {
    marginVertical: sizes.SIZE_36,
    marginHorizontal: sizes.SIZE_12,
  },
  buttonView: {
    justifyContent: "space-between",
    marginHorizontal: sizes.SIZE_40,
  },
  workoutCard: {
    padding: sizes.SIZE_12,
    borderRadius: sizes.SIZE_6,
    justifyContent: "space-between",
    elevation: 4,
    marginVertical: sizes.SIZE_6,
  },
  cardTitle: {
    color: theme.colors.text,
    fontWeight: "bold",
    fontSize: fontSizes.FONT_16,
  },
});

export default SearchWorkouts;
