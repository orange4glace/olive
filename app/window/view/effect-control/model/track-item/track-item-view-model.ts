import { TrackItem } from "internal/timeline/track-item";
import { ViewModel, ViewModelImpl, declareViewModel } from "window/view/view-model";
import { Timeline } from "internal/timeline/timeline";
import { EffectControlWidgetKeyframeEvent } from "window/view/effect-control/event";
import { Event, Emitter } from "base/common/event";

export const EffectControlWidgetTrackItemViewModel = declareViewModel('EffectControlWidgetTrackItemViewModel');

export interface EffectControlWidgetTrackItemViewModel<T extends TrackItem> extends ViewModel {

  readonly onKeyframeFocused: Event<EffectControlWidgetKeyframeEvent>;
  readonly onKeyframeBlured: Event<EffectControlWidgetKeyframeEvent>;

}

@EffectControlWidgetTrackItemViewModel
export abstract class EffectControlWidgetTrackItemViewModelImpl<T extends TrackItem>
    extends ViewModelImpl
    implements EffectControlWidgetTrackItemViewModel<T> {

  protected onKeyframeFocused_: Emitter<EffectControlWidgetKeyframeEvent> = new Emitter();
  readonly onKeyframeFocused: Event<EffectControlWidgetKeyframeEvent> = this.onKeyframeFocused_.event;
  protected onKeyframeBlured_: Emitter<EffectControlWidgetKeyframeEvent> = new Emitter();
  readonly onKeyframeBlured: Event<EffectControlWidgetKeyframeEvent> = this.onKeyframeBlured_.event;

  protected readonly timeline_: Timeline;
  protected readonly trackItem_: TrackItem;

  constructor(timeline: Timeline, trackItem: TrackItem) {
    super();
    this.timeline_ = timeline;
    this.trackItem_ = trackItem;
  }

  dispose(): void {}

}