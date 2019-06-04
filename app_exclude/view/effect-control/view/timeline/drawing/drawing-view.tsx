import * as React from 'react'
import { observer } from 'window/app-mobx';
import { EffectControlWidgetDrawingViewModel } from 'window/view/effect-control/model/drawing/drawing-view-model';
import { ViewModelSelector, ViewModelSelectorView } from 'window/base/common/view-model-selector';
import { EffectControlWidgetTrackItemTimelineViewProps } from 'window/view/effect-control/view/timeline/track-item/track-item-view';

export interface EffectControlWidgetDrawingTimelineViewProps<T extends EffectControlWidgetDrawingViewModel<any>>
    extends EffectControlWidgetTrackItemTimelineViewProps<any> {
  drawingViewModel: T;
}

export const EffectControlDrawingTimelineViewSelector =
    new ViewModelSelector<EffectControlWidgetDrawingTimelineViewProps<any>, EffectControlWidgetDrawingViewModel<any>>();

export abstract class EffectControlWidgetDrawingTimelineView<T extends EffectControlWidgetDrawingViewModel<any>>
    extends React.Component<EffectControlWidgetDrawingTimelineViewProps<T>, {}> {

}

@observer
export class EffectControlWidgetDrawingSelectorView
    extends React.Component<EffectControlWidgetDrawingTimelineViewProps<any>, {}> {
  render() {
    return (
      <div className='track-item-view'>
        <ViewModelSelectorView selector={EffectControlDrawingTimelineViewSelector}
            viewModel={this.props.drawingViewModel} props={this.props}/>
      </div>
    )
  }
}
