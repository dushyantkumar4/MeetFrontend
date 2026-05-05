

export interface RTCConfig {
  iceServers: RTCIceServer[];
}

export const DEFAULT_RTC_CONFIG: RTCConfig = {
  iceServers: [
    // Free Google STUN server (for development)
    { urls: 'stun:stun.l.google.com:19302' },
    { urls: 'stun:stun1.l.google.com:19302' },
    // Your TURN server goes here for production
    // {
    //   urls: 'turn:your-turn-server.com:3478',
    //   username: process.env.TURN_USERNAME,
    //   credential: process.env.TURN_CREDENTIAL,
    // }
  ],
};

export class PeerConnectionManager {
  private pc: RTCPeerConnection;
  private localStream: MediaStream | null = null;

  constructor(config: RTCConfig = DEFAULT_RTC_CONFIG) {
    this.pc = new RTCPeerConnection(config);
    this.setupEventListeners();
  }

  private setupEventListeners() {
    // Connection state changes
    this.pc.onconnectionstatechange = () => {
      console.log('[PeerConnection] State:', this.pc.connectionState);
    };

    // ICE connection state
    this.pc.oniceconnectionstatechange = () => {
      console.log('[ICE] State:', this.pc.iceConnectionState);
    };
  }

  // Called when we receive a new ICE candidate from remote
  async addIceCandidate(candidate: RTCIceCandidateInit) {
    try {
      await this.pc.addIceCandidate(new RTCIceCandidate(candidate));
    } catch (error) {
      console.error('[PeerConnection] Failed to add ICE candidate:', error);
    }
  }

  get connection() {
    return this.pc;
  }

  destroy() {
    this.pc.close();
    this.localStream?.getTracks().forEach(track => track.stop());
  }
}