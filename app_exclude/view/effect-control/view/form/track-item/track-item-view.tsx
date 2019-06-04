import * as React from 'react'
import { EffectControlWidgetTrackItemViewModel } from 'window/view/effect-control/model/track-item/track-item-view-model';
import { EffectControlWidgetViewProps } from 'window/view/effect-control/view/widget-view';

export interface EffectControlWidgetTrackItemViewProps<T extends EffectControlWidgetTrackItemViewModel<any>>
    extends EffectControlWidgetViewProps {
  trackItemViewModel: T;
}

export abstract class EffectControlWidgetTrackView<T extends EffectControlWidgetTrackItemViewModel<any>>
    extends React.Component<EffectControlWidgetTrackItemViewProps<T>, {}> {
}

export class EffectControlWidgetTrackItemFormViewComponent
    extends React.Component<EffectControlWidgetTrackItemViewProps<any>, {}> {
  render() {
    return (
      <div className='track-item-view'>
        {this.props.children}
      </div>
    )
  }
}