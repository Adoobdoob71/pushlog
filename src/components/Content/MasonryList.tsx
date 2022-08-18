import { FC, ReactElement } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { StyleProperty } from "utils/types";
import { sizes, styles } from "utils/styles";

interface Props<T> {
  numColumns?: number;
  data: T[];
  renderItem: ({ item, index }: { item: T; index: number }) => ReactElement;
  style?: StyleProperty;
  contentContainerStyle?: StyleProperty;
  header?: ReactElement;
}

function MasonryList<T>({
  data,
  renderItem,
  numColumns = 2,
  style,
  contentContainerStyle,
  header,
}: Props<T>): ReactElement {
  // slices data into columns
  const dataLoading = (index: number) => {
    return data
      .slice(
        (data.length / numColumns) * index,
        (data.length / numColumns) * index + data.length / numColumns
      )
      .map((item, index) => renderItem({ item, index }));
  };

  return (
    <ScrollView
      style={[style]}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
    >
      {header}
      <View style={[styles.row, contentContainerStyle]}>
        {Array.from(Array(numColumns)).map((_item, index) => (
          <View key={`masonry_list_column_${index}`} style={stylesheet.column}>
            {dataLoading(index)}
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const stylesheet = StyleSheet.create({
  column: {
    flex: 1,
    marginHorizontal: sizes.SIZE_4,
  },
});

export default MasonryList;
