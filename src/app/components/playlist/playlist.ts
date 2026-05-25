import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SongListComponent } from '../song-list/song-list';
import { MusicLibraryService } from '../../services/music-library.service';

@Component({
  selector: 'app-playlist',
  standalone: true,
  imports: [CommonModule, SongListComponent],
  templateUrl: './playlist.html',
  styleUrls: ['./playlist.css']
})
export class PlaylistComponent {
  constructor(public musicLibrary: MusicLibraryService) {}
}
