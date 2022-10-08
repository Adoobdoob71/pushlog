import { FC, ReactNode } from "react";
import { StyleSheet, Text, View } from "react-native";
import { sizes, theme } from "utils/styles";

interface Props {
  groupTitle: string;
  children: ReactNode;
}

const ListGroup: FC<Props> = ({ groupTitle, children }) => {
  return (
    <View style={stylesheet.listGroup}>
      <Text style={stylesheet.groupTitle}>{groupTitle}</Text>
      {children}
    </View>
  );
};

const stylesheet = StyleSheet.create({
  listGroup: {
    padding: sizes.SIZE_18,
  },
  groupTitle: {
    color: theme.colors.primary,
    fontSize: sizes.SIZE_14,
    fontWeight: "bold",
  },
});

export default ListGroup;
