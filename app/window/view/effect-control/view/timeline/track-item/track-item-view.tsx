import * as React from 'react'
import { EffectControlWidgetTrackItemViewModel } from 'window/view/effect-control/model/track-item/track-item-view-model';
import { EffectControlWidgetViewProps } from 'window/view/effect-control/view/widget-view';

export interface EffectControlWidgetTrackItemTimelineViewProps<T extends EffectControlWidgetTrackItemViewModel<any>>
    extends EffectControlWidgetViewProps {
  trackItemViewModel: T;
}

export abstract class EffectControlWidgetTrackTimelineView<T extends EffectControlWidgetTrackItemViewModel<any>>
    extends React.Component<EffectControlWidgetTrackItemTimelineViewProps<T>, {}> {
}

export class EffectControlWidgetTrackItemTimelineViewComponent
    extends React.Component<EffectControlWidgetTrackItemTimelineViewProps<any>, {}> {
  render() {
    return (
      <div className='track-item-view'>
        {this.props.children}
      </div>
    )
  }
}