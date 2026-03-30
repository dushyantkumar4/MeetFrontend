import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { useSocketContext } from "../context/SocketContext"
import { useMedia } from "../hooks/useMedia"
import { useWebRTC } from "../hooks/useWebRTC"
import VideoGrid from "../components/video/VideoGrid"
import Controls from "../components/meeting/Controls"
import ChatPanel from "../components/chat/ChatPanel"

export default function MeetingRoom() {
  const { id } = useParams()
  const socket = useSocketContext()
  const stream = useMedia()

  const {
    handleUserJoined,
    handleOffer,
    handleAnswer,
    handleIce,
  } = useWebRTC(id!, stream)

  useEffect(() => {
    if (!socket) return

    socket.emit("join-room", id)

    socket.on("user-joined", handleUserJoined)
    socket.on("offer", handleOffer)
    socket.on("answer", handleAnswer)
    socket.on("ice-candidate", handleIce)

    return () => {
      socket.off("user-joined")
      socket.off("offer")
      socket.off("answer")
      socket.off("ice-candidate")
    }
  }, [socket, stream])

  return (
    <div className="h-screen flex flex-col">
      <VideoGrid stream={stream} />
      <Controls />
      <ChatPanel />
    </div>
  )
}