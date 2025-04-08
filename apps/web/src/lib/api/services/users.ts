import { apiClient, fetchApi, handleApiResponse } from "../client";

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: Date;
  lastLogin: Date;
}

export interface UsersResponse {
  users: User[];
  total: number;
  page: number;
  limit: number;
}

export interface CreateUserData {
  name: string;
  email: string;
  password: string;
  role: string;
}

export interface UpdateUserData {
  name?: string;
  email?: string;
  role?: string;
}

export const usersService = {
  async getUsers(page = 1, limit = 10): Promise<UsersResponse> {
    const response = await fetchApi<UsersResponse>(`/api/users`, {
      method: "GET",
    });

    return response;
  },

  async getUser(id: string): Promise<User> {
    const response = await apiClient.get<User>(`/api/users/${id}`);
    return handleApiResponse(response);
  },

  async createUser(data: CreateUserData): Promise<User> {
    const response = await apiClient.post<User>("/api/users", data);
    return handleApiResponse(response);
  },

  async updateUser(id: string, data: UpdateUserData): Promise<User> {
    const response = await apiClient.patch<User>(`/api/users/${id}`, data);
    return handleApiResponse(response);
  },

  async deleteUser(id: string): Promise<void> {
    await apiClient.delete(`/api/users/${id}`);
  },

  async resetPassword(id: string): Promise<void> {
    await apiClient.post(`/api/users/${id}/reset-password`);
  },
};
