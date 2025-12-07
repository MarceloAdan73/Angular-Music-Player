import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  // Placeholders coloridos por artista
  private artistPlaceholders: {[key: string]: string} = {
    'Tren Loco': 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=300&h=300&fit=crop&auto=format',
    'Iron Maiden': 'https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?w=300&h=300&fit=crop&auto=format',
    'O\'Connor': 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300&h=300&fit=crop&auto=format',
    'Stone Temple Pilots': 'https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=300&h=300&fit=crop&auto=format',
    'Mal√≥n': 'https://images.unsplash.com/photo-1519281682544-5f37c4b14c47?w=300&h=300&fit=crop&auto=format',
    'Velvet Revolver': 'https://images.unsplash.com/photo-1511735111819-9a3f7709049c?w=300&h=300&fit=crop&auto=format'
  };

  private defaultPlaceholder = 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop&auto=format';
  
  getImageUrl(path: string): string {
    return path;
  }
  
  handleImageError(event: any, cancion?: any): void {
    const img = event.target;
    
    console.log('Ì∂ºÔ∏è Imagen no encontrada, usando placeholder para:', cancion?.artista);
    
    // Usar placeholder espec√≠fico por artista si existe
    if (cancion?.artista && this.artistPlaceholders[cancion.artista]) {
      img.src = this.artistPlaceholders[cancion.artista];
    } else {
      img.src = this.defaultPlaceholder;
    }
    
    // Prevenir bucles infinitos
    img.onerror = null;
    
    // Agregar clase para estilos espec√≠ficos de placeholder
    img.classList.add('image-placeholder');
  }
}
