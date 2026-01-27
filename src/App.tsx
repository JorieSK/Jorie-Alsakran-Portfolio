import { useState } from 'react'
import { ThemeProvider } from './contexts/ThemeContext'
import { LanguageProvider } from './contexts/LanguageContext'
import Hero from './components/Hero'
import Projects from './components/Projects'
import Experience from './components/Experience'
import Skills from './components/Skills'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import ProjectModal from './components/ProjectModal'
import CustomCursor from './components/CustomCursor'
import ScrollProgress from './components/ScrollProgress'
import type { Project } from './components/Projects'

function App() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  return (
    <ThemeProvider>
      <LanguageProvider>
        <div className="min-h-screen transition-colors duration-300">
          <CustomCursor />
          <ScrollProgress />
          <Navbar />
          <Hero />
          <Projects onProjectClick={setSelectedProject} />
          <Experience />
          <Skills />
          <Contact />
          <Footer />
          {selectedProject && (
            <ProjectModal 
              project={selectedProject} 
              onClose={() => setSelectedProject(null)} 
            />
          )}
        </div>
      </LanguageProvider>
    </ThemeProvider>
  )
}

export default App
