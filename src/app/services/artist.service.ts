import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ArtistMapper } from "../mappers/artist.mapper";
import { Artist } from "../models/artist.model";
import { firstValueFrom } from "rxjs";
import { environment } from "../../environments/environment";
import { ArtistDTO } from "../dto/artist/artist.dto";
import { plainToClass } from "class-transformer";

@Injectable({
    providedIn: 'root',
  })
  export class ArtistService {
  
    constructor(private readonly http: HttpClient, private artistMapper: ArtistMapper) {}
  
    async getArtists() {
      let artists: undefined | Artist[];
  
      try {
        const response = await firstValueFrom(
          this.http.get<ArtistDTO[]>(`${environment.apiUrl}/artists`)
        );
  
        artists = response.map(artist => this.artistMapper.map(plainToClass(ArtistDTO, artist)))
        .filter((artist): artist is Artist => artist !== null);
      } catch (error) {
        console.error('Error fetching artists:', error);
        return [];
      }
  
      return artists;
    }

    async updateArtist(id: string, artist: Artist) {
      return await firstValueFrom(this.http.put(`${environment.apiUrl}/artists/${id}`, artist));
    }
  }