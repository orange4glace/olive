import { Disposable } from "base/common/lifecycle";
import { EffectControlWidget } from "window/view/effect-control/widget";
import { EffectControlWidgetKeyframeUIEvent } from "window/view/effect-control/event";

export class EffectControlManipulatorController extends Disposable {

  constructor(private readonly widget_: EffectControlWidget) {
    super();

    this._register(widget_.onKeyframeMouseDown(this.keyframeMouseDownHandler, this));
  }

  keyframeMouseDownHandler(e: EffectControlWidgetKeyframeUIEvent) {
    e.keyframeViewModel.focus();
    e.e.stopPropagation();
  }

}