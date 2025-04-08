import { useQuery } from "@tanstack/react-query";
import { User } from "../types/user";
import { apiClient } from "../client";

async function fetchUser(userId: string): Promise<User> {
  const response = await apiClient.get<User>(`/api/users/${userId}`);
  return response.data;
}

export function useUser(userId: string) {
  return useQuery({
    queryKey: ["user", userId],
    queryFn: () => fetchUser(userId),
  });
}
