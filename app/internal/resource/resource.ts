let next_resource_id = 0;

export default class Resource {
  readonly id: number;
  readonly path: string;
  readonly ext: string;

  constructor(path: string) {
    this.id = next_resource_id ++;
    this.path = path;
  }

  isImage(): boolean {
    return false;
  }

  isVideo(): boolean {
    return false;
  }
}