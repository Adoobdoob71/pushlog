import { MutableRefObject, useContext, useEffect, useState } from "react"
import { DateData } from "react-native-calendars"
import { IHandles } from "react-native-modalize/lib/options"
import { WorkoutSession } from "database/schemas"
import sqliteDB from "context/sqliteDB"
import moment from "moment"
import { Between } from "typeorm"
import Toast from "react-native-toast-message"
import { theme } from "utils/styles"
import workoutSessions from "context/workoutSessions"

function useWorkoutCalendar(
  chosenDay: DateData,
  workoutDayModalRef: MutableRefObject<IHandles>
) {
  const [markedDays, setMarkedDays] = useState({})
  const { sessions, loadingSessions, refreshSessions } =
    useContext(workoutSessions)

  useEffect(() => {
    sessions.map((session) => {
      setMarkedDays((marked) => {
        const markedTemp = {
          ...marked,
          [moment(session.when).format("YYYY-MM-DD")]: {
            marked: true,
          },
        }
        return markedTemp
      })
    })
  }, [sessions])

  return {
    markedDays,
    sessions,
    loadingSessions,
    refreshSessions,
  }
}

export { useWorkoutCalendar }
