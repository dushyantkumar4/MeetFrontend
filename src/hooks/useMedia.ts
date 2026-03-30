import { useEffect, useState } from "react"

export const useMedia = () => {
  const [stream, setStream] = useState<MediaStream | null>(null)

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then(setStream)
  }, [])

  return stream
}