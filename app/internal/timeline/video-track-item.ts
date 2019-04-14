import { Postable, postable } from 'worker-postable'

import TrackItem, { TrackItemBase } from './track-item'
import TrackItemType from './track-item-type';
import { IResource } from 'standard';
import VideoDrawing, { VideoDrawingBase } from 'internal/drawing/video-drawing';
import { Rectangle, Paper, Polygon, Vector2Property } from 'internal/drawing';
import { Resource, ResourceBase, VideoResource } from 'internal/resource';
import { TimePair } from './time-pair';
import PostableVector2 from 'util/postable_vector2';
import { Vector4 } from 'oliveutil/vector4';
import { MaskDrawing } from 'internal/drawing/mask';
import { Vector2 } from 'oliveutil/vector2';

export interface VideoTrackItemBase extends TrackItemBase {
  resource: ResourceBase;
}

@Postable
export default class VideoTrackItem extends TrackItem implements VideoTrackItemBase {

  @postable resource: VideoResource;

  constructor(resource: VideoResource) {
    super(TrackItemType.VIDEO);
    this.resource = resource;

    this.videoDrawing = new VideoDrawing(
        resource,
        new Vector2Property(new Vector2(0, 0)),
        new Vector2Property(new Vector2(1, 1)));

    // const rectangle = new Rectangle();
    // rectangle.size.defaultValue = new Vector4(-100, 100, 100, -100);
    // this.drawing.addDrawing(rectangle);

    let path: Vector2[] = [];
    path.push(new Vector2(0, 0));
    path.push(new Vector2(100, 0));
    path.push(new Vector2(100, 100));
    path.push(new Vector2(0, 100));
    const mask = new MaskDrawing(path);
    this.videoDrawing.addMask(mask);
  }

  clone(): VideoTrackItem {
    let trackItem = new VideoTrackItem(this.resource);
    this.__setTime(this.time, this.baseTime);
    return trackItem;
  }

  __setTime(time: TimePair, baseTime: number) {
    console.log(this, this.resource)
    let t = new TimePair(time.start, time.end);
    if (baseTime < 0) {
      t.start -= baseTime;
      baseTime = 0;
    }
    let dur = t.end - t.start;
    if (dur > this.resource.duration)
      t.end -= dur - this.resource.duration;
    this.time = t;
    this.baseTime = baseTime;
  }

}