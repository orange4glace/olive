import { IResource } from "internal/resource/resource";
import { createDecorator } from "platform/instantiation/common/instantiation";
import { ITrackItem } from "internal/timeline/track-item/track-item";
import { IVideoResource } from "internal/resource/video-resource";
import { IAudioResource } from "internal/resource/audio-resource";

export interface IResourceEvent {
  resource: IResource
}

export const IResourceService = createDecorator<IResourceService>('olive.ResourceService');

export interface IResourceService {

  /*@observable*/ resources: Set<IResource>;

  createResource(path: string): Promise<{
    video: IVideoResource,
    audio: IAudioResource
  }>;
  trackItemize(resource: IResource): ITrackItem;

}