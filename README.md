# Jorie Alsakran - Portfolio

Personal portfolio showcasing AI engineering projects, technical skills, and professional experience.

**Live site:** [https://joriesk.github.io/Jorie-Alsakran-Portfolio/](https://joriesk.github.io/Jorie-Alsakran-Portfolio/)

Built with React, TypeScript, TailwindCSS, and Framer Motion.

## Features

- Modern, responsive layout for desktop and mobile
- Smooth scroll and entrance animations via Framer Motion
- Typing animation in the hero section
- Project detail modals with bilingual content
- Dark/light theme toggle
- Full Arabic and English support (RTL/LTR)

## Tech Stack

- **React** — UI library
- **TypeScript** — Type-safe development
- **Vite** — Build tooling
- **TailwindCSS** — Styling
- **Framer Motion** — Animations
- **React Intersection Observer** — Scroll-triggered effects
- **Web3Forms** — Contact form delivery

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Run in development mode:

```bash
npm run dev
```

3. Build for production:

```bash
npm run build
```

4. Preview the production build:

```bash
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── Hero.tsx            # Hero section with typing animation
│   ├── Navbar.tsx          # Navigation bar
│   ├── Projects.tsx        # Projects section
│   ├── ProjectModal.tsx    # Project details modal
│   ├── Skills.tsx          # Skills section
│   ├── Experience.tsx      # Work experience
│   ├── Certifications.tsx  # Bootcamps and certifications
│   ├── Contact.tsx         # Contact section
│   ├── Footer.tsx          # Footer
│   ├── CustomCursor.tsx    # Custom cursor effect
│   └── ScrollProgress.tsx  # Scroll progress indicator
├── contexts/
│   ├── ThemeContext.tsx    # Theme management
│   └── LanguageContext.tsx # Translations and language state
├── App.tsx                 # Root component
├── main.tsx                # Entry point
└── style.css               # Global styles
```

## Customization

Update content in the following files:

- Projects — `src/components/Projects.tsx`
- Skills — `src/components/Skills.tsx`
- Experience — `src/components/Experience.tsx`
- Certifications — `src/components/Certifications.tsx`
- Contact — `src/components/Contact.tsx`
- Translations — `src/contexts/LanguageContext.tsx`
- Theme colors — `tailwind.config.js`

## Contact Form Setup

The contact form uses [Web3Forms](https://web3forms.com/) for email delivery.

1. Create an access key at [Web3Forms](https://web3forms.com/)
2. Add a `.env` file in the project root
3. Set `VITE_WEB3FORMS_ACCESS_KEY=your_access_key_here`
4. Restart the development server

See `WEB3FORMS_SETUP.md` for full setup instructions.

## Deployment

This project is configured for GitHub Pages.

1. Enable GitHub Pages in the repository settings
2. Set the source branch to `gh-pages`
3. Deploy:

```bash
npm run deploy
```

The live URL:

[https://joriesk.github.io/Jorie-Alsakran-Portfolio/](https://joriesk.github.io/Jorie-Alsakran-Portfolio/)

## Notes

- Update project links and social profiles in the relevant components before publishing
- Replace placeholder assets with final project visuals where applicable
- The contact form requires a valid Web3Forms access key to send messages

---

Jorie Alsakran · AI Engineer & Software Developer
