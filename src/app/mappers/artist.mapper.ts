import { Injectable } from "@angular/core";
import { ArtistDTO } from "../dto/artist/artist.dto";
import { Artist } from "../models/artist.model";
import { validateSync } from "class-validator";

@Injectable({
  providedIn: 'root',
})
export class ArtistMapper {
  map(artist: ArtistDTO): Artist | undefined {
    if (!artist) {
      return undefined;
    }

    const errors = validateSync(artist);
    if (errors.length) {
      console.debug(errors);

      return undefined;
    }
    
    return new Artist(
      artist.id,
      artist.name,
      artist.bornCity,
      artist.birthdate,
      artist.rating,
      artist.songs,
      artist.img,
    );
  }
}