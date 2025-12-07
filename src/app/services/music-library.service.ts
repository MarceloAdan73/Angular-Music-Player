import { Injectable } from '@angular/core';
import { Cancion } from '../models/cancion.model';

@Injectable({
  providedIn: 'root'
})
export class MusicLibraryService {
  private canciones: Cancion[] = [
    {
      id: '1',
      titulo: 'Al Compás de la Mentira',
      artista: 'Tren Loco',
      album: 'Al Compás de la Mentira',
      duracion: 240, // 4:00
      archivo: 'al_compas_mentira.mp3',
      portada: 'assets/images/covers/Tren_Loco.webp',
      genero: 'Heavy Metal',
      anio: 1994
    },
    {
      id: '2',
      titulo: 'Caught Somewhere in Time',
      artista: 'Iron Maiden',
      album: 'Somewhere in Time',
      duracion: 441, // 7:21
      archivo: 'caught_somewhere.mp3',
      portada: 'assets/images/covers/Iron_Maiden.webp',
      genero: 'Heavy Metal',
      anio: 1986
    },
    {
      id: '3',
      titulo: 'Cuántas Palabras',
      artista: 'O\'Connor',
      album: 'Revolución',
      duracion: 240, // 4:00
      archivo: 'cuantas_palabras.mp3',
      portada: 'assets/images/covers/oconnor.webp',
      genero: 'Hard Rock',
      anio: 1994
    },
    {
      id: '4',
      titulo: 'Down',
      artista: 'Stone Temple Pilots',
      album: 'Core',
      duracion: 205, // 3:25
      archivo: 'down_pilots.mp3',
      portada: 'assets/images/covers/Stone_Temple_Pilots.webp',
      genero: 'Grunge',
      anio: 1992
    },
    {
      id: '5',
      titulo: 'Judas Oficio',
      artista: 'Malón',
      album: 'Espíritu Combativo',
      duracion: 260, // 4:20
      archivo: 'judas_oficio.mp3',
      portada: 'assets/images/covers/Malon.webp',
      genero: 'Thrash Metal',
      anio: 1995
    },
    {
      id: '6',
      titulo: 'Let It Roll',
      artista: 'Velvet Revolver',
      album: 'Contraband',
      duracion: 160, // 2:40
      archivo: 'let_it_roll.mp3',
      portada: 'assets/images/covers/Velvet_Revolver.webp',
      genero: 'Hard Rock',
      anio: 2004
    }
  ];

  constructor() {
    console.log('MusicLibraryService inicializado con', this.canciones.length, 'canciones');
  }

  getAllSongs(): Cancion[] {
    return [...this.canciones];
  }

  getSongById(id: string): Cancion | undefined {
    return this.canciones.find(cancion => cancion.id === id);
  }

  searchSongs(query: string): Cancion[] {
    if (!query.trim()) {
      return this.getAllSongs();
    }
    
    const searchTerm = query.toLowerCase();
    return this.canciones.filter(cancion => 
      cancion.titulo.toLowerCase().includes(searchTerm) ||
      cancion.artista.toLowerCase().includes(searchTerm) ||
      cancion.album.toLowerCase().includes(searchTerm) ||
      cancion.genero.toLowerCase().includes(searchTerm)
    );
  }

  getRandomSong(): Cancion {
    const randomIndex = Math.floor(Math.random() * this.canciones.length);
    return this.canciones[randomIndex];
  }

  getSongsByGenre(genre: string): Cancion[] {
    return this.canciones.filter(cancion => 
      cancion.genero.toLowerCase() === genre.toLowerCase()
    );
  }
}
