import { IDisposable } from "base/common/lifecycle";
import { EffectControlWidgetTrackItemViewModel } from "window/view/effect-control/model/track-item/track-item-view-model";

export interface EffectControlWidgetModel extends IDisposable {

  readonly trackItemViewModel: EffectControlWidgetTrackItemViewModel<any>;

}