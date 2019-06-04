import * as React from 'react'
import { EffectControlWidgetTrackItemViewModel } from 'window/view/effect-control/model/track-item/track-item-view-model';
import { assert } from 'base/olive/assert';
import { EffectControlWidgetTrackView, EffectControlWidgetTrackItemViewProps } from 'window/view/effect-control/view/form/track-item/track-item-view';
import { EffectControlWidgetTrackItemTimelineViewProps } from 'window/view/effect-control/view/timeline/track-item/track-item-view';

interface EffectControlWidgetTrackViewType {
  new (): EffectControlWidgetTrackView<any>;
}

export class EffectControlWidgetTrackItemTimelineViewFactory
    extends React.Component<EffectControlWidgetTrackItemTimelineViewProps<EffectControlWidgetTrackItemViewModel<any>>, {}> {

  private static factory_: Map<string | Symbol, EffectControlWidgetTrackViewType> = new Map();

  static register(key: string | Symbol, view: any) {
    EffectControlWidgetTrackItemTimelineViewFactory.factory_.set(key, view);
  }

  render() {
    const model = this.props.trackItemViewModel;
    const viewClass = EffectControlWidgetTrackItemTimelineViewFactory.factory_.get(model.viewModelName);
    assert(viewClass, 'View not found, ' + model.viewModelName);
    return React.createElement(viewClass, this.props);
  }

}