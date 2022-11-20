import { useRoute } from "@react-navigation/native"
import { useContext, useEffect, useRef, useState } from "react"
import { BodyWeight, ExerciseSet } from "utils/types"
import sqliteDB from "context/sqliteDB"
import { Exercise, ExerciseSet as exSet } from "database/schemas"
import Toast from "react-native-toast-message"
import { Modalize } from "react-native-modalize"

function useBodyWeightTracking(bodyWeightRecords: BodyWeight[]) {
  const [weight, setWeight] = useState(
    bodyWeightRecords[bodyWeightRecords.length - 1]?.weight ?? 0
  )

  return {
    weight,
    setWeight,
  }
}

export { useBodyWeightTracking }
