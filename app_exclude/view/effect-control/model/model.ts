import { IDisposable } from "base/common/lifecycle";
import { EffectControlWidgetTrackItemViewModel } from "window/view/effect-control/model/track-item/track-item-view-model";
import { TimelineScrollViewModel } from "window/view/common/timeline-scroll-view-model";
import { declareViewModel, ViewModel } from "window/view/view-model";
import { EffectControlWidgetKeyframeEvent } from "window/view/effect-control/event";
import { Event } from "base/common/event";
import { StandardMouseEvent } from "base/browser/mouseEvent";
import { Timeline } from "internal/timeline/timeline";

export const EffectControlWidgetModel = declareViewModel<EffectControlWidgetModel>('EffectControlWidgetModel');

export interface EffectControlWidgetModel extends ViewModel {

  readonly timeline: Timeline;

  readonly onKeyframeFocused: Event<EffectControlWidgetKeyframeEvent>;
  readonly onKeyframeBlured: Event<EffectControlWidgetKeyframeEvent>;

  readonly trackItemViewModel: EffectControlWidgetTrackItemViewModel<any>;
  readonly timelineScrollViewModel: TimelineScrollViewModel;

  blurAllKeyframes(): void;

  /*@observable*/ getTimeRelativeToTimeline(px: number): number;
  /*@observable*/ getTimeAmountRelativeToTimeline(px: number): number;
  /*@observable*/ getPositionRelativeToTimeline(time: number): number;
  /*@observable*/ getPixelAmountRelativeToTimeline(time: number): number;
  /*@observable*/ getMousePostionRelativeToTimeline(e: MouseEvent | React.MouseEvent | StandardMouseEvent): {x: number, y: number};

}