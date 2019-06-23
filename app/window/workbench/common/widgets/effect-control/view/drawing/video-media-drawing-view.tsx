import * as React from 'react'
import { EffectControlDrawingView, EffectControlDrawingViewSelectorRegistry } from "window/workbench/common/widgets/effect-control/view/drawing/drawing-view";
import { VideoMediaDrawing } from "internal/rendering/drawing/base/video-media-drawing";
import { ITimeline } from "internal/timeline/base/timeline";
import { ITrackItem } from "internal/timeline/base/track-item/track-item";
import { TimelineScrollView } from "window/workbench/common/widgets/timeline/model/scroll-view-model";
import { EffectControlViewOutgoingEvents } from "window/workbench/common/widgets/effect-control/view-outgoing-events";
import { EffectControlTransformEffectView } from "window/workbench/common/widgets/effect-control/view/effect/transform-effect-view";
import { Registry } from 'platform/registry/common/platform';

export class EffectControlVideoMediaDrawingView extends EffectControlDrawingView<VideoMediaDrawing> {

  private readonly transformEffectView_: EffectControlTransformEffectView;
  public get transformEffectView() { return this.transformEffectView_; }

  constructor(
    protected readonly timeline: ITimeline,
    protected readonly trackItem: ITrackItem,
    protected readonly drawing: VideoMediaDrawing,
    public readonly timelineScrollView: TimelineScrollView,
    public readonly viewOutgoingEvents: EffectControlViewOutgoingEvents
  ) {
    super('Video Media', timeline, trackItem, drawing, timelineScrollView, viewOutgoingEvents);
    this.transformEffectView_ = this._register(new EffectControlTransformEffectView(
      timeline, trackItem, drawing.transformEffect, timelineScrollView, viewOutgoingEvents));
  }

  renderFormContent() {
    return (
      <>
        {this.transformEffectView.renderForm()}
      </>
    )
  }

  renderTimelineContent() {
    return (
      <>
        {this.transformEffectView.renderTimeline()}
      </>
    )
  }

}

Registry.as<EffectControlDrawingViewSelectorRegistry>(EffectControlDrawingViewSelectorRegistry.ID)
    .registerView(VideoMediaDrawing.TYPE, EffectControlVideoMediaDrawingView);