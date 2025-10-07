import { PrismaClient, JobType } from "@prisma/client";

const prisma = new PrismaClient();

const jobTitles = [
  "Senior Frontend Developer",
  "Backend Engineer",
  "UI/UX Designer",
  "DevOps Engineer",
  "Full Stack Developer",
  "Mobile Developer",
  "Data Analyst",
  "QA Engineer",
  "Product Manager",
  "Technical Writer",
  "Cloud Architect",
  "Machine Learning Engineer",
  "Security Engineer",
  "Business Analyst",
  "iOS Developer",
  "Android Developer",
  "System Administrator",
  "Scrum Master",
  "Database Administrator",
  "Content Writer",
  "Network Engineer",
  "Data Scientist",
  "Frontend Designer",
  "Software Architect",
  "Sales Engineer",
  "Customer Support Engineer",
  "Game Developer",
  "Blockchain Developer",
  "Marketing Automation Specialist",
  "Solutions Architect",
  "Embedded Systems Engineer",
  "IT Project Manager",
  "Performance Engineer",
  "Site Reliability Engineer",
  "AI Research Engineer",
  "Penetration Tester",
  "UX Researcher",
  "Integration Engineer",
  "Release Manager",
  "Computer Vision Engineer",
  "API Developer",
  "Infrastructure Engineer",
  "Quality Assurance Lead",
  "Technical Support Specialist",
  "Software Development Manager",
];

const descriptions = [
  "We are looking for an experienced professional with expertise in modern technologies to build scalable applications.",
  "Join our team to work on cutting-edge projects using the latest frameworks and tools.",
  "Create innovative solutions that drive business value and user satisfaction.",
  "Collaborate with cross-functional teams to deliver high-quality products.",
  "Build and maintain robust systems with focus on performance and reliability.",
  "Design and implement features that enhance user experience and engagement.",
  "Work with industry-leading tools and technologies in a dynamic environment.",
  "Contribute to the architecture and technical direction of our platform.",
  "Develop comprehensive solutions that meet business requirements and technical standards.",
  "Lead projects from conception to deployment with attention to detail.",
];

const locations = ["Ho Chi Minh City", "Hanoi", "Da Nang", "Remote", "Can Tho", "Hai Phong", "Nha Trang"];

const jobTypes = [JobType.full_time, JobType.part_time, JobType.remote];

async function main() {
  console.log("Start seeding...");

  console.log("Deleting all existing jobs and applications...");
  await prisma.application.deleteMany({});
  await prisma.job.deleteMany({});
  console.log("All existing data deleted.");

  const jobs = [];

  for (let i = 0; i < 135; i++) {
    const titleIndex = i % jobTitles.length;
    const locationIndex = i % locations.length;
    const typeIndex = i % jobTypes.length;
    const descriptionIndex = i % descriptions.length;

    const suffix = i >= jobTitles.length ? ` ${Math.floor(i / jobTitles.length) + 1}` : "";

    jobs.push({
      title: jobTitles[titleIndex] + suffix,
      description: descriptions[descriptionIndex],
      location: locations[locationIndex],
      type: jobTypes[typeIndex],
      visibility: true,
    });
  }

  for (const job of jobs) {
    await prisma.job.create({ data: job });
    console.log(`Created job: ${job.title}`);
  }

  console.log(`Seeding finished. Created ${jobs.length} jobs.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
