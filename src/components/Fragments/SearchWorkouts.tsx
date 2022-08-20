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
        Choose two
      </Text>
      <MasonryList
        data={[
          {
            id: 1,
            workoutTitle: "Full Body",
            workoutImage:
              "https://wger.de/media/exercise-images/192/Bench-press-1.png",
          },
          {
            id: 2,
            workoutTitle: "Upper Body",
            workoutImage:
              "https://wger.de/media/exercise-images/195/Push-ups-1.png",
          },
          {
            id: 3,
            workoutTitle: "Lower Body",
            workoutImage:
              "https://wger.de/media/exercise-images/192/Bench-press-1.png",
          },
          {
            id: 4,
            workoutTitle: "Legs & Abs",
            workoutImage:
              "https://wger.de/media/exercise-images/192/Bench-press-1.png",
          },
          {
            id: 5,
            workoutTitle: "Back & Chest",
            workoutImage:
              "https://wger.de/media/exercise-images/181/Chin-ups-2.png",
          },
          {
            id: 6,
            workoutTitle: "Shoulders",
            workoutImage:
              "https://wger.de/media/exercise-images/195/Push-ups-1.png",
          },
        ]}
        style={stylesheet.cardList}
        renderItem={({ item }) => (
          <WorkoutCard
            active={item.id === activeCard}
            workoutImage={item.workoutImage}
            workoutTitle={item.workoutTitle}
            onPress={() => changeActiveCard(item.id)}
          />
        )}
        numColumns={2}
      />
      <View style={[styles.rowCenter, stylesheet.buttonView]}>
        <Button mode="text" onPress={goNext} style={{ marginStart: "auto" }}>
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
          width: sizes.SIZE_60,
          marginEnd: sizes.SIZE_8,
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
    fontSize: fontSizes.FONT_12,
  },
});

export default SearchWorkouts;
