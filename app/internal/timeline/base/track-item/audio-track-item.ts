import { Postable, postable } from 'worker-postable'

import { clone } from 'base/olive/cloneable';
import { ResourceIdentifier } from 'internal/resource/common/resouce';
import { SerializedTrackItem, TrackItem } from 'internal/timeline/base/track-item/track-item-impl';
import { AudioResource } from 'internal/resource/base/audio-resource';
import { WithAudioTrackItemBase } from 'internal/timeline/common/track-item/audio-track-item';
import { TrackItemTime } from 'internal/timeline/base/track-item/track-item-time';

export interface SerializedAudioTrackItem extends SerializedTrackItem {
  resourceID: ResourceIdentifier;
}

@Postable
export class AudioTrackItem extends WithAudioTrackItemBase(TrackItem) {

  @postable protected resource_: AudioResource;
  public get resource() { return this.resource_; }
  // @postable drawing: AudioDrawing;

  constructor(resource: AudioResource) {
    super(AudioTrackItem.TYPE);
    this.resource_ = resource;
  }

  __setTime(time: TrackItemTime) {
    time = clone(time);
    if (time.base < 0) {
      time.start -= time.base;
      time.base = 0;
    }
    this.time_ = time;
    this.onTimeChanged_.fire();
  }

  clone(obj: AudioTrackItem): Object {
    super.clone(obj);
    obj.resource_ = this.resource;
    // obj.drawing = clone(this.drawing);
    return obj;
  }

  serialize(): SerializedAudioTrackItem {
    return {
      ...super.serialize(),
      resourceID: this.resource.id
    }
  }

}