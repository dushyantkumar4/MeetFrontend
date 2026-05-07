export const SOCKET_EVENTS = {
  // Connection lifecycle
  CONNECT:    'connect',
  DISCONNECT: 'disconnect',

  // Room
  ROOM_JOIN:  'room:join',
  ROOM_LEAVE: 'room:leave',
  ROOM_PEERS: 'room:peers',

  // WebRTC signaling
  WEBRTC_OFFER:          'webrtc:offer',
  WEBRTC_ANSWER:         'webrtc:answer',
  WEBRTC_ICE_CANDIDATE:  'webrtc:ice-candidate',
  WEBRTC_PEER_JOINED:    'webrtc:peer-joined',
  WEBRTC_PEER_LEFT:      'webrtc:peer-left',

  // Chat
  CHAT_MESSAGE:  'chat:message',
  CHAT_TYPING:   'chat:typing',

  // Meeting controls
  MEETING_MUTE:     'meeting:mute-participant',
  MEETING_KICK:     'meeting:kick-participant',
  MEETING_HAND:     'meeting:hand-raise',
  MEETING_REACTION: 'meeting:reaction',
} as const;

export type SocketEvent = (typeof SOCKET_EVENTS)[keyof typeof SOCKET_EVENTS];