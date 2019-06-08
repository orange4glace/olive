import { StaticDND, IDragAndDropData } from "base/browser/dnd";
import { TrackItem } from "internal/timeline/track-item/track-item";
import { TimelineWidgetCoreController } from "window/workbench/common/widgets/timeline/controller/core-controller";
import { TimelineWidgetGhostContainerViewModel } from "window/workbench/common/widgets/timeline/model/ghost-view-model";
import { TimelineWidgetTrackViewModel } from "window/workbench/common/widgets/timeline/model/track-view-model";
import { IDisposable, dispose } from "base/common/lifecycle";
import { ITimelineWidget } from "window/workbench/common/widgets/timeline/widget";
import { StandardMouseEvent } from "base/browser/mouseEvent";
import { IHistoryService } from "internal/history/history";
import { AddTrackItemCommand } from "internal/history/timeline/commands";
import { StorageItemDragAndDropData } from "window/view/dnd/dnd";
import { ResourceStorageFile, MediaResourceStorageFile } from "internal/resource/resource-storage-file";
import { TimelineStorageFile } from "internal/timeline/timeline-storage-file";

export class TimelineWidgetCoreControllerImpl extends TimelineWidgetCoreController {

  private toDispose_: IDisposable[] = [];

  private lastDragData_: IDragAndDropData = null;
  private dragTrackItem_: TrackItem = null;
  private dragGhostContainer_: TimelineWidgetGhostContainerViewModel = null;

  constructor(private readonly widget_: ITimelineWidget,
    @IHistoryService private readonly historyService_: IHistoryService) {
    super();

    this.toDispose_.push(widget_.onWidgetDragOver(e => this.widgetDragOverHandler(e), this));
    this.toDispose_.push(widget_.onWidgetDrop(e => this.widgetDropHandler(e), this));
    this.toDispose_.push(widget_.onTrackDragOver(e => this.trackDragOverHandler(e.trackViewModel, e.e), this));
    this.toDispose_.push(widget_.onTrackDragLeave(e => this.trackDragLeaveHandler(e.trackViewModel, e.e), this));
    this.toDispose_.push(widget_.onTrackDrop(e => this.trackDropHandler(e.trackViewModel, e.e), this));
  }

  widgetDragOverHandler(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    const dndData = StaticDND.CurrentDragAndDropData;
    if (dndData instanceof StorageItemDragAndDropData) {

    }
  }

  widgetDropHandler(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    const dndData = StaticDND.CurrentDragAndDropData;
    if (dndData instanceof StorageItemDragAndDropData) {
      const project = dndData.project;
      const storageItem = dndData.storageItem;
      if (storageItem.type === MediaResourceStorageFile.TYPE) {
        const timeline = project.createTimeline(project.storage);
        timeline.addTrack();
        this.widget_.setTimeline(project, timeline);
      }
      if (storageItem.type === TimelineStorageFile.TYPE) {
        const timeline = (<TimelineStorageFile>storageItem).timeline;
        this.widget_.setTimeline(project, timeline);
      }
    }
  }

  trackDragOverHandler(trackVM: TimelineWidgetTrackViewModel, e: StandardMouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    const dragData = StaticDND.CurrentDragAndDropData;
    if (dragData instanceof StorageItemDragAndDropData) {
      if (this.lastDragData_ != dragData || this.dragGhostContainer_ == null) {
        this.lastDragData_ = dragData;
        const storageDNDData = dragData as StorageItemDragAndDropData;
        this.dragTrackItem_ = storageDNDData.storageItem.trackItemize();
        // this.dragTrackItem_ = this.resourceService_.trackItemize(storageDNDData.getData());
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
      const targetTrackVM = this.widget_.model.trackViewModels[this.dragGhostContainer_.trackOffset];
      const targetTrackItem = this.dragTrackItem_;
      const start = container.leftExtend;
      const end = targetTrackItem.duration + container.rightExtend;
      this.historyService_.execute(new AddTrackItemCommand(targetTrackVM.track, targetTrackItem, start, end, 0));
      this.historyService_.close();
      this.widget_.model.ghostViewModel.setCurrentContainer(null);
      this.dragTrackItem_ = null;
      this.dragGhostContainer_ = null;
    }
  }

  dispose(): void {
    this.toDispose_ = dispose(this.toDispose_);
  }

}