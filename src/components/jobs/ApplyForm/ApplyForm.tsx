"use client";
import { useState } from "react";

import { useModalStore } from "@/store/useModalStore";
import { useApplyJob } from "@/hooks/useApplyJob";

export default function ApplyForm() {
  const { isOpen, jobId, close } = useModalStore();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [cover, setCover] = useState("");
  const [resume, setResume] = useState("");
  const mutation = useApplyJob();

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(
      {
        jobId: jobId!,
        applicant_name: name,
        applicant_email: email,
        cover_letter: cover,
        resume_path: resume,
      },
      {
        onSuccess: () => {
          close();
          // optionally show toast
        },
      }
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white p-6 rounded w-full max-w-lg">
        <h3 className="text-lg font-semibold mb-4">Apply for job</h3>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            className="border p-2 w-full"
          />
          <input
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email"
            className="border p-2 w-full"
          />
          <textarea
            value={cover}
            onChange={(e) => setCover(e.target.value)}
            placeholder="Cover letter"
            className="border p-2 w-full"
          />
          <input
            value={resume}
            onChange={(e) => setResume(e.target.value)}
            placeholder="Resume path or URL"
            className="border p-2 w-full"
          />
          <div className="flex justify-end gap-2">
            <button type="button" onClick={close} className="px-3 py-1 border rounded">
              Cancel
            </button>
            <button type="submit" className="px-3 py-1 bg-blue-600 text-white rounded">
              {mutation.isPending ? "Submitting..." : "Submit"}
            </button>
          </div>
          {mutation.isError && <div className="text-red-500">Failed to apply</div>}
        </form>
      </div>
    </div>
  );
}
