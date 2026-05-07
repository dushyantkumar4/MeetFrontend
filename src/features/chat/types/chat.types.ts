export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  content: string;
  timestamp: string;
  roomId: string;
}

export interface TypingUser {
  userId: string;
  name: string;
}