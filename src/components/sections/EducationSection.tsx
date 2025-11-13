import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, Calendar } from "lucide-react";
import GlareHover from "../effects/GlareHover";

export function EducationSection() {
  const education = [
    {
      institution: "Anurag University (AU), Hyderabad",
      degree: "B.Tech in Computer Science and Engineering",
      grade: "CGPA: 7.99",
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
            Education
          </h2>
          <div className="w-24 h-1 bg-gradient-primary mx-auto rounded-full mb-8"></div>
        </motion.div>

        <div className="max-w-4xl mx-auto space-y-8">
          {education.map((edu, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="relative"
            >
              <Card className={`backdrop-blur-glass bg-card/80 border-border shadow-glass hover:shadow-glow-primary transition-all duration-300 group ${
                edu.current ? 'ring-2 ring-primary' : ''
              }`} style={{ overflow: 'hidden', borderRadius: '1rem' }}>
                <CardHeader className="pb-4">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                    <div className="flex items-start space-x-4">
                      <div className="p-3 bg-primary/20 rounded-lg group-hover:bg-primary/30 transition-colors duration-300 flex-shrink-0">
                        <GraduationCap className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <CardTitle className="text-xl text-foreground group-hover:text-primary transition-colors duration-300">{edu.institution}</CardTitle>
                        <p className="text-muted-foreground mt-1">{edu.degree}</p>
                      </div>
                    </div>
                    <div className="flex flex-col items-start sm:items-end space-y-2 flex-shrink-0">
                      <Badge variant={edu.current ? "default" : "secondary"} className="flex items-center space-x-1">
                        <Calendar className="w-3 h-3" />
                        <span>{edu.date}</span>
                      </Badge>
                      {edu.current && (
                        <Badge variant="outline" className="text-primary border-primary">
                          Current
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <div className="text-lg font-semibold text-primary text-left">{edu.grade}</div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}