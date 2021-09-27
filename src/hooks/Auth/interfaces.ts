import { User } from '../../models/user';

export interface SignInCredentials {
  email: string;
  password: string;
}

export interface AuthContextData {
  loading?: boolean;
  user: User;
  token: string | null;
  signIn(credentials: SignInCredentials): Promise<void>;
  updateUser(userData: User): void;
  signOut(): void;
}

export interface Token {
  type: string;
  token: string;
}

export interface AuthenticatedUser {
  token: Token;
  user: User;
}

export interface AuthState {
  loading?: boolean;
  signed?: boolean;
  token: string | null;
  user: User;
}
