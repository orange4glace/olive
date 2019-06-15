import * as React from 'react'
import { TimelineTrackViewProps } from './track-view';
import { observer } from 'window/app-mobx';
import ADiv from 'window/view/advanced-div';
import { EventUtil } from 'orangeutil';
import { TimelineWidgetTrackItemViewModel } from 'window/workbench/common/widgets/timeline/model/track/track-item-view';
import { StandardMouseEvent } from 'base/browser/mouseEvent';
import { createStandardMouseEvent } from 'base/olive/mouse-event';

interface TimelineTrackItemViewProps extends TimelineTrackViewProps {
  trackItemViewModel: TimelineWidgetTrackItemViewModel;
}

@observer
export class TrackItemView extends React.Component<TimelineTrackItemViewProps, {}> {

  constructor(props: any) {
    super(props);

    this.mouseDownHandler = this.mouseDownHandler.bind(this);
    this.mouseMoveStartHandler = this.mouseMoveStartHandler.bind(this);
    this.leftThumbMouseMoveStartHandler = this.leftThumbMouseMoveStartHandler.bind(this);
    this.rightThumbMouseMoveStartHandler = this.rightThumbMouseMoveStartHandler.bind(this);
  }

  mouseDownHandler(e: React.MouseEvent) {
    this.props.outgoingEvents.emitTrackItemMouseDown({
      trackViewModel: this.props.trackViewModel,
      trackItemViewModel: this.props.trackItemViewModel,
      e: createStandardMouseEvent(e)
    });
  }

  mouseMoveStartHandler(e: MouseEvent) {
    this.props.outgoingEvents.emitTrackItemMouseMoveStart({
      trackViewModel: this.props.trackViewModel,
      trackItemViewModel: this.props.trackItemViewModel,
      e: createStandardMouseEvent(e)
    });
  }

  leftThumbMouseMoveStartHandler(e: MouseEvent) {
    this.props.outgoingEvents.emitTrackItemThumbMouseMoveStart({
      trackViewModel: this.props.trackViewModel,
      trackItemViewModel: this.props.trackItemViewModel,
      direction: 'LEFT',
      e: new StandardMouseEvent(e)
    });
  }

  rightThumbMouseMoveStartHandler(e: MouseEvent) {
    this.props.outgoingEvents.emitTrackItemThumbMouseMoveStart({
      trackViewModel: this.props.trackViewModel,
      trackItemViewModel: this.props.trackItemViewModel,
      direction: 'RIGHT',
      e: new StandardMouseEvent(e)
    });
  }

  render() {
    const trackVM = this.props.trackViewModel;
    const trackItemVM = this.props.trackItemViewModel;
    const widget = this.props.widget;
    const left = widget.model.getPositionRelativeToTimeline(trackItemVM.start);
    const right = widget.model.getPositionRelativeToTimeline(trackItemVM.end);
    const style = {
      left: left + 'px',
      width: (right - left) + 'px'
    }
    const className = 'track-item ' + (trackItemVM.focused ? 'focused' : '');
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

