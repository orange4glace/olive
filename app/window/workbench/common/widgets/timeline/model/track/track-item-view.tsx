import * as React from 'react'
import { ViewModel } from "window/view/view-model";
import { Event, Emitter } from "base/common/event";
import { ITrackItem } from "internal/timeline/base/track-item/track-item";
import { TimelineWidgetViewOutgoingEvents } from 'window/workbench/common/widgets/timeline/view-outgoing-events';
import { StandardMouseEvent } from 'base/browser/mouseEvent';
import { ITrack } from 'internal/timeline/base/track/track';
import { createStandardMouseEvent } from 'base/olive/mouse-event';
import ADiv from 'window/view/advanced-div';
import { EventUtil } from 'orangeutil';
import { TimelineScrollView } from 'window/workbench/common/widgets/timeline/model/scroll-view-model';
import { observable, computed } from 'mobx';
import { observer } from 'mobx-react';
import { Disposable } from 'base/common/lifecycle';

export interface TimelineWidgetTrackItemViewModel extends ViewModel {

  readonly onFocused: Event<void>;
  readonly onBlured: Event<void>;

  readonly trackItem: ITrackItem;
  /*@observable*/ readonly focused: boolean;
  /*@observable*/ readonly start: number;
  /*@observable*/ readonly end: number;

  focus(): void;
  blur(): void;

}

export class TimelineTrackItemView extends Disposable {

  private readonly onFocused_: Emitter<void> = new Emitter();
  readonly onFocused: Event<void> = this.onFocused_.event;

  private readonly onBlured_: Emitter<void> = new Emitter();
  readonly onBlured: Event<void> = this.onBlured_.event;

  @observable private focused_: boolean;
  public get focused() { return this.focused_; }

  @observable private left_: number;
  public get left() { return this.left_; }
  @observable private right_: number;
  public get right() { return this.right_; }

  constructor(
    readonly track: ITrack,
    readonly trackItem: ITrackItem,
    readonly timelineScrollView: TimelineScrollView,
    readonly outgoingEvents: TimelineWidgetViewOutgoingEvents) {
    super();
    this.trackItem = trackItem;

    this._register(timelineScrollView.onUpdate(() => this.update()));
    this._register(trackItem.onDidChangeTime(() => this.update()));
    this.update();
  }

  private update(): void {
    this.left_ = this.timelineScrollView.getPositionRelativeToTimeline(this.trackItem.time.start);
    this.right_ =  this.timelineScrollView.getPositionRelativeToTimeline(this.trackItem.time.end);
  }

  emitTrackItemMouseDown(e: StandardMouseEvent) {
    this.outgoingEvents.emitTrackItemMouseDown({
      track: this.track,
      trackItem: this.trackItem,
      e: e
    })
  }

  emitTrackItemMouseMoveStart(e: StandardMouseEvent) {
    this.outgoingEvents.emitTrackItemMouseMoveStart({
      track: this.track,
      trackItem: this.trackItem,
      e: e
    })
  }

  emitTrackItemThumbMouseMoveStart(e: StandardMouseEvent, direction: 'LEFT' | 'RIGHT') {
    this.outgoingEvents.emitTrackItemThumbMouseMoveStart({
      track: this.track,
      trackItem: this.trackItem,
      direction: direction,
      e: e
    })
  }

  focus(): void {
    if (this.focused_) return;
    this.focused_ = true;
    this.onFocused_.fire();
  }

  blur(): void {
    if (!this.focused_) return;
    this.focused_ = false;
    this.onBlured_.fire();
  }

  render(): React.ReactNode {
    return <TrackItemViewComponent view={this}/>
  }

}

@observer
export class TrackItemViewComponent extends React.Component<{view: TimelineTrackItemView}> {

  mouseDownHandler = (e: React.MouseEvent) => {
    const view = this.props.view;
    view.emitTrackItemMouseDown(createStandardMouseEvent(e));
  }

  mouseMoveStartHandler = (e: MouseEvent) => {
    const view = this.props.view;
    view.emitTrackItemMouseMoveStart(createStandardMouseEvent(e));
  }

  leftThumbMouseMoveStartHandler = (e: MouseEvent) => {
    const view = this.props.view;
    view.emitTrackItemThumbMouseMoveStart(createStandardMouseEvent(e), 'LEFT');
  }

  rightThumbMouseMoveStartHandler = (e: MouseEvent) => {
    const view = this.props.view;
    view.emitTrackItemThumbMouseMoveStart(createStandardMouseEvent(e), 'RIGHT');

  }

  render() {
    const view = this.props.view;
    const style = {
      left: view.left + 'px',
      width: (view.right - view.left) + 'px'
    }
    const className = 'track-item ' + (view.focused ? 'focused' : '');
    return (
      <ADiv className={className} style={style}>
        <ADiv className='bar'
          onMouseDown={this.mouseDownHandler}
          onDocumentMouseMoveStart={this.mouseMoveStartHandler}>
          <ADiv className='thumb left-inner'
              onMouseDown={EventUtil.stopPropagation}
              onDocumentMouseMoveStart={this.leftThumbMouseMoveStartHandler}/>
          <ADiv className='thumb left-outer'
              onMouseDown={EventUtil.stopPropagation}
              onDocumentMouseMoveStart={this.leftThumbMouseMoveStartHandler}/>
          <ADiv className='thumb right-inner'
              onMouseDown={EventUtil.stopPropagation}
              onDocumentMouseMoveStart={this.rightThumbMouseMoveStartHandler}/>
          <ADiv className='thumb right-outer'
              onMouseDown={EventUtil.stopPropagation}
              onDocumentMouseMoveStart={this.rightThumbMouseMoveStartHandler}/>
          {/* <ADiv className='thumb left-outer' onDocumentMouseMoveStart={this.leftHandleMouseMoveStartHandler}/>
          <ADiv className='thumb right-outer' onDocumentMouseMoveStart={this.rightHandleMouseMoveStartHandler}/> */}
        </ADiv>
      </ADiv>
    )
  }

}

