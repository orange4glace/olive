import * as React from 'react'

import { observer } from 'window/app-mobx';
import { EffectControlWidgetEffectViewModel } from 'window/view/effect-control/model/effect/effect-view-model';
import { EffectControlWidgetDrawingTimelineViewProps } from 'window/view/effect-control/view/timeline/drawing/drawing-view';

export interface EffectControlWidgetEffectTimelineViewProps<T extends EffectControlWidgetEffectViewModel<any>>
    extends EffectControlWidgetDrawingTimelineViewProps<any> {
  effectViewModel: T;
}

@observer
export class EffectControlWidgetEffectTimelineViewComponent
    extends React.Component<EffectControlWidgetEffectTimelineViewProps<any>, {}> {
  render() {
    return (
      <div className='effect-view'>
        {this.props.children}
      </div>
    )
  }
}

export abstract class EffectControlWidgetEffectFormView<T extends EffectControlWidgetEffectViewModel<any>>
    extends React.Component<EffectControlWidgetEffectTimelineViewProps<T>, {}> {}