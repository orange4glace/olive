import { IDisposable } from "base/common/lifecycle";
import { EffectControlWidgetTrackItemViewModel } from "window/view/effect-control/model/track-item/track-item-view-model";
import { TimelineScrollViewModel } from "window/view/common/timeline-scroll-view-model";
import { declareViewModel, ViewModel } from "window/view/view-model";
import { EffectControlWidgetKeyframeEvent } from "window/view/effect-control/event";
import { Event } from "base/common/event";

export const EffectControlWidgetModel = declareViewModel<EffectControlWidgetModel>('EffectControlWidgetModel');

export interface EffectControlWidgetModel extends ViewModel {

  readonly onKeyframeFocused: Event<EffectControlWidgetKeyframeEvent>;
  readonly onKeyframeBlured: Event<EffectControlWidgetKeyframeEvent>;

  readonly trackItemViewModel: EffectControlWidgetTrackItemViewModel<any>;
  readonly timelineScrollViewModel: TimelineScrollViewModel;

}