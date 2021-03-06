import * as React from 'react'

import ZoomableScrollView, { ZoomableScrollViewController } from 'window/view/zoomable-scroll-view';
import { observer } from 'window/app-mobx';
import { TimelineRulerView } from './timeline-ruler-view';
import { TimelineTracksView } from 'window/workbench/common/widgets/timeline/right/tracks-view';
import { TimelineWidgetViewProps } from 'window/workbench/common/widgets/timeline/widget-view';

import * as style from './style.scss'
import { TimelineWidgetTimelineViewModel } from 'window/workbench/common/widgets/timeline/model/timeline-view-model';
import { TimelineWidgetViewOutgoingEvents } from 'window/workbench/common/widgets/timeline/view-outgoing-events';
import { StandardMouseEvent } from 'base/browser/mouseEvent';
import { TimelineWidgetRangeSelectorView } from 'window/workbench/common/widgets/timeline/right/range-selector-view';
import { createStandardMouseEvent } from 'base/olive/mouse-event';

export interface TimelineContentViewProps extends TimelineWidgetViewProps {
  outgoingEvents: TimelineWidgetViewOutgoingEvents;
  timelineViewModel: TimelineWidgetTimelineViewModel;
}

export default class TimelineRightView extends React.Component<TimelineContentViewProps, {}> {

  scrollViewController: ZoomableScrollViewController;

  constructor(props: any) {
    super(props);

    this.scrollViewUpdateHandler = this.scrollViewUpdateHandler.bind(this);
    this.scrollViewController = new ZoomableScrollViewController();
    this.scrollViewController.ee.on('update', this.scrollViewUpdateHandler);
  }

  scrollViewUpdateHandler() {
    const controller = this.scrollViewController;
    this.props.widget.model.scrollViewModel.update(controller.scrollWidth, controller.start, controller.end);
  }

  render() {
    return (
      <ZoomableScrollView controller={this.scrollViewController}>
        <TimelineViewContent {...this.props}></TimelineViewContent>
      </ZoomableScrollView>
    )
  }
}

@observer
class TimelineViewContent extends React.Component<TimelineContentViewProps, {}> {

  contentRef: React.RefObject<HTMLDivElement> = React.createRef();

  constructor(props: any) {
    super(props);
    this.mouseDownHandler = this.mouseDownHandler.bind(this);
  }

  componentDidMount() {
    this.props.widget.model.scrollViewModel.setElement(this.contentRef.current);
  }

  mouseDownHandler(e: React.MouseEvent) {
    this.props.outgoingEvents.emitTimelineMouseDown({
      timelineViewModel: this.props.timelineViewModel,
      e: createStandardMouseEvent(e)
    })
  }

  render() {
    return (
      <div className={style.component} ref={this.contentRef}
          onMouseDown={this.mouseDownHandler}>
        <TimelineRulerView {...this.props}/>
        <TimelineTracksView {...this.props}/>
        <TimelineWidgetRangeSelectorView {...this.props}/>
      </div>
    )
  }

}
