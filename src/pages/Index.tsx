import { Portfolio } from "@/components/features/portfolio/Portfolio";

const Index = () => {
  return (
    <div className="relative min-h-screen" id="main-content">
      {/* Animated background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-cyan-900/20"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(120,119,198,0.1),transparent_50%)]"></div>
      </div>
      <Portfolio />
      {/* Footer */}
      <footer className="py-8 text-center text-muted-foreground border-t border-border bg-card/50 backdrop-blur-sm">
        <p>&copy; 2025 Srimanth Adep. Crafted with passion and precision.</p>
      </footer>
    </div>
  );
};

export default Index;
