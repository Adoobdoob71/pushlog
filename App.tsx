import { StatusBar } from 'expo-status-bar';
import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { theme, styles } from "utils/styles"

export default function App() {
  return (
    <NavigationContainer theme={theme}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <StatusBar style="dark" translucent={false} backgroundColor={theme.colors.background} animated/>
    </NavigationContainer>
  );
}
