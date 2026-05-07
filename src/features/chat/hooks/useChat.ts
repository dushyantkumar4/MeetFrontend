import { useCallback } from 'react';
import { getSocket } from '@/lib/socket/socket.client';
import { SOCKET_EVENTS } from '@/lib/socket/socket.events';
import { useChatStore } from '../store/chat.store';
import type { Message } from '../types/chat.types';

export function useChat(roomId: string, senderId: string, senderName: string) {
  const { addMessage } = useChatStore();

  const sendMessage = useCallback((content: string) => {
    const socket = getSocket();
    const message: Message = {
      id: crypto.randomUUID(),
      senderId,
      senderName,
      content,
      timestamp: new Date().toISOString(),
      roomId,
    };
    socket.emit(SOCKET_EVENTS.CHAT_MESSAGE, message);
    addMessage(message); // optimistic
  }, [roomId, senderId, senderName, addMessage]);

  const sendTyping = useCallback(() => {
    getSocket().emit(SOCKET_EVENTS.CHAT_TYPING, { roomId, userId: senderId, name: senderName });
  }, [roomId, senderId, senderName]);

  return { sendMessage, sendTyping };
}