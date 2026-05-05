import { io, Socket } from "socket.io-client";

// Socket is created ONCE and reused everywhere
let socket: Socket | null = null;

export function getSocket(): Socket {
  if (!socket) {
    throw new Error("Socket not initialized. Call initSocket() first.");
  }
  return socket;
}

export function initSocket(token: string): Socket {
  if (socket?.connected) return socket;

  socket = io(import.meta.env.VITE_BACKEND_URL, {
    auth: { token }, // Clerk JWT goes here
    transports: ["websocket"], // Skip polling for WebRTC apps
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
  });

  socket.on("connect", () => console.log("[Socket] Connected:", socket?.id));
  socket.on("disconnect", (reason) =>
    console.warn("[Socket] Disconnected:", reason),
  );
  socket.on("connect_error", (err) =>
    console.error("[Socket] Error:", err.message),
  );

  return socket;
}

export function disconnectSocket() {
  socket?.disconnect();
  socket = null;
}
