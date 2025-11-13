import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, User, Heart } from "lucide-react";
import GlareHover from "../effects/GlareHover";

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

        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
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
              style={{ width: '100%' }}
            >
              <Card className="backdrop-blur-glass bg-card/80 border-border shadow-glass hover:shadow-glow-primary transition-all duration-300 h-full">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-semibold mb-6 text-foreground">About Me</h3>
                  <div className="space-y-6 text-muted-foreground leading-relaxed">
                    <p>
                      I'm a passionate Computer Science Engineering student specializing in Data Science, with a strong foundation in both theoretical concepts and practical applications. My journey in technology began with a curiosity to understand how data can drive meaningful insights and create impactful solutions.
                    </p>
                    <p>
                      I believe in continuous learning and staying updated with the latest technologies. My goal is to leverage my skills in machine learning, web development, and data analysis to solve real-world problems and contribute to innovative projects that make a difference.
                    </p>
                    <p>
                      When I'm not coding, you'll find me exploring new technologies, participating in hackathons, or collaborating with fellow developers on exciting projects. I'm always eager to take on new challenges and grow both personally and professionally.
                    </p>
                  </div>
                  
                  <div className="mt-8">
                    <h4 className="text-xl font-semibold mb-4 text-foreground">Languages</h4>
                    <div className="flex flex-wrap gap-2">
                      {languages.map((language) => (
                        <Badge key={language} variant="secondary" className="bg-primary/20 text-primary hover:bg-primary/30 transition-colors duration-300">
                          {language}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </GlareHover>
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
                <Card className="backdrop-blur-glass bg-card/80 border-border shadow-glass hover:shadow-glow-primary transition-all duration-300 group">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-primary/20 rounded-lg group-hover:bg-primary/30 transition-colors duration-300">
                        <info.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div className="flex-1">
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