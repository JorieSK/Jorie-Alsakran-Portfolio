import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useLanguage } from '../contexts/LanguageContext'

interface ExperienceItem {
  startDate: string
  endDate: { ar: string; en: string }
  title: { ar: string; en: string }
  company: string
  location: { ar: string; en: string }
  description: { ar: string; en: string }
  achievements: { ar: string[]; en: string[] }
}

const experiences: ExperienceItem[] = [
  {
    startDate: '2024',
    endDate: { ar: 'حالياً', en: 'Present' },
    title: { ar: 'متدرب - عمليات تقنية المعلومات', en: 'Trainee - IT Operations' },
    company: 'Saudi Information Technology (SITE)',
    location: { ar: 'الرياض، المملكة العربية السعودية', en: 'Riyadh, Saudi Arabia' },
    description: {
      ar: 'دور متدرب عملي عبر فرق الأنظمة، مكتب المساعدة، والحلول.',
      en: 'Hands-on trainee role across systems, help desk, and solutions teams.',
    },
    achievements: {
      ar: [
        'تكوين Jira و Confluence في بيئة اختبار محكمة وإنشاء نصوص مخصصة لمساعدة إعداد النظام الأساسي.',
        'دعم عمليات تقنية المعلومات اليومية وحل طلبات الموظفين التقنية.',
        'معالجة عمليات التوظيف وإنهاء الخدمة مع توفير الحسابات وإدارة الوصول.',
        'بناء مكونات الواجهة الأمامية باستخدام React ومكونات الخلفية باستخدام Express.js/Prisma، بما في ذلك وظيفة تقصير URL مع تتبع التاريخ.',
        'استخدام Linux VMs للتطوير والاختبار، وتكوين خطوط CI/CD مع GitLab و Docker.',
        'قيادة تطوير مواقع المنتجات الرسمية مع ميزات محسنة وسهولة استخدام.',
      ],
      en: [
        'Configured Jira and Confluence in a controlled test environment and created custom scripts to assist foundational system setup.',
        'Supported daily IT operations and resolved employee technical requests.',
        'Handled onboarding and offboarding with account provisioning and access management.',
        'Built frontend components with React and backend components with Express.js/Prisma, including URL shortening functionality with history tracking.',
        'Used Linux VMs for development and testing, and configured CI/CD pipelines with GitLab and Docker.',
        'Led development of official product websites with enhanced features and usability.',
      ],
    },
  },
  {
    startDate: '2023',
    endDate: { ar: '2024', en: '2024' },
    title: { ar: 'مطور واجهة أمامية', en: 'Frontend Developer' },
    company: 'Hotspot Fintech',
    location: { ar: 'الرياض، المملكة العربية السعودية', en: 'Riyadh, Saudi Arabia' },
    description: {
      ar: 'التركيز على واجهات أمامية عالية الأداء للهواتف المحمولة وواجهات مستخدم بديهية.',
      en: 'Focused on high-performance mobile frontends and intuitive user interfaces.',
    },
    achievements: {
      ar: [
        'تطوير ميزات واجهة أمامية عالية الأداء للهواتف المحمولة باستخدام Angular و TypeScript و Ionic/Capacitor مع دمج REST APIs وإدارة حالة التطبيق.',
        'تصميم وتنفيذ UI/UX بديهي في Figma للتطبيقات المحمولة.',
        'تحسين تصميم واجهة الموقع الأمامية وتجربة المستخدم لمنتجات التكنولوجيا المالية.',
        'إجراء اختبار API باستخدام Postman وتحسين استقرار التطبيق من خلال التصحيح الاستباقي ومعالجة الأخطاء.',
      ],
      en: [
        'Developed high-performance mobile frontend features with Angular, TypeScript, and Ionic/Capacitor integrating REST APIs and managing application state.',
        'Designed and implemented intuitive UI/UX in Figma for mobile applications.',
        'Improved website frontend design and user experience for fintech products.',
        'Performed API testing with Postman and enhanced application stability through proactive debugging and error handling.',
      ],
    },
  },
  {
    startDate: '2022',
    endDate: { ar: '2023', en: '2023' },
    title: { ar: 'مطور الخلفية والهيكل', en: 'Backend & Structure Developer' },
    company: 'Rawiah',
    location: { ar: 'الرياض، المملكة العربية السعودية', en: 'Riyadh, Saudi Arabia' },
    description: {
      ar: 'العمل على معماريات الخلفية، التوثيق، وتكاملات API.',
      en: 'Worked on backend architectures, documentation, and API integrations.',
    },
    achievements: {
      ar: [
        'إجراء مراجعات معمارية النظام والتوثيق لدعم قابلية الصيانة ونقل المعرفة.',
        'تطوير واختبار RESTful APIs لضمان تكامل سلس للواجهة الأمامية وأداء محسّن.',
        'التحقق من صحة الوظائف وموثوقية خدمات الخلفية.',
      ],
      en: [
        'Conducted system architecture reviews and documentation to support maintainability and knowledge transfer.',
        'Developed and tested RESTful APIs ensuring smooth frontend integration and optimized performance.',
        'Validated functional correctness and reliability of backend services.',
      ],
    },
  },
  {
    startDate: '2021',
    endDate: { ar: '2022', en: '2022' },
    title: { ar: 'مطور أعمال', en: 'Business Developer' },
    company: 'Fajr AlTharwah Business Services',
    location: { ar: 'الرياض، المملكة العربية السعودية', en: 'Riyadh, Saudi Arabia' },
    description: {
      ar: 'دمج الفهم التقني مع نمو الأعمال ومشاركة العملاء.',
      en: 'Blended technical understanding with business growth and client engagement.',
    },
    achievements: {
      ar: [
        'الاجتماع مع العملاء لتقييم المنتجات وأهداف السوق ومتطلبات الأعمال وتقديم توصيات لتحسين ملاءمة المنتج للسوق.',
        'تطوير وتنفيذ استراتيجيات النمو مع الشركاء الاستراتيجيين ومراكز الابتكار.',
        'المساعدة في تحسين العمليات التشغيلية وإنشاء روابط أعمال فعالة.',
      ],
      en: [
        'Met with clients to assess products, market objectives, and business requirements and recommended improvements for product–market fit.',
        'Developed and implemented growth strategies with strategic partners and innovation hubs.',
        'Helped improve operational processes and establish effective business connections.',
      ],
    },
  },
]

const Experience = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })
  const { language, t } = useLanguage()

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  }

  const itemVariants = {
    hidden: { x: -50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.6 },
    },
  }

  return (
    <section id="experience" className="py-20 px-6 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 dark:bg-gradient-to-br dark:from-black dark:via-[#0a0e27] dark:to-[#1a1f3a] bg-gradient-to-br from-white via-blue-100 to-blue-50" />

      <div className="container mx-auto relative z-10">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <motion.p
              initial={{ opacity: 0, y: -20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="text-blue-600 dark:text-blue-400 font-semibold text-sm uppercase tracking-wider mb-2"
            >
              {t('experience.careerPath')}
            </motion.p>
            <motion.h2
              variants={itemVariants}
              className="text-5xl md:text-6xl font-bold mb-4"
            >
              <span className="text-gradient dark:bg-gradient-to-r dark:from-blue-400 dark:via-blue-500 dark:to-slate-300 dark:bg-clip-text dark:text-transparent">
                {t('experience.title')}
              </span>
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="text-xl dark:text-white/70 text-[#1a1a2e]/70"
            >
              {t('experience.subtitle')}
            </motion.p>
          </motion.div>

          {/* Timeline and Experiences */}
          <div className="max-w-5xl mx-auto relative">
            {/* Timeline Line */}
            <div className="absolute left-8 md:left-12 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-600 via-blue-500 to-blue-600 dark:from-blue-400 dark:via-blue-300 dark:to-blue-400" />

            {/* Experience Items */}
            <div className="space-y-16">
              {experiences.map((exp, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="relative pl-20 md:pl-0"
                >
                  {/* Timeline Marker */}
                  <div className="absolute left-8 md:left-12 top-6 w-4 h-4 transform -translate-x-1/2 z-10">
                    <div className="absolute inset-0 bg-blue-600 dark:bg-blue-400 rounded-full animate-pulse" />
                    <div className="absolute inset-1 bg-white dark:bg-[#1a1f3a] rounded-full" />
                    <div className="absolute inset-2 bg-blue-600 dark:bg-blue-400 rounded-full" />
                  </div>

                  {/* Experience Card */}
                  <div className="md:ml-16">
                    <motion.div
                      whileHover={{ scale: 1.02, y: -5 }}
                      className="relative rounded-3xl overflow-hidden group"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-blue-600/10 to-slate-700/10 dark:from-blue-500/20 dark:via-blue-600/20 dark:to-slate-700/20 rounded-3xl backdrop-blur-xl border border-white/20 dark:border-white/10 group-hover:border-blue-300/40 dark:group-hover:border-blue-400/40 transition-all duration-500" />

                      <div className="relative p-6 md:p-8">
                      {/* Job Title */}
                      <h3 className="text-2xl md:text-3xl font-bold dark:text-white text-[#1a1a2e] mb-2 relative z-10">
                        {exp.title[language]}
                      </h3>

                      {/* Company and Location */}
                      <p className="text-lg text-blue-600 dark:text-blue-400 font-medium mb-4 relative z-10">
                        {exp.company}, {exp.location[language]}
                      </p>

                      {/* Description */}
                      <p className="text-base dark:text-white/80 text-[#1a1a2e]/80 mb-4 relative z-10">
                        {exp.description[language]}
                      </p>

                      {/* Achievements */}
                      <ul className="space-y-2 relative z-10">
                        {exp.achievements[language].map((achievement, idx) => (
                          <li
                            key={idx}
                            className="flex items-start gap-3 text-sm dark:text-white/70 text-[#1a1a2e]/70"
                          >
                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400 flex-shrink-0" />
                            <span>{achievement}</span>
                          </li>
                        ))}
                      </ul>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Experience
