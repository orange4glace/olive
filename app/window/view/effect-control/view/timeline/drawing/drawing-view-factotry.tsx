import * as React from 'react'
import { EffectControlWidgetDrawingViewModel } from "window/view/effect-control/model/drawing/drawing-view-model";
import { assert } from 'base/common/assert';
import { EffectControlWidgetDrawingTimelineViewProps, EffectControlWidgetDrawingTimelineView } from 'window/view/effect-control/view/timeline/drawing/drawing-view';

interface EffectControlWidgetDrawingTimelineViewType {
  new (): EffectControlWidgetDrawingTimelineView<any>;
}

export class EffectControlWidgetDrawingTimelineViewFactory
    extends React.Component<EffectControlWidgetDrawingTimelineViewProps<EffectControlWidgetDrawingViewModel<any>>, {}> {

  private static factory_: Map<string | Symbol, EffectControlWidgetDrawingTimelineViewType> = new Map();

  static register(key: string | Symbol, view: any) {
    EffectControlWidgetDrawingTimelineViewFactory.factory_.set(key, view);
  }

  render() {
    const model = this.props.drawingViewModel;
    const viewClass = EffectControlWidgetDrawingTimelineViewFactory.factory_.get(model.viewModelName);
    assert(viewClass, 'View not found, ' + model.viewModelName);
    return React.createElement(viewClass, this.props);
  }

}