import * as style from './keyframe-view.scss'
import * as React from 'react'
import { Emitter, Event } from "base/common/event";
import { observable } from "mobx";
import { ITimeline } from "internal/timeline/base/timeline";
import { ITrackItem } from "internal/timeline/base/track-item/track-item";
import { Property } from "internal/rendering/property/base/property";
import { Keyframe } from "internal/rendering/property/base/keyframe";
import { IKeyframeValue } from "internal/rendering/property/base/keyframe-value";
import { observer } from 'mobx-react';
import { EffectControlViewOutgoingEvents } from 'window/workbench/common/widgets/effect-control/view-outgoing-events';
import { TimelineScrollView } from 'window/workbench/common/widgets/timeline/model/scroll-view-model';
import ADiv from 'window/view/advanced-div';
import { Disposable } from 'base/common/lifecycle';

export class EffectControlKeyframeView<T extends IKeyframeValue> extends Disposable {

  private onFocused_: Emitter<void> = new Emitter();
  readonly onFocused: Event<void> = this.onFocused_.event;
  private onBlured_: Emitter<void> = new Emitter();
  readonly onBlured: Event<void> = this.onBlured_.event;

  @observable private focused_: boolean;
  public get focused() { return this.focused_; }

  @observable private position_: number;
  public get position() { return this.position_; }

  constructor(
      private readonly timeline_: ITimeline,
      private readonly trackItem_: ITrackItem,
      private readonly property_: Property<T>,
      readonly keyframe: Keyframe<T>,
      readonly timelineScrollView: TimelineScrollView,
      readonly viewOutgoingEvents: EffectControlViewOutgoingEvents) {
    super();
    this.updatePosition();
    this._register(this.trackItem_.onDidChangeTime(this.updatePosition, this));
    this._register(this.timelineScrollView.onUpdate(this.updatePosition, this));
  }

  private updatePosition() {
    const time = this.trackItem_.time.start + this.trackItem_.time.base + this.keyframe.timecode;
    this.position_ = this.timelineScrollView.getPositionRelativeToTimeline(time);
  }

  focus() {
    this.focused_ = true;
    this.onFocused_.fire();
  }

  blur() {
    this.focused_ = false;
    this.onBlured_.fire();
  }
  
  render() {
    return <EffectControlKeyframeViewComponent view={this}/>
  }

}

@observer
export class EffectControlKeyframeViewComponent
    extends React.Component<{view: EffectControlKeyframeView<any>}> {

  constructor(props: any) {
    super(props);

    this.mouseDownHandler = this.mouseDownHandler.bind(this);
    this.mouseDownMoveStartHandler = this.mouseDownMoveStartHandler.bind(this);
  }
  
  mouseDownHandler = (e: React.MouseEvent) => {
  }
  
  mouseDownMoveStartHandler(e: MouseEvent) {
  }

  render() {
    const view = this.props.view;
    const _style = {
      left: view.position + 'px'
    }
    return (
      <ADiv className={`keyframe ${style.component} ${view.focused ? 'focused' : ''}`} style={_style}
          onMouseDown={this.mouseDownHandler}
          onDocumentMouseMoveStart={this.mouseDownMoveStartHandler}>
      </ADiv>
    )
  }

}
