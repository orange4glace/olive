import { Disposable } from "base/common/lifecycle";
import { EffectControlKeyframeUIEvent } from "window/workbench/common/widgets/effect-control/events";

export interface EventCallback<T> {
	(event: T): void;
}

export class EffectControlViewOutgoingEvents extends Disposable {

  onKeyframeMouseDown: EventCallback<EffectControlKeyframeUIEvent>;
  onKeyframeMouseMoveStart: EventCallback<EffectControlKeyframeUIEvent>;

  emitKeyframeMouseDown(e: EffectControlKeyframeUIEvent) {
    if (this.onKeyframeMouseDown) this.onKeyframeMouseDown(e);
  }

  emitKeyframeMouseMoveStart(e: EffectControlKeyframeUIEvent) {
    if (this.onKeyframeMouseMoveStart) this.onKeyframeMouseMoveStart(e);
  }

}