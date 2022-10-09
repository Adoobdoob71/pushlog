import React, { FC } from "react";
import { View, StyleSheet, Text, TextInput } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { sizes, theme } from "utils/styles";
import Tag from "../Base/Tag";
import TemplateCard from "../Content/TemplateCard";
import { WorkoutTemplate } from "utils/types";
import { useNavigation } from "@react-navigation/native";
import { Modalize } from "react-native-modalize";
import { IHandles } from "react-native-modalize/lib/options";

interface Props {
  templatesToShow: WorkoutTemplate[];
  templateSearchQuery: string;
  onSearchQueryChange: (value: string) => void;
  activeTemplates: WorkoutTemplate[];
  removeActiveTemplates: (id: string) => void;
  addActiveTemplates: (template: WorkoutTemplate) => void;
  modalizeRef: React.MutableRefObject<IHandles>;
}

const ChooseTemplate: FC<Props> = ({
  activeTemplates,
  addActiveTemplates,
  onSearchQueryChange,
  removeActiveTemplates,
  templateSearchQuery,
  templatesToShow,
  modalizeRef,
}) => {
  const navigation = useNavigation();

  const navigateToCustomizeTemplate = (template: WorkoutTemplate) =>
    // @ts-ignore
    navigation.navigate({
      // @ts-ignore
      name: "CustomizeTemplate",
      // @ts-ignore
      params: { template: template },
    });

  const HeaderComponent = (
    <View style={[{ paddingTop: sizes.SIZE_20, paddingBottom: sizes.SIZE_6 }]}>
      <Text style={stylesheet.bottomSheetTitle} numberOfLines={1}>
        Your workout templates
      </Text>
      <View style={stylesheet.bottomSheetSearchBar}>
        <TextInput
          placeholder="Search any template..."
          placeholderTextColor={theme.colors.border}
          style={stylesheet.bottomSheetSearchBarInput}
          value={templateSearchQuery}
          onChangeText={onSearchQueryChange}
          selectionColor={theme.colors.primary_3}
        />
      </View>
    </View>
  );
  const renderItem = ({ item, index }) => (
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
  );
  const ListHeaderComponent = () => (
    <View style={stylesheet.tagList} onStartShouldSetResponder={() => true}>
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
  );
  return (
    <Modalize
      ref={modalizeRef}
      flatListProps={{
        data: templatesToShow,
        renderItem: renderItem,
        keyExtractor: (item) => item.id,
        showsVerticalScrollIndicator: false,
        ListHeaderComponent: ListHeaderComponent,
        stickyHeaderIndices: [0],
        stickyHeaderHiddenOnScroll: true,
      }}
      modalStyle={{ backgroundColor: theme.colors.background }}
      adjustToContentHeight
      HeaderComponent={HeaderComponent}
      handleStyle={{ backgroundColor: theme.colors.primary }}
    />
  );
};

const stylesheet = StyleSheet.create({
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
    fontSize: sizes.SIZE_20,
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
    fontSize: sizes.SIZE_12,
  },
});

export default ChooseTemplate;
