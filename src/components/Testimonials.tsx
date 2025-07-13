import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

const testimonials = [
  {
    name: "John Doe",
    role: "Senior Developer",
    company: "Tech Corp",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    quote: "Srimanth is an exceptional developer with a keen eye for detail and a passion for creating elegant solutions. His work ethic and technical skills are outstanding."
  },
  {
    name: "Jane Smith",
    role: "Project Manager",
    company: "Innovation Labs",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    quote: "Working with Srimanth was a pleasure. He consistently delivered high-quality work on time and was always willing to go the extra mile."
  },
  {
    name: "Mike Johnson",
    role: "Team Lead",
    company: "StartupXYZ",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    quote: "Srimanth's problem-solving abilities and attention to detail make him an invaluable team member. He's always eager to learn and adapt."
  }
];

export default function Testimonials() {
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
            Testimonials
          </h2>
          <div className="w-24 h-1 bg-gradient-primary mx-auto rounded-full mb-8"></div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            What others say about working with me.
          </p>
        </motion.div>
        
        <div className="grid gap-8 md:grid-cols-3 max-w-6xl mx-auto">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: i * 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="backdrop-blur-glass bg-card/80 border-border shadow-glass hover:shadow-glow-primary transition-all duration-300 h-full group">
                <CardContent className="p-8 flex flex-col items-center text-center">
                  <div className="relative mb-6">
                    <img 
                      src={t.avatar} 
                      alt={t.name} 
                      className="w-20 h-20 rounded-full object-cover border-4 border-primary group-hover:scale-110 transition-transform duration-300" 
                      loading="lazy" 
                    />
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                      <span className="text-primary-foreground text-xs">"</span>
                    </div>
                  </div>
                  
                  <blockquote className="text-lg italic text-muted-foreground mb-6 leading-relaxed">
                    "{t.quote}"
                  </blockquote>
                  
                  <div className="mt-auto">
                    <div className="font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
                      {t.name}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {t.role} at {t.company}
                    </div>
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