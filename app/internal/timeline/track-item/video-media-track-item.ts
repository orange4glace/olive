import { VideoTrackItemBase, VideoTrackItem, VideoTrackItemImpl, SerializedVideoTrackItem } from "internal/timeline/track-item/video-track-item";
import { Postable, postable } from "worker-postable";
import { TrackItemTime } from "internal/timeline/track-item/track-item-time";
import { clone } from "base/olive/cloneable";
import { VideoMediaDrawing } from "internal/rendering/drawing/video-media-drawing";
import { VideoResourceBase, IVideoResource, VideoResource } from "internal/resource/video-resource";
import { ResourceIdentifier } from "internal/resource/resource";
import { IInstantiationService } from "platform/instantiation/common/instantiation";
import { IResourcesService } from "internal/resource/resource-service";
import { ITrackItemFactory, TrackItemFactoryRegistry } from "internal/timeline/track-item/track-item";
import { Registry } from "platform/registry/common/platform";

export interface SerializedVideoMediaTrackItem extends SerializedVideoTrackItem {
  resourceID: ResourceIdentifier;
}

export interface VideoMediaTrackItemBase extends VideoTrackItemBase {
  readonly resource: VideoResourceBase;
}

export interface VideoMediaTrackItem extends VideoTrackItem {
  readonly resource: IVideoResource;
}

@Postable
export class VideoMediaTrackItemImpl extends VideoTrackItemImpl implements VideoMediaTrackItemBase {

  static readonly TYPE = 'olive.timeline.VideoMediaTrackItem';

  @postable resource: IVideoResource;

  constructor(resource: IVideoResource) {
    super(VideoMediaTrackItemImpl.TYPE);
    this.resource = resource;
    this.drawing = new VideoMediaDrawing(resource);
  }

  __setTime(time: TrackItemTime) {
    time = clone(time);
    if (time.base < 0) {
      time.start -= time.base;
      time.base = 0;
    }
    let dur = time.end - time.start;
    if (dur > this.resource.duration)
      time.end -= dur - this.resource.duration;
    this.time = time;
    this.onTimeChanged_.fire();
  }

  clone(obj: VideoMediaTrackItemImpl): Object {
    super.clone(obj);
    obj.resource = this.resource;
    return obj;
  }
  
  serialize(): SerializedVideoMediaTrackItem {
    return {
      ...super.serialize(),
      resourceID: this.resource.id
    }
  }

}

class VideoMediaTrackItemFactory implements ITrackItemFactory<VideoMediaTrackItemImpl> {
  serialize(trackItem: VideoMediaTrackItemImpl): SerializedVideoMediaTrackItem {
    return trackItem.serialize();
  }
  deserialize(instantiationService: IInstantiationService, serial: SerializedVideoMediaTrackItem) {
    return instantiationService.invokeFunction<VideoMediaTrackItemImpl>(accessor => {
      if (serial.type !== VideoMediaTrackItemImpl.TYPE) {
        console.warn('VideoMediaTrackItem Type not match. ' + JSON.stringify(serial));
        return null;
      }
      const resourcesService = accessor.get(IResourcesService);
      const resource = resourcesService.getResource(serial.resourceID);
      if (!resource) {
        console.warn('VideoMediaTrackItem Resource not found. ' + JSON.stringify(serial));
        return null;
      }
      if (resource.type !== VideoResource.TYPE) {
        console.warn('VideoMediaTrackItem Resource type not math. ' + JSON.stringify(serial));
        return null;
      }
      const trackItem = new VideoMediaTrackItemImpl(resource as VideoResource);
      const trackItemTime = TrackItemTime.deserialize(serial.time);
      if (!trackItemTime) {
        console.warn('Failed to deserialize TrackItemTime. ' + JSON.stringify(serial));
        return null;
      }
      trackItem.__setTime(trackItemTime);
      return trackItem;
    })

  }
}

Registry.as<TrackItemFactoryRegistry>(TrackItemFactoryRegistry.ID).registerFactory(VideoMediaTrackItemImpl.TYPE, VideoMediaTrackItemFactory);