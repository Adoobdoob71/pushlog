import { FC, MutableRefObject } from "react";
import { Text, View, StyleSheet } from "react-native";
import { CalendarList } from "react-native-calendars";
import { styles, theme, sizes } from "utils/styles";
import NavigationBar from "expo-navigation-bar";
import { Modalize } from "react-native-modalize";
import { IHandles } from "react-native-modalize/lib/options";
import Button from "../Base/Button";

interface Props {
  calendarModalRef: MutableRefObject<IHandles>;
}

const WorkoutCalendar: FC<Props> = ({ calendarModalRef }) => {
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

  const HeaderComponent = (
    <View style={[{ paddingTop: sizes.SIZE_8, paddingBottom: sizes.SIZE_6 }]}>
      <View style={[styles.rowCenter, { paddingHorizontal: sizes.SIZE_8 }]}>
        <Button
          mode="text"
          onPress={() => calendarModalRef.current.close()}
          style={{ marginStart: "auto" }}
        >
          Close
        </Button>
      </View>
    </View>
  );
  return (
    <Modalize
      ref={calendarModalRef}
      panGestureComponentEnabled
      withHandle={false}
      modalStyle={{ backgroundColor: theme.colors.background }}
      HeaderComponent={HeaderComponent}
    >
      <CalendarList
        // @ts-ignore
        theme={agendaTheme}
        pastScrollRange={1}
        futureScrollRange={1}
        onCalendarToggled={(enabled) =>
          NavigationBar.setBackgroundColorAsync(
            enabled ? theme.colors.card : theme.colors.background
          )
        }
        onDayPress={null}
      />
    </Modalize>
  );
};

const stylesheet = StyleSheet.create({});

export default WorkoutCalendar;
