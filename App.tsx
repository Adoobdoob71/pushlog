import "react-native-get-random-values";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { fontSizes, sizes, theme } from "utils/styles";
import StackNavigator from "navigators/StackNavigator";
import { useApp } from "hooks/useApp";
import WorkoutRoutine from "context/workoutTemplates";
import Toast, { BaseToast } from "react-native-toast-message";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import SqliteDB from "context/sqliteDB";

export default function App() {
  const {
    templates,
    addTemplate,
    modifyTemplate,
    removeTemplate,
    loaded,
    dbConnector,
  } = useApp();

  return loaded ? (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SqliteDB.Provider value={{ connector: dbConnector }}>
        <WorkoutRoutine.Provider
          value={{ templates, addTemplate, modifyTemplate, removeTemplate }}
        >
          <NavigationContainer theme={theme}>
            <StatusBar style="light" translucent={true} animated />
            <StackNavigator />
          </NavigationContainer>
        </WorkoutRoutine.Provider>
      </SqliteDB.Provider>
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
                elevation: sizes.SIZE_4,
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
                backgroundColor: theme.colors.background_2,
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
                elevation: sizes.SIZE_4,
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
                backgroundColor: theme.colors.background_2,
                borderTopRightRadius: sizes.SIZE_8,
                borderBottomRightRadius: sizes.SIZE_8,
              }}
            />
          ),
        }}
      />
    </GestureHandlerRootView>
  ) : null;
}
