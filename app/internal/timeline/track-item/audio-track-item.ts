import { Postable, postable } from 'worker-postable'

import TrackItemImpl from 'internal/timeline/track-item-impl';
import { TrackItemBase, TrackItem } from 'internal/timeline/track-item';
import { TrackItemTime } from 'internal/timeline/track-item-time';
import { TrackItemType } from 'internal/timeline/track-item-type';
import { VideoDrawing } from 'internal/rendering/drawing/video-drawing';
import { clone } from 'base/common/cloneable';
import { AudioDrawingBase, AudioDrawing } from 'internal/rendering/drawing/audio-drawing';

export interface AudioTrackItemBase extends TrackItemBase {
  drawing: AudioDrawingBase;
}

export interface AudioTrackItem extends TrackItem {
  readonly drawing: AudioDrawing;
}

@Postable
export abstract class AudioTrackItemImpl extends TrackItemImpl implements AudioTrackItem, AudioTrackItemBase {

  @postable drawing: AudioDrawing;

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

  clone(obj: AudioTrackItemImpl): Object {
    super.clone(obj);
    obj.drawing = clone(this.drawing);
    return obj;
  }

}