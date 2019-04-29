import * as React from 'react'
import { EffectControlWidgetRectangleDrawingViewModel } from "window/view/effect-control/model/drawing/rectangle-drawing-view-model";
import { observer } from 'window/app-mobx';
import { EffectControlWidgetDrawingViewModel } from 'window/view/effect-control/model/drawing/drawing-view-model';
import { EffectControlWidgetTrackItemViewProps } from 'window/view/effect-control/view/form/track-item/track-item-view';
import { EffectControlWidgetTransformEffectTimelineView } from 'window/view/effect-control/view/timeline/effect/transform-effect-view';

export interface EffectControlWidgetDrawingTimelineViewProps<T extends EffectControlWidgetDrawingViewModel<any>>
    extends EffectControlWidgetTrackItemViewProps<any> {
  drawingViewModel: T;
}

export abstract class EffectControlWidgetDrawingTimelineView<T extends EffectControlWidgetDrawingViewModel<any>>
    extends React.Component<EffectControlWidgetDrawingTimelineViewProps<T>, {}> {

}

@observer
export class EffectControlWidgetRectangleDrawingTimelineView
    extends EffectControlWidgetDrawingTimelineView<EffectControlWidgetRectangleDrawingViewModel> {

  render() {
    const model = this.props.drawingViewModel;
    return (
      <>
        <EffectControlWidgetTransformEffectTimelineView {...this.props} effectViewModel={model.transformEffectViewModel}/>
      </>
    )
  }

}