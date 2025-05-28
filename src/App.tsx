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
            <title>That Creative Company | حلول برمجية متكاملة لتطوير المواقع والتطبيقات</title>

            {/* الوصف */}
            <meta
              name="description"
              content="شركة برمجة متخصصة في تطوير مواقع الإنترنت، تطبيقات الويب، تصميم واجهات المستخدم UI/UX، وتحسين الأداء باستخدام أحدث التقنيات."
            />

            {/* الكلمات المفتاحية */}
            <meta
              name="keywords"
              content="برمجة, تطوير مواقع, تصميم مواقع, تطبيقات ويب, UI/UX, تحسين SEO, تطوير برمجيات, حلول تقنية, شركات برمجة في الوطن العربي, That Creative Company ,omar abovli ,omarabovli ,omar aboali ,omaraboali ,el7ambalayes ,الحمبليص ,شركه برمجه ,شركه برمجه مصريه ,شركه برمجه عربيه, شركه تطوير مواقع بافضل الاسعار ,مصر ,افصل جوده في التصنيع ,شركه عمل مواقع 3d ,شركه برمجه تبحث عن مبرمجين ,شركات برمجه في طنطا "
            />

            {/* المؤلف */}
            <meta name="author" content="That Creative Company" />

            {/* اللغة */}
            <meta httpEquiv="Content-Language" content="ar" />
            <meta httpEquiv="Content-Language" content="en" />

            {/* تعليمات محركات البحث */}
            <meta name="robots" content="index, follow" />
            <meta
              name="googlebot"
              content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
            />

            {/* Open Graph (لمشاركة السوشيال) */}
            <meta property="og:type" content="website" />
            <meta property="og:title" content="That Creative Company" />
            <meta
              property="og:description"
              content="شركة برمجة متخصصة في تطوير مواقع الإنترنت، تطبيقات الويب، تصميم واجهات المستخدم UI/UX، وتحسين الأداء باستخدام أحدث التقنيات."
            />
            <meta property="og:url" content="https://that-creative-company.vercel.app/" />
            <meta property="og:image" content="https://that-creative-company.vercel.app/logo.png" />

            {/* Twitter Card */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content="That Creative Company" />
            <meta
              name="twitter:description"
              content="شركة برمجة متخصصة في تطوير مواقع الإنترنت، تطبيقات الويب، تصميم واجهات المستخدم UI/UX، وتحسين الأداء باستخدام أحدث التقنيات."
            />
            <meta name="twitter:image" content="https://that-creative-company.vercel.app/logo.png" />

            {/* تحسينات إضافية */}
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="canonical" href="https://that-creative-company.vercel.app/" />
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
