import { EffectControlWidgetModel } from "window/view/effect-control/model/model";
import { Timeline } from "internal/timeline/timeline";
import { TrackItem } from "internal/timeline/track-item";
import { Disposable } from "base/common/lifecycle";
import { EffectControlWidgetTrackItemViewModelImpl } from "window/view/effect-control/model/track-item/track-item-view-model";
import { TrackItemType } from "internal/timeline/track-item-type";
import { EffectControlWidgetVideoTrackItemViewModelImpl } from "window/view/effect-control/model/track-item/video-track-item-model";
import { VideoTrackItem } from "internal/timeline/video-track-item";
import { TimelineScrollViewModel, TimelineScrollViewModelImpl } from "window/view/common/timeline-scroll-view-model";
import { ViewModelImpl } from "window/view/view-model";
import { EffectControlWidgetKeyframeEvent } from "window/view/effect-control/event";
import { Emitter, Event } from "base/common/event";

@EffectControlWidgetModel
export class EffectControlWidgetModelImpl extends ViewModelImpl implements EffectControlWidgetModel {

  private onKeyframeFocused_: Emitter<EffectControlWidgetKeyframeEvent> = new Emitter();
  readonly onKeyframeFocused: Event<EffectControlWidgetKeyframeEvent> = this.onKeyframeFocused_.event;
  private onKeyframeBlured_: Emitter<EffectControlWidgetKeyframeEvent> = new Emitter();
  readonly onKeyframeBlured: Event<EffectControlWidgetKeyframeEvent> = this.onKeyframeBlured_.event;

  protected readonly timeline_: Timeline;
  protected readonly trackItem_: TrackItem;

  readonly trackItemViewModel: EffectControlWidgetTrackItemViewModelImpl<any>;
  readonly timelineScrollViewModel: TimelineScrollViewModel;

  constructor(timeline: Timeline, trackItem: TrackItem) {
    super();
    this.timeline_ = timeline;
    this.trackItem_ = trackItem;

    switch (trackItem.type) {
      case TrackItemType.VIDEO_MEDIA:
        this.trackItemViewModel = new EffectControlWidgetVideoTrackItemViewModelImpl(timeline, trackItem as VideoTrackItem);
        break;
    }

    this._register(this.trackItemViewModel.onKeyframeFocused(e => this.onKeyframeFocused_.fire(e), this));
    this._register(this.trackItemViewModel.onKeyframeBlured(e => this.onKeyframeBlured_.fire(e), this));

    this.timelineScrollViewModel = new TimelineScrollViewModelImpl(trackItem.time.start, trackItem.time.end);
    this._register(this.timelineScrollViewModel);
    this._register(trackItem.onTimeChanged(() => {
      this.timelineScrollViewModel.setTotalTime(trackItem.time.start, trackItem.time.end)
    }, this))
  }

}