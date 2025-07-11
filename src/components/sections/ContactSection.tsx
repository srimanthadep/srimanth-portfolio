import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, Linkedin, Github } from "lucide-react";

export function ContactSection() {
  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "srimanthadep@gmail.com",
      href: "mailto:srimanthadep@gmail.com",
      color: "text-blue-400",
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+91 9912885813",
      href: "tel:+919912885813",
      color: "text-green-400",
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Hyderabad, India – 500060",
      color: "text-red-400",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: "linkedin.com/in/srimanthadep",
      href: "https://linkedin.com/in/srimanthadep",
      color: "text-blue-500",
    },
  ];

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
            Get In Touch
          </h2>
          <div className="w-24 h-1 bg-gradient-primary mx-auto rounded-full mb-8"></div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            I'm always open to discussing new opportunities and collaborations. 
            Feel free to reach out if you'd like to connect!
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
          {contactInfo.map((info, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="backdrop-blur-glass bg-card/80 border-border shadow-glass hover:shadow-glow-primary transition-all duration-300 group">
                <CardContent className="p-6">
                  {info.href ? (
                    <a 
                      href={info.href} 
                      target={info.href.startsWith('http') ? '_blank' : undefined}
                      rel={info.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="flex items-center space-x-4 group-hover:text-primary transition-colors"
                    >
                      <div className={`p-3 rounded-lg bg-opacity-20 ${info.color} bg-current`}>
                        <info.icon className={`w-6 h-6 ${info.color}`} />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                          {info.label}
                        </h4>
                        <p className="text-muted-foreground">{info.value}</p>
                      </div>
                    </a>
                  ) : (
                    <div className="flex items-center space-x-4">
                      <div className={`p-3 rounded-lg bg-opacity-20 ${info.color} bg-current`}>
                        <info.icon className={`w-6 h-6 ${info.color}`} />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground">{info.label}</h4>
                        <p className="text-muted-foreground">{info.value}</p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Button 
            asChild 
            size="lg" 
            className="bg-gradient-primary hover:opacity-90 text-primary-foreground shadow-glow-primary animate-glow"
          >
            <a href="mailto:srimanthadep@gmail.com">
              <Mail className="w-5 h-5 mr-2" />
              Send Email
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}