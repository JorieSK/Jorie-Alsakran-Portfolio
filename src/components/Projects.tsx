import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useLanguage } from '../contexts/LanguageContext'
import type { IconType } from 'react-icons'
import { FaBrain, FaCalculator } from 'react-icons/fa'

export interface Project {
  id: number
  title: { ar: string; en: string }
  description: { ar: string; en: string }
  icon: IconType
  technologies: string[]
  longDescription: { ar: string; en: string }
  link?: string
  github?: string
}

const projects: Project[] = [
  {
    id: 1,
    title: { ar: 'BLOSSOM', en: 'Blossom' },
    description: {
      ar: 'منصة تحليل مشاعر مدعومة بالذكاء الاصطناعي (هدى) لفهم وتحليل مشاعرك اليومية.',
      en: 'AI-powered emotion analysis platform (Huda Assistant) that helps you understand and analyze your daily emotions.',
    },
    icon: FaBrain,
    technologies: ['Python', 'OpenAI - ChatGPT-4', 'Prompt Engineering', 'React', 'MongoDB', 'Firebase', 'TailwindCSS', ],
    longDescription: {
      ar: 'مشروع التخرج Blossom: منصة متكاملة تعتمد على مساعد هدى المدعوم بـ ChatGPT-4 وتحسين البرومبتات (Prompt Engineering) لتحليل مشاعرك اليومية، تقديم اقتراحات، وتلخيص حالتك العاطفية مع واجهة حديثة وسهلة الاستخدام.',
      en: 'Graduate project Blossom: an end-to-end platform powered by Huda Assistant using ChatGPT-4 and advanced prompt engineering to analyze user emotions, provide suggestions, and summarize emotional state with a modern, user-friendly interface.',
    },
  },
  {
    id: 2,
    title: { ar: 'YMoney', en: 'YMoney' },
    description: {
      ar: 'منصّة مالية لحساب الزكاة، تقدير الضرائب، وتحويل العملات.',
      en: 'Financial platform for Zakat calculations, tax estimation, and currency conversion.',
    },
    icon: FaCalculator,
    technologies: ['Android', 'JavaScript', 'HTML', 'CSS', 'MongoDB', 'Firebase'],
    longDescription: {
      ar: 'منصّة ويب وتطبيق أندرويد متجاوب يساعد المستخدم على حساب الزكاة، تقدير الضرائب، وتحويل العملات بسهولة، مع واجهة بسيطة وتجربة استخدام سلسة.',
      en: 'Responsive web and Android application that helps users calculate Zakat, estimate taxes, and convert currencies with a simple UI and smooth user experience.',
    },
  },
]

interface ProjectsProps {
  onProjectClick: (project: Project) => void
}

const Projects = ({ onProjectClick }: ProjectsProps) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })
  const { language, t } = useLanguage()

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  }

  const cardVariants = {
    hidden: { y: 60, opacity: 0, scale: 0.9 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
    },
  }

  return (
    <section id="projects" className="py-24 px-6 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 dark:bg-gradient-to-br dark:from-black dark:via-[#0a0e27] dark:to-[#1a1f3a] bg-gradient-to-br from-white via-blue-50/50 to-slate-50/30"></div>
      
      <div className="container mx-auto relative z-10 max-w-7xl">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {/* Header */}
          <motion.div className="text-center mb-20">
            <motion.p
              initial={{ opacity: 0, y: -20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="text-blue-600 dark:text-blue-400 font-semibold text-sm uppercase tracking-wider mb-3"
            >
              {t('projects.category')}
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6"
            >
              <span className="bg-gradient-to-r from-blue-600 via-blue-700 to-slate-800 dark:from-blue-400 dark:via-blue-500 dark:to-slate-300 bg-clip-text text-transparent">
                {t('projects.title')}
              </span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: -20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl dark:text-white/70 text-[#1a1a2e]/70 max-w-2xl mx-auto"
            >
              {t('projects.subtitle')}
            </motion.p>
          </motion.div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
            {projects.map((project) => (
              <motion.div
                key={project.id}
                variants={cardVariants}
                transition={{ duration: 0.7, ease: 'easeOut' }}
                whileHover={{ y: -12, scale: 1.02 }}
                className="group relative"
                onClick={() => onProjectClick(project)}
              >
                {/* Main Card */}
                <div className="relative h-full rounded-3xl overflow-hidden cursor-pointer">
                  {/* Background with Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-blue-600/10 to-slate-700/10 dark:from-blue-500/20 dark:via-blue-600/20 dark:to-slate-700/20 rounded-3xl backdrop-blur-xl border border-white/20 dark:border-white/10 group-hover:border-blue-300/40 dark:group-hover:border-blue-400/40 transition-all duration-500" />
                  
                  {/* Animated Gradient Overlay */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-blue-500 via-blue-600 to-slate-700 dark:from-blue-600 dark:via-blue-700 dark:to-slate-800 opacity-0 group-hover:opacity-10 rounded-3xl transition-opacity duration-500"
                    animate={{
                      backgroundPosition: ['0% 0%', '100% 100%'],
                    }}
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                      repeatType: 'reverse',
                    }}
                  />

                  {/* Content Container */}
                  <div className="relative p-8 md:p-10 h-full flex flex-col">
                    {/* Icon Section */}
                    <div className="mb-6">
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: [0, -5, 5, -5, 0] }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-slate-700 dark:from-blue-600 dark:to-slate-800 shadow-lg shadow-blue-500/30 mb-4"
                      >
                        <project.icon className="w-10 h-10 text-white" />
                      </motion.div>
                    </div>

                    {/* Title */}
                    <h3 className="text-3xl md:text-4xl font-bold mb-4 dark:text-white text-[#1a1a2e] group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                      {project.title[language]}
                    </h3>

                    {/* Description */}
                    <p className="text-base md:text-lg dark:text-white/80 text-[#1a1a2e]/80 mb-6 leading-relaxed flex-1">
                      {project.description[language]}
                    </p>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.technologies.slice(0, 4).map((tech, techIndex) => (
                        <motion.span
                          key={tech}
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: techIndex * 0.1 }}
                          whileHover={{ scale: 1.05, y: -2 }}
                          className="px-3 py-1.5 bg-white/80 dark:bg-white/5 text-blue-700 dark:text-blue-300 rounded-lg text-xs font-medium border border-blue-200/50 dark:border-blue-500/30 shadow-sm"
                        >
                          {tech}
                        </motion.span>
                      ))}
                      {project.technologies.length > 4 && (
                        <span className="px-3 py-1.5 bg-white/80 dark:bg-white/5 text-blue-700 dark:text-blue-300 rounded-lg text-xs font-medium border border-blue-200/50 dark:border-blue-500/30">
                          +{project.technologies.length - 4}
                        </span>
                      )}
                    </div>

                    {/* View Details Button */}
                    <motion.div
                      className="flex items-center justify-between pt-4 border-t border-blue-200/30 dark:border-blue-500/20"
                      whileHover={{ x: language === 'ar' ? -4 : 4 }}
                    >
                      <span className="text-sm font-semibold text-blue-600 dark:text-blue-400 group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors">
                        {t('projects.viewDetails')}
                      </span>
                      <motion.div
                        animate={{ x: language === 'ar' ? [-4, 0, -4] : [4, 0, 4] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                        className="w-7 h-7 rounded-full bg-gradient-to-r from-blue-500 to-slate-700 dark:from-blue-400 dark:to-slate-600 flex items-center justify-center"
                      >
                        <span className="text-white text-xs font-bold">
                          {language === 'ar' ? '←' : '→'}
                        </span>
                      </motion.div>
                    </motion.div>
                  </div>

                  {/* Decorative Elements */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-slate-600/20 rounded-full blur-3xl -z-10 group-hover:scale-150 transition-transform duration-700" />
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-blue-500/20 to-slate-700/20 rounded-full blur-2xl -z-10 group-hover:scale-125 transition-transform duration-700" />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Projects
