import { keepPreviousData, useQuery } from "@tanstack/react-query";

import { jobService, JobQueryParams } from "@/services/jobService";
import { useFilterStore } from "@/store/useFilterStore";

export const useJobs = () => {
  const { keyword, location, category, page, pageSize } = useFilterStore();
  const params: JobQueryParams = { keyword, location, category, page, pageSize };

  return useQuery({
    queryKey: ["jobs", params],
    queryFn: () => jobService.getJobs(params),
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 1,
  });
};
