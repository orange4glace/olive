import { IResource } from "internal/resource/base/resource";
import { createDecorator } from "platform/instantiation/common/instantiation";
import { ResourceIdentifier } from "internal/resource/common/resouce";

export interface IResourceEvent {
  resource: IResource
}

export const IResourcesService = createDecorator<IResourcesService>('olive.resource.ResourcesService');

export interface IResourcesService {

  _serviceBrand: any;

  getResource(id: ResourceIdentifier): IResource | null;

}