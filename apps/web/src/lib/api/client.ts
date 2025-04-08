import axios, {
  InternalAxiosRequestConfig,
  AxiosResponse,
  AxiosError,
  RawAxiosRequestHeaders,
} from "axios";
import { getSession, signOut } from "next-auth/react";

const baseURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
    public data?: any
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export const apiClient = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // 10 seconds
});

// Add request interceptor for server-side requests
apiClient.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    config.headers["Content-Type"] = "application/json";

    if (config.headers.Authorization) {
      if (config.headers.Authorization.toString().startsWith("Basic ")) {
        return config;
      }
      if (config.headers.Authorization.toString().startsWith("Bearer ")) {
        return config;
      }
      throw new ApiError(500, "You must provide an valid JWT");
    } else {
      const accessToken = await getToken();
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(new ApiError(0, "Request failed", error));
  }
);

// Add response interceptor for error handling
apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    if (error.response) {
      if (error.response.status == 401) {
        signOut({ redirect: true, callbackUrl: "/auth/signin" });
      }
      throw new ApiError(
        error.response.status,
        error.response?.data &&
        typeof error.response.data === "object" &&
        "message" in error.response.data
          ? String(error.response.data.message)
          : "An error occurred",
        error.response.data
      );
    } else if (error.request) {
      // The request was made but no response was received
      throw new ApiError(0, "No response received from server");
    } else {
      // Something happened in setting up the request that triggered an Error
      throw new ApiError(0, error.message || "Request failed");
    }
  }
);

export async function getToken(): Promise<string | null> {
  const data = await getSession();
  return data?.user.accessToken || null;
}

// Helper function to handle API responses
export async function handleApiResponse<T>(
  response: AxiosResponse<T>
): Promise<T> {
  return response.data;
}

export async function fetchApi<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const response = await apiClient.request<T>({
    url: endpoint,
    method: options.method,
    headers: options.headers as RawAxiosRequestHeaders,
    data: options.body,
  });

  return handleApiResponse(response);
}
