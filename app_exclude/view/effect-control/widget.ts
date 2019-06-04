import { Widget } from "window/view/widget";
import { EffectControlWidgetModel } from "window/view/effect-control/model/model";
import { EffectControlWidgetKeyframeEvent, EffectControlWidgetKeyframeUIEvent } from "window/view/effect-control/event";
import { Event } from "base/common/event";
import { EffectControlViewOutgoingEvents } from "window/view/effect-control/view-outgoing-events";

export interface EffectControlWidget extends Widget {

  readonly onKeyframeMouseDown: Event<EffectControlWidgetKeyframeUIEvent>;
  readonly onKeyframeMouseMoveStart: Event<EffectControlWidgetKeyframeUIEvent>;

  readonly onKeyframeFocused: Event<EffectControlWidgetKeyframeEvent>;
  readonly onKeyframeBlured: Event<EffectControlWidgetKeyframeEvent>;

  registerViewOutgoingEvents(outingEvents: EffectControlViewOutgoingEvents): void;

  readonly model: EffectControlWidgetModel;

}