import { useNavigation } from "@react-navigation/native";
import { Header, ListGroup, ListItem } from "components/index";
import { SafeAreaView, View } from "react-native";
import { styles } from "utils/styles";

const Settings = () => {
  const navigation = useNavigation();
  const navigateToConfiguration = () =>
    navigation.navigate({
      name: "Configuration",
    });
  return (
    <SafeAreaView style={[styles.mainWrapper]}>
      <Header title="Settings" backButton />
      <ListGroup groupTitle="Workouts">
        <ListItem
          icon="restart"
          title="Reconfigure workouts"
          description="Choose what workouts you want to do"
          onPress={navigateToConfiguration}
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
