import { useQuery } from "@tanstack/react-query";

import { jobService } from "@/services/jobService";

export const useJobs = () =>
  useQuery({
    queryKey: ["jobs"],
    queryFn: jobService.getJobs,
  });
