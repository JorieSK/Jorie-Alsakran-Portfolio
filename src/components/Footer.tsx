import { motion } from 'framer-motion'
import { useLanguage } from '../contexts/LanguageContext'
import { FaGithub, FaLinkedin } from 'react-icons/fa'

const socialLinks = [
  {
    name: 'GitHub',
    icon: <FaGithub />,
    url: 'https://github.com/JorieSK',
  },
  {
    name: 'LinkedIn',
    icon: <FaLinkedin />,
    url: 'https://www.linkedin.com/in/jorie-alsakran',
  },
]

const Footer = () => {
  const currentYear = new Date().getFullYear()
  const { t } = useLanguage()

  return (
    <footer className="py-12 px-6 border-t border-white/10 relative overflow-hidden">
      <div className="absolute inset-0 dark:bg-gradient-to-br dark:from-black dark:via-[#0a0e27] dark:to-[#1a1f3a] bg-gradient-to-br from-white via-blue-100 to-blue-50"></div>

      <div className="container mx-auto relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="dark:text-white/60 text-[#1a1a2e]/60"
          >
            © {currentYear} Jorie Alsakran. {t('footer.rights')}
          </motion.p>

          <div className="flex items-center gap-6">
            {socialLinks.map((social, index) => (
              <motion.a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.95 }}
                className="text-2xl dark:text-white text-[#1a1a2e] hover:text-blue-500 transition-colors"
                aria-label={social.name}
              >
                {social.icon}
              </motion.a>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-8 text-center dark:text-white/40 text-[#1a1a2e]/40 text-sm"
        >
          <p>{t('footer.madeWith')}</p>
        </motion.div>
      </div>
    </footer>
  )
}

export default Footer
