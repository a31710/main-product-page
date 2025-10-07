import ApplyForm from "@/components/jobs/ApplyForm/ApplyForm";
import JobList from "@/components/jobs/JobList/JobList";

export default function Home() {
  return (
    <main className="p-6">
      <h2 className="text-2xl mb-4">Job Listings</h2>
      {/* JobList is a client component */}
      <JobList />
      {/* ApplyForm is client and mounted at root so modal overlays whole app */}
      <ApplyForm />
    </main>
  );
}
