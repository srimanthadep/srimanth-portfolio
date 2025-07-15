import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

const testimonials = [
  {
    name: "A. Real Person",
    role: "Mentor",
    company: "University of Hyderabad",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    quote: "Srimanth is a dedicated and creative developer who always strives for excellence in every project. His attention to detail and willingness to learn set him apart."
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