import { StaticDND, IDragAndDropData } from "base/browser/dnd";
import { TimelineWidgetCoreController } from "window/workbench/common/widgets/timeline/controller/core-controller";
import { IDisposable, dispose } from "base/common/lifecycle";
import { StandardMouseEvent } from "base/browser/mouseEvent";
import { IHistoryService } from "internal/history/history";
import { AddTrackItemCommand } from "internal/history/timeline/commands";
import { StorageItemDragAndDropData } from "window/view/dnd/dnd";
import { MediaResourceStorageFile } from "internal/resource/base/resource-storage-file";
import { ITrackItem } from "internal/timeline/base/track-item/track-item";
import { TimelineStorageFile } from "internal/timeline/base/timeline-storage-file";
import { ITrack } from "internal/timeline/base/track/track";
import { TimelineWidget } from "window/workbench/common/widgets/timeline/widget-impl";
import { GhostTrackItemView } from "window/workbench/common/widgets/timeline/model/track/ghost-track-item-view";
import { ITrackItemzierService } from "internal/services/track-itemizer/track-itemizer-service";

export class TimelineWidgetCoreControllerImpl extends TimelineWidgetCoreController {

  private toDispose_: IDisposable[] = [];

  private lastDragData_: IDragAndDropData = null;
  private dragTrackItem_: ITrackItem = null;
  // private dragGhostContainer_: TimelineWidgetGhostContainerViewModel = null;

  private ghostTrackItemViews_: GhostTrackItemView[] = [];

  private lastDragOverTrack_: ITrack;

  constructor(private readonly widget_: TimelineWidget,
    @IHistoryService private readonly historyService_: IHistoryService,
    @ITrackItemzierService private readonly trackItemizerService_: ITrackItemzierService) {
    super();

    this.toDispose_.push(widget_.onWidgetDragOver(e => this.widgetDragOverHandler(e), this));
    this.toDispose_.push(widget_.onWidgetDrop(e => this.widgetDropHandler(e), this));
    this.toDispose_.push(widget_.onTrackDragOver(e => this.trackDragOverHandler(e.track, e.e), this));
    this.toDispose_.push(widget_.onTrackDragLeave(e => this.trackDragLeaveHandler(e.track, e.e), this));
    this.toDispose_.push(widget_.onTrackDrop(e => this.trackDropHandler(e.track, e.e), this));
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

  private createGhostTrackItemViews(track: ITrack, trackItem: ITrackItem) {
    this.ghostTrackItemViews_ = dispose(this.ghostTrackItemViews_);
    const view = this.widget_.view.timelineView.getTrackView(track).trackTimelineView.addGhostTrackItem(0, trackItem.duration);
    this.ghostTrackItemViews_.push(view);
  }

  trackDragOverHandler(track: ITrack, e: StandardMouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    const dragData = StaticDND.CurrentDragAndDropData;
    if (dragData instanceof StorageItemDragAndDropData) {
      if (this.lastDragData_ != dragData || this.dragTrackItem_ == null) {
        this.lastDragData_ = dragData;
        const storageDNDData = dragData as StorageItemDragAndDropData;
        this.dragTrackItem_ = this.trackItemizerService_.trackItemizeStorageItem(this.widget_.timeline, storageDNDData.storageItem);
        if (this.dragTrackItem_ == null) return;
        // this.dragTrackItem_ = this.resourceService_.trackItemize(storageDNDData.getData());
      }
      if (this.lastDragOverTrack_ != track) {
        this.createGhostTrackItemViews(track, this.dragTrackItem_);
        this.lastDragOverTrack_ = track;
      }
      this.widget_.view.timelineView.ghostTimelineState.translation = 
          this.widget_.view.timelineView.scrollViewModel.getTimeRelativeToTimeline(
              this.widget_.view.timelineView.scrollViewModel.getMousePostionRelativeToTimeline(e).x);
    }
  }

  trackDragLeaveHandler(track: ITrack, e: StandardMouseEvent) {
    this.dragTrackItem_ = null;
    this.ghostTrackItemViews_ = dispose(this.ghostTrackItemViews_);
    this.lastDragOverTrack_ = null;
  }

  trackDropHandler(track: ITrack, e: StandardMouseEvent) {
    if (this.dragTrackItem_) {
      const ghostTimelineState = this.widget_.view.timelineView.ghostTimelineState;
      const targetTrackItem = this.dragTrackItem_;
      const start = ghostTimelineState.translation;
      const end = targetTrackItem.duration + ghostTimelineState.translation;
      track.addTrackItem(targetTrackItem, start, end, 0);
      this.dragTrackItem_ = null;
      this.ghostTrackItemViews_ = dispose(this.ghostTrackItemViews_);
      this.lastDragOverTrack_ = null;
    }
  }

  dispose(): void {
    this.toDispose_ = dispose(this.toDispose_);
  }

}