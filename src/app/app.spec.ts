import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app';
import { MusicPlayerComponent } from './components/music-player/music-player';
import { PlaylistComponent } from './components/playlist/playlist';
import { AudioService } from './services/audio.service';
import { MusicLibraryService } from './services/music-library.service';
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

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  const mockAudioService = {
    getCurrentSong: () => new BehaviorSubject(null).asObservable(),
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
    getAllSongs: () => []
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, MusicPlayerComponent, PlaylistComponent],
      providers: [
        { provide: AudioService, useValue: mockAudioService },
        { provide: MusicLibraryService, useValue: mockMusicLibrary }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('1 - debe crear la aplicacion', () => {
    expect(component).toBeTruthy();
  });

  it('2 - debe tener el titulo Music Player', () => {
    expect(component.title).toBe('Music Player');
  });

  it('3 - debe renderizar app-music-player', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-music-player')).toBeTruthy();
  });
});
