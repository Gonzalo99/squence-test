export class Artist {
  constructor(
    public readonly id: string,
    public name: string,
    public bornCity: string,
    public birthdate: string,
    public rating: number,
    public songs: string[],
    public img?: string,
  ) {}
}