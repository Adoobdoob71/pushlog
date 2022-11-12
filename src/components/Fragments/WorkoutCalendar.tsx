import { FC, MutableRefObject } from "react"
import { Text, View, StyleSheet, ActivityIndicator } from "react-native"
import { CalendarList, DateData } from "react-native-calendars"
import { styles, theme, sizes } from "utils/styles"
import { HEIGHT } from "utils/constants"
import { useWorkoutCalendar } from "hooks/useWorkoutCalendar"
import { Modalize } from "react-native-modalize"
import { IHandles } from "react-native-modalize/lib/options"
import Button from "../Base/Button"
import moment from "moment"
import ExerciseCard from "../Content/ExerciseCard"
import Tag from "../Base/Tag"
import { ScrollView } from "react-native-gesture-handler"

interface Props {
  calendarModalRef: MutableRefObject<IHandles>
  workoutDayModalRef: MutableRefObject<IHandles>
  updateChosenDay: (day: DateData) => void
  chosenDay: DateData
}

const WorkoutCalendar: FC<Props> = ({
  calendarModalRef,
  workoutDayModalRef,
  updateChosenDay,
  chosenDay,
}) => {
  const { sessions, loadingSessions, markedDays, refreshSessions } =
    useWorkoutCalendar(chosenDay, workoutDayModalRef)

  const chosenDaySessions = sessions.filter((session) =>
    moment(session.when).isSame(chosenDay.dateString, "day")
  )

  const sets = chosenDaySessions.flatMap((session) => session.sets)

  const agendaTheme = {
    calendarBackground: theme.colors.background,
    todayTextColor: theme.colors.primary,
    textSectionTitleColor: theme.colors.primary,
    monthTextColor: theme.colors.border,
    dayTextColor: theme.colors.border,
    textDisabledColor: theme.colors.card,
    agendaKnobColor: theme.colors.primary,
    indicatorColor: theme.colors.success,
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
  }

  const WorkoutHistoryHeaderComponent = (
    <View style={[{ paddingTop: sizes.SIZE_8, paddingBottom: sizes.SIZE_12 }]}>
      <View style={[styles.rowCenter, { paddingHorizontal: sizes.SIZE_8 }]}>
        <Text style={stylesheet.bottomSheetTitle} numberOfLines={1}>
          Workout History
        </Text>
        <Button
          mode="text"
          onPress={() => calendarModalRef.current.close()}
          style={{ marginStart: "auto" }}>
          Close
        </Button>
      </View>
    </View>
  )

  const WorkoutDayHeaderComponent = (
    <View style={[{ paddingVertical: sizes.SIZE_8 }]}>
      <View style={[styles.rowCenter, { paddingHorizontal: sizes.SIZE_8 }]}>
        <Text style={stylesheet.workoutDayTitle}>
          {moment()
            .month(chosenDay.month - 1)
            .format(`[${chosenDay.day}] MMMM`)}
        </Text>
        <Button
          mode="text"
          onPress={() => workoutDayModalRef.current.close()}
          style={{ marginStart: "auto" }}>
          Close
        </Button>
      </View>
      <ScrollView horizontal>
        <View
          style={[
            styles.rowCenter,
            { marginHorizontal: sizes.SIZE_20, marginVertical: sizes.SIZE_8 },
          ]}>
          {chosenDaySessions.length !== 0 && (
            <Text
              style={{
                color: theme.colors.primary,
                fontSize: sizes.SIZE_12,
                fontWeight: "bold",
                marginEnd: sizes.SIZE_8,
              }}>
              Templates used:
            </Text>
          )}
          {chosenDaySessions
            .flatMap((session) => session.templates)
            .map((tem) => (
              <Tag
                text={tem.name}
                backgroundColor={theme.colors.background_2}
                style={{ marginEnd: sizes.SIZE_8 }}
              />
            ))}
        </View>
      </ScrollView>
    </View>
  )

  return (
    <>
      <Modalize
        ref={calendarModalRef}
        panGestureComponentEnabled
        withHandle={false}
        onOpen={refreshSessions}
        adjustToContentHeight
        modalStyle={{ backgroundColor: theme.colors.background }}
        HeaderComponent={WorkoutHistoryHeaderComponent}
        customRenderer={
          loadingSessions ? (
            <View style={[{ height: sizes.SIZE_100 }, styles.center]}>
              <ActivityIndicator size="large" color={theme.colors.primary} />
            </View>
          ) : (
            <CalendarList
              // @ts-ignore
              theme={agendaTheme}
              pastScrollRange={0}
              futureScrollRange={0}
              markingType="dot"
              markedDates={markedDays}
              onDayPress={updateChosenDay}
            />
          )
        }></Modalize>
      <Modalize
        ref={workoutDayModalRef}
        panGestureComponentEnabled
        withHandle={false}
        adjustToContentHeight
        modalStyle={{
          backgroundColor: theme.colors.background,
        }}
        flatListProps={{
          data: chosenDaySessions.flatMap((session) =>
            session.templates.flatMap((tem) => tem.exercises)
          ),
          showsVerticalScrollIndicator: false,
          renderItem: ({ item, index }) => (
            <ExerciseCard
              {...item}
              sets={sets.filter((i) => {
                return i.exerciseNumber === item.exerciseNumber
              })}
              key={item.id}
              style={{
                backgroundColor: theme.colors.card,
                elevation: 0,
                marginBottom: sizes.SIZE_16,
                marginHorizontal: sizes.SIZE_16,
              }}
              exerciseData={item}
            />
          ),
          ListEmptyComponent: () => (
            <View
              style={[styles.flex, styles.center, { height: sizes.SIZE_150 }]}>
              <Text
                style={{
                  color: theme.colors.border,
                  fontSize: sizes.SIZE_12,
                  fontWeight: "bold",
                }}>
                No records were found
              </Text>
            </View>
          ),
        }}
        HeaderComponent={WorkoutDayHeaderComponent}></Modalize>
    </>
  )
}

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
})

export default WorkoutCalendar
