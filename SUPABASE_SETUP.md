# Supabase Storage Setup

To enable resume uploads for job applications, you need to create a storage bucket in your Supabase project.

## Steps to Create the Storage Bucket

1. Go to your Supabase Dashboard: https://hyyuuowjgugszledtywi.supabase.co
2. Navigate to **Storage** in the left sidebar
3. Click **New bucket**
4. Configure the bucket with these settings:
   - **Name**: `resumes`
   - **Public bucket**: Yes (enabled)
   - **File size limit**: 5242880 (5MB)
   - **Allowed MIME types**:
     - `application/pdf`
     - `application/msword`
     - `application/vnd.openxmlformats-officedocument.wordprocessingml.document`
5. Click **Create bucket**

## Verify Setup

Once the bucket is created, the application will automatically:
- Upload resume files when users submit job applications
- Store files with unique names to prevent conflicts
- Generate public URLs for accessing the resumes
- Validate file types (PDF, DOC, DOCX) and size (max 5MB)

## Alternative: Using Supabase CLI

If you prefer to set up the bucket via CLI:

```bash
supabase storage buckets create resumes --public
```

Then configure the bucket policies in the Supabase Dashboard under Storage > Policies.
