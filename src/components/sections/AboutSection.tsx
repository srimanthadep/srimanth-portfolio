import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, User, Heart } from "lucide-react";

export function AboutSection() {
  const personalInfo = [
    { label: "Date of Birth", value: "13/02/2005", icon: Calendar },
    { label: "Gender", value: "Male", icon: User },
    { label: "Nationality", value: "Indian", icon: MapPin },
    { label: "Hobbies", value: "Programming, Learning New Technologies", icon: Heart },
  ];

  const languages = ["Telugu", "English", "Hindi"];

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
            About Me
          </h2>
          <div className="w-24 h-1 bg-gradient-primary mx-auto rounded-full mb-8"></div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Card className="backdrop-blur-glass bg-card/80 border-border shadow-glass">
              <CardContent className="p-8">
                <h3 className="text-2xl font-semibold mb-6 text-foreground">Objective</h3>
                <p className="text-muted-foreground leading-relaxed mb-8">
                  Seeking opportunities to enhance skills and knowledge in computer science and engineering. 
                  I value mutual growth and development with organizations and desire a collaborative, 
                  innovative environment that values creativity and teamwork. My aim is to contribute to 
                  organizational goals while pursuing professional aspirations in technology and software development.
                </p>
                
                <h4 className="text-xl font-semibold mb-4 text-foreground">Languages</h4>
                <div className="flex flex-wrap gap-2">
                  {languages.map((language) => (
                    <Badge key={language} variant="secondary" className="bg-accent text-accent-foreground">
                      {language}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h3 className="text-2xl font-semibold mb-6 text-foreground">Personal Information</h3>
            {personalInfo.map((info, index) => (
              <motion.div
                key={info.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="backdrop-blur-glass bg-card/80 border-border shadow-glass hover:shadow-glow-primary transition-all duration-300">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-4">
                      <div className="p-2 bg-primary/20 rounded-lg">
                        <info.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{info.label}</p>
                        <p className="text-muted-foreground">{info.value}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}