"use client";
import { useState, useRef } from "react";
import { X, Upload, FileText, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

import styles from "./ApplyForm.module.css";

import { useModalStore } from "@/store/useModalStore";
import { useApplyJob } from "@/hooks/useApplyJob";

export default function ApplyForm() {
  const { isOpen, jobId, close } = useModalStore();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [cover, setCover] = useState("");
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const fileInputRef = useRef<HTMLInputElement>(null);
  const mutation = useApplyJob();

  if (!isOpen) return null;

  const validateEmail = (email: string) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!resumeFile) {
      newErrors.resume = "Please upload your resume";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const maxSize = 5 * 1024 * 1024;
      if (file.size > maxSize) {
        setErrors({ ...errors, resume: "File size must be less than 5MB" });
        return;
      }

      const allowedTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];
      if (!allowedTypes.includes(file.type)) {
        setErrors({ ...errors, resume: "Only PDF and DOC files are allowed" });
        return;
      }

      setResumeFile(file);
      setErrors({ ...errors, resume: "" });
    }
  };

  const uploadResume = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to upload resume");
    }

    const result = await response.json();
    return result.data.path;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fix the errors in the form");
      return;
    }

    try {
      setUploading(true);
      const resumePath = await uploadResume(resumeFile!);

      mutation.mutate(
        {
          jobId: jobId!,
          applicant_name: name,
          applicant_email: email,
          cover_letter: cover || undefined,
          resume_path: resumePath,
        },
        {
          onSuccess: () => {
            toast.success("Application submitted successfully!");
            resetForm();
            close();
          },
          onError: () => {
            toast.error("Failed to submit application. Please try again.");
          },
        }
      );
    } catch {
      toast.error("Failed to upload resume. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const resetForm = () => {
    setName("");
    setEmail("");
    setCover("");
    setResumeFile(null);
    setErrors({});
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleClose = () => {
    resetForm();
    close();
  };

  return (
    <div className={styles.overlay} onClick={handleClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2 className={styles.title}>Apply for Position</h2>
          <button onClick={handleClose} className={styles.closeButton} aria-label="Close">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="name" className={styles.label}>
              Full Name <span className={styles.required}>*</span>
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (errors.name) setErrors({ ...errors, name: "" });
              }}
              className={`${styles.input} ${errors.name ? styles.inputError : ""}`}
              placeholder="John Doe"
            />
            {errors.name && <span className={styles.errorText}>{errors.name}</span>}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.label}>
              Email Address <span className={styles.required}>*</span>
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errors.email) setErrors({ ...errors, email: "" });
              }}
              className={`${styles.input} ${errors.email ? styles.inputError : ""}`}
              placeholder="john.doe@example.com"
            />
            {errors.email && <span className={styles.errorText}>{errors.email}</span>}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="resume" className={styles.label}>
              Resume <span className={styles.required}>*</span>
            </label>
            <div className={styles.fileUpload}>
              <input
                ref={fileInputRef}
                id="resume"
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                className={styles.fileInput}
              />
              <label
                htmlFor="resume"
                className={`${styles.fileLabel} ${errors.resume ? styles.fileLabelError : ""}`}
              >
                {resumeFile ? (
                  <div className={styles.fileSelected}>
                    <FileText className="w-5 h-5" />
                    <span className={styles.fileName}>{resumeFile.name}</span>
                  </div>
                ) : (
                  <div className={styles.filePrompt}>
                    <Upload className="w-5 h-5" />
                    <span>Click to upload or drag and drop</span>
                    <span className={styles.fileHint}>PDF or DOC (max 5MB)</span>
                  </div>
                )}
              </label>
            </div>
            {errors.resume && <span className={styles.errorText}>{errors.resume}</span>}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="cover" className={styles.label}>
              Cover Letter <span className={styles.optional}>(Optional)</span>
            </label>
            <textarea
              id="cover"
              value={cover}
              onChange={(e) => setCover(e.target.value)}
              className={styles.textarea}
              placeholder="Tell us why you're a great fit for this position..."
              rows={5}
            />
          </div>

          <div className={styles.actions}>
            <button
              type="button"
              onClick={handleClose}
              className={styles.cancelButton}
              disabled={mutation.isPending || uploading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={styles.submitButton}
              disabled={mutation.isPending || uploading}
            >
              {mutation.isPending || uploading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  {uploading ? "Uploading..." : "Submitting..."}
                </>
              ) : (
                "Submit Application"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
