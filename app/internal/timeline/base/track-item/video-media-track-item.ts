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
import { Emitter, Event } from "base/common/event";
import { Timebase } from "internal/timeline/base/timebase";

export interface SerializedVideoMediaTrackItem extends SerializedVideoTrackItem {
  resourceID: ResourceIdentifier;
}

@Postable
export class VideoMediaTrackItem extends WithVideoMediaTrackItemBase(VideoTrackItem) {

  protected resource_: VideoResource;
  public get resource() { return this.resource_; }

  constructor(resource: VideoResource) {
    super(VideoMediaTrackItem.TYPE, new Timebase(resource.timebase.num, resource.timebase.den));
    this.resource_ = resource;
    this.drawing_ = new VideoMediaDrawing(resource);

    this.onWillChangeTime(this.willChangeTimeHandler, this);
  }

  private willChangeTimeHandler(time: TrackItemTime) {
    
  }

  setTime(startTime: number, endTime: number, baseTime: number): void {
    this.doSetTime(startTime, endTime, baseTime);
  }

  setMediaTime(startTime: number, endTime: number, baseTime: number) {
    const time = new TrackItemTime(startTime, endTime, baseTime);
    const trackItemTime = time.rescale(this.resource.timebase, this.timebase);
    this.doSetTime(trackItemTime.start, trackItemTime.end, trackItemTime.base);
  }

  private doSetTime(startTime: number, endTime: number, baseTime: number) {
    console.log('do Set Time', startTime, endTime, baseTime);
    const old = this.time_;
    const time = new TrackItemTime(startTime, endTime, baseTime);
    const mediaTime = time.rescale(this.timebase, this.resource.timebase);
    console.log('Media time = ', mediaTime.start, mediaTime.end, mediaTime.base, this.resource.duration);
    if (mediaTime.base < 0) {
      mediaTime.start -= mediaTime.base;
      mediaTime.base = 0;
    }
    const d = (mediaTime.end - mediaTime.start + mediaTime.base) - this.resource.duration;
    if (d > 0) {
      mediaTime.end -= d;
    }
    if (mediaTime.start >= mediaTime.end) mediaTime.end = mediaTime.start;
    const final = mediaTime.rescale(this.resource.timebase, this.timebase);
    this.time_ = final;
    this.onDidChangeTime_.fire({
      old: old
    });
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
      trackItem.setTime(trackItemTime.start, trackItemTime.end, trackItemTime.base);
      return trackItem;
    })

  }
}

Registry.as<TrackItemFactoryRegistry>(TrackItemFactoryRegistry.ID).registerFactory(VideoMediaTrackItem.TYPE, VideoMediaTrackItemFactory);