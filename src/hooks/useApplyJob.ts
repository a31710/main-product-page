"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { applicationService } from "@/services/applicationService";

export const useApplyJob = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: Parameters<typeof applicationService.applyJob>[0]) =>
      applicationService.applyJob(payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["jobs"] });
      qc.invalidateQueries({ queryKey: ["applications"] });
    },
  });
};
