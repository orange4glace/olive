import { EffectControlWidgetTrackItemViewModel, EffectControlWidgetTrackItemViewModelImpl } from "window/view/effect-control/model/track-item/track-item-view-model";
import { VideoTrackItem } from 'internal/timeline/track-item/video-track-item'
import { EffectControlWidgetVideoDrawingViewModel } from "window/view/effect-control/model/drawing/drawing-view-model";
import { EffectControlWidgetVideoDrawingViewModelImpl } from "window/view/effect-control/model/drawing/drawing-view-model-impl";
import { Timeline } from "internal/timeline/timeline";
import { DrawingType } from "internal/rendering/drawing/drawing";
import { RectangleDrawing } from "internal/rendering/drawing/rectangle-drawing";
import { ViewModel, declareViewModel } from "window/view/view-model";
import { EffectControlWidgetRectangleDrawingViewModelImpl } from "window/view/effect-control/model/drawing/rectangle-drawing-view-model";
import { VideoMediaDrawing } from "internal/rendering/drawing/video-media-drawing";
import { EffectControlWidgetVideoMediaDrawingViewModelImpl } from "window/view/effect-control/model/drawing/video-media-drawing.view";

export const EffectControlWidgetVideoTrackItemViewModel = declareViewModel('EffectControlWidgetVideoTrackItemViewModel');

export interface EffectControlWidgetVideoTrackItemViewModel
    extends EffectControlWidgetTrackItemViewModel<VideoTrackItem> {

  readonly drawingViewModel: EffectControlWidgetVideoDrawingViewModel<any>;

}

@EffectControlWidgetVideoTrackItemViewModel
export class EffectControlWidgetVideoTrackItemViewModelImpl
    extends EffectControlWidgetTrackItemViewModelImpl<VideoTrackItem>
    implements EffectControlWidgetVideoTrackItemViewModel {

  readonly drawingViewModel: EffectControlWidgetVideoDrawingViewModelImpl<any>;

  constructor(timeline: Timeline, trackItem: VideoTrackItem) {
    super(timeline, trackItem);

    const drawing = trackItem.drawing;
    switch (drawing.type) {
      case DrawingType.RECTANGLE:
        this.drawingViewModel = new EffectControlWidgetRectangleDrawingViewModelImpl(timeline, trackItem, drawing as RectangleDrawing);
      case DrawingType.VIDEO_MEDIA:
        this.drawingViewModel = new EffectControlWidgetVideoMediaDrawingViewModelImpl(timeline, trackItem, drawing as VideoMediaDrawing);
        break;
    }
    this._register(this.drawingViewModel.onKeyframeFocused(e => this.onKeyframeFocused_.fire({
      trackViewModel: this,
      propertyViewModel: e.propertyViewModel,
      keyframeViewModel: e.keyframeViewModel
    }), this))
    this._register(this.drawingViewModel.onKeyframeBlured(e => this.onKeyframeBlured_.fire({
      trackViewModel: this,
      propertyViewModel: e.propertyViewModel,
      keyframeViewModel: e.keyframeViewModel
    }), this))
  }

  blurAllKeyframes() {
    this.drawingViewModel.blurAllKeyframes();
  }

}
    
console.log(EffectControlWidgetVideoTrackItemViewModelImpl);