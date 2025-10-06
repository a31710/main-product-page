import { useMutation, useQueryClient } from "@tanstack/react-query";

import { jobService } from "@/services/jobService";

export const useCreateJob = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: jobService.createJob,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
    },
  });
};
