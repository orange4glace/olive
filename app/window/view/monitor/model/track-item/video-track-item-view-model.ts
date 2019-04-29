import { declareViewModel } from "window/view/view-model";
import { MonitorWidgetTrackItemViewModel, MonitorWidgetTrackItemViewModelImpl } from "window/view/monitor/model/track-item/track-item-view-model";
import { VideoTrackItem } from "internal/timeline/video-track-item";
import { MonitorWidgetDrawingViewModel } from "window/view/monitor/model/drawing/drawing-view-model";
import { DrawingType } from "internal/rendering/drawing/drawing";
import { MonitorWidgetRectangleDrawingViewModelImpl } from "window/view/monitor/model/drawing/rectangle-drawing-view-model";
import { RectangleDrawing } from "internal/rendering/drawing/rectangle-drawing";
import { mat2d } from "gl-matrix";
import { Timeline } from "internal/timeline/timeline";
import { MonitorWidgetSelectableViewModel } from "window/view/monitor/model/selectable-view-model";

export const MonitorWidgetVideoTrackItemViewModel =
    declareViewModel<MonitorWidgetVideoTrackItemViewModel>('MonitorWidgetVideoTrackItemViewModel')

export interface MonitorWidgetVideoTrackItemViewModel
    extends MonitorWidgetTrackItemViewModel<VideoTrackItem> {

  readonly drawingViewModel: MonitorWidgetDrawingViewModel<any>;

}

@MonitorWidgetVideoTrackItemViewModel
export class MonitorWidgetVideoTrackItemViewModelImpl
    extends MonitorWidgetTrackItemViewModelImpl<VideoTrackItem>
    implements MonitorWidgetVideoTrackItemViewModel {

  readonly drawingViewModel: MonitorWidgetDrawingViewModel<any>;

  constructor(parent: MonitorWidgetSelectableViewModel, timeline: Timeline, trackItem: VideoTrackItem) {
    super(parent, timeline, trackItem);

    const drawing = trackItem.drawing;
    switch (drawing.type) {
      case DrawingType.RECTANGLE:
        this.drawingViewModel = new MonitorWidgetRectangleDrawingViewModelImpl(
            this, this.timeline_, this.trackItem, drawing as RectangleDrawing);
        break;
    }

    this._register(this.drawingViewModel.onFocused(e => this.onFocused_.fire(e)));
  }

  select(timeOffset: number, x: number, y: number): boolean {
    return this.drawingViewModel.select(timeOffset, x, y);
  }

  getTransformMatrix(timeOffset: number): mat2d {
    return this.parent.getTransformMatrix(timeOffset);
  }

  getInverseTransformMatrix(timeOffset: number): mat2d {
    return this.parent.getInverseTransformMatrix(timeOffset);
  }

}