import * as React from 'react'
import { EffectControlTrackItemView, EffectControlTrackItemViewSelectorRegistry } from "window/workbench/common/widgets/effect-control/view/track-item/track-item-view";
import { Registry } from "platform/registry/common/platform";
import { VideoMediaTrackItem } from "internal/timeline/base/track-item/video-media-track-item";
import { ITimeline } from "internal/timeline/base/timeline";
import { EffectControlDrawingView, EffectControlDrawingViewSelectorRegistry } from "window/workbench/common/widgets/effect-control/view/drawing/drawing-view";
import { TimelineScrollView } from "window/workbench/common/widgets/timeline/model/scroll-view-model";
import { EffectControlViewOutgoingEvents } from "window/workbench/common/widgets/effect-control/view-outgoing-events";

class VideoMediaTrackItemView extends EffectControlTrackItemView {

  private readonly drawingView_: EffectControlDrawingView<any>;

  constructor(
    timeline: ITimeline,
    trackItem: VideoMediaTrackItem,
    timelineScrollView: TimelineScrollView,
    viewOutgoingEvents: EffectControlViewOutgoingEvents) {
    super(timeline, trackItem, timelineScrollView, viewOutgoingEvents);

    const DrawingViewCtor = Registry.as<EffectControlDrawingViewSelectorRegistry>
        (EffectControlDrawingViewSelectorRegistry.ID)
        .getView(trackItem.drawing.type);
    if (DrawingViewCtor) {
      this.drawingView_ = new DrawingViewCtor(timeline, trackItem, trackItem.drawing, timelineScrollView, viewOutgoingEvents);
    }
  }

  renderFormContent() {
    if (this.drawingView_) return this.drawingView_.renderForm();
    return <div>No drawing view found!</div>
  }

  renderTimelineContent() {
    if (this.drawingView_) return this.drawingView_.renderTimeline();
    return <div>No drawing view found!</div>
  }

}

Registry.as<EffectControlTrackItemViewSelectorRegistry>(EffectControlTrackItemViewSelectorRegistry.ID)
  .registerView(VideoMediaTrackItem.TYPE, VideoMediaTrackItemView);