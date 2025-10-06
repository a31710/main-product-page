import { useQuery } from "@tanstack/react-query";

import { jobService } from "@/services/jobService";

export const useJobDetail = (id: string) =>
  useQuery({
    queryKey: ["jobDetail", id],
    queryFn: () => jobService.getJobById(id),
    enabled: !!id,
  });
