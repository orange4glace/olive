import * as React from 'react'
import { EffectControlWidget } from 'window/view/effect-control/widget';
import { observable, observer } from 'window/app-mobx';
import { EffectControlWidgetFormView } from 'window/view/effect-control/view/form/widget-form-view';

export interface EffectControlWidgetViewProps {
  widget: EffectControlWidget;
}

@observer
export class EffectControlWidgetView extends React.Component<EffectControlWidgetViewProps, {}> {

  render() {
    if (this.props.widget.model) {
      const model = this.props.widget.model;
      return <EffectControlWidgetFormView {...this.props} model={model}/>;
    }
    else {
      return <div>No TrackItem Selected</div>
    }
  }

}