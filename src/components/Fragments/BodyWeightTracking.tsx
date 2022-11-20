import React, { FC, useContext } from "react"
import { View, StyleSheet, Text, TextInput } from "react-native"
import { sizes, styles, theme } from "utils/styles"
import { IHandles } from "react-native-modalize/lib/options"
import { Modalize } from "react-native-modalize"
import { HEIGHT, WIDTH } from "utils/constants"
import Button from "../Base/Button"
import { useBodyWeightTracking } from "hooks/useBodyWeightTracking"
import Graph from "../Content/Graph"
import { BodyWeight } from "../../utils/types"

interface Props {
  bodyWeightTrackingModalRef: React.MutableRefObject<IHandles>
  bodyWeightRecords: BodyWeight[]
}

const BodyWeightTracking: FC<Props> = ({
  bodyWeightTrackingModalRef,
  bodyWeightRecords,
}) => {
  const { weight, setWeight } = useBodyWeightTracking(bodyWeightRecords)

  const HeaderComponent = (
    <View style={[{ paddingTop: sizes.SIZE_8, paddingBottom: sizes.SIZE_12 }]}>
      <View style={[styles.rowCenter, { paddingHorizontal: sizes.SIZE_8 }]}>
        <Text style={stylesheet.bottomSheetTitle} numberOfLines={1}>
          Bodyweight History
        </Text>
        <Button
          mode="text"
          onPress={() => bodyWeightTrackingModalRef.current.close()}
          style={{ marginStart: "auto" }}>
          Close
        </Button>
      </View>
    </View>
  )
  return (
    <Modalize
      ref={bodyWeightTrackingModalRef}
      modalStyle={{ backgroundColor: theme.colors.background }}
      handleStyle={{ backgroundColor: theme.colors.primary }}
      withHandle={false}
      panGestureComponentEnabled
      HeaderComponent={HeaderComponent}
      modalHeight={HEIGHT * 0.65}>
      <View>
        <TextInput
          value={weight.toString()}
          style={stylesheet.input}
          selectionColor={theme.colors.primary}
          onChangeText={(value) =>
            setWeight(value === "" ? 0 : parseFloat(value))
          }
        />
        {bodyWeightRecords.length !== 0 ? (
          <Graph
            data={bodyWeightRecords.map((item) => {
              return { x: item.when.getTime(), y: item.weight }
            })}
          />
        ) : (
          <View style={[styles.center, stylesheet.graphCard]}>
            <Text style={{ color: "#FFF" }}>Not enough records</Text>
          </View>
        )}
      </View>
    </Modalize>
  )
}

const stylesheet = StyleSheet.create({
  mainWrapper: {
    flex: 1,
    backgroundColor: theme.colors.background,
    borderRadius: sizes.SIZE_8,
    padding: sizes.SIZE_12,
    justifyContent: "space-around",
  },
  bottomSheetTitle: {
    color: theme.colors.primary,
    fontWeight: "bold",
    fontSize: sizes.SIZE_20,
    marginTop: sizes.SIZE_12,
    marginStart: sizes.SIZE_12,
  },
  input: {
    backgroundColor: "#132831",
    borderRadius: sizes.SIZE_8,
    color: theme.colors.text,
    fontSize: sizes.SIZE_24,
    width: WIDTH * 0.3,
    paddingVertical: sizes.SIZE_12,
    marginTop: sizes.SIZE_32,
    alignSelf: "center",
    textAlign: "center",
  },
  optionTitle: {
    color: theme.colors.primary_2,
    fontWeight: "bold",
    fontSize: sizes.SIZE_12,
    alignSelf: "center",
    marginBottom: sizes.SIZE_8,
  },
  graphCard: {
    height: sizes.SIZE_150,
    width: WIDTH * 0.8,
    backgroundColor: "#132831",
    marginStart: sizes.SIZE_12,
    borderRadius: sizes.SIZE_8,
    alignSelf: "center",
    marginTop: sizes.SIZE_32,
  },
})

export default BodyWeightTracking
