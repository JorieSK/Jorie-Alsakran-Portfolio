import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useLanguage } from '../contexts/LanguageContext'
import {
  FaReact,
  FaNodeJs,
  FaGitAlt,
  FaDocker,
  FaAws,
  FaBrain,
} from 'react-icons/fa'
import { SiNextdotjs, SiPostgresql, SiFigma, SiGraphql, SiJest, SiJavascript, SiHtml5, SiCss3, SiMongodb, SiFirebase, SiPython } from 'react-icons/si'
import { MdBuild } from 'react-icons/md'

interface Skill {
  name: string
  level: number
  icon: React.ReactElement
}

const skills: Skill[] = [
  { name: 'React (TypeScript)', level: 90, icon: <FaReact /> },
  { name: 'Angular', level: 85, icon: <SiNextdotjs /> },
  { name: 'Flutter', level: 80, icon: <FaReact /> },
  { name: 'Figma', level: 85, icon: <SiFigma /> },
  { name: 'Python / Django / Flask', level: 80, icon: <FaNodeJs /> },
  { name: 'Node.js / Express.js', level: 85, icon: <FaNodeJs /> },
  { name: 'Prisma / PostgreSQL', level: 80, icon: <SiPostgresql /> },
  { name: 'REST APIs & JSON', level: 90, icon: <SiGraphql /> },
  { name: 'JavaScript', level: 90, icon: <SiJavascript /> },
  { name: 'HTML', level: 90, icon: <SiHtml5 /> },
  { name: 'CSS', level: 90, icon: <SiCss3 /> },
  { name: 'MongoDB', level: 85, icon: <SiMongodb /> },
  { name: 'Firebase', level: 85, icon: <SiFirebase /> },
  { name: 'Python', level: 85, icon: <SiPython /> },
  { name: 'OpenAI', level: 85, icon: <FaBrain /> },
]

const extraSkills = [
  { name: 'API Testing (Postman)', icon: <SiJest /> },
  { name: 'GitLab CI/CD', icon: <FaGitAlt /> },
  { name: 'Docker', icon: <FaDocker /> },
  { name: 'Linux (RHEL)', icon: <FaAws /> },
  { name: 'Env Configuration & Testing', icon: <MdBuild /> },
  { name: 'Bash Scripting & Automation', icon: <MdBuild /> },
  { name: 'Cloud Concepts (IaaS, PaaS, SaaS)', icon: <FaAws /> },
]

const Skills = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })
  const { t } = useLanguage()

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, type: 'spring' as const, stiffness: 90 },
    },
  }

  return (
    <section id="skills" className="py-20 px-6 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 dark:bg-gradient-to-br dark:from-black dark:via-[#0a0e27] dark:to-[#1a1f3a] bg-gradient-to-br from-white via-blue-100 to-blue-50" />

      <div className="container mx-auto relative z-10">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          style={{ minHeight: '400px' }}
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <motion.p
              initial={{ opacity: 0, y: -20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="text-blue-600 dark:text-blue-400 font-semibold text-sm uppercase tracking-wider mb-2"
            >
              {t('skills.category')}
            </motion.p>
            <motion.h2
              variants={itemVariants}
              className="text-5xl md:text-6xl font-bold mb-4"
            >
              <span className="text-gradient dark:bg-gradient-to-r dark:from-blue-400 dark:via-blue-500 dark:to-slate-300 dark:bg-clip-text dark:text-transparent">
                {t('skills.title')}
              </span>
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="text-xl dark:text-white/70 text-[#1a1a2e]/70"
            >
              {t('skills.subtitle')}
            </motion.p>
          </motion.div>

          {/* Main Skills - Compact pill list */}
          <motion.div
            variants={itemVariants}
            className="max-w-5xl mx-auto mb-12 md:mb-16"
          >
            <div className="flex flex-wrap justify-center gap-3 md:gap-4">
              {skills.map((skill) => (
                <motion.div
                  key={skill.name}
                  whileHover={{ y: -4, scale: 1.03 }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 dark:bg-white/5 border border-blue-200/60 dark:border-blue-500/30 shadow-sm shadow-blue-100/60 dark:shadow-none"
                >
                  <span className="text-lg md:text-xl text-blue-600 dark:text-blue-400">
                    {skill.icon}
                  </span>
                  <span className="text-sm md:text-base font-medium text-[#1a1a2e] dark:text-blue-300">
                    {skill.name}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Extra Skills - Small badges */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap justify-center gap-2 md:gap-3 max-w-4xl mx-auto"
          >
            {extraSkills.map((skill, index) => (
              <motion.div
                key={skill.name}
                whileHover={{ y: -3, scale: 1.05 }}
                transition={{
                  delay: index * 0.03,
                  type: 'spring',
                  stiffness: 200,
                  damping: 18,
                }}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-600/10 dark:bg-blue-500/20 border border-blue-300/60 dark:border-blue-500/40 cursor-default"
              >
                <span className="text-lg text-blue-600 dark:text-blue-400">
                  {skill.icon}
                </span>
                <span className="text-xs md:text-sm font-medium text-[#1a1a2e] dark:text-white/90">
                  {skill.name}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Skills
