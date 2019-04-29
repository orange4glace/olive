import { IDisposable } from "base/common/lifecycle";
import { EffectControlWidgetTrackItemViewModel } from "window/view/effect-control/model/track-item/track-item-view-model";
import { TimelineScrollViewModel } from "window/view/common/timeline-scroll-view-model";
import { declareViewModel } from "window/view/view-model";

export const EffectControlWidgetModel = declareViewModel<EffectControlWidgetModel>('EffectControlWidgetModel');

export interface EffectControlWidgetModel extends IDisposable {

  readonly trackItemViewModel: EffectControlWidgetTrackItemViewModel<any>;
  readonly timelineScrollViewModel: TimelineScrollViewModel;

}