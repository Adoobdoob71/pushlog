import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { fontSizes, sizes, theme } from "utils/styles";
import StackNavigator from "navigators/StackNavigator";
import { useApp } from "hooks/useApp";
import WorkoutRoutine from "context/workoutTemplates";
import Toast, { BaseToast } from "react-native-toast-message";

export default function App() {
  const { templates, addTemplate, modifyTemplate, removeTemplate, loaded } =
    useApp();

  return loaded ? (
    <>
      <WorkoutRoutine.Provider
        value={{ templates, addTemplate, modifyTemplate, removeTemplate }}
      >
        <NavigationContainer theme={theme}>
          <StatusBar style="light" translucent={true} animated />
          <StackNavigator />
        </NavigationContainer>
      </WorkoutRoutine.Provider>
      <Toast
        config={{
          success: (props) => (
            <BaseToast
              {...props}
              style={{
                borderLeftColor: "#85FF85",
                borderLeftWidth: sizes.SIZE_8,
                borderRadius: sizes.SIZE_8,
                backgroundColor: "transparent",
              }}
              text1Style={{
                color: theme.colors.text,
                fontSize: fontSizes.FONT_14,
              }}
              text2Style={{
                color: theme.colors.text,
                fontSize: fontSizes.FONT_12,
              }}
              contentContainerStyle={{
                backgroundColor: theme.colors.card,
                borderTopRightRadius: sizes.SIZE_8,
                borderBottomRightRadius: sizes.SIZE_8,
              }}
            />
          ),
          error: (props) => (
            <BaseToast
              {...props}
              style={{
                borderLeftColor: "#FF8585",
                borderLeftWidth: sizes.SIZE_8,
                borderRadius: sizes.SIZE_8,
                backgroundColor: "transparent",
              }}
              text1Style={{
                color: theme.colors.text,
                fontSize: fontSizes.FONT_14,
              }}
              text2Style={{
                color: theme.colors.text,
                fontSize: fontSizes.FONT_12,
              }}
              contentContainerStyle={{
                backgroundColor: theme.colors.card,
                borderTopRightRadius: sizes.SIZE_8,
                borderBottomRightRadius: sizes.SIZE_8,
              }}
            />
          ),
        }}
      />
    </>
  ) : null;
}
