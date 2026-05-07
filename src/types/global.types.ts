export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

export interface ApiError {
  message: string;
  statusCode: number;
  errors?: Record<string, string[]>;
}

export interface User {
  id: string;
  clerkId: string;
  name: string;
  email: string;
  avatarUrl?: string;
  createdAt: string;
}

export interface Meeting {
  id: string;
  roomId: string;
  title: string;
  hostId: string;
  scheduledAt?: string;
  createdAt: string;
  isActive: boolean;
}