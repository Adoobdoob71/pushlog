import React, { FC } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { sizes, styles, theme } from "utils/styles";
import Tag from "../Base/Tag";
import Button from "../Base/Button";
import TemplateCard from "../Content/TemplateCard";
import { WorkoutTemplate } from "utils/types";
import { useNavigation } from "@react-navigation/native";
import { Modalize } from "react-native-modalize";
import { IHandles } from "react-native-modalize/lib/options";
import { HEIGHT } from "utils/constants";
import { FlashList } from "@shopify/flash-list";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

interface Props {
  templates: WorkoutTemplate[];
  templateSearchQuery: string;
  onSearchQueryChange: (value: string) => void;
  activeTemplates: WorkoutTemplate[];
  removeActiveTemplates: (id: string) => void;
  addActiveTemplates: (template: WorkoutTemplate) => void;
  modalizeRef: React.MutableRefObject<IHandles>;
  loadingTemplates: boolean;
}

const ChooseTemplate: FC<Props> = ({
  templates,
  activeTemplates,
  addActiveTemplates,
  onSearchQueryChange,
  removeActiveTemplates,
  templateSearchQuery,
  modalizeRef,
  loadingTemplates,
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
    <View style={[{ paddingTop: sizes.SIZE_8, paddingBottom: sizes.SIZE_6 }]}>
      <View style={[styles.rowCenter, { paddingHorizontal: sizes.SIZE_8 }]}>
        <Text style={stylesheet.bottomSheetTitle} numberOfLines={1}>
          Workouts
        </Text>
        <Button
          mode="text"
          onPress={() => modalizeRef.current.close()}
          style={{ marginStart: "auto" }}
        >
          Close
        </Button>
      </View>
      <View style={[styles.rowCenter, stylesheet.bottomSheetSearchBar]}>
        <MaterialCommunityIcons
          name="magnify"
          color={theme.colors.border}
          size={sizes.SIZE_14}
          style={{ marginEnd: sizes.SIZE_8 }}
        />
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
          marginTop: activeTemplates.length > 0 ? sizes.SIZE_10 : 0,
          marginBottom:
            activeTemplates.length > 0 ? sizes.SIZE_20 : sizes.SIZE_10,
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
      customRenderer={
        loadingTemplates ? (
          <View style={[styles.flex, styles.center]}>
            <ActivityIndicator size="large" color={theme.colors.primary} />
          </View>
        ) : (
          <FlashList
            data={templates.filter((template) =>
              template.name
                .toLowerCase()
                .includes(templateSearchQuery.toLocaleLowerCase())
            )}
            renderItem={renderItem}
            getItemType={(item) => typeof item}
            keyExtractor={(_item, index) => index.toString()}
            ListHeaderComponent={ListHeaderComponent}
            stickyHeaderHiddenOnScroll
            stickyHeaderIndices={[0]}
            showsVerticalScrollIndicator={false}
            estimatedItemSize={sizes.SIZE_200}
          />
        )
      }
      panGestureComponentEnabled
      modalHeight={HEIGHT * 0.9}
      withHandle={false}
      modalStyle={{ backgroundColor: theme.colors.background }}
      HeaderComponent={HeaderComponent}
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
    marginTop: sizes.SIZE_12,
    marginStart: sizes.SIZE_12,
  },
  bottomSheetSearchBar: {
    backgroundColor: "#132831",
    marginHorizontal: sizes.SIZE_36,
    marginTop: sizes.SIZE_16,
    borderRadius: sizes.SIZE_4,
    paddingVertical: sizes.SIZE_6,
    paddingHorizontal: sizes.SIZE_12,
  },
  bottomSheetSearchBarInput: {
    flex: 1,
    textAlignVertical: "center",
    color: theme.colors.text,
    fontSize: sizes.SIZE_12,
  },
});

export default ChooseTemplate;
