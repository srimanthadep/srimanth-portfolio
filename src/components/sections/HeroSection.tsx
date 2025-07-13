import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail, MapPin, Phone, Download } from "lucide-react";
import GradientText from "../GradientText";

export function HeroSection() {
  return (
    <section 
      className="min-h-screen flex items-center justify-center relative overflow-hidden py-20"
      aria-labelledby="hero-title"
      role="banner"
    >
      <div className="container mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="space-y-8"
        >
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="relative mt-8"
          >
            <GradientText
              colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
              animationSpeed={3}
              showBorder={false}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-tight"
              id="hero-title"
              aria-label="Srimanth Adep - Full Stack Developer"
            >
              SRIMANTH ADEP
            </GradientText>
          </motion.div>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
          >
            Computer Science Engineering in Data Science Student
          </motion.p>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            className="text-base sm:text-lg md:text-xl text-primary/80 max-w-2xl mx-auto font-medium leading-relaxed px-4"
          >
            "Transforming ideas into elegant, user-centric digital experiences through innovative code and creative problem-solving."
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground px-4"
          >
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span>Hyderabad, India</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              <span>+91 9912885813</span>
            </div>
            <a href="mailto:srimanthadep@gmail.com" className="flex items-center gap-2 hover:text-primary transition-colors duration-300">
              <Mail className="w-4 h-4" />
              <span>srimanthadep@gmail.com</span>
            </a>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 w-full max-w-md mx-auto px-4"
          >
            <Button 
              asChild 
              variant="default" 
              size="lg" 
              className="shadow-glow-primary hover:shadow-glow-primary/80 transition-all duration-300 w-full sm:w-auto group"
            >
              <a 
                href="https://linkedin.com/in/srimanthadep" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Connect with me on LinkedIn (opens in new tab)"
                className="flex items-center justify-center"
              >
                <Linkedin className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-300" aria-hidden="true" />
                LinkedIn
              </a>
            </Button>
            <Button 
              asChild 
              variant="outline" 
              size="lg" 
              className="backdrop-blur-glass hover:shadow-glow-primary transition-all duration-300 w-full sm:w-auto group"
            >
              <a 
                href="#contact"
                aria-label="Navigate to contact section"
                className="flex items-center justify-center"
              >
                <Mail className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-300" aria-hidden="true" />
                Contact Me
              </a>
            </Button>
            <Button 
              asChild 
              variant="outline" 
              size="lg" 
              className="backdrop-blur-glass hover:shadow-glow-primary transition-all duration-300 w-full sm:w-auto group"
            >
              <a 
                href="/resume.pdf" 
                download
                aria-label="Download my resume as PDF"
                className="flex items-center justify-center"
              >
                <Download className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-300" aria-hidden="true" />
                Download Resume
              </a>
            </Button>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: -100 }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
            className="absolute w-1 h-1 bg-primary rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>
    </section>
  );
}