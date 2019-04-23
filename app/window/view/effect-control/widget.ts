import { Widget } from "window/view/widget";
import { EffectControlWidgetModel } from "window/view/effect-control/model/model";

export abstract class EffectControlWidget extends Widget {

  abstract get model(): EffectControlWidgetModel;

}