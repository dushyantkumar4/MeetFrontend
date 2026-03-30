import { createContext, useContext } from "react"
import { useSocket } from "../hooks/useSocket"

const SocketContext = createContext<any>(null)

export const SocketProvider = ({ children }: any) => {
  const socket = useSocket()
  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  )
}

export const useSocketContext = () => useContext(SocketContext)