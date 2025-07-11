import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail, MapPin, Phone } from "lucide-react";

export function HeroSection() {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
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
            className="relative"
          >
            <h1 className="text-6xl md:text-8xl font-bold bg-gradient-primary bg-clip-text text-transparent animate-glow">
              SRIMANTH ADEP
            </h1>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ 
                scale: [0.8, 1.1, 1],
                opacity: [0, 0.8, 0.6],
                rotate: [0, 1, -1, 0]
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut"
              }}
              className="absolute inset-0 bg-gradient-primary bg-clip-text text-transparent"
              style={{
                filter: 'blur(2px)',
                textShadow: `
                  0 0 10px hsl(217 91% 60% / 0.8),
                  0 0 20px hsl(217 91% 60% / 0.6),
                  0 0 40px hsl(217 91% 60% / 0.4),
                  0 0 80px hsl(262 83% 58% / 0.3)
                `,
                WebkitTextStroke: '1px hsl(217 91% 60% / 0.3)',
              }}
            >
              SRIMANTH ADEP
            </motion.div>
          </motion.div>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto"
          >
            Computer Science Engineering in Data Science Student
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground"
          >
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Hyderabad, India – 500060
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              +91 9912885813
            </div>
            <a href="mailto:srimanthadep@gmail.com" className="flex items-center gap-2 hover:text-primary transition-colors">
              <Mail className="w-4 h-4" />
              srimanthadep@gmail.com
            </a>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="flex justify-center gap-4"
          >
            <Button asChild variant="default" size="lg" className="shadow-glow-primary">
              <a href="https://linkedin.com/in/srimanthadep" target="_blank" rel="noopener noreferrer">
                <Linkedin className="w-5 h-5 mr-2" />
                LinkedIn
              </a>
            </Button>
            <Button asChild variant="outline" size="lg" className="backdrop-blur-glass">
              <a href="#contact">
                <Mail className="w-5 h-5 mr-2" />
                Contact Me
              </a>
            </Button>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
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