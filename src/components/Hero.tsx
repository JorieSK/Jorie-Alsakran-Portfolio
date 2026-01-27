import { useEffect, useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useLanguage } from '../contexts/LanguageContext'

const Hero = () => {
  const { t } = useLanguage()
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })
  const [displayedText, setDisplayedText] = useState('')
  const [showCursor, setShowCursor] = useState(true)
  
  const fullText = t('hero.title')

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6 },
    },
  }

  // Typing animation effect
  const currentIndexRef = useRef(0)
  const isDeletingRef = useRef(false)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (!inView) {
      setDisplayedText('')
      currentIndexRef.current = 0
      isDeletingRef.current = false
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
      return
    }

    setDisplayedText('')
    currentIndexRef.current = 0
    isDeletingRef.current = false

    const typeText = () => {
      const currentIndex = currentIndexRef.current
      const isDeleting = isDeletingRef.current

      if (!isDeleting && currentIndex < fullText.length) {
        // Typing forward
        currentIndexRef.current = currentIndex + 1
        setDisplayedText(fullText.slice(0, currentIndexRef.current))
        timeoutRef.current = setTimeout(typeText, 100) // Typing speed
      } else if (!isDeleting && currentIndex === fullText.length) {
        // Wait before deleting
        timeoutRef.current = setTimeout(() => {
          isDeletingRef.current = true
          typeText()
        }, 2000) // Wait 2 seconds before deleting
      } else if (isDeleting && currentIndex > 0) {
        // Deleting backward
        currentIndexRef.current = currentIndex - 1
        setDisplayedText(fullText.slice(0, currentIndexRef.current))
        timeoutRef.current = setTimeout(typeText, 50) // Deleting speed (faster)
      } else if (isDeleting && currentIndex === 0) {
        // Wait before typing again
        isDeletingRef.current = false
        timeoutRef.current = setTimeout(typeText, 500) // Wait before retyping
      }
    }

    timeoutRef.current = setTimeout(typeText, 500) // Initial delay

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [inView, fullText])

  // Cursor blinking effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev)
    }, 530) // Blink speed

    return () => clearInterval(cursorInterval)
  }, [])

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
      {/* Background Gradient */}
      <div className="absolute inset-0 dark:bg-gradient-to-br dark:from-black dark:via-[#0a0e27] dark:to-[#1a1f3a] bg-gradient-to-br from-white via-blue-100 to-blue-50"></div>
      
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        className="container mx-auto px-6 lg:px-12 relative z-10"
      >
        <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-12 items-center">
          {/* Left Column - Text Content */}
          <motion.div variants={itemVariants} className="space-y-8">
            {/* Available Badge */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-500/30 dark:border-blue-500/30 border-blue-400/50 bg-blue-500/10 dark:bg-blue-500/10 bg-white/80 backdrop-blur-sm"
            >
              <div className="w-2 h-2 rounded-full bg-blue-500 dark:bg-blue-500 bg-blue-600 animate-pulse"></div>
              <span className="dark:text-white/90 text-slate-800 text-sm font-medium">{t('hero.available')}</span>
            </motion.div>

            {/* Main Heading */}
            <div className="space-y-4">
              <motion.h1
                variants={itemVariants}
                className="text-5xl md:text-6xl lg:text-7xl font-bold dark:text-white text-[#1a1a2e] leading-tight"
              >
                <span className="block">{t('hero.greeting')}</span>
                <span className="block bg-gradient-to-r from-blue-500 via-blue-300 to-white dark:from-blue-500 dark:via-blue-300 dark:to-white from-blue-600 via-blue-500 to-blue-400 bg-clip-text text-transparent">
                  {t('hero.name')}
                </span>
                <span className="block dark:text-white text-[#1a1a2e]">
                  {displayedText}
                  <span className={`inline-block w-0.5 h-[1em] bg-blue-600 dark:bg-blue-400 ml-1 align-middle ${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}>
                    |
                  </span>
                </span>
              </motion.h1>
            </div>

            {/* Description */}
            <motion.p
              variants={itemVariants}
              className="text-lg md:text-xl dark:text-white/80 text-[#2a2a3e] leading-relaxed max-w-2xl"
            >
              {t('hero.description')}
            </motion.p>

            {/* Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-4"
            >
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all flex items-center gap-2 shadow-lg shadow-blue-500/20"
              >
                {t('hero.workTogether')}
                <span>→</span>
              </motion.a>
              <motion.a
                href="#projects"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-white/5 dark:bg-white/5 bg-white/70 hover:bg-white/10 dark:hover:bg-white/10 hover:bg-white/80 border border-white/20 dark:border-white/20 border-blue-200/50 dark:text-white text-[#1a1a2e] font-semibold rounded-lg transition-all backdrop-blur-sm"
              >
                {t('hero.viewProjects')}
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Right Column - Code Window */}
          <motion.div
            variants={itemVariants}
            className="hidden lg:block"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-[#1e1e2e] rounded-lg shadow-2xl overflow-hidden border border-white/10"
            >
              {/* Code Window Header */}
              <div className="flex items-center gap-2 px-4 py-3 bg-[#252538] border-b border-white/10">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <span className="text-white/60 text-xs ml-4">developer.ts</span>
              </div>

              {/* Code Content */}
              <div className="p-6 font-mono text-sm">
                <div className="space-y-2">
                  <div>
                    <span className="text-purple-400">class</span>{' '}
                    <span className="text-cyan-400">Developer</span>{' '}
                    <span className="text-white">{'{'}</span>
                  </div>
                  <div className="pl-4">
                    <span className="text-purple-400">public</span>{' '}
                    <span className="text-cyan-400">$name</span>{' '}
                    <span className="text-white">=</span>{' '}
                    <span className="text-green-400">'{t('hero.name')}'</span>
                    <span className="text-white">;</span>
                  </div>
                  <div className="pl-4">
                    <span className="text-purple-400">public</span>{' '}
                    <span className="text-cyan-400">$role</span>{' '}
                    <span className="text-white">=</span>{' '}
                    <span className="text-green-400">'{t('hero.title')}'</span>
                    <span className="text-white">;</span>
                  </div>
                  <div className="pl-4">
                    <span className="text-purple-400">public</span>{' '}
                    <span className="text-cyan-400">$passion</span>{' '}
                    <span className="text-white">=</span>{' '}
                    <span className="text-white">[</span>
                  </div>
                  <div className="pl-8 space-y-1">
                    <div>
                      <span className="text-green-400">'React'</span>
                      <span className="text-white">,</span>
                    </div>
                    <div>
                      <span className="text-green-400">'TypeScript'</span>
                      <span className="text-white">,</span>
                    </div>
                    <div>
                      <span className="text-green-400">'Full Stack'</span>
                      <span className="text-white">,</span>
                    </div>
                    <div>
                      <span className="text-green-400">'Learning'</span>
                    </div>
                  </div>
                  <div className="pl-4">
                    <span className="text-white">];</span>
                  </div>
                  <div>
                    <span className="text-white">{'}'}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}

export default Hero
