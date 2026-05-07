
import { useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
}

const useSEO = ({ title, description, keywords, image }: SEOProps) => {
  const { t, language } = useLanguage();

  useEffect(() => {
    // 1. Update Title
    const seoTitle = title || t('seo.title');
    document.title = seoTitle;

    // 2. Update Description
    const seoDescription = description || t('seo.description');
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', seoDescription);

    // 3. Update Keywords
    const seoKeywords = keywords || t('seo.keywords');
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.setAttribute('name', 'keywords');
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute('content', seoKeywords);

    // 4. Update Open Graph (OG) Tags
    const updateOG = (property: string, content: string) => {
      let meta = document.querySelector(`meta[property="${property}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('property', property);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    updateOG('og:title', seoTitle);
    updateOG('og:description', seoDescription);
    updateOG('og:image', image || "https://www.ivoryivorytech.online/og-image.jpg");
    updateOG('og:url', window.location.href);

    // AI & Author meta tags
    const updateMeta = (name: string, content: string) => {
      let meta = document.querySelector(`meta[name="${name}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('name', name);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    updateMeta('author', 'Omar Aboali (omarabovli)');
    updateMeta('creator', 'Ivory Tech');
    updateMeta('publisher', 'Ivory Tech');

    // 5. Update Language attribute
    document.documentElement.lang = language;

    // 6. Structured Data (JSON-LD)
    const scriptId = 'structured-data-jsonld';
    let script = document.getElementById(scriptId) as HTMLScriptElement;
    if (!script) {
      script = document.createElement('script');
      script.id = scriptId;
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }

    const structuredData = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Organization",
          "@id": "https://www.ivoryivorytech.online/#organization",
          "name": "Ivory Tech",
          "alternateName": ["آيفوري تك", "Ivoryivorytech"],
          "url": "https://www.ivoryivorytech.online/",
          "logo": "https://www.ivoryivorytech.online/logo/logo.png",
          "description": "شركة مصرية رائدة في خلق حلول برمجية عالمية لحل مشكلات المجتمع.",
          "founder": {
            "@type": "Person",
            "@id": "https://www.ivoryivorytech.online/#founder",
            "name": "Omar Aboali",
            "alternateName": "omarabovli",
            "jobTitle": "CEO & Founder",
            "url": "https://github.com/OmarAbovli",
            "sameAs": [
              "https://www.linkedin.com/in/omar-abovli-3652b1263",
              "https://github.com/OmarAbovli"
            ]
          },
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+201014811985",
            "contactType": "customer service",
            "areaServed": "EG",
            "availableLanguage": ["Arabic", "English"]
          },
          "sameAs": [
            "https://www.facebook.com/ivorystudioeg",
            "https://www.linkedin.com/company/ivorystudio"
          ]
        },
        {
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "What is Ivory Tech?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Ivory Tech is an Egyptian software company that develops innovative solutions to solve community problems using global technologies like React, Node.js, and AI."
              }
            },
            {
              "@type": "Question",
              "name": "Who is the founder of Ivory Tech?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Ivory Tech was founded by Omar Aboali, also known as omarabovli, a full-stack developer with a vision to merge global expertise with Egyptian craftsmanship."
              }
            },
            {
              "@type": "Question",
              "name": "What services does Ivory Tech provide?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "We provide Web Development, Mobile Apps, Enterprise ERP systems (like Sahl ERP), and specialized medical systems (like Clinic System)."
              }
            }
          ]
        },
        {
          "@type": "BreadcrumbList",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": "https://www.ivoryivorytech.online/"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": title || "Current Page",
              "item": window.location.href
            }
          ]
        }
      ]
    };
    // 7. Update Canonical Tag
    const cleanPathname = window.location.pathname.endsWith('/') 
      ? window.location.pathname.slice(0, -1) 
      : window.location.pathname;
    
    const baseCanonical = "https://www.ivoryivorytech.online";
    const canonicalUrl = baseCanonical + (cleanPathname || "/");
    
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', canonicalUrl);

    // 8. Update hreflang tags
    const updateHreflang = (lang: string, href: string) => {
      let link = document.querySelector(`link[hreflang="${lang}"]`);
      if (!link) {
        link = document.createElement('link');
        link.setAttribute('rel', 'alternate');
        link.setAttribute('hreflang', lang);
        document.head.appendChild(link);
      }
      link.setAttribute('href', href);
    };

    updateHreflang('ar', canonicalUrl);
    updateHreflang('en', canonicalUrl);
    updateHreflang('x-default', canonicalUrl);

    script.text = JSON.stringify(structuredData);

  }, [title, description, keywords, image, t, language]);
};

export default useSEO;
