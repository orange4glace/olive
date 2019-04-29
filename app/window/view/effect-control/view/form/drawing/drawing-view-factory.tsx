import * as React from 'react'
import { EffectControlWidgetDrawingViewModel } from "window/view/effect-control/model/drawing/drawing-view-model";
import { assert } from 'base/common/assert';
import { EffectControlWidgetTrackItemViewProps } from 'window/view/effect-control/view/form/track-item/track-item-view';

export interface EffectControlWidgetDrawingViewProps<T extends EffectControlWidgetDrawingViewModel<any>>
    extends EffectControlWidgetTrackItemViewProps<any> {
  drawingViewModel: T;
}

export abstract class EffectControlWidgetDrawingView<T extends EffectControlWidgetDrawingViewModel<any>>
    extends React.Component<EffectControlWidgetDrawingViewProps<T>, {}> {

}

interface EffectControlWidgetDrawingViewType {
  new (): EffectControlWidgetDrawingView<any>;
}

export class EffectControlWidgetDrawingViewFactory
    extends React.Component<EffectControlWidgetDrawingViewProps<EffectControlWidgetDrawingViewModel<any>>, {}> {

  private static factory_: Map<string | Symbol, EffectControlWidgetDrawingViewType> = new Map();

  static register(key: string | Symbol, view: any) {
    EffectControlWidgetDrawingViewFactory.factory_.set(key, view);
  }

  render() {
    const model = this.props.drawingViewModel;
    const viewClass = EffectControlWidgetDrawingViewFactory.factory_.get(model.viewModelName);
    assert(viewClass, 'View not found, ' + model.viewModelName);
    return React.createElement(viewClass, this.props);
  }

}