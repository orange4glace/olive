import { EffectControlWidgetModel } from "window/view/effect-control/model/model";
import { Timeline } from "internal/timeline/timeline";
import { TrackItem } from "internal/timeline/track-item";
import { Disposable } from "base/common/lifecycle";
import { EffectControlWidgetTrackItemViewModelImpl } from "window/view/effect-control/model/track-item/track-item-view-model";
import { TrackItemType } from "internal/timeline/track-item-type";
import { EffectControlWidgetVideoTrackItemViewModelImpl } from "window/view/effect-control/model/track-item/video-track-item-model";
import { VideoTrackItem } from "internal/timeline/video-track-item";
import { ViewModel } from "window/view/view-model";

@ViewModel('EffectControlWidgetModel')
export class EffectControlWidgetModelImpl extends Disposable implements EffectControlWidgetModel {

  protected readonly timeline_: Timeline;
  protected readonly trackItem_: TrackItem;

  readonly trackItemViewModel: EffectControlWidgetTrackItemViewModelImpl<any>;

  constructor(timeline: Timeline, trackItem: TrackItem) {
    super();
    this.timeline_ = timeline;
    this.trackItem_ = trackItem;

    switch (trackItem.type) {
      case TrackItemType.VIDEO:
        this.trackItemViewModel = new EffectControlWidgetVideoTrackItemViewModelImpl(timeline, trackItem as VideoTrackItem);
        break;
    }
  }

}