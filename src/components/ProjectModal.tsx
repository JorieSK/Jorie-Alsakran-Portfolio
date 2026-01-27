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
          className="glass rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        >
          {/* Close Button */}
          <motion.button
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className="absolute top-6 left-6 w-10 h-10 bg-white/10 dark:bg-white/10 bg-white/70 rounded-full flex items-center justify-center dark:text-white text-[#1a1a2e] hover:bg-white/20 dark:hover:bg-white/20 hover:bg-white/80 transition-colors z-10"
          >
            ✕
          </motion.button>

          {/* Project Icon with Enhanced Design */}
          <div className="relative h-64 md:h-96 overflow-hidden flex items-center justify-center bg-gradient-to-br from-blue-500 via-blue-600 to-slate-700 dark:from-blue-600 dark:via-blue-700 dark:to-slate-800">
            {/* Animated Mesh Gradient Overlay */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.3),transparent_50%),radial-gradient(circle_at_70%_80%,rgba(255,255,255,0.2),transparent_50%)]" />
            
            {/* Geometric Pattern */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute inset-0" style={{
                backgroundImage: `linear-gradient(45deg, rgba(255,255,255,0.1) 25%, transparent 25%), linear-gradient(-45deg, rgba(255,255,255,0.1) 25%, transparent 25%)`,
                backgroundSize: '40px 40px'
              }} />
            </div>
            
            {/* Icon Container */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="relative z-10"
            >
              {/* Glow Effect */}
              <div className="absolute inset-0 blur-3xl bg-white/30 rounded-full scale-150" />
              
              {/* Icon Background */}
              <div className="relative w-32 h-32 md:w-48 md:h-48 rounded-full bg-white/20 backdrop-blur-md border-4 border-white/40 flex items-center justify-center shadow-2xl">
                <project.icon className="w-16 h-16 md:w-24 md:h-24 text-white drop-shadow-2xl" />
              </div>
            </motion.div>
            
            {/* Bottom Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-white/60 dark:from-black/70 to-transparent" />
          </div>

          {/* Project Content */}
          <div className="p-8">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-4xl font-bold mb-4 text-gradient"
            >
              {project.title[language]}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-xl dark:text-white/80 text-[#1a1a2e] mb-6"
            >
              {project.description[language]}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="dark:text-white/70 text-[#1a1a2e]/90 mb-8 leading-relaxed"
            >
              {project.longDescription[language]}
            </motion.p>

            {/* Technologies */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mb-2"
            >
              <h3 className="text-xl font-semibold mb-4 dark:text-white text-[#1a1a2e]">
                {t('modal.technologies')}
              </h3>
              <div className="flex flex-wrap gap-3">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-4 py-2 bg-blue-100 dark:bg-blue-600/30 text-blue-700 dark:text-blue-300 rounded-full font-medium"
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
