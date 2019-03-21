import * as React from 'react'
import { observable, action, computed, observer } from 'window/app-mobx';

import { TimelineViewController, TimelineHost, TrackHost, TrackItemHost } from '../controller';
import ADiv from 'window/view/advanced-div';
import { MouseUtil } from 'orangeutil';
import { DragAndDrop } from 'window/dragndrop';
import { TimelineViewEventType } from '../controller/controller';


export interface TrackUserViewProps {
  timelineViewController: TimelineViewController;
  timelineHost: TimelineHost;
  trackHost: TrackHost;
}
export interface TrackItemUserViewProps {
  timelineViewController: TimelineViewController;
  trackHost: TrackHost;
  trackItemHost: TrackItemHost;
}


interface Props {
  timelineViewController: TimelineViewController;
}

interface TrackViewProps {
  timelineHost: TimelineHost;
  trackHost: TrackHost;
  timelineViewController: TimelineViewController;
}

interface TrackItemViewProps {
  timelineHost: TimelineHost;
  trackHost: TrackHost;
  trackItemHost: TrackItemHost;
  timelineViewController: TimelineViewController;
}

@observer
export class TracksView extends React.Component<Props, {}> {

  constructor(props: Props) {
    super(props);
  }

  render() {
    const timelineViewController = this.props.timelineViewController;
    const timelineHost = timelineViewController.timelineHost;
    return (
      <div className='tracks'>
        {[...timelineHost.trackHosts].map(([track, trackHost]) => 
          <TrackView key={track.id} timelineHost={timelineHost} trackHost={trackHost} timelineViewController={timelineViewController}/>
        )}
      </div>
    )
  }
}


@observer
export class TrackView extends React.Component<TrackViewProps, {}> {

  private static userViews_: Array<any> = [];
  static get userViews(): ReadonlyArray<any> {
  return this.userViews_; }

  static registerUserView(component: any) {
    TrackView.userViews_.push(component);
  }

  @observable presetDropActive: boolean = false;

  constructor(props: any) {
    super(props);

    this.mouseDownHandler = this.mouseDownHandler.bind(this);
    this.dragOverHandler = this.dragOverHandler.bind(this);
    this.dropHandler = this.dropHandler.bind(this);
  }

  mouseDownHandler(e: React.MouseEvent) {
  }

  dragOverHandler(e: React.DragEvent, dnd: DragAndDrop) {
    this.props.timelineViewController.ee.emit(TimelineViewEventType.TRACK_DRAG_OVER,
        e, dnd, this.props.trackHost);
  }

  dropHandler(e: React.DragEvent, dnd: DragAndDrop) {
    this.props.timelineViewController.ee.emit(TimelineViewEventType.TRACK_DROP,
        e, dnd, this.props.trackHost);
  }

  render() {
    const timelineViewController = this.props.timelineViewController;
    const timelineHost = timelineViewController.timelineHost;
    const trackHost = this.props.trackHost;
    return (
      <ADiv className='track'
        onMouseDown={this.mouseDownHandler}
        onDocumentDragOver={this.dragOverHandler}
        onDocumentDrop={this.dropHandler}>
        <TrackViewItemRenderer timelineHost={timelineHost} trackHost={trackHost} timelineViewController={timelineViewController}/>
        <UserViews timelineHost={timelineHost} trackHost={trackHost} timelineViewController={timelineViewController}/>
      </ADiv>
    );
  }
}


class UserViews extends React.PureComponent<TrackUserViewProps, {}> {
  render() {
    let i = 0;
    return (
      <>
        { TrackView.userViews.map(view => 
          React.createElement(view, {
            key: i++,
            timelineHost: this.props.timelineHost,
            trackHost: this.props.trackHost,
            timelineViewController: this.props.timelineViewController
          })
        )}
      </>
    )
  }
}




@observer
export class TrackViewItemRenderer extends React.Component<TrackViewProps, {}> {

  @computed
  get visibleItems(): Array<JSX.Element> {
    console.log('upd')
    const timelineHost = this.props.timelineHost;
    const trackHost = this.props.trackHost;
    const timelineViewController = this.props.timelineViewController;
    const startTime = timelineViewController.startTime;
    const endTime = timelineViewController.endTime;
    let result: Array<JSX.Element> = [];
    trackHost.trackItemHosts.forEach(trackItemHost => {
      if ((startTime > trackItemHost.endTime || trackItemHost.startTime > endTime) == false)
        result.push(
            <TrackItemView key={trackItemHost.id} timelineHost={timelineHost} trackHost={trackHost}
                           trackItemHost={trackItemHost} timelineViewController={timelineViewController}/>)
    })
    return result;
  }

  render() {
    return (
      <>
      {this.visibleItems}
      </>
    )
  }
}

@observer
export class TrackItemView extends React.Component<TrackItemViewProps, {}> {

  private static userViews_: Array<any> = [];
  static get userViews(): ReadonlyArray<any> {
  return this.userViews_; }

  static registerUserView(component: any) {
    TrackItemView.userViews_.push(component);
  }

  constructor(props: any) {
    super(props);

    this.barHandleMouseMoveStartHandler = this.barHandleMouseMoveStartHandler.bind(this);
    this.leftHandleMouseMoveStartHandler = this.leftHandleMouseMoveStartHandler.bind(this);
    this.rightHandleMouseMoveStartHandler = this.rightHandleMouseMoveStartHandler.bind(this);
  }

  barHandleMouseMoveStartHandler(e: MouseEvent) {
    const controller = this.props.timelineViewController;
    const trackHost = this.props.trackHost;
    const trackItemHost = this.props.trackItemHost;
    controller.trackItemBarHandleMouseMoveStartHandler(e, trackHost, trackItemHost);
  }

  leftHandleMouseMoveStartHandler(e: MouseEvent) {
    const controller = this.props.timelineViewController;
    const trackHost = this.props.trackHost;
    const trackItemHost = this.props.trackItemHost;
    controller.trackItemLeftHandleMouseMoveStartHandler(e, trackHost, trackItemHost);
  }

  rightHandleMouseMoveStartHandler(e: MouseEvent) {
    const controller = this.props.timelineViewController;
    const trackHost = this.props.trackHost;
    const trackItemHost = this.props.trackItemHost;
    controller.trackItemRightHandleMouseMoveStartHandler(e, trackHost, trackItemHost);
  }

  render() {
    const trackItemHost = this.props.trackItemHost;
    const controller = this.props.timelineViewController;
    console.log('render trackitem')
    const left = controller.getPositionRelativeToTimeline(trackItemHost.startTime);
    const right = controller.getPositionRelativeToTimeline(trackItemHost.endTime);
    const style = {
      left: left + 'px',
      width: (right - left) + 'px'
    }
    const className = 'track-item ' + 
                      (trackItemHost.focused ? 'focused' : '');
    return (
      <ADiv className={className} style={style}>
        <ADiv className='bar'
          onDocumentMouseMoveStart={this.barHandleMouseMoveStartHandler}>
          { /* <timelineViewState.NativeTrackItemView trackItemHost={trackItemHost}/> */ }
        </ADiv>
        <ADiv className='thumb left-inner' onDocumentMouseMoveStart={this.leftHandleMouseMoveStartHandler}/>
        <ADiv className='thumb right-inner' onDocumentMouseMoveStart={this.rightHandleMouseMoveStartHandler}/>
        <ADiv className='thumb left-outer' onDocumentMouseMoveStart={this.leftHandleMouseMoveStartHandler}/>
        <ADiv className='thumb right-outer' onDocumentMouseMoveStart={this.rightHandleMouseMoveStartHandler}/>
      </ADiv>
    )
  }

}