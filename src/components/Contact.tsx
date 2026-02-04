import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useLanguage } from '../contexts/LanguageContext'
import { MdEmail, MdLocationOn } from 'react-icons/md'
import { FaPhoneAlt, FaWhatsapp, FaLinkedin } from 'react-icons/fa'
import { useState } from 'react'
import type { FormEvent } from 'react'

const Contact = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })
  const { t } = useLanguage()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  }

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6 },
    },
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus('sending')

    try {
      // Use Web3Forms - sends email directly without Gmail setup
      const web3formsKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY
      
      if (web3formsKey) {
        // Direct send via Web3Forms
        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify({
            access_key: web3formsKey,
            subject: formData.name, // Name = email subject
            from_name: formData.name,
            from_email: formData.email, // Email = sender address (for reply)
            message: formData.message, // Message = email body
            // Note: Web3Forms sends email to the email associated with the Access Key
            // Make sure to use joriealsakran@gmail.com when creating the Access Key
          }),
        })

        const result = await response.json()
        
        if (result.success) {
          setStatus('success')
          setFormData({ name: '', email: '', message: '' })
          setTimeout(() => setStatus('idle'), 3000)
        } else {
          throw new Error(result.message || 'Failed to send')
        }
      } else {
        // If Web3Forms is not configured, use mailto as fallback
        const subject = encodeURIComponent(formData.name)
        const body = encodeURIComponent(
          `From: ${formData.email}\n\nMessage:\n${formData.message}`
        )
        window.location.href = `mailto:joriealsakran@gmail.com?subject=${subject}&body=${body}`
        setStatus('success')
        setFormData({ name: '', email: '', message: '' })
        setTimeout(() => setStatus('idle'), 3000)
      }
    } catch (error) {
      console.error('Error sending email:', error)
      setStatus('error')
      setTimeout(() => setStatus('idle'), 5000)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <section id="contact" className="py-20 px-6 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 dark:bg-gradient-to-br dark:from-black dark:via-[#0a0e27] dark:to-[#1a1f3a] bg-gradient-to-br from-white via-blue-100 to-blue-50" />

      <div className="container mx-auto max-w-4xl relative z-10">
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
              {t('contact.category')}
            </motion.p>
            <motion.h2
              variants={itemVariants}
              className="text-5xl md:text-6xl font-bold mb-4"
            >
              <span className="text-gradient dark:bg-gradient-to-r dark:from-blue-400 dark:via-blue-500 dark:to-slate-300 dark:bg-clip-text dark:text-transparent">
                {t('contact.title')}
              </span>
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="text-xl dark:text-white/70 text-[#1a1a2e]/70"
            >
              {t('contact.subtitle')}
            </motion.p>
          </motion.div>

          <div className="max-w-7xl mx-auto">
            {/* Grid Layout - Form and Info Side by Side */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
              {/* Contact Form */}
              <motion.div variants={itemVariants}>
                <div className="relative rounded-3xl overflow-hidden h-full group">
                  <div className="absolute inset-0 bg-white border border-blue-200/50 shadow-lg rounded-3xl dark:bg-transparent dark:border-transparent dark:shadow-none dark:bg-gradient-to-br dark:from-blue-500/20 dark:via-blue-600/20 dark:to-slate-700/20 dark:border-white/10 group-hover:dark:border-blue-400/40 transition-all duration-500" />
                  <div className="relative p-6 md:p-8 h-full">
                  <h3 className="text-2xl font-bold mb-6 dark:text-white text-[#1a1a2e]">
                    {t('contact.send')}
                  </h3>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name Field */}
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-semibold mb-2 dark:text-white text-[#1a1a2e]"
                      >
                        {t('contact.name')}
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder={t('contact.namePlaceholder')}
                        className="w-full px-4 py-3 rounded-lg border border-blue-200/50 dark:border-blue-500/30 bg-white dark:bg-slate-800/80 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent dark:text-white text-[#1a1a2e] placeholder:text-gray-400 dark:placeholder:text-gray-500 transition-all duration-300"
                      />
                    </div>

                    {/* Email Field */}
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-semibold mb-2 dark:text-white text-[#1a1a2e]"
                      >
                        {t('contact.email')}
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="your.email@example.com"
                        className="w-full px-4 py-3 rounded-lg border border-blue-200/50 dark:border-blue-500/30 bg-white dark:bg-slate-800/80 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent dark:text-white text-[#1a1a2e] placeholder:text-gray-400 dark:placeholder:text-gray-500 transition-all duration-300"
                      />
                    </div>

                    {/* Message Field */}
                    <div>
                      <label
                        htmlFor="message"
                        className="block text-sm font-semibold mb-2 dark:text-white text-[#1a1a2e]"
                      >
                        {t('contact.message')}
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={6}
                        placeholder={t('contact.messagePlaceholder')}
                        className="w-full px-4 py-3 rounded-lg border border-blue-200/50 dark:border-blue-500/30 bg-white dark:bg-slate-800/80 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent dark:text-white text-[#1a1a2e] placeholder:text-gray-400 dark:placeholder:text-gray-500 resize-none transition-all duration-300"
                      />
                    </div>

                    {/* Submit Button */}
                    <motion.button
                      type="submit"
                      disabled={status === 'sending'}
                      whileHover={{ scale: status === 'sending' ? 1 : 1.02 }}
                      whileTap={{ scale: status === 'sending' ? 1 : 0.98 }}
                      className={`w-full py-3 px-6 rounded-lg font-semibold text-white transition-all duration-300 ${
                        status === 'sending'
                          ? 'bg-blue-400 cursor-not-allowed'
                          : status === 'success'
                          ? 'bg-green-500'
                          : status === 'error'
                          ? 'bg-red-500'
                          : 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-lg shadow-blue-500/30'
                      }`}
                    >
                      {status === 'sending'
                        ? t('contact.sending')
                        : status === 'success'
                        ? t('contact.sent')
                        : status === 'error'
                        ? t('contact.error')
                        : t('contact.send')}
                    </motion.button>
                  </form>
                  </div>
                </div>
              </motion.div>

              {/* Contact Info */}
              <motion.div variants={itemVariants} className="space-y-6">
                <div className="relative rounded-3xl overflow-hidden group">
                  <div className="absolute inset-0 bg-white border border-blue-200/50 shadow-lg rounded-3xl dark:bg-transparent dark:border-transparent dark:shadow-none dark:bg-gradient-to-br dark:from-blue-500/20 dark:via-blue-600/20 dark:to-slate-700/20 dark:border-white/10 group-hover:dark:border-blue-400/40 transition-all duration-500" />
                  <div className="relative p-6">
                  <h3 className="text-2xl font-bold mb-4 dark:text-white text-[#1a1a2e]">
                    {t('contact.info')}
                  </h3>

                  <div className="space-y-4">
                    {/* Email */}
                    <a
                      href="https://mail.google.com/mail/?view=cm&to=joriealsakran@gmail.com&su=Contact%20from%20Portfolio"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 dark:text-white/80 text-[#1a1a2e]/80 hover:text-blue-500 transition-colors cursor-pointer group"
                    >
                      <motion.div whileHover={{ scale: 1.1 }}>
                        <MdEmail className="text-xl" />
                      </motion.div>
                      <span>joriealsakran@gmail.com</span>
                    </a>

                    {/* Phone */}
                    <a
                      href="tel:+966501497394"
                      className="flex items-center gap-4 dark:text-white/80 text-[#1a1a2e]/80 hover:text-blue-500 transition-colors cursor-pointer group"
                    >
                      <motion.div whileHover={{ scale: 1.1 }}>
                        <FaPhoneAlt className="text-lg" />
                      </motion.div>
                      <span>+966 50 149 7394</span>
                    </a>

                    {/* WhatsApp */}
                    <a
                      href="https://wa.me/966501497394"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 dark:text-white/80 text-[#1a1a2e]/80 hover:text-green-500 transition-colors cursor-pointer group"
                    >
                      <motion.div whileHover={{ scale: 1.1 }}>
                        <FaWhatsapp className="text-xl" />
                      </motion.div>
                      <span>WhatsApp</span>
                    </a>

                    {/* LinkedIn */}
                    <a
                      href="https://www.linkedin.com/in/jorie-alsakran"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 dark:text-white/80 text-[#1a1a2e]/80 hover:text-blue-600 transition-colors cursor-pointer group"
                    >
                      <motion.div whileHover={{ scale: 1.1 }}>
                        <FaLinkedin className="text-xl" />
                      </motion.div>
                      <span>LinkedIn</span>
                    </a>

                    {/* Location */}
                    <div className="flex items-center gap-4 dark:text-white/80 text-[#1a1a2e]/80">
                      <MdLocationOn className="text-xl" />
                      <span>{t('contact.location')}</span>
                    </div>
                  </div>
                  </div>
                </div>

                {/* Working Hours */}
                <div className="relative rounded-3xl overflow-hidden group">
                  <div className="absolute inset-0 bg-white border border-blue-200/50 shadow-lg rounded-3xl dark:bg-transparent dark:border-transparent dark:shadow-none dark:bg-gradient-to-br dark:from-blue-500/20 dark:via-blue-600/20 dark:to-slate-700/20 dark:border-white/10 group-hover:dark:border-blue-400/40 transition-all duration-500" />
                  <div className="relative p-6">
                  <h3 className="text-2xl font-bold mb-4 dark:text-white text-[#1a1a2e]">
                    {t('contact.hours')}
                  </h3>
                  <p className="dark:text-white/80 text-[#1a1a2e]/80">
                    {t('contact.workHours')}
                  </p>
                  <p className="dark:text-white/80 text-[#1a1a2e]/80">
                    {t('contact.weekend')}
                  </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Contact
