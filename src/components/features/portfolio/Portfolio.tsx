import { useState, useEffect } from "react";
import { Scene3D } from "../../effects/Scene3D";
import { Navigation } from "../../layout/Navigation";
import { HeroSection } from "../../sections/HeroSection";
import { AboutSection } from "../../sections/AboutSection";
import { EducationSection } from "../../sections/EducationSection";
import { ExperienceSection } from "../../sections/ExperienceSection";
import { ProjectsSection } from "../../sections/ProjectsSection";
import { SkillsSection } from "../../sections/SkillsSection";
import { ContactSection } from "../../sections/ContactSection";
import { BackToTop } from "../../common/BackToTop";

export function Portfolio() {
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'about', 'education', 'experience', 'projects', 'skills', 'contact'];
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <Scene3D />
      <Navigation activeSection={activeSection} onSectionChange={scrollToSection} />
      
      <div id="hero">
        <HeroSection />
      </div>
      
      <div id="about">
        <AboutSection />
      </div>
      
      <div id="education">
        <EducationSection />
      </div>
      
      <div id="experience">
        <ExperienceSection />
      </div>
      
      <div id="projects">
        <ProjectsSection />
      </div>
      
      <div id="skills">
        <SkillsSection />
      </div>
      
      <div id="contact">
        <ContactSection />
      </div>

      <BackToTop />
    </div>
  );
}