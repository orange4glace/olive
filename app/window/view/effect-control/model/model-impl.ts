import { EffectControlWidgetModel } from "window/view/effect-control/model/model";
import { Timeline } from "internal/timeline/timeline";
import { TrackItem } from "internal/timeline/track-item/track-item";
import { EffectControlWidgetTrackItemViewModelImpl } from "window/view/effect-control/model/track-item/track-item-view-model";
import { TrackItemType } from "internal/timeline/track-item/track-item-type";
import { EffectControlWidgetVideoTrackItemViewModelImpl } from "window/view/effect-control/model/track-item/video-track-item-model";
import { VideoTrackItem } from "internal/timeline/track-item/video-track-item";
import { TimelineScrollViewModel, TimelineScrollViewModelImpl } from "window/view/common/timeline-scroll-view-model";
import { ViewModelImpl } from "window/view/view-model";
import { EffectControlWidgetKeyframeEvent } from "window/view/effect-control/event";
import { Emitter, Event } from "base/common/event";
import { MouseUtil } from "orangeutil";
import { StandardMouseEvent } from "base/view/mouseEvent";

@EffectControlWidgetModel
export class EffectControlWidgetModelImpl extends ViewModelImpl implements EffectControlWidgetModel {

  private onKeyframeFocused_: Emitter<EffectControlWidgetKeyframeEvent> = new Emitter();
  readonly onKeyframeFocused: Event<EffectControlWidgetKeyframeEvent> = this.onKeyframeFocused_.event;
  private onKeyframeBlured_: Emitter<EffectControlWidgetKeyframeEvent> = new Emitter();
  readonly onKeyframeBlured: Event<EffectControlWidgetKeyframeEvent> = this.onKeyframeBlured_.event;

  readonly timeline_: Timeline;
  protected readonly trackItem_: TrackItem;

  readonly trackItemViewModel: EffectControlWidgetTrackItemViewModelImpl<any>;
  readonly timelineScrollViewModel: TimelineScrollViewModel;

  constructor(readonly timeline: Timeline, trackItem: TrackItem) {
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

  blurAllKeyframes() {
    this.trackItemViewModel.blurAllKeyframes();
  }




  getTimeRelativeToTimeline(px: number): number {
    return Math.round(this.timelineScrollViewModel.startTime + px / this.timelineScrollViewModel.pxPerFrame);
  }

  getTimeAmountRelativeToTimeline(px: number): number {
    return px / this.timelineScrollViewModel.pxPerFrame;
  }

  getPositionRelativeToTimeline(time: number): number {
    // Touch |endTime| variable so observer can detect the change
    this.timelineScrollViewModel.endTime;
    return Math.floor((time - this.timelineScrollViewModel.startTime) * this.timelineScrollViewModel.pxPerFrame);
  }

  getPixelAmountRelativeToTimeline(time: number): number {
    return time * this.timelineScrollViewModel.pxPerFrame;
  }

  getMousePostionRelativeToTimeline(e: MouseEvent | React.MouseEvent | StandardMouseEvent): {x: number, y: number} {
    if ((e as any).posx) return this.getMousePostionRelativeToTimeline_(e as any);
    return MouseUtil.mousePositionElement(e, this.timelineScrollViewModel.element);
  }

  private getMousePostionRelativeToTimeline_(e: {
    posx: number,
    posy: number
  }){
    function findPos(obj: any) {
      var curleft = 0; var curtop = 0;
      if (obj.offsetParent) {
        do {
          curleft += obj.offsetLeft;
          curtop += obj.offsetTop;
        } while (obj = obj.offsetParent);
      }
      return {
        left : curleft,
        top : curtop
      };
    }

		let elPos = findPos(this.timelineScrollViewModel.element);
		return {
			x: e.posx - elPos.left,
			y: e.posy - elPos.top
		};
  }

}