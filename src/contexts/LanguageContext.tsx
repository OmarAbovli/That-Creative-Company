import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'ar' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  ar: {
    // Navigation
    'nav.home': 'الرئيسية',
    'nav.about': 'عن الشركة',
    'nav.services': 'خدماتنا',
    'nav.projects': 'مشاريعنا',
    'nav.team': 'فريقنا',
    'nav.contact': 'تواصل معنا',
    'nav.settings': 'الإعدادات',
    // SEO
    'seo.title': 'آيفوري تك | حلول برمجية مبتكرة لمشكلات المجتمع',
    'seo.description': 'نبتكر حلولاً برمجية ذكية تهدف لحل تحديات المجتمع وصناعة الأثر، نجمع بين التكنولوجيا العالمية والخبرات الدولية لنصيغها بفخر على أراضٍ مصرية.',
    'seo.keywords': 'آيفوري تك, برمجة, حلول ذكية, تكنولوجيا مصرية, تطوير تطبيقات, سيستم عيادات, منصات تعليمية, ivory tech, software solutions egypt, omarabovli, omar aboali, عمر أبو علي',

    // Hero Section
    'hero.title': 'Ivory Tech',
    'hero.subtitle': 'نبتكر حلولاً برمجية ذكية تهدف لحل تحديات المجتمع وصناعة الأثر، نجمع بين التكنولوجيا العالمية والخبرات الدولية لنصيغها بفخر على أراضٍ مصرية.',
    'hero.startProject': 'ابدأ مشروعك',
    'hero.exploreWork': 'استكشف أعمالنا',

    // Services Section
    'services.title': 'خدماتنا المتخصصة',
    'services.subtitle': 'حلول تقنية متطورة صُممت خصيصاً لمواجهة التحديات الواقعية وتمكين المجتمعات رقمياً.',
    'services.web.title': 'تطوير الويب والمنصات التعليمية',
    'services.web.description': 'نطور مواقع ويب ومنصات تعليمية متطورة (Learning Management Systems) باستخدام React و Next.js',
    'services.mobile.title': 'تطبيقات الموبايل',
    'services.mobile.description': 'تطبيقات محمولة حديثة لأندرويد و iOS',
    'services.backend.title': 'تطوير الخوادم',
    'services.backend.description': 'خوادم قوية وآمنة باستخدام Node.js',
    'services.3d.title': 'التصميم ثلاثي الأبعاد',
    'services.3d.description': 'تجارب تفاعلية مذهلة باستخدام Three.js',

    // Projects Section
    'projects.title': 'مشاريعنا المميزة',
    'projects.subtitle': 'مجموعة من أفضل المشاريع التي نفذناها باستخدام أحدث التقنيات',
    'projects.ecommerce.title': 'منصة التجارة الإلكترونية',
    'projects.ecommerce.description': 'منصة تجارة إلكترونية متكاملة مع نظام دفع آمن',
    'projects.project-management.title': 'تطبيق إدارة المشاريع',
    'projects.project-management.description': 'تطبيق محمول لإدارة المشاريع والفرق',
    'projects.cms.title': 'نظام إدارة العيادات والمحتوى',
    'projects.cms.description': 'نظام متطور لإدارة العيادات الطبية والمحتوى مع لوحة تحكم تفاعلية وشاملة',
    'projects.3d-experience.title': 'تجربة ثلاثية الأبعاد',
    'projects.3d-experience.description': 'موقع تفاعلي بتقنيات ثلاثية الأبعاد متطورة',
    'projects.view': 'عرض المشروع',
    'projects.code': 'الكود',

    // Team Section
    'team.title': 'فريقنا المتميز',
    'team.subtitle': 'مجموعة من أمهر المطورين والمصممين الذين يعملون بشغف لتحقيق رؤيتكم',
    'team.ahmed.name': 'أحمد محمد',
    'team.ahmed.role': 'مطور Frontend رئيسي',
    'team.ahmed.expertise': 'React, Next.js, Three.js',
    'team.fatima.name': 'فاطمة أحمد',
    'team.fatima.role': 'مطورة Backend',
    'team.fatima.expertise': 'Node.js, MongoDB, PostgreSQL',
    'team.mohamed.name': 'محمد علي',
    'team.mohamed.role': 'مطور تطبيقات محمولة',
    'team.mohamed.expertise': 'React Native, Flutter',
    'team.sara.name': 'سارة حسن',
    'team.sara.role': 'مصممة UI/UX',
    'team.sara.expertise': 'Figma, Adobe Creative Suite',

    // Contact Section
    'contact.title': 'تواصل معنا',
    'contact.subtitle': 'لديك مشروع مميز؟ دعنا نساعدك في تحويل فكرتك إلى واقع رقمي مذهل',
    'contact.info.title': 'معلومات التواصل',
    'contact.email.title': 'البريد الإلكتروني',
    'contact.phone.title': 'الهاتف',
    'contact.address.title': 'العنوان',
    'contact.address.value': 'الرياض، المملكة العربية السعودية',
    'contact.why-choose.title': 'لماذا تختارنا؟',
    'contact.why-choose.experience': 'خبرة أكثر من 5 سنوات في تطوير التطبيقات',
    'contact.why-choose.team': 'فريق متخصص في أحدث التقنيات',
    'contact.why-choose.support': 'دعم فني متواصل بعد التسليم',
    'contact.why-choose.pricing': 'أسعار تنافسية وجودة عالية',
    'contact.form.title': 'أرسل لنا رسالة',
    'contact.form.name': 'الاسم',
    'contact.form.name.placeholder': 'اسمك الكامل',
    'contact.form.email': 'البريد الإلكتروني',
    'contact.form.email.placeholder': 'your@email.com',
    'contact.form.message': 'الرسالة',
    'contact.form.message.placeholder': 'اكتب رسالتك هنا...',
    'contact.form.send': 'إرسال الرسالة',
    'contact.form.success': 'تم إرسال الرسالة بنجاح!',
    'contact.form.success.description': 'سنتواصل معك قريباً',
    'footer.copyright': '© 2026 Ivory Tech. جميع الحقوق محفوظة.'
  },
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.about': 'About Us',
    'nav.services': 'Services',
    'nav.projects': 'Projects',
    'nav.team': 'Team',
    'nav.contact': 'Contact',
    'nav.settings': 'Settings',
    // SEO
    'seo.title': 'Ivory Tech | Innovative Software Solutions for Community Challenges',
    'seo.description': 'We create intelligent software solutions designed to solve community challenges and drive impact, blending global technology and international expertise with proud Egyptian craftsmanship.',
    'seo.keywords': 'Ivory Tech, software development, community solutions, Egyptian technology, web apps, clinic systems, educational platforms, tech startup Egypt, omarabovli, omar aboali',

    // Hero Section
    'hero.title': 'Ivory Tech',
    'hero.subtitle': 'We create intelligent software solutions designed to solve community challenges and drive impact, blending global technology and international expertise with proud Egyptian craftsmanship.',
    'hero.startProject': 'Start Your Project',
    'hero.exploreWork': 'Explore Our Work',

    // Services Section
    'services.title': 'Our Specialized Services',
    'services.subtitle': 'Advanced technical solutions tailored to address real-world challenges and empower communities digitally.',
    'services.web.title': 'Web & Educational Platforms',
    'services.web.description': 'We develop advanced websites and educational platforms (LMS) using React and Next.js',
    'services.mobile.title': 'Mobile Applications',
    'services.mobile.description': 'Modern mobile applications for Android and iOS',
    'services.backend.title': 'Backend Development',
    'services.backend.description': 'Powerful and secure servers using Node.js',
    'services.3d.title': '3D Design',
    'services.3d.description': 'Amazing interactive experiences using Three.js',

    // Projects Section
    'projects.title': 'Our Featured Projects',
    'projects.subtitle': 'A collection of the best projects we have implemented using the latest technologies',
    'projects.ecommerce.title': 'E-commerce Platform',
    'projects.ecommerce.description': 'Complete e-commerce platform with secure payment system',
    'projects.project-management.title': 'Project Management App',
    'projects.project-management.description': 'Mobile app for project and team management',
    'projects.cms.title': 'Clinic & Content Management System',
    'projects.cms.description': 'Advanced medical clinic management and CMS with an interactive, comprehensive dashboard',
    'projects.3d-experience.title': '3D Experience',
    'projects.3d-experience.description': 'Interactive website with advanced 3D technologies',
    'projects.view': 'View Project',
    'projects.code': 'Code',

    // Team Section
    'team.title': 'Our Distinguished Team',
    'team.subtitle': 'A group of the most skilled developers and designers who work passionately to achieve your vision',
    'team.ahmed.name': 'Ahmed Mohamed',
    'team.ahmed.role': 'Senior Frontend Developer',
    'team.ahmed.expertise': 'React, Next.js, Three.js',
    'team.fatima.name': 'Fatima Ahmed',
    'team.fatima.role': 'Backend Developer',
    'team.fatima.expertise': 'Node.js, MongoDB, PostgreSQL',
    'team.mohamed.name': 'Mohamed Ali',
    'team.mohamed.role': 'Mobile App Developer',
    'team.mohamed.expertise': 'React Native, Flutter',
    'team.sara.name': 'Sara Hassan',
    'team.sara.role': 'UI/UX Designer',
    'team.sara.expertise': 'Figma, Adobe Creative Suite',

    // Contact Section
    'contact.title': 'Contact Us',
    'contact.subtitle': 'Have an amazing project? Let us help you turn your idea into a stunning digital reality',
    'contact.info.title': 'Contact Information',
    'contact.email.title': 'Email',
    'contact.phone.title': 'Phone',
    'contact.address.title': 'Address',
    'contact.address.value': 'Riyadh, Saudi Arabia',
    'contact.why-choose.title': 'Why Choose Us?',
    'contact.why-choose.experience': 'More than 5 years of experience in app development',
    'contact.why-choose.team': 'Team specialized in the latest technologies',
    'contact.why-choose.support': 'Continuous technical support after delivery',
    'contact.why-choose.pricing': 'Competitive prices and high quality',
    'contact.form.title': 'Send Us a Message',
    'contact.form.name': 'Name',
    'contact.form.name.placeholder': 'Your full name',
    'contact.form.email': 'Email',
    'contact.form.email.placeholder': 'your@email.com',
    'contact.form.message': 'Message',
    'contact.form.message.placeholder': 'Write your message here...',
    'contact.form.send': 'Send Message',
    'contact.form.success': 'Message sent successfully!',
    'contact.form.success.description': 'We will contact you soon',
    'footer.copyright': '© 2026 Ivory Tech. All rights reserved.'
  }
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('ar');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['ar']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};
