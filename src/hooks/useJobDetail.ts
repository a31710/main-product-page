"use client";
import { useQuery } from "@tanstack/react-query";

import { jobService } from "@/services/jobService";

export const useJobDetail = (id?: string) => {
  return useQuery({
    queryKey: ["job", id],
    queryFn: () => (id ? jobService.getJobById(id) : Promise.reject("No id")),
    enabled: !!id,
  });
};
