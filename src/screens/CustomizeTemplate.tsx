import React, { FC } from "react"
import { SafeAreaView, StyleSheet, Text, View } from "react-native"
import { Button, ChooseExercise, ExerciseCard, Tag } from "components/index"
import { sizes, styles, theme } from "utils/styles"
import { FlatList, ScrollView, TextInput } from "react-native-gesture-handler"
import { STATUSBAR_HEIGHT } from "utils/constants"
import { useCustomizeTemplate } from "hooks/useCustomizeTemplate"

const CustomizeTemplate: FC = () => {
  const customizeTemplateHook = useCustomizeTemplate(),
    {
      tags,
      workout,
      goBack,
      handleDescription,
      handleName,
      openExerciseModal,
      navigateToExerciseInfo,
      toggleExerciseForRemoval,
      exercisesForRemoval,
      deleteExercises,
      submitWorkout,
    } = customizeTemplateHook

  return (
    <SafeAreaView style={stylesheet.mainWrapper}>
      <Text style={stylesheet.title} numberOfLines={1}>
        Customize your workout
      </Text>
      <Text style={stylesheet.subtitle} numberOfLines={1}>
        What are we hitting?
      </Text>
      <View style={stylesheet.inputsWrapper}>
        <View>
          <Text style={stylesheet.textInputTitle}>Title</Text>
          <View style={styles.textInputWrapper}>
            <TextInput
              placeholder="Getting JACKED"
              placeholderTextColor={theme.colors.border}
              style={styles.textInput}
              value={workout.name}
              onChangeText={(value) => handleName(value)}
              selectionColor={theme.colors.primary_3}
            />
          </View>
        </View>
        <View style={{ marginVertical: sizes.SIZE_16 }}>
          <Text style={stylesheet.textInputTitle}>Description</Text>
          <View style={styles.textInputWrapper}>
            <TextInput
              placeholder="Amazing workout at home"
              value={workout.description}
              placeholderTextColor={theme.colors.border}
              style={styles.textInput}
              onChangeText={(value) => handleDescription(value)}
              selectionColor={theme.colors.primary_3}
            />
          </View>
        </View>
      </View>
      <FlatList
        data={workout.exercises}
        ListHeaderComponent={() => (
          <View
            style={[
              styles.rowCenter,
              {
                paddingBottom:
                  exercisesForRemoval.length === 0 ? sizes.SIZE_10 : 0,
                backgroundColor: theme.colors.background,
              },
            ]}>
            {exercisesForRemoval.length > 0 && (
              <Button
                mode="text"
                style={{
                  marginBottom: sizes.SIZE_8,
                  marginStart: sizes.SIZE_20,
                }}
                icon="trash-can"
                onPress={deleteExercises}>
                Delete
              </Button>
            )}
            <ScrollView
              style={stylesheet.tagList}
              showsHorizontalScrollIndicator={false}
              horizontal>
              {tags.map((item, index) => (
                <Tag
                  text={item.name}
                  backgroundColor={theme.colors.background_2}
                  key={index}
                  style={{ marginEnd: sizes.SIZE_8 }}
                />
              ))}
              <View style={{ width: sizes.SIZE_24 }}></View>
            </ScrollView>
          </View>
        )}
        style={{ flex: 1, marginBottom: sizes.SIZE_12 }}
        stickyHeaderIndices={[0]}
        stickyHeaderHiddenOnScroll
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <View
            style={[
              stylesheet.exerciseActive,
              exercisesForRemoval.some((ex) => ex === item.exerciseNumber) && {
                borderColor: theme.colors.danger,
              },
            ]}>
            <ExerciseCard
              {...item}
              exerciseData={item}
              key={index}
              onPress={() => navigateToExerciseInfo(item)}
              onLongPress={() => toggleExerciseForRemoval(item.exerciseNumber)}
            />
          </View>
        )}
        ListFooterComponent={() => (
          <Button
            mode="text"
            style={{ marginBottom: sizes.SIZE_12 }}
            icon="plus"
            onPress={openExerciseModal}>
            Add Exercise
          </Button>
        )}
        ListEmptyComponent={() => (
          <View style={[{ height: sizes.SIZE_100 }, styles.center]}>
            <Text
              style={{
                color: theme.colors.border,
                fontSize: sizes.SIZE_14,
                fontWeight: "bold",
              }}>
              You've gotta add exercises!
            </Text>
          </View>
        )}
      />
      <View style={[styles.rowCenter, stylesheet.buttonView]}>
        <Button mode="text" onPress={goBack} style={{ alignSelf: "flex-end" }}>
          Cancel
        </Button>
        <Button
          mode="text"
          onPress={submitWorkout}
          disabled={
            workout.name.length === 0 ||
            workout.description.length === 0 ||
            workout.exercises.length === 0
          }
          style={{ marginStart: "auto" }}>
          Done
        </Button>
      </View>
      <ChooseExercise {...customizeTemplateHook} />
    </SafeAreaView>
  )
}

export default CustomizeTemplate

const stylesheet = StyleSheet.create({
  mainWrapper: {
    paddingTop: STATUSBAR_HEIGHT + sizes.SIZE_60,
    paddingBottom: sizes.SIZE_36,
    backgroundColor: theme.colors.background,
    flex: 1,
  },
  title: {
    fontSize: sizes.SIZE_24,
    fontWeight: "bold",
    color: theme.colors.primary,
    alignSelf: "center",
  },
  subtitle: {
    fontSize: sizes.SIZE_14,
    color: theme.colors.border,
    fontWeight: "bold",
    marginTop: sizes.SIZE_18,
    alignSelf: "center",
  },
  inputsWrapper: {
    justifyContent: "space-around",
    marginHorizontal: sizes.SIZE_28,
    marginTop: sizes.SIZE_16,
  },
  textInputTitle: {
    fontSize: sizes.SIZE_10,
    color: theme.colors.primary,
    fontWeight: "bold",
    padding: sizes.SIZE_6,
  },
  tagList: {
    paddingHorizontal: sizes.SIZE_20,
    backgroundColor: theme.colors.background,
  },
  exerciseActive: {
    borderColor: "transparent",
    borderWidth: sizes.SIZE_2,
    borderRadius: sizes.SIZE_8,
    marginBottom: sizes.SIZE_16,
    marginHorizontal: sizes.SIZE_20,
  },
  buttonView: {
    justifyContent: "space-between",
    marginHorizontal: sizes.SIZE_40,
    marginTop: "auto",
  },
})
