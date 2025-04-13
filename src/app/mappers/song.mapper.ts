import { Injectable } from "@angular/core";
import { validateSync } from "class-validator";
import { SongDTO } from "../dto/song/song.dto";
import { Song } from "../models/song.model";

@Injectable({
  providedIn: 'root',
})
export class SongMapper {
  map(song: SongDTO): Song | undefined {
    if (!song) {
      return undefined;
    }

    const errors = validateSync(song);
    if (errors.length) {
      console.debug(errors);

      return undefined;
    }
    
    return new Song(
      song.id,
      song.title,
      song.poster,
      song.genre,
      song.year,
      song.duration,
      song.rating,
      song.artist
    );
  }
}