import { declareViewModel } from "window/view/view-model";
import { MonitorWidgetTrackItemViewModel, MonitorWidgetTrackItemViewModelImpl } from "window/view/monitor/model/track-item/track-item-view-model";
import { VideoTrackItem } from "internal/timeline/video-track-item";
import { MonitorWidgetDrawingViewModel, MonitorWidgetDrawingViewModelImpl } from "window/view/monitor/model/drawing/drawing-view-model";
import { DrawingType } from "internal/rendering/drawing/drawing";
import { MonitorWidgetRectangleDrawingViewModelImpl } from "window/view/monitor/model/drawing/rectangle-drawing-view-model";
import { RectangleDrawing } from "internal/rendering/drawing/rectangle-drawing";
import { Timeline } from "internal/timeline/timeline";
import { MonitorWidgetSelectableViewModelImpl } from "window/view/monitor/model/selectable-view-model";
import { MonitorWidgetVideoMediaDrawingViewModelImpl } from "window/view/monitor/model/drawing/video-media-drawing-view-moodel";
import { VideoMediaDrawing } from "internal/rendering/drawing/video-media-drawing";

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

  readonly drawingViewModel: MonitorWidgetDrawingViewModelImpl<any>;

  constructor(parent: MonitorWidgetSelectableViewModelImpl, timeline: Timeline, trackItem: VideoTrackItem) {
    super(parent, timeline, trackItem);

    const drawing = trackItem.drawing;
    switch (drawing.type) {
      case DrawingType.RECTANGLE:
        this.drawingViewModel = new MonitorWidgetRectangleDrawingViewModelImpl(
            this, this.timeline_, this.trackItem, drawing as RectangleDrawing);
        break;
      case DrawingType.VIDEO_MEDIA:
        this.drawingViewModel = new MonitorWidgetVideoMediaDrawingViewModelImpl(
            this, this.timeline_, this.trackItem, drawing as VideoMediaDrawing);
    }
  }

  __getChildren() {
    return [this.drawingViewModel];
  }

}