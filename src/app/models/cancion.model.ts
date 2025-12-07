export interface Cancion {
  id: string;
  titulo: string;
  artista: string;
  album: string;
  duracion: number;
  archivo: string;
  portada: string;
  genero: string;
  anio?: number;
}
