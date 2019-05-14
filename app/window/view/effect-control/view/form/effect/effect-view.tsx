import * as React from 'react'

import { observer } from 'window/app-mobx';
import { EffectControlWidgetEffectViewModel } from 'window/view/effect-control/model/effect/effect-view-model';
import { EffectControlWidgetDrawingFormViewProps } from 'window/view/effect-control/view/form/drawing/drawing-view';

export interface EffectControlWidgetEffectViewProps<T extends EffectControlWidgetEffectViewModel<any>>
    extends EffectControlWidgetDrawingFormViewProps<any> {
  effectViewModel: T;
}

@observer
export class EffectControlWidgetEffectFormViewComponent
    extends React.Component<EffectControlWidgetEffectViewProps<any>, {}> {
  render() {
    return (
      <div className='effect-view'>
        {this.props.children}
      </div>
    )
  }
}

export abstract class EffectControlWidgetEffectFormView<T extends EffectControlWidgetEffectViewModel<any>>
    extends React.Component<EffectControlWidgetEffectViewProps<T>, {}> {}