import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Code, Database, Globe } from "lucide-react";

export function ProjectsSection() {
  const projects = [
    {
      title: "Fake News Detection Using R and ML",
      description: "Developed a machine learning model using R to detect and classify fake news articles, implementing various algorithms to improve accuracy and reliability.",
      technologies: ["R", "Machine Learning", "Data Analysis", "Classification"],
      icon: Database,
    },
    {
      title: "ShareYourRide – Ride Sharing Platform",
      description: "Created a comprehensive ride sharing platform using HTML, CSS, and JavaScript, featuring user-friendly interfaces and real-time connectivity features.",
      technologies: ["HTML", "CSS", "JavaScript", "Web Development"],
      icon: Globe,
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
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
            Projects
          </h2>
          <div className="w-24 h-1 bg-gradient-primary mx-auto rounded-full mb-8"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="group"
            >
              <Card className="backdrop-blur-glass bg-card/80 border-border shadow-glass hover:shadow-glow-primary transition-all duration-300 h-full group-hover:scale-105">
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-primary/20 rounded-lg group-hover:bg-primary/30 transition-colors">
                      <project.icon className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl text-foreground group-hover:text-primary transition-colors">
                      {project.title}
                    </CardTitle>
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