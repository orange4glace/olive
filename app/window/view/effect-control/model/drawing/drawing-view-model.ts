import { Drawing } from "internal/rendering/drawing/drawing";
import { VideoDrawing } from "internal/rendering/drawing/video-drawing";
import { ViewModel } from "window/view/view-model";
import { EffectControlWidgetPropertyViewModelKeyframeEvent } from "window/view/effect-control/model/property/property-view-model";
import { Event } from "base/common/event";

export interface EffectControlWidgetDrawingViewModel<T extends Drawing> extends ViewModel {

  readonly onKeyframeFocused: Event<EffectControlWidgetPropertyViewModelKeyframeEvent>;
  readonly onKeyframeBlured: Event<EffectControlWidgetPropertyViewModelKeyframeEvent>;

}

export interface EffectControlWidgetVideoDrawingViewModel<T extends VideoDrawing>
    extends EffectControlWidgetDrawingViewModel<T> {

}