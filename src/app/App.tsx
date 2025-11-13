import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import Index from "../pages/Index";
import NotFound from "../pages/NotFound";
import { ScrollProgress } from "../components/common/ScrollProgress";
import { ErrorBoundary } from "../components/common/ErrorBoundary";
import { Analytics } from "../components/features/analytics/Analytics";

const queryClient = new QueryClient();

const App = () => (
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
              <Route path="/" element={<Index />} />
              {/* Custom routes for portfolio pages */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
