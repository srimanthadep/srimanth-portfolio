import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FileText, Download, X, Eye } from "lucide-react";

export function ResumeDownload() {
  const [showModal, setShowModal] = useState(false);

  const handleDownload = () => {
    // Create a temporary link element
    const link = document.createElement('a');
    link.href = '/resume.pdf';
    link.download = 'Srimanth_Adep_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex justify-center mt-8">
      <div className="flex gap-4">
        <Button
          onClick={() => setShowModal(true)}
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

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-background rounded-2xl shadow-2xl max-w-2xl w-full flex flex-col max-h-[90vh]">
            <div className="flex items-center justify-between p-6 border-b border-border">
              <div className="flex items-center gap-3">
                <FileText className="w-6 h-6 text-primary" />
                <h3 className="text-xl font-semibold text-foreground">Resume Setup</h3>
              </div>
              <Button
                onClick={() => setShowModal(false)}
                variant="ghost"
                size="sm"
                className="p-2 hover:bg-secondary/80 transition-colors duration-300"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
            
            <div className="p-6 flex-1 overflow-y-auto">
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  To enable resume download functionality, you need to add your resume PDF file to the project:
                </p>
                
                <div className="bg-muted/50 p-4 rounded-lg space-y-2">
                  <h4 className="font-semibold text-foreground">Setup Instructions:</h4>
                  <ol className="list-decimal list-inside space-y-1 text-sm">
                    <li>Add your resume PDF file to the <code className="bg-background px-1 rounded">public/</code> folder</li>
                    <li>Name it <code className="bg-background px-1 rounded">resume.pdf</code></li>
                    <li>The file will be automatically available for download</li>
                  </ol>
                </div>
                
                <div className="bg-muted/50 p-4 rounded-lg space-y-2">
                  <h4 className="font-semibold text-foreground">Alternative Setup:</h4>
                  <ol className="list-decimal list-inside space-y-1 text-sm">
                    <li>Upload your resume to a cloud service (Google Drive, Dropbox, etc.)</li>
                    <li>Get the direct download link</li>
                    <li>Replace <code className="bg-background px-1 rounded">/resume.pdf</code> in the code with your link</li>
                  </ol>
                </div>
                
                <p className="text-sm">
                  <strong>Note:</strong> Make sure your resume is up-to-date and in PDF format for the best compatibility.
                </p>
              </div>
            </div>
            
            <div className="flex justify-end gap-3 p-6 border-t border-border">
              <Button
                variant="outline"
                onClick={() => setShowModal(false)}
                className="hover:bg-secondary/80 transition-colors duration-300"
              >
                Close
              </Button>
              <Button
                onClick={handleDownload}
                className="hover:shadow-glow-primary transition-all duration-300"
              >
                <Download className="w-4 h-4 mr-2" />
                Download Anyway
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 