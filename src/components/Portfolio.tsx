import { useState, useEffect, Suspense, lazy } from "react";
import { Navigation } from "./Navigation";
import { HeroSection } from "./sections/HeroSection";
import { AboutSection } from "./sections/AboutSection";
import { EducationSection } from "./sections/EducationSection";
import { ExperienceSection } from "./sections/ExperienceSection";
import { ProjectsSection } from "./sections/ProjectsSection";
import { SkillsSection } from "./sections/SkillsSection";
import { ContactSection } from "./sections/ContactSection";
import { BackToTop } from "./BackToTop";
import { ErrorBoundary } from "./ErrorBoundary";

const Scene3D = lazy(() => import("./Scene3D").then((module) => ({ default: module.Scene3D })));

export function Portfolio() {
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const sections = ['hero', 'about', 'education', 'experience', 'projects', 'skills', 'contact'];

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, {
      rootMargin: '-50% 0px -50% 0px',
      threshold: 0
    });

    sections.forEach((section) => {
      const element = document.getElementById(section);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <ErrorBoundary fallback={null}>
        <Suspense fallback={null}>
          <Scene3D />
        </Suspense>
      </ErrorBoundary>
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
