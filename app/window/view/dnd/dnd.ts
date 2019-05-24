import { IDragAndDropData } from "base/view/dnd";
import { IResource } from "internal/resource/resource";

export class ResourceDragAndDropData implements IDragAndDropData {

  readonly resource: IResource;

  constructor(resource: IResource) {
    this.resource = resource;
  }

  update(): void { }

  getData(): IResource {
    return this.resource;
  }

}

export class DesktopDragAndDropData implements IDragAndDropData {

	readonly types: any[];
	readonly files: any[];

	constructor() {
		this.types = [];
		this.files = [];
	}

	update(dataTransfer: DataTransfer): void {
		if (dataTransfer.types) {
			this.types.splice(0, this.types.length, ...dataTransfer.types);
		}

		if (dataTransfer.files) {
			this.files.splice(0, this.files.length);

			for (let i = 0; i < dataTransfer.files.length; i++) {
				const file = dataTransfer.files.item(i);

				if (file && (file.size || file.type)) {
					this.files.push(file);
				}
			}
		}
	}

	getData(): any {
		return {
			types: this.types,
			files: this.files
		};
	}
}