import * as React from 'react';
import app from 'internal/app';
import * as style from './view.scss';
import { TimelineWidgetViewOutgoingEvents } from 'window/workbench/common/widgets/timeline/view-outgoing-events';
import { TimelineHeaderView } from 'window/workbench/common/widgets/timeline/model/header-view';
import { ITimeline } from 'internal/timeline/base/timeline';
import { IProject } from 'internal/project/project';
import { TimelineWidgetTimelineView } from 'window/workbench/common/widgets/timeline/model/timeline-view-model-impl';
import { observable } from 'window/app-mobx';
import { IObservableValue } from 'mobx';
import { dispose } from 'base/common/lifecycle';

export class TimelineWidgetView {

  headerView: TimelineHeaderView;

  @observable private timelineView_: IObservableValue<TimelineWidgetTimelineView> = observable.box(null);
  public get timelineView(): TimelineWidgetTimelineView { return this.timelineView_.get(); }

  constructor(
    private project: IProject,
    private timeline: ITimeline,
    readonly outgoingEvents: TimelineWidgetViewOutgoingEvents) {
  }

  setTimeline(project: IProject, timeline: ITimeline) {
    this.project = project;
    this.timeline = timeline;
    this.headerView = null;
    if (this.timelineView) this.timelineView_.set(dispose(this.timelineView));

    if (timeline) {
      this.headerView = new TimelineHeaderView(timeline);
      const timelineView = new TimelineWidgetTimelineView(project, timeline, this.outgoingEvents);
      this.timelineView_.set(timelineView);
    }
    else {
      this.timelineView_.set(null);
    }
  }

  render(): React.ReactNode {
    return <TimelineWidgetViewComponent view={this}/>
  }

}

@app.mobx.observer
class TimelineWidgetViewComponent extends React.Component<{view: TimelineWidgetView;}> {

  dragOverHandler = (e: React.DragEvent) => {
    this.props.view.outgoingEvents.emitWidgetDragOver(e);
  }

  dropHandler = (e: React.DragEvent) => {
    this.props.view.outgoingEvents.emitWidgetDrop(e);
  }

  render() {
    const view = this.props.view;
    if (view.timelineView) {
      return (
        <div className={style.component}>
          <div className='header'>
            {view.headerView.render()}
          </div>
          {view.timelineView.render()}
        </div>
      )
    }
    else {
      return (
        <div onDragOver={this.dragOverHandler}
            onDrop={this.dropHandler}>No Timeline Selected</div>
      );
    }
  }

}