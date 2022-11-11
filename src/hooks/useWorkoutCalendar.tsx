import { MutableRefObject, useContext, useEffect, useState } from "react"
import { DateData } from "react-native-calendars"
import { IHandles } from "react-native-modalize/lib/options"
import { WorkoutSession } from "database/schemas"
import sqliteDB from "context/sqliteDB"
import moment from "moment"
import { Between } from "typeorm"
import Toast from "react-native-toast-message"
import { theme } from "utils/styles"

function useWorkoutCalendar(
  chosenDay: DateData,
  workoutDayModalRef: MutableRefObject<IHandles>
) {
  const [sessions, setSessions] = useState<WorkoutSession[]>([])
  const [markedDays, setMarkedDays] = useState({})
  const [loading, setLoading] = useState(true)
  const { connector } = useContext(sqliteDB)
  const getSessions = async () => {
    try {
      setLoading(true)
      const result = await connector?.getRepository(WorkoutSession).find({
        where: {
          when: Between(
            moment().month(-1).startOf("month").toDate(),
            moment().add(1, "day").toDate()
          ),
        },
        order: {
          sets: {
            when: "ASC",
          },
        },
      })
      setSessions(result)
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Uh oh...",
        text2: "Something went wrong 😥",
      })
    }
    setLoading(false)
  }

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
    loading,
    sessions,
    markedDays,
    getSessions,
  }
}

export { useWorkoutCalendar }
