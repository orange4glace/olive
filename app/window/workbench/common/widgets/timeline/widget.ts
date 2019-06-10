import { Event } from "base/common/event";
import { TimelineWidgetTrackUIEvent, TimelineWidgetTrackItemUIEvent, TimelineWidgetTrackItemEvent, TimelineWidgetTrackItemThumbUIEvent, TimelineWidgetTimelineUIEvent } from "window/workbench/common/widgets/timeline/event";
import { TimelineWidgetViewOutgoingEvents } from "window/workbench/common/widgets/timeline/view-outgoing-events";
import { TimelineWidgetTimelineViewModel } from "window/workbench/common/widgets/timeline/model/timeline-view-model";
import { ITimelineWidgetRangeSelector } from "window/workbench/common/widgets/timeline/model/range-selector";
import { IProject } from "internal/project/project";
import { Widget, IWidget } from "window/workbench/common/editor/widget";
import { ITimeline } from "internal/timeline/base/timeline";
import { ITrackItem } from "internal/timeline/base/track-item/track-item";

export interface ITimelineWidget extends IWidget {

  readonly project: IProject;
  readonly timeline: ITimeline;

  // UI Event
  readonly onWidgetDragOver: Event<React.DragEvent>;
  readonly onWidgetDrop: Event<React.DragEvent>;
  readonly onTrackItemMouseDown: Event<TimelineWidgetTrackItemUIEvent>;
  readonly onTrackItemMouseMoveStart: Event<TimelineWidgetTrackItemUIEvent>;
  readonly onTrackItemThumbMouseDown: Event<TimelineWidgetTrackItemThumbUIEvent>;
  readonly onTrackItemThumbMouseMoveStart: Event<TimelineWidgetTrackItemThumbUIEvent>;
  readonly onTrackMouseMove: Event<TimelineWidgetTrackUIEvent>;
  readonly onTrackDragOver: Event<TimelineWidgetTrackUIEvent>;
  readonly onTrackDragLeave: Event<TimelineWidgetTrackUIEvent>;
  readonly onTrackDrop: Event<TimelineWidgetTrackUIEvent>;
  readonly onTimelineMouseDown: Event<TimelineWidgetTimelineUIEvent>;

  readonly onTimelineChanged: Event<void>;
  readonly onFocused: Event<void>;
  readonly onTrackItemFocused: Event<TimelineWidgetTrackItemEvent>;
  readonly onTrackItemBlured: Event<TimelineWidgetTrackItemEvent>;

  /*@observable*/ readonly model: TimelineWidgetTimelineViewModel;
  readonly rangeSelector: ITimelineWidgetRangeSelector;

  setTimeline(project: IProject, timeline: ITimeline): void;

  registerViewOutgoingEvents(outingEvents: TimelineWidgetViewOutgoingEvents): void;

  getFocusedTrackItems(): ReadonlySet<ITrackItem>;

  focus(): void;
  blur(): void;

  setActive(value: boolean): void;

}