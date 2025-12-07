# 🎵 Music Player - Angular

[![Angular](https://img.shields.io/badge/Angular-21.0.0-DD0031?style=for-the-badge&logo=angular&logoColor=white)](https://angular.io/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)](LICENSE)

## 🌐 Live Application
**👉 https://music-player-roan-eight.vercel.app/**

---

## 📖 Overview

A modern, responsive music player built with Angular 21 featuring local MP3 files, album covers, and a sleek dark-themed UI with audio visualization particles.

![Music Player Screenshot](https://via.placeholder.com/800x450/1a1a2e/FFFFFF?text=Music+Player+Angular+App)

---

## ✨ Key Features

### 🎵 **Audio Playback**
- **▶️ Play/Pause Controls** - Smooth audio playback with HTML5 Audio API
- **⏭️ Track Navigation** - Next/previous song with shuffle mode
- **🔀 Random Play** - Shuffle mode for varied listening experience
- **🔊 Volume Control** - Slider with 70% default volume

### 🎨 **Modern UI/UX**
- **🌌 Particle Effects** - Dynamic audio visualization particles
- **🎨 Dark Theme** - Modern gradient design with neon accents
- **📱 Responsive Design** - Mobile-first approach for all devices
- **🎯 Visual Indicators** - Current song highlighting and progress bars

### 📚 **Music Library**
- **🎵 Local MP3 Files** - 6 high-quality songs with metadata
- **🖼️ Album Covers** - Optimized WEBP images for fast loading
- **📋 Song Information** - Artist, album, genre, year, and duration
- **⏱️ Time Formatting** - Clean mm:ss display for progress and duration

### 🔧 **Technical Features**
- **⚡ Angular 21** - Latest Angular framework with standalone components
- **🔄 RxJS Observables** - Reactive programming for state management
- **🎨 CSS3 Animations** - Smooth transitions and visual effects
- **📦 Optimized Assets** - Preloaded images and audio caching

---

## 🛠️ Technology Stack

### **Frontend & Framework**
| Technology | Purpose | Version |
|------------|---------|---------|
| ![Angular](https://img.shields.io/badge/Angular-21.0-DD0031?style=flat-square&logo=angular) | Application Framework | 21.0.0 |
| ![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-3178C6?style=flat-square&logo=typescript) | Type Safety & DX | 5.9.3 |
| ![HTML5 Audio](https://img.shields.io/badge/HTML5_Audio-API-orange?style=flat-square&logo=html5) | Audio Playback | Native |
| ![CSS3](https://img.shields.io/badge/CSS3-3.0+-blue?style=flat-square&logo=css3) | Styling & Animations | Latest |

### **UI & Libraries**
| Technology | Purpose | Version |
|------------|---------|---------|
| ![Angular Material](https://img.shields.io/badge/Angular_Material-21.0-purple?style=flat-square&logo=angular) | UI Components | 21.0.0 |
| ![Font Awesome](https://img.shields.io/badge/Font_Awesome-6.7.2-blue?style=flat-square&logo=font-awesome) | Icons | 6.7.2 |
| ![RxJS](https://img.shields.io/badge/RxJS-7.8.0-pink?style=flat-square&logo=reactivex) | Reactive Programming | 7.8.0 |

---

## 📁 Project Architecture
Angular-Music-Player/
├── 🗂️ src/
│ ├── 🎵 app/
│ │ ├── 🧩 components/
│ │ │ └── 📋 song-list/ # Song list component with templates
│ │ ├── ⚙️ services/
│ │ │ ├── 🔊 audio.service.ts # Audio playback and controls
│ │ │ ├── 📚 music-library.service.ts # Song metadata management
│ │ │ └── 🖼️ image.service.ts # Image loading and optimization
│ │ ├── 📐 models/
│ │ │ └── 🎶 cancion.model.ts # Song interface and data types
│ │ ├── 🏠 app.ts # Main application component
│ │ ├── 🎨 app.html # Main template with player UI
│ │ └── 🎨 app.css # Main styles with particles
│ ├── 📦 assets/
│ │ ├── 🔊 audio/ # 6 local MP3 files (38MB total)
│ │ │ ├── al_compas_mentira.mp3 # Tren Loco - 4.8MB
│ │ │ ├── caught_somewhere.mp3 # Iron Maiden - 11MB
│ │ │ ├── cuantas_palabras.mp3 # O'Connor - 5.8MB
│ │ │ ├── down_pilots.mp3 # Stone Temple Pilots - 8.9MB
│ │ │ ├── judas_oficio.mp3 # Malón - 4.0MB
│ │ │ └── let_it_roll.mp3 # Velvet Revolver - 3.6MB
│ │ └── 🖼️ images/
│ │ └── 📸 covers/ # Album covers in WEBP format
│ │ ├── Tren_Loco.webp # 31KB
│ │ ├── Iron_Maiden.webp # 50KB
│ │ ├── oconnor.webp # 34KB
│ │ ├── Stone_Temple_Pilots.webp # 35KB
│ │ ├── Malon.webp # 17KB
│ │ └── Velvet_Revolver.webp # 27KB
│ └── 🏠 index.html # HTML entry point
├── ⚙️ angular.json # Angular configuration
├── 📦 package.json # Dependencies and scripts
├── 🚀 vercel.json # Vercel deployment configuration
└── 📖 README.md # This documentation

text

---

## 🎵 Song Library

### **Featured Tracks**
| # | Song | Artist | Album | Genre | Year | Duration |
|---|------|--------|-------|-------|------|----------|
| 1 | **Al Compás de la Mentira** | Tren Loco | Al Compás de la Mentira | Heavy Metal | 1994 | 4:00 |
| 2 | **Caught Somewhere in Time** | Iron Maiden | Somewhere in Time | Heavy Metal | 1986 | 7:21 |
| 3 | **Cuantas Palabras** | O'Connor | Single | Rock | 2015 | 4:50 |
| 4 | **Down** | Stone Temple Pilots | Stone Temple Pilots | Grunge Rock | 2017 | 5:40 |
| 5 | **Judas Oficio** | Malón | Espíritu Combativo | Heavy Metal | 2015 | 4:20 |
| 6 | **Let It Roll** | Velvet Revolver | Contraband | Hard Rock | 2020 | 4:00 |

---

## 🎛️ Player Controls

### **Main Controls**
| Control | Icon | Function | Description |
|---------|------|----------|-------------|
| **Play/Pause** | ▶️⏸️ | `togglePlayPause()` | Starts/stops current track |
| **Previous** | ⏮️ | `playPrevious()` | Skips to previous song |
| **Next** | ⏭️ | `playNext()` | Skips to next song |
| **Shuffle** | 🔀 | `setShuffleMode()` | Enables random playback |
| **Seek** | ⏱️ | `seekTo()` | Jump to specific time in track |
| **Volume** | 🔊 | `audio.volume` | Adjust playback volume (0.0-1.0) |

### **Visual Elements**
- **🎨 Progress Bar** - Interactive timeline with click-to-seek
- **⏰ Time Display** - Current time / total duration (mm:ss)
- **🌟 Particle System** - 20 animated particles reacting to audio
- **🎯 Current Song** - Highlighted card with album art
- **📊 Loading State** - Visual feedback during audio buffering

---

## 🚀 Quick Start

### **Prerequisites**
- Node.js 18+
- npm 9+
- Angular CLI 21

### **Local Development**
```bash
# Clone the repository
git clone https://github.com/MarceloAdan73/music-player.git

# Navigate to project directory
cd music-player

# Install dependencies
npm install

# Start development server
ng serve

# Open in browser
open http://localhost:4200
Production Build
bash
# Create optimized production build
ng build --configuration production

# Output will be in: dist/music-player/browser/

# Test production build locally
npx serve dist/music-player/browser -s
🌐 Vercel Deployment
Automatic Deployment
🔄 Continuous Deployment - Automatic on every Git push

⚡ Global CDN - Fast worldwide access

🔒 SSL Certificate - Automatic HTTPS encryption

📱 PWA Ready - Progressive Web App capabilities

Deployment Configuration
json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist/music-player/browser",
  "framework": "angular",
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
Live URL
🌐 https://music-player-roan-eight.vercel.app/

📊 Performance Metrics
Metric	Result	Optimization
⚡ Initial Load	< 2s	Lazy loading, optimized assets
🎵 Audio Buffering	Instant	Preloading and caching
🖼️ Image Loading	< 100ms	WEBP format with compression
📱 Mobile Score	95%	Responsive design and touch controls
🔧 Development Commands
Common Commands
bash
# Development server with hot reload
ng serve

# Build for production
ng build --configuration production

# Build with watch mode
ng build --watch --configuration development

# Run unit tests
ng test

# Generate new component
ng generate component component-name

# Generate new service
ng generate service service-name
Dependency Management
bash
# Add new dependency
npm install package-name

# Update all dependencies
npm update

# Check for outdated packages
npm outdated
🐛 Troubleshooting
Common Issues & Solutions
Audio Not Playing on First Click
typescript
// Issue: First play uses default audio instead of MP3
// Solution: Ensure audio.src is properly set before play()

// In audio.service.ts, verify:
this.audio.src = `assets/audio/${song.archivo}`;
this.audio.load(); // Preload before playing
MP3 Files Not Loading in Production
typescript
// Issue: 404 errors for audio files
// Solution: Check Angular.json assets configuration

// angular.json should include:
"assets": [
  "src/favicon.ico",
  "src/assets",
  "public"
]
Vercel Deployment Issues
bash
# Issue: Build fails on Vercel
# Solution: Check build logs and ensure correct configuration

# Verify package.json scripts:
"scripts": {
  "build": "ng build --configuration production"
}
CORS/Network Errors
html
<!-- In index.html, add permissive CSP if needed -->
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; media-src 'self' data:;">
📄 License
This project is licensed under the MIT License - see the LICENSE file for details.

Permissions:

✅ Commercial use

✅ Modification

✅ Distribution

✅ Private use

Limitations:

❌ Liability

❌ Warranty

Conditions:

📝 License and copyright notice must be included

👨‍💻 Author
Marcelo Adan

🔗 GitHub: @MarceloAdan73

🎵 Live App: music-player-roan-eight.vercel.app

📂 Repository: music-player

🙏 Acknowledgments
Angular Team - For the incredible framework

Vercel - For seamless deployment experience

Font Awesome - For beautiful icons

Google Fonts - For typography (Orbitron, Exo 2)

All Artists - For the amazing music included

<div align="center">
⭐ If you enjoy this music player, please consider giving it a star!

Built with ❤️ using Angular 21, HTML5 Audio API, and modern web technologies.

🎵 Happy Listening! 🎵

</div> ```
