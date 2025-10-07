import { PrismaClient, JobType } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Start seeding...");

  console.log("Deleting all existing jobs and applications...");
  await prisma.application.deleteMany({});
  await prisma.job.deleteMany({});
  console.log("All existing data deleted.");

  const jobs = [
    {
      title: "Senior Frontend Developer",
      description:
        "We are looking for an experienced Frontend Developer with expertise in React and TypeScript to build modern web applications.",
      location: "Ho Chi Minh City",
      type: JobType.full_time,
      visibility: true,
    },
    {
      title: "Backend Engineer",
      description:
        "Join our team to build scalable backend systems using Node.js and PostgreSQL. Experience with microservices is a plus.",
      location: "Hanoi",
      type: JobType.full_time,
      visibility: true,
    },
    {
      title: "UI/UX Designer",
      description:
        "Create beautiful and intuitive user interfaces for our web applications. Must have strong portfolio.",
      location: "Da Nang",
      type: JobType.part_time,
      visibility: true,
    },
    {
      title: "DevOps Engineer",
      description:
        "Manage our cloud infrastructure and CI/CD pipelines. AWS and Kubernetes experience required.",
      location: "Remote",
      type: JobType.remote,
      visibility: true,
    },
    {
      title: "Full Stack Developer",
      description:
        "Work on both frontend and backend technologies to deliver complete features. Must know React and Node.js.",
      location: "Ho Chi Minh City",
      type: JobType.full_time,
      visibility: true,
    },
    {
      title: "Mobile Developer",
      description:
        "Develop cross-platform mobile applications using React Native. iOS and Android experience preferred.",
      location: "Hanoi",
      type: JobType.full_time,
      visibility: true,
    },
    {
      title: "Data Analyst",
      description:
        "Analyze data and provide insights to drive business decisions. Strong SQL and Python skills required.",
      location: "Remote",
      type: JobType.remote,
      visibility: true,
    },
    {
      title: "QA Engineer",
      description:
        "Ensure the quality of our products through comprehensive testing. Experience with automation testing tools.",
      location: "Ho Chi Minh City",
      type: JobType.part_time,
      visibility: true,
    },
    {
      title: "Product Manager",
      description:
        "Lead product development and work closely with engineering teams. 3+ years of PM experience required.",
      location: "Hanoi",
      type: JobType.full_time,
      visibility: true,
    },
    {
      title: "Technical Writer",
      description:
        "Create clear and concise documentation for our APIs and SDKs. Strong writing skills essential.",
      location: "Remote",
      type: JobType.part_time,
      visibility: true,
    },
    {
      title: "Cloud Architect",
      description:
        "Design and implement cloud infrastructure solutions. Expert-level AWS/Azure knowledge required.",
      location: "Ho Chi Minh City",
      type: JobType.full_time,
      visibility: true,
    },
    {
      title: "Machine Learning Engineer",
      description:
        "Build and deploy ML models for production. Experience with TensorFlow and PyTorch required.",
      location: "Hanoi",
      type: JobType.full_time,
      visibility: true,
    },
    {
      title: "Security Engineer",
      description:
        "Protect our systems from security threats. CISSP or similar certification preferred.",
      location: "Remote",
      type: JobType.remote,
      visibility: true,
    },
    {
      title: "Business Analyst",
      description:
        "Bridge the gap between business needs and technical solutions. Strong analytical skills needed.",
      location: "Da Nang",
      type: JobType.full_time,
      visibility: true,
    },
    {
      title: "iOS Developer",
      description:
        "Build native iOS applications using Swift. App Store publishing experience required.",
      location: "Ho Chi Minh City",
      type: JobType.full_time,
      visibility: true,
    },
    {
      title: "Android Developer",
      description:
        "Create native Android apps using Kotlin. Material Design expertise preferred.",
      location: "Hanoi",
      type: JobType.full_time,
      visibility: true,
    },
    {
      title: "System Administrator",
      description:
        "Maintain and monitor our server infrastructure. Linux administration skills required.",
      location: "Ho Chi Minh City",
      type: JobType.full_time,
      visibility: true,
    },
    {
      title: "Scrum Master",
      description:
        "Facilitate agile processes and remove impediments for the team. CSM certification required.",
      location: "Remote",
      type: JobType.remote,
      visibility: true,
    },
    {
      title: "Database Administrator",
      description:
        "Manage and optimize our database systems. PostgreSQL and MySQL expertise needed.",
      location: "Da Nang",
      type: JobType.full_time,
      visibility: true,
    },
    {
      title: "Content Writer",
      description:
        "Create engaging content for our blog and marketing materials. SEO knowledge is a plus.",
      location: "Remote",
      type: JobType.part_time,
      visibility: true,
    },
    {
      title: "Network Engineer",
      description:
        "Design and maintain network infrastructure. CCNA or CCNP certification preferred.",
      location: "Hanoi",
      type: JobType.full_time,
      visibility: true,
    },
    {
      title: "Data Scientist",
      description:
        "Extract insights from large datasets using statistical methods and ML. PhD in relevant field preferred.",
      location: "Ho Chi Minh City",
      type: JobType.full_time,
      visibility: true,
    },
    {
      title: "Frontend Designer",
      description:
        "Create pixel-perfect UI implementations from designs. Strong CSS and animation skills required.",
      location: "Remote",
      type: JobType.remote,
      visibility: true,
    },
    {
      title: "Software Architect",
      description:
        "Design scalable software architectures for enterprise applications. 10+ years experience required.",
      location: "Ho Chi Minh City",
      type: JobType.full_time,
      visibility: true,
    },
    {
      title: "Sales Engineer",
      description:
        "Provide technical expertise during the sales process. Technical background and sales skills needed.",
      location: "Hanoi",
      type: JobType.full_time,
      visibility: true,
    },
    {
      title: "Customer Support Engineer",
      description:
        "Help customers solve technical issues. Strong communication and troubleshooting skills required.",
      location: "Remote",
      type: JobType.remote,
      visibility: true,
    },
    {
      title: "Game Developer",
      description:
        "Create engaging game experiences using Unity or Unreal Engine. Portfolio required.",
      location: "Da Nang",
      type: JobType.full_time,
      visibility: true,
    },
    {
      title: "Blockchain Developer",
      description:
        "Build decentralized applications and smart contracts. Solidity experience required.",
      location: "Remote",
      type: JobType.remote,
      visibility: true,
    },
    {
      title: "Marketing Automation Specialist",
      description:
        "Implement and manage marketing automation tools. HubSpot or Marketo experience preferred.",
      location: "Ho Chi Minh City",
      type: JobType.part_time,
      visibility: true,
    },
    {
      title: "Solutions Architect",
      description:
        "Design technical solutions for client needs. Experience with cloud platforms required.",
      location: "Hanoi",
      type: JobType.full_time,
      visibility: true,
    },
    {
      title: "Embedded Systems Engineer",
      description:
        "Develop firmware for embedded devices. C/C++ and hardware knowledge required.",
      location: "Ho Chi Minh City",
      type: JobType.full_time,
      visibility: true,
    },
    {
      title: "IT Project Manager",
      description:
        "Manage software development projects from inception to delivery. PMP certification preferred.",
      location: "Da Nang",
      type: JobType.full_time,
      visibility: true,
    },
    {
      title: "Performance Engineer",
      description:
        "Optimize application performance and scalability. Experience with profiling tools required.",
      location: "Remote",
      type: JobType.remote,
      visibility: true,
    },
    {
      title: "Site Reliability Engineer",
      description:
        "Ensure high availability and reliability of production systems. SRE experience required.",
      location: "Hanoi",
      type: JobType.full_time,
      visibility: true,
    },
    {
      title: "AI Research Engineer",
      description:
        "Research and develop cutting-edge AI algorithms. PhD in CS or related field preferred.",
      location: "Ho Chi Minh City",
      type: JobType.full_time,
      visibility: true,
    },
    {
      title: "Penetration Tester",
      description:
        "Identify and exploit security vulnerabilities. CEH or OSCP certification required.",
      location: "Remote",
      type: JobType.remote,
      visibility: true,
    },
    {
      title: "UX Researcher",
      description:
        "Conduct user research to inform product design decisions. Experience with user testing required.",
      location: "Da Nang",
      type: JobType.part_time,
      visibility: true,
    },
    {
      title: "Integration Engineer",
      description:
        "Build integrations between different systems and APIs. Experience with RESTful APIs required.",
      location: "Hanoi",
      type: JobType.full_time,
      visibility: true,
    },
    {
      title: "Release Manager",
      description:
        "Coordinate software releases and deployments. Experience with CI/CD pipelines required.",
      location: "Ho Chi Minh City",
      type: JobType.full_time,
      visibility: true,
    },
    {
      title: "Computer Vision Engineer",
      description:
        "Develop computer vision solutions using deep learning. OpenCV and PyTorch experience required.",
      location: "Remote",
      type: JobType.remote,
      visibility: true,
    },
  ];

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
