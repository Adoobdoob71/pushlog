import { useNavigation } from "@react-navigation/native";
import { Header, ListGroup, ListItem } from "components/index";
import { SafeAreaView, View } from "react-native";
import { styles, theme } from "utils/styles";
import * as NavigationBar from "expo-navigation-bar";

const Settings = () => {
  const navigation = useNavigation();

  const navigateToWorkoutPlan = () =>
    /* @ts-ignore */ navigation.navigate({
      name: "WorkoutPlan",
    });

  NavigationBar.setBackgroundColorAsync(theme.colors.card);

  return (
    <SafeAreaView style={[styles.mainWrapper]}>
      <Header title="Settings" backButton />
      <ListGroup groupTitle="Workouts">
        <ListItem
          icon="restart"
          title="Reconfigure workouts"
          description="Choose what workouts you want to do"
          onPress={navigateToWorkoutPlan}
        />
        <ListItem
          icon="delete"
          title="Clean Slate"
          description="Delete all progress from the app"
        />
        <ListItem
          icon="robot-happy"
          title="Something"
          description="Happy robot!"
        />
      </ListGroup>
    </SafeAreaView>
  );
};

export default Settings;
