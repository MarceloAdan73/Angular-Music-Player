import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Cancion } from '../models/cancion.model';
import { MusicLibraryService } from './music-library.service';

declare global {
  interface Window {
    userInteracted: boolean;
  }
}

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
    console.log('🎵 AudioService inicializado');
    this.audio = new Audio();
    this.setupAudioListeners();
    this.audio.volume = 0.7;

    if (typeof window !== 'undefined') {
      window.userInteracted = false;

      const markInteracted = () => {
        window.userInteracted = true;
      };

      document.addEventListener('click', markInteracted, { once: true });
      document.addEventListener('touchstart', markInteracted, { once: true });
    }
  }

  private setupAudioListeners(): void {
    this.audio.addEventListener('loadeddata', () => {
      this.isLoadingSubject.next(false);
    });

    this.audio.addEventListener('playing', () => {
      this.isPlayingSubject.next(true);
    });

    this.audio.addEventListener('pause', () => {
      this.isPlayingSubject.next(false);
    });

    this.audio.addEventListener('ended', () => {
      this.isPlayingSubject.next(false);
      this.playNext();
    });

    this.audio.addEventListener('timeupdate', () => {
      this.currentTimeSubject.next(this.audio.currentTime);
    });

    this.audio.addEventListener('error', () => {
      this.isLoadingSubject.next(false);
      this.isPlayingSubject.next(false);
    });

    this.audio.addEventListener('waiting', () => {
      this.isLoadingSubject.next(true);
    });
  }

  public setCurrentSong(song: Cancion): void {
    this.currentSongSubject.next(song);
    this.audio.src = `/assets/audio/${song.archivo}`;
    this.audio.load();
  }

  public playSong(song: Cancion): void {
    this.audio.pause();
    this.audio.currentTime = 0;
    this.audio.removeAttribute('src');
    this.audio.load();

    this.currentTimeSubject.next(0);
    this.isPlayingSubject.next(false);
    this.isLoadingSubject.next(true);

    this.currentSongSubject.next(song);

    this.tryLoadAndPlay(`/assets/audio/${song.archivo}`, song, 2);
  }

  private tryLoadAndPlay(path: string, song: Cancion, retriesLeft: number): void {
    try {
      this.audio.src = path;
      this.audio.load();

      let resolved = false;

      const canPlayHandler = () => {
        if (resolved) return;
        resolved = true;
        this.isLoadingSubject.next(false);
        this.audio.play()
          .then(() => {})
          .catch(() => {
            if (retriesLeft > 0) {
              setTimeout(() => this.tryLoadAndPlay(path, song, retriesLeft - 1), 500);
            }
          });
      };

      const errorHandler = () => {
        if (resolved) return;
        resolved = true;
        if (retriesLeft > 0) {
          setTimeout(() => this.tryLoadAndPlay(path, song, retriesLeft - 1), 500);
        }
      };

      this.audio.addEventListener('canplaythrough', canPlayHandler, { once: true });
      this.audio.addEventListener('error', errorHandler, { once: true });
      this.audio.addEventListener('loadeddata', () => {
        if (!resolved && retriesLeft <= 0) {
          this.isLoadingSubject.next(false);
        }
      }, { once: true });

    } catch {
      if (retriesLeft > 0) {
        setTimeout(() => this.tryLoadAndPlay(path, song, retriesLeft - 1), 500);
      } else {
        this.isLoadingSubject.next(false);
      }
    }
  }

  public togglePlayPause(): void {
    if (!this.currentSongSubject.value) {
      const songs = this.musicLibrary.getAllSongs();
      if (songs.length > 0) {
        this.playSong(songs[0]);
      }
      return;
    }

    if (this.audio.paused) {
      window.userInteracted = true;
      this.audio.play().catch(() => {});
    } else {
      this.audio.pause();
    }
  }

  public playPrevious(): void {
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

    this.playSong(songs[previousIndex]);
  }

  public playNext(): void {
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
      this.playSong(availableSongs[randomIndex]);
    }
  }

  public setShuffleMode(enabled: boolean): void {
    this.isShuffleModeSubject.next(enabled);
  }

  public setVolume(volume: number): void {
    this.audio.volume = Math.min(Math.max(volume, 0), 1);
  }

  public seekTo(time: number): void {
    if (!isNaN(time) && isFinite(time)) {
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
