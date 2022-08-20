import { FC } from "react";
import { StyleSheet, Text, View } from "react-native";
import HorizontalPicker from "@vseslav/react-native-horizontal-picker";
import Button from "../Base/Button";
import { fontSizes, sizes, styles, theme } from "utils/styles";
import { WIDTH } from "utils/constants";
import { useWeightHeight } from "hooks/useWeightHeight";

interface Props {
  goNext: () => void;
  goBack: () => void;
}

const WeightHeight: FC<Props> = ({ goBack, goNext }) => {
  const Items = Array.from(Array(300).keys());

  const { activeHeight, activeWeight, onChangeHeight, onChangeWeight } =
    useWeightHeight();

  return (
    <View style={[styles.flex, stylesheet.mainWrapper]}>
      <Text style={stylesheet.title} numberOfLines={1}>
        What are your metrics?
      </Text>
      <View style={stylesheet.pickerView}>
        <Text style={stylesheet.subtitle} numberOfLines={1}>
          Height - Cm
        </Text>
        <HorizontalPicker
          data={Items}
          itemWidth={80}
          defaultIndex={175}
          snapTimeout={300}
          onChange={onChangeHeight}
          renderItem={(item, index) => (
            <View style={[styles.columnCenter, { width: 80 }]}>
              <View
                style={{
                  height:
                    item % 10 === 0
                      ? sizes.SIZE_18
                      : item % 5 === 0
                      ? sizes.SIZE_14
                      : sizes.SIZE_10,
                  width: sizes.SIZE_4,
                  borderRadius: sizes.SIZE_4,
                  backgroundColor:
                    activeHeight === item
                      ? theme.colors.primary
                      : theme.colors.text,
                }}
              ></View>
              <Text
                style={[
                  stylesheet.pickerText,
                  {
                    color:
                      activeHeight === item
                        ? theme.colors.primary
                        : theme.colors.text,
                  },
                ]}
              >
                {item}
              </Text>
            </View>
          )}
          style={stylesheet.heightPicker}
        />
      </View>
      <View style={stylesheet.pickerView}>
        <Text style={stylesheet.subtitle} numberOfLines={1}>
          Weight - Kg
        </Text>
        <HorizontalPicker
          data={Items}
          itemWidth={80}
          defaultIndex={70}
          snapTimeout={300}
          onChange={onChangeWeight}
          renderItem={(item, index) => (
            <View style={[styles.columnCenter, { width: 80 }]}>
              <View
                style={{
                  height:
                    item % 10 === 0
                      ? sizes.SIZE_18
                      : item % 5 === 0
                      ? sizes.SIZE_14
                      : sizes.SIZE_10,
                  width: sizes.SIZE_4,
                  borderRadius: sizes.SIZE_4,
                  backgroundColor:
                    activeWeight === item
                      ? theme.colors.primary
                      : theme.colors.text,
                }}
              ></View>
              <Text
                style={[
                  stylesheet.pickerText,
                  {
                    color:
                      activeWeight === item
                        ? theme.colors.primary
                        : theme.colors.text,
                  },
                ]}
              >
                {item}
              </Text>
            </View>
          )}
          style={stylesheet.heightPicker}
        />
      </View>
      <View style={[styles.rowCenter, stylesheet.buttonView]}>
        <Button mode="text" onPress={goBack} style={{ alignSelf: "flex-end" }}>
          Back
        </Button>
        <Button mode="text" onPress={goNext} style={{ alignSelf: "flex-end" }}>
          Next
        </Button>
      </View>
    </View>
  );
};

const stylesheet = StyleSheet.create({
  mainWrapper: {
    paddingVertical: sizes.SIZE_100,
  },
  title: {
    fontSize: fontSizes.FONT_24,
    fontWeight: "bold",
    color: theme.colors.primary,
    alignSelf: "center",
    marginBottom: sizes.SIZE_36,
  },
  subtitle: {
    fontSize: fontSizes.FONT_14,
    color: theme.colors.border,
    fontWeight: "bold",
    marginTop: sizes.SIZE_18,
    alignSelf: "center",
  },
  pickerView: {
    marginVertical: sizes.SIZE_24,
  },
  heightPicker: {
    width: WIDTH,
    alignSelf: "center",
    marginVertical: sizes.SIZE_24,
  },
  pickerText: {
    color: theme.colors.text,
    fontSize: fontSizes.FONT_28,
    textAlign: "center",
    marginTop: "auto",
    fontWeight: "bold",
  },
  buttonView: {
    marginTop: "auto",
    justifyContent: "space-between",
    marginHorizontal: sizes.SIZE_40,
  },
});

export default WeightHeight;
