import { createContext, useContext, useEffect, useState } from 'react'
import type { ReactNode } from 'react'

type Language = 'ar' | 'en'

interface LanguageContextType {
  language: Language
  toggleLanguage: () => void
  t: (key: string) => string
}

const translations: Record<Language, Record<string, string>> = {
  ar: {
    // Navbar
    'nav.home': 'الرئيسية',
    'nav.projects': 'المشاريع',
    'nav.experience': 'الخبرات',
    'nav.skills': 'المهارات',
    'nav.contact': 'تواصل',
    
    // Hero
    'hero.greeting': 'مرحباً، أنا',
    'hero.name': 'جوري السكران',
    'hero.title': 'مهندسة برمجيات',
    'hero.description': 'أبتكر حلولاً رقمية مبتكرة تجمع بين الجمال والأداء',
    'hero.available': 'متاح للمشاريع الجديدة',
    'hero.viewProjects': 'شاهد أعمالي',
    'hero.contact': 'تواصل معي',
    'hero.workTogether': 'لنعمل معاً',
    
    // Navbar
    'nav.developer': ' مطور',
    
    // Projects
    'projects.category': 'المشاريع',
    'projects.title': 'مشاريعي',
    'projects.subtitle': 'مجموعة من المشاريع التي أفتخر بها',
    'projects.viewDetails': 'عرض التفاصيل',
    
    // Skills
    'skills.category': 'المهارات',
    'skills.title': 'مهاراتي',
    'skills.subtitle': 'التقنيات والأدوات التي أتقنها',
    
    // Experience
    'experience.careerPath': 'المسار المهني',
    'experience.title': 'الخبرات العملية',
    'experience.subtitle': 'رحلتي المهنية في تطوير البرمجيات و DevOps',
    
    // Contact
    'contact.category': 'التواصل',
    'contact.title': 'تواصل معي',
    'contact.subtitle': 'أحب أن أسمع منك! دعنا نعمل معاً على شيء رائع',
    'contact.info': 'معلومات التواصل',
    'contact.hours': 'ساعات العمل',
    'contact.workHours': 'الأحد - الخميس: 9 صباحاً - 6 مساءً',
    'contact.weekend': 'الجمعة - السبت: مغلق',
    'contact.name': 'الاسم',
    'contact.namePlaceholder': 'اسمك الكامل',
    'contact.email': 'البريد الإلكتروني',
    'contact.message': 'الرسالة',
    'contact.messagePlaceholder': 'اكتب رسالتك هنا...',
    'contact.send': 'إرسال الرسالة',
    'contact.sent': 'تم الإرسال! ✓',
    'contact.sending': 'جاري الإرسال...',
    'contact.error': 'حدث خطأ في إرسال الرسالة. يرجى المحاولة مرة أخرى.',
    'contact.location': 'الرياض، المملكة العربية السعودية',
    
    // Footer
    'footer.rights': 'جميع الحقوق محفوظة.',
    'footer.madeWith': 'صُنع بـ ❤️ باستخدام React, TailwindCSS, و Framer Motion',
    
    // Project Modal
    'modal.close': 'إغلاق',
    'modal.technologies': 'التقنيات المستخدمة:',
    'modal.visit': 'زيارة المشروع',
    'modal.github': 'عرض الكود على GitHub',
  },
  en: {
    // Navbar
    'nav.home': 'Home',
    'nav.projects': 'Projects',
    'nav.experience': 'Experience',
    'nav.skills': 'Skills',
    'nav.contact': 'Contact',
    
    // Hero
    'hero.greeting': "Hello, I'm",
    'hero.name': 'Jorie Alsakran',
    'hero.title': 'Software Engineer',
    'hero.description': 'I create innovative digital solutions that combine beauty and performance',
    'hero.available': 'Available for new projects',
    'hero.viewProjects': 'View My Work',
    'hero.contact': 'Contact Me',
    'hero.workTogether': "Let's Work Together",
    
    // Navbar
    'nav.developer': 'Developer',
    
    // Projects
    'projects.category': 'PORTFOLIO',
    'projects.title': 'My Projects',
    'projects.subtitle': 'A collection of projects I\'m proud of',
    'projects.viewDetails': 'View Details',
    
    // Skills
    'skills.category': 'EXPERTISE',
    'skills.title': 'My Skills',
    'skills.subtitle': 'Technologies and tools I master',
    
    // Experience
    'experience.careerPath': 'CAREER PATH',
    'experience.title': 'Work Experience',
    'experience.subtitle': 'My professional journey in software development and DevOps',
    
    // Contact
    'contact.category': 'GET IN TOUCH',
    'contact.title': 'Contact Me',
    'contact.subtitle': 'I\'d love to hear from you! Let\'s work together on something amazing',
    'contact.info': 'Contact Information',
    'contact.hours': 'Working Hours',
    'contact.workHours': 'Sunday - Thursday: 9 AM - 6 PM',
    'contact.weekend': 'Friday - Saturday: Closed',
    'contact.name': 'Name',
    'contact.namePlaceholder': 'Your full name',
    'contact.email': 'Email',
    'contact.message': 'Message',
    'contact.messagePlaceholder': 'Write your message here...',
    'contact.send': 'Send Message',
    'contact.sent': 'Sent! ✓',
    'contact.sending': 'Sending...',
    'contact.error': 'An error occurred while sending the message. Please try again.',
    'contact.location': 'Riyadh, Saudi Arabia',
    
    // Footer
    'footer.rights': 'All rights reserved.',
    'footer.madeWith': 'Made with ❤️ using React, TailwindCSS, and Framer Motion',
    
    // Project Modal
    'modal.close': 'Close',
    'modal.technologies': 'Technologies Used:',
    'modal.visit': 'Visit Project',
    'modal.github': 'View Code on GitHub',
  },
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('language')
    return (saved as Language) || 'en' // Default: English
  })

  // Set initial direction on mount
  useEffect(() => {
    const saved = localStorage.getItem('language')
    const initialLang = (saved as Language) || 'en'
    document.documentElement.dir = initialLang === 'ar' ? 'rtl' : 'ltr'
    document.documentElement.lang = initialLang
  }, [])

  useEffect(() => {
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr'
    document.documentElement.lang = language
    localStorage.setItem('language', language)
  }, [language])

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'ar' ? 'en' : 'ar'))
  }

  const t = (key: string): string => {
    return translations[language][key] || key
  }

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
