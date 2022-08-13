import { Alert, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { fontSizes, sizes, styles, theme } from "utils/styles";
import { useHome } from "hooks/useHome";
import { Agenda } from "react-native-calendars";
import { Header, IconButton } from "components/index";
import { useNavigation } from "@react-navigation/native";

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
  const goToSettings = () => navigation.navigate({ name: "Settings" });

  return (
    <SafeAreaView style={[styles.mainWrapper]}>
      <Header
        left={<Text style={stylesheet.headerTitle}>PUSHLOG</Text>}
        right={
          <IconButton
            name="cog"
            style={{ marginStart: "auto" }}
            onPress={goToSettings}
          />
        }
      />
      <Agenda
        theme={agendaTheme}
        pastScrollRange={18}
        futureScrollRange={18}
        showClosingKnob
        renderEmptyData={() => (
          <View>
            <Text>{chosenDay.dateString}</Text>
          </View>
        )}
        onDayPress={updateChosenDay}
      />
    </SafeAreaView>
  );
};

const stylesheet = StyleSheet.create({
  headerTitle: {
    color: theme.colors.text,
    fontSize: fontSizes.FONT_24,
    fontFamily: "orbitronBold",
  },
});

export default Home;
