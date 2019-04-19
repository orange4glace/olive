import * as React from 'react'

import ZoomableScrollView, { ZoomableScrollViewController } from 'window/view/zoomable-scroll-view';
import { observer } from 'window/app-mobx';
import { TimelineRulerView } from './timeline-ruler-view';
import { TimelineTracksView } from 'window/view/timeline/right/tracks-view';
import { TimelineWidgetViewProps } from 'window/view/timeline/view';

import * as style from './style.scss'

export interface TimelineContentViewProps extends TimelineWidgetViewProps {
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

  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <div className={style.component}>
        <TimelineRulerView {...this.props}/>
        <TimelineTracksView {...this.props}/>
      </div>
    )
  }

}
