import { IResource } from "internal/resource/resource";
import { createDecorator } from "platform/instantiation/common/instantiation";
import { ITrackItem } from "internal/timeline/track-item/track-item";

export interface IResourceEvent {
  resource: IResource
}

export const IResourceService = createDecorator<IResourceService>('olive.ResourceService');

export interface IResourceService {

  /*@observable*/ resources: Set<IResource>;

  createResource(path: string): Promise<IResource>;
  trackItemize(resource: IResource): ITrackItem;

}