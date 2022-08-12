import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { fontSizes, sizes, styles, theme } from "utils/styles";
import { Agenda } from "react-native-calendars";

const Home = () => {
  return (
    <SafeAreaView style={[styles.flex]}>
      <View style={stylesheet.header}>
        <Text style={stylesheet.headerTitle}>PUSHLOG</Text>
      </View>
      <Agenda
        theme={{
          calendarBackground: theme.colors.background,
          todayTextColor: theme.colors.primary,
          textSectionTitleColor: theme.colors.primary,
          monthTextColor: theme.colors.border,
          dayTextColor: theme.colors.border,
          textDisabledColor: theme.colors.card,
          agendaKnobColor: theme.colors.primary,
          indicatorColor: theme.colors.primary,
          selectedDayBackgroundColor: theme.colors.primary_2,
        }}
        showClosingKnob
      />
    </SafeAreaView>
  );
};

const stylesheet = StyleSheet.create({
  header: {
    backgroundColor: theme.colors.background,
    paddingHorizontal: sizes.SIZE_18,
    paddingVertical: sizes.SIZE_20,
  },
  headerTitle: {
    color: theme.colors.text,
    fontWeight: "bold",
    fontSize: fontSizes.FONT_24,
  },
});

export default Home;
