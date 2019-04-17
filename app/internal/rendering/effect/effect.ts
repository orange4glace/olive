export abstract class Effect {

  readonly name: string;

  constructor(name: string) {
    this.name = name;
  }
}