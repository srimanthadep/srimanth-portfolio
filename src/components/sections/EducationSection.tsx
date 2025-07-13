import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, Calendar } from "lucide-react";
import GlareHover from "../GlareHover";

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

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Timeline line removed */}
            
            {education.map((edu, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="relative mb-8"
              >
                {/* Timeline dot removed */}
                
                <Card className={`backdrop-blur-glass bg-card/80 border-border shadow-glass hover:shadow-glow-primary transition-all duration-300 ${
                  edu.current ? 'ring-2 ring-primary' : ''
                }`} style={{ overflow: 'hidden', borderRadius: '1rem' }}>
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-primary/20 rounded-lg">
                          <GraduationCap className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <CardTitle className="text-lg text-foreground">{edu.institution}</CardTitle>
                          <p className="text-muted-foreground">{edu.degree}</p>
                        </div>
                      </div>
                      <div className="flex flex-col items-end space-y-2">
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
                  <GlareHover
                    glareColor="#ffffff"
                    glareOpacity={0.3}
                    glareAngle={-30}
                    glareSize={300}
                    transitionDuration={800}
                    playOnce={false}
                    width="100%"
                    height="100%"
                    background="transparent"
                    borderRadius="1rem"
                    borderColor="transparent"
                    style={{ width: '100%', borderRadius: '1rem', overflow: 'hidden' }}
                  >
                    <CardContent>
                      <div className="text-accent font-semibold">{edu.grade}</div>
                    </CardContent>
                  </GlareHover>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}