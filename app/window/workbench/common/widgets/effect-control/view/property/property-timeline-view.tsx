import * as React from 'react'
import { Disposable } from "base/common/lifecycle";
import { EffectControlKeyframeView } from "window/workbench/common/widgets/effect-control/view/property/keyframe-view";
import { observable } from "mobx";
import { Keyframe } from "internal/rendering/property/base/keyframe";
import { ITimeline } from "internal/timeline/base/timeline";
import { ITrack } from "internal/timeline/base/track/track";
import { ITrackItem } from "internal/timeline/base/track-item/track-item";
import { Property } from "internal/rendering/property/base/property";
import { TimelineScrollView } from "window/workbench/common/widgets/timeline/model/scroll-view-model";
import { EffectControlViewOutgoingEvents } from "window/workbench/common/widgets/effect-control/view-outgoing-events";
import { IKeyframeValue } from "internal/rendering/property/base/keyframe-value";
import { observer } from 'mobx-react';

export class EffectControlPropertyTimelineView<T extends IKeyframeValue> extends Disposable {

  @observable private readonly keyframeViews_: Set<EffectControlKeyframeView<T>>;
  public get keyframeViews() { return this.keyframeViews_; }
  private readonly keyframeViewMap_: Map<Keyframe<T>, EffectControlKeyframeView<T>>;

  constructor(
    readonly timeline: ITimeline,
    readonly trackItem: ITrackItem,
    readonly property: Property<T>,
    readonly timelineScrollView: TimelineScrollView,
    readonly viewOutgoingEvents: EffectControlViewOutgoingEvents) {
    super();

    this.keyframeViews_ = new Set();
    this.keyframeViewMap_ = new Map();

    property.keyframes.forEach(kf => this.keyframeAddedHandler(kf));
    this._register(property.onKeyframeAdded(this.keyframeAddedHandler, this));
    this._register(property.onKeyframeWillRemove(this.keyframeWillRemoveHandler, this));
  }

  private keyframeAddedHandler(keyframe: Keyframe<T>) {
    const keyframeView =
        new EffectControlKeyframeView(this.timeline, this.trackItem, this.property, keyframe, this.timelineScrollView, this.viewOutgoingEvents);
    this.keyframeViews_.add(keyframeView);
    this.keyframeViewMap_.set(keyframe, keyframeView);
  }

  private keyframeWillRemoveHandler(keyframe: Keyframe<T>) {
    const keyframeView = this.keyframeViewMap_.get(keyframe);
    this.keyframeViews_.delete(keyframeView);
    this.keyframeViewMap_.delete(keyframe);
  }

  render() {
    return <PropertyTimelineViewComponent view={this}/>
  }

}

@observer
class PropertyTimelineViewComponent extends React.Component<{view: EffectControlPropertyTimelineView<any>}> {

  render() {
    const view = this.props.view;
    return (
      <div className='kf-timeline-content'>
        {[...view.keyframeViews].map(kf => kf.render())}
      </div>
    )
  }

}