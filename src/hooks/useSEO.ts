
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
      "@type": "SoftwareApplication",
      "name": "Ivory Tech",
      "alternateName": "آيفوري تك",
      "description": seoDescription,
      "url": "https://www.ivoryivorytech.online/",
      "author": {
        "@type": "Person",
        "name": "Omar Aboali",
        "alternateName": "omarabovli",
        "url": "https://github.com/OmarAbovli"
      }
    };
    script.text = JSON.stringify(structuredData);

  }, [title, description, keywords, image, t, language]);
};

export default useSEO;
