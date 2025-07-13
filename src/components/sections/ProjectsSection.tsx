import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Code, Database, Globe, Smartphone, Github, ExternalLink } from "lucide-react";

export function ProjectsSection() {
  const projects = [
    {
      title: "Personal Portfolio Website",
      description: "A modern, responsive portfolio built with React, TypeScript, and Tailwind CSS. Features animated gradients, 3D effects, and smooth scrolling navigation.",
      technologies: ["React", "TypeScript", "Tailwind CSS", "Framer Motion", "Vite"],
      icon: Code,
      github: "https://github.com/yourusername/portfolio",
      demo: "https://your-portfolio.com",
      featured: true,
    },
    {
      title: "Fake News Detection Using R and ML",
      description: "Developed a machine learning model using R to detect and classify fake news articles, implementing various algorithms to improve accuracy and reliability.",
      technologies: ["R", "Machine Learning", "Data Analysis", "Classification"],
      icon: Database,
      github: "https://github.com/yourusername/fake-news-detection",
      demo: null,
      featured: true,
    },
    {
      title: "ShareYourRide – Ride Sharing Platform",
      description: "Created a comprehensive ride sharing platform using HTML, CSS, and JavaScript, featuring user-friendly interfaces and real-time connectivity features.",
      technologies: ["HTML", "CSS", "JavaScript", "Web Development"],
      icon: Globe,
      github: "https://github.com/yourusername/shareyourride",
      demo: "https://shareyourride-demo.com",
      featured: false,
    },
    {
      title: "Task Management App",
      description: "A full-stack task management application with user authentication, real-time updates, and drag-and-drop functionality.",
      technologies: ["React", "Node.js", "MongoDB", "Express", "Socket.io"],
      icon: Smartphone,
      github: "https://github.com/yourusername/task-manager",
      demo: "https://task-manager-demo.com",
      featured: false,
    },
  ];

  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent tracking-wide leading-normal font-[Inter] pb-2 px-2">
            Projects
          </h2>
          <div className="w-24 h-1 bg-gradient-primary mx-auto rounded-full mb-8"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className={`group ${project.featured ? 'md:col-span-2' : ''}`}
            >
              <Card className={`backdrop-blur-glass bg-card/80 border-border shadow-glass hover:shadow-glow-primary transition-all duration-300 h-full group-hover:scale-105 ${
                project.featured ? 'ring-2 ring-primary' : ''
              }`}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-primary/20 rounded-lg group-hover:bg-primary/30 transition-colors">
                        <project.icon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-xl text-foreground group-hover:text-primary transition-colors">
                          {project.title}
                        </CardTitle>
                        {project.featured && (
                          <Badge variant="default" className="mt-2 bg-primary text-primary-foreground">
                            Featured Project
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 bg-secondary hover:bg-secondary/80 rounded-lg transition-colors"
                        >
                          <Github className="w-4 h-4" />
                        </a>
                      )}
                      {project.demo && (
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 bg-secondary hover:bg-secondary/80 rounded-lg transition-colors"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, techIndex) => (
                      <Badge 
                        key={techIndex} 
                        variant="secondary" 
                        className="bg-accent/20 text-accent-foreground hover:bg-accent/30 transition-colors"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}