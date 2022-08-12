import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { theme } from "utils/styles";
import StackNavigator from "navigators/StackNavigator";
import * as NavigationBar from "expo-navigation-bar";
import { useFonts } from "expo-font";

export default function App() {
  NavigationBar.setBackgroundColorAsync(theme.colors.background);
  const [loaded] = useFonts({
    orbitronBlack: require("./assets/fonts/Orbitron-Black.ttf"),
    orbitronBold: require("Orbitron-Bold.ttf"),
    orbitronExtraBold: require("Orbitron-ExtraBold.ttf"),
    orbitronMedium: require("Orbitron-Medium.ttf"),
    orbitronRegular: require("Orbitron-Regular.ttf"),
    orbitronSemiBold: require("Orbitron-SemiBold.ttf"),
  });

  return loaded ? (
    <NavigationContainer theme={theme}>
      <StatusBar
        style="light"
        translucent={false}
        backgroundColor={theme.colors.background}
        animated
      />
      <StackNavigator />
    </NavigationContainer>
  ) : null;
}
