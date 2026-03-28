import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AdminLogin from "./pages/admin/Login";
import AdminDashboard from "./pages/admin/Dashboard";
import { ScrollProgress } from "./components/ScrollProgress";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { Analytics } from "./components/Analytics";

const queryClient = new QueryClient();

const App = () => {
  const isAdminSubdomain = typeof window !== 'undefined' && window.location.hostname.startsWith('admin.');

  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <TooltipProvider>
            {/* Skip to content link for accessibility */}
            <a href="#main-content" className="skip-link">
              Skip to main content
            </a>
            <ScrollProgress />
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Analytics />
              <Routes>
                {/* Home/Login based on subdomain */}
                <Route path="/" element={isAdminSubdomain ? <AdminLogin /> : <Index />} />
                
                {/* Unified Admin Routes */}
                <Route path="/admin" element={<AdminLogin />} />
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/login" element={<AdminLogin />} />
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                <Route path="/dashboard" element={<AdminDashboard />} />
                
                {/* Fallback */}
                <Route path="*" element={isAdminSubdomain ? <AdminLogin /> : <NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

export default App;

