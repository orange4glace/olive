import * as React from 'react'
import { observable, action, computed, observer } from 'window/app-mobx';

import { TimelineViewController, TimelineHost, TrackHost, TrackItemHost } from '../controller';
import ADiv from 'window/view/advanced-div';
import { MouseUtil } from 'orangeutil';
import { DragAndDrop } from 'window/dragndrop';
import { TimelineViewEventType } from '../controller/controller';
import Track from 'internal/timeline/track';
import TrackItem from 'internal/timeline/track-item';
import { TimePair } from 'internal/timeline/time-pair';


export interface TrackUserViewProps {
  timelineViewController: TimelineViewController;
  timelineHost: TimelineHost;
  trackHost: TrackHost;
}
export interface TrackItemUserViewProps extends TrackUserViewProps {
  timelineViewController: TimelineViewController;
  trackHost: TrackHost;
  trackItemHost: TrackItemHost;
}


interface Props {
  timelineViewController: TimelineViewController;
}

interface TrackViewProps {
  timelineHost: TimelineHost;
  track: Track;
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
        {[...timelineHost.timeline.tracks].map(track => 
          <TrackView key={track.id} timelineHost={timelineHost} track={track} timelineViewController={timelineViewController}/>
        )}
      </div>
    )
  }
}


@observer
export class TrackView extends React.Component<TrackViewProps, {}> {

  trackHost: TrackHost;

  private static userViews_: Array<any> = [];
  static get userViews(): ReadonlyArray<any> {
  return this.userViews_; }

  static registerUserView(component: any) {
    TrackView.userViews_.push(component);
  }

  @observable presetDropActive: boolean = false;

  constructor(props: any) {
    super(props);

    const controller = this.props.timelineViewController;
    const track = this.props.track;
    this.trackHost = new TrackHost(track);
    controller.timelineHost.addTrackHost(this.trackHost);

    this.mouseDownHandler = this.mouseDownHandler.bind(this);
    this.dragOverHandler = this.dragOverHandler.bind(this);
    this.dropHandler = this.dropHandler.bind(this);
  }

  componentWillUnmount() {
    const controller = this.props.timelineViewController;
    const track = this.props.track;
    this.trackHost = new TrackHost(track);
    controller.timelineHost.removeTrackHost(this.trackHost);
  }

  mouseDownHandler(e: React.MouseEvent) {
  }

  dragOverHandler(e: React.DragEvent, dnd: DragAndDrop) {
    this.props.timelineViewController.ee.emit(TimelineViewEventType.TRACK_DRAG_OVER,
        e, dnd, this.trackHost);
  }

  dropHandler(e: React.DragEvent, dnd: DragAndDrop) {
    this.props.timelineViewController.ee.emit(TimelineViewEventType.TRACK_DROP,
        e, dnd, this.trackHost);
  }

  render() {
    const timelineViewController = this.props.timelineViewController;
    const timelineHost = timelineViewController.timelineHost;
    const trackHost = this.trackHost;
    return (
      <ADiv className='track'
        onMouseDown={this.mouseDownHandler}
        onDocumentDragOver={this.dragOverHandler}
        onDocumentDrop={this.dropHandler}>
        <TrackViewItemRenderer {...this.props} trackHost={trackHost}/>
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


interface TrackViewItemRendererProps extends TrackViewProps {
  trackHost: TrackHost;
}

@observer
export class TrackViewItemRenderer extends React.Component<TrackViewItemRendererProps, {}> {

  @computed
  get visibleItems(): Array<JSX.Element> {
    console.log('upd')
    const timelineHost = this.props.timelineHost;
    const trackHost = this.props.trackHost;
    const timelineViewController = this.props.timelineViewController;
    const startTime = timelineViewController.startTime;
    const endTime = timelineViewController.endTime;
    let result: Array<JSX.Element> = [];
    trackHost.track.trackItems.forEach(trackItem => {
      if ((startTime > trackItem.time.end || trackItem.time.start > endTime) == false)
        result.push(
            <TrackItemView {...this.props} key={trackItem.id} trackItem={trackItem}/>)
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

interface TrackItemViewProps extends TrackViewItemRendererProps {
  trackItem: TrackItem;
}

@observer
export class TrackItemView extends React.Component<TrackItemViewProps, {}> {

  trackItemHost: TrackItemHost;

  private static userViews_: Array<any> = [];
  static get userViews(): ReadonlyArray<any> {
  return this.userViews_; }

  static registerUserView(component: any) {
    TrackItemView.userViews_.push(component);
  }

  constructor(props: any) {
    super(props);
    const trackItem = this.props.trackItem;

    this.trackItemHost = new TrackItemHost(trackItem);
    this.props.trackHost.addTrackItemHost(this.trackItemHost);
  }

  render() {
    const trackItemHost = this.trackItemHost;
    const trackItem = trackItemHost.trackItem;
    const controller = this.props.timelineViewController;
    const left = controller.getPositionRelativeToTimeline(trackItem.time.start);
    const right = controller.getPositionRelativeToTimeline(trackItem.time.end);
    const style = {
      left: left + 'px',
      width: (right - left) + 'px'
    }
    const className = 'track-item ' + 
                      (trackItemHost.focused ? 'focused' : '');
    return (
      <ADiv className={className} style={style}>
        <ADiv className='bar'>
          <TrackItemUserViews {...this.props} trackItemHost={this.trackItemHost}/>
        </ADiv>
      </ADiv>
    )
  }

}


class TrackItemUserViews extends React.PureComponent<TrackItemUserViewProps, {}> {
  render() {
    let i = 0;
    return (
      <>
        { TrackItemView.userViews.map(view => 
          React.createElement(view, {
            key: i++,
            timelineHost: this.props.timelineHost,
            trackHost: this.props.trackHost,
            trackItemHost: this.props.trackItemHost,
            timelineViewController: this.props.timelineViewController
          })
        )}
      </>
    )
  }
}