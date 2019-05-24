import { Postable, postable } from 'worker-postable'

import { TrackItemImpl } from 'internal/timeline/track-item/track-item-impl';
import { TrackItemBase, TrackItem } from 'internal/timeline/track-item/track-item';
import { TrackItemTime } from 'internal/timeline/track-item/track-item-time';
import { TrackItemType } from 'internal/timeline/track-item/track-item-type';
import { clone } from 'base/common/cloneable';
import { AudioDrawingBase, AudioDrawing } from 'internal/rendering/drawing/audio-drawing';
import { AudioResourceBase, AudioResource } from 'internal/resource/audio-resource';

export interface AudioTrackItemBase extends TrackItemBase {
  readonly resource: AudioResourceBase;
  readonly drawing: AudioDrawingBase;
}

export interface AudioTrackItem extends TrackItem {
  readonly resource: AudioResource;
  readonly drawing: AudioDrawing;
}

@Postable
export class AudioTrackItemImpl extends TrackItemImpl implements AudioTrackItem, AudioTrackItemBase {

  @postable resource: AudioResource;
  @postable drawing: AudioDrawing;

  constructor(resource: AudioResource) {
    super(TrackItemType.AUDIO);
    this.resource = resource;
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