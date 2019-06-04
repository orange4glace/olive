import * as React from 'react'

import { EffectControlWidgetPropertyViewModel } from "window/view/effect-control/model/property/property-view-model";
import { observer } from 'window/app-mobx';

import * as style from './style.scss'
import { EffectControlWidgetDrawingTimelineViewProps } from 'window/view/effect-control/view/timeline/drawing/drawing-view';

export interface EffectControlWidgetPropertyTimelineViewProps<T extends EffectControlWidgetPropertyViewModel<any>>
    extends EffectControlWidgetDrawingTimelineViewProps<any> {
  propertyViewModel: T;
}

@observer
export class EffectControlWidgetPropertyTimelineViewComponent
    extends React.Component<EffectControlWidgetPropertyTimelineViewProps<any>, {}> {
  render() {
    return (
      <div className={style.component}>
        {this.props.children}
      </div>
    )
  }
}

export abstract class EffectControlWidgetPropertyTimelineView<T extends EffectControlWidgetPropertyViewModel<any>>
    extends React.Component<EffectControlWidgetPropertyTimelineViewProps<T>, {}> {}