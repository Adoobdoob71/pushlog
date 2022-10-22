import { useState } from "react"
import { ExerciseSet } from "utils/types"

function useWorkoutSession() {
  const [sets, setSets] = useState<ExerciseSet[]>([])
}

export { useWorkoutSession }
