import * as React from 'react'
import { EffectControlWidgetDrawingViewModel } from "window/view/effect-control/model/drawing/drawing-view-model";
import { EffectControlWidgetTrackItemViewProps } from 'window/view/effect-control/view/form/track-item/track-item-view';
import { ViewModelSelector, ViewModelSelectorView } from 'window/base/common/view-model-selector';
import { observer } from 'window/app-mobx';

export interface EffectControlWidgetDrawingFormViewProps<T extends EffectControlWidgetDrawingViewModel<any>>
    extends EffectControlWidgetTrackItemViewProps<any> {
  drawingViewModel: T;
}

export const EffectControlDrawingFormViewSelector =
    new ViewModelSelector<EffectControlWidgetDrawingFormViewProps<any>, EffectControlWidgetDrawingViewModel<any>>();

export abstract class EffectControlWidgetDrawingFormView<T extends EffectControlWidgetDrawingViewModel<any>>
    extends React.Component<EffectControlWidgetDrawingFormViewProps<T>, {}> { }

@observer
export class EffectControlWidgetDrawingSelectorFormView
    extends React.Component<EffectControlWidgetDrawingFormViewProps<any>, {}> {
  render() {
    return (
      <div className='track-item-view'>
        <ViewModelSelectorView selector={EffectControlDrawingFormViewSelector}
            viewModel={this.props.drawingViewModel} props={this.props}/>
      </div>
    )
  }
}