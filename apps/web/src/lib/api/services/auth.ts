import { fetchApi } from "../client";

interface LoginCredentials {
  email: string;
  password: string;
}

interface SignUpCredentials extends LoginCredentials {
  name: string;
  confirmPassword?: string;
}

export interface LoginResponse {
  userId: string;
  email: string;
  name: string;
  accessToken: string;
}

interface ProfileResponse {
  id: string;
  name: string;
  email: string;
}

export interface UserSession {
  userId: string;
  email: string;
  name: string;
  lastActivity: string;
  session_id: string;
}

export const authService = {
  login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
    const authHeader = `Basic ${Buffer.from(
      `${credentials.email}:${credentials.password}`
    ).toString("base64")}`;

    const response = await fetchApi<LoginResponse>("/api/auth/signin", {
      method: "GET",
      headers: {
        Authorization: authHeader,
      },
    });

    return response;
  },

  signup: async (credentials: SignUpCredentials): Promise<void> => {
    return fetchApi("/api/auth/signup", {
      method: "POST",
      body: JSON.stringify({
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
      }),
    });
  },

  getProfile: async (): Promise<ProfileResponse> => {
    return fetchApi<ProfileResponse>("/api/auth/profile", {
      method: "GET",
    });
  },

  logout: () => {
    // No need to handle cookies anymore
  },

  getSessions: async (): Promise<UserSession[]> => {
    return fetchApi<UserSession[]>("/api/auth/sessions");
  },

  deleteSession: async (session_id: string): Promise<void> => {
    return fetchApi<void>(`/api/auth/sessions/${session_id}`, {
      method: "DELETE",
    });
  },
};
