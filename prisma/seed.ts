import { PrismaClient, JobType } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Start seeding...");

  const jobs = [
    {
      title: "Senior Frontend Developer",
      description:
        "We are looking for an experienced Frontend Developer with expertise in React and TypeScript.",
      location: "Ho Chi Minh City",
      type: JobType.full_time,
      visibility: true,
    },
    {
      title: "Backend Engineer",
      description: "Join our team to build scalable backend systems using Node.js and PostgreSQL.",
      location: "Hanoi",
      type: JobType.full_time,
      visibility: true,
    },
    {
      title: "UI/UX Designer",
      description: "Create beautiful and intuitive user interfaces for our web applications.",
      location: "Da Nang",
      type: JobType.part_time,
      visibility: true,
    },
    {
      title: "DevOps Engineer",
      description: "Manage our cloud infrastructure and CI/CD pipelines.",
      location: "Remote",
      type: JobType.remote,
      visibility: true,
    },
    {
      title: "Full Stack Developer",
      description: "Work on both frontend and backend technologies to deliver complete features.",
      location: "Ho Chi Minh City",
      type: JobType.full_time,
      visibility: true,
    },
    {
      title: "Mobile Developer",
      description: "Develop cross-platform mobile applications using React Native.",
      location: "Hanoi",
      type: JobType.full_time,
      visibility: true,
    },
    {
      title: "Data Analyst",
      description: "Analyze data and provide insights to drive business decisions.",
      location: "Remote",
      type: JobType.remote,
      visibility: true,
    },
    {
      title: "QA Engineer",
      description: "Ensure the quality of our products through comprehensive testing.",
      location: "Ho Chi Minh City",
      type: JobType.part_time,
      visibility: true,
    },
    {
      title: "Product Manager",
      description: "Lead product development and work closely with engineering teams.",
      location: "Hanoi",
      type: JobType.full_time,
      visibility: true,
    },
    {
      title: "Technical Writer",
      description: "Create clear and concise documentation for our APIs and SDKs.",
      location: "Remote",
      type: JobType.part_time,
      visibility: true,
    },
  ];

  for (const job of jobs) {
    await prisma.job.create({ data: job });
    console.log(`Created job: ${job.title}`);
  }

  console.log("Seeding finished.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
