import { FC, MutableRefObject } from "react";
import { Text, View, StyleSheet } from "react-native";
import { CalendarList } from "react-native-calendars";
import { styles, theme, sizes } from "utils/styles";
import { HEIGHT } from 'utils/constants';
import NavigationBar from "expo-navigation-bar";
import { Modalize } from "react-native-modalize";
import { IHandles } from "react-native-modalize/lib/options";
import Button from "../Base/Button";

interface Props {
  calendarModalRef: MutableRefObject<IHandles>;
}

const WorkoutCalendar: FC<Props> = ({ calendarModalRef }) => {
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
    textDayFontWeight: "bold",
    textDayHeaderFontWeight: "bold",
    textMonthFontWeight: "bold",
    todayButtonFontWeight: "bold",
  };

  const HeaderComponent = (
    <View style={[{ paddingVertical: sizes.SIZE_8 }]}>
      <View style={[styles.rowCenter, { paddingHorizontal: sizes.SIZE_8 }]}>
        <Text style={stylesheet.bottomSheetTitle} numberOfLines={1}>
          Workout History
        </Text>
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
      modalHeight={HEIGHT}
      modalStyle={{ backgroundColor: theme.colors.background }}
      HeaderComponent={HeaderComponent}
      customRenderer={
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
          ListFooterComponent={() => (
            <View style={{ height: sizes.SIZE_40 }}>
              <Text>Something bro</Text>
            </View>
          )}
        />
      }
    >
    </Modalize>
  );
};

const stylesheet = StyleSheet.create({
  bottomSheetTitle: {
    color: theme.colors.primary,
    fontWeight: "bold",
    fontSize: sizes.SIZE_24,
    marginTop: sizes.SIZE_12,
    marginStart: sizes.SIZE_12,
  },
});

export default WorkoutCalendar;
