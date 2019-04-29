import { EffectControlWidgetEffectViewModel, EffectControlWidgetVideoEffectViewModel } from "window/view/effect-control/model/effect/effect-view-model";
import { Effect } from "internal/rendering/effect/effect";
import { VideoEffect } from "internal/rendering/effect/video-effect/video-effect";
import { Timeline } from "internal/timeline/timeline";
import { TrackItem } from "internal/timeline/track-item";
import { ViewModelImpl } from "window/view/view-model";

export abstract class EffectControlWidgetEffectViewModelImpl<T extends Effect>
    extends ViewModelImpl
    implements EffectControlWidgetEffectViewModel<T> {

  protected readonly timeline_: Timeline;
  protected readonly trackItem_: TrackItem;
  protected readonly effect_: T;

  constructor(timeline: Timeline, trackItem: TrackItem, effect: T) {
    super();
    this.timeline_ = timeline;
    this.trackItem_ = trackItem;
    this.effect_ = effect;
  }

  dispose(): void {}

}

export abstract class EffectControlWidgetVideoEffectViewModelImpl<T extends VideoEffect>
    extends EffectControlWidgetEffectViewModelImpl<T>
    implements EffectControlWidgetVideoEffectViewModel<T> {

  constructor(timeline: Timeline, trackItem: TrackItem, effect: T) {
    super(timeline, trackItem, effect);
  }

}