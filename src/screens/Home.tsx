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
import { Button, Header, IconButton, ListGroup } from "components/index";
import { useNavigation } from "@react-navigation/native";
import { FC, useState } from "react";
import Checkbox from "expo-checkbox";
import * as NavigationBar from "expo-navigation-bar";

const Home = () => {
  const {
    currentDay,
    chosenDay,
    updateChosenDay,
    activeTemplates,
    addTemplate,
    removeTemplate,
  } = useHome();

  const agendaTheme = {
    calendarBackground: theme.colors.background,
    todayTextColor: theme.colors.primary,
    textSectionTitleColor: theme.colors.primary,
    monthTextColor: theme.colors.border,
    dayTextColor: theme.colors.border,
    textDisabledColor: theme.colors.card,
    agendaKnobColor: theme.colors.primary,
    indicatorColor: theme.colors.primary,
    selectedDayBackgroundColor: theme.colors.primary,
    dotColor: theme.colors.primary,
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
        theme={agendaTheme}
        pastScrollRange={18}
        futureScrollRange={18}
        showClosingKnob
        onCalendarToggled={(enabled) =>
          NavigationBar.setBackgroundColorAsync(
            enabled ? theme.colors.background : theme.colors.card
          )
        }
        renderEmptyData={() => (
          <ScrollView
            style={[styles.flex, stylesheet.dayWrapper]}
            contentContainerStyle={noTemplates && { flexGrow: 1 }}
          >
            {noTemplates && (
              <View style={[styles.flex, styles.center]}>
                <Button
                  mode="filled"
                  style={{ marginBottom: sizes.SIZE_28 }}
                  onPress={() => {}}
                >
                  Choose a workout
                </Button>
              </View>
            )}
          </ScrollView>
        )}
        onDayPress={updateChosenDay}
      />
    </SafeAreaView>
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
});

export default Home;
