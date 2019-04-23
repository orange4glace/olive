import * as React from 'react'
import { EffectControlWidgetViewProps } from 'window/view/effect-control/view/widget-view';
import { EffectControlWidgetModel } from 'window/view/effect-control/model/model';
import { observer } from 'window/app-mobx';
import { EffectControlWidgetTrackItemViewFactory } from 'window/view/effect-control/view/form/track-item/track-item-view-factory';

export interface EffectControlWidgetContentViewProps extends EffectControlWidgetViewProps {
  model: EffectControlWidgetModel;
}

@observer
export class EffectControlWidgetFormView extends React.Component<EffectControlWidgetContentViewProps, {}> {

  render() {
    const model = this.props.model;
    return (
      <EffectControlWidgetTrackItemViewFactory {...this.props} trackItemViewModel={model.trackItemViewModel}/>
    )
  }

}