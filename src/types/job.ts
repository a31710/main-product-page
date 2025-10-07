export interface Job {
  id: string;
  title: string;
  company: string;
  description: string;
  location: string;
  type: "full-time" | "part-time" | "remote";
  created_at: string;
}
