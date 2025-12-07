import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { Cancion } from '../../models/cancion.model';
import { MusicLibraryService } from '../../services/music-library.service';
import { AudioService } from '../../services/audio.service';
import { ImageService } from '../../services/image.service';

@Component({
  selector: 'app-song-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './song-list.html',
  styleUrls: ['./song-list.css']
})
export class SongListComponent implements OnInit, OnDestroy {
  canciones: Cancion[] = [];
  cancionesFiltradas: Cancion[] = [];
  terminoBusqueda: string = '';
  cancionActual: Cancion | null = null;
  isLoading: boolean = true;
  hoveredCardId: string | null = null;
  gridColumns: number = 4;
  
  private audioSubscription!: Subscription;

  constructor(
    private musicLibrary: MusicLibraryService,
    private audioService: AudioService,
    public imageService: ImageService
  ) {}

  ngOnInit() {
    this.cargarCanciones();
    this.ajustarGridColumns();
    
    this.audioSubscription = this.audioService.getCurrentSong().subscribe(song => {
      this.cancionActual = song;
    });
  }

  ngOnDestroy() {
    if (this.audioSubscription) {
      this.audioSubscription.unsubscribe();
    }
  }

  @HostListener('window:resize')
  onResize() {
    this.ajustarGridColumns();
  }

  private ajustarGridColumns() {
    const width = window.innerWidth;
    if (width < 640) {
      this.gridColumns = 1;
    } else if (width < 1024) {
      this.gridColumns = 2;
    } else if (width < 1440) {
      this.gridColumns = 3;
    } else {
      this.gridColumns = 4;
    }
  }

  private async cargarCanciones(): Promise<void> {
    this.isLoading = true;
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      this.canciones = this.musicLibrary.getAllSongs();
      this.cancionesFiltradas = [...this.canciones];
      
      this.preloadImagesWithPriority();
    } catch (error) {
      console.error('Error cargando canciones:', error);
    } finally {
      this.isLoading = false;
    }
  }

  private preloadImagesWithPriority() {
    this.canciones.slice(0, 8).forEach((cancion, index) => {
      setTimeout(() => this.preloadImage(cancion.portada), index * 100);
    });
  }

  private preloadImage(src: string): void {
    const img = new Image();
    img.src = src;
    img.onload = () => console.log('✅ Portada cargada:', src);
    img.onerror = () => {
      console.error('❌ Error cargando portada:', src);
    };
  }

  buscarCanciones() {
    if (this.terminoBusqueda.trim()) {
      const term = this.terminoBusqueda.toLowerCase();
      this.cancionesFiltradas = this.canciones.filter(cancion =>
        cancion.titulo.toLowerCase().includes(term) ||
        cancion.artista.toLowerCase().includes(term) ||
        cancion.album.toLowerCase().includes(term)
      );
    } else {
      this.cancionesFiltradas = [...this.canciones];
    }
  }

  reproducirCancion(cancion: Cancion) {
    console.log('▶️ Reproduciendo:', cancion.titulo);
    this.audioService.playSong(cancion);
  }

  formatearDuracion(segundos: number): string {
    const minutos = Math.floor(segundos / 60);
    const segs = segundos % 60;
    return `${minutos}:${segs.toString().padStart(2, '0')}`;
  }

  esCancionActual(cancion: Cancion): boolean {
    return this.cancionActual?.id === cancion.id;
  }

  limpiarBusqueda() {
    this.terminoBusqueda = '';
    this.buscarCanciones();
  }

  trackByCancionId(index: number, cancion: Cancion): string {
    return cancion.id;
  }
}