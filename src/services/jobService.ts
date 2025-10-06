import apiClient from "@/lib/apiClient";

export const getJobs = async () => {
  const res = await apiClient.get("/jobs");
  return res.data;
};
