import * as style from './property-view.scss'
import * as React from 'react'
import { IKeyframeValue } from "internal/rendering/property/base/keyframe-value";
import { Disposable, dispose } from "base/common/lifecycle";
import { Property } from "internal/rendering/property/base/property";
import { Keyframe } from "internal/rendering/property/base/keyframe";
import { Event, Emitter } from "base/common/event";
import { EffectControlKeyframeView } from "window/workbench/common/widgets/effect-control/view/property/keyframe-view";
import { observable, action } from "mobx";
import { ITimeline } from "internal/timeline/base/timeline";
import { ITrack } from "internal/timeline/base/track/track";
import { ITrackItem } from "internal/timeline/base/track-item/track-item";
import { TimelineScrollView } from "window/workbench/common/widgets/timeline/model/scroll-view-model";
import { EffectControlViewOutgoingEvents } from "window/workbench/common/widgets/effect-control/view-outgoing-events";
import { EffectControlPropertyTimelineView } from 'window/workbench/common/widgets/effect-control/view/property/property-timeline-view';
import { observer } from 'mobx-react';

export interface PropertyKeyframeEvent<T extends IKeyframeValue> {
  property: Property<T>;
  keyframe: Keyframe<T>;
}

export abstract class EffectControlPropertyView<T extends IKeyframeValue> extends Disposable {

  private readonly onDidFocusKeyframe_: Emitter<PropertyKeyframeEvent<T>> = new Emitter();
  public readonly onDidFocusKeyframe = this.onDidFocusKeyframe_.event;
  private readonly onDidBlurKeyframe_: Emitter<PropertyKeyframeEvent<T>> = new Emitter();
  public readonly onDidBlurKeyframe = this.onDidBlurKeyframe_.event;

  @observable private animatable_: boolean;
  public get animatable() { return this.animatable_; }

  private animateButton_: PropertyAnimateButton;
  public get animateButton() { return this.animateButton_; }

  private readonly timelineView_: EffectControlPropertyTimelineView<T>
  public get timelineView() { return this.timelineView_; }

  name: string;

  @observable readonly currentValue: any;

  @observable private readonly keyframeViews_: Set<EffectControlKeyframeView<T>>;
  private readonly keyframeViewMap_: Map<Keyframe<T>, EffectControlKeyframeView<T>>;

  constructor(
    name: string,
    readonly timeline: ITimeline,
    readonly trackItem: ITrackItem,
    readonly property: Property<T>,
    readonly timelineScrollView: TimelineScrollView,
    readonly viewOutgoingEvents: EffectControlViewOutgoingEvents) {
    super();
    this.name = name;

    this.keyframeViews_ = new Set();
    this.keyframeViewMap_ = new Map();

    this.animateButton_ = this._register(new PropertyAnimateButton(property));
    this.timelineView_ = this._register(new EffectControlPropertyTimelineView<T>(timeline, trackItem, property, timelineScrollView, viewOutgoingEvents));

    this._register(timeline.onDidChangeCurrentTime(this.onDidUpdateKeyframeValue, this))
    this._register(property.onKeyframeAdded(this.onDidUpdateKeyframeValue, this))
    this._register(property.onDidRemoveKeyframe(this.onDidUpdateKeyframeValue, this))
    this._register(property.onDidChangeKeyframeValue(this.onDidUpdateKeyframeValue, this))

    this.updateAnimatable();
    this.onDidUpdateKeyframeValue();
  }

  @action
  private updateAnimatable() {
    if (this.property.animatable === this.animatable) return;
    dispose(this.animateButton_);
    if (this.property.animatable) {
      this.animatable_ = true;
      this.animateButton_ = new PropertyAnimateButton(this.property);
    }
    else {
      this.animatable_ = false;
      this.animateButton_ = null;
    }
  }

  blurAllKeyframes(): void {
    this.keyframeViews_.forEach(view => view.blur());
  }

  toggleAnimated(): void {

  }

  onDidUpdateKeyframeValue(): void {}

  protected abstract renderValueForm(): React.ReactNode;

  renderForm() {
    const component = observer(() => 
      <div className={`property-form ${style.component}`}>
        <div className='key'>
          {this.animatable && this.animateButton.render()}
          <div className='label'>{this.name}</div>
        </div>
        <div className='value'>
          {this.renderValueForm()}
        </div>
      </div>
    )
    return React.createElement(component);
  }

  renderTimeline() {
    return (
      <div className={`property-timeline ${style.component}`}>
        {this.timelineView.render()}
      </div>
    )
  }

}

export class PropertyAnimateButton extends Disposable {

  @observable private animated_: boolean;
  public get animated() { return this.animated_; }

  constructor(
    private readonly property: Property<any>
  ) {
    super();

    this.animated_ = property.animated;
    this._register(property.onDidChangeAnimated(val => this.animated_ = val, this));
  }

  setAnimated(value: boolean) {
    this.property.setAnimated(value);
  }

  render() {
    return <PropertyAnimateButtonComponent view={this}/>
  }

}

@observer
class PropertyAnimateButtonComponent extends React.Component<{view: PropertyAnimateButton}> {

  handleButtonClick = () => {
    const view = this.props.view;
    view.setAnimated(!view.animated);
  }

  render() {
    const view = this.props.view;
    const css = (view.animated ? 'true' : 'false')
    return (
      <div className={`property-animated-button ${css}`} onClick={this.handleButtonClick}>
      </div>
    )
  }
}