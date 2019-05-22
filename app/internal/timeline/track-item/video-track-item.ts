import { Postable, postable } from 'worker-postable'

import TrackItemImpl from 'internal/timeline/track-item/track-item-impl';
import { TrackItemBase, TrackItem } from 'internal/timeline/track-item/track-item';
import { TrackItemTime } from 'internal/timeline/track-item/track-item-time';
import { TrackItemType } from 'internal/timeline/track-item/track-item-type';
import { VideoDrawingBase, VideoDrawing } from 'internal/rendering/drawing/video-drawing';
import { clone } from 'base/common/cloneable';

export interface VideoTrackItemBase extends TrackItemBase {
  drawing: VideoDrawingBase;
}

export interface VideoTrackItem extends TrackItem {
  readonly drawing: VideoDrawing;
}

@Postable
export abstract class VideoTrackItemImpl extends TrackItemImpl implements VideoTrackItemBase {

  @postable drawing: VideoDrawing;

  constructor(type: TrackItemType) {
    super(type);
  }

  __setTime(time: TrackItemTime) {
    time = clone(time);
    if (time.base < 0) {
      time.start -= time.base;
      time.base = 0;
    }
    this.time = time;
    this.onTimeChanged_.fire();
  }

  clone(obj: VideoTrackItemImpl): Object {
    super.clone(obj);
    obj.drawing = clone(this.drawing);
    return obj;
  }

}