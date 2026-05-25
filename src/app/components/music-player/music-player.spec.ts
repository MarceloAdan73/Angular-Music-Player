import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MusicPlayerComponent } from './music-player';
import { AudioService } from '../../services/audio.service';
import { MusicLibraryService } from '../../services/music-library.service';
import { Cancion } from '../../models/cancion.model';
import { BehaviorSubject } from 'rxjs';

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn()
  }))
});

describe('MusicPlayerComponent', () => {
  let component: MusicPlayerComponent;
  let fixture: ComponentFixture<MusicPlayerComponent>;

  const mockSong: Cancion = {
    id: '1',
    titulo: 'Test Song',
    artista: 'Test Artist',
    album: 'Test Album',
    duracion: 200,
    archivo: 'test.mp3',
    portada: 'test.jpg',
    genero: 'Rock',
    anio: 2020
  };

  const mockCurrentSong$ = new BehaviorSubject<Cancion | null>(mockSong);
  const mockIsPlaying$ = new BehaviorSubject<boolean>(false);
  const mockIsLoading$ = new BehaviorSubject<boolean>(false);
  const mockCurrentTime$ = new BehaviorSubject<number>(0);

  const mockAudioService = {
    getCurrentSong: () => mockCurrentSong$.asObservable(),
    getIsPlaying: () => mockIsPlaying$.asObservable(),
    getIsLoading: () => mockIsLoading$.asObservable(),
    getCurrentTime: () => mockCurrentTime$.asObservable(),
    togglePlayPause: () => {
      mockIsPlaying$.next(!mockIsPlaying$.value);
    },
    playPrevious: () => {},
    playNext: () => {},
    setShuffleMode: (enabled: boolean) => {},
    seekTo: (time: number) => {},
    setCurrentSong: (song: Cancion) => {},
    playSong: (song: Cancion) => {}
  };

  const mockMusicLibrary = {
    getAllSongs: () => [mockSong]
  };

  beforeEach(async () => {
    mockCurrentSong$.next(mockSong);
    mockIsPlaying$.next(false);
    mockIsLoading$.next(false);
    mockCurrentTime$.next(0);

    await TestBed.configureTestingModule({
      imports: [MusicPlayerComponent],
      providers: [
        { provide: AudioService, useValue: mockAudioService },
        { provide: MusicLibraryService, useValue: mockMusicLibrary }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(MusicPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('1 - debe inicializar con cancion por defecto', () => {
    expect(component.currentSong).toBeTruthy();
    expect(component.currentSong?.titulo).toBe('Test Song');
  });

  it('2 - debe cambiar isPlaying al llamar togglePlayPause', () => {
    expect(component.isPlaying).toBeFalsy();
    component.togglePlayPause();
    expect(component.isPlaying).toBeTruthy();
  });

  it('3 - debe cambiar shuffle al llamar toggleShuffle', () => {
    expect(component.isShuffle).toBeFalsy();
    component.toggleShuffle();
    expect(component.isShuffle).toBeTruthy();
    component.toggleShuffle();
    expect(component.isShuffle).toBeFalsy();
  });

  it('4 - debe avanzar al siguiente tema', () => {
    const spy = vi.spyOn(mockAudioService, 'playNext');
    component.playNext();
    expect(spy).toHaveBeenCalled();
  });
});
