import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { SongService } from '../../services/song.service';
import { Song } from '../../models/song.model';
import { PreviewSongComponent } from '../../components/preview-song/preview-song.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-songs',
  imports: [CommonModule, TranslateModule, PreviewSongComponent],
  templateUrl: './songs.component.html',
  styleUrl: './songs.component.scss'
})
export class SongsComponent {
  public songs: Song[] | undefined;

  constructor(private _songService: SongService) {}

  async ngOnInit() {
    // Fetch the songs
    this.songs = await this._songService.getSongs();
  }
}
