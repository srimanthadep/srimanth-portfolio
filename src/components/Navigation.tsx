import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface NavigationProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const sections = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
];

export function Navigation({ activeSection, onSectionChange }: NavigationProps) {
  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="fixed top-6 left-1/2 -translate-x-1/2 z-50 backdrop-blur-glass bg-card/80 border border-border rounded-full px-6 py-3 shadow-glass"
    >
      <div className="flex space-x-2">
        {sections.map((section) => (
          <Button
            key={section.id}
            variant={activeSection === section.id ? "default" : "ghost"}
            size="sm"
            onClick={() => onSectionChange(section.id)}
            className={`relative transition-all duration-300 ${
              activeSection === section.id 
                ? 'bg-primary text-primary-foreground shadow-glow-primary' 
                : 'hover:bg-secondary/80'
            }`}
          >
            {section.label}
            {activeSection === section.id && (
              <motion.div
                layoutId="activeSection"
                className="absolute inset-0 bg-primary rounded-md -z-10"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
          </Button>
        ))}
      </div>
    </motion.nav>
  );
}