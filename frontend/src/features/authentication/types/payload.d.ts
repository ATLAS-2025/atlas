

export interface IRegisterPayload {
  email: string;
  username: string;
  password: string;
}

export interface ILoginPayload {
  email: string;
  password: string;
}

export interface IResetPayload {
  email: string;
}

export interface IResetResponse {
  message: string;
}
