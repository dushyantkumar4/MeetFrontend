import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { useUser } from "@clerk/react";

export const useSocket = () => {
  const { user } = useUser();
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    if (!user) return;

    const s = io(import.meta.env.VITE_BASE_URL, {
      query: { userId: user.id },
    });

    setSocket(s);

    return () => {
      s.disconnect();
    };
  }, [user]);

  return socket;
};
