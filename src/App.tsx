import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import Index from "./pages/Index";
import ProjectForm from "./pages/ProjectForm";
import NotFound from "./pages/NotFound";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { Helmet } from "react-helmet";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <LanguageProvider>
        <ThemeProvider>
          <Helmet>
            <title>Ivory Studio | Premium Web & Mobile Development | تطوير مواقع وتطبيقات احترافية</title>

            {/* Enhanced Description */}
            <meta
              name="description"
              content="Ivory Studio - Your partner in digital excellence. We craft stunning websites, mobile apps, and web applications using cutting-edge technologies. Specialized in React, Next.js, 3D experiences, and UI/UX design. Serving clients across Egypt, Saudi Arabia, UAE, and beyond. استوديو آيفوري - شريكك في التميز الرقمي."
            />

            {/* الكلمات المفتاحية */}
            <meta
              name="keywords"
              content="Ivory Studio, That Creative Company, Ivory, أيفوري ستوديو, ايفوري, ThatCreativeCompany, برمجة, تطوير مواقع, تصميم مواقع, تطبيقات ويب, UI/UX, تحسين SEO, تطوير برمجيات, حلول تقنية, شركات برمجة في الوطن العربي, شركه برمجه, شركه برمجه مصريه, شركه تطوير مواقع بافضل الاسعار, مصر, افضل جوده في التصنيع, شركه عمل مواقع 3d, شركات برمجه في طنطا"
            />

            {/* Author & Publisher */}
            <meta name="author" content="Ivory Studio" />
            <meta name="publisher" content="Ivory Studio" />

            {/* Language & Geo-Targeting */}
            <meta httpEquiv="Content-Language" content="ar" />
            <meta httpEquiv="Content-Language" content="en" />
            <meta name="geo.region" content="EG" />
            <meta name="geo.placename" content="Egypt" />
            <meta name="geo.position" content="30.0444;31.2357" />
            <meta name="ICBM" content="30.0444, 31.2357" />

            {/* تعليمات محركات البحث */}
            <meta name="robots" content="index, follow" />
            <meta
              name="googlebot"
              content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
            />

            {/* Open Graph (Enhanced for Social Sharing) */}
            <meta property="og:type" content="website" />
            <meta property="og:site_name" content="Ivory Studio" />
            <meta property="og:title" content="Ivory Studio | Premium Web & Mobile Development" />
            <meta
              property="og:description"
              content="Transform your digital presence with Ivory Studio. Expert web & mobile development, stunning 3D experiences, and cutting-edge UI/UX design. Trusted by clients across MENA region."
            />
            <meta property="og:url" content="https://ivory-studio.com/" />
            <meta property="og:image" content="https://ivory-studio.com/og-image.jpg" />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />
            <meta property="og:locale" content="en_US" />
            <meta property="og:locale:alternate" content="ar_EG" />

            {/* Twitter Card (Enhanced) */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:site" content="@IvoryStudio" />
            <meta name="twitter:creator" content="@IvoryStudio" />
            <meta name="twitter:title" content="Ivory Studio | Premium Web & Mobile Development" />
            <meta
              name="twitter:description"
              content="Transform your digital presence with Ivory Studio. Expert web & mobile development, 3D experiences, and cutting-edge UI/UX design."
            />
            <meta name="twitter:image" content="https://ivory-studio.com/og-image.jpg" />
            <meta name="twitter:image:alt" content="Ivory Studio - Premium Digital Solutions" />

            {/* Enhanced Schema JSON-LD for Rich Snippets */}
            <script type="application/ld+json">
              {`
              {
                "@context": "https://schema.org",
                "@type": "Organization",
                "name": "Ivory Studio",
                "alternateName": ["That Creative Company", "ThatCreativeCompany", "آيفوري ستوديو"],
                "url": "https://ivory-studio.com/",
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://ivory-studio.com/logo.png",
                  "width": 512,
                  "height": 512
                },
                "image": "https://ivory-studio.com/og-image.jpg",
                "description": "Premier digital agency specializing in web development, mobile applications, 3D experiences, and UI/UX design. Delivering cutting-edge solutions across MENA region.",
                "foundingDate": "2020",
                "address": {
                  "@type": "PostalAddress",
                  "addressCountry": "EG",
                  "addressRegion": "Cairo",
                  "addressLocality": "Egypt"
                },
                "geo": {
                  "@type": "GeoCoordinates",
                  "latitude": "30.0444",
                  "longitude": "31.2357"
                },
                "areaServed": [
                  {"@type": "Country", "name": "Egypt"},
                  {"@type": "Country", "name": "Saudi Arabia"},
                  {"@type": "Country", "name": "United Arab Emirates"},
                  {"@type": "Country", "name": "Kuwait"}
                ],
                "serviceType": [
                  "Web Development",
                  "Mobile App Development",
                  "UI/UX Design",
                  "3D Web Experiences",
                  "E-commerce Solutions",
                  "Progressive Web Apps",
                  "Enterprise Software",
                  "Digital Transformation"
                ],
                "sameAs": [
                  "https://twitter.com/ivorystudio",
                  "https://www.linkedin.com/company/ivorystudio",
                  "https://github.com/ivorystudio"
                ],
                "contactPoint": [
                  {
                    "@type": "ContactPoint",
                    "telephone": "+201069466522",
                    "contactType": "customer service",
                    "areaServed": "Worldwide",
                    "availableLanguage": ["Arabic", "English"],
                    "contactOption": "TollFree"
                  },
                  {
                    "@type": "ContactPoint",
                    "email": "contact@ivory-studio.com",
                    "contactType": "sales",
                    "areaServed": "Worldwide",
                    "availableLanguage": ["Arabic", "English"]
                  }
                ],
                "aggregateRating": {
                  "@type": "AggregateRating",
                  "ratingValue": "4.9",
                  "reviewCount": "10",
                  "bestRating": "5",
                  "worstRating": "1"
                }
              }
              `}
            </script>
          </Helmet>

          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/project-form" element={<ProjectForm />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </ThemeProvider>
      </LanguageProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
