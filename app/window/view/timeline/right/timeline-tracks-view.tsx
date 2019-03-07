import * as React from 'react'
import { observable, action } from 'mobx';
import { observer } from 'mobx-react'

import { TimelineViewController } from '../controller';
import ADiv from 'window/view/advanced-div';
import { MouseUtil } from 'orangeutil';

import { TracksView } from './tracks-view'
import ActivatedTracksView from './activated-tracks-view'
import TimelineState from '../controller/state';

export interface TracksUserViewProps {
  timelineViewController: TimelineViewController;
}
export abstract class TracksUserView extends React.Component<TracksUserViewProps, any> {}
interface TracksUserViewClass {
  new (): TracksUserView }

  
interface Props {
  timelineViewController: TimelineViewController;
}

@observer
export class TimelineTracksView extends React.Component<Props, {}> {

  private static userViews_: Array<TracksUserViewClass> = [];
  static get userViews(): ReadonlyArray<TracksUserViewClass> {
  return this.userViews_; }
  
  static registerUserView(component: any) {
    TimelineTracksView.userViews_.push(component);
  }
  
  constructor(props: Props) {
    super(props);

    this.documentMouseMoveStartHandler = this.documentMouseMoveStartHandler.bind(this);
    this.mouseMoveHandler = this.mouseMoveHandler.bind(this);
  }

  componentDidMount() {
    const controller = this.props.timelineViewController;
    controller.tracksViewRef.current.addEventListener('mousemove', this.mouseMoveHandler);
  }

  componentWillUnmount() {
    const controller = this.props.timelineViewController;
    controller.tracksViewRef.current.removeEventListener('mousemove', this.mouseMoveHandler);
  }

  mouseMoveHandler(e: React.MouseEvent) {
    const controller = this.props.timelineViewController;
    controller.ee.emit('timeline-tracks-mousemove', e);
  }

  documentMouseMoveStartHandler(e: MouseEvent) {
    this.props.timelineViewController.timelineMouseMoveStartHandler(e);
  }

  render() {
    const timelineViewController = this.props.timelineViewController;
    const timelineHost = timelineViewController.timelineHost;
    return (
      <ADiv className='timeline-tracks-view' ref={timelineViewController.tracksViewRef}
        onDocumentMouseMoveStart={this.documentMouseMoveStartHandler}>

        <TracksView timelineViewController={timelineViewController}/>
        <ActivatedTracksView timelineViewController={timelineViewController}/>

        <GuidelineIndicator timelineViewController={timelineViewController}/>

        <UserView timelineViewController={timelineViewController}/>
      </ADiv>
    )  
  }

}

class UserView extends React.PureComponent<Props, any> {
  
  render() {
    const controller = this.props.timelineViewController;
    let i = 0;
    return (
      <>
      { TimelineTracksView.userViews.map(view =>
        React.createElement(view, {
          key: i++,
          timelineViewController: controller
        })
      )}
      </>)
  }

}

@observer
class GuidelineIndicator extends React.Component<Props, {}> {

  @observable time: number;
  @observable position: number;
  
  constructor(props: any) {
    super(props);

    this.mouseMoveHandler = this.mouseMoveHandler.bind(this);
    this.timelineUpdateHandler = this.timelineUpdateHandler.bind(this);
  }

  componentDidMount() {
    const controller = this.props.timelineViewController;
    controller.ee.addListener('timeline-tracks-mousemove', this.mouseMoveHandler);
    controller.ee.addListener('update', this.timelineUpdateHandler);

  }

  componentWillUnmount() {
    const controller = this.props.timelineViewController;
    controller.ee.removeListener('timeline-tracks-mousemove', this.mouseMoveHandler);
    controller.ee.removeListener('update', this.timelineUpdateHandler);
  }

  @action
  mouseMoveHandler(e: MouseEvent) {
    const controller = this.props.timelineViewController;
    const timelineHost = controller.timelineHost;
    const x = MouseUtil.mousePositionElement(e, controller.tracksViewRef.current).x;
    this.time = controller.getTimeRelativeToTimeline(x);
    if (TimelineState.snap) this.time = controller.getSnappedTime(this.time);
    this.position = controller.getPositionRelativeToTimeline(this.time);
    // if (timelineViewState.snap) this.time = timeline
  }

  @action
  timelineUpdateHandler() {
    const controller = this.props.timelineViewController;
    this.position = controller.getPositionRelativeToTimeline(this.time);
  }

  render() {
    const style = {
      left: this.position + 'px'
    }
    return (
      <div className='guideline-indicator' style={style}/>
    )
  }

}