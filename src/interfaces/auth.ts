export interface AuthData {
  login: string;
  password: string;
}

export interface AuthState {
  authData: { userId: number; token: string };
  isLoadind: boolean;
  error: string;
}
