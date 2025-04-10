import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Song } from '../../../models/song.model';
import { SongService } from '../../../services/song.service';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { CompanieService } from '../../../services/companie.service';
import { Companie } from '../../../models/companie.model';
import { ModalService } from '../../../services/utils/modal.service';
import { DefaultModalComponent } from '../../../components/modals/default/default.component';
import { MatDialogRef } from '@angular/material/dialog';
import { firstValueFrom } from 'rxjs';
import { SnackService } from '../../../services/utils/snack.service';
import { TranslateService } from '@ngx-translate/core';

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
    private router: Router,
    private _songService: SongService,
    private _companieService: CompanieService,
    private _modalService: ModalService,
    private _snackService: SnackService,
    private translate: TranslateService
  ) {}

  async ngOnInit() {
    const songId = this.route.snapshot.paramMap.get('id-song');
    const dialogRef = this._modalService.openLoader();
    if (songId) {
      // Fetch the song details
      this.song = await this._songService.getSong(songId);
      // Fetch the companies
      this.companies = await this._companieService.getCompanies();
      // Close the loader modal
      setTimeout(() => {
        dialogRef.close(); // This timeout is just for demonstration purposes
      }, 2000);
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

  deleteSong() {
    try {
      const modal: MatDialogRef<DefaultModalComponent> = this._modalService.open(
        'SONG.DELETE.DELETE_TITLE',
        'SONG.DELETE.DELETE_CONTENT',
        'MODAL.CONFIRM',
        'MODAL.CANCEL'
      );
      modal.afterClosed().subscribe(async (isOk: boolean) => {
        if (isOk && this.song?.id) {
          const response = await this._songService.deleteSong(this.song.id);
          
          this._snackService.show(
            this.translate.instant('SONG.DELETE.DELETE_SUCCESS'),
            '',
            {
              duration: 5000,
            }
          );
          this.router.navigate(['/songs']);
        }
      });
    } catch (e: any) {
      this.handleError('ERROR.UNEXPECTED_ERROR');
    }
  }

  editSong() {
    if (this.song) {
      this.router.navigate(['/edit-song', this.song.id]);
    }
  }

  async handleError(error: string) {
    const errorMessage = await firstValueFrom(this.translate.get(error));
    this._snackService.show(errorMessage, '', {
      duration: 5000,
      panelClass: ['warning-snackbar'],
    });
  }
}
