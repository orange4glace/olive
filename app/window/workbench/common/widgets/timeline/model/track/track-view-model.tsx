import * as React from 'react'
import { TimelineWidgetTrackItemViewModel } from "window/workbench/common/widgets/timeline/model/track/track-item-view";
import { IDisposable, dispose, Disposable } from "base/common/lifecycle";
import { Event, Emitter } from "base/common/event";
import { ITrack } from "internal/timeline/base/track/track";
import { TimelineWidgetViewOutgoingEvents } from 'window/workbench/common/widgets/timeline/view-outgoing-events';
import { TimelineScrollView } from 'window/workbench/common/widgets/timeline/model/scroll-view-model';
import { TimelineTrackSideView } from 'window/workbench/common/widgets/timeline/model/track/track-side-view';
import { TimelineTrackTimelineView } from 'window/workbench/common/widgets/timeline/model/track/track-timeline-view';
import { IProject } from 'internal/project/project';
import { GhostTrackItemView } from 'window/workbench/common/widgets/timeline/model/track/ghost-track-item-view';

// export interface TimelineWidgetTrackViewModel extends ViewModel {

//   readonly track: ITrack;

//   readonly onTrackItemFocused: Event<TimelineWidgetTrackItemViewModel>;
//   readonly onTrackItemBlured: Event<TimelineWidgetTrackItemViewModel>;
//   readonly onTrackItemWillRemove: Event<TimelineWidgetTrackItemViewModel>;

//   /*@observable*/ readonly name: string;
//   /*@observable*/ readonly trackItemViewModels: ReadonlySet<TimelineWidgetTrackItemViewModel>;

//   getTrackItemViewModel(trackItem: ITrackItem): TimelineWidgetTrackItemViewModel;
//   getFocusedTrackItemViewModels(): ReadonlySet<TimelineWidgetTrackItemViewModel>;
//   blurAllTrackItems(): void;

//   getClosestTime(time: number): number;

// }


export class TimelineTrackView extends Disposable {

  readonly track: ITrack;

  private readonly onTrackItemFocused_: Emitter<TimelineWidgetTrackItemViewModel> = new Emitter();
  readonly onTrackItemFocused: Event<TimelineWidgetTrackItemViewModel> = this.onTrackItemFocused_.event;
  private readonly onTrackItemBlured_: Emitter<TimelineWidgetTrackItemViewModel> = new Emitter();
  readonly onTrackItemBlured: Event<TimelineWidgetTrackItemViewModel> = this.onTrackItemBlured_.event;
  private readonly onTrackItemAdded_: Emitter<TimelineWidgetTrackItemViewModel> = new Emitter();
  readonly onTrackItemAdded: Event<TimelineWidgetTrackItemViewModel> = this.onTrackItemAdded_.event;
  private readonly onTrackItemWillRemove_: Emitter<TimelineWidgetTrackItemViewModel> = new Emitter();
  readonly onTrackItemWillRemove: Event<TimelineWidgetTrackItemViewModel> = this.onTrackItemWillRemove_.event;

  private readonly onDidAddGhostTrackItemView_: Emitter<GhostTrackItemView> = new Emitter();
  public get onDidAddGhostTrackItemView() { return this.onDidAddGhostTrackItemView_.event; }

  private toDispose_: IDisposable[] = [];

  private trackSideView_: TimelineTrackSideView;
  public get trackSideView() { return this.trackSideView_; }
  private trackTimelineView_: TimelineTrackTimelineView;
  public get trackTimelineView() { return this.trackTimelineView_; }

  constructor(
    project: IProject,
    track: ITrack,
    readonly timelineScrollView: TimelineScrollView,
    readonly outgoingEvents: TimelineWidgetViewOutgoingEvents) {
    super();
    this.track = track;
    this.trackSideView_ = new TimelineTrackSideView(project, track);
    this.trackTimelineView_ = new TimelineTrackTimelineView(project, track, timelineScrollView, outgoingEvents);

    this._register(this.trackTimelineView_.onDidAddGhostTrackItemView(view => this.onDidAddGhostTrackItemView_.fire(view)));
  }

  render() {
    return <TrackViewComponent view={this}/>
  }

  dispose(): void {
    this.toDispose_ = dispose(this.toDispose_);
  }

}


class TrackViewComponent extends React.Component<{view: TimelineTrackView}> {
  render() {
    const view = this.props.view;
    const style = {
      height: '30px',
      lineHeight: '30px'
    }
    return (
      <div className='track'>
        <div className='track-side'>
          { view.trackSideView.render() }
        </div>
        <div className='track-timeline'>
          { view.trackTimelineView.render() }
        </div>
      </div>
    )
  }
}