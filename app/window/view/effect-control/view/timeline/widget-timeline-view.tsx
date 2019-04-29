import * as React from 'react'
import { EffectControlWidgetViewProps } from 'window/view/effect-control/view/widget-view';
import { EffectControlWidgetModel } from 'window/view/effect-control/model/model';
import { EffectControlWidgetTrackItemTimelineViewFactory } from 'window/view/effect-control/view/timeline/track-item/track-item-view-factory';
import { observer } from 'window/app-mobx';
import ZoomableScrollView, { ZoomableScrollViewController } from 'window/view/zoomable-scroll-view';
import { IReactionDisposer } from 'mobx';

export interface EffectControlWidgetTimelineContentViewProps extends EffectControlWidgetViewProps {
  model: EffectControlWidgetModel;
}

@observer
export class EffectControlWidgetTimelineView extends React.Component<EffectControlWidgetTimelineContentViewProps, {}> {

  scrollViewController: ZoomableScrollViewController;
  updateViewDisposer: IReactionDisposer;

  constructor(props: any) {
    super(props);
    
    this.scrollViewUpdateHandler = this.scrollViewUpdateHandler.bind(this);
    this.scrollViewController = new ZoomableScrollViewController();
    this.scrollViewController.ee.on('update', this.scrollViewUpdateHandler);
  }

  componentWillUnmount() {
    this.updateViewDisposer();
  }

  scrollViewUpdateHandler() {
    const controller = this.scrollViewController;
    this.props.widget.model.timelineScrollViewModel.update(controller.scrollWidth, controller.start, controller.end);
  }

  render() {
    return (
      <ZoomableScrollView controller={this.scrollViewController}>
        <EffectControlWidgetTrackItemTimelineViewFactory {...this.props}
            trackItemViewModel={this.props.widget.model.trackItemViewModel}/>
      </ZoomableScrollView>
    )
  }

}