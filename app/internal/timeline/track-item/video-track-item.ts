import { Postable, postable } from 'worker-postable'

import { TrackItemImpl, SerializedTrackItem } from 'internal/timeline/track-item/track-item-impl';
import { TrackItemBase, TrackItem } from 'internal/timeline/track-item/track-item';
import { TrackItemTime } from 'internal/timeline/track-item/track-item-time';
import { VideoDrawingBase, VideoDrawing, SerializedVideoDrawing } from 'internal/rendering/drawing/video-drawing';
import { clone } from 'base/olive/cloneable';

export interface SerializedVideoTrackItem extends SerializedTrackItem {
  drawing: SerializedVideoDrawing;
}

export interface VideoTrackItemBase extends TrackItemBase {
  drawing: VideoDrawingBase;
}

export interface VideoTrackItem extends TrackItem {
  readonly drawing: VideoDrawing;
}

@Postable
export abstract class VideoTrackItemImpl extends TrackItemImpl implements VideoTrackItemBase {

  @postable drawing: VideoDrawing;

  constructor(type: string) {
    super(type);
  }

  abstract __setTime(time: TrackItemTime): void;

  clone(obj: VideoTrackItemImpl): Object {
    super.clone(obj);
    obj.drawing = clone(this.drawing);
    return obj;
  }

  serialize(): SerializedVideoTrackItem {
    return {
      ...super.serialize(),
      drawing: this.drawing.serilaize()
    };
  }

}