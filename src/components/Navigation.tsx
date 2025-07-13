import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";

interface NavigationProps {
  activeSection: string;
  onSectionChange: (sectionId: string) => void;
}

const sections = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'education', label: 'Education' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'techstack', label: 'Tech Stack' },
  { id: 'contact', label: 'Contact' },
];

export function Navigation({ activeSection, onSectionChange }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <>
      <motion.nav 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="fixed top-4 right-4 z-50 backdrop-blur-glass bg-card/80 border border-border rounded-full px-4 py-2 shadow-glass flex items-center gap-2"
      >
        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-2">
          {sections.map((section) => (
            <Button
              key={section.id}
              variant={activeSection === section.id ? "default" : "ghost"}
              size="sm"
              onClick={() => onSectionChange(section.id)}
              className={`relative transition-all duration-300 ${
                activeSection === section.id 
                  ? 'bg-primary text-primary-foreground shadow-glow-primary' 
                  : 'hover:bg-secondary/80 hover:shadow-glow-secondary'
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
        
        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          className="ml-2 p-2 rounded-full bg-muted hover:bg-primary/20 transition-all duration-300 text-foreground group"
          aria-label="Toggle dark/light mode"
        >
          {theme === 'dark' ? (
            <Sun className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
          ) : (
            <Moon className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
          )}
        </button>
        
        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="p-2 md:hidden"
        >
          {isMenuOpen ? (
            <X size={20} className="transition-transform duration-300" />
          ) : (
            <Menu size={20} className="transition-transform duration-300" />
          )}
        </Button>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed top-20 right-4 z-50 backdrop-blur-glass bg-card/90 border border-border rounded-xl shadow-glass p-4 md:hidden"
          >
            <div className="flex flex-col space-y-2 min-w-[200px]">
              {sections.map((section) => (
                <Button
                  key={section.id}
                  variant={activeSection === section.id ? "default" : "ghost"}
                  size="sm"
                  onClick={() => {
                    onSectionChange(section.id);
                    setIsMenuOpen(false);
                  }}
                  className={`justify-start transition-all duration-300 ${
                    activeSection === section.id 
                      ? 'bg-primary text-primary-foreground shadow-glow-primary' 
                      : 'hover:bg-secondary/80'
                  }`}
                >
                  {section.label}
                </Button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}