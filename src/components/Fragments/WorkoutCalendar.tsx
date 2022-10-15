import { FC, MutableRefObject } from "react";
import { Text, View, StyleSheet, InteractionManager } from "react-native";
import { CalendarList, DateData } from "react-native-calendars";
import { styles, theme, sizes } from "utils/styles";
import { HEIGHT } from "utils/constants";
import NavigationBar from "expo-navigation-bar";
import { Modalize } from "react-native-modalize";
import { IHandles } from "react-native-modalize/lib/options";
import Button from "../Base/Button";
import moment from "moment";

interface Props {
  calendarModalRef: MutableRefObject<IHandles>;
  workoutDayModalRef: MutableRefObject<IHandles>;
  updateChosenDay: (day: DateData) => void;
  chosenDay: DateData;
}

const WorkoutCalendar: FC<Props> = ({
  calendarModalRef,
  workoutDayModalRef,
  updateChosenDay,
  chosenDay,
}) => {
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
    textDayFontSize: sizes.SIZE_16,
    textDayHeaderFontSize: sizes.SIZE_14,
    textMonthFontSize: sizes.SIZE_16,
    dotStyle: {
      width: sizes.SIZE_8,
      height: sizes.SIZE_8,
      borderRadius: sizes.SIZE_4,
      marginTop: sizes.SIZE_4,
    },
  };

  const WorkoutHistoryHeaderComponent = (
    <View style={[{ paddingTop: sizes.SIZE_8, paddingBottom: sizes.SIZE_12 }]}>
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

  const WorkoutDayHeaderComponent = (
    <View style={[{ paddingVertical: sizes.SIZE_8 }]}>
      <View style={[styles.rowCenter, { paddingHorizontal: sizes.SIZE_8 }]}>
        <Text style={stylesheet.workoutDayTitle}>
          {moment()
            .month(chosenDay.month - 1)
            .format(`[${chosenDay.day}] MMM`)}
        </Text>
        <Button
          mode="text"
          onPress={() => workoutDayModalRef.current.close()}
          style={{ marginStart: "auto" }}
        >
          Close
        </Button>
      </View>
    </View>
  );
  return (
    <>
      <Modalize
        ref={calendarModalRef}
        panGestureComponentEnabled
        withHandle={false}
        modalHeight={HEIGHT * 0.8}
        modalStyle={{ backgroundColor: theme.colors.background }}
        HeaderComponent={WorkoutHistoryHeaderComponent}
        customRenderer={
          <CalendarList
            // @ts-ignore
            theme={agendaTheme}
            pastScrollRange={1}
            futureScrollRange={0}
            markingType="dot"
            markedDates={{
              "2022-10-15": { marked: true, dotColor: theme.colors.primary_3 },
              "2022-10-14": { marked: true, dotColor: theme.colors.primary_3 },
              "2022-10-13": { marked: true, dotColor: theme.colors.primary_3 },
            }}
            onDayPress={updateChosenDay}
          />
        }
      ></Modalize>
      <Modalize
        ref={workoutDayModalRef}
        panGestureComponentEnabled
        withHandle={false}
        adjustToContentHeight
        modalStyle={{ backgroundColor: theme.colors.background }}
        HeaderComponent={WorkoutDayHeaderComponent}
      >
        <View style={[styles.flex, styles.center, { height: sizes.SIZE_120 }]}>
          <Text
            style={{
              color: theme.colors.border,
              fontSize: sizes.SIZE_12,
              fontWeight: "bold",
            }}
          >
            No Records
          </Text>
        </View>
      </Modalize>
    </>
  );
};

const stylesheet = StyleSheet.create({
  bottomSheetTitle: {
    color: theme.colors.primary,
    fontWeight: "bold",
    fontSize: sizes.SIZE_20,
    marginTop: sizes.SIZE_12,
    marginStart: sizes.SIZE_12,
  },
  workoutDayHistory: {
    backgroundColor: theme.colors.background,
    height: sizes.SIZE_120,
    padding: sizes.SIZE_12,
    elevation: sizes.SIZE_4,
  },
  workoutDayTitle: {
    color: theme.colors.text,
    fontWeight: "bold",
    fontSize: sizes.SIZE_20,
    marginStart: sizes.SIZE_12,
  },
});

export default WorkoutCalendar;
