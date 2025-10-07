import apiClient from "@/lib/apiClient";
import { Job } from "@/types/job";

export type JobQueryParams = {
  page?: number;
  pageSize?: number;
  keyword?: string;
  location?: string;
  type?: string;
  category?: string;
};

export type ApiResponse<T> = {
  success: boolean;
  data: T;
  message?: string;
  totalCount?: number;
};

export const jobService = {
  getJobs: async (params?: JobQueryParams): Promise<ApiResponse<Job[]>> => {
    const response = await apiClient.get<ApiResponse<Job[]>>("/jobs", { params });
    return response.data;
  },

  getJobById: async (id: string): Promise<ApiResponse<Job>> => {
    const response = await apiClient.get<ApiResponse<Job>>(`/jobs/${id}`);
    return response.data;
  },

  createJob: async (payload: Partial<Job>): Promise<ApiResponse<Job>> => {
    const response = await apiClient.post<ApiResponse<Job>>("/jobs", payload);
    return response.data;
  },

  updateJob: async (id: string, payload: Partial<Job>): Promise<ApiResponse<Job>> => {
    const response = await apiClient.put<ApiResponse<Job>>(`/jobs/${id}`, payload);
    return response.data;
  },

  deleteJob: async (id: string): Promise<ApiResponse<null>> => {
    const response = await apiClient.delete<ApiResponse<null>>(`/jobs/${id}`);
    return response.data;
  },
};
