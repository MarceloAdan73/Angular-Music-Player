import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Cancion } from '../models/cancion.model';
import { MusicLibraryService } from './music-library.service';

@Injectable({
  providedIn: 'root'
})
export class AudioService {
  private audio: HTMLAudioElement;
  private currentSongSubject = new BehaviorSubject<Cancion | null>(null);
  private isPlayingSubject = new BehaviorSubject<boolean>(false);
  private currentTimeSubject = new BehaviorSubject<number>(0);
  private isLoadingSubject = new BehaviorSubject<boolean>(false);
  private isShuffleModeSubject = new BehaviorSubject<boolean>(false);
  
  public currentSong$: Observable<Cancion | null> = this.currentSongSubject.asObservable();
  public isPlaying$: Observable<boolean> = this.isPlayingSubject.asObservable();
  public currentTime$: Observable<number> = this.currentTimeSubject.asObservable();
  public isLoading$: Observable<boolean> = this.isLoadingSubject.asObservable();
  public isShuffleMode$: Observable<boolean> = this.isShuffleModeSubject.asObservable();

  constructor(private musicLibrary: MusicLibraryService) {
    console.log('��� AudioService inicializado - VERSIÓN SIMPLIFICADA');
    this.audio = new Audio();
    this.setupAudioListeners();
    this.audio.volume = 0.7;
  }

  private setupAudioListeners(): void {
    this.audio.addEventListener('loadeddata', () => {
      console.log('✅ Audio cargado');
      this.isLoadingSubject.next(false);
    });

    this.audio.addEventListener('playing', () => {
      console.log('▶️ Reproduciendo');
      this.isPlayingSubject.next(true);
    });

    this.audio.addEventListener('pause', () => {
      console.log('⏸️ Pausado');
      this.isPlayingSubject.next(false);
    });

    this.audio.addEventListener('ended', () => {
      console.log('⏭️ Canción terminada');
      this.isPlayingSubject.next(false);
      this.playNext();
    });

    this.audio.addEventListener('timeupdate', () => {
      this.currentTimeSubject.next(this.audio.currentTime);
    });

    this.audio.addEventListener('error', (e) => {
      console.error('❌ Error de audio:', e);
      console.error('❌ Audio error code:', this.audio.error?.code);
      this.isLoadingSubject.next(false);
      this.isPlayingSubject.next(false);
    });

    this.audio.addEventListener('waiting', () => {
      console.log('⏳ Cargando audio...');
      this.isLoadingSubject.next(true);
    });
  }

  public playSong(song: Cancion): void {
    console.log('��� Reproduciendo:', song.titulo);
    
    // Detener audio actual
    this.audio.pause();
    this.audio.currentTime = 0;
    
    // Resetear estado
    this.currentTimeSubject.next(0);
    this.isPlayingSubject.next(false);
    this.isLoadingSubject.next(true);
    
    // Configurar nueva canción
    this.currentSongSubject.next(song);
    
    // Intentar con ruta local primero
    const audioPath = `assets/audio/${song.archivo}`;
    console.log('��� Intentando ruta:', audioPath);
    
    try {
      this.audio.src = audioPath;
      this.audio.load();
      
      this.audio.play().then(() => {
        console.log('✅ Audio iniciado correctamente');
      }).catch(error => {
        console.error('❌ Error al reproducir:', error);
        this.useFallbackAudio(song);
      });
      
    } catch (error) {
      console.error('❌ Error al cargar audio:', error);
      this.useFallbackAudio(song);
    }
  }

  private useFallbackAudio(song: Cancion): void {
    console.log('Usando audio de prueba online');
    
    // URLs de audio de prueba
    const fallbackUrls = [
      'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
      'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
      'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3'
    ];
    
    const randomIndex = Math.floor(Math.random() * fallbackUrls.length);
    const fallbackUrl = fallbackUrls[randomIndex];
    
    console.log('URL fallback:', fallbackUrl);
    
    try {
      this.audio.src = fallbackUrl;
      this.audio.load();
      
      this.audio.play().catch(fallbackError => {
        console.error('❌ Error en fallback:', fallbackError);
        this.isLoadingSubject.next(false);
      });
    } catch (error) {
      console.error('❌ Error al configurar fallback:', error);
      this.isLoadingSubject.next(false);
    }
  }

  public togglePlayPause(): void {
    console.log('⏯️ Toggle Play/Pause');
    
    if (!this.currentSongSubject.value) {
      console.log('⚠️ No hay canción, reproduciendo primera');
      const songs = this.musicLibrary.getAllSongs();
      if (songs.length > 0) {
        this.playSong(songs[0]);
      }
      return;
    }

    if (this.audio.paused) {
      console.log('▶️ Iniciando reproducción');
      this.audio.play().catch(error => {
        console.error('❌ Error al reproducir:', error);
      });
    } else {
      console.log('⏸️ Pausando');
      this.audio.pause();
    }
  }

  public playPrevious(): void {
    console.log('⏮️ Canción anterior');
    const currentSong = this.currentSongSubject.value;
    
    if (!currentSong) {
      const songs = this.musicLibrary.getAllSongs();
      if (songs.length > 0) {
        this.playSong(songs[0]);
      }
      return;
    }

    const songs = this.musicLibrary.getAllSongs();
    const currentIndex = songs.findIndex(s => s.id === currentSong.id);
    const previousIndex = currentIndex > 0 ? currentIndex - 1 : songs.length - 1;
    
    console.log(`Actual: ${currentIndex}, Anterior: ${previousIndex}`);
    this.playSong(songs[previousIndex]);
  }

  public playNext(): void {
    console.log('⏭️ Siguiente canción');
    const currentSong = this.currentSongSubject.value;
    
    if (!currentSong) {
      const songs = this.musicLibrary.getAllSongs();
      if (songs.length > 0) {
        this.playSong(songs[0]);
      }
      return;
    }

    if (this.isShuffleModeSubject.value) {
      this.playRandomSong();
    } else {
      const songs = this.musicLibrary.getAllSongs();
      const currentIndex = songs.findIndex(s => s.id === currentSong.id);
      const nextIndex = currentIndex < songs.length - 1 ? currentIndex + 1 : 0;
      
      console.log(`��� Actual: ${currentIndex}, Siguiente: ${nextIndex}`);
      this.playSong(songs[nextIndex]);
    }
  }

  private playRandomSong(): void {
    const songs = this.musicLibrary.getAllSongs();
    const currentSong = this.currentSongSubject.value;
    
    if (songs.length === 0) return;
    
    // Filtrar canción actual para no repetir inmediatamente
    const availableSongs = songs.filter(song => song.id !== currentSong?.id);
    
    if (availableSongs.length === 0) {
      // Si solo hay una canción, reproducirla
      this.playSong(songs[0]);
    } else {
      const randomIndex = Math.floor(Math.random() * availableSongs.length);
      console.log(`Modo aleatorio: seleccionada ${randomIndex}`);
      this.playSong(availableSongs[randomIndex]);
    }
  }

  public setShuffleMode(enabled: boolean): void {
    console.log(`Modo aleatorio: ${enabled ? 'ACTIVADO' : 'DESACTIVADO'}`);
    this.isShuffleModeSubject.next(enabled);
  }

  public seekTo(time: number): void {
    if (!isNaN(time) && isFinite(time)) {
      console.log('Saltando a:', this.formatTime(time));
      this.audio.currentTime = time;
    }
  }

  // Observable getters
  public getCurrentSong(): Observable<Cancion | null> {
    return this.currentSong$;
  }

  public getIsPlaying(): Observable<boolean> {
    return this.isPlaying$;
  }

  public getCurrentTime(): Observable<number> {
    return this.currentTime$;
  }

  public getIsLoading(): Observable<boolean> {
    return this.isLoading$;
  }

  public getIsShuffleMode(): Observable<boolean> {
    return this.isShuffleMode$;
  }

  // Métodos directos
  public getCurrentSongValue(): Cancion | null {
    return this.currentSongSubject.value;
  }

  private formatTime(seconds: number): string {
    if (isNaN(seconds) || seconds <= 0) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  }
}
