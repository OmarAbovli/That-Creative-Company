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
              <title>Ivory Tech | Clinic Management Systems & Educational Platforms</title>
              <meta name="description" content="Ivory Tech specializes in high-performance web applications, specialized educational platforms, and clinic management systems in Egypt. نحن نطور منصات تعليمية وأنظمة إدارة عيادات متطورة." />
              <meta name="keywords" content="ivory, ivory tech, ivorytech, آيفوري, منصه تعليميه في مصر, سيستم اداره للعياده, clinic management system, educational platform egypt, software company cairo, web development egypt" />

              {/* Open Graph / Facebook */}
              <meta property="og:type" content="website" />
              <meta property="og:url" content="https://www.ivoryivorytech.online/" />
              <meta property="og:title" content="Ivory Tech | Digital Excellence" />
              <meta property="og:description" content="Turning visions into high-performance digital realities. Specialized in Educational Platforms and Clinic Management Systems." />
              <meta property="og:image" content="https://www.ivoryivorytech.online/og-image.jpg" />

              {/* Twitter */}
              <meta property="twitter:card" content="summary_large_image" />
              <meta property="twitter:url" content="https://www.ivoryivorytech.online/" />
              <meta property="twitter:title" content="Ivory Tech" />
              <meta property="twitter:description" content="Specialized Web Solutions: Educational Platforms & Clinic Management Systems." />
              <meta property="twitter:image" content="https://www.ivoryivorytech.online/og-image.jpg" />

              {/* Canonical URL */}
              <link rel="canonical" href="https://www.ivoryivorytech.online/" />

              {/* Structured Data (JSON-LD) */}
              <script type="application/ld+json">
                {`
                  {
                    "@context": "https://schema.org",
                    "@type": "SoftwareApplication",
                    "name": "Ivory Tech",
                    "alternateName": "Ivory Tech",
                    "image": "https://www.ivoryivorytech.online/favicon.svg",
                    "@id": "",
                    "url": "https://www.ivoryivorytech.online/",
                    "telephone": "+201014811985",
                    "applicationCategory": "BusinessApplication",
                    "operatingSystem": "Web",
                    "address": {
                      "@type": "PostalAddress",
                      "streetAddress": "",
                      "addressLocality": "Cairo",
                      "postalCode": "",
                      "addressCountry": "EG"
                    },
                    "sameAs": [
                      "https://www.facebook.com/ivorystudioeg",
                      "https://www.linkedin.com/company/ivorystudio"
                    ]
                  }
                `}
              </script>
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
