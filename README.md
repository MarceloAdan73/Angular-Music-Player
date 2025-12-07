# 🎵 Modern Music Player - Angular

[![Angular](https://img.shields.io/badge/Angular-21.0.0-DD0031?style=for-the-badge&logo=angular&logoColor=white)](https://angular.io/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)](LICENSE)

**🌐 Live Demo:** [https://music-player-roan-eight.vercel.app/](https://music-player-roan-eight.vercel.app/)

Un reproductor de música moderno, completamente responsive y funcional construido con Angular 21.

## ✨ Características principales

- 🎨 **Diseño moderno** con gradientes CSS3 y animaciones fluidas
- 🎵 **Reproducción de audio** con HTML5 Audio API
- 📱 **Completamente responsive** (mobile, tablet, desktop)
- 🎯 **Indicador visual** de canción en reproducción
- ⚡ **Optimización de rendimiento** con pre-carga de imágenes
- 🎨 **Tema oscuro moderno** con variables CSS
- 🔄 **Modo aleatorio** (shuffle) y navegación entre canciones
- ⏱️ **Barra de progreso** interactiva con seek
- 🔊 **Control de volumen** integrado
- 🖼️ **Portadas de álbumes** en formato WEBP optimizado

## 🎵 Canciones incluidas

1. **"Al Compás de la Mentira"** - Tren Loco (Heavy Metal)
2. **"Caught Somewhere in Time"** - Iron Maiden (Heavy Metal)
3. **"Cuantas Palabras"** - O'Connor (Rock)
4. **"Down"** - Stone Temple Pilots (Grunge Rock)
5. **"Judas Oficio"** - Malón (Heavy Metal)
6. **"Let It Roll"** - Velvet Revolver (Hard Rock)

## 🚀 Comenzar

### Prerrequisitos
- Node.js 18 o superior
- npm 9 o superior
- Angular CLI 21

### Instalación local
```bash
# Clonar repositorio
git clone https://github.com/MarceloAdan73/music-player.git
cd music-player

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
ng serve
```
### 📁 Estructura del Proyecto

Angular-Music-Player/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   └── song-list/
│   │   ├── services/
│   │   │   ├── audio.service.ts
│   │   │   ├── music-library.service.ts
│   │   │   └── image.service.ts
│   │   ├── models/
│   │   │   └── cancion.model.ts
│   │   ├── app.ts
│   │   ├── app.html
│   │   └── app.css
│   ├── assets/
│   │   ├── audio/
│   │   └── images/
│   └── index.html
├── angular.json
├── package.json
├── vercel.json
└── README.md



