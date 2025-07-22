export interface User {
    id: string;
    email?: string;
    created_at: string;
  }
  
  export interface AuthResponse {
    data: {
      user: User | null;
      session: any;
    };
    error: any;
  }
  
  export interface AuthContextType {
    user: User | null;
    signUp: (email: string, password: string) => Promise<AuthResponse>;
    signIn: (email: string, password: string) => Promise<AuthResponse>;
    signOut: () => Promise<{ error: any }>;
    loading: boolean;
  }


