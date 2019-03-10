export interface IResource {
  id: number;
}

export interface IResourceManager {

  addResource(resource: IResource): void;

}