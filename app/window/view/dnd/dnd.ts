import { IDragAndDropData } from "base/browser/dnd";
import { IStorageItem } from "internal/storage/storage-item";
import { IProject } from "internal/project/project";

export class StorageItemDragAndDropData implements IDragAndDropData {

	readonly project: IProject;
  readonly storageItem: IStorageItem;

  constructor(project: IProject, storageItem: IStorageItem) {
		this.project = project;
    this.storageItem = storageItem;
  }

  update(): void { }

  getData(): void {
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