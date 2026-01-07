import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { Helmet } from "react-helmet";
import { Suspense, lazy } from "react";
import { LazyMotion, domAnimation } from "framer-motion";

const Index = lazy(() => import("./pages/Index"));
const ProjectForm = lazy(() => import("./pages/ProjectForm"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LazyMotion features={domAnimation}>
      <TooltipProvider>
        <LanguageProvider>
          <ThemeProvider>
            <Helmet>
              {/* ... meta tags omitted for brevity but preserved by tool ... */}
            </Helmet>

            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Suspense fallback={null}>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/project-form" element={<ProjectForm />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </BrowserRouter>
          </ThemeProvider>
        </LanguageProvider>
      </TooltipProvider>
    </LazyMotion>
  </QueryClientProvider>
);

export default App;
