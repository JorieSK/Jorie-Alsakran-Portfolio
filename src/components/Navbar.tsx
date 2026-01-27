import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useTheme } from '../contexts/ThemeContext'
import { useLanguage } from '../contexts/LanguageContext'

const Navbar = () => {
  const [activeSection, setActiveSection] = useState('hero')
  const { theme, toggleTheme } = useTheme()
  const { language, toggleLanguage, t } = useLanguage()

  useEffect(() => {
    const handleScroll = () => {
      // Update active section based on scroll position
      const sections = ['hero', 'projects', 'experience', 'skills', 'contact']
      const scrollPosition = window.scrollY + 200
      
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i])
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i])
          break
        }
      }
    }
    window.addEventListener('scroll', handleScroll)
    handleScroll() // Check on mount
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setActiveSection(id)
    }
  }

  const navItems = [
    { id: 'hero', key: 'nav.home' },
    { id: 'projects', key: 'nav.projects' },
    { id: 'experience', key: 'nav.experience' },
    { id: 'skills', key: 'nav.skills' },
    { id: 'contact', key: 'nav.contact' },
  ]

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 py-4 bg-transparent"
    >
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => scrollToSection('hero')}
            className="relative group cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <motion.div
                className="relative"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 via-blue-600 to-black dark:from-blue-500 dark:via-blue-600 dark:to-slate-900 p-0.5">
                  <div className="w-full h-full rounded-lg bg-white dark:bg-[#0a0e27] flex items-center justify-center">
                    <span className="text-blue-600 dark:text-blue-400 font-bold text-lg">J</span>
                  </div>
                </div>
              </motion.div>
              <div className="flex flex-col">
                <span className="text-lg font-bold bg-gradient-to-r from-blue-600 via-blue-700 to-black dark:from-blue-400 dark:via-blue-500 dark:to-white bg-clip-text text-transparent leading-tight">
                  Jorie
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium -mt-1">
                  {t('nav.developer')}
                </span>
              </div>
            </div>
            <motion.div
              className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-blue-500 to-black dark:from-blue-500 dark:to-slate-800 rounded-full"
              initial={{ width: 0 }}
              whileHover={{ width: "100%" }}
              transition={{ duration: 0.3 }}
            />
          </motion.button>
          
          <div className="flex items-center gap-6 md:gap-8">
            {/* Navigation Bar with all controls */}
            <div className="hidden md:flex items-center">
              <div className="relative px-6 py-2 bg-white/95 dark:bg-slate-800/90 backdrop-blur-md rounded-full border border-blue-200/60 dark:border-slate-600/30 shadow-lg shadow-blue-100/50 dark:shadow-slate-900/50">
                <div className="flex items-center gap-4 md:gap-6">
                  {/* Navigation Items */}
                  {navItems.map((item) => {
                    const isActive = activeSection === item.id
                    return (
                      <motion.button
                        key={item.id}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => scrollToSection(item.id)}
                        className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all ${
                          isActive
                            ? 'text-white dark:text-white'
                            : 'text-slate-600 dark:text-white/90 text-[#1a1a2e]/70 dark:text-white/90'
                        }`}
                      >
                        {isActive && (
                          <motion.div
                            layoutId="activeNav"
                            className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-700 dark:bg-slate-700 rounded-full shadow-md shadow-blue-500/30 dark:shadow-none"
                            initial={false}
                            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                          />
                        )}
                        <span className="relative z-10">{t(item.key)}</span>
                      </motion.button>
                    )
                  })}
                  
                  {/* Separator */}
                  <div className="h-6 w-px bg-blue-200/60 dark:bg-slate-600/50 mx-2" />
                  
                  {/* Language Toggle */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={toggleLanguage}
                    className="relative px-4 py-2 rounded-full text-sm font-medium text-slate-600 dark:text-white/90 text-[#1a1a2e]/70 dark:text-white/90 hover:text-blue-600 dark:hover:text-white hover:text-[#1a1a2e] dark:hover:text-white transition-colors"
                    aria-label="Toggle Language"
                  >
                    {language === 'ar' ? 'EN' : 'AR'}
                  </motion.button>
                  
                  {/* Theme Toggle */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={toggleTheme}
                    className="relative px-4 py-2 rounded-full text-sm font-medium text-slate-600 dark:text-white/90 text-[#1a1a2e]/70 dark:text-white/90 hover:text-blue-600 dark:hover:text-white hover:text-[#1a1a2e] dark:hover:text-white transition-colors"
                    aria-label="Toggle Theme"
                  >
                    <span className="text-base">
                      {theme === 'dark' ? '☀️' : '🌙'}
                    </span>
                  </motion.button>
                </div>
              </div>
            </div>
            
            {/* Mobile controls */}
            <div className="flex md:hidden items-center gap-4">
              {/* Language Toggle */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleLanguage}
                className="px-3 py-1.5 bg-white/5 dark:bg-white/5 bg-white/70 hover:bg-white/10 dark:hover:bg-white/10 hover:bg-white/80 border border-white/10 dark:border-white/10 border-blue-200/50 rounded dark:text-white text-[#1a1a2e] text-sm font-medium transition-all backdrop-blur-sm"
                aria-label="Toggle Language"
              >
                {language === 'ar' ? 'EN' : 'AR'}
              </motion.button>

              {/* Theme Toggle */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleTheme}
                className="p-2 bg-white/5 dark:bg-white/5 bg-white/70 hover:bg-white/10 dark:hover:bg-white/10 hover:bg-white/80 border border-white/10 dark:border-white/10 border-blue-200/50 rounded transition-all backdrop-blur-sm"
                aria-label="Toggle Theme"
              >
                <span className="dark:text-white text-[#1a1a2e] text-lg">
                  {theme === 'dark' ? '☀️' : '🌙'}
                </span>
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </motion.nav>
  )
}

export default Navbar
