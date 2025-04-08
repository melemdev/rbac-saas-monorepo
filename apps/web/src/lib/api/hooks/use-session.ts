import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { authService } from "../services/auth";

export const sessionKeys = {
  all: ["users_sessions"] as const,
  lists: () => [...sessionKeys.all, "list"] as const,
};

export function useSessions() {
  return useQuery({
    queryKey: sessionKeys.lists(),
    queryFn: () => authService.getSessions(),
  });
}

export function useDeleteSession() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => authService.deleteSession(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: sessionKeys.lists() });
    },
  });
}
