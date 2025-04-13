export interface IArtist {
  id: string;
  name: string;
  bornCity: string;
  birthdate: string;
  rating: number;
  songs: string[];
  img?: string;
}