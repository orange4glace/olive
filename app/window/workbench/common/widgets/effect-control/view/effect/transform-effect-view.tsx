import * as React from 'react'
import { EffectControlEffectView } from "window/workbench/common/widgets/effect-control/view/effect/effect-view";
import { TransformEffect } from "internal/rendering/effect/base/video-effect/transform-effect";
import { ITimeline } from "internal/timeline/base/timeline";
import { ITrackItem } from "internal/timeline/base/track-item/track-item";
import { EffectControlVector2PropertyView } from "window/workbench/common/widgets/effect-control/view/property/vector2-property-view";
import { TimelineScrollView } from "window/workbench/common/widgets/timeline/model/scroll-view-model";
import { EffectControlViewOutgoingEvents } from "window/workbench/common/widgets/effect-control/view-outgoing-events";

export class EffectControlTransformEffectView extends EffectControlEffectView<TransformEffect> {

  private readonly positionPropertyView_: EffectControlVector2PropertyView;
  public get positionPropertyView() { return this.positionPropertyView_; }
  private readonly scalePropertyView_: EffectControlVector2PropertyView;
  public get scalePropertyView() { return this.scalePropertyView_; }

  constructor(
    timeline: ITimeline,
    trackItem: ITrackItem,
    effect: TransformEffect,
    timelineScrollView: TimelineScrollView,
    viewOutgoingEvents: EffectControlViewOutgoingEvents) {
    super('Transform', timeline, trackItem, effect, timelineScrollView, viewOutgoingEvents);
    this.positionPropertyView_ =
        new EffectControlVector2PropertyView('Position', timeline, trackItem, effect.position, timelineScrollView, viewOutgoingEvents);
    this.scalePropertyView_ =
        new EffectControlVector2PropertyView('Scale', timeline, trackItem, effect.scale, timelineScrollView, viewOutgoingEvents);
  }

  renderFormContent() {
    return (
      <>
        {this.positionPropertyView.renderForm()}
        {this.scalePropertyView.renderForm()}
      </>
    )
  }

  renderTimelineContent() {
    return (
      <>
        {this.positionPropertyView.renderTimeline()}
        {this.scalePropertyView.renderTimeline()}
      </>
    )
  }

}