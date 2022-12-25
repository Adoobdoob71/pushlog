import { FC, useContext } from "react"
import { ActivityIndicator, StyleSheet, Text, View } from "react-native"
import { sizes, styles, theme } from "utils/styles"
import { useHome } from "hooks/useHome"
import {
  ChooseTemplate,
  Header,
  IconButton,
  WorkoutSession,
  WorkoutCalendar,
  TemplateCard,
  ExerciseCard,
} from "components/index"
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler"
import { useNavigation } from "@react-navigation/native"
import moment from "moment"
import workoutSessions from "context/workoutSessions"
import { HEIGHT, WIDTH } from "utils/constants"

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
  const goToTemplatesList = () => navigation.navigate({ name: "TemplatesList" })

  const noTemplates = activeTemplates.length === 0

  const currentDay = moment().date()

  const { sessions, loadingSessions } = useContext(workoutSessions)

  const lastSession = sessions[sessions.length - 1]

  return (
    <View style={[styles.mainWrapper]}>
      <View style={{ backgroundColor: theme.colors.card }}>
        <Header
          left={<Text style={stylesheet.headerTitle}>PUSHLOG</Text>}
          right={
            <View style={styles.rowCenter}>
              <IconButton
                name="notebook-outline"
                style={{ marginStart: "auto" }}
                onPress={goToTemplatesList}
              />
            </View>
          }
        />
        <TouchableOpacity onPress={openCalendarModal} activeOpacity={0.5}>
          <View style={[styles.rowCenter, stylesheet.weekView]}>
            <WeekDay day="Sunday" currentDay={currentDay} key="Sunday" />
            <WeekDay day="Monday" currentDay={currentDay} key="Monday" />
            <WeekDay day="Tuesday" currentDay={currentDay} key="Tuesday" />
            <WeekDay day="Wednesday" currentDay={currentDay} key="Wednesday" />
            <WeekDay day="Thursday" currentDay={currentDay} key="Thursday" />
            <WeekDay day="Friday" currentDay={currentDay} key="Friday" />
            <WeekDay day="Saturday" currentDay={currentDay} key="Saturday" />
          </View>
        </TouchableOpacity>
      </View>
      <ChooseTemplate {...homeHook} />
      <WorkoutCalendar {...homeHook} />
      <WorkoutSession {...homeHook} />
      <ScrollView style={styles.flex}>
        {loadingSessions ? (
          <View style={[{ height: HEIGHT * 0.6 }, styles.center]}>
            <ActivityIndicator size="large" color={theme.colors.primary} />
          </View>
        ) : (
          <>
            <Text
              style={{
                color: theme.colors.primary,
                fontWeight: "bold",
                fontSize: sizes.SIZE_20,
                marginStart: sizes.SIZE_24,
                marginTop: sizes.SIZE_24,
                marginBottom: sizes.SIZE_6,
              }}>
              Your last workout consisted of
            </Text>
            <ScrollView
              style={styles.flex}
              showsHorizontalScrollIndicator={false}
              horizontal>
              {lastSession !== null ? (
                lastSession.templates.map((item, index) => (
                  <TemplateCard
                    key={item.id}
                    {...item}
                    templateData={item}
                    tags={item.muscleCategories}
                    style={{
                      marginHorizontal: sizes.SIZE_12,
                      width: WIDTH * 0.825,
                      marginTop: sizes.SIZE_6,
                      elevation: 0,
                    }}
                  />
                ))
              ) : (
                <View
                  style={[
                    styles.center,
                    { width: WIDTH, height: sizes.SIZE_150 },
                  ]}>
                  <Text style={stylesheet.plainText}>
                    Perhaps today we rest?
                  </Text>
                </View>
              )}
            </ScrollView>
            <Text
              style={{
                color: theme.colors.primary,
                fontWeight: "bold",
                fontSize: sizes.SIZE_20,
                marginStart: sizes.SIZE_24,
                marginTop: sizes.SIZE_24,
                marginBottom: sizes.SIZE_12,
              }}>
              Exercises you've done
            </Text>
            <ScrollView showsHorizontalScrollIndicator={false} horizontal>
              {lastSession !== null ? (
                lastSession.templates
                  .flatMap((tem) => tem.exercises)
                  .map((item, index) => (
                    <ExerciseCard
                      {...item}
                      sets={lastSession.sets.filter((i) => {
                        return i.exerciseNumber === item.exerciseNumber
                      })}
                      showSetsDefault={true}
                      key={item.id}
                      style={{
                        backgroundColor: theme.colors.card,
                        width: WIDTH * 0.85,
                        elevation: 0,
                        marginHorizontal: sizes.SIZE_12,
                      }}
                      exerciseData={item}
                    />
                  ))
              ) : (
                <View
                  style={[
                    styles.center,
                    { width: WIDTH, height: sizes.SIZE_150 },
                  ]}>
                  <Text style={stylesheet.plainText}>
                    Haven't done any exercises
                  </Text>
                </View>
              )}
            </ScrollView>
          </>
        )}
      </ScrollView>
      <IconButton
        name={noTemplates ? "pencil" : "play"}
        color={theme.colors.text}
        onPress={noTemplates ? openTemplatesModal : openWorkoutSessionModal}
        size={sizes.SIZE_24}
        text={activeTemplates.length === 0 ? undefined : "Workout"}
        fab
      />
    </View>
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
  plainText: {
    color: theme.colors.border,
    fontWeight: "bold",
    fontSize: sizes.SIZE_14,
  },
  cardView: {
    height: sizes.SIZE_200,
    width: WIDTH * 0.8,
    backgroundColor: theme.colors.card,
    marginStart: sizes.SIZE_12,
    borderRadius: sizes.SIZE_8,
  },
})

export default Home
