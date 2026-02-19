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
    console.log('AudioService inicializado');
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
    
    this.audio.pause();
    this.audio.currentTime = 0;
    this.audio.removeAttribute('src');
    this.audio.load();
    
    this.currentTimeSubject.next(0);
    this.isPlayingSubject.next(false);
    this.isLoadingSubject.next(true);
    
    this.currentSongSubject.next(song);
    
    // PRIMERO intentar con ruta local (sin / al inicio)
    const localPath = `assets/audio/${song.archivo}`;
    console.log('��� Intentando ruta local:', localPath);
    
    // Intentar con ruta local primero
    this.tryLocalPath(localPath, song);
  }

  private tryLocalPath(path: string, song: Cancion, retriesLeft: number = 2): void {
    try {
      this.audio.src = path;
      this.audio.load();
      
      const successHandler = () => {
        console.log('✅ Audio local cargado correctamente');
        this.isLoadingSubject.next(false);
        
        this.audio.play()
          .then(() => {
            console.log('✅ Reproducción local iniciada');
          })
          .catch(error => {
            console.error('❌ Error al reproducir local:', error);
            if (retriesLeft > 0) {
              console.log(`��� Reintentando local... (${retriesLeft} intentos)`);
              setTimeout(() => {
                this.tryLocalPath(path, song, retriesLeft - 1);
              }, 300);
            } else {
              // Si falla local, intentar con ruta absoluta
              this.tryAbsolutePath(song);
            }
          });
      };
      
      const errorHandler = () => {
        console.log('❌ No se pudo cargar ruta local, probando absoluta...');
        if (retriesLeft > 0) {
          setTimeout(() => {
            this.tryLocalPath(path, song, retriesLeft - 1);
          }, 300);
        } else {
          this.tryAbsolutePath(song);
        }
      };
      
      this.audio.addEventListener('canplaythrough', successHandler, { once: true });
      this.audio.addEventListener('error', errorHandler, { once: true });
      
      // Timeout por si tarda demasiado
      setTimeout(() => {
        if (this.isLoadingSubject.value) {
          console.log('⏰ Timeout en carga local, probando absoluta...');
          this.tryAbsolutePath(song);
        }
      }, 3000);
      
    } catch (error) {
      console.error('Error en tryLocalPath:', error);
      this.tryAbsolutePath(song);
    }
  }

  private tryAbsolutePath(song: Cancion): void {
    const absolutePath = `/assets/audio/${song.archivo}`;
    console.log('��� Intentando ruta absoluta:', absolutePath);
    
    try {
      this.audio.src = absolutePath;
      this.audio.load();
      
      const successHandler = () => {
        console.log('✅ Audio absoluto cargado');
        this.isLoadingSubject.next(false);
        
        this.audio.play()
          .then(() => {
            console.log('✅ Reproducción iniciada');
          })
          .catch(error => {
            console.error('❌ Error al reproducir:', error);
            this.useFallbackAudio(song);
          });
      };
      
      const errorHandler = () => {
        console.log('❌ Falló ruta absoluta, usando fallback...');
        this.useFallbackAudio(song);
      };
      
      this.audio.addEventListener('canplaythrough', successHandler, { once: true });
      this.audio.addEventListener('error', errorHandler, { once: true });
      
    } catch (error) {
      this.useFallbackAudio(song);
    }
  }

  private loadAudioWithRetry(audioPath: string, song: Cancion, retriesLeft: number): void {
    try {
      this.audio.src = '';
      
      this.audio.src = audioPath;
      this.audio.load();
      
      const canPlayHandler = () => {
        console.log('✅ Audio listo para reproducir');
        this.isLoadingSubject.next(false);
        
        this.audio.play()
          .then(() => {
            console.log('✅ Reproducción iniciada exitosamente');
          })
          .catch(error => {
            console.error('❌ Error al iniciar reproducción:', error);
            if (retriesLeft > 0) {
              console.log(`��� Reintentando carga... (${retriesLeft} intentos restantes)`);
              setTimeout(() => {
                this.loadAudioWithRetry(audioPath, song, retriesLeft - 1);
              }, 500);
            } else {
              this.useFallbackAudio(song);
            }
          });
      };
      
      const errorHandler = () => {
        console.error('❌ Error al cargar el audio');
        if (retriesLeft > 0) {
          console.log(`��� Reintentando carga... (${retriesLeft} intentos restantes)`);
          setTimeout(() => {
            this.loadAudioWithRetry(audioPath, song, retriesLeft - 1);
          }, 500);
        } else {
          this.useFallbackAudio(song);
        }
      };
      
      this.audio.addEventListener('canplaythrough', canPlayHandler, { once: true });
      this.audio.addEventListener('error', errorHandler, { once: true });
      
    } catch (error) {
      console.error('❌ Error catastrófico:', error);
      if (retriesLeft > 0) {
        setTimeout(() => {
          this.loadAudioWithRetry(audioPath, song, retriesLeft - 1);
        }, 500);
      } else {
        this.useFallbackAudio(song);
      }
    }
  }

  private useFallbackAudio(song: Cancion): void {
    console.log('⚠️ Usando fallback local');
    
    const alternativePath = `assets/audio/${song.archivo}`;
    console.log('��� Intentando ruta alternativa:', alternativePath);
    
    try {
      this.audio.src = alternativePath;
      this.audio.load();
      
      const canPlayHandler = () => {
        this.isLoadingSubject.next(false);
        this.audio.play().catch(() => this.fallbackToOnline());
      };
      
      const errorHandler = () => {
        this.fallbackToOnline();
      };
      
      this.audio.addEventListener('canplaythrough', canPlayHandler, { once: true });
      this.audio.addEventListener('error', errorHandler, { once: true });
      
    } catch (error) {
      this.fallbackToOnline();
    }
  }

  private fallbackToOnline(): void {
    console.log('��� Usando fallback online');
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
      
      console.log(`Actual: ${currentIndex}, Siguiente: ${nextIndex}`);
      this.playSong(songs[nextIndex]);
    }
  }

  private playRandomSong(): void {
    const songs = this.musicLibrary.getAllSongs();
    const currentSong = this.currentSongSubject.value;
    
    if (songs.length === 0) return;
    
    const availableSongs = songs.filter(song => song.id !== currentSong?.id);
    
    if (availableSongs.length === 0) {
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
