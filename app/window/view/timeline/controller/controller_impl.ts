import { TimelineWidgetModel } from "window/view/timeline/model/model";
import { TimelineWidgetController } from "window/view/timeline/controller/controller";
import { TimelineWidgetManipulatorControllerImpl } from "window/view/timeline/controller/manipulator_impl";
import { StaticDND, IDragAndDropData } from "base/view/dnd";
import { ResourceDragAndDropData } from "window/view/dnd/dnd";
import { Track } from "internal/timeline/track";
import { TimelineWidgetGhostContainer } from "window/view/timeline/model/ghost";
import { TrackItem } from "internal/timeline/track-item";
import app from "internal/app";

export class TimelineWidgetControllerImpl extends TimelineWidgetController {

  private readonly model_: TimelineWidgetModel;
  readonly manipulator: TimelineWidgetManipulatorControllerImpl;

  private lastDragData_: IDragAndDropData = null;
  private dragTrackItem_: TrackItem = null;
  private dragGhostContainer_: TimelineWidgetGhostContainer = null;

  constructor(model: TimelineWidgetModel) {
    super();
    this.model_ = model;
    this.manipulator = new TimelineWidgetManipulatorControllerImpl(model);

    this.trackDragOverHandler = this.trackDragOverHandler.bind(this);
    this.trackDragLeaveHandler = this.trackDragLeaveHandler.bind(this);
  }

  trackDragOverHandler(track: Track, e: React.MouseEvent) {
    e.preventDefault();
    const dragData = StaticDND.CurrentDragAndDropData
    if (dragData instanceof ResourceDragAndDropData) {
      if (this.lastDragData_ != dragData || this.dragGhostContainer_ == null) {
        this.lastDragData_ = dragData;
        const resourceDragData = dragData as ResourceDragAndDropData;
        this.dragTrackItem_ = app.resource.trackItemize(resourceDragData.getData());
        this.dragGhostContainer_ = this.model_.ghostModel.createGhostContainer();
        this.model_.ghostModel.setCurrentContainer(this.dragGhostContainer_);
        this.dragGhostContainer_.addGhostTrackItem(0, 0, this.dragTrackItem_.duration);
      }
      const trackOffset = this.model_.timeline.getTrackIndex(track);
      this.dragGhostContainer_.translate(this.model_.getTimeRelativeToTimeline(this.model_.getMousePostionRelativeToTimeline(e).x));
      this.dragGhostContainer_.setTrackOffset(trackOffset);
    }
  }

  trackDragLeaveHandler(track: Track, e: React.MouseEvent) {
    this.model_.ghostModel.setCurrentContainer(null);
    this.dragTrackItem_ = null;
    this.dragGhostContainer_ = null;
  }

  trackDropHandler(track: Track, e: React.MouseEvent) {
    if (this.dragTrackItem_) {
      const container = this.dragGhostContainer_;
      const targetTrack = this.model_.timeline.getTrackAt(this.dragGhostContainer_.trackOffset);
      const targetTrackItem = this.dragTrackItem_;
      const start = container.translation;
      const end = targetTrackItem.duration + container.translation;
      targetTrack.addTrackItem(targetTrackItem, start, end, 0);
      this.model_.ghostModel.setCurrentContainer(null);
      this.dragTrackItem_ = null;
      this.dragGhostContainer_ = null;
    }
  }

  trackItemMouseDownHandler(track: Track, trackItem: TrackItem, e?: React.MouseEvent) {
    this.model_.focusTrackItem(track, trackItem);
  }

}