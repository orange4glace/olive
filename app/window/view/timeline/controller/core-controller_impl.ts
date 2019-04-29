import app from "internal/app";
import { StaticDND, IDragAndDropData } from "base/view/dnd";
import { ResourceDragAndDropData } from "window/view/dnd/dnd";
import { TrackItem } from "internal/timeline/track-item";
import { TimelineWidgetCoreController } from "window/view/timeline/controller/core-controller";
import { TimelineWidgetGhostContainerViewModel } from "window/view/timeline/model/ghost-view-model";
import { TimelineWidgetTrackViewModel } from "window/view/timeline/model/track-view-model";
import { TimelineWidgetTrackItemViewModel } from "window/view/timeline/model/track-item-view-model";
import { IDisposable, dispose } from "base/common/lifecycle";
import { TimelineWidget } from "window/view/timeline/widget";
import { StandardMouseEvent } from "base/view/mouseEvent";

export class TimelineWidgetCoreControllerImpl extends TimelineWidgetCoreController {

  private toDispose_: IDisposable[] = [];

  private lastDragData_: IDragAndDropData = null;
  private dragTrackItem_: TrackItem = null;
  private dragGhostContainer_: TimelineWidgetGhostContainerViewModel = null;

  constructor(private readonly widget_: TimelineWidget) {
    super();

    this.toDispose_.push(widget_.onTrackItemMouseDown(e => this.trackItemMouseDownHandler(e.trackViewModel, e.trackItemViewModel, e.e), this));

    this.toDispose_.push(widget_.onTrackDragOver(e => this.trackDragOverHandler(e.trackViewModel, e.e), this));
    this.toDispose_.push(widget_.onTrackDragLeave(e => this.trackDragLeaveHandler(e.trackViewModel, e.e), this));
    this.toDispose_.push(widget_.onTrackDrop(e => this.trackDropHandler(e.trackViewModel, e.e), this));
  }

  trackDragOverHandler(trackVM: TimelineWidgetTrackViewModel, e: StandardMouseEvent) {
    e.preventDefault();
    const dragData = StaticDND.CurrentDragAndDropData;
    if (dragData instanceof ResourceDragAndDropData) {
      if (this.lastDragData_ != dragData || this.dragGhostContainer_ == null) {
        this.lastDragData_ = dragData;
        const resourceDragData = dragData as ResourceDragAndDropData;
        this.dragTrackItem_ = app.resource.trackItemize(resourceDragData.getData());
        this.dragGhostContainer_ = this.widget_.model.ghostViewModel.createGhostContainer();
        this.widget_.model.ghostViewModel.setCurrentContainer(this.dragGhostContainer_);
        this.dragGhostContainer_.addGhostTrackItem(0, 0, this.dragTrackItem_.duration);
      }
      const trackOffset = this.widget_.model.getTrackViewModelIndex(trackVM);
      this.dragGhostContainer_.translate(this.widget_.model.getTimeRelativeToTimeline(this.widget_.model.getMousePostionRelativeToTimeline(e).x));
      this.dragGhostContainer_.setTrackOffset(trackOffset);
    }
  }

  trackDragLeaveHandler(trackVM: TimelineWidgetTrackViewModel, e: StandardMouseEvent) {
    this.widget_.model.ghostViewModel.setCurrentContainer(null);
    this.dragTrackItem_ = null;
    this.dragGhostContainer_ = null;
  }

  trackDropHandler(trackVM: TimelineWidgetTrackViewModel, e: StandardMouseEvent) {
    if (this.dragTrackItem_) {
      const container = this.dragGhostContainer_;
      const targetTrack = this.widget_.model.trackViewModels[this.dragGhostContainer_.trackOffset];
      const targetTrackItem = this.dragTrackItem_;
      const start = container.translation;
      const end = targetTrackItem.duration + container.translation;
      targetTrack.addTrackItem(targetTrackItem, start, end, 0);
      this.widget_.model.ghostViewModel.setCurrentContainer(null);
      this.dragTrackItem_ = null;
      this.dragGhostContainer_ = null;
    }
  }

  trackItemMouseDownHandler(trackVM: TimelineWidgetTrackViewModel, trackItemVM: TimelineWidgetTrackItemViewModel, e?: StandardMouseEvent) {
    this.widget_.model.blurAllTrackItems();
    trackItemVM.focus();
  }

  dispose(): void {
    this.toDispose_ = dispose(this.toDispose_);
  }

}