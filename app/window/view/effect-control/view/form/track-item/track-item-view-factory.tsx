import * as React from 'react'
import { EffectControlWidgetTrackItemViewModel } from 'window/view/effect-control/model/track-item/track-item-view-model';
import { assert } from 'base/common/assert';
import { EffectControlWidgetTrackView, EffectControlWidgetTrackItemViewProps } from 'window/view/effect-control/view/form/track-item/track-item-view';

interface EffectControlWidgetTrackViewType {
  new (): EffectControlWidgetTrackView<any>;
}

export class EffectControlWidgetTrackItemViewFactory
    extends React.Component<EffectControlWidgetTrackItemViewProps<EffectControlWidgetTrackItemViewModel<any>>, {}> {

  private static factory_: Map<string | Symbol, EffectControlWidgetTrackViewType> = new Map();

  static register(key: string | Symbol, view: any) {
    EffectControlWidgetTrackItemViewFactory.factory_.set(key, view);
  }

  render() {
    const model = this.props.trackItemViewModel;
    const viewClass = EffectControlWidgetTrackItemViewFactory.factory_.get(model.viewModelName);
    assert(viewClass, 'View not found, ' + model.viewModelName);
    return React.createElement(viewClass, this.props);
  }

}