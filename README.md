# Jorie Alsakran - Portfolio

Interactive personal portfolio built with React, TailwindCSS, and Framer Motion.

## ✨ Features

- 🎨 Modern and attractive design with advanced visual effects
- 🚀 Smooth animations and interactive effects using Framer Motion
- 📱 Fully responsive for all devices
- ⚡ High performance and fast loading
- 🎭 Typing animation in Hero Section
- 🎯 Scroll animations on scroll
- 🎪 Modal animations for projects
- 📊 Animated progress bars for skills
- 🌙 Dark/Light theme toggle
- 🌍 Arabic/English language support

## 🛠️ Technologies Used

- **React** - JavaScript library for building user interfaces
- **TypeScript** - For writing safe and organized code
- **Vite** - Fast build tool
- **TailwindCSS** - CSS framework for rapid design
- **Framer Motion** - Library for animations and motion
- **React Intersection Observer** - To trigger animations on appearance
- **Web3Forms** - For contact form email delivery

## 🚀 Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the project in development mode:
```bash
npm run dev
```

3. Build the project for production:
```bash
npm run build
```

4. Preview the build:
```bash
npm run preview
```

## 📁 Project Structure

```
src/
├── components/
│   ├── Hero.tsx          # Main section with typing animation
│   ├── Navbar.tsx        # Navigation bar
│   ├── Projects.tsx      # Projects section
│   ├── ProjectModal.tsx  # Project details modal
│   ├── Skills.tsx        # Skills section
│   ├── Experience.tsx    # Work experience section
│   ├── Contact.tsx       # Contact section
│   ├── Footer.tsx         # Footer
│   ├── CustomCursor.tsx  # Custom cursor effect
│   └── ScrollProgress.tsx # Scroll progress indicator
├── contexts/
│   ├── ThemeContext.tsx  # Theme management
│   └── LanguageContext.tsx # Language management
├── App.tsx               # Main component
├── main.tsx              # Entry point
└── style.css             # Global styles
```

## 🎨 Customization

You can customize the content by editing:
- Project data in `src/components/Projects.tsx`
- Skills in `src/components/Skills.tsx`
- Work experience in `src/components/Experience.tsx`
- Contact information in `src/components/Contact.tsx`
- Colors in `tailwind.config.js`
- Translations in `src/contexts/LanguageContext.tsx`

## 📧 Contact Form Setup

The contact form uses Web3Forms for email delivery. To set it up:

1. Get your Access Key from [Web3Forms](https://web3forms.com/)
2. Create a `.env` file in the root directory
3. Add: `VITE_WEB3FORMS_ACCESS_KEY=your_access_key_here`
4. Restart the development server

See `WEB3FORMS_SETUP.md` for detailed instructions.

## 🚀 Deployment

### GitHub Pages

1. Enable GitHub Pages in repository settings
2. Set source to `gh-pages` branch
3. Deploy:
```bash
npm run deploy
```

The site will be available at:
`https://JorieSK.github.io/Jorie-Alsakran-Portfolio`

## 📝 Notes

- Make sure to update project links and social media links
- You can replace images with your actual project images
- All animations are customizable through Framer Motion
- The contact form requires Web3Forms setup to send emails

---

Made with ❤️ using the latest technologies
