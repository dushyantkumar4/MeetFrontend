import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { Message, TypingUser } from '../types/chat.types';

interface ChatState {
  messages: Message[];
  typingUsers: TypingUser[];
  addMessage: (m: Message) => void;
  setTyping: (user: TypingUser) => void;
  clearTyping: (userId: string) => void;
  clearChat: () => void;
}

export const useChatStore = create<ChatState>()(
  devtools(
    (set) => ({
      messages: [],
      typingUsers: [],
      addMessage: (m) =>
        set((s) => ({ messages: [...s.messages, m] }), false, 'addMessage'),
      setTyping: (user) =>
        set((s) => ({
          typingUsers: s.typingUsers.find((u) => u.userId === user.userId)
            ? s.typingUsers
            : [...s.typingUsers, user],
        }), false, 'setTyping'),
      clearTyping: (userId) =>
        set((s) => ({ typingUsers: s.typingUsers.filter((u) => u.userId !== userId) }), false, 'clearTyping'),
      clearChat: () => set({ messages: [], typingUsers: [] }, false, 'clearChat'),
    }),
    { name: 'ChatStore' }
  )
);