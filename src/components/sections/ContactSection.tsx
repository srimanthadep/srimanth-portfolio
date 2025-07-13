import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, Linkedin, Github } from "lucide-react";
import { SiWhatsapp, SiX } from "react-icons/si";

export function ContactSection() {
  const [copied, setCopied] = useState("");
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
      icon: MapPin,
      label: "Location",
      value: "Hyderabad, India",
      color: "text-red-400",
      bgColor: "bg-red-400/20",
      hoverColor: "hover:bg-red-400/30",
      aria: "Location",
      tooltip: "My location"
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
      tooltip: "Connect on LinkedIn"
    },
    {
      icon: Github,
      label: "GitHub",
      value: "github.com/srimanthadep",
      href: "https://github.com/srimanthadep",
      color: "text-gray-800 dark:text-gray-200",
      bgColor: "bg-gray-200 dark:bg-gray-700/20",
      hoverColor: "hover:bg-gray-300 dark:hover:bg-gray-700/40",
      aria: "View GitHub profile",
      tooltip: "View my GitHub"
    },
    {
      icon: SiX,
      label: "Twitter",
      value: "twitter.com/srimanthadep",
      href: "https://twitter.com/srimanthadep",
      color: "text-blue-400",
      bgColor: "bg-blue-400/20",
      hoverColor: "hover:bg-blue-400/30",
      aria: "Follow on Twitter",
      tooltip: "Follow me on Twitter"
    },
  ];

  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
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
                className={`group flex items-center gap-4 p-4 rounded-xl shadow-glass transition-all duration-300 bg-card/80 border border-border hover:shadow-glow-primary focus-within:shadow-glow-primary`}
                tabIndex={0}
                aria-label={info.aria}
                title={info.tooltip}
              >
                <span className={`flex items-center justify-center rounded-full p-3 text-2xl ${info.bgColor} ${info.color} ${info.hoverColor} transition-colors duration-300`}>
                  <info.icon className="w-6 h-6" />
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className={`font-semibold text-lg truncate text-foreground group-hover:underline`}>
                      {info.label === 'WhatsApp' ? 'Chat on WhatsApp' : info.label}
                    </span>
                    {info.label === 'WhatsApp' && (
                      <span className="ml-2 text-xs bg-green-700/80 text-white px-2 py-0.5 rounded-full">{info.replyTime}</span>
                    )}
                  </div>
                  <div className="text-muted-foreground text-sm truncate">{info.value}</div>
                </div>
                {(info.label === 'Email' || info.label === 'Phone') && (
                  <button
                    onClick={e => { e.preventDefault(); handleCopy(info.value, info.label); }}
                    className="ml-2 px-2 py-1 rounded bg-muted text-xs text-foreground hover:bg-primary/20 transition"
                    aria-label={`Copy ${info.label}`}
                    title={`Copy ${info.label}`}
                  >
                    {copied === info.label ? 'Copied!' : 'Copy'}
                  </button>
                )}
              </a>
            );
          })}
        </address>
        {/* Contact Form */}
        <form action="https://formspree.io/f/xpwlawer" method="POST" className="max-w-xl mx-auto mt-12 bg-card/90 p-8 rounded-2xl shadow-glass border border-border flex flex-col gap-4 backdrop-blur-lg">
          <h3 className="text-2xl font-bold mb-2 text-foreground">Send me a message</h3>
          <input type="text" name="name" placeholder="Your Name" className="rounded-lg px-4 py-2 bg-background border border-border text-foreground focus:ring-2 focus:ring-primary outline-none transition" required />
          <input type="email" name="email" placeholder="Your Email" className="rounded-lg px-4 py-2 bg-background border border-border text-foreground focus:ring-2 focus:ring-primary outline-none transition" required />
          <textarea name="message" placeholder="Your Message" className="rounded-lg px-4 py-2 bg-background border border-border text-foreground focus:ring-2 focus:ring-primary outline-none transition min-h-[100px]" required />
          <Button type="submit" className="w-full mt-2 rounded-lg">Send</Button>
        </form>
        {/* vCard Download */}
        <div className="flex justify-center mt-8">
          <a
            href="/public/srimanthadep.vcf"
            download
            className="px-4 py-2 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/80 transition"
            aria-label="Download vCard"
          >
            Download vCard
          </a>
        </div>
        {/* Back to Top Button */}
        <div className="fixed bottom-6 right-6 z-50">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="p-3 rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary/80 transition"
            aria-label="Back to Top"
            title="Back to Top"
          >
            ↑
          </button>
        </div>
        {/* Dark/Light Mode Toggle (placeholder) */}
        {/* You can implement a real theme toggle here if you have theme context */}
      </div>
    </section>
  );
}