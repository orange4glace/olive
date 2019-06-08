import { Postable, postable } from 'worker-postable';
import { TrackItemTime, SerializedTrackItemTime } from 'internal/timeline/track-item/track-item-time';
import { TrackItem, TrackItemFactoryRegistry } from 'internal/timeline/track-item/track-item';
import { computed } from 'mobx';
import { clone } from 'base/olive/cloneable';
import { Emitter, Event } from 'base/common/event';
import { IInstantiationService } from 'platform/instantiation/common/instantiation';
import { Registry } from 'platform/registry/common/platform';

let __next_id = 0;

export interface SerializedTrackItem {
  type: string;
  time: SerializedTrackItemTime;
}

@Postable
export abstract class TrackItemImpl implements TrackItem {

  readonly onTimeChanged_: Emitter<void> = new Emitter();
  readonly onTimeChanged: Event<void> = this.onTimeChanged_.event;

  id: number;
  @postable type: string;
  @postable time: TrackItemTime;

  @computed get duration(): number {
    if (!this.time) return 0;
    return this.time.end - this.time.start;
  }

  constructor(type: string) {
    this.id = __next_id++;
    this.type = type;
  }

  getTimeoffset(time: number) {
    return time - this.time.start + this.time.base;
  }
  
  isInTime(time: number): boolean {
    return this.time.start <= time && time < this.time.end;
  }

  abstract __setTime(time: TrackItemTime): void;

  clone(obj: TrackItemImpl): Object {
    obj.id = __next_id++;
    obj.type = this.type;
    obj.time = clone(this.time);
    return obj;
  }

  serialize(): SerializedTrackItem {
    return {
      type: this.type,
      time: this.time.serialize()
    }
  }

  static deserialize(instantiationService: IInstantiationService, serial: SerializedTrackItem): TrackItemImpl | null {
    const factory = Registry.as<TrackItemFactoryRegistry>(TrackItemFactoryRegistry.ID).getFactory(serial.type);
    if (!factory) {
      console.warn('TrackItem Factory not found. ' + serial);
      return null;
    }
    return factory.deserialize(instantiationService, serial);
  }

}