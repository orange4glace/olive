import { Drawing } from "internal/rendering/drawing/drawing";
import { VideoDrawing } from "internal/rendering/drawing/video-drawing";
import { ViewModel } from "window/view/view-model";

export interface EffectControlWidgetDrawingViewModel<T extends Drawing> extends ViewModel {

}

export interface EffectControlWidgetVideoDrawingViewModel<T extends VideoDrawing>
    extends EffectControlWidgetDrawingViewModel<T> {

}