/* eslint-disable @typescript-eslint/no-explicit-any */
import "dotenv/config";
import admin from "firebase-admin";

const serviceAccountB64 = process.env.FIREBASE_SERVICE_ACCOUNT_B64;

if (!serviceAccountB64) {
  console.error("Missing FIREBASE_SERVICE_ACCOUNT_B64 environment variable!");
  process.exit(1);
}

try {
  const saText = Buffer.from(serviceAccountB64, 'base64').toString('utf8');
  const sa = JSON.parse(saText);
  
  if (sa.private_key && typeof sa.private_key === 'string') {
    sa.private_key = sa.private_key.replace(/\\n/g, '\n');
  }

  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(sa),
    });
  }
  
  const db = admin.firestore();
  console.log("Firebase Admin initialized for seeding...");

  const data = {
    experiences: [
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
        ]
      },
      {
        company: "Kriya, Hyderabad, India",
        logo: "",
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
        ]
      }
    ],
    education: [
      {
        institution: "Anurag University (AU), Hyderabad",
        degree: "B.Tech in Computer Science and Engineering",
        grade: "CGPA: 7.94",
        date: "Expected Mar 2026",
        current: true
      },
      {
        institution: "Sri Gayatri Jr College, Hyderabad",
        degree: "Intermediate",
        grade: "Percentage: 72.4%",
        date: "May 2022",
        current: false
      },
      {
        institution: "Bhashyam High School, Hyderabad",
        degree: "SSC",
        grade: "CGPA: 9.5",
        date: "Mar 2020",
        current: false
      }
    ],
    projects: [
      {
        title: "Personal Portfolio Website",
        description: "A modern, responsive portfolio built with React, TypeScript, and Tailwind CSS. Features animated gradients, 3D effects, and smooth scrolling navigation.",
        technologies: ["React", "TypeScript", "Tailwind CSS", "Framer Motion", "Vite"],
        icon: "Code",
        github: "https://github.com/srimanthadep/portfolio",
        demo: "https://srimanthadep.com",
        featured: true
      },
      {
        title: "Fake News Detection Using R and ML",
        description: "Developed a machine learning model using R to detect and classify fake news articles, implementing various algorithms to improve accuracy and reliability.",
        technologies: ["R", "Machine Learning", "Data Analysis", "Classification"],
        icon: "Database",
        github: "https://github.com/srimanthadep/fake-news-detection",
        demo: null,
        featured: true
      },
      {
        title: "ShareYourRide – Ride Sharing Platform",
        description: "Created a comprehensive ride sharing platform using HTML, CSS, and JavaScript, featuring user-friendly interfaces and real-time connectivity features.",
        technologies: ["HTML", "CSS", "JavaScript", "Web Development"],
        icon: "Globe",
        github: "https://github.com/srimanthadep/shareyourride",
        demo: null,
        featured: false
      }
    ],
    skills: [
      { category: "Programming Languages", name: "Python", level: 85, icon: "Code", color: "bg-blue-500/20 text-blue-400" },
      { category: "Programming Languages", name: "Java", level: 80, icon: "Code", color: "bg-blue-500/20 text-blue-400" },
      { category: "Programming Languages", name: "C", level: 75, icon: "Code", color: "bg-blue-500/20 text-blue-400" },
      { category: "Programming Languages", name: "JavaScript", level: 70, icon: "Code", color: "bg-blue-500/20 text-blue-400" },
      { category: "Programming Languages", name: "TypeScript", level: 65, icon: "Code", color: "bg-blue-500/20 text-blue-400" },
      { category: "Web Development", name: "React", level: 75, icon: "Globe", color: "bg-green-500/20 text-green-400" },
      { category: "Web Development", name: "HTML5", level: 90, icon: "Globe", color: "bg-green-500/20 text-green-400" },
      { category: "Web Development", name: "CSS3", level: 85, icon: "Globe", color: "bg-green-500/20 text-green-400" },
      { category: "Web Development", name: "Node.js", level: 60, icon: "Globe", color: "bg-green-500/20 text-green-400" },
      { category: "Web Development", name: "Git", level: 80, icon: "Globe", color: "bg-green-500/20 text-green-400" },
      { category: "Data Science & Others", name: "Machine Learning", level: 70, icon: "Database", color: "bg-purple-500/20 text-purple-400" },
      { category: "Data Science & Others", name: "DBMS", level: 75, icon: "Database", color: "bg-purple-500/20 text-purple-400" },
      { category: "Data Science & Others", name: "Data Analysis", level: 80, icon: "Database", color: "bg-purple-500/20 text-purple-400" },
      { category: "Data Science & Others", name: "Team Leadership", level: 85, icon: "Database", color: "bg-purple-500/20 text-purple-400" },
      { category: "Data Science & Others", name: "Problem Solving", level: 90, icon: "Database", color: "bg-purple-500/20 text-purple-400" }
    ],
    site_settings: [
      { key: "hero_name", value: "SRIMANTH ADEP" },
      { key: "hero_subtitle", value: "Computer Science Engineering in Data Science Student" },
      { key: "hero_tagline", value: "Transforming ideas into elegant, user-centric digital experiences through innovative code and creative problem-solving." },
      { key: "location", value: "Hyderabad, India" },
      { key: "phone", value: "+91 9912885813" },
      { key: "email", value: "srimanthadep@gmail.com" },
      { key: "linkedin", value: "https://linkedin.com/in/srimanthadep" },
      { key: "resume_url", value: "/Srimanth_Adep_Resume.pdf" },
      { key: "certifications", value: JSON.stringify([
        { name: "Python", provider: "Infosys Springboard, HackerRank" },
        { name: "Java", provider: "Infosys Springboard" },
        { name: "Data Structures", provider: "Infosys Springboard" },
        { name: "HTML5 & CSS", provider: "Infosys Springboard" },
        { name: "DBMS", provider: "Infosys Springboard" }
      ])}
    ]
  };

  async function seed() {
    console.log("Starting seeding process...");
    
    const collections = Object.keys(data);
    for (const collection of collections) {
      console.log(`Seeding ${collection}...`);
      const collectionRef = db.collection(collection);
      
      // Clear existing docs
      const snapshot = await collectionRef.get();
      const batch = db.batch();
      snapshot.docs.forEach((doc) => batch.delete(doc.ref));
      await batch.commit();
      console.log(`Cleared ${collection}`);

      // Add new docs
      const items = (data as any)[collection];
      for (const item of items) {
        await collectionRef.add({
          ...item,
          createdAt: admin.firestore.FieldValue.serverTimestamp(),
          updatedAt: admin.firestore.FieldValue.serverTimestamp()
        });
      }
      console.log(`Finished ${collection}`);
    }
    
    console.log("Seeding complete! Data restored successfully.");
    process.exit(0);
  }

  seed().catch((err) => {
    console.error("Error seeding:", err);
    process.exit(1);
  });

} catch (err: any) {
  console.error("Error initializing Firebase Admin SDK:", err.message);
  process.exit(1);
}
