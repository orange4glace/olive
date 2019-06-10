import { Postable, postable } from "worker-postable";
import { clone } from "base/olive/cloneable";
import { VideoMediaDrawing } from "internal/rendering/drawing/base/video-media-drawing";
import { VideoResource } from "internal/resource/base/video-resource";
import { IInstantiationService } from "platform/instantiation/common/instantiation";
import { IResourcesService } from "internal/resource/base/resource-service";
import { Registry } from "platform/registry/common/platform";
import { ResourceIdentifier } from "internal/resource/common/resouce";
import { SerializedVideoTrackItem, VideoTrackItem } from "internal/timeline/base/track-item/video-track-item";
import { WithVideoMediaTrackItemBase } from "internal/timeline/common/track-item/video-media-track-item";
import { TrackItemTime } from "internal/timeline/base/track-item/track-item-time";
import { TrackItemFactoryRegistry, ITrackItemFactory } from "internal/timeline/base/track-item/track-item-impl";

export interface SerializedVideoMediaTrackItem extends SerializedVideoTrackItem {
  resourceID: ResourceIdentifier;
}

@Postable
export class VideoMediaTrackItem extends WithVideoMediaTrackItemBase(VideoTrackItem) {

  protected resource_: VideoResource;
  public get resource() { return this.resource_; }

  constructor(resource: VideoResource) {
    super(VideoMediaTrackItem.TYPE);
    this.resource_ = resource;
    this.drawing_ = new VideoMediaDrawing(resource);
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
    this.time_ = time;
    this.onTimeChanged_.fire();
  }

  clone(obj: VideoMediaTrackItem): Object {
    super.clone(obj);
    obj.resource_ = this.resource;
    return obj;
  }
  
  serialize(): SerializedVideoMediaTrackItem {
    return {
      ...super.serialize(),
      resourceID: this.resource.id
    }
  }

}

class VideoMediaTrackItemFactory implements ITrackItemFactory<VideoMediaTrackItem> {
  serialize(trackItem: VideoMediaTrackItem): SerializedVideoMediaTrackItem {
    return trackItem.serialize();
  }
  deserialize(instantiationService: IInstantiationService, serial: SerializedVideoMediaTrackItem) {
    return instantiationService.invokeFunction<VideoMediaTrackItem>(accessor => {
      if (serial.type !== VideoMediaTrackItem.TYPE) {
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
      const trackItem = new VideoMediaTrackItem(resource as VideoResource);
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

Registry.as<TrackItemFactoryRegistry>(TrackItemFactoryRegistry.ID).registerFactory(VideoMediaTrackItem.TYPE, VideoMediaTrackItemFactory);