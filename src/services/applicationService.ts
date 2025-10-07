import apiClient from "@/lib/apiClient";

export const applicationService = {
  applyJob: (payload: {
    jobId: string;
    applicant_name: string;
    applicant_email: string;
    cover_letter?: string;
    resume_path: string;
  }) => apiClient.post("/applications", payload).then((r) => r.data),
  getApplications: (jobId?: string) =>
    apiClient.get(`/applications${jobId ? `/${jobId}` : ""}`).then((r) => r.data),
};
