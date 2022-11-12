import { createContext } from "react"
import { Session } from "utils/types"

export default createContext<{
  sessions: (Session | null)[]
  loadingSessions: boolean
  refreshSessions: () => Promise<void>
}>({
  sessions: [],
  loadingSessions: true,
  refreshSessions: async () => {},
})
