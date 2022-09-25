import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { fontSizes, sizes, styles, theme } from "utils/styles";
import { useHome } from "hooks/useHome";
import { Agenda } from "react-native-calendars";
import {
  Button,
  ExerciseCard,
  Header,
  IconButton,
  TemplateCard,
} from "components/index";
import { useNavigation } from "@react-navigation/native";
import * as NavigationBar from "expo-navigation-bar";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetTextInput,
} from "@gorhom/bottom-sheet";
import { FlatList } from "react-native-gesture-handler";
import { useMemo } from "react";
import { useContext } from "react";
import workoutTemplates from "context/workoutTemplates";

const Home = () => {
  const {
    currentDay,
    chosenDay,
    updateChosenDay,
    bottomSheetRef,
    snapPoints,
    handlePresentModalPress,
  } = useHome();

  const { templates, addTemplate } = useContext(workoutTemplates);

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
  };

  const navigation = useNavigation();

  // @ts-ignore
  const goToSettings = () => navigation.navigate({ name: "Settings" });

  const noTemplates = templates.length === 0;

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
            enabled ? theme.colors.card : theme.colors.background
          )
        }
        renderEmptyData={() => (
          <ScrollView
            style={[styles.flex, stylesheet.dayWrapper]}
            contentContainerStyle={noTemplates && { flexGrow: 1 }}
          >
            {noTemplates ? (
              <View style={[styles.flex, styles.center]}>
                <Button
                  mode="filled"
                  style={{ marginBottom: sizes.SIZE_28 }}
                  onPress={handlePresentModalPress}
                >
                  Choose a workout
                </Button>
              </View>
            ) : (
              <ExerciseCard
                name="Bench Press"
                image="https://wger.de/media/exercise-images/192/Bench-press-1.png"
                volume={{ sets: 4, reps: 12 }}
                weight={15}
                tags={[
                  { id: "1", name: "chest" },
                  { id: "2", name: "triceps" },
                  { id: "3", name: "front delts" },
                ]}
                style={{ marginBottom: sizes.SIZE_16, padding: sizes.SIZE_12 }}
              />
            )}
          </ScrollView>
        )}
        onDayPress={updateChosenDay}
      />
      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        keyboardBehavior="extend"
        enablePanDownToClose={true}
        snapPoints={snapPoints}
        backdropComponent={(props) => (
          <BottomSheetBackdrop
            {...props}
            appearsOnIndex={0}
            disappearsOnIndex={-1}
            opacity={0.65}
          />
        )}
        handleIndicatorStyle={{ backgroundColor: theme.colors.primary }}
        backgroundStyle={{ backgroundColor: theme.colors.background }}
      >
        <View style={{ paddingVertical: sizes.SIZE_12 }}>
          <Text style={stylesheet.bottomSheetTitle} numberOfLines={1}>
            Your workout templates
          </Text>
          <View style={stylesheet.bottomSheetSearchBar}>
            <BottomSheetTextInput
              placeholder="Search any template..."
              placeholderTextColor={theme.colors.border}
              style={stylesheet.bottomSheetSearchBarInput}
              selectionColor={theme.colors.primary_3}
            />
          </View>
          <FlatList
            data={templates}
            showsVerticalScrollIndicator={false}
            ListFooterComponent={() => (
              <View style={{ height: sizes.SIZE_100 }}></View>
            )}
            keyExtractor={(item) => item.id}
            renderItem={({ item, index }) => (
              <TemplateCard
                style={{
                  marginBottom: sizes.SIZE_18,
                  marginHorizontal: sizes.SIZE_20,
                }}
                templateData={item}
                {...item}
                tags={item.muscleCategories}
              />
            )}
          />
        </View>
      </BottomSheet>
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
    backgroundColor: theme.colors.background,
    padding: sizes.SIZE_6,
  },
  bottomSheetTitle: {
    color: theme.colors.primary,
    fontWeight: "bold",
    fontSize: fontSizes.FONT_20,
    alignSelf: "center",
  },
  bottomSheetSearchBar: {
    backgroundColor: "#132831",
    marginHorizontal: sizes.SIZE_36,
    marginTop: sizes.SIZE_20,
    borderRadius: sizes.SIZE_4,
    paddingVertical: sizes.SIZE_6,
    paddingHorizontal: sizes.SIZE_12,
    marginBottom: sizes.SIZE_24,
  },
  bottomSheetSearchBarInput: {
    textAlignVertical: "center",
    color: theme.colors.text,
    fontSize: fontSizes.FONT_12,
  },
});

export default Home;
