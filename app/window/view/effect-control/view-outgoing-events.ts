import { Disposable } from "base/common/lifecycle";
import { EffectControlWidgetKeyframeUIEvent } from "window/view/effect-control/event";

export interface EventCallback<T> {
	(event: T): void;
}

export class EffectControlViewOutgoingEvents extends Disposable {

  onKeyframeMouseDown: EventCallback<EffectControlWidgetKeyframeUIEvent>;
  onKeyframeMouseMoveStart: EventCallback<EffectControlWidgetKeyframeUIEvent>;

  emitKeyframeMouseDown(e: EffectControlWidgetKeyframeUIEvent) {
    if (this.onKeyframeMouseDown) this.onKeyframeMouseDown(e);
  }

  emitKeyframeMouseMoveStart(e: EffectControlWidgetKeyframeUIEvent) {
    if (this.onKeyframeMouseMoveStart) this.onKeyframeMouseMoveStart(e);
  }

}