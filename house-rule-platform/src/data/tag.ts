export class Tag {
  name: string;
  id: number;
  active: boolean;

  constructor(name?: string, id?: number) {
    this.name = name;
    this.id = id;
    this.active = false;
  }
}
