import { FC, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { HEIGHT, WIDTH } from "utils/constants";
import { sizes, styles, theme } from "utils/styles";
import { StyleProperty } from "utils/types";
import { VictoryLine } from "victory-native";

interface Props {
  data: { x: number; y: number; weight: number; setNumber: number }[];
  style?: StyleProperty;
}

type ActiveTime = "1M" | "3M" | "6M" | "9M" | "1Y";

const Graph: FC<Props> = ({ data, style }) => {
  const [activeTime, setActiveTime] = useState<ActiveTime>("1M");

  const changeActiveTime = (time: ActiveTime) => setActiveTime(time);

  const xArr = [
    ...data.map((item) => {
      return item.x;
    }),
  ];

  const yArr = [
    ...data.map((item) => {
      return item.y;
    }),
  ];
  return data.length !== 0 ? (
    <View style={style}>
      <View
        style={[
          styles.rowCenter,
          {
            alignSelf: "stretch",
            paddingHorizontal: sizes.SIZE_56,
            justifyContent: "space-around",
          },
        ]}
      >
        <Text style={stylesheet.reps}>8 Reps</Text>
        <Text style={stylesheet.weight}>40 Kgs</Text>
      </View>
      <VictoryLine
        data={data}
        style={{
          data: {
            stroke: theme.colors.primary,
            strokeWidth: sizes.SIZE_2,
          },
        }}
        minDomain={{
          x: Math.min.apply(Math, xArr) - 200,
          y: Math.min.apply(Math, yArr) - 2,
        }}
        maxDomain={{
          x: Math.max.apply(Math, xArr) + 200,
          y: Math.max.apply(Math, yArr) + 2,
        }}
        events={[
          {
            target: "data",
            eventHandlers: {
              onGestureStart: () => console.log("LONG PRESS"),
            },
          },
        ]}
        height={HEIGHT * 0.35}
        width={WIDTH}
        interpolation="natural"
        animate
      />
      <View style={[styles.rowCenter, { justifyContent: "space-evenly" }]}>
        <TimeToggle
          activeTime={activeTime}
          time="1M"
          changeActiveTime={changeActiveTime}
        />
        <TimeToggle
          activeTime={activeTime}
          time="3M"
          changeActiveTime={changeActiveTime}
        />
        <TimeToggle
          activeTime={activeTime}
          time="6M"
          changeActiveTime={changeActiveTime}
        />
        <TimeToggle
          activeTime={activeTime}
          time="9M"
          changeActiveTime={changeActiveTime}
        />
        <TimeToggle
          activeTime={activeTime}
          time="1Y"
          changeActiveTime={changeActiveTime}
        />
      </View>
    </View>
  ) : null;
};

interface Props_2 {
  activeTime: ActiveTime;
  time: ActiveTime;
  changeActiveTime: (time: ActiveTime) => void;
}

const TimeToggle: FC<Props_2> = ({ time, activeTime, changeActiveTime }) => {
  return (
    <TouchableOpacity
      onPress={() => changeActiveTime(time)}
      style={{
        borderRadius: sizes.SIZE_4,
        overflow: "hidden",
      }}
    >
      <View
        style={[
          styles.center,
          stylesheet.timeToggleButton,
          {
            backgroundColor:
              activeTime === time ? theme.colors.card : undefined,
          },
        ]}
      >
        <Text style={stylesheet.timeToggleText}>{time}</Text>
      </View>
    </TouchableOpacity>
  );
};

const stylesheet = StyleSheet.create({
  timeToggleButton: {
    paddingHorizontal: sizes.SIZE_8,
    paddingVertical: sizes.SIZE_5,
  },
  timeToggleText: {
    color: theme.colors.text,
    fontWeight: "bold",
    fontSize: sizes.SIZE_10,
  },
  reps: {
    fontSize: sizes.SIZE_16,
    color: theme.colors.primary,
    fontWeight: "bold",
  },
  weight: {
    fontSize: sizes.SIZE_16,
    color: theme.colors.primary_3,
    fontWeight: "bold",
  },
});
export default Graph;
