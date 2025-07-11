import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Code, Globe, Database, Award, Users } from "lucide-react";

export function SkillsSection() {
  const skillCategories = [
    {
      title: "Programming Languages",
      icon: Code,
      skills: ["Python", "C", "Java"],
      color: "bg-blue-500/20 text-blue-400",
    },
    {
      title: "Web Development",
      icon: Globe,
      skills: ["HTML", "CSS"],
      color: "bg-green-500/20 text-green-400",
    },
    {
      title: "Database & Others",
      icon: Database,
      skills: ["DBMS", "Team Leadership"],
      color: "bg-purple-500/20 text-purple-400",
    },
  ];

  const certifications = [
    { name: "Python", provider: "Infosys Springboard, HackerRank" },
    { name: "Java", provider: "Infosys Springboard" },
    { name: "Data Structures", provider: "Infosys Springboard" },
    { name: "HTML5 & CSS", provider: "Infosys Springboard" },
    { name: "DBMS", provider: "Infosys Springboard" },
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
            Skills & Certifications
          </h2>
          <div className="w-24 h-1 bg-gradient-primary mx-auto rounded-full mb-8"></div>
        </motion.div>

        {/* Skills */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {skillCategories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="backdrop-blur-glass bg-card/80 border-border shadow-glass hover:shadow-glow-primary transition-all duration-300 h-full">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className={`p-3 rounded-lg ${category.color}`}>
                      <category.icon className="w-6 h-6" />
                    </div>
                    <CardTitle className="text-lg text-foreground">{category.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill, skillIndex) => (
                      <motion.div
                        key={skillIndex}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: skillIndex * 0.1 }}
                        viewport={{ once: true }}
                      >
                        <Badge 
                          variant="default" 
                          className="bg-primary text-primary-foreground hover:bg-primary/80 transition-colors"
                        >
                          {skill}
                        </Badge>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <h3 className="text-2xl font-semibold mb-8 text-center text-foreground">Certifications</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certifications.map((cert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="backdrop-blur-glass bg-card/80 border-border shadow-glass hover:shadow-glow-accent transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-3">
                      <div className="p-2 bg-accent/20 rounded-lg">
                        <Award className="w-5 h-5 text-accent" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground">{cert.name}</h4>
                        <p className="text-sm text-muted-foreground">{cert.provider}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}