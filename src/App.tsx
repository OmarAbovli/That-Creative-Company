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
              <title>Ivory Studio | Digital Excellence & Specialized Web Solutions</title>
              <meta name="description" content="Ivory Studio is a leading digital agency specializing in high-performance web applications, specialized systems, and stunning UI/UX designs. We turn your vision into digital reality." />
              <meta name="keywords" content="digital agency, web development, UI/UX design, specialized systems, custom software, Ivory Studio, performance optimization" />

              {/* Open Graph / Facebook */}
              <meta property="og:type" content="website" />
              <meta property="og:url" content="https://ivory-studio.vercel.app/" />
              <meta property="og:title" content="Ivory Studio | Digital Excellence" />
              <meta property="og:description" content="Turning visions into high-performance digital realities. Specialized web solutions and UI/UX excellence." />
              <meta property="og:image" content="https://ivory-studio.vercel.app/og-image.jpg" />

              {/* Twitter */}
              <meta property="twitter:card" content="summary_large_image" />
              <meta property="twitter:url" content="https://ivory-studio.vercel.app/" />
              <meta property="twitter:title" content="Ivory Studio | Digital Excellence" />
              <meta property="twitter:description" content="Turning visions into high-performance digital realities. Specialized web solutions and UI/UX excellence." />
              <meta property="twitter:image" content="https://ivory-studio.vercel.app/og-image.jpg" />

              {/* Canonical URL */}
              <link rel="canonical" href="https://ivory-studio.vercel.app/" />

              {/* Structured Data (JSON-LD) */}
              <script type="application/ld+json">
                {`
                  {
                    "@context": "https://schema.org",
                    "@type": "ProfessionalService",
                    "name": "Ivory Studio",
                    "image": "https://ivory-studio.vercel.app/favicon.svg",
                    "@id": "",
                    "url": "https://ivory-studio.vercel.app/",
                    "telephone": "+201014811985",
                    "address": {
                      "@type": "PostalAddress",
                      "streetAddress": "",
                      "addressLocality": "Cairo",
                      "postalCode": "",
                      "addressCountry": "EG"
                    },
                    "geo": {
                      "@type": "GeoCoordinates",
                      "latitude": 30.0444,
                      "longitude": 31.2357
                    },
                    "openingHoursSpecification": {
                      "@type": "OpeningHoursSpecification",
                      "dayOfWeek": [
                        "Monday",
                        "Tuesday",
                        "Wednesday",
                        "Thursday",
                        "Friday",
                        "Saturday",
                        "Sunday"
                      ],
                      "opens": "00:00",
                      "closes": "23:59"
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
