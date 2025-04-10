export class Companie {
  constructor(
    public readonly id: string,
    public name: string,
    public country: string,
    public createYear: number,
    public employees: number,
    public rating: number,
    public songs: string[]
  ) {}
}