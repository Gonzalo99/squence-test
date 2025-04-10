import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { firstValueFrom, Observable } from "rxjs";
import { environment } from "../../environments/environment";
import { SongDTO } from "../dto/song/song.dto";
import { Song } from "../models/song.model";
import { SongMapper } from "../mappers/song.mapper";
import { plainToClass } from 'class-transformer';
import { ISong } from "../interfaces/song.interface";

@Injectable({
  providedIn: 'root',
})
export class SongService {

  constructor(private readonly http: HttpClient, private songMapper: SongMapper) {}

  async getSongs(): Promise<ISong[]> {
    let songs: undefined | Song[];

    try {
      const response = await firstValueFrom(
        this.http.get<SongDTO[]>(`${environment.apiUrl}/songs`)
      );

      songs = response.map(song => this.songMapper.map(plainToClass(SongDTO, song)))
      .filter((song): song is Song => song !== null);
    } catch (error) {
      console.error('Error fetching songs:', error);
      return [];
    }

    return songs;
  }

  async getSong(id: string): Promise<ISong | undefined> {
    let song: undefined | Song;

    try {
      const response = await firstValueFrom(
        this.http.get<SongDTO>(`${environment.apiUrl}/songs/${id}`)
      );

      song = this.songMapper.map(plainToClass(SongDTO, response));
    } catch (error) {
      console.error('Error fetching song:', error);
      return undefined;
    }

    return song;
  }

  deleteSong(id: string) {
    return firstValueFrom(this.http.delete(`${environment.apiUrl}/songs/${id}`));
  }

  createSong(song: any) {
    return this.http.post<ISong>(`${environment.apiUrl}/songs`, song);
  }

  updateSong(id: any, song: any) {
    return this.http.put<ISong>(`${environment.apiUrl}/songs/${id}`, song);
  }
}