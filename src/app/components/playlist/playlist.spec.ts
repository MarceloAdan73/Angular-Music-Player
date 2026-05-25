import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlaylistComponent } from './playlist';
import { SongListComponent } from '../song-list/song-list';
import { AudioService } from '../../services/audio.service';
import { MusicLibraryService } from '../../services/music-library.service';
import { ImageService } from '../../services/image.service';
import { Cancion } from '../../models/cancion.model';
import { BehaviorSubject } from 'rxjs';

describe('PlaylistComponent', () => {
  let component: PlaylistComponent;
  let fixture: ComponentFixture<PlaylistComponent>;

  const mockSongs: Cancion[] = [
    { id: '1', titulo: 'Song 1', artista: 'Artist 1', album: 'Album 1', duracion: 200, archivo: 's1.mp3', portada: 'p1.jpg', genero: 'Rock', anio: 2020 },
    { id: '2', titulo: 'Song 2', artista: 'Artist 2', album: 'Album 2', duracion: 210, archivo: 's2.mp3', portada: 'p2.jpg', genero: 'Pop', anio: 2021 },
    { id: '3', titulo: 'Song 3', artista: 'Artist 3', album: 'Album 3', duracion: 220, archivo: 's3.mp3', portada: 'p3.jpg', genero: 'Jazz', anio: 2022 },
    { id: '4', titulo: 'Song 4', artista: 'Artist 4', album: 'Album 4', duracion: 230, archivo: 's4.mp3', portada: 'p4.jpg', genero: 'Metal', anio: 2023 },
    { id: '5', titulo: 'Song 5', artista: 'Artist 5', album: 'Album 5', duracion: 240, archivo: 's5.mp3', portada: 'p5.jpg', genero: 'Blues', anio: 2024 },
    { id: '6', titulo: 'Song 6', artista: 'Artist 6', album: 'Album 6', duracion: 250, archivo: 's6.mp3', portada: 'p6.jpg', genero: 'Funk', anio: 2025 }
  ];

  const mockAudioService = {
    getCurrentSong: () => new BehaviorSubject<Cancion | null>(null).asObservable(),
    getIsPlaying: () => new BehaviorSubject(false).asObservable(),
    getIsLoading: () => new BehaviorSubject(false).asObservable(),
    getCurrentTime: () => new BehaviorSubject(0).asObservable(),
    togglePlayPause: () => {},
    playPrevious: () => {},
    playNext: () => {},
    setShuffleMode: () => {},
    seekTo: () => {},
    setCurrentSong: () => {},
    playSong: () => {}
  };

  const mockMusicLibrary = {
    getAllSongs: () => [...mockSongs]
  };

  const mockImageService = {
    getImageUrl: (path: string) => path,
    handleImageError: () => {}
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlaylistComponent, SongListComponent],
      providers: [
        { provide: AudioService, useValue: mockAudioService },
        { provide: MusicLibraryService, useValue: mockMusicLibrary },
        { provide: ImageService, useValue: mockImageService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PlaylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('1 - debe mostrar lista de 6 canciones', () => {
    const songs = component.musicLibrary.getAllSongs();
    expect(songs.length).toBe(6);
  });

  it('2 - debe mostrar badge con cantidad de canciones', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const badge = compiled.querySelector('.dark-badge');
    expect(badge).toBeTruthy();
    expect(badge?.textContent).toContain('6');
  });

  it('3 - debe renderizar app-song-list', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-song-list')).toBeTruthy();
  });
});
