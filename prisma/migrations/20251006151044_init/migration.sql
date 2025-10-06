-- CreateEnum
CREATE TYPE "JobType" AS ENUM ('full_time', 'part_time', 'remote');

-- CreateTable
CREATE TABLE "Job" (
    "id" TEXT NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "description" TEXT NOT NULL,
    "location" VARCHAR(255) NOT NULL,
    "type" "JobType" NOT NULL,
    "visibility" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Job_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Application" (
    "id" TEXT NOT NULL,
    "job_id" TEXT NOT NULL,
    "applicant_name" VARCHAR(255) NOT NULL,
    "applicant_email" VARCHAR(255) NOT NULL,
    "cover_letter" TEXT,
    "resume_path" VARCHAR(255) NOT NULL,
    "applied_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Application_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_job_id_fkey" FOREIGN KEY ("job_id") REFERENCES "Job"("id") ON DELETE CASCADE ON UPDATE CASCADE;
