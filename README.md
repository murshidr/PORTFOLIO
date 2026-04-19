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
| **Vynta** | AI-powered task scheduler that uses natural language to schedule tasks based on energy levels. Built with Jetpack Compose, MVVM, Room, and Groq (Llama 3) for the AI engine, with Google Calendar sync. | Jetpack Compose, Llama 3, MVVM, Android, Google Calendar API |
| **Sentinel** | Execution Intelligence Platform. Passes Slack/Gmail threads through Llama 3.3 70B to extract commitments, scores them with a 4-factor risk engine, and alerts owners before deadlines slip. Features a live dependency graph. | React 19, FastAPI, Groq AI, Supabase, Llama 3.3 |
| **Smart Attendance System** | A robust desktop application built with Python and CustomTkinter. Features a dual-mode architecture (Admin/Terminal), automated late arrival calculations, and local SQLite data security. Replaces paper logs with a premium dark-mode interface. | Python, CustomTkinter, SQLite, Pandas |
| **Enterprise Data Automation Pipeline** | A fully automated self-service pipeline that transforms fragmented CSV exports into production-ready analytical dashboards. Features automated validation, vectorized cleaning with Pandas, and interactive Streamlit BI visualizations. | Python, Pandas, Streamlit, Plotly |
| **Combustion Instability Prediction** | Developed Temporal Convolutional Network (TCN) achieving 92% accuracy in real-time combustion instability prediction for hybrid rocket engines. Outperformed baseline LSTM methods. | Python, PyTorch, TCN, Aerospace |
| **DocuMind** | Proactive Mental State Prediction using Deep Learning. Implemented Stacked LSTM architecture to predict mental health states from social media metrics with 81% recall. | TensorFlow, LSTM, Mental Health, Data Science |
| **Ground Station Dashboard** | Production-grade telemetry dashboard processing live data from 8+ sensor channels at 1000 Hz with <100ms latency. Used for INSPACe Model Rocketry Competition. | Python, Flask, WebSockets, Real-Time |
| **CarbonCut** | AI-Powered Sustainability & Waste Management system. CNN-based image recognition for waste classification (94% accuracy) and CO2 emission estimation. | TensorFlow, React, Firebase, Sustainability |
| **AIDEN AI** | Intelligent Mental Health & Academic Assistant. Conversational AI combining mood detection and adaptive academic guidance. | Transformers, NLP, Flask, SQLite |
| **Crop Health Monitoring** | Hyperspectral AI Analytics for automated crop health assessment. Machine learning ensemble (Random Forest + SVM) for disease prediction. | Scikit-learn, OpenCV, Hyperspectral, AgriTech |

---

## 🛠 Tech Stack

### 3D Engine & Rendering
- **Three.js** — Core 3D rendering engine
- **React Three Fiber** — React renderer for Three.js
- **@react-three/drei** — Useful helpers for R3F
- **@react-three/postprocessing** — Cinematic post-processing effects (Bloom, Chromatic Aberration, Vignette)
- **GSAP** — High-performance animations
- **maath** — Math utilities for 3D

### UI & Styling
- **TailwindCSS v4** — Utility-first CSS framework
- **Framer Motion** — Declarative animations
- **Framer Motion 3D** — 3D animations for React Three Fiber
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
- **tsx** — TypeScript execute
- **concurrently** — Run multiple dev servers

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
