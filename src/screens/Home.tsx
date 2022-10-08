import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { sizes, styles, theme } from "utils/styles";
import { useHome } from "hooks/useHome";
import { Agenda } from "react-native-calendars";
import {
  ChooseTemplate,
  ExerciseCard,
  Header,
  IconButton,
} from "components/index";
import * as NavigationBar from "expo-navigation-bar";
import { ScrollView } from "react-native-gesture-handler";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";

const Home = () => {
  const homeHook = useHome(),
    { updateChosenDay, handlePresentModalPress, activeTemplates } = homeHook;

  const agendaTheme = {
    calendarBackground: theme.colors.card,
    todayTextColor: theme.colors.primary,
    textSectionTitleColor: theme.colors.primary,
    monthTextColor: theme.colors.border,
    dayTextColor: theme.colors.border,
    textDisabledColor: theme.colors.card,
    agendaKnobColor: theme.colors.primary,
    indicatorColor: theme.colors.primary,
    selectedDayBackgroundColor: theme.colors.primary,
    dotColor: theme.colors.primary,
    textDayFontWeight: "bold",
    textDayHeaderFontWeight: "bold",
    textMonthFontWeight: "bold",
    todayButtonFontWeight: "bold",
  };

  const navigation = useNavigation();

  // @ts-ignore
  const goToSettings = () => navigation.navigate({ name: "Settings" });

  const noTemplates = activeTemplates.length === 0;

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
        // @ts-ignore
        theme={agendaTheme}
        pastScrollRange={18}
        futureScrollRange={18}
        showClosingKnob
        onCalendarToggled={(enabled) =>
          NavigationBar.setBackgroundColorAsync(
            enabled ? theme.colors.card : theme.colors.background
          )
        }
        renderEmptyData={() => (
          <ScrollView
            style={[styles.flex, stylesheet.dayWrapper]}
            contentContainerStyle={noTemplates && { flexGrow: 1 }}
          >
            {activeTemplates.length === 0 ? (
              <View style={[styles.flex, styles.center]}>
                <MaterialCommunityIcons
                  name="sleep"
                  color={theme.colors.border}
                  size={sizes.SIZE_40}
                />
                <Text style={stylesheet.noTemplatesText}>
                  At last, a rest day
                </Text>
              </View>
            ) : (
              activeTemplates.map((template) =>
                template.exercises.map((item) => (
                  <ExerciseCard
                    {...item}
                    exerciseData={item}
                    key={item.id}
                    style={{
                      marginHorizontal: sizes.SIZE_12,
                      marginTop: sizes.SIZE_16,
                    }}
                  />
                ))
              )
            )}
            <View style={{ height: sizes.SIZE_40 }}></View>
          </ScrollView>
        )}
        onDayPress={updateChosenDay}
      />
      <ChooseTemplate {...homeHook} />
      <IconButton
        name="pencil"
        color={theme.colors.text}
        onPress={handlePresentModalPress}
        size={sizes.SIZE_24}
        fab
      />
    </SafeAreaView>
  );
};

const stylesheet = StyleSheet.create({
  sectionTitle: {
    color: theme.colors.primary,
    fontSize: sizes.SIZE_14,
    fontWeight: "bold",
  },
  headerTitle: {
    color: theme.colors.text,
    fontSize: sizes.SIZE_24,
    fontFamily: "orbitronBold",
  },
  dayWrapper: {
    backgroundColor: theme.colors.background,
    padding: sizes.SIZE_6,
  },
  noTemplatesText: {
    fontWeight: "bold",
    color: theme.colors.border,
    fontSize: sizes.SIZE_14,
  },
});

export default Home;
