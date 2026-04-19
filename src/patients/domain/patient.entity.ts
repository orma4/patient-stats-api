export class Patient {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly age: number,
    public readonly gender: string,
  ) {}
}
