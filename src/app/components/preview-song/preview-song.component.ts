import { Component, Input } from '@angular/core';
import { Song } from '../../models/song.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-preview-song',
  imports: [CommonModule],
  templateUrl: './preview-song.component.html',
  styleUrl: './preview-song.component.scss'
})
export class PreviewSongComponent {
  @Input() song: Song | undefined;
}
