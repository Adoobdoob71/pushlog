import { useNavigation } from "@react-navigation/native";
import { FC } from "react";
import { StyleSheet, Text, View } from "react-native";
import { STATUSBAR_HEIGHT } from "utils/constants";
import { fontSizes, sizes, styles, theme } from "utils/styles";
import { StyleProperty } from "utils/types";
import IconButton from "./IconButton";

interface Props {
  style?: StyleProperty;
  backButton?: boolean;
  title?: string;
  left?: JSX.Element;
  right?: JSX.Element;
}

const Header: FC<Props> = ({ style, backButton, title, right, left }) => {
  const navigation = useNavigation();

  return (
    <View style={[stylesheet.header, styles.rowCenter]}>
      {left
        ? left
        : backButton && (
            <IconButton
              onPress={() => navigation.goBack()}
              size={sizes.SIZE_24}
              name="chevron-left"
            />
          )}
      {title && <Text style={stylesheet.title}>{title}</Text>}
      <View style={{ marginStart: "auto" }}>{right}</View>
    </View>
  );
};

const stylesheet = StyleSheet.create({
  header: {
    backgroundColor: theme.colors.card,
    paddingHorizontal: sizes.SIZE_18,
    paddingBottom: sizes.SIZE_20,
    paddingTop: STATUSBAR_HEIGHT + sizes.SIZE_20,
  },
  title: {
    fontSize: fontSizes.FONT_20,
    color: theme.colors.text,
    marginHorizontal: sizes.SIZE_16,
    fontWeight: "bold",
  },
});

export default Header;
