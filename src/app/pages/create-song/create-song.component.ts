import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ArtistService } from '../../services/artist.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MaterialModule } from '../../material.module';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import {
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
import { Artist } from '../../models/artist.model';
import { SongService } from '../../services/song.service';
import { catchError, firstValueFrom, throwError } from 'rxjs';
import { ISong } from '../../interfaces/song.interface';
import { SnackService } from '../../services/utils/snack.service';
import { Song } from '../../models/song.model';

export const MY_FORMATS = {
  parse: {
    dateInput: 'YYYY',
  },
  display: {
    dateInput: 'YYYY',
    monthYearLabel: 'YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'YYYY',
  },
};

@Component({
  selector: 'app-create-song',
  imports: [
    RouterModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    TranslateModule
  ],
  templateUrl: './create-song.component.html',
  styleUrl: './create-song.component.scss',
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class CreateSongComponent {
  public form: FormGroup;
  public genres: string[] = ['Pop', 'Rock', 'Alternative', 'Chill', 'Heavy', 'Romance', 'Blues', 'Psychedelic rock'];
  public artists: Artist[] | undefined;
  public songId: string | undefined;
  public song: Song | undefined;
  public title: string;

  constructor(
    private _artistService: ArtistService,
    private fb: FormBuilder,
    private _songService: SongService,
    private _snackService: SnackService,
    private translate: TranslateService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.songId = this.route.snapshot.params['id-song'];
    this.title = this.songId
      ? 'SONG.EDIT-SONG'
      : 'SONG.CREATE-SONG';

    this.form = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(50)]],
      genre: [[], [Validators.required]],
      year: ['', [Validators.required]],
      duration: ['', [Validators.required]],
      rating: ['', [Validators.required]],
      artist: ['', [Validators.required]],
    });
  }

  async ngOnInit() {
    this.artists = await this._artistService.getArtists();
    if (this.songId) {
      this.song = await this._songService.getSong(this.songId);
      if (this.song) this.mapFormValues(this.song);
    }
  }

  private mapFormValues(song: ISong) {
    this.form.controls['title'].setValue(song.title);
    this.form.controls['genre'].setValue(song.genre);
    this.form.controls['year'].setValue(new Date(`${song.year}-01-01`));
    this.form.controls['duration'].setValue(song.duration);
    this.form.controls['rating'].setValue(song.rating);
    this.form.controls['artist'].setValue(String(song.artist));
  }

  chosenYearHandler(ev: { _d: any; }, dp: any) {
    let { _d } = ev;
    this.form.controls['year'].setValue(_d);
    dp.close();
  }

  submitForm() {
    if (this.form.valid) {
      const song = {
        title: this.form.value.title,
        poster: "http://dummyimage.com/400x600.png/dddddd/000000",
        genre: this.form.value.genre,
        year: new Date(this.form.value.year).getFullYear(),
        duration: this.form.value.duration,
        rating: this.form.value.rating,
        artist: Number(this.form.value.artist),
      };

      // If the songId is defined, we are editing an existing song
      if (this.songId) {
        this.updateSong(song);
      }
      // If the songId is not defined, we are creating a new song 
      else {
        this.createSong(song);
      }
    }
  }

  async updateSong(song: any) {
    // Call the service to create the song
    this._songService.updateSong(this.songId, song).pipe(
      catchError((error) => {
        // Handle the error here
        this.handleError('ERROR.UNEXPECTED_ERROR');
        return throwError(() => error);
      })
    )
    .subscribe(async (response) => {
      /** ¡IMPORTANT! **/
      // This update should be done in the backend for more efficiency and not in the frontend but for now we do it here

      // If no changes have been made to the artist no updates are made
      if (this.song?.artist == Number(this.form.value.artist)) {
        this.successfulMessage();
        this.router.navigate(['/songs']);
      } else {
        // Remove the old artist
        let artist = this.artists?.find((artist) => artist.id == String(this.song?.artist));
        if (artist) {
          artist.songs = artist.songs.filter((songId) => songId !=  this.song?.id);
          await this._artistService.updateArtist(artist.id, artist);
        }
        // Add the new artist
        artist = this.artists?.find((artist) => artist.id === this.form.value.artist);
        if (artist && response) {
          artist.songs.push(response.id);
          await this._artistService.updateArtist(artist.id, artist);
          this.successfulMessage();
          this.router.navigate(['/songs']);
        }
      }
    });
  }

  async createSong(song: any) {
    // Call the service to create the song
    this._songService.createSong(song).pipe(
      catchError((error) => {
        // Handle the error here
        this.handleError('ERROR.UNEXPECTED_ERROR');
        return throwError(() => error);
      })
    )
    .subscribe(async (response) => {
      /** ¡IMPORTANT! **/
      // This update should be done in the backend for more efficiency and not in the frontend but for now we do it here
      let artist = this.artists?.find((artist) => artist.id == this.form.value.artist);
      if (artist && response) {
        artist.songs.push(response.id);
        await this._artistService.updateArtist(artist.id, artist);
        this.successfulMessage();
        this.router.navigate(['/songs']);
      }
    });
  }

  async handleError(error: string) {
    const errorMessage = await firstValueFrom(this.translate.get(error));
    this._snackService.show(errorMessage, '', {
      duration: 5000,
      panelClass: ['warning-snackbar'],
    });
  }

  successfulMessage() {
    const message = this.songId ? 'SONG.EDIT.SUCCESS' : 'SONG.CREATE.SUCCESS';
    this._snackService.show(
      this.translate.instant(message),
      '',
      {
        duration: 5000,
        panelClass: ['success-snackbar'],
      }
    );
  }
}
