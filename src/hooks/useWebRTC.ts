import { useRef } from "react"
import MyContextProvider from "../context/MyContextProvider.tsx"

export const useWebRTC = (meetingId: string, stream: MediaStream | null) => {
  const socket = MyContextProvider()
  const peersRef = useRef<any>({})

  const createPeer = (userId: string) => {
    const pc = new RTCPeerConnection({
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
    })

    stream?.getTracks().forEach((track) => {
      pc.addTrack(track, stream)
    })

    pc.onicecandidate = (e) => {
      if (e.candidate) {
        socket.emit("ice-candidate", { to: userId, candidate: e.candidate })
      }
    }

    pc.ontrack = (e) => {
      console.log("Remote stream:", e.streams[0])
    }

    return pc
  }

  const handleUserJoined = async (userId: string) => {
    const pc = createPeer(userId)
    peersRef.current[userId] = pc

    const offer = await pc.createOffer()
    await pc.setLocalDescription(offer)

    socket.emit("offer", { to: userId, offer })
  }

  const handleOffer = async ({ from, offer }: any) => {
    const pc = createPeer(from)
    peersRef.current[from] = pc

    await pc.setRemoteDescription(offer)

    const answer = await pc.createAnswer()
    await pc.setLocalDescription(answer)

    socket.emit("answer", { to: from, answer })
  }

  const handleAnswer = async ({ from, answer }: any) => {
    await peersRef.current[from].setRemoteDescription(answer)
  }

  const handleIce = async ({ from, candidate }: any) => {
    await peersRef.current[from].addIceCandidate(candidate)
  }

  return {
    handleUserJoined,
    handleOffer,
    handleAnswer,
    handleIce,
    peersRef,
  }
}