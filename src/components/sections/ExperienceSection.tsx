import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Briefcase, Calendar, MapPin } from "lucide-react";

export function ExperienceSection() {
  const experiences = [
    {
      company: "NSS, Hyderabad, India",
      position: "Volunteer",
      date: "April 2023 – Current",
      location: "Hyderabad, India",
      current: true,
      responsibilities: [
        "Supported engaging, fun, and smooth-running events through meticulous organization and planning",
        "Utilized strong interpersonal communication skills to effectively convey information to diverse audiences",
        "Maintained clean, neat, and operational facilities to serve program needs and ensure optimal functionality",
      ],
    },
    {
      company: "Kriya, Hyderabad, India",
      position: "Intern",
      date: "May 2023 – Mar 2024",
      location: "Hyderabad, India",
      current: false,
      responsibilities: [
        "Sorted and organized files, spreadsheets, and reports to improve workflow efficiency",
        "Analyzed complex problems and collaborated with cross-functional teams to develop innovative solutions",
        "Explored new technologies and approaches to streamline processes and enhance productivity",
        "Participated in workshops and presentations related to projects to gain comprehensive knowledge",
      ],
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
            Work Experience
          </h2>
          <div className="w-24 h-1 bg-gradient-primary mx-auto rounded-full mb-8"></div>
        </motion.div>

        <div className="max-w-4xl mx-auto space-y-8">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <Card className={`backdrop-blur-glass bg-card/80 border-border shadow-glass hover:shadow-glow-primary transition-all duration-300 ${
                exp.current ? 'ring-2 ring-primary' : ''
              }`}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-primary/20 rounded-lg">
                        <Briefcase className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-xl text-foreground">{exp.company}</CardTitle>
                        <p className="text-lg text-muted-foreground">{exp.position}</p>
                        <div className="flex items-center space-x-4 mt-2 text-sm text-muted-foreground">
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4" />
                            <span>{exp.date}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MapPin className="w-4 h-4" />
                            <span>{exp.location}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    {exp.current && (
                      <Badge variant="default" className="bg-primary text-primary-foreground">
                        Current
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {exp.responsibilities.map((responsibility, respIndex) => (
                      <motion.li
                        key={respIndex}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: respIndex * 0.1 }}
                        viewport={{ once: true }}
                        className="flex items-start space-x-3"
                      >
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-muted-foreground">{responsibility}</span>
                      </motion.li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}