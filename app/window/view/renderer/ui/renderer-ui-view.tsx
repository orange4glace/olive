import * as React from 'react'
import { computed, observer } from 'window/app-mobx';

import * as style from './index.scss'
import { RendererViewController } from '../controller/renderer-view-controller';
import TimelineViewState from 'window/view/timeline/controller/state';
import { RendererUITrackItemView } from './track-item-view';

interface RendererUIViewProps {
}

@observer
export class RendererUIView extends React.Component<RendererUIViewProps, {}> {

  @computed get rendererViewController(): RendererViewController {
    return TimelineViewState.focusedTimelineViewController ?
      new RendererViewController(TimelineViewState.focusedTimelineViewController) :  null;
  }

  constructor(props: any) {
    super(props);
  }

  render() {
    if (this.rendererViewController) {
      return (
        <RendererUIContentViewWrapper rendererViewController={this.rendererViewController}/>
      )
    }
    else {
      return <div>NO TrackItem Selected</div>
    }
  }

}

export interface RendererUIContentViewProps {
  rendererViewController: RendererViewController;
}

class RendererUIContentViewWrapper extends React.PureComponent<RendererUIContentViewProps, {}> {
  render() { return ( <RendererUIContentView {...this.props}/> ) }
}

@observer
class RendererUIContentView extends React.PureComponent<RendererUIContentViewProps, {}> {

  render() {
    const controller = this.props.rendererViewController;
    return (
      <div className={style.component}>
      {
        controller.trackItemHost &&
        <RendererUITrackItemView {...this.props} trackItemHost={controller.trackItemHost}/>
      }
      </div>
    )
  }

}