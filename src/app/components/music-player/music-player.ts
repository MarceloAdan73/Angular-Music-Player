import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AudioService } from '../../services/audio.service';
import { MusicLibraryService } from '../../services/music-library.service';
import { Subscription } from 'rxjs';
import { Cancion } from '../../models/cancion.model';

@Component({
  selector: 'app-music-player',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './music-player.html',
  styleUrls: ['./music-player.css']
})
export class MusicPlayerComponent implements OnInit, OnDestroy {
  currentSong: Cancion | null = null;
  isPlaying: boolean = false;
  isShuffle: boolean = false;
  isLoading: boolean = false;
  currentTime: number = 0;
  progressPercentage: number = 0;
  duration: number = 0;
  volume: number = 0.7;
  isMuted: boolean = false;
  previousVolume: number = 0.7;
  hoverTime: number = 0;
  hoverPercentage: number = 0;
  showHoverTime: boolean = false;
  trackChangeKey: number = 0;

  equalizerBars: number[] = [0, 1, 2, 3, 4, 5, 6, 7];

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
        this.currentSong = song;
        this.trackChangeKey++;

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
        this.cdr.detectChanges();
      })
    );

    this.subscriptions.push(
      this.audioService.getIsLoading().subscribe(loading => {
        this.isLoading = loading;
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
    this.audioService.togglePlayPause();
  }

  playPrevious(): void {
    this.audioService.playPrevious();
  }

  playNext(): void {
    this.audioService.playNext();
  }

  toggleShuffle(): void {
    this.isShuffle = !this.isShuffle;
    this.audioService.setShuffleMode(this.isShuffle);
  }

  seekToPosition(event: MouseEvent): void {
    if (!this.currentSong || this.currentSong.duracion <= 0) return;

    const container = event.currentTarget as HTMLElement;
    const rect = container.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const percentage = Math.min(Math.max(x / rect.width, 0), 1);
    const newTime = this.currentSong.duracion * percentage;

    this.audioService.seekTo(newTime);
    this.cdr.detectChanges();
  }

  onProgressHover(event: MouseEvent): void {
    if (!this.currentSong || this.currentSong.duracion <= 0) return;

    const container = event.currentTarget as HTMLElement;
    const rect = container.getBoundingClientRect();
    const x = event.clientX - rect.left;
    this.hoverPercentage = Math.min(Math.max((x / rect.width) * 100, 0), 100);
    this.hoverTime = (this.hoverPercentage / 100) * this.currentSong.duracion;
    this.showHoverTime = true;
  }

  onProgressLeave(): void {
    this.showHoverTime = false;
  }

  setVolume(value: string): void {
    const vol = parseFloat(value);
    this.volume = Math.min(Math.max(vol, 0), 1);
    this.audioService.setVolume(this.volume);
    this.isMuted = this.volume === 0;
    this.cdr.detectChanges();
  }

  toggleMute(): void {
    if (this.isMuted) {
      this.volume = this.previousVolume || 0.7;
      this.isMuted = false;
    } else {
      this.previousVolume = this.volume;
      this.volume = 0;
      this.isMuted = true;
    }
    this.audioService.setVolume(this.volume);
    this.cdr.detectChanges();
  }

  getVolumeIcon(): string {
    if (this.isMuted || this.volume === 0) return 'fa-volume-mute';
    if (this.volume < 0.3) return 'fa-volume-off';
    if (this.volume < 0.7) return 'fa-volume-down';
    return 'fa-volume-up';
  }

  private initializeDefaultSong(): void {
    const songs = this.musicLibrary.getAllSongs();
    if (songs.length > 0 && !this.currentSong) {
      const isMobile = window.matchMedia('(max-width: 768px)').matches || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      if (isMobile) {
        this.audioService.setCurrentSong(songs[0]);
      } else {
        this.audioService.playSong(songs[0]);
      }
    }
  }

  private generateParticles(): void {
    this.particles = [];
    const colors = [
      'rgba(138, 43, 226, 0.7)',
      'rgba(0, 212, 255, 0.7)',
      'rgba(255, 0, 255, 0.7)',
      'rgba(0, 255, 255, 0.7)',
      'rgba(255, 255, 255, 0.5)'
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
  }
}
