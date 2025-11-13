import { motion } from "framer-motion";
import { Linkedin } from "lucide-react";

const LINKEDIN_URL = "https://linkedin.com/in/srimanthadep";

export default function ContactQRCode() {
  return (
    <motion.div 
      className="flex flex-col items-center justify-center mt-8"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="bg-card/80 p-6 rounded-xl shadow-glass border border-border flex flex-col items-center group hover:shadow-glow-primary transition-all duration-300">
        <div className="flex items-center gap-2 mb-4">
          <Linkedin className="w-5 h-5 text-primary group-hover:scale-110 transition-transform duration-300" />
          <span className="text-sm font-medium text-foreground">LinkedIn QR Code</span>
        </div>
        
        <img
          src={`https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(LINKEDIN_URL)}&size=160x160&margin=10`}
          alt="LinkedIn QR Code"
          className="w-40 h-40 mb-3 rounded-lg border border-primary group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        
        <span className="text-sm text-muted-foreground text-center">
          Scan to connect on LinkedIn
        </span>
      </div>
    </motion.div>
  );
} 