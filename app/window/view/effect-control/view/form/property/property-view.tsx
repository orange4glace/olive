import * as React from 'react'

import { EffectControlWidgetPropertyViewModel } from "window/view/effect-control/model/property/property-view-model";
import { observer } from 'window/app-mobx';
import { EffectControlWidgetDrawingViewProps } from 'window/view/effect-control/view/form/drawing/drawing-view-factory';

export interface EffectControlWidgetPropertyViewProps<T extends EffectControlWidgetPropertyViewModel<any>>
    extends EffectControlWidgetDrawingViewProps<any> {
  propertyViewModel: T;
}

@observer
export class EffectControlWidgetPropertyFormViewComponent
    extends React.Component<EffectControlWidgetPropertyViewProps<any>, {}> {
  render() {
    return (
      <div className='property-view'>
        {this.props.children}
      </div>
    )
  }
}

export abstract class EffectControlWidgetPropertyFormView<T extends EffectControlWidgetPropertyViewModel<any>>
    extends React.Component<EffectControlWidgetPropertyViewProps<T>, {}> {}