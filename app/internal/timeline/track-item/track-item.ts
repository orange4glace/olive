import { ConstTrackItemTime } from "internal/timeline/track-item/track-item-time";
import { Cloneable } from "base/olive/cloneable";
import { Event } from "base/common/event";
import { SerializedTrackItem } from "internal/timeline/track-item/track-item-impl";
import { IFactory, FactoryRegistry } from "internal/common/factory-registry";
import { Registry } from "platform/registry/common/platform";

export interface TrackItemBase {
  type: string;
  time: ConstTrackItemTime;
}

export interface TrackItem extends TrackItemBase, Cloneable {

  readonly onTimeChanged: Event<void>;

  /*@observable*/ readonly duration: number;

  getTimeoffset(time: number): number;
  isInTime(time: number): boolean;

  serialize(): object;

}

export interface ITrackItem extends TrackItem {}

export interface ITrackItemFactory<T extends ITrackItem> extends IFactory<T, SerializedTrackItem> {}
export class TrackItemFactoryRegistry extends FactoryRegistry<ITrackItemFactory<any>> {
  static readonly ID = 'olive.timeline.TrackItemFactoryRegistry';
}
Registry.add(TrackItemFactoryRegistry.ID, new TrackItemFactoryRegistry());