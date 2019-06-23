import { Postable, postable } from 'worker-postable'

import { clone } from 'base/olive/cloneable';
import { SerializedVideoDrawing, VideoDrawing } from 'internal/rendering/drawing/base/video-drawing';
import { SerializedTrackItem, TrackItem } from 'internal/timeline/base/track-item/track-item-impl';
import { WithVideoTrackItemBase } from 'internal/timeline/common/track-item/video-track-item';
import { TrackItemTime } from 'internal/timeline/base/track-item/track-item-time';
import { Timebase } from 'internal/timeline/base/timebase';

export interface SerializedVideoTrackItem extends SerializedTrackItem {
  drawing: SerializedVideoDrawing;
}

@Postable
export class VideoTrackItem extends WithVideoTrackItemBase(TrackItem) {

  protected drawing_: VideoDrawing;
  public get drawing() { return this.drawing_; }

  constructor(type: string, timebase: Timebase) {
    super(type, timebase);
  }

  clone(obj: VideoTrackItem): Object {
    super.clone(obj);
    obj.drawing_ = clone(this.drawing);
    return obj;
  }

  serialize(): SerializedVideoTrackItem {
    return {
      ...super.serialize(),
      drawing: this.drawing.serilaize()
    };
  }

}