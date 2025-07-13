import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, Linkedin, Github, Copy, Check, Calendar } from "lucide-react";
import { SiWhatsapp, SiX } from "react-icons/si";
import ContactQRCode from "../ContactQRCode";
import { ResumeDownload } from "../ResumeDownload";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

export function ContactSection() {
  const [copied, setCopied] = useState("");
  const { ref: sectionRef, isIntersecting } = useIntersectionObserver();
  
  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(""), 1500);
  };

  const contactInfo = [
    {
      icon: SiWhatsapp,
      label: "WhatsApp",
      value: "+91 99128 58513",
      href: "http://wa.me/+919912858513",
      color: "text-green-500",
      bgColor: "bg-green-500/20",
      hoverColor: "hover:bg-green-500/30",
      aria: "Chat on WhatsApp",
      tooltip: "Chat on WhatsApp (Replies within 1 hour)",
      prominent: true,
      replyTime: "Replies within 1 hour"
    },
    {
      icon: Mail,
      label: "Email",
      value: "srimanthadep@gmail.com",
      href: "mailto:srimanthadep@gmail.com",
      color: "text-blue-400",
      bgColor: "bg-blue-400/20",
      hoverColor: "hover:bg-blue-400/30",
      aria: "Send Email",
      tooltip: "Send me an email"
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+91 9912885813",
      href: "tel:+919912885813",
      color: "text-green-400",
      bgColor: "bg-green-400/20",
      hoverColor: "hover:bg-green-400/30",
      aria: "Call me",
      tooltip: "Call me"
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: "linkedin.com/in/srimanthadep",
      href: "https://linkedin.com/in/srimanthadep",
      color: "text-blue-500",
      bgColor: "bg-blue-500/20",
      hoverColor: "hover:bg-blue-500/30",
      aria: "Connect on LinkedIn",
      tooltip: "Connect with me on LinkedIn"
    },
    {
      icon: Github,
      label: "GitHub",
      value: "github.com/srimanthadep",
      href: "https://github.com/srimanthadep",
      color: "text-gray-400",
      bgColor: "bg-gray-400/20",
      hoverColor: "hover:bg-gray-400/30",
      aria: "View GitHub profile",
      tooltip: "View my GitHub profile"
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Hyderabad, India",
      href: null,
      color: "text-red-400",
      bgColor: "bg-red-400/20",
      hoverColor: "hover:bg-red-400/30",
      aria: "View location",
      tooltip: "Based in Hyderabad, India"
    },
  ];

  return (
    <section ref={sectionRef} className="py-20 relative">
      <div className="container mx-auto px-6">
        <div className={`text-center mb-16 transition-all duration-700 ${isIntersecting ? 'animate-slide-up' : 'opacity-0'}`}>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
            Contact Me
          </h2>
          <div className="w-24 h-1 bg-gradient-primary mx-auto rounded-full mb-8"></div>
        </div>
        
        <address className="not-italic max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
          {contactInfo.map((info, index) => {
            const isWhatsApp = info.label === 'WhatsApp';
            return (
              <a
                key={index}
                href={info.href}
                target={info.href ? '_blank' : undefined}
                rel={info.href ? 'noopener noreferrer' : undefined}
                className={`group flex items-center gap-4 p-6 rounded-xl shadow-glass transition-all duration-300 bg-card/80 border border-border hover:shadow-glow-primary focus-within:shadow-glow-primary hover-lift ${isIntersecting ? 'animate-slide-up' : 'opacity-0'}`}
                style={{ animationDelay: `${index * 100}ms` }}
                tabIndex={0}
                aria-label={info.aria}
                title={info.tooltip}
              >
                <span className={`flex items-center justify-center rounded-full p-3 text-2xl ${info.bgColor} ${info.color} ${info.hoverColor} transition-colors duration-300 group-hover:scale-110`}>
                  <info.icon className="w-6 h-6" />
                </span>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className={`font-semibold text-sm sm:text-lg text-foreground group-hover:underline`}>
                      {info.label === 'WhatsApp' ? 'Chat on WhatsApp' : info.label}
                    </span>
                  </div>
                  <div className="text-muted-foreground text-sm truncate">{info.value}</div>
                </div>
                
                {info.label === 'WhatsApp' && (
                  <span className="text-[10px] bg-green-700/80 text-white px-1.5 py-0.5 rounded-full whitespace-nowrap flex-shrink-0">
                    {info.replyTime}
                  </span>
                )}
                
                {(info.label === 'Email' || info.label === 'Phone') && (
                  <button
                    onClick={e => { e.preventDefault(); handleCopy(info.value, info.label); }}
                    className="ml-2 p-2 rounded-lg bg-muted/50 hover:bg-primary/20 transition-all duration-200 flex items-center gap-1 text-xs text-foreground hover:text-primary group/copy"
                    aria-label={`Copy ${info.label}`}
                    title={`Copy ${info.label}`}
                  >
                    {copied === info.label ? (
                      <>
                        <Check className="w-3 h-3 group-hover/copy:scale-110 transition-transform duration-300" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3 group-hover/copy:scale-110 transition-transform duration-300" />
                        Copy
                      </>
                    )}
                  </button>
                )}
              </a>
            );
          })}
        </address>
        
        {/* Contact Form */}
        <form action="https://formspree.io/f/xpwlawer" method="POST" className="max-w-xl mx-auto mt-12 bg-card/90 p-8 rounded-2xl shadow-glass border border-border flex flex-col gap-4 backdrop-blur-lg">
          <h3 className="text-2xl font-bold mb-2 text-foreground">Send me a message</h3>
          <input 
            type="text" 
            name="name" 
            placeholder="Your Name" 
            className="rounded-lg px-4 py-3 bg-background border border-border text-foreground focus:ring-2 focus:ring-primary outline-none transition-all duration-300" 
            required 
          />
          <input 
            type="email" 
            name="email" 
            placeholder="Your Email" 
            className="rounded-lg px-4 py-3 bg-background border border-border text-foreground focus:ring-2 focus:ring-primary outline-none transition-all duration-300" 
            required 
          />
          <textarea 
            name="message" 
            placeholder="Your Message" 
            className="rounded-lg px-4 py-3 bg-background border border-border text-foreground focus:ring-2 focus:ring-primary outline-none transition-all duration-300 min-h-[100px] resize-none" 
            required 
          />
          <Button type="submit" className="w-full mt-2 rounded-lg hover:shadow-glow-primary transition-all duration-300">
            Send Message
          </Button>
        </form>
        
        {/* QR Code for LinkedIn */}
        <ContactQRCode />
        
        {/* Resume Download */}
        <ResumeDownload />
        
        {/* vCard Download */}
        <div className="flex justify-center mt-8">
          <a
            href="/public/srimanthadep.vcf"
            download
            className="px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/80 hover:shadow-glow-primary transition-all duration-300 group"
            aria-label="Download vCard"
          >
            <span className="flex items-center gap-2">
              <Calendar className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
              Download vCard
            </span>
          </a>
        </div>
        
        {/* Back to Top Button */}
        <div className="flex justify-center mt-8">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="px-6 py-3 rounded-lg bg-secondary text-secondary-foreground font-semibold hover:bg-secondary/80 hover:shadow-glow-secondary transition-all duration-300 group"
            aria-label="Back to top"
          >
            <span className="flex items-center gap-2">
              <span>Back to Top</span>
              <span className="group-hover:-translate-y-1 transition-transform duration-300">↑</span>
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}