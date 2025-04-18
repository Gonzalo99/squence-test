export class Song {
  constructor(
    public readonly id: string,
    public title: string,
    public poster: string,
    public genre: string[],
    public year: number,
    public duration: number,
    public rating: number,
    public artist: number
  ) {}
}