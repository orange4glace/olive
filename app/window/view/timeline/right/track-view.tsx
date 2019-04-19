import * as React from 'react'
import { observer, observable } from 'window/app-mobx';
import { TimelineTracksViewProps } from './tracks-view';
import { Track } from 'internal/timeline/track';
import ADiv from 'window/view/advanced-div';
import { DragAndDrop } from 'window/dragndrop';
import { TrackItemView } from './track-item-view';

export interface TimelineTrackViewProps extends TimelineTracksViewProps {
  track: Track;
}

@observer
export class TrackView extends React.Component<TimelineTrackViewProps, {}> {

  constructor(props: any) {
    super(props);

    this.mouseDownHandler = this.mouseDownHandler.bind(this);
    this.dragOverHandler = this.dragOverHandler.bind(this);
    this.dropHandler = this.dropHandler.bind(this);
  }

  mouseDownHandler(e: React.MouseEvent) {
  }

  dragOverHandler(e: React.DragEvent, dnd: DragAndDrop) {
  }

  dropHandler(e: React.DragEvent, dnd: DragAndDrop) {
  }

  render() {
    const style = {
      height: 30 + 'px'
    }
    return (
      <ADiv className='track' style={style}
        onMouseDown={this.mouseDownHandler}
        onDocumentDragOver={this.dragOverHandler}
        onDocumentDrop={this.dropHandler}>
        <TrackItemViewRenderer {...this.props}/>
      </ADiv>
    );
  }
}


@observer
export class TrackItemViewRenderer extends React.Component<TimelineTrackViewProps, {}> {

  // @computed
  // get visibleItems(): Array<JSX.Element> {
  //   const timelineHost = this.props.timelineHost;
  //   const trackHost = this.props.trackHost;
  //   const timelineViewController = this.props.timelineViewController;
  //   const startTime = timelineViewController.startTime;
  //   const endTime = timelineViewController.endTime;
  //   let result: Array<JSX.Element> = [];
  //   trackHost.trackItemHosts.forEach(trackItemHost => {
  //       result.push(
  //           <TrackItemView {...this.props} key={trackItemHost.trackItem.id} trackItemHost={trackItemHost}/>)
  //   })
  //   return result;
  // }

  render() {
    return (
      <> 
        {[...this.props.track.trackItems].map(([trackItem, _]) =>
            <TrackItemView {...this.props} trackItem={trackItem}/>)}
      </>
    )
  }
}