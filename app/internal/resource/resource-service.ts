import { IResource, ResourceIdentifier } from "internal/resource/resource";
import { createDecorator } from "platform/instantiation/common/instantiation";
import { ITrackItem } from "internal/timeline/track-item/track-item";
import { IVideoResource } from "internal/resource/video-resource";
import { IAudioResource } from "internal/resource/audio-resource";

export interface IResourceEvent {
  resource: IResource
}

export const IResourcesService = createDecorator<IResourcesService>('olive.resource.ResourcesService');

export interface IResourcesService {

  _serviceBrand: any;

  getResource(id: ResourceIdentifier): IResource | null;

}