import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Song } from '../../../models/song.model';
import { SongService } from '../../../services/song.service';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { CompanieService } from '../../../services/companie.service';
import { Companie } from '../../../models/companie.model';

@Component({
  selector: 'app-song',
  imports: [CommonModule, RouterModule, TranslateModule],
  templateUrl: './song.component.html',
  styleUrl: './song.component.scss'
})
export class SongComponent {
  public song: Song | undefined;
  public companies: Companie[] | undefined;

  constructor(
    private route: ActivatedRoute,
    private _songService: SongService,
    private _companieService: CompanieService
  ) {}

  async ngOnInit() {
    const songId = this.route.snapshot.paramMap.get('id-song');
    if (songId) {
      // Fetch the song details
      this.song = await this._songService.getSong(songId);
      // Fetch the companies
      this.companies = await this._companieService.getCompanies();
    }
  }

  // Function to get the companies associated with the song
  // This function filters the companies based on the song ID
  companiesSong(): Companie[] {
    if (this.song && this.companies) {
      const filteredCompanies = this.companies.filter(company => company.songs.includes(Number(this.song?.id)));
      return filteredCompanies;
    }
    return [];
  }
}
