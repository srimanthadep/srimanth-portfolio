import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";
import * as dotenv from "dotenv";

dotenv.config();

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL must be set in .env");
}

const sql = neon(process.env.DATABASE_URL);
const db = drizzle(sql, { schema });

async function seed() {
  console.log("Seeding database...");

  // 1. Experiences
  await db.insert(schema.experiences).values([
    {
      company: "SmartClient",
      logo: "/smartclient-logo.png",
      position: "Founder",
      date: "2024 – Present",
      location: "Hyderabad, India",
      current: true,
      technologies: ["SaaS", "CRM", "Analytics", "Automation", "Payment Integrations"],
      achievements: [
        "Trusted by 16+ Businesses & Schools",
        "Powering 6+ schools with custom School Management System",
        "Managing payments & profits for 10+ businesses"
      ],
      responsibilities: [
        "Founded SmartClient (smartclient.tech), a comprehensive CRM helping Indian businesses manage customer relationships and sales pipelines.",
        "Developed and deployed core tools including drag-and-drop Sales Pipeline Tracking and a Smart Analytics Dashboard.",
        "Implemented Workflow Automation for repetitive tasks and Team Collaboration features like shared notes and real-time feeds.",
        "Created specialized portal management modules for schools (student/fee/staff tracking) and centralized payment transaction tracking for businesses."
      ],
    },
    {
      company: "Kriya, Hyderabad, India",
      position: "Event Organiser",
      date: "May 2023 – Mar 2024",
      location: "Hyderabad, India",
      current: false,
      technologies: ["Data Analysis", "Problem Solving", "Team Collaboration"],
      achievements: ["Reduced data processing time by 30%", "Implemented 3 new workflow improvements"],
      responsibilities: [
        "Sorted and organized files, spreadsheets, and reports to improve workflow efficiency",
        "Analyzed complex problems and collaborated with cross-functional teams to develop innovative solutions",
        "Explored new technologies and approaches to streamline processes and enhance productivity",
        "Participated in workshops and presentations related to projects to gain comprehensive knowledge"
      ],
    }
  ]);

  // 2. Education
  await db.insert(schema.education).values([
    {
      institution: "Anurag University (AU), Hyderabad",
      degree: "B.Tech in Computer Science and Engineering",
      grade: "CGPA: 7.94",
      date: "Expected Mar 2026",
      current: true,
    },
    {
      institution: "Sri Gayatri Jr College, Hyderabad",
      degree: "Intermediate",
      grade: "Percentage: 72.4%",
      date: "May 2022",
      current: false,
    },
    {
      institution: "Bhashyam High School, Hyderabad",
      degree: "SSC",
      grade: "CGPA: 9.5",
      date: "Mar 2020",
      current: false,
    }
  ]);

  // 3. Projects
  await db.insert(schema.projects).values([
    {
      title: "Personal Portfolio Website",
      description: "A modern, responsive portfolio built with React, TypeScript, and Tailwind CSS. Features animated gradients, 3D effects, and smooth scrolling navigation.",
      technologies: ["React", "TypeScript", "Tailwind CSS", "Framer Motion", "Vite"],
      icon: "Code",
      github: "https://github.com/srimanthadep/portfolio",
      demo: "https://srimanthadep.com",
      featured: true,
    },
    {
      title: "Fake News Detection Using R and ML",
      description: "Developed a machine learning model using R to detect and classify fake news articles, implementing various algorithms to improve accuracy and reliability.",
      technologies: ["R", "Machine Learning", "Data Analysis", "Classification"],
      icon: "Database",
      github: "https://github.com/srimanthadep/fake-news-detection",
      demo: null,
      featured: true,
    },
    {
      title: "ShareYourRide – Ride Sharing Platform",
      description: "Created a comprehensive ride sharing platform using HTML, CSS, and JavaScript, featuring user-friendly interfaces and real-time connectivity features.",
      technologies: ["HTML", "CSS", "JavaScript", "Web Development"],
      icon: "Globe",
      github: "https://github.com/srimanthadep/shareyourride",
      demo: null,
      featured: false,
    }
  ]);

  // 4. Skills
  await db.insert(schema.skills).values([
    {
      category: "Programming Languages",
      items: ["Python", "Java", "C", "JavaScript", "TypeScript"],
    },
    {
      category: "Web Development",
      items: ["React", "HTML5", "CSS3", "Node.js", "Git"],
    },
    {
      category: "Data Science & Others",
      items: ["Machine Learning", "DBMS", "Data Analysis", "Team Leadership", "Problem Solving"],
    }
  ]);

  // 5. Site Settings
  await db.insert(schema.siteSettings).values([
    { key: "hero_name", value: "SRIMANTH ADEP" },
    { key: "hero_subtitle", value: "Computer Science Engineering in Data Science Student" },
    { key: "hero_tagline", value: "Transforming ideas into elegant, user-centric digital experiences through innovative code and creative problem-solving." },
    { key: "location", value: "Hyderabad, India" },
    { key: "phone", value: "+91 9912885813" },
    { key: "email", value: "srimanthadep@gmail.com" },
    { key: "linkedin", value: "https://linkedin.com/in/srimanthadep" },
    { key: "github", value: "https://github.com/srimanthadep" },
    { key: "resume_url", value: "/Srimanth_Adep_Resume.pdf" },
    { key: "about_me_1", value: "I'm a passionate Computer Science Engineering student specializing in Data Science, with a strong foundation in both theoretical concepts and practical applications. My journey in technology began with a curiosity to understand how data can drive meaningful insights and create impactful solutions." },
    { key: "about_me_2", value: "I believe in continuous learning and staying updated with the latest technologies. My goal is to leverage my skills in machine learning, web development, and data analysis to solve real-world problems and contribute to innovative projects that make a difference." },
    { key: "about_me_3", value: "When I'm not coding, you'll find me exploring new technologies, participating in hackathons, or collaborating with fellow developers on exciting projects. I'm always eager to take on new challenges and grow both personally and professionally." }
  ]);

  console.log("Seeding completed successfully!");
}

seed().catch((err) => {
  console.error("Seeding failed:", err);
  process.exit(1);
});
