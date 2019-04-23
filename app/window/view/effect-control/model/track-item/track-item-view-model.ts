import { TrackItem } from "internal/timeline/track-item";
import { ViewModel, ViewModelImpl } from "window/view/view-model";
import { Timeline } from "internal/timeline/timeline";

export interface EffectControlWidgetTrackItemViewModel<T extends TrackItem> extends ViewModel {

}

export abstract class EffectControlWidgetTrackItemViewModelImpl<T extends TrackItem>
    extends ViewModelImpl
    implements EffectControlWidgetTrackItemViewModel<T> {

  protected readonly timeline_: Timeline;
  protected readonly trackItem_: TrackItem;

  constructor(timeline: Timeline, trackItem: TrackItem) {
    super();
    this.timeline_ = timeline;
    this.trackItem_ = trackItem;
  }

  dispose(): void {}

}