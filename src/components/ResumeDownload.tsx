import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FileText, Download, X, Eye } from "lucide-react";

export function ResumeDownload() {
  const [showModal, setShowModal] = useState(false);

  const handleDownload = () => {
    // Create a temporary link element
    const link = document.createElement('a');
    link.href = '/Srimanth_Adep_Resume.pdf';
    link.download = 'Srimanth_Adep_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePreview = () => {
    // Open resume in a new tab for preview
    window.open('/Srimanth_Adep_Resume.pdf', '_blank');
  };

  return (
    <div className="flex justify-center mt-8">
      <div className="flex gap-4">
        <Button
          onClick={handlePreview}
          className="px-6 py-3 rounded-lg bg-secondary text-secondary-foreground font-semibold hover:bg-secondary/80 hover:shadow-glow-secondary transition-all duration-300 group"
        >
          <span className="flex items-center gap-2">
            <Eye className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
            Preview Resume
          </span>
        </Button>
        
        <Button
          onClick={handleDownload}
          className="px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/80 hover:shadow-glow-primary transition-all duration-300 group"
        >
          <span className="flex items-center gap-2">
            <Download className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
            Download PDF
          </span>
        </Button>
      </div>
    </div>
  );
} 