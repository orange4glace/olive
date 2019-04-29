import * as React from 'react'

import { EffectControlWidgetPropertyViewModel } from "window/view/effect-control/model/property/property-view-model";
import { observer } from 'window/app-mobx';
import { EffectControlWidgetDrawingViewProps } from 'window/view/effect-control/view/form/drawing/drawing-view-factory';

export interface EffectControlWidgetPropertyTimelineViewProps<T extends EffectControlWidgetPropertyViewModel<any>>
    extends EffectControlWidgetDrawingViewProps<any> {
  propertyViewModel: T;
}

@observer
export class EffectControlWidgetPropertyTimelineViewComponent
    extends React.Component<EffectControlWidgetPropertyTimelineViewProps<any>, {}> {
  render() {
    return (
      <div className='property-view'>
        {this.props.children}
      </div>
    )
  }
}

export abstract class EffectControlWidgetPropertyTimelineView<T extends EffectControlWidgetPropertyViewModel<any>>
    extends React.Component<EffectControlWidgetPropertyTimelineViewProps<T>, {}> {}