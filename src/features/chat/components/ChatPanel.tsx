import { useState } from "react"
import { useSocketContext } from "../context/MyContextProvider.tsx"

export default function ChatPanel() {
  const socket = useSocketContext()
  const [msg, setMsg] = useState("")
  const [messages, setMessages] = useState<any[]>([])

  const send = () => {
    socket.emit("send-message", { message: msg })
    setMessages((prev) => [...prev, { me: true, text: msg }])
    setMsg("")
  }

  return (
    <div className="p-2 border-t">
      {messages.map((m, i) => (
        <div key={i}>{m.text}</div>
      ))}
      <input value={msg} onChange={(e) => setMsg(e.target.value)} />
      <button onClick={send}>Send</button>
    </div>
  )
}