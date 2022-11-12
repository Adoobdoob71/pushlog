import { FC, useContext } from "react"
import { SafeAreaView, StyleSheet, Text, View } from "react-native"
import { sizes, styles, theme } from "utils/styles"
import { useHome } from "hooks/useHome"
import {
  ChooseTemplate,
  Header,
  IconButton,
  WorkoutSession,
  WorkoutCalendar,
  TemplateCard,
} from "components/index"
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler"
import { useNavigation } from "@react-navigation/native"
import moment from "moment"
import workoutSessions from "context/workoutSessions"
import { WIDTH } from "utils/constants"

const Home = () => {
  const homeHook = useHome(),
    {
      openTemplatesModal,
      activeTemplates,
      openCalendarModal,
      openWorkoutSessionModal,
    } = homeHook

  const navigation = useNavigation()

  // @ts-ignore
  const goToSettings = () => navigation.navigate({ name: "Settings" })

  const noTemplates = activeTemplates.length === 0

  const currentDay = moment().date()

  const { sessions, loadingSessions } = useContext(workoutSessions)

  return (
    <SafeAreaView style={[styles.mainWrapper]}>
      <View style={{ backgroundColor: theme.colors.card }}>
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
        <TouchableOpacity onPress={openCalendarModal} activeOpacity={0.5}>
          <View style={[styles.rowCenter, stylesheet.weekView]}>
            <WeekDay day="Sunday" currentDay={currentDay} />
            <WeekDay day="Monday" currentDay={currentDay} />
            <WeekDay day="Tuesday" currentDay={currentDay} />
            <WeekDay day="Wednesday" currentDay={currentDay} />
            <WeekDay day="Thursday" currentDay={currentDay} />
            <WeekDay day="Friday" currentDay={currentDay} />
            <WeekDay day="Saturday" currentDay={currentDay} />
          </View>
        </TouchableOpacity>
      </View>
      <ChooseTemplate {...homeHook} />
      <WorkoutCalendar {...homeHook} />
      <WorkoutSession {...homeHook} />
      <View>
        <Text
          style={{
            color: theme.colors.primary,
            fontWeight: "bold",
            fontSize: sizes.SIZE_20,
            marginStart: sizes.SIZE_24,
            marginTop: sizes.SIZE_24,
            marginBottom: sizes.SIZE_6,
          }}>
          Today you've worked
        </Text>
        <ScrollView showsHorizontalScrollIndicator={false} horizontal>
          {sessions
            .flatMap((item) => item.templates)
            .map((item, index) => (
              <TemplateCard
                key={index}
                {...item}
                templateData={item}
                tags={item.muscleCategories}
                style={{
                  marginHorizontal: sizes.SIZE_12,
                  maxWidth: WIDTH * 0.8,
                  marginVertical: sizes.SIZE_6,
                }}
              />
            ))}
        </ScrollView>
      </View>
      <IconButton
        name={noTemplates ? "pencil" : "play"}
        color={theme.colors.text}
        onPress={noTemplates ? openTemplatesModal : openWorkoutSessionModal}
        size={sizes.SIZE_24}
        text={activeTemplates.length === 0 ? undefined : "Workout"}
        fab
      />
    </SafeAreaView>
  )
}

const WeekDay: FC<{ day: string; currentDay: number }> = ({
  day,
  currentDay,
}) => {
  const date = moment().day(day).date()
  const activeStyle = {
    color: date === currentDay ? theme.colors.text : theme.colors.border,
  }
  return (
    <View style={[styles.columnCenter]}>
      <Text style={[stylesheet.weekDay, activeStyle]}>
        {day.substring(0, 3)}
      </Text>
      <Text style={[stylesheet.weekDay, activeStyle]}>{date}</Text>
    </View>
  )
}

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
  weekView: {
    width: "100%",
    justifyContent: "space-evenly",
    marginBottom: sizes.SIZE_16,
  },
  weekDay: {
    color: theme.colors.border,
    fontWeight: "bold",
    fontSize: sizes.SIZE_14,
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
})

export default Home
