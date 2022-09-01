import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { fontSizes, sizes, styles, theme } from "utils/styles";
import { useHome } from "hooks/useHome";
import { Agenda } from "react-native-calendars";
import { Header, IconButton, ListGroup } from "components/index";
import { useNavigation } from "@react-navigation/native";
import { FC, useState } from "react";
import Checkbox from "expo-checkbox";

const Home = () => {
  const { currentDay, chosenDay, updateChosenDay } = useHome();

  const agendaTheme = {
    calendarBackground: theme.colors.background,
    todayTextColor: theme.colors.primary,
    textSectionTitleColor: theme.colors.primary,
    monthTextColor: theme.colors.border,
    dayTextColor: theme.colors.border,
    textDisabledColor: theme.colors.card,
    agendaKnobColor: theme.colors.primary,
    indicatorColor: theme.colors.primary,
    selectedDayBackgroundColor: theme.colors.primary_2,
    dotColor: theme.colors.primary,
  };

  const navigation = useNavigation();

  // @ts-ignore
  const goToSettings = () => navigation.navigate({ name: "Settings" });

  return (
    <SafeAreaView style={[styles.mainWrapper]}>
      <Header
        left={<Text style={stylesheet.headerTitle}>PUSHLOG</Text>}
        right={
          <View style={styles.rowCenter}>
            <IconButton
              name="chart-timeline-variant-shimmer"
              style={{ marginStart: "auto" }}
            />
            <IconButton
              name="cog"
              style={{ marginStart: sizes.SIZE_16 }}
              onPress={goToSettings}
            />
          </View>
        }
      />
      <Agenda
        theme={agendaTheme}
        pastScrollRange={18}
        futureScrollRange={18}
        showClosingKnob
        renderEmptyData={() => (
          <ScrollView style={[styles.flex, stylesheet.dayWrapper]}>
            <ListGroup groupTitle="Chest">
              <ExerciseCard
                name="Bench Press"
                image="https://wger.de/media/exercise-images/192/Bench-press-1.png"
                muscles="Chest, Triceps"
              />
              <ExerciseCard
                name="Incline Dumbell Press"
                image="https://wger.de/media/exercise-images/192/Bench-press-1.png"
                muscles="Chest, Triceps"
              />
            </ListGroup>
            <ListGroup groupTitle="Triceps">
              <ExerciseCard
                name="Skull Crushers"
                image="https://wger.de/media/exercise-images/192/Bench-press-1.png"
                muscles="Triceps"
              />
            </ListGroup>
          </ScrollView>
        )}
        onDayPress={updateChosenDay}
      />
    </SafeAreaView>
  );
};

const ExerciseCard: FC<{ image: string; name: string; muscles: string }> = ({
  image,
  name,
  muscles,
}) => {
  const [aspectRatio, setAspectRatio] = useState(0);

  Image.getSize(image, (width, height) => {
    setAspectRatio(width / height);
  });

  return (
    <TouchableOpacity style={[styles.rowCenter, stylesheet.workoutCard]}>
      <Image
        source={{ uri: image }}
        style={{
          aspectRatio: aspectRatio,
          width: sizes.SIZE_60,
          marginEnd: sizes.SIZE_8,
        }}
      />
      <View style={[styles.column, { flex: 1 }]}>
        <Text style={stylesheet.exerciseName}>{name}</Text>
        <Text style={stylesheet.exerciseMuscles}>{muscles}</Text>
      </View>
      <Checkbox value={Math.random() > 0.5} color={theme.colors.primary} />
    </TouchableOpacity>
  );
};

const stylesheet = StyleSheet.create({
  sectionTitle: {
    color: theme.colors.primary,
    fontSize: fontSizes.FONT_14,
    fontWeight: "bold",
  },
  headerTitle: {
    color: theme.colors.text,
    fontSize: fontSizes.FONT_24,
    fontFamily: "orbitronBold",
  },
  dayWrapper: {
    backgroundColor: theme.colors.card,
    padding: sizes.SIZE_6,
  },
  workoutCard: {
    padding: sizes.SIZE_12,
    borderRadius: sizes.SIZE_6,
    justifyContent: "space-between",
    elevation: 4,
    marginVertical: sizes.SIZE_6,
    backgroundColor: "#324f5b",
  },
  exerciseName: {
    fontSize: fontSizes.FONT_14,
    color: theme.colors.text,
    fontWeight: "bold",
  },
  exerciseMuscles: {
    fontSize: fontSizes.FONT_12,
    color: theme.colors.border,
    fontWeight: "bold",
  },
});

export default Home;
