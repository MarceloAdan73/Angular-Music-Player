import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MusicPlayerComponent } from './components/music-player/music-player';
import { PlaylistComponent } from './components/playlist/playlist';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, MusicPlayerComponent, PlaylistComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent {
  title = 'Music Player';
}
