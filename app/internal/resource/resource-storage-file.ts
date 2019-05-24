import { IStorageFile, StorageFile } from "internal/storage/storage-file";
import { IResource } from "internal/resource/resource";

export interface IResourceStorageFile extends IStorageFile {

  readonly resource: IResource;

}

export class ResourceStorageFile extends StorageFile implements IResourceStorageFile {

  readonly resource: IResource;
  readonly type = 'olive.Resource';

  constructor(resource: IResource) {
    super(resource.path)
    this.resource = resource;
  }

}
