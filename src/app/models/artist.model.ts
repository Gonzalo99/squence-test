export class Artist {
  constructor(
    public readonly id: any,
    public name: string,
    public bornCity: string,
    public birthdate: string,
    public rating: number,
    public songs: number[],
    public img?: string,
  ) {}
}