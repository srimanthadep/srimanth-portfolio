import { motion } from "framer-motion";
import { SiReact, SiTypescript, SiJavascript, SiPython, SiTailwindcss, SiNodedotjs, SiGit, SiHtml5, SiCss3 } from 'react-icons/si';

const techs = [
  { name: 'React', icon: SiReact, color: 'text-cyan-400' },
  { name: 'TypeScript', icon: SiTypescript, color: 'text-blue-500' },
  { name: 'JavaScript', icon: SiJavascript, color: 'text-yellow-400' },
  { name: 'Python', icon: SiPython, color: 'text-yellow-300' },
  { name: 'Tailwind CSS', icon: SiTailwindcss, color: 'text-cyan-500' },
  { name: 'Node.js', icon: SiNodedotjs, color: 'text-green-500' },
  { name: 'Git', icon: SiGit, color: 'text-orange-500' },
  { name: 'HTML5', icon: SiHtml5, color: 'text-orange-600' },
  { name: 'CSS3', icon: SiCss3, color: 'text-blue-400' },
];

export default function TechStack() {
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
            Tech Stack
          </h2>
          <div className="w-24 h-1 bg-gradient-primary mx-auto rounded-full mb-8"></div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Here are some of the main technologies and tools I use to build modern, scalable, and beautiful web applications.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-8 max-w-4xl mx-auto">
          {techs.map((tech, index) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="flex flex-col items-center group"
            >
              <motion.span 
                className={`text-4xl sm:text-5xl mb-3 transition-all duration-300 group-hover:scale-110 ${tech.color}`}
                whileHover={{ rotate: 5 }}
              >
                <tech.icon />
              </motion.span>
              <span className="text-sm text-foreground font-medium group-hover:text-primary transition-colors duration-300 text-center">
                {tech.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 