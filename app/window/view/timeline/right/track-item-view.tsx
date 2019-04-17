import * as React from 'react'
import { TimelineTrackViewProps } from './track-view';
import TrackItem from 'internal/timeline/track-item';
import { observer } from 'window/app-mobx';
import ADiv from 'window/view/advanced-div';
import { EventUtil } from 'orangeutil';

interface TimelineTrackItemViewProps extends TimelineTrackViewProps {
  trackItem: TrackItem;
}

@observer
export class TrackItemView extends React.Component<TimelineTrackItemViewProps, {}> {

  constructor(props: any) {
    super(props);
  }

  render() {
    const track = this.props.track;
    const trackItem = this.props.trackItem;
    const controller = this.props.controller;
    const left = controller.getPositionRelativeToTimeline(trackItem.time.start);
    const right = controller.getPositionRelativeToTimeline(trackItem.time.end);
    const style = {
      left: left + 'px',
      width: (right - left) + 'px'
    }
    const className = 'track-item ' + 
                      (controller.isTrackItemFocused(track, trackItem) ? 'focused' : '');
    return (
      <ADiv className={className} style={style}>
        <ADiv className='bar'
          onMouseDown={EventUtil.stopPropagation}
          onDocumentMouseMoveStart={this.startMove}
          onDocumentMouseMove={this.handleMove}
          onDocumentMouseMoveEnd={this.commitMove}>
          <ADiv className='thumb left-inner'
              onMouseDown={EventUtil.stopPropagation}
              onDocumentMouseMoveStart={this.startResizeLeft}
              onDocumentMouseMove={this.handleResizeLeft}
              onDocumentMouseMoveEnd={this.commitResizeLeft}/>
          <ADiv className='thumb left-outer'
              onMouseDown={EventUtil.stopPropagation}
              onDocumentMouseMoveStart={this.startResizeLeft}
              onDocumentMouseMove={this.handleResizeLeft}
              onDocumentMouseMoveEnd={this.commitResizeLeft}/>
          <ADiv className='thumb right-inner'
              onMouseDown={EventUtil.stopPropagation}
              onDocumentMouseMoveStart={this.startResizeRight}
              onDocumentMouseMove={this.handleResizeRight}
              onDocumentMouseMoveEnd={this.commitResizeRight}/>
          <ADiv className='thumb right-outer'
              onMouseDown={EventUtil.stopPropagation}
              onDocumentMouseMoveStart={this.startResizeRight}
              onDocumentMouseMove={this.handleResizeRight}
              onDocumentMouseMoveEnd={this.commitResizeRight}/>
          {/* <ADiv className='thumb left-outer' onDocumentMouseMoveStart={this.leftHandleMouseMoveStartHandler}/>
          <ADiv className='thumb right-outer' onDocumentMouseMoveStart={this.rightHandleMouseMoveStartHandler}/> */}
        </ADiv>
      </ADiv>
    )
  }

}

