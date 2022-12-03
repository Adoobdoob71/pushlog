import { Text, View, StyleSheet, SafeAreaView } from "react-native"
import { sizes, styles, theme } from "utils/styles"
import { Button, TemplateCard } from "components/index"
import { useTemplatesList } from "hooks/useTemplatesList"
import * as NavigationBar from "expo-navigation-bar"
import { FlatList, TextInput } from "react-native-gesture-handler"
import { HEIGHT, STATUSBAR_HEIGHT } from "utils/constants"
import { useNavigation } from "@react-navigation/native"
import { WorkoutTemplate } from "utils/types"

const TemplatesList = () => {
  const {
    templates,
    goBack,
    templatesForRemoval,
    toggleTemplateForRemoval,
    deleteTemplates,
    templateSearchQuery,
    onSearchQueryChange,
  } = useTemplatesList()

  NavigationBar.setBackgroundColorAsync(theme.colors.background)

  const navigation = useNavigation()

  const navigateToCustomizeTemplate = (item?: WorkoutTemplate) =>
    navigation.navigate({
      // @ts-ignore
      name: "CustomizeTemplate",
      // @ts-ignore
      params: { template: item },
    })

  return (
    <SafeAreaView style={[styles.flex, stylesheet.mainWrapper]}>
      <Text style={stylesheet.title} numberOfLines={1}>
        Your workout templates
      </Text>
      <Text style={stylesheet.subtitle} numberOfLines={1}>
        In all their glory!
      </Text>
      <View style={stylesheet.searchBar}>
        <TextInput
          placeholder="Search any template..."
          placeholderTextColor={theme.colors.border}
          value={templateSearchQuery}
          onChangeText={onSearchQueryChange}
          style={stylesheet.searchBarInput}
          selectionColor={theme.colors.primary_3}
        />
      </View>
      <FlatList
        data={templates.filter((template) =>
          template.name
            .toLowerCase()
            .includes(templateSearchQuery.toLocaleLowerCase())
        )}
        style={{
          marginVertical: sizes.SIZE_18,
        }}
        showsVerticalScrollIndicator={false}
        stickyHeaderHiddenOnScroll
        stickyHeaderIndices={[0]}
        ListHeaderComponent={() => (
          <View
            style={[
              styles.rowCenter,
              {
                justifyContent: "space-between",
                backgroundColor: theme.colors.background,
              },
            ]}>
            {templatesForRemoval.length > 0 && (
              <Button
                mode="text"
                style={{
                  marginBottom: sizes.SIZE_8,
                  marginHorizontal: sizes.SIZE_20,
                }}
                icon="trash-can"
                onPress={deleteTemplates}>
                Delete
              </Button>
            )}
            <Button
              mode="text"
              style={{
                marginStart: "auto",
                marginBottom: sizes.SIZE_8,
                marginHorizontal: sizes.SIZE_20,
              }}
              icon="plus"
              onPress={() => navigateToCustomizeTemplate(undefined)}>
              Add Template
            </Button>
          </View>
        )}
        renderItem={({ item, index }) => (
          <View
            style={[
              stylesheet.templateActive,
              templatesForRemoval.some((temp) => temp === item.id) && {
                borderColor: theme.colors.danger,
              },
            ]}>
            <TemplateCard
              key={item.id}
              onPress={() => navigateToCustomizeTemplate(item)}
              onLongPress={() => toggleTemplateForRemoval(item.id)}
              templateData={item}
              {...item}
              tags={item.muscleCategories}
            />
          </View>
        )}
        ListEmptyComponent={() => (
          <View style={[{ height: HEIGHT * 0.4 }, styles.flex, styles.center]}>
            <Text
              style={{
                color: theme.colors.border,
                fontSize: sizes.SIZE_14,
                fontWeight: "bold",
              }}>
              Can't find any templates
            </Text>
          </View>
        )}
      />
      <View style={[styles.rowCenter, stylesheet.buttonView]}>
        <Button mode="text" onPress={goBack} style={{ alignSelf: "flex-end" }}>
          Back
        </Button>
      </View>
    </SafeAreaView>
  )
}

const stylesheet = StyleSheet.create({
  mainWrapper: {
    paddingTop: STATUSBAR_HEIGHT + sizes.SIZE_60,
    paddingBottom: sizes.SIZE_36,
    backgroundColor: theme.colors.background,
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
  searchBar: {
    backgroundColor: "#132831",
    marginHorizontal: sizes.SIZE_36,
    marginTop: sizes.SIZE_20,
    borderRadius: sizes.SIZE_4,
    paddingVertical: sizes.SIZE_6,
    paddingHorizontal: sizes.SIZE_12,
  },
  searchBarInput: {
    textAlignVertical: "center",
    color: theme.colors.text,
    fontSize: sizes.SIZE_12,
  },
  templateActive: {
    borderColor: "transparent",
    borderWidth: sizes.SIZE_2,
    borderRadius: sizes.SIZE_8,
    marginBottom: sizes.SIZE_18,
    marginHorizontal: sizes.SIZE_20,
  },
  buttonView: {
    justifyContent: "space-between",
    marginHorizontal: sizes.SIZE_40,
    marginTop: "auto",
  },
})

export default TemplatesList
