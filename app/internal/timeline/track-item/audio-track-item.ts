import { Postable, postable } from 'worker-postable'

import { TrackItemImpl, SerializedTrackItem } from 'internal/timeline/track-item/track-item-impl';
import { TrackItemBase, ITrackItem } from 'internal/timeline/track-item/track-item';
import { TrackItemTime } from 'internal/timeline/track-item/track-item-time';
import { clone } from 'base/olive/cloneable';
import { AudioDrawingBase, AudioDrawing } from 'internal/rendering/drawing/audio-drawing';
import { AudioResourceBase, IAudioResource } from 'internal/resource/audio-resource';
import { ResourceIdentifier } from 'internal/resource/resource';

export interface SerializedAudioTrackItem extends SerializedTrackItem {
  resourceID: ResourceIdentifier;
}

export interface AudioTrackItemBase extends TrackItemBase {
  readonly resource: AudioResourceBase;
  readonly drawing: AudioDrawingBase;
}

export interface AudioTrackItem extends AudioTrackItemBase, ITrackItem {
  readonly resource: IAudioResource;
  readonly drawing: AudioDrawing;
}

export interface IAudioTrackItem extends AudioTrackItem {}

@Postable
export class AudioTrackItemImpl extends TrackItemImpl implements AudioTrackItem, AudioTrackItemBase {

  static readonly TYPE = 'olive.timeline.AudioTrackItem'

  @postable resource: IAudioResource;
  @postable drawing: AudioDrawing;

  constructor(resource: IAudioResource) {
    super(AudioTrackItemImpl.TYPE);
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

  serialize(): SerializedAudioTrackItem {
    return {
      ...super.serialize(),
      resourceID: this.resource.id
    }
  }

}