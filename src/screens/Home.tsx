import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { fontSizes, sizes, styles, theme } from "utils/styles";
import { useHome } from "hooks/useHome";
import { Agenda } from "react-native-calendars";
import {
  Button,
  ExerciseCard,
  Header,
  IconButton,
  Tag,
  TemplateCard,
} from "components/index";
import { useNavigation } from "@react-navigation/native";
import * as NavigationBar from "expo-navigation-bar";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetTextInput,
} from "@gorhom/bottom-sheet";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { useContext } from "react";
import workoutTemplates from "context/workoutTemplates";
import { WorkoutTemplate } from "utils/types";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

const Home = () => {
  const {
    updateChosenDay,
    bottomSheetRef,
    snapPoints,
    handlePresentModalPress,
    activeTemplates,
    addActiveTemplates,
    removeActiveTemplates,
    templateSearchQuery,
    templatesToShow,
    onSearchQueryChange,
  } = useHome();

  const { templates } = useContext(workoutTemplates);

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

  const navigateToCustomizeTemplate = (template: WorkoutTemplate) =>
    // @ts-ignore
    navigation.navigate({
      // @ts-ignore
      name: "CustomizeTemplate",
      // @ts-ignore
      params: { template: template },
    });

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
        backgroundStyle={{
          backgroundColor: theme.colors.background,
        }}
        containerStyle={{ zIndex: 2 }}
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
              value={templateSearchQuery}
              onChangeText={onSearchQueryChange}
              selectionColor={theme.colors.primary_3}
            />
          </View>
          <FlatList
            data={templatesToShow}
            showsVerticalScrollIndicator={false}
            ListFooterComponent={() => (
              <View style={{ height: sizes.SIZE_100 }}></View>
            )}
            nestedScrollEnabled
            stickyHeaderIndices={[0]}
            stickyHeaderHiddenOnScroll
            ListHeaderComponent={() => (
              <View
                style={stylesheet.tagList}
                onStartShouldSetResponder={() => true}
              >
                <ScrollView
                  showsHorizontalScrollIndicator={false}
                  style={{
                    marginTop: sizes.SIZE_10,
                    marginBottom: sizes.SIZE_20,
                  }}
                  horizontal
                >
                  <View style={{ width: sizes.SIZE_16 }}></View>
                  {activeTemplates.map((item, _index) => (
                    <Tag
                      text={item.name}
                      backgroundColor={theme.colors.background_2}
                      key={item.id}
                      onRemove={() => removeActiveTemplates(item.id)}
                      style={{ marginEnd: sizes.SIZE_8 }}
                    />
                  ))}
                  <View style={{ width: sizes.SIZE_16 }}></View>
                </ScrollView>
              </View>
            )}
            keyExtractor={(item) => item.id}
            renderItem={({ item, index }) => (
              <View
                style={[
                  stylesheet.templateActive,
                  activeTemplates.some((tem) => tem.id === item.id) && {
                    borderColor: theme.colors.primary,
                  },
                ]}
              >
                <TemplateCard
                  key={index}
                  onPress={() => addActiveTemplates(item)}
                  onLongPress={() => navigateToCustomizeTemplate(item)}
                  templateData={item}
                  {...item}
                  tags={item.muscleCategories}
                />
              </View>
            )}
          />
        </View>
      </BottomSheet>
      <IconButton
        name="pencil"
        color={theme.colors.text}
        onPress={handlePresentModalPress}
        size={sizes.SIZE_24}
        style={{
          backgroundColor: theme.colors.primary,
          position: "absolute",
          bottom: sizes.SIZE_24,
          end: sizes.SIZE_24,
          padding: sizes.SIZE_10,
          borderRadius: sizes.SIZE_8,
          elevation: sizes.SIZE_4,
          zIndex: 1,
        }}
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
    backgroundColor: theme.colors.background,
    padding: sizes.SIZE_6,
  },
  noTemplatesText: {
    fontWeight: "bold",
    color: theme.colors.border,
    fontSize: fontSizes.FONT_14,
  },
  templateActive: {
    borderColor: "transparent",
    borderWidth: sizes.SIZE_2,
    borderRadius: sizes.SIZE_8,
    marginBottom: sizes.SIZE_18,
    marginHorizontal: sizes.SIZE_20,
  },
  tagList: {
    backgroundColor: theme.colors.background,
    flex: 1,
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
    marginBottom: sizes.SIZE_10,
  },
  bottomSheetSearchBarInput: {
    textAlignVertical: "center",
    color: theme.colors.text,
    fontSize: fontSizes.FONT_12,
  },
});

export default Home;
