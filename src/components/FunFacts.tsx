import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Coffee, Code, Heart, Zap, Star, Trophy } from "lucide-react";

const facts = [
  {
    text: "I built my first website at age 15!",
    icon: Code,
    color: "text-blue-400"
  },
  {
    text: "I love solving algorithmic challenges on LeetCode and Codeforces.",
    icon: Zap,
    color: "text-yellow-400"
  },
  {
    text: "I can solve a Rubik's cube in under 2 minutes!",
    icon: Star,
    color: "text-purple-400"
  },
  {
    text: "I enjoy collaborating on open source and student projects.",
    icon: Heart,
    color: "text-red-400"
  },
  {
    text: "I've won 3 coding competitions so far!",
    icon: Trophy,
    color: "text-green-400"
  },
  {
    text: "I drink more coffee than I should while debugging!",
    icon: Coffee,
    color: "text-orange-400"
  }
];

export function FunFacts() {
  const [currentFact, setCurrentFact] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFact((prev) => (prev + 1) % facts.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const CurrentIcon = facts[currentFact].icon;

  return (
    <motion.div 
      className="fixed bottom-6 right-6 z-40"
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 2 }}
    >
      <div className="bg-card/90 backdrop-blur-lg border border-border rounded-2xl p-4 shadow-glass max-w-xs animate-slide-up group hover:shadow-glow-primary transition-all duration-300">
        <div className="flex items-center gap-3 mb-3">
          <div className={`${facts[currentFact].color} group-hover:scale-110 transition-transform duration-300`}>
            <CurrentIcon className="w-5 h-5" />
          </div>
          <span className="text-sm font-medium text-foreground">Fun Fact</span>
        </div>
        
        <motion.p 
          key={currentFact}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-xs text-muted-foreground leading-relaxed mb-3"
        >
          {facts[currentFact].text}
        </motion.p>
        
        <div className="flex gap-1">
          {facts.map((_, index) => (
            <motion.div
              key={index}
              className={`h-1 rounded-full transition-all duration-300 ${
                index === currentFact 
                  ? 'bg-primary w-4' 
                  : 'bg-muted-foreground/30 w-2'
              }`}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
} 