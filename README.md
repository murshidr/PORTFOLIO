# 🎬 Cinematic AI Portfolio — Murshid R.
## A High-Fidelity, Scrolly-Driven Technical Showcase

Welcome to the Next.js Cinematic Portfolio of **Murshid R.**, AI Research Engineer specializing in deep learning for aerospace, real-time telemetry systems, and LLM-powered agentic workflows. 

This repository houses a highly immersive, aesthetically rich web experience built using **Next.js (App Router)**, **React 19**, **TailwindCSS v4**, and **Framer Motion**. It uses advanced scroll-linked animation mechanics to turn a traditional portfolio into a tactile, cinematic story.

---

## ⚡ Key Interactive Mechanics

The website has been engineered to be **highly scrolly-driven**, featuring subtle, premium scroll-based interactions:

### 1. Scroll-Reactive Vector Waves
- Powered by a custom-drawn HTML5 Canvas engine ([VectorWaves.tsx](file:///c:/Users/mursh/Downloads/cinematic-portfolio/src/components/VectorWaves.tsx)).
- Overlaps three independent, fluid sine-wave flows using theme colors (`--clay`, `--sand`, `--espresso`).
- Captures scroll ticks and applies a smooth linear interpolation (lerp) loop to speed up, slow down, and warp wave amplitudes and phases as the user scrolls, creating a organic, reactive backdrop.

### 2. Typewriter Headline Sequence
- The Hero section ([Hero.tsx](file:///c:/Users/mursh/Downloads/cinematic-portfolio/src/components/Hero.tsx)) starts with a custom-sequenced word-by-word typing effect of the main headline: **"Murshid R."**
- Complete with a blinking typewriter cursor built with Framer Motion.
- Staggers the subsequent elements: the sub-headlines and the scroll indicator gently slide up and fade in 0.5 seconds *after* the typewriter sequence completes, maintaining layout stability.

### 3. Sticky Capabilities Section
- Integrated directly on the homepage ([StickyFeatures.tsx](file:///c:/Users/mursh/Downloads/cinematic-portfolio/src/components/StickyFeatures.tsx)).
- **Split-Column Layout**: 
  - **Left Column**: Fixed (`sticky top-32`), showcasing dynamic slide counts (`01`–`04`), active category titles, and a looping SVG vector graphic that morphs and rotates as you scroll.
  - **Right Column**: Sequential cards detailing specific engineering domains.
- **Vertical Parallax Scrolling**: The text and image blocks are translated vertically in opposite directions relative to the scroll progress, creating an impressive sense of layout depth.
- Uses viewport intersection tracking to transition the left side seamlessly.

### 4. Linear Mouse-Wheel Projects Carousel
- Refactored portfolio grid ([ProjectList.tsx](file:///c:/Users/mursh/Downloads/cinematic-portfolio/src/components/ProjectList.tsx)) into a horizontal-only scrolling gallery.
- Intercepts vertical mouse wheel input and maps it linearly to horizontal scroll.
- **Scroll Trap Protection**: Implements boundary detection. When the user reaches the far right edge of the projects list (or far left), the wheel intercept is bypassed, allowing natural vertical page scrolling to resume so users don't get trapped.
- Contains custom horizontal parallax scrolling for images inside each project slide.

---

## 🛠️ The Tech Stack

| Layer | Technologies |
| :--- | :--- |
| **Core Framework** | Next.js 16.2.4 (App Router) · React 19 · TypeScript |
| **Styling** | TailwindCSS v4 · Vanilla CSS (for grain, typography, theme shifts) |
| **Animations** | Framer Motion v12 · Custom HTML5 Canvas Engine |
| **Database & Analytics** | Supabase JS client · Webhooks |
| **Telemetry & Data** | WebSockets (1000 Hz capability) · FastAPI/Flask API (Integration) |

---

## 📁 Repository Structure

```bash
├── public/
│   ├── projects/          # Screenshots and media assets
│   ├── profile.jpeg       # Portfolio avatar
│   └── resume/            # Downloadable CV documents
├── src/
│   ├── app/               # App Router pages and API routes
│   │   ├── work/          # Dedicated horizontal gallery page
│   │   ├── blog/          # Technical writing index & dynamic articles
│   │   ├── uses/          # Workspace tech, hardware, & tools catalog
│   │   ├── globals.css    # Typography, dark mode variables, custom styling
│   │   └── page.tsx       # Main homepage assembly
│   ├── components/        # Reusable cinematic UI components
│   │   ├── VectorWaves.tsx# Canvas-based vector waves background
│   │   ├── Hero.tsx       # Typewritten intro section
│   │   ├── StickyFeatures.tsx # Split sticky capability component
│   │   ├── ProjectList.tsx# Linear scroll-redirected carousel
│   │   ├── TechRadar.tsx  # Orbiting interactive stack visualizer
│   │   └── Nav.tsx        # Dynamic sticky header navigation
│   └── lib/               # Utility functions, clients, & metadata
```

---

## 🚀 Getting Started

### Prerequisites
Ensure you have Node.js 18+ installed on your local system.

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/murshidr/PORTFOLIO.git
   cd cinematic-portfolio
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the local development server:
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` in your browser.

### Building for Production
To build and optimize the bundle for Vercel/Netlify hosting:
```bash
npm run build
npm run start
```

---

## 📝 Featured Projects in the Portfolio

1. **SENTINEL (Execution Intelligence Platform)**: Extracts Slack/Gmail commitments using Llama 3.3 and Supabase webhooks.
2. **Combustion AI (Aerospace Instability)**: A Temporal Convolutional Network (TCN) model predicting engine pressure instability with 92% accuracy.
3. **Vynta (Ambient Task Scheduler)**: A natural language task planner utilizing Groq APIs and Jetpack Compose (Android).
4. **Ground Station (Telemetry Dashboard)**: Real-time 8-channel high-frequency sensor parsing dashboard with sub-100ms latency.

---
© 2026 Murshid R. All Rights Reserved.
*"Time is the raw material. Vynta is the tool. You are the architect."*
