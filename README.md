# 🌊 Murshid R | Immersive 3D Portfolio

An advanced, cinematic 3D portfolio experience showcasing the intersection of Data Science, AI, and Aerospace technology. Inspired by the vibrant energy of Chennai and the iconic Marina Beach.

![Immersive Scene Preview](public/avatar_banner.png)

---

## 🎯 Overview

This portfolio is an immersive web experience built with **React Three Fiber** that features a fully navigable 3D environment. Users interact with a character avatar that triggers a radial menu system, providing access to different sections of the portfolio. The scene includes a dynamic day/night cycle, weather effects, and cinematic post-processing.

**Live Demo**: [https://murshid-r.vercel.app](https://murshid-r.vercel.app)

---

## 🎓 About Me

**Murshid R** — B.Tech CSE (Data Science & AI) student at Dr. M.G.R Educational and Research Institute, Chennai.

I specialize in **Deep Learning for Aerospace Applications**, Real-Time Systems, and Predictive Analytics. Currently conducting research at the **Dr. M.G.R ACS Space Technology Centre** on combustion instability prediction using Temporal Convolutional Networks (TCNs) for hybrid rocket engines.

---

## 🚀 Featured Projects

| Project | Description | Tech Stack |
|---------|-------------|------------|
| **Vynta** | AI-powered task scheduler using natural language processing with energy level optimization | Jetpack Compose, Llama 3, MVVM, Google Calendar API |
| **Sentinel** | Execution Intelligence Platform with AI-driven commitment extraction and risk scoring | React 19, FastAPI, Groq AI, Supabase, Llama 3.3 |
| **Smart Attendance System** | Desktop application with dual-mode architecture and automated calculations | Python, CustomTkinter, SQLite, Pandas |
| **Enterprise Data Pipeline** | Self-service analytical pipeline transforming raw CSV to interactive dashboards | Python, Pandas, Streamlit, Plotly |
| **Combustion Instability Prediction** | TCN-based real-time prediction system achieving 92% accuracy | Python, PyTorch, Temporal Convolutional Networks |
| **Ground Station Dashboard** | High-frequency telemetry dashboard for rocket sensor data | Python, Flask, WebSockets, Real-Time |
| **DocuMind** | Mental state prediction using stacked LSTM architecture | TensorFlow, LSTM, NLP |
| **CarbonCut** | AI-powered sustainability system with CNN-based waste classification | TensorFlow, React, Firebase |
| **AIDEN AI** | Intelligent mental health & academic assistant | Transformers, NLP, Flask |
| **Crop Health Monitoring** | Hyperspectral AI analytics for crop disease prediction | Scikit-learn, OpenCV, Hyperspectral Imaging |

---

## 🛠 Tech Stack

### 3D Engine & Rendering
- **Three.js** — Core 3D rendering engine
- **React Three Fiber** — React renderer for Three.js
- **@react-three/drei** — Useful helpers for R3F
- **@react-three/postprocessing** — Cinematic post-processing effects (Bloom, Chromatic Aberration, Vignette)
- **GSAP** — High-performance animations

### UI & Styling
- **TailwindCSS v4** — Utility-first CSS framework
- **Framer Motion** — Declarative animations
- **Lucide React** — Icon library

### Backend & APIs
- **Express** — Contact form API
- **Nodemailer** — Email delivery
- **Supabase** — Backend-as-a-service

### AI/ML
- **Google Gen AI** — Gemini API integration
- **React GitHub Calendar** — Contribution visualization

### Build & Dev
- **Vite** — Fast build tool
- **TypeScript** — Type safety
- **React Router v7** — Client-side routing

---

## ✨ Features

### 3D Environment
- **Dynamic Day/Night Cycle** — Realistic sun trajectory with atmospheric color transitions
- **Weather System** — Rain particles with wind physics
- **Character Interaction** — Clickable avatar with walking animation
- **Post-Processing** — Bloom, chromatic aberration, vignette, film grain

### Navigation
- **Radial Menu** — Elegant circular navigation triggered by character interaction
- **Page Transitions** — Smooth animated route transitions with Framer Motion

### Pages
| Route | Page | Description |
|-------|------|-------------|
| `/` | Home | Immersive 3D scene with character |
| `/about` | About | Profile, education, technical skills |
| `/projects` | Projects | Showcase of all projects with images |
| `/devlogs` | Devlogs | Development journey documentation |
| `/devlog/vynta` | Vynta Devlog | Detailed case study |
| `/achievements` | Experience | Timeline of work and milestones |
| `/awards` | Awards | Honors and competition results |
| `/blog` | Blog | Technical articles and thoughts |
| `/contact` | Contact | Contact form with email API |
| `/github` | GitHub | Contribution graph and repositories |

### Contact Form
- Email submission via `/api/contact` endpoint
- Subject selection (Internship, Research, Project, Other)
- Real-time status feedback

---

## 💻 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/murshidr/cinematic-portfolio.git
cd cinematic-portfolio

# Install dependencies
npm install --legacy-peer-deps

# Configure environment
cp .env.example .env
# Add your API keys to .env:
# - GEMINI_API_KEY (optional, for AI features)
```

### Development

```bash
# Run both frontend and API concurrently
npm run dev

# Run only frontend
npm run dev:web

# Run only API
npm run dev:api

# Type checking
npm run lint

# Build for production
npm run build
```

### Environment Variables

Create a `.env` file with:

```env
GEMINI_API_KEY=your_gemini_api_key
```

---

## 📁 Project Structure

```
src/
├── components/
│   ├── AudioManager.tsx      # Ambient audio management
│   ├── CameraFlyIn.tsx       # Intro camera animation
│   ├── Character.tsx         # 3D character model
│   ├── CityLife.tsx          # City environment elements
│   ├── LoadingScreen.tsx     # Initial loading experience
│   ├── OnboardingOverlay.tsx # First-time user overlay
│   ├── PageLayout.tsx        # Shared page wrapper
│   ├── RadialMenu.tsx        # Navigation menu
│   ├── Scene.tsx             # Main 3D canvas & environment
│   ├── VisitorCounter.tsx    # Visitor tracking
│   ├── VyntaSignupForm.tsx  # Newsletter signup
│   └── World.tsx             # Ground plane & world geometry
├── pages/
│   ├── About.tsx             # About page
│   ├── Achievements.tsx      # Experience timeline
│   ├── Awards.tsx            # Honors & awards
│   ├── Blog.tsx              # Technical blog
│   ├── Contact.tsx           # Contact form
│   ├── Devlogs.tsx          # Devlogs listing
│   ├── Github.tsx            # GitHub integration
│   ├── Projects.tsx          # Projects showcase
│   └── VyntaDevlog.tsx       # Vynta case study
├── App.tsx                   # Main app with routing
├── main.tsx                 # Entry point
└── index.css                # Global styles
```

---

## 🏆 Achievements & Recognition

- **Payload & Propellant Chemist** — Dr. M.G.R ACS Space Technology Centre
- **2nd Place** — Paper Presentation, YASSC 2025 (AI-Driven Combustion Instability)
- **Selected Team** — INSPACe Model Rocketry India National Competition
- **Runner-Up** — Promptarhon, AI: Beyond the Algorithm
- **TiHAN Program Participant** — IIT Hyderabad (Autonomous Navigation & Robotics)

---

## 📬 Contact

- **Email**: murshidreyas@gmail.com
- **Phone**: +91 8939043919
- **LinkedIn**: [linkedin.com/in/murshid-r](https://www.linkedin.com/in/murshid-r-37088b272)
- **GitHub**: [github.com/murshidr](https://github.com/murshidr)

---

## 📄 License

MIT License — Developed by **Murshid R**

---

*Experience the cinematic journey at [https://murshid-r.vercel.app](https://murshid-r.vercel.app)*
