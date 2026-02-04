import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '../contexts/LanguageContext'
import type { IconType } from 'react-icons'

interface Project {
  id: number
  title: { ar: string; en: string }
  description: { ar: string; en: string }
  icon: IconType
  technologies: string[]
  longDescription: { ar: string; en: string }
  link?: string
  github?: string
}

interface ProjectModalProps {
  project: Project
  onClose: () => void
}

const ProjectModal = ({ project, onClose }: ProjectModalProps) => {
  const { language, t } = useLanguage()

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-50 flex items-center justify-center p-6 dark:bg-black/80 bg-black/50 backdrop-blur-sm"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0, y: 50 }}
          onClick={(e) => e.stopPropagation()}
          className="relative rounded-2xl max-w-2xl w-full overflow-hidden bg-white dark:bg-slate-900 shadow-2xl"
        >
          {/* Top Section - Light blue gradient */}
          <div className="relative h-36 md:h-44 overflow-hidden flex items-center justify-center bg-gradient-to-b from-blue-100 to-blue-200 dark:from-blue-900/40 dark:to-blue-800/50 rounded-t-2xl">
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-3 left-3 w-8 h-8 bg-blue-200/80 dark:bg-blue-700/50 hover:bg-blue-300/90 dark:hover:bg-blue-600/60 rounded-full flex items-center justify-center text-blue-700 dark:text-blue-200 font-bold text-sm shadow-md z-10 transition-colors"
            >
              ✕
            </button>

            {/* Icon - Light grey/white circle */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="relative z-10 w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/90 dark:bg-white/20 border-2 border-blue-200/60 dark:border-white/30 flex items-center justify-center shadow-lg"
            >
              <project.icon className="w-8 h-8 md:w-10 md:h-10 text-blue-600 dark:text-white" />
            </motion.div>
          </div>

          {/* Bottom Section - White content area */}
          <div className="relative p-5 md:p-6 bg-white dark:bg-slate-900 rounded-b-2xl">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-2xl md:text-3xl font-bold mb-3 text-blue-600 dark:text-blue-400"
            >
              {project.title[language]}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-base font-semibold text-slate-800 dark:text-slate-200 mb-4"
            >
              {project.description[language]}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-sm text-slate-600 dark:text-slate-400 mb-6 leading-relaxed font-normal"
            >
              {project.longDescription[language]}
            </motion.p>

            {/* Technologies */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <h3 className="text-base font-bold mb-3 text-slate-800 dark:text-white">
                {t('modal.technologies')}
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 text-sm bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 rounded-full font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default ProjectModal
