import apiClient from "@/lib/apiClient";

export const jobService = {
  getJobs: async () => (await apiClient.get("/jobs")).data,
  getJobById: async (id: string) => (await apiClient.get(`/jobs/${id}`)).data,
  createJob: async (data: any) => (await apiClient.post("/jobs", data)).data,
  updateJob: async (id: string, data: any) => (await apiClient.put(`/jobs/${id}`, data)).data,
  deleteJob: async (id: string) => (await apiClient.delete(`/jobs/${id}`)).data,
};
