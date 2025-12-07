import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SongListComponent } from './components/song-list/song-list';
import { AudioService } from './services/audio.service';
import { MusicLibraryService } from './services/music-library.service';
import { Subscription } from 'rxjs';
import { Cancion } from './models/cancion.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, SongListComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Music Player';
  currentSong: Cancion | null = null;
  isPlaying: boolean = false;
  isShuffle: boolean = false;
  isLoading: boolean = false;
  currentTime: number = 0;
  progressPercentage: number = 0;
  duration: number = 0;

  particles: Array<{x: number, y: number, size: number, color: string, delay: number}> = [];

  private subscriptions: Subscription[] = [];

  constructor(
    private audioService: AudioService,
    public musicLibrary: MusicLibraryService,
    private cdr: ChangeDetectorRef
  ) {
    this.generateParticles();
  }

  ngOnInit() {
    this.initializeDefaultSong();
    this.setupAudioSubscriptions();
  }

  private setupAudioSubscriptions(): void {
    this.subscriptions.push(
      this.audioService.getCurrentSong().subscribe(song => {
        console.log('Canción actual:', song?.titulo);
        this.currentSong = song;
        
        if (song) {
          this.currentTime = 0;
          this.progressPercentage = 0;
          this.duration = song.duracion || 0;
        }
        
        this.cdr.detectChanges();
      })
    );

    this.subscriptions.push(
      this.audioService.getIsPlaying().subscribe(playing => {
        this.isPlaying = playing;
        console.log('▶️ Estado:', playing ? 'REPRODUCIENDO' : 'PAUSADO');
        this.cdr.detectChanges();
      })
    );

    this.subscriptions.push(
      this.audioService.getIsLoading().subscribe(loading => {
        this.isLoading = loading;
        console.log('Carga:', loading ? 'CARGANDO...' : 'LISTO');
        this.cdr.detectChanges();
      })
    );

    this.subscriptions.push(
      this.audioService.getCurrentTime().subscribe(time => {
        this.currentTime = time;
        
        if (this.currentSong && this.currentSong.duracion > 0) {
          this.progressPercentage = (time / this.currentSong.duracion) * 100;
        }
        
        this.cdr.detectChanges();
      })
    );
  }

  togglePlayPause(): void {
    console.log('⏯️ Cambiando Play/Pause');
    this.audioService.togglePlayPause();
  }

  playPrevious(): void {
    console.log('⏮️ Canción anterior');
    this.audioService.playPrevious();
  }

  playNext(): void {
    console.log('⏭️ Siguiente canción');
    this.audioService.playNext();
  }

  toggleShuffle(): void {
    this.isShuffle = !this.isShuffle;
    console.log('Aleatorio:', this.isShuffle ? 'ON' : 'OFF');
    this.audioService.setShuffleMode(this.isShuffle);
  }

  seekToPosition(event: MouseEvent): void {
    if (!this.currentSong || this.currentSong.duracion <= 0) return;
    
    const container = event.currentTarget as HTMLElement;
    const rect = container.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const percentage = Math.min(Math.max(x / rect.width, 0), 1);
    const newTime = this.currentSong.duracion * percentage;
    
    console.log('��� Saltando a:', this.formatTime(newTime));
    this.audioService.seekTo(newTime);
    this.cdr.detectChanges();
  }

  private initializeDefaultSong(): void {
    const songs = this.musicLibrary.getAllSongs();
    if (songs.length > 0 && !this.currentSong) {
      this.audioService.playSong(songs[0]);
    }
  }

  private generateParticles(): void {
    this.particles = [];
    const colors = [
      'rgba(138, 43, 226, 0.7)',  // Neon Purple
      'rgba(0, 212, 255, 0.7)',   // Neon Blue
      'rgba(255, 0, 255, 0.7)',   // Neon Pink
      'rgba(0, 255, 255, 0.7)',   // Neon Cyan
      'rgba(255, 255, 255, 0.5)'  // White
    ];
    
    for (let i = 0; i < 20; i++) {
      this.particles.push({
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 6 + 3,
        color: colors[Math.floor(Math.random() * colors.length)],
        delay: Math.random() * 3
      });
    }
  }

  formatTime(seconds: number): string {
    if (isNaN(seconds) || seconds <= 0) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
    console.log('Componente destruido');
  }
}
