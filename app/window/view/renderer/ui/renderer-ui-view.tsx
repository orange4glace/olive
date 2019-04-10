import * as React from 'react'
import { computed, observer } from 'window/app-mobx';

import * as style from './index.scss'
import { RendererViewController } from '../controller/renderer-view-controller';
import TimelineViewState from 'window/view/timeline/controller/state';
import { RendererUITrackItemView } from './track-item-view';

export interface RendererUIViewProps {
  rendererViewController: RendererViewController;
}

@observer
export class RendererUIView extends React.PureComponent<RendererUIViewProps, {}> {

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