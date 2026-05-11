
import React from 'react';
import { Helmet } from 'react-helmet';
import { useLanguage } from '@/contexts/LanguageContext';

const SEOManager = ({ 
  title, 
  description, 
  keywords,
  image
}: { 
  title?: string; 
  description?: string; 
  keywords?: string;
  image?: string;
}) => {
  const { t, language } = useLanguage();
  const canonicalUrl = "https://www.ivoryivorytech.online/";
  
  const seoTitle = title || t('seo.title');
  const seoDescription = description || t('seo.description');
  const seoKeywords = keywords || t('seo.keywords');
  const seoImage = image || "https://www.ivoryivorytech.online/og-image.jpg";

  return (
    <Helmet>
      <html lang={language} />
      <title>{seoTitle}</title>
      <meta name="description" content={seoDescription} />
      <meta name="keywords" content={seoKeywords} />

      {/* hreflang tags for multi-language SEO */}
      <link rel="alternate" href={canonicalUrl} hreflang="x-default"/>     
      <link rel="alternate" href={canonicalUrl} hreflang="en"/>
      <link rel="alternate" href={canonicalUrl} hreflang="ar"/>

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={seoTitle} />
      <meta property="og:description" content={seoDescription} />
      <meta property="og:image" content={seoImage} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={canonicalUrl} />
      <meta property="twitter:title" content={seoTitle} />
      <meta property="twitter:description" content={seoDescription} />
      <meta property="twitter:image" content={seoImage} />

      <link rel="canonical" href={canonicalUrl} />

      {/* Structured Data (JSON-LD) */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Ivory Tech",
          "alternateName": "آيفوري تك",
          "description": seoDescription,
          "image": "https://www.ivoryivorytech.online/favicon.svg",
          "logo": "https://www.ivoryivorytech.online/favicon.svg",
          "url": canonicalUrl,
          "telephone": "+201069466522",
          "email": t('contact.email.value'),
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Cairo",
            "addressCountry": "EG"
          },
          "sameAs": [
            "https://www.facebook.com/profile.php?id=61589480705918",
            "https://www.instagram.com/ivorytech.eg/",
            "https://www.tiktok.com/@ivory.tech.eg?lang=en-GB"
          ]
        })}
      </script>
    </Helmet>
  );
};

export default SEOManager;
