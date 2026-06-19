import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useLanguage } from '../contexts/LanguageContext'
import type { IconType } from 'react-icons'
import { FaBrain, FaRobot, FaLayerGroup, FaClipboardList } from 'react-icons/fa'

interface CertificationItem {
  title: { ar: string; en: string }
  institution: { ar: string; en: string }
  date: { ar: string; en: string }
  tags: string[]
  icon: IconType
}

const certifications: CertificationItem[] = [
  {
    title: {
      en: 'AI Engineering Bootcamp',
      ar: 'معسكر هندسة الذكاء الاصطناعي',
    },
    institution: {
      en: 'Saudi Digital Academy & WeCloudData',
      ar: 'الأكاديمية السعودية الرقمية & WeCloudData',
    },
    date: { en: 'May 2026 - Jun 2026', ar: 'مايو 2026 - يونيو 2026' },
    tags: ['Generative AI', 'RAG', 'LLM Apps', 'Agentic AI', 'LLM Evaluation'],
    icon: FaBrain,
  },
  {
    title: {
      en: 'Building Agentic AI Systems',
      ar: 'بناء أنظمة الذكاء الاصطناعي الوكيل (Agentic AI)',
    },
    institution: {
      en: 'Saudi Data and AI Authority (SDAIA)',
      ar: 'الهيئة السعودية للبيانات والذكاء الاصطناعي (سدايا)',
    },
    date: { en: 'Apr 2025', ar: 'أبريل 2025' },
    tags: ['Agentic AI', 'Autonomous Workflows', 'SDAIA'],
    icon: FaRobot,
  },
  {
    title: {
      en: 'Design Patterns in Software Development',
      ar: 'أنماط التصميم في تطوير البرمجيات (Design Patterns)',
    },
    institution: {
      en: 'Tuwaiq Academy',
      ar: 'أكاديمية طويق',
    },
    date: { en: 'Apr 2026', ar: 'أبريل 2026' },
    tags: ['Software Architecture', 'Clean Code', 'C# Object-Oriented Design'],
    icon: FaLayerGroup,
  },
  {
    title: {
      en: 'Introduction to ITIL',
      ar: 'مقدمة في مكتبة البنية التحتية لتكنولوجيا المعلومات (Introduction to ITIL)',
    },
    institution: {
      en: 'Tuwaiq Academy',
      ar: 'أكاديمية طويق',
    },
    date: { en: 'Feb 2026', ar: 'فبراير 2026' },
    tags: ['ITIL', 'IT Operations', 'Service Management'],
    icon: FaClipboardList,
  },
]

const Certifications = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })
  const { language, t } = useLanguage()

  return (
    <section id="certifications" className="py-20 px-6 relative overflow-hidden">
      <div className="absolute inset-0 dark:bg-gradient-to-br dark:from-black dark:via-[#0a0e27] dark:to-[#1a1f3a] bg-gradient-to-br from-white via-blue-100 to-blue-50" />

      <div className="container mx-auto relative z-10 max-w-4xl">
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-14">
            <p className="text-blue-600 dark:text-blue-400 font-semibold text-sm uppercase tracking-wider mb-2">
              {t('certifications.category')}
            </p>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-600 via-blue-700 to-slate-800 dark:from-blue-400 dark:via-blue-500 dark:to-slate-300 bg-clip-text text-transparent">
                {t('certifications.title')}
              </span>
            </h2>
            <p className="text-lg dark:text-white/70 text-[#1a1a2e]/70">
              {t('certifications.subtitle')}
            </p>
          </div>

          <div className="rounded-3xl overflow-hidden border border-blue-200/50 dark:border-blue-500/25 bg-white/50 dark:bg-white/5 backdrop-blur-sm divide-y divide-blue-200/40 dark:divide-blue-500/20 shadow-lg shadow-blue-100/40 dark:shadow-none">
            {certifications.map((item, index) => (
              <motion.div
                key={item.title.en}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                whileHover={{ backgroundColor: 'rgba(59, 130, 246, 0.06)' }}
                className="group p-5 md:p-6 transition-colors"
              >
                <div className="flex gap-4 md:gap-5">
                  <div className="shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-slate-700 dark:from-blue-600 dark:to-slate-800 flex items-center justify-center shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
                    <item.icon className="w-5 h-5 text-white" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-4 mb-1">
                      <h3 className="text-base md:text-lg font-bold dark:text-white text-[#1a1a2e] leading-snug">
                        {item.title[language]}
                      </h3>
                      <span className="shrink-0 self-start text-xs font-semibold text-blue-700 dark:text-blue-300 whitespace-nowrap px-3 py-1 rounded-full bg-blue-600/10 dark:bg-blue-500/20 border border-blue-200/60 dark:border-blue-500/30">
                        {item.date[language]}
                      </span>
                    </div>

                    <p className="text-sm text-blue-600 dark:text-blue-400 font-medium mb-3">
                      {item.institution[language]}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 text-xs font-medium rounded-md bg-blue-600/10 dark:bg-blue-500/20 text-blue-700 dark:text-blue-300 border border-blue-200/50 dark:border-blue-500/30"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Certifications
