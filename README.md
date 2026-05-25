# 🎵 Music Player - Angular

[![Angular](https://img.shields.io/badge/Angular-21.0.0-DD0031?style=for-the-badge&logo=angular&logoColor=white)](https://angular.io/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.2-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Build](https://img.shields.io/badge/Build-passing-brightgreen?style=for-the-badge&logo=github)](https://github.com/MarceloAdan73/Angular-Music-Player)
[![Tests](https://img.shields.io/badge/Tests-10+_passing-2ea44f?style=for-the-badge&logo=vitest)](https://github.com/MarceloAdan73/Angular-Music-Player)
[![Coverage](https://img.shields.io/badge/Coverage->70%25-2ea44f?style=for-the-badge&logo=codecov)](https://github.com/MarceloAdan73/Angular-Music-Player)
[![RxJS](https://img.shields.io/badge/RxJS-7.8.0-pink?style=for-the-badge&logo=reactivex&logoColor=white)](https://rxjs.dev/)
[![Angular Material](https://img.shields.io/badge/Angular_Material-21.0-purple?style=for-the-badge&logo=angular&logoColor=white)](https://material.angular.io/)
[![HTML5 Audio](https://img.shields.io/badge/HTML5_Audio-API-orange?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/API/HTMLAudioElement)
[![Node.js](https://img.shields.io/badge/Node.js-18%2B-green?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com)
[![MIT License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)](LICENSE)

## 🌐 Live Application
**👉 [Visit the Music Player](https://music-player-roan-eight.vercel.app/)**

---

## 📖 Overview

A modern, responsive music player built with Angular 21 featuring local MP3 files, album covers, and a sleek dark-themed UI with audio visualization particles.

## 📸 Application Screenshots

| Main View | Library View |
|----------------|-------------|
| ![Main](https://github.com/MarceloAdan73/Angular-Music-Player/raw/main/src/assets/images/covers/screen1.png) | ![Library](https://github.com/MarceloAdan73/Angular-Music-Player/raw/main/src/assets/images/covers/screen2.png) |

| Mobile View | Mobile View 2 | 
|-----------------|-----------|
| ![Mobile](https://github.com/MarceloAdan73/Angular-Music-Player/raw/main/src/assets/images/covers/screen3.png) | ![Mobile 2](https://github.com/MarceloAdan73/Angular-Music-Player/raw/main/src/assets/images/covers/screen4.png) |

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
```
Angular-Music-Player/
├── 🗂️ src/
│   ├── 🎵 app/
│   │   ├── 🧩 components/
│   │   │   └── 📋 song-list/          # Song list component with templates
│   │   ├── ⚙️ services/
│   │   │   ├── 🔊 audio.service.ts     # Audio playback and controls
│   │   │   ├── 📚 music-library.service.ts  # Song metadata management
│   │   │   └── 🖼️ image.service.ts    # Image loading and optimization
│   │   ├── 📐 models/
│   │   │   └── 🎶 cancion.model.ts    # Song interface and data types
│   │   ├── 🏠 app.ts                  # Main application component
│   │   ├── 🎨 app.html                # Main template with player UI
│   │   └── 🎨 app.css                 # Main styles with particles
│   ├── 📦 assets/
│   │   ├── 🔊 audio/                  # 6 local MP3 files (38MB total)
│   │   │   ├── al_compas_mentira.mp3    # Tren Loco - 4.8MB
│   │   │   ├── caught_somewhere.mp3     # Iron Maiden - 11MB
│   │   │   ├── cuantas_palabras.mp3     # O'Connor - 5.8MB
│   │   │   ├── down_pilots.mp3          # Stone Temple Pilots - 8.9MB
│   │   │   ├── judas_oficio.mp3         # Malón - 4.0MB
│   │   │   └── let_it_roll.mp3          # Velvet Revolver - 3.6MB
│   │   └── 🖼️ images/
│   │       └── 📸 covers/              # Album covers in WEBP format
│   │           ├── Tren_Loco.webp        # 31KB
│   │           ├── Iron_Maiden.webp      # 50KB
│   │           ├── oconnor.webp          # 34KB
│   │           ├── Stone_Temple_Pilots.webp  # 35KB
│   │           ├── Malon.webp            # 17KB
│   │           └── Velvet_Revolver.webp  # 27KB
│   └── 🏠 index.html                  # HTML entry point
├── ⚙️ angular.json                   # Angular configuration
├── 📦 package.json                   # Dependencies and scripts
├── 🚀 vercel.json                    # Vercel deployment configuration
└── 📖 README.md                      # This documentation
```

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
git clone https://github.com/MarceloAdan73/Angular-Music-Player.git

# Navigate to project directory
cd Angular-Music-Player

# Install dependencies
npm install

# Start development server
ng serve
```

Open [http://localhost:4200](http://localhost:4200) in your browser.

### **Build for Production**
```bash
# Build the application
ng build

# The compiled files will be in the dist/ directory
```

---

## 🧪 Tests

### Running Tests

```bash
# Run unit tests
ng test

# Run tests with coverage report
ng test --coverage
```

### Test Results
- **10+ tests passing** covering AppComponent, MusicPlayerComponent, and PlaylistComponent
- **Code coverage >70%** across statements, branches, functions, and lines
- Tests use **Vitest** with Angular TestBed for component integration
- All tests run in headless mode for CI/CD compatibility

### Test Structure
| Test File | Tests | Description |
|-----------|-------|-------------|
| `app.spec.ts` | 3 | App creation, title, component rendering |
| `music-player.spec.ts` | 4 | Player state, controls, playback |
| `playlist.spec.ts` | 3 | Song list, badge count, component rendering |

---

## 📝 How to Add New Songs

To add new songs to the player:

1. **Add Audio File**: Place your MP3 file in `src/assets/audio/`
2. **Add Cover Image**: Place your WEBP image in `src/assets/images/covers/`
3. **Update Music Library**: Edit `src/app/services/music-library.service.ts` and add the song metadata
4. **Restart Development Server**: Run `ng serve` again

---

## 👨‍💻 Author

**Marcelo Palma**

🔗 **GitHub**: [@MarceloAdan73](https://github.com/MarceloAdan73)

📧 **Email**: marcelo-palma@live.com

---

<div align="center">

⭐ If you enjoy this music player, please consider giving it a star!

Built with ❤️ using Angular 21, HTML5 Audio API, and modern web technologies.

🎵 **Happy Listening!** 🎵

</div>