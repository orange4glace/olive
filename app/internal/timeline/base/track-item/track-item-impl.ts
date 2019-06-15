import { Postable, postable } from 'worker-postable';
import { computed } from 'mobx';
import { clone } from 'base/olive/cloneable';
import { Emitter, Event } from 'base/common/event';
import { IInstantiationService } from 'platform/instantiation/common/instantiation';
import { Registry } from 'platform/registry/common/platform';
import { MixinBase } from 'base/olive/mixin';
import { SerializedTrackItemTime, TrackItemTime } from 'internal/timeline/base/track-item/track-item-time';
import { WithTrackItemBase } from 'internal/timeline/common/track-item/track-item';
import { ITrackItem } from 'internal/timeline/base/track-item/track-item';
import { FactoryRegistry, IFactory } from 'internal/common/factory-registry';

export interface SerializedTrackItem {
  type: string;
  time: SerializedTrackItemTime;
}

@Postable
export class TrackItem extends WithTrackItemBase(MixinBase) {

  readonly onTimeChanged_: Emitter<void> = new Emitter();
  readonly onTimeChanged: Event<void> = this.onTimeChanged_.event;

  protected time_: TrackItemTime;
  public get time() { return this.time_; }

  @computed get duration(): number {
    if (!this.time) return 0;
    return this.time.end - this.time.start;
  }

  constructor(type: string) {
    super();
    this.type_ = type;
  }

  __setTime(time: TrackItemTime): void { throw new Error('NotImplementedException'); }

  clone(obj: TrackItem): Object {
    obj.type_ = this.type;
    obj.time_ = clone(this.time);
    return obj;
  }

  serialize(): SerializedTrackItem {
    return {
      type: this.type,
      time: this.time.serialize()
    }
  }

  static deserialize(instantiationService: IInstantiationService, serial: SerializedTrackItem): TrackItem | null {
    const factory = Registry.as<TrackItemFactoryRegistry>(TrackItemFactoryRegistry.ID).getFactory(serial.type);
    if (!factory) {
      console.warn('TrackItem Factory not found. ' + serial);
      return null;
    }
    return factory.deserialize(instantiationService, serial);
  }

}

export interface ITrackItemFactory<T extends ITrackItem> extends IFactory<T, SerializedTrackItem> {}
export class TrackItemFactoryRegistry extends FactoryRegistry<ITrackItemFactory<any>> {
  static readonly ID = 'olive.timeline.TrackItemFactoryRegistry';
}
Registry.add(TrackItemFactoryRegistry.ID, new TrackItemFactoryRegistry());